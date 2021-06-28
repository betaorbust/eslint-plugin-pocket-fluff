# Disallow assignment of scope-bound variables from within React classes (no-react-scope-bound-assignment)

This rule is aimed at eliminating errors and silent defects in code by ensuring that variables are not reassigned
after being scope bound into a React component class.

- [Rule details](#rule-details)
- [Patterns considered warnings/errors](#patterns-considered-warningserrors)
- [Patterns not considered warnings/errors](#patterns-not-considered-warningserrors)
- [Installation](#installation)
- [Options](#options)
- [When not to use it](#when-not-to-use-it)

## Rule details
Variables declared outside of a React.createClass call are scope bound inside that call. If the variable is assigned or reassigned from within the React class, this value is shared across all instances of the class, but more importantly, when isomporphically rendering in Node, the variable will be shared across all renders, as Node will require the
file only once.

This is a nasty little bug that can cause a ton of pain, and this rule will help you not fall into this specific trap.

### Patterns considered warnings/errors
```js
var a = 'Leela';
React.createClass({
    render: {
        if(a === 'Leela'){
            a = 'Fry';
        }
        return (<div>{{a}}</div>);
    }
});
```

### Patterns not considered warnings/errors

```js
var a = 'Leela';
if(a === 'Leela'){
    a = 'Fry';
}
React.createClass({
    render: {
        return (<div>{{a}}</div>);    
    }
});
```

## Options
This rule takes no options

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
        "pocket-fluff/no-react-scope-bound-assignment": "error"
    }
}
```

## When not to use it
If you are only running your code in the browser.