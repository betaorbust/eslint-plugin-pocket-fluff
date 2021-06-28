'use strict';

const ESLintTester = require('eslint').RuleTester;
const fs = require('fs');
const path = require('path');
const rule = require('../../../lib').rules['no-react-scope-bound-assignment'];

const eslintTester = new ESLintTester();

const parserOptions = {
    ecmaVersion: 6,
    ecmaFeatures: { jsx: true }
};

const env = { node: true };

const failureCase = fs.readFileSync(
    path.join(__dirname, './fixtures/no-react-scope-bound-assignment/failure.jsx'),
    'utf8'
);
const successCase = fs.readFileSync(
    path.join(__dirname, './fixtures/no-react-scope-bound-assignment/success.jsx'),
    'utf8'
);

eslintTester.run('no-react-scope-bound-assignment', rule, {
    valid: [
        {
            code: successCase,
            parserOptions: parserOptions,
            env: env
        }
    ],
    invalid: [
        {
            code: failureCase,
            errors: [
                {
                    message:
                        'outsideVariable is initialized outside of a react class, but reassigned within one.'
                }
            ],
            parserOptions: parserOptions,
            env: env
        }
    ]
});
