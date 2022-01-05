# Disable octal, hex, and boolean numeric literals. (base-ten-numeric-literals)

Add a short description here.

- [Rule details](#rule-details)
- [Patterns considered warnings/errors](#patterns-considered-warningserrors)
- [Patterns not considered warnings/errors](#patterns-not-considered-warningserrors)
- [Installation](#installation)
- [Options](#options)
- [When not to use it](#when-not-to-use-it)

## Rule details

## Patterns considered warnings/errors

## Patterns not considered warnings/errors

## Installation

Install the pocket-fluff eslint plugin in your project.

```bash
# NPM
npm install eslint-plugin-pocket-fluff --dev

# Yarn
yarn add eslint-plugin-pocket-fluff --dev
```

Enable the plugin and the rule in your .eslintrc ([or other config](https://eslint.org/docs/user-guide/configuring)) file.

```json
{
	"plugins": ["pocket-fluff"],
	"rules": {
		"pocket-fluff/base-ten-numeric-literals": "error"
	}
}
```

## Options

## When not to use it
