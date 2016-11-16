let _ = require("lodash")
let vile = require("@forthright/vile")
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
    .then((spawn_data) => {
      let stdout = _.get(spawn_data, "stdout")
      try {
        return JSON.parse(stdout)
      } catch (e) {
        // TODO: better - HACK (no -q option, shows text if nothing found)
        return []
      }
    })
}

let to_vile_issue = (severity="") =>
  severity.toLowerCase() == "warning" ?
    vile.STYL : vile.ERR

let vile_issue = (issue, file) =>
  vile.issue({
    type: to_vile_issue(issue.severity),
    path: file,
    title: `${issue.reason} (${issue.linter})`,
    message: `${issue.reason} (${issue.linter})`,
    signature: `scsslint::${issue.linter}`,
    where: {
      start: { line: issue.line, character: issue.column }
    }
  })

let punish = (plugin_config) =>
  scsslint(_.get(plugin_config, "config"))
    .then((issues_per_file) =>
      _.flatten(_.map(issues_per_file, (per_file, file) =>
        _.map(per_file, (issue) => vile_issue(issue, file))
      )))

module.exports = {
  punish: punish
}
