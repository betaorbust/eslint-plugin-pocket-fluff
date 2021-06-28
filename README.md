# eslint-plugin-pocket-fluff

[![Npm Version](https://img.shields.io/npm/v/eslint-plugin-pocket-fluff.svg)](https://www.npmjs.com/package/eslint-plugin-pocket-fluff)
[![Node version requirements](https://img.shields.io/node/v/eslint-plugin-pocket-fluff.svg)](https://github.com/betaorbust/eslint-plugin-pocket-fluff/blob/master/package.json) [![Node.js CI status](https://github.com/betaorbust/eslint-plugin-pocket-fluff/workflows/Node.js%20CI/badge.svg)](https://github.com/betaorbust/eslint-plugin-pocket-fluff/actions)

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
	"plugins": ["pocket-fluff"]
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

## Current Rules

### no-jsx-spread

Disallow the use of the JSX spread for perf and DX reasons. [README](docs/rules/no-jsx-spread.md)

### no-dead-code

Disallow code past its marked @removeby. [README](docs/rules/no-dead-code.md)

### no-reassigned-consts

Disallow Reassignments of consts and Const-named variables. [README](docs/rules/no-reassigned-consts.md)

### no-react-scope-bound-assignment

Disallow reassigning external variables from inside react components. [README](docs/rules/no-react-scope-bound-assignment.md)
