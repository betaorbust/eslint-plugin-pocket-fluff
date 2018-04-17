# eslint-plugin-pocket-fluff

[![Greenkeeper badge](https://badges.greenkeeper.io/betaorbust/eslint-plugin-pocket-fluff.svg)](https://greenkeeper.io/)
[![Npm Version](https://img.shields.io/npm/v/eslint-plugin-pocket-fluff.svg)](https://www.npmjs.com/package/eslint-plugin-pocket-fluff)
[![Node version requirements](https://img.shields.io/node/v/eslint-plugin-pocket-fluff.svg)](https://github.com/betaorbust/eslint-plugin-pocket-fluff/blob/master/package.json)
[![Travis branch](https://img.shields.io/travis/betaorbust/eslint-plugin-pocket-fluff/master.svg)](https://travis-ci.org/betaorbust/eslint-plugin-pocket-fluff)
[![Dependencies up to date](https://david-dm.org/betaorbust/eslint-plugin-pocket-fluff.svg)](https://david-dm.org/betaorbust/eslint-plugin-pocket-fluff)
[![Dev dependencies up to date](https://david-dm.org/betaorbust/eslint-plugin-pocket-fluff/dev-status.svg)](https://david-dm.org/betaorbust/eslint-plugin-pocket-fluff?type=dev)

A collection of eslint rules.


## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-pocket-fluff`:

```
$ npm install eslint-plugin-pocket-fluff --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-pocket-fluff` globally.

## Usage

Add `pocket-fluff` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "pocket-fluff"
    ]
}
```


Then configure the rules you want to use under the rules section in your .eslintrc file.

```json
{
    "rules": {
        "pocket-fluff/no-jsx-spread": "error",
        "pocket-fluff/no-dead-code": "error"
    }
}
```

## Supported Rules

### no-jsx-spread
Disallow the use of the JSX spread for perf and DX reasons. [README](docs/rules/no-jsx-spread.md)


### no-dead-code
Disallow code past its marked @deathdate. [README](docs/rules/no-dead-code.md)

### no-reassigned-consts
Disallow Reassignments of consts and Const-named variables. [README](docs/rules/no-reassigned-consts.md)