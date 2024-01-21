---
title: "Setup https for local development"
slug: "/https-local-development"
date: "2024-01-21T00:00:00+02:00"
category: "Code"
template: "post"
draft: false
tags:
  - JavaScript
  - WebDev
  - mkcert
description: "Using https on both back-end and front-end"
socialImage: "./cute-cat-cookie.png"
---

Recently I read the [Best Practices for Storing Access Tokens in the Browser](https://thenewstack.io/best-practices-for-storing-access-tokens-in-the-browser/) article and decided to experiment and create a simple BFF service with Nest, acting as a token handler, for a React app. It was harder than expected due to several key aspects, the main and very first being setting up a secure local development environment.

I'll briefly share how I used [mkcert](https://github.com/FiloSottile/mkcert) to have a proper https in both front-end and back-end. Because the browser part is easier, I'll start with it, then move on to the server-side code. Finally, I'll briefly mention some specifics in terms of making requests related to cookies in secure context.

## mkcert

mkcert is a tool that generates locally-trusted development certificates. It works by creating a local Certificate Authority (CA) and then adding it to the trust store of your system and browsers. Certificates signed by this local CA work well in local development, whereas the quick and dirty self-signed certificates do not.

## Setup https in React

[React's new docs suggest Next, Remix and Gatsby frameworks](https://react.dev/learn/start-a-new-react-project) as a starting point for a new project in 2024. Although I understand the push for server components and funded products with all modern features, I still preferred going for [Vite](https://vitejs.dev/). It's not that my app "has unusual constraints not served well by these frameworks", it's just that I want a working React app in a conventional way and move on.

Gladly, there's [vite-plugin-mkcert](https://www.npmjs.com/package/vite-plugin-mkcert). Nothing special no mention here, that's the whole `vite.config.ts` file:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  server: {},
  plugins: [react(), mkcert()],
});
```

The plugin setups all the necessary artifacts and starts the vite local development server in https passing the certificate to the local dev server instance. The browser serving the React app through this vite dev server trusts the certificate and can manage cookies securely. Note that the browser environment, therefore, does not care about chain of trust.

## Setup https in Nest

Because [Nest](https://nestjs.com/) is a platform built on top of [Node](https://nodejs.org/en) we actually work through the problem in the same way we would as it would be any other Node project.

Here's the `main.ts` file:

```typescript
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const app = await NestFactory.create(AppModule, {
    // Enable HTTPS in development to be able to work with cookies securetly locally.
    httpsOptions: isDevelopment
      ? {
          key: fs.readFileSync(
            path.join(__dirname, '..', 'certificates', 'local-key.pem'),
          ),
          cert: fs.readFileSync(
            path.join(__dirname, '..', 'certificates', 'local-cert.pem'),
          ),
        }
      : undefined,
  });

  // To be able to extract cookies from requests.
  app.use(cookieParser());

  // Get a handle of the ConfigService to be able to read environment variables.
  const configService = app.get(ConfigService);

  // The client service is the specific BFF for a given browser app. 
  // If the environment variable CLIENT_URL is set, enable CORS for that URL, this means that the client can make requests to the API and receive secured cookies.
  const clientUrl = configService.get('CLIENT_URL');
  if (clientUrl) {
    app.enableCors({
      origin: clientUrl,
      credentials: true,
    });
  }

  const port = configService.get('API_PORT');
  await app.listen(port);
}
bootstrap();
```

The [`httpsOptions`](https://docs.nestjs.com/faq/multiple-servers) is a "small detail" part of the FAQ, whereas [CORS can be enabled in two ways](https://docs.nestjs.com/security/cors).

Now, let's imagine making an internal request from the dedicated client service to a core API:

```typescript
  async me(token: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/users/profile`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      // A certificate error happens 💥
      if (isAxiosError(error)) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnauthorizedException();
    }
  }
```

```
error AxiosError: unable to verify the first certificate
  ... error trace
  code: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
```

What's the issue? [Node uses an hardcoded list of certificate authorities](https://github.com/nodejs/node/issues/4175). Meaning that the flow used before for the browser is not fully acceptable for the server code.

Additional CA certificates can be added using the `NODE_EXTRA_CA_CERTS` environment variable. For example:

```bash
export NODE_EXTRA_CA_CERTS="$HOME/.local/share/mkcert/rootCA.pem"
```

Where `rootCA.pem` is a certificated created and signed by mkcert. This might be different from operating system to another and output destination of the certificate generation operation.

## Notes on cookies

Firstly, best practices recommend that a cookie is both `secure` so that it's transferred only through https and it's also `httpOnly` so that browser scripts cannot get the contents of the cookie.

```typescript
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cookie = await this.clientService.login(loginDto);
    res.cookie('Authentication', cookie, {
      httpOnly: true,
      secure: true,
    });
  }
```

Same holds true for unsetting a cookie

```typescript
  @HttpCode(HttpStatus.OK)
  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('Authentication', {
      httpOnly: true,
      secure: true,
    });
  }
```

Secondly, `withCredentials` is necessary when requests are to accept cookies in a secured environment:

```typescript
const response = await axios.post(
  `${this.server}/client-service/login`,
  userDataDto,
  {
    withCredentials: true, // Without this one, no cookie will be stored after request finishes, even when it's `httpOnly` and `secure`
    headers: {
      "Content-Type": "application/json",
    },
  }
);
```

The same option under `fetch` is `credentials`:

```typescript
const response = await fetch(`${this.server}/client-service/login`, {
  method: 'POST',
  credentials: 'include', // This is equivalent to `withCredentials: true` in axios
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userDataDto)
});
```

## Conclusions

Although working with https and cookies securely during local development turned out to not be as easy as expected, it is worth the effort.
