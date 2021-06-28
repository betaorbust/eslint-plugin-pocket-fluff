'use strict';

/**
 * @fileoverview Rule to flag writing to constant variables or variables named like constants.
 * @author Jacques Favreau
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
function noJsxScopeBoundWrites(context) {
    //--------------------------------------------------------------------------
    // Helpers
    // --------------------------------------------------------------------------

    const WARNING_MESSAGE =
        '{{name}} is initialized outside of a react class, but reassigned within one.';

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

    function insideReactCreateClass(ref) {
        if (
            ref.type === 'CallExpression' &&
            ref.callee.type === 'MemberExpression' &&
            ref.callee.object &&
            ref.callee.object.name === 'React' &&
            ref.callee.property &&
            ref.callee.property.name === 'createClass'
        ) {
            return true;
        }

        if (ref.identifier && ref.identifier.parent) {
            return insideReactCreateClass(ref.identifier.parent);
        } else if (ref.parent) {
            if (ref.parent.type && ref.parent.type === 'Program') {
                return false;
            }
            return insideReactCreateClass(ref.parent);
        }
        return false;
    }

    function checkScope(scope) {
        const variables = scope.variables;
        if (!scope.functionExpressionScope) {
            variables.forEach(function(variable) {
                if (
                    (scope.type === 'function' &&
                        variable.name === 'arguments' &&
                        variable.identifiers.length === 0) ||
                    !variable.defs[0]
                ) {
                    // Ignore implicit arguments variables and global environment variables
                    return;
                }

                const references = variable.references;
                const name = variable.name;
                const assignments = references.filter(isReassignment);
                if (assignments.length > 1) {
                    assignments.shift();
                    assignments.forEach(function(ref) {
                        if (insideReactCreateClass(ref)) {
                            context.report(ref.identifier, WARNING_MESSAGE, { name: name });
                        }
                    });
                }
            });
        }
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------
    return {
        'Program:exit': function(node) {
            let scope = context.getScope();
            // https://github.com/estools/escope/issues/56
            if (scope.type === 'global') {
                scope = {
                    childScopes: scope.childScopes,
                    variables: scope.variables.map(transformGlobalVariables.bind(null, scope))
                };
            }
            checkScope(scope.childScopes[0]);
        }
    };
}

module.exports = noJsxScopeBoundWrites;

module.exports.schema = [];
