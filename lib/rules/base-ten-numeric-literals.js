/**
 * @fileoverview Disable octal, hex, and boolean numeric literals.
 * @author
 * See LICENSE file in root directory for full license.
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const matcher = /^0[^.]/i;

module.exports = {
	meta: {
		docs: {
			description: `Disable octal, hex, and boolean numeric literals.`,
			category: 'Best Practices',
			recommended: true,
		},
		messages: {
			usedNonBaseTen: '"Use numeric literal instead of hex/ocatal/binary"',
		},
		fixable: 'code',
		schema: [], // no options
	},
	create(context) {
		return {
			Literal(node) {
				if (node.raw && matcher.test(node.raw)) {
					context.report({
						node,
						messageId: 'usedNonBaseTen',
						fix(fixer) {
							return [fixer.replaceText(node, node.value)];
						},
					});
				}
			},
		};
	},
};
