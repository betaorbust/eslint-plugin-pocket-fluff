# Disallow JSX Spread.  (no-jsx-spread)
This rule aims to disallow the use of JSX spread.
(#disallow-jsx-spread-no-jsx-spread)

- [Rule details](#rule-details)
- [Patterns considered warnings/errors](#patterns-considered-warningserrors)
- [Patterns not considered warnings/errors](#patterns-not-considered-warningserrors)
- [Installation](#installation)
- [Options](#options)
- [When not to use it](#when-not-to-use-it)
## Rule details
After chasing some performance issues the spread operator was found to be 
particularly slow. Additionally, when the engineers went to rework that code,
the use of the spread operator made the code very hard to understand and track,
due to the implicit passing of variables.

With a performance and a DX reason against it, we've decided to call the spread
operator an anti-pattern for our codebase.

## Patterns considered warnings/errors
```jsx
const Foo = React.createClass({
	render(){
    	 return <Bar {...this.props} />  
    }
});
```

## Patterns not considered warnings/errors
```jsx
React.createClass({
  render(){
    return <Bar prop1={ this.props.prop1 } prop2={ this.props.prop2 } />
  }
});
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
        "pocket-fluff/no-dead-code": "error"
    }
}
```

## Options
This rule has no options. 

## When not to use it
If you want to allow JSX spread operations.