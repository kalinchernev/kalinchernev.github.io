---
title: Optimising nested loops
slug: optimising-nested-loops
date: '2020-03-22T00:00:00+00:00'
draft: false
template: 'post'
category: 'Code'
tags:
  - O
  - JavaScript
  - Algorithms
description: 'Small thoughts on big Os'
---

## Introduction

While upgrading a project from Gatsby.js v1 to v2, I had an opportunity to make use of some big O karate. I am neither a performance expert, nor an algorithms master by any means but I put some dry theory in practice and it's worth sharing.

## The problem

In the Gatsby.js project, there is a Gallery page based on [react-photo-gallery](https://github.com/neptunian/react-photo-gallery). The content of the page is managed through [Netlify CMS list widget](https://www.netlifycms.org/docs/widgets/#list) which creates a JSON file which holds a user-selected list of images to display in the gallery.

In order to display optimised images within this user-managed gallery, the [`gatsby-image`](https://www.gatsbyjs.org/docs/gatsby-image/) tool-chain is used to integrate with the [sharp library](https://github.com/lovell/sharp). Because the image sourcing plugin adds a tiny surface of properties to the image nodes, it's not possible to preprocess or query much information for images through the GraphQL layer in Gatsby.js in order to mark which images are user-selected before they are actually used in React components.

The information for which images are to be displayed in the gallery are stored within 1 JSON file, whereas the actual information regarding the physical images is stored and accessed through Gatsby.js's GraphQL layer build- and run-time.

## Data structures

The file which holds the information about user-selected gallery images is managed by Netlify CMS in the following form:

```json
{
  "Images": [
    {
      "image": {
        "src": "/img/_dsf0009.jpg"
      }
    },
    {
      "image": {
        "src": "/img/20181120-0953-dscf5407.jpg"
      }
    }
  ]
}
```

The list of sourced image nodes would be:

```json
[
  {
    "node": {
      "id": "0266d313-813f-551c-b445-231c9385c493",
      "fluid": {
        "sizes": "(max-width: 720px) 100vw, 720px",
        "srcSet": "/static/2c19df4bb3535e40ba3bca7f71c26c19/f836f/android1.jpg 200w,\n/static/2c19df4bb3535e40ba3bca7f71c26c19/2244e/android1.jpg 400w,\n/static/2c19df4bb3535e40ba3bca7f71c26c19/7d509/android1.jpg 720w",
        "originalName": "android1.jpg"
      }
    }
  },
  {
    "node": {
      "id": "095760c9-9e89-5c77-ba92-0861e6b5227d",
      "fluid": {
        "sizes": "(max-width: 720px) 100vw, 720px",
        "srcSet": "/static/6b99e8aaee720b42840376a2255392de/f836f/android2.jpg 200w,\n/static/6b99e8aaee720b42840376a2255392de/2244e/android2.jpg 400w,\n/static/6b99e8aaee720b42840376a2255392de/7d509/android2.jpg 720w",
        "originalName": "android2.jpg"
      }
    }
  }
]
```

Which comes from a query like this:

```javascript
export const pageQuery = graphql`
  query GetStaticSharpImages {
    allImageSharp {
      edges {
        node {
          id
          fluid {
            sizes
            srcSet
            originalName
          }
        }
      }
    }
  }
`;
```

Image id's are kept mostly for demonstration purposes, but they are a [breaking change in Gatsby.js v2](https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/#dont-query-nodes-by-id).

## Quick approach

Given that `userSelectedImages` holds the value of `Images` of user-selected list of images and `nodes` holds query results, a quick approach to solving the problem could be:

```javascript
userSelectedImages.forEach(image => {
  const originalName = getImageOriginalName(image);

  const imageData = nodes.find(node => {
    if (node.node.fluid.originalName === originalName) return node;
  });

  if (imageData) result1.push(imageData);
});
```

We start the iteration from the use-selected list of images rather than the list of image nodes. For each selected item, we search for the first match of details regarding the image coming from the sourcing plugin.

Another approach would be to iterate the list of nodes instead of the user-selected list. In both cases, time complexity is `O(N^2)` because on each iteration of the outer loop, the inner loop will be iterated as well.

## Reflecting on what can change in time

When thinking which part of the code will grow in time, we find out that the list of nodes is the potential problematic part. It can grow in thousands because Netlify CMS stores all user-managed media in a single folder. Whereas, the list of user-selected images will remain less than a hundred.

## Improved approach

We need a way to convert [`Arrray.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) (O(N)) to O(1). JavaScript has [maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) since ES6. Maps can find elements immediately without iterating through the list of nodes.

Let's do some refactoring:

```javascript
const nodesMap = new Map();
nodes.forEach(node => {
  nodesMap.set(node.node.fluid.originalName, node);
});

userSelectedImages.forEach(image => {
  const originalName = getImageOriginalName(image);

  const imageData = nodesMap.get(originalName);

  if (imageData) result2.push(imageData);
});
```

Nothing major happens on first look: the items from the array of nodes are poured in a map, thus "caching" the list in 1 full iteration. This gives the opportunity to get full details of an image in O(1) with [Map.get()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get).

## Results comparison

Using simple `console.time` and `timeEnd` around the 2 approaches with having 54 user-selected images and 163 sourced images, I got the following results:

```
result1: 2.398ms
result2: 0.174ms
```

These are not scientific results and should not be taken too seriously.

There are better ways to measure performance and there are many time-consuming operations which are not taken into considerations here: like the actual image processing from sharp library, the gatsby operations, etc. Also, results will surely vary from one machine and OS to another.

The two approaches demonstrate how 1 full iteration with a map creation yields O(1) access to image details which saves considerable amount of time compared to `Array.find` O(N).

Sample code can be found [here](https://github.com/kalinchernev/kalinchernev.github.io/blob/samples/optimise-iterations)
