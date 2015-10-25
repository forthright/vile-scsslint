let _ = require("lodash")
let vile = require("@brentlintner/vile")
const scsslint_bin = "scss-lint"

// TODO: support custom ignoring via config

let scsslint = (custom_config_path) => {
  let opts = {}

  if (typeof custom_config_path == "string") {
    opts.c = custom_config_path
  }

  opts.args = _.reduce(opts, (arr, option, name) => {
    return arr.concat([`-${name}`, option])
  }, []).concat(["-f", "JSON"])

  return vile
    .spawn(scsslint_bin, opts)
    .then((stdout) => {
      try {
        return JSON.parse(stdout)
      } catch (e) {
        // TODO: better - HACK (no -q option, shows text if nothing found)
        return []
      }
    })
}

let to_vile_issue = (severity="") => {
  return severity.toLowerCase() == "warning" ?
    vile.WARNING : vile.ERROR
}

let vile_issue = (issue, file) => {
  return vile.issue(
    to_vile_issue(issue.severity),
    file,
    `${issue.reason} (${issue.linter})`,
    { line: issue.line, character: issue.column }
  )
}

let punish = (plugin_config) => {
  return scsslint(_.get(plugin_config, "config"))
    .then((issues_per_file) => {
      return _.flatten(_.map(issues_per_file, (per_file, file) => {
        return _.map(per_file, (issue) => vile_issue(issue, file))
      }))
    })
}

module.exports = {
  punish: punish
}
