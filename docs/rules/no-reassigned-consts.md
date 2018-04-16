Disallow Reassignments of consts and const-named variables.  (no-reassigned-consts)
===================================================================================

## Context
Reassigned constant values are usually an indication of a bug or a mis-labeled
variable.
This rule will disallow reassigning consts or variables named like consts
(default: ALL_CAPS_SNAKE_CASE)

The rule is based on a similar rule by colonyamerican/eslint-plugin-cah but
with the added benefit of optionally processing variables as constants when
they're named like constants. You can define this naming convention via regex 
when configuring the rule at runtime.

This rule is aimed at eliminating errors and silent defects in code by ensuring
that constants are not assigned more then once.

## The following patterns are considered warnings/errors
```js
const a = 'Fry';
a = 'Leela';
```

```js
const a = 'a';
a = 'b';
```

```js
const b = 0;
++b;
```

```js
const c = {};
delete c;
```

All of the previous rules hold true when applied to a variable with a name that
matches the `constNameMatch` regex option.

```js
var THIS_IS_A_CONSTANT = 'Amy';
THIS_IS_A_CONSTANT = 'Zoidberg';
```

This will not:
```js
var AN_OBJECT = {};
AN_OBJECT.aProp = 'Nibbler';
```

## The following patterns are not warnings
```js
const a;
```

```js
const b = {};
b.a = 'a';
delete b.a;
b.b = 0;
++b.b;
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
        "pocket-fluff/no-jsx-spread": ["error", { "constNameMatch": "^CONST_" }]
    }
}

```

## When not to use it
When you want to be able to re-assign const values? Up to you...