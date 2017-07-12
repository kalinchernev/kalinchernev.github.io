"use strict";

var crypto = require("crypto");
var GitHubApi = require("github");
var github = new GitHubApi();

function signRequestBody(key, body) {
  return (
    "sha1=" + crypto.createHmac("sha1", key).update(body, "utf-8").digest("hex")
  );
}

module.exports.githubWebhookListener = function(event, context, callback) {
  var errMsg; // eslint-disable-line
  var token = process.env.GITHUB_WEBHOOK_SECRET;
  var headers = event.headers;
  var sig = headers["X-Hub-Signature"];
  var githubEvent = headers["X-GitHub-Event"];
  var id = headers["X-GitHub-Delivery"];
  var payload = event.body;
  var calculatedSig = signRequestBody(token, JSON.stringify(payload));

  if (typeof token !== "string") {
    errMsg = "[401] must provide a 'GITHUB_WEBHOOK_SECRET' env variable";
    return callback(new Error(errMsg));
  }

  if (!sig) {
    errMsg = "[401] No X-Hub-Signature found on request";
    return callback(new Error(errMsg));
  }

  if (!githubEvent) {
    errMsg = "[422] No X-Github-Event found on request";
    return callback(new Error(errMsg));
  }

  if (!id) {
    errMsg = "[401] No X-Github-Delivery found on request";
    return callback(new Error(errMsg));
  }

  if (sig !== calculatedSig) {
    errMsg =
      "[401] X-Hub-Signature incorrect. Github webhook token doesn't match";
    return callback(new Error(errMsg));
  }

  /* eslint-disable */
  console.log("---------------------------------");
  console.log(
    'Github-Event: "' + githubEvent + '" with action: "' + payload.action + '"'
  );
  console.log("---------------------------------");
  console.log("Payload", payload);
  /* eslint-enable */

  if (
    (payload.action === "opened" || payload.action === "reopened") &&
    payload.pull_request.user.login === "greenkeeper[bot]"
  ) {
    // default title
    var title = "chore(deps): " + payload.pull_request.title.toLowerCase();
    // We split username/repo information and make assumptions later.
    var repo = payload.pull_request.head.repo.full_name.split("/");
    var repoOwner = repo[0];
    var repoName = repo[1];

    var options = {
      // Github token
      token: process.env.GITHUB_TOKEN,
      // Repo owner
      owner: repoOwner,
      // Repo name
      repo: repoName,
      // Labels to add
      labels: ["tag: internal", "automated"],
      // Set title to this
      title: "chore(deps): update dependencies - noissue"
    };

    github.authenticate({
      type: "token",
      token: options.token
    });

    // Add label
    github.issues.addLabels({
      owner: options.owner,
      repo: options.repo,
      number: payload.pull_request.number,
      labels: options.labels
    });

    // Update title
    github.pullRequests.update({
      owner: options.owner,
      repo: options.repo,
      number: payload.pull_request.number,
      title: options.title
    });
  }

  var response = {
    statusCode: 200,
    body: JSON.stringify({
      input: event
    })
  };

  return callback(null, response);
};
