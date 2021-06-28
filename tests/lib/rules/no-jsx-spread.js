/**
 * @fileoverview Disallow jsx spread usage.
 * @author Jacques Favreau (@betaorbust)
 * @copyright 2016 Jacques Favreau (@betaorbust). All rights reserved.
 * See LICENSE file in root directory for full license.
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib').rules['no-jsx-spread'];

const { errorString } = rule;

const parserOptions = {
	ecmaVersion: 6,
	ecmaFeatures: {
		jsx: true,
	},
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-jsx-spread', rule, {
	valid: [
		{
			code: 'React.createClass({render(){ return <Bar prop1={ this.props.prop1 } prop2={ this.props.prop2 } /> } });',
		},
	],

	invalid: [
		{
			code: 'React.createClass({render(){ return <Bar {...this.props} /> } });',
			errors: [
				{
					message: errorString,
					type: 'JSXSpreadAttribute',
				},
			],
		},
	],
});
