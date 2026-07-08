# Upgrade Plan – kalinchernev.github.io → latest `gatsby-starter-lumen`

**Goal** – bring the blog up to date with the current Lumen starter while keeping existing custom code (e.g., Disqus comments).  The plan focuses on dependency updates and the minimal config changes required for a smooth, safe upgrade.

---

## 1️⃣ Snapshot (Safety Net)
```bash
git add .
git commit -m "pre-upgrade snapshot"
```
This creates a restore point in case we need to roll back.

---

## 2️⃣ Dependency Alignment

| Package | Current (blog) | Latest (v5.16.x ecosystem) | Action |
|---|---|---|---|
| `@alxshelepenok/diesel` | `^1.0.1195` | `1.0.1367` | Pin to exact version `1.0.1367` |
| `@alxshelepenok/diesel-extensions` | `^1.0.1118` | `1.0.1243` | Pin to exact version `1.0.1243` |
| `@sentry/gatsby` | `^7.61.1` | `^8.55.2` | Upgrade to `^8.55.2` (major bump) |
| `@sentry/tracing` | `^7.92.0` | — | **Remove** – deprecated in Sentry v8, tracing is built into `@sentry/gatsby` |
| `classnames` | `^2.5.1` | `^2.5.1` | No change |
| `disqus-react` | `^1.1.5` | — | **Keep** (used by comment component) |
| `gatsby` | `^4.25.8` | `^5.16.1` | Upgrade to `^5.16.1` (major bump) |
| `gatsby-link` | `^4.25.0` | `5.16.0` | Upgrade to `5.16.0` |
| `gatsby-plugin-catch-links` | `^4.25.0` | `5.16.0` | Upgrade to `5.16.0` |
| `gatsby-plugin-feed` | `^4.25.0` | `5.16.0` | Upgrade to `5.16.0` |
| `gatsby-plugin-google-gtag` | `^4.25.0` | `5.16.0` | Upgrade to `5.16.0` |
| `gatsby-plugin-image` | `^2.25.0` | `3.16.0` | Upgrade to `3.16.0` |
| `gatsby-plugin-manifest` | `^4.25.0` | `5.16.0` | Upgrade to `5.16.0` |
| `gatsby-plugin-offline` | `^5.25.0` | — | **Replace** with `gatsby-plugin-remove-serviceworker` (see step 3) |
| `gatsby-plugin-optimize-svgs` | `^1.0.5` | `^1.0.5` | No change |
| `gatsby-plugin-sass` | `^5.25.0` | `^6.16.0` | Upgrade to `^6.16.0` |
| `gatsby-plugin-sharp` | `^4.25.1` | `5.16.0` | Upgrade to `5.16.0` |
| `gatsby-plugin-sitemap` | `^5.25.0` | `6.16.0` | Upgrade to `6.16.0` |
| `gatsby-remark-autolink-headers` | `^5.25.0` | `6.16.0` | Upgrade to `6.16.0` |
| `gatsby-remark-copy-linked-files` | `^5.25.0` | `6.16.0` | Upgrade to `6.16.0` |
| `gatsby-remark-external-links` | `0.0.4` | `0.0.4` | No change |
| `gatsby-remark-images` | `^6.25.0` | `7.16.0` | Upgrade to `7.16.0` |
| `gatsby-remark-prismjs` | `^6.25.0` | `7.16.0` | Upgrade to `7.16.0` |
| `gatsby-remark-responsive-iframe` | `^5.25.0` | `6.16.0` | Upgrade to `6.16.0` |
| `gatsby-remark-smartypants` | `^5.25.0` | `6.16.0` | Upgrade to `6.16.0` |
| `gatsby-source-filesystem` | `^4.25.0` | `5.16.0` | Upgrade to `5.16.0` |
| `gatsby-transformer-remark` | `^5.25.1` | `6.16.0` | Upgrade to `6.16.0` |
| `gatsby-transformer-sharp` | `^4.25.0` | `5.16.0` | Upgrade to `5.16.0` |
| `prismjs` | `^1.29.0` | `^1.29.0` | No change |
| `react` / `react-dom` | `^18.2.0` | `^18.3.1` | Upgrade to `^18.3.1` (do **not** upgrade to React 19 – `@sentry/gatsby@8` does not support it yet) |
| `abab` | `^2.0.6` | — | **Keep** (used in utils) |

**Dev‑dependencies** – bring them in line with the starter where applicable, keep any extra tooling you need (jest, eslint, husky, etc.).  The full snippets are provided below.

---

## 3️⃣ Config Adjustments (code‑only)
1. **Remove `gatsby-plugin-offline`** – replace it with `gatsby-plugin-remove-serviceworker` in `gatsby-config.ts`.
2. **Remove `@sentry/tracing`** – it is no longer a separate package in Sentry v8. Its tracing functionality is now built into `@sentry/gatsby`. Remove the import/require from any files (none found in this project, but the package.json dependency should be removed).
3. **Add modern Sass options** (mirrors starter):
    ```ts
    {
      resolve: "gatsby-plugin-sass",
      options: {
        sassOptions: {
          api: "modern-compiler",
        },
      },
    }
    ```

---

## 4️⃣ Execute the Upgrade
```bash
# edit package.json (apply the dependency sections shown above)
# edit gatsby-config.ts (apply the two config changes)

# Install dependencies using Yarn (updates yarn.lock automatically)
yarn install

# Run the test suite to verify nothing broke
npm test

# Build the site
npm run build

# Serve locally to confirm the site works
npm run serve
```
**NOTE:** *Do not commit or push yet.*  Review the changes, run the tests, and verify the site works locally before creating any git commit.

---

## 5️⃣ Post‑Upgrade Checklist
- ✅ `npm run build` finishes without errors
- ✅ Local server (`npm run serve`) runs and pages load
- ✅ Jest test suite passes
- ✅ Disqus comments still work (they rely on `disqus-react` which we kept)
- ✅ Service‑worker is **removed** (or replaced) – no console warnings about the deprecated offline plugin
- ✅ All custom Sass styles compile (modern‑compiler option may require Node >= 18 – already satisfied)

---

## 6️⃣ Rollback (if needed)
```bash
git reset --hard HEAD~1   # revert to the snapshot commit made in step 1
```

---

**That’s the refined upgrade plan** – apply the dependency changes, adjust the two `gatsby-config.ts` entries, install with Yarn, run the tests/build, and only then commit and push when you’re satisfied.
