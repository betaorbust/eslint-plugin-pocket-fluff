/**
 * @fileoverview Disallow jsx spread usage.
 * @author Jacques Favreau (@betaorbust)
 * @copyright 2016 Jacques Favreau (@betaorbust). All rights reserved.
 * See LICENSE file in root directory for full license.
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const errorString = `Explicitly define props instead of using JSX spread.
line-ignore if you're making a Higher Order Component.
Rule explanation and how to fix: https://goo.gl/RShcXl`;

module.exports = {
	meta: {
		docs: {
			description: 'Disallow JSX spread',
			category: 'Best Practices',
			recommended: true,
		},
		schema: [], // no options
	},
	create(context) {
		return {
			JSXSpreadAttribute(node) {
				context.report({
					node,
					message: errorString,
				});
			},
		};
	},
};

module.exports.errorString = errorString;
