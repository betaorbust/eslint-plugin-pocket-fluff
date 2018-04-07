/**
 * @fileoverview Disallow jsx spread usage.
 * @author Jacques Favreau (@betaorbust)
 * @copyright 2016 Jacques Favreau (@betaorbust). All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib').rules['no-jsx-spread'];
const errorString = rule.errorString;
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
    ecmaVersion: 6,
    ecmaFeatures: {
        jsx: true
    }
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('no-jsx-spread', rule, {
    valid: [
        {
            code:
                'React.createClass({render(){ return <Bar prop1={ this.props.prop1 } prop2={ this.props.prop2 } /> } });',
            parserOptions
        }
    ],

    invalid: [
        {
            code: 'React.createClass({render(){ return <Bar {...this.props} /> } });',
            errors: [
                {
                    message: errorString,
                    type: 'JSXSpreadAttribute'
                }
            ],
            parserOptions
        }
    ]
});
