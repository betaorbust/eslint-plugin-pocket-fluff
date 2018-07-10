'use strict';
/**
 * @fileoverview Disallow Reassignments of consts and Const-named variables.
 * @author Jacques Favreau (@betaorbust)
 * See LICENSE file in root directory for full license.
 */

/**
 * Assigns references to corresponding variable
 *
 * @param   {Scope}    scope    An escope object
 * @param   {Variable} variable Variable to apply references too
 * @returns {Variable}          returns the variable with references
 * @private
 */
function transformGlobalVariables(scope, variable) {
    if (variable.references.length === 0) {
        scope.references.forEach(function(ref) {
            if (ref.identifier.name === variable.name) {
                variable.references.push(ref);
            }
        });
    }

    return variable;
}

/**
 * Check if a node is a unary delete expression
 *
 * @param   {ASTNode} node The node to compare
 * @returns {boolean}      True if it's a unary delete expression, false if not.
 * @private
 */
function isUnaryDelete(node) {
    return (
        node &&
        node.type === 'UnaryExpression' &&
        node.operator === 'delete' &&
        node.argument.type === 'Identifier'
    );
}

/**
 * Determines if the reference should be counted as a re-assignment
 *
 * @param {Reference} ref The reference to check.
 * @returns {boolean} True if it"s a valid reassignment, false if not.
 * @private
 */
function isReassignment(ref) {
    let isWrite = ref.isWrite() || !ref.isReadOnly();

    if (!isWrite && isUnaryDelete(ref.identifier.parent)) {
        isWrite = true;
    }

    return isWrite;
}

/**
 * Check if a variable is a const or named like one.
 * @private
 * @param   {string}  name    Name of the variables
 * @param   {Regex}   [constNameRegex] Optional regex to match
 * @returns {boolean}         True if variable is a constant value.
 */
function isConst(name, constNameRegex) {
    return constNameRegex && constNameRegex.test(name);
}

/**
 * Checks a given scope for const and const-like variables that are
 * reassigned.
 * @param {Object} context The linting context.
 * @param {Object} scope The scope to check for assignment in.
 * @param {Object|Boolean} constNameRegex Regex to match const-like names.
 * @returns {void}
 */
function checkScope(context, scope, constNameRegex) {
    const variables = scope.variables;
    if (!scope.functionExpressionScope) {
        variables.forEach(function(variable) {
            if (
                (scope.type === 'function' &&
                    variable.name === 'arguments' &&
                    variable.identifiers.length === 0) ||
                !variable.defs[0] ||
                !isConst(variable.name, constNameRegex)
            ) {
                // Ignore implicit arguments variables and global environment variables
                return;
            }

            const references = variable.references;
            const name = variable.name;
            const assignments = references.filter(isReassignment);

            if (assignments.length > 1) {
                // remove original assignment
                assignments.shift();

                assignments.forEach(function(ref) {
                    context.report({
                        node: ref.identifier,
                        messageId: 'reassignedConst',
                        data: { name }
                    });
                });
            }
        });
    }
    scope.childScopes.forEach((childScope) => checkScope(context, childScope, constNameRegex));
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'Disallow Reassignments of Const-named variables.',
            category: 'Best Practices',
            recommended: true
        },
        messages: {
            reassignedConst: '{{name}} is a named like a constant and should not be reassigned.'
        },
        schema: [
            {
                type: 'object',
                properties: {
                    constNameMatch: {
                        type: 'string'
                    }
                },
                additionalProperties: false
            }
        ]
    },
    create: function(context) {
        let constNameRegex = context.options[1]; // Can be a string, not set, or a boolean false
        if (typeof constNameRegex === 'string') {
            constNameRegex = new RegExp(context.options[1]);
        } else if (constNameRegex !== false) {
            constNameRegex = /^[A-Z0-9_]+$/;
        } else {
            constNameRegex = false;
        }

        return {
            'Program:exit': function() {
                let scope = context.getScope();
                // https://github.com/estools/escope/issues/56
                if (scope.type === 'global') {
                    scope = {
                        childScopes: scope.childScopes,
                        variables: scope.variables.map(transformGlobalVariables.bind(null, scope))
                    };
                }
                checkScope(context, scope, constNameRegex);
            }
        };
    }
};
