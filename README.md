# vile-scsslint

A [Vile](http://vile.io) plugin for
[SCSS-Lint](https://github.com/brigade/scss-lint).

## Requirements

- [nodejs](http://nodejs.org)
- [npm](http://npmjs.org)
- [ruby](http://nodejs.org)
- [rubygems](http://rubygems.org)

## Installation

Currently, you need to have the `scsslint` CLI installed globally.

Example:

    npm i vile-scsslint
    gem install scss_lint

## Config

Currently, you need to have a `.scss-lint.yml` file to have detailed config.

You can also specify a custom config file in you `.vile.yml`:

```yaml
scsslint:
  config: .my-scss-lint-config.yml
```

## Architecture

This project is currently written in JavaScript. `scss_lint` provides
a JSON CLI output that is currently used until a more ideal
IPC option is implemented.

## Hacking

    cd vile-scsslint
    npm install
    npm run dev
    npm test
