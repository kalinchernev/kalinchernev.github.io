---
title: Migrate from Hugo to GatsbyJS
date: 2017-11-02T12:00:00.113Z
slug: migrate-hugo-gatsby
tags:
  - JavaScript
  - JAM Stack
  - GatsbyJS
---

## Introduction

After the recent [migration from Medium to Hugo](/releasing-new-blog) I continued digging into the [JAM stack](/tags/jam-stack) and [GatsbyJS](/tags/gatsbyjs), as having a statically generated site for my blog is working well so far.

I could have taken a ready template to mimic design and keep content and make another quick release. Though, for this migration, I decided to spent time taking concrete steps I consider reusable:
- Content migration with minimum efforts
- Programatic content creation workflow in GatsbyJS
- Make pagination, pages with and for tags, etc.
- Add admin panel with [NetlifyCMS](https://www.netlifycms.org/)

This article will highlight lessons learned about these steps with the aim to provide high-level guidelines about patterns which can be re-used in migrations with other generators to GatsbyJS.

### Background before you start

[Hugo](https://gohugo.io/) is a really super fast, convenient and well-supported tool for working with static sites. I think today it's still more mature and closer to classical CMSs than GatsbyJS workflow-wise. This means that at this time, when you need a ready plugin or a theme for quick gratification, it's more likely to find something ready online.

Whereas, GatsbyJS is based on React, GraphQL, Webpack and the way of thinking is closer to how a developer from MEAN/SPA stack would approach problems. It's also a bit more "raw" and there are starters and typography.js, but not so many ready solutions in the conventional sense.

If you have landed at this article researching which tool is better for your job, take a look at [comparisons](https://www.slant.co/versus/1016/18503/~hugo_vs_gatsby-js) and keep in mind that selecting a [stack](https://stackshare.io/stackups/gatsby-vs-hugo) boils down to being effective with it.

For me, GatsbyJS is [valuable learning experience](/learn-gatsbyjs) and it has also been so easy to work with, it feels "unfair". For example, the plugin system of GatsbyJS keeps me sane and productive, even at cases I know only the brief overview concepts of Webpack, whereas others have spent hours and days configuring what I get out of the box to be productive.

### Content migration

This task was easier than expected. The file structure is preserved between my previous blog and the current version. Both Hugo and GatsbyJS work well when markdown files are stored in flat at `content/post` folder in my repository.

The only work I had to do on the content "migration" was to reformat the [frontmatter](https://gohugo.io/content-management/front-matter/). In Hugo, I used TOML, whereas `gatsby-transformer-remark` works only with YAML for the moment. Luckily, I still had the cli of Hugo on my system and could make use of the [build-in conversion tool](https://gohugo.io/commands/hugo_convert_toyaml/). I guess this would be a bit less straight-forward in more sophisticated and nested hierarchy structures. In my case, the only issue I had was that sometimes titles were longer than 1 line and were not parse-able by the GatsbyJS build, so I just had to cut some words out where problematic.

Last word about this step is that my previous frontmatter already contained `title`, `date`, `tags`, and most importantly - the `slug` fields. These were enough for my later work on the programatic creation of content explained in the next section.

### Programatic content creation

This is the official [documentation](https://www.gatsbyjs.org/docs/creating-and-modifying-pages/), plus there is a [tutorial](https://www.gatsbyjs.org/tutorial/part-four/#data-in-gatsby) which gives examples. Basically, I had to create a `gatsby-node.js` file which exports `createPages` method using the `createPage` action from [`boundActionCreators`](https://www.gatsbyjs.org/docs/bound-action-creators/).

This might sound way more complicated than what it is:

```javascript
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            frontmatter {
              title
              slug
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges;
    // Create content programatically here
  });
};
```
As you see, getting the list of posts can be done in a single query.

The result of this query can later be handled by a "creator" function, which I prefer to keep in a separate module. For example, creating posts works like following:

```javascript
const path = require(`path`);

module.exports = (createPage, nodes) => {
  const template = path.resolve(`src/templates/post.js`);

  nodes.map(({ node }) => {
    if (node.frontmatter.slug) {
      createPage({
        path: node.frontmatter.slug,
        component: template,
        context: {
          slug: node.frontmatter.slug,
        },
      });
    }
  });
};
```
I re-use the `slug` field of the frontmatter of my existing structure. I don't have to generate or calculate slugs based on information of other fields, i.e. my scenario is easier than the tutorial on the official docs.

This is an example of "unfair" easy - I don't have to do literally anything to keep my previous URLs of existing content the same in the new system.

The display of the data is handled by a React component acting as a template. My case is nothing different than the [official documentation](https://www.gatsbyjs.org/docs/building-with-components/#page-template-components), nothing exotic.

### Pagination and tags pages

Now that I got a decent grasp of how to create content in my new site, I proceeded with creating pagition. I have about 30 blog posts, so I went for a split by 10 to give an impression I have a lot of content :)

As usual, a good starting point was searching for example implementations available in [`examples`](https://github.com/gatsbyjs/gatsby/tree/master/examples/) and the issue queue. There, in the issue queue, is a gem [epic about plugins wishlist](https://github.com/gatsbyjs/gatsby/issues/1199) where I found the discussion leading to [gatsby-paginate](https://github.com/pixelstew/gatsby-paginate).

As I wanted to have different contexts than the plugin, so I took inspiration for both tags and pagination scenarios. I kept them as separate action creators and I just called them in the main creator function like this:

```javascript
const createPostPages = require(`./gatsby-actions/createPostPages`);
const createPaginatedPostsPages = require(`./gatsby-actions/createPaginatedPostsPages`);
const createTagPages = require(`./gatsby-actions/createTagPages`);

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            frontmatter {
              title
              slug
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges;
    createPostPages(createPage, posts);
    createPaginatedPostsPages(createPage, posts);
    createTagPages(createPage, posts);
  });
};
```

Easy to read, understand and mantain. The pagination module is a bit longer than the one of the posts:

```javascript
const path = require(`path`);

module.exports = (createPage, nodes) => {
  const template = path.resolve(`src/templates/postList.js`);
  const paginateSize = 10;

  // Split posts into arrays of length equal to number posts on each page/paginateSize
  const groupedPages = nodes
    .map((node, index) => {
      return index % paginateSize === 0
        ? nodes.slice(index, index + paginateSize)
        : null;
    })
    .filter(item => item);

  // Create new indexed route for each array
  groupedPages.forEach((group, index, groups) => {
    const pageIndex = index === 0 ? `` : index + 1;
    const paginationRoute = `/blog/${pageIndex}`;
    // Avoid showing `Previous` link on first page - passed to context
    const first = index === 0 ? true : false;
    // Avoid showing `Next` link if this is the last page - passed to context
    const last = index === groups.length - 1 ? true : false;

    return createPage({
      path: paginationRoute,
      component: template,
      context: {
        group,
        first,
        last,
        index: index + 1,
      },
    });
  });
};
```

Then, pull context information in the React component:

```javascript
const BlogPagedIndex = ({ pathContext }) => {
  const { group, index, first, last } = pathContext;
  return (
    <div>
      // Some elements
      ...

      // The posts
      <ul>
        {group.map((node, key) => <Post key={key} node={node} />)}
      </ul>

      // The pager
      <div>
        {!first && (
          <Link to={`/blog/${index > 2 ? index - 1 : ''}`}>Newer posts<Link>
        )}
        {!last && (
          <Link to={`/blog/${index + 1}`}>Older posts</Link>
        )}
      </div>
    </div>
  );
};

export default BlogPagedIndex;
```

This is a cut-down version of the component only for the blog post, do not copy with too much trust ...

I have to be honest that I haven't made pagination in React/Redux, but I feel this pagination approach would be comparatively easier. Also, I want the pagination pages to be accessible at all times, not only on state change, so the content creation approach of building the list works well for me.

I will say again that I see this is "unfair" easy. It's probably the quickest implementation of pagination I've made in my life. I believe GraphQL pagination with caching and Redux, etc. would be a more sophisticated way to solve the problem ;)

For the list of tags and inner tags pages, the approach was similar but passing different context to the template component:

For the overview page of tags:

```javascript
createPage({
  path: `/tags`,
  component: template,
  context: {
    posts,
  },
});
```

For the inner tag page:

```javascript
createPage({
  path: `/tags/` + slugify(tagName),
  component: template,
  context: {
    posts,
    post,
    tag: tagName,
  },
});
```

### Admin panel

I have another [blog post on the topic](/admin-ui-gatsby-static-site-generator) so I won't go into too many details.

I tried to use the `git-gateway` identity management approach in Netlify, but it didn't work for me. I could not reach the point to validate or reset the password for my user 1, so I kept the "old-school" way of github integration which works just well for me at the moment, having the fact I will be 1 user to work on the site.

Not to mention also that I add this admin panel mostly for demoing the concept of JAM stack with admin panel to colleagues and friends, not to actually write there so much as I'm using Atom.

Long story short, this is the `config.yml` configuration file:

```yaml
backend:
  name: github
  repo: kalinchernev/kalinchernev.github.io # Path to your Github repository
  branch: gatsby # Branch to update (master by default)

publish_mode: editorial_workflow
media_folder: "static/images" # Folder where user uploaded files should go

collections: # A list of collections the CMS should be able to edit
  - name: "post" # Used in routes, ie.: /admin/collections/:slug/edit
    label: "Post" # Used in the UI, ie.: "New Post"
    folder: "content/post" # The path to the folder where the documents are stored
    sort: "date:desc" # Default is title:asc
    create: true # Allow users to create new documents in this collection
    slug: "{{slug}}"
    fields: # The fields each document in this collection have
      - {label: Title, name: "title", widget: "string", tagname: "h1"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: Slug, name: "slug", widget: "string"}
      - {label: Tags, name: tags, widget: list, default: ['APIs', 'JavaScript']}
      - {label: "Body", name: "body", widget: "markdown"}
```

The only interesting part is the `gatsby` branch which I used in parallel to the `blog` branch. The `gatsby`
branch is my development/staging and `blog` is my production.

This is my admin page React component which is placed in `src/pages/admin` so that GatsbyJS delivers the HTML page at `/admin`.

```javascript
import React from 'react';
import Helmet from 'react-helmet';

const AdminPage = () => (
  <div className="admin">
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Content Manager</title>
      <link
        rel="stylesheet"
        href="https://unpkg.com/netlify-cms@^0.5.0/dist/cms.css"
      />
      <script
        type="text/javascript"
        charSet="utf-8"
        async
        src="https://unpkg.com/netlify-cms@^0.5.0/dist/cms.js"
      />
    </Helmet>
  </div>
);

export default AdminPage;
```

In order for NetlifyCMS script to find the configuration file correctly, `config.yml` should be placed in `static/admin/config.yml`.

Any other location or file name will result in an error.

### Conclusions

In this blog post I shared how a migration from one static generator as Hugo can work towards GatsbyJS. The reasons for doing a migration like this are a commbination of development-time benefits (easier development) and also a better production build of a static site which feels as smooth as a single page application.

We also went through the few technical details necessary to realize the migration, using GraphQL query, creators and templates. Lastly, we added an admin panel to brag to others about that content management part of our static site can be as easy as the development part of it ;)

Enjoy!
