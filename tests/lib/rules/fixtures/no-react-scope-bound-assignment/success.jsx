const React = require('react');

const outsideVariable = 'Leela';
React.createClass({
	render() {
		let insideVariable = 'Inside Value';
		if (outsideVariable === 'Leela') {
			insideVariable = 'Inside value 2';
		}
		return insideVariable;
	},
});
