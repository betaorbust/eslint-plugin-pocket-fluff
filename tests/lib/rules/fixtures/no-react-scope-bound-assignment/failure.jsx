'use strict';
const React = require('react');
let outsideVariable = 'Leela';
React.createClass({
    render: function() {
        if (outsideVariable === 'Leela') {
            outsideVariable = 'Inside Value';
        }
        return outsideVariable;
    }
});
