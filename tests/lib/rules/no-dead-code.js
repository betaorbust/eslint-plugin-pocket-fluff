/**
 * @fileoverview Disallow code past its marked @deathdate.
 * @author
 * See LICENSE file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Requires
//------------------------------------------------------------------------------
const rule = require('../../../lib').rules['no-dead-code'];
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
    ecmaVersion: 6
};

//------------------------------------------------------------------------------
// Tests
// Big old note: RuleTester doesn't expose any before/after/etc. so mocking out
// date wasn't possible. As a result, we have to go with extreme test cases and
// hope that no testing system has its clock in a bad state :(
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });

const lineComment = `// @deathdate {{DATE}} developer@example.com This should die soon.
console.log('something');`;

const blockComment = `/*
 *  @deathdate {{DATE}} developer@example.com This should die soon.
 */
console.log('something else');`;

const malformed = [
    '// @deathdate not-a-date developer@example.com',
    '// @deathdate 1/2/3018 @twitter'
];

ruleTester.run('no-dead-code', rule, {
    valid: [
        {
            code: lineComment.replace('{{DATE}}', '1/1/3000')
        },
        {
            code: blockComment.replace('{{DATE}}', '1/1/3000')
        }
    ],

    invalid: [
        {
            code: malformed[0],
            errors: [{ messageId: 'malformedAnnotation' }]
        },
        {
            code: malformed[1],
            errors: [{ messageId: 'malformedAnnotation' }]
        },
        {
            code: lineComment.replace('{{DATE}}', '1/1/1969'),
            errors: [{ messageId: 'deadCode' }]
        },
        {
            code: blockComment.replace('{{DATE}}', '1/1/1969'),
            errors: [{ messageId: 'deadCode' }]
        }
    ]
});
