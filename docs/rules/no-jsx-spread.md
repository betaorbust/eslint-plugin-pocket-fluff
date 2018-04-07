# Disallow JSX Spread.  (no-jsx-spread)
After chasing some performance issues the spread operator was found to be 
particularly slow. Additionally, when the engineers went to rework that code,
the use of the spread operator made the code very hard to understand and track,
due to the implicit passing of variables.

With a performance and a DX reason against it, we've decided to call the spread
operator an anti-pattern for our codebase.

## Rule Details
This rule aims to disallow the use of JSX spread.

### The following patterns are considered warnings/errors:
```jsx
const Foo = React.createClass({
	render(){
    	 return <Bar {...this.props} />  
    }
});
```

### The following patterns are not warnings:
```jsx
React.createClass({
  render(){
    return <Bar prop1={ this.props.prop1 } prop2={ this.props.prop2 } />
  }
});
```