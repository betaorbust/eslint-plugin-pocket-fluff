/**
 * @fileoverview Disallow Reassignments of consts and Const-named variables.
 * @author
 * See LICENSE file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Requires
//------------------------------------------------------------------------------
const rule = require('../../../lib').rules['no-reassigned-consts'];
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
    ecmaVersion: 6
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
            code: 'var a = "a"; a = "b";'
        },
        {
            code: 'var CONST_VAL = "Amy";'
        },
        {
            code: 'let a = "a"; a = "b";'
        },
        {
            code: 'const a = "a";'
        },
        {
            code: 'const a = {};'
        },
        {
            code: 'const a = 0;'
        },
        {
            code: 'const {a, b} = [1, 2];'
        },
        {
            code: 'const a = {}; a.a = "a"; delete a.a; a.r = 0; ++a.r;'
        }
    ],
    invalid: [
        {
            code: 'const {a, b} = [1, 2]; a = 3;',
            errors: [{ messageId: 'reassignedConst', data: { name: 'a' } }]
        },
        {
            code: 'const b = "b"; b = "c";',
            errors: [{ messageId: 'reassignedConst', data: { name: 'b' } }]
        },
        {
            code: 'const c = 0; ++c;',
            errors: [{ messageId: 'reassignedConst', data: { name: 'c' } }]
        },
        {
            code: 'function test() { const d = 0; delete d; }',
            errors: [{ messageId: 'reassignedConst', data: { name: 'd' } }]
        },
        {
            code: 'var CONST_VALUE = "Amy"; CONST_VALUE = "Rory";',
            errors: [{ messageId: 'reassignedConst', data: { name: 'CONST_VALUE' } }]
        }
    ]
});
