# Disallow octal, hex, and boolean numeric literals. (base-ten-numeric-literals)

Non base ten numerals are hard for humans to parse. This rule limits literals to only being base ten.

- [Rule details](#rule-details)
- [Patterns considered warnings/errors](#patterns-considered-warningserrors)
- [Patterns not considered warnings/errors](#patterns-not-considered-warningserrors)
- [Installation](#installation)
- [Options](#options)
- [When not to use it](#when-not-to-use-it)

## Rule details

Numeric literals, broadly, are easier to understand when they're not in octal, binary, or hex. There are situations where that might be useful, but in general, sticking to numbers people can read is the safer path.

Additionally, this rule can be used to deobfuscate a compiled JS file, like the ones coming out of https://obfuscator.io/ via the provided --fix method.

## Patterns considered warnings/errors

```js
console.log(0x123);
const a = 0b1010;
const b = 0123;
const c = 0o123;
```

## Patterns not considered warnings/errors

```js
console.log(1);
const a = 32_000;
const b = 123n;
```

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

No options.

## When not to use it

When you don't care about being able to read numbers, or are working with binary, hex, or octal values directly.
