Changelog
============
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.2.0]  - Apr 19 2018
## Added
- CHANGELOG.md
- `no-dead-code` rule now accepts `annotation` option to allow renaming the triggering annotation.
## Changed
- `no-dead-code` now prefers `@removeby` following community feedback. Not a breaking change as `@deathdate` still works, but all docs have been updated to reflect the new preference.
## Deprecated
- `no-dead-code` users should switch from `@deathdate` to `@removeby` annotations, or update their rule options to explicitly use `@deathdate`, which will be removed as a usable default in 2.x.x.


## [1.1.1]  - Apr 18 2018
## Fixed
- Bug in `no-dead-code` rule not accepting default options.

## [1.1.0]  - Apr 18 2018
Configurable `no-dead-code`.
## Added
- `no-dead-code` rule now accepts `currentEpochTimeMS` option
- `no-dead-code` rule now accepts `daysBeforeDeathToReport` option

## [1.0.1] - Apr 16 2018
Engine bugfix.
## Added
- Node >= 6 now required.


## [1.0.0] - Apr 16 2018
Initial release of the project!
### Added
- `no-dead-code` rule.
- `no-jsx-spread` rule ported from its repo.
- `no-reassigned-consts` ported from its repo.