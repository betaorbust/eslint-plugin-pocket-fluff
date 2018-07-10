Disallow Reassignments of const-named variables.  (no-reassigned-consts)
===================================================================================

Reassigning constant-like variables is a constant source of bugs.

- [Disallow Reassignments of const-named variables. (no-reassigned-consts)](#disallow-reassignments-of-const-named-variables-no-reassigned-consts)
    - [Rule details](#rule-details)
    - [Patterns considered warnings/errors](#patterns-considered-warningserrors)
    - [Patterns not considered warnings/errors](#patterns-not-considered-warningserrors)
    - [Installation](#installation)
    - [Options](#options)
    - [When not to use it](#when-not-to-use-it)
## Rule details
*THIS RULE WAS UPDATED IN 2.x.x TO NOT CHECK CONST VARIABLES (via the ES2015 `const` 
syntax) because ESLint's built-in [no-const-assign](https://eslint.org/docs/rules/no-const-assign)
will handle this now. This rule now only focuses on const-named variables.*

Reassigned constant values are usually an indication of a bug or a mis-labeled
variable.
This rule will disallow reassigning variables named like consts
(default: ALL_CAPS_SNAKE_CASE)

The rule is based on a similar rule by colonyamerican/eslint-plugin-cah but
with the added benefit of optionally processing variables as constants when
they're named like constants. You can define this naming convention via regex 
when configuring the rule at runtime.

This rule is aimed at eliminating errors and silent defects in code by ensuring
that constants are not assigned more then once.

## Patterns considered warnings/errors

```js
var THIS_IS_A_CONSTANT = 'Amy';
THIS_IS_A_CONSTANT = 'Zoidberg';
```


## Patterns not considered warnings/errors
```js
var AN_OBJECT = {};
AN_OBJECT.aProp = 'Nibbler';
```

```js
var SOMETHING = 'something... dark side.';
console.log(SOMETHING);
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
        "pocket-fluff/no-reassigned-consts": "error"
    }
}
```

## Options
This rule takes one option, which is `constNameMatch`. 

`constNameMatch` defaults to `^[A-Z0-9_]+$`, matching variables like 
`ALL_CAPS_NUMB3RS_AND_UNDERSCORES` as constant-named variables. 

Name checking can be turned off by setting `constNameMatch` to `false`.

For example, if you were only matching against variables that start with 
`CONST_`, your .eslintrc file might look like this:
```json
{
    "plugins": [
        "pocket-fluff"
    ],
    "rules": {
        "pocket-fluff/no-reassigned-consts": ["error", { "constNameMatch": "^CONST_" }]
    }
}

```

## When not to use it
When you want to be able to re-assign const values? Up to you...