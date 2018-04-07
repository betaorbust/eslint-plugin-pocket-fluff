# eslint-plugin-pocket-fluff

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


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "pocket-fluff/no-jsx-spread": 2,
        "pocket-fluff/no-stubs": 2
    }
}
```

## Supported Rules

### no-jsx-spread
Disallow the use of the JSX spread for perf and DX reasons. [README](docs/rules/no-jsx-spread.md)
