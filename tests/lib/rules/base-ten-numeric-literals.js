/**
 * @fileoverview Disable octal, hex, and boolean numeric literals.
 * @author
 * See LICENSE file in root directory for full license.
 */

//------------------------------------------------------------------------------
// Requires
//------------------------------------------------------------------------------
const { RuleTester } = require('eslint');
const rule = require('../../../lib').rules['base-ten-numeric-literals'];

const parserOptions = {
	ecmaVersion: 6,
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('base-ten-numeric-literals', rule, {
	valid: ['const _0xod = "Ox123";', 'console.log("Ob101010");'],

	invalid: [
		{
			code: 'console.log(0x123); const b = 0b1010; const o = 0123; const O = 0o123;',
			errors: [
				{ messageId: 'usedNonBaseTen' },
				{ messageId: 'usedNonBaseTen' },
				{ messageId: 'usedNonBaseTen' },
				{ messageId: 'usedNonBaseTen' },
			],
			output: 'console.log(291); const b = 10; const o = 83; const O = 83;',
		},
	],
});
