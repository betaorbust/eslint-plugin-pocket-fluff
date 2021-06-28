const React = require('react');

let outsideVariable = 'Leela';
React.createClass({
	render() {
		if (outsideVariable === 'Leela') {
			outsideVariable = 'Inside Value';
		}
		return outsideVariable;
	},
});
