"use strict";

var _ = require("lodash");
var vile = require("@brentlintner/vile");
var scsslint_bin = "scss-lint";

// TODO: support custom ignoring via config

var scsslint = function scsslint(custom_config_path) {
  var opts = {};

  if (typeof custom_config_path == "string") {
    opts.c = custom_config_path;
  }

  opts.args = _.reduce(opts, function (arr, option, name) {
    return arr.concat(["-" + name, option]);
  }, []).concat(["-f", "JSON"]);

  return vile.spawn(scsslint_bin, opts).then(function (stdout) {
    try {
      return JSON.parse(stdout);
    } catch (e) {
      // TODO: better - HACK (no -q option, shows text if nothing found)
      return [];
    }
  });
};

var to_vile_issue = function to_vile_issue() {
  var severity = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
  return severity.toLowerCase() == "warning" ? vile.STYL : vile.ERR;
};

var vile_issue = function vile_issue(issue, file) {
  return vile.issue({
    type: to_vile_issue(issue.severity),
    path: file,
    title: issue.reason + " (" + issue.linter + ")",
    message: issue.reason + " (" + issue.linter + ")",
    signature: "scsslint::" + issue.linter,
    where: {
      start: { line: issue.line, character: issue.column }
    }
  });
};

var punish = function punish(plugin_config) {
  return scsslint(_.get(plugin_config, "config")).then(function (issues_per_file) {
    return _.flatten(_.map(issues_per_file, function (per_file, file) {
      return _.map(per_file, function (issue) {
        return vile_issue(issue, file);
      });
    }));
  });
};

module.exports = {
  punish: punish
};