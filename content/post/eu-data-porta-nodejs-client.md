---
title: Building a node.js client for the EU Open Data Portal
slug: eu-data-portal-nodejs-client
date: 2016-10-02T12:10:11+02:00
tags:
- JavaScript
- nodejs
- open data
---

Planning to make an open data GraphQL server, it was natural to first build a small abstraction wrapper which can be re-used in other projects. Basically, the [odp library][1] I'm going to talk about is just a simplified client for fetching data from the EU Open Data Portal.

### Getting the library

When you have [node.js][2], the module can be installed by npm:

```bash
$ npm install odp
```

### Library API

The API of the module is pretty simple:

```js
// Get a range of the whole list of datasets:
odp.getDatasets({query: {limit: 100, offset: 1}}).then((data) => {
  console.log(data);
});
```

Currently, there are 4 methods which match the brief information from the [developers' corner][3]. Methods are: `getDatasets()`, `getTags()`, `getDataset()` and `datasetSearch()`. It could be that there are more options than that in the API, but these are all I know so far as user of the website.

An [Examples section][4] is included in the README file for further details.

### Resources

Suggestions and pull requests are welcome at the [github page of the project][5].

For inspirations of use, more information about the data or introduction training of the benefits of using open data, visit the [europeandataportal.eu][6].

[1]: https://www.npmjs.com/package/odp
[2]: https://nodejs.org/en/
[3]: https://data.europa.eu/euodp/en/developerscorner
[4]: https://github.com/kalinchernev/odp/blob/master/README.md#examples
[5]: https://github.com/kalinchernev/odp
[6]: https://www.europeandataportal.eu/
