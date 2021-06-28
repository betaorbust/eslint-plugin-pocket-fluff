/**
 * @fileoverview Disallow Reassignments of consts and Const-named variables.
 * @author
 * See LICENSE file in root directory for full license.
 */

//------------------------------------------------------------------------------
// Requires
//------------------------------------------------------------------------------
const { RuleTester } = require('eslint');
const rule = require('../../../lib').rules['no-reassigned-consts'];

const parserOptions = {
	ecmaVersion: 6,
	// ecmaFeatures: {
	// 	jsx: true
	// }
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-reassigned-consts', rule, {
	valid: [
		{
			code: 'var CONST_VAL = "Amy";',
		},
	],
	invalid: [
		{
			code: 'var CONST_VALUE = "Amy"; CONST_VALUE = "Rory";',
			errors: [{ messageId: 'reassignedConst', data: { name: 'CONST_VALUE' } }],
		},
	],
});
