# vile-scsslint

A [Vile](http://vile.io) plugin for identifying common style
and maintainability issues in your Sass files (via [SCSS-Lint](https://github.com/brigade/scss-lint)).

**NOTICE**

This project is not actively maintained. If you want to
help maintain the project, or if you have a better
alternative to switch to, please open an issue and ask!

## Requirements

- [Node.js](http://nodejs.org)
- [Ruby](https://www.ruby-lang.org)

## Installation

Currently, you need to have the `scss_lint` CLI installed globally.

Example:

    npm i -D vile vile-scsslint
    gem install scss_lint

## Config

Currently, you need to have a `.scss-lint.yml` file to have detailed config.

You can also specify a custom config file in you `.vile.yml`:

```yaml
scsslint:
  config: .my-scss-lint-config.yml
```

## Versioning

This project uses [Semver](http://semver.org).

## Licensing

This project is licensed under the [MPL-2.0](LICENSE) license.

Any contributions made to this project are made under the current license.

## Contributions

Current list of [Contributors](https://github.com/forthright/vile-scsslint/graphs/contributors).

Any contributions are welcome and appreciated!

All you need to do is submit a [Pull Request](https://github.com/forthright/vile-scsslint/pulls).

1. Please consider tests and code quality before submitting.
2. Please try to keep commits clean, atomic and well explained (for others).

### Issues

Current issue tracker is on [GitHub](https://github.com/forthright/vile-scsslint/issues).

Even if you are uncomfortable with code, an issue or question is welcome.

### Code Of Conduct

By participating in this project you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).

## Architecture

This project is currently written in JavaScript. `scss_lint` provides
a JSON CLI output that is currently used until a more ideal
IPC option is implemented.

## Developing

    cd vile-scsslint
    npm install
    npm run dev
    npm test
