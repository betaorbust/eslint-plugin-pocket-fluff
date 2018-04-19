'use strict';
/**
 * @fileoverview Disallow code past its marked @removeby.
 * @author Jacques Favreau (@betaorbust)
 * See LICENSE file in root directory for full license.
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Unify block and line comments as single-line comments.
 *
 * @param {object} comment   A block or line AST comment containing a removeby annotation.
 * @param {object} matchDefs Regex for matching and parsing the annotation.
 * @returns {object}         A normalized one-line comment with value and loc info.
 */
function normalizeBlockAndLineComments(comment, matchDefs) {
    if (comment.type === 'Line') {
        return comment;
    } else {
        const commentLines = comment.value.split('\n');
        const lineOffset = commentLines.findIndex((line) => line.match(matchDefs.annotation));
        const commentLine = comment.loc.start.line + lineOffset;
        const value = commentLines[lineOffset];
        return {
            value,
            loc: {
                start: { line: commentLine, column: comment.loc.start.column },
                end: { line: commentLine, column: comment.loc.start.column + value.length }
            }
        };
    }
}

/**
 * Checks a comment for death and reports out if TODAY is after the removeby.
 *
 * @param {object} comment     A comment AST node.
 * @param {object} context     The eslint context.
 * @param {date}   today       The date to check against.
 * @param {object} matchDefs   The regex values to detect and parse the annotation.
 * @returns {void}
 */
function checkForDeath(comment, context, today, matchDefs) {
    if (comment.value.match(matchDefs.annotation)) {
        const normalizedComment = normalizeBlockAndLineComments(comment, matchDefs);
        let removeby;
        let user;
        let description;
        try {
            [, removeby, user, description] = matchDefs.parse.exec(normalizedComment.value);
            removeby = new Date(removeby);
        } catch (e) {
            context.report({
                node: normalizedComment,
                messageId: 'malformedAnnotation'
            });
        }
        if (removeby < today) {
            context.report({
                node: normalizedComment,
                data: { removeby, user, description },
                messageId: 'deadCode'
            });
        }
    }
}

module.exports = {
    meta: {
        docs: {
            description: 'Death dates for old code.',
            category: 'Best Practices',
            recommended: true
        },
        messages: {
            deadCode: 'Code is past its expiration date. Please contact {{ user }}',
            malformedAnnotation:
                '@removeby annotation format: "@removeby <m/d/yyyy> <email address> [<optional message>]"'
        },
        schema: [
            {
                type: 'object',
                properties: {
                    currentEpochTimeMS: {
                        type: 'integer'
                    },
                    daysBeforeToReport: {
                        type: 'integer'
                    },
                    annotation: {
                        type: 'string'
                    }
                },
                additionalProperties: false
            }
        ]
    },
    create: function(context) {
        const ruleConfig = context.options[0] || {}; //values from the actual options

        // Building up the date to check against.
        const currentEpochTimeMS = Number.parseInt(ruleConfig.currentEpochTimeMS, 10) || Date.now();
        const daysBeforeToReport = Number.parseInt(ruleConfig.daysBeforeToReport, 10) || 0;
        const checkDate = new Date(currentEpochTimeMS + daysBeforeToReport * ONE_DAY_IN_MS);

        // Build up the regex to detect and parse an annotation.
        const ANNOTATION_MATCH_DEFAULT = '@removeby|@deathdate'; //Deathdate was v1, so keep for backwards compat
        const annotation = ruleConfig.annotation || ANNOTATION_MATCH_DEFAULT;
        const matchDefinitions = {
            annotation,
            parse: new RegExp(
                `^[^\\w]*(?:${annotation})[ \\t]+([\\d-\\/]*)[ \\t]+([^\\s@]+@\\S*)(?:[ \\t]+(.+)?)?$`,
                'im'
            )
        };

        return {
            Program: (node) => {
                if (node.comments && node.comments.length > 0) {
                    node.comments.forEach((comment) => {
                        checkForDeath(comment, context, checkDate, matchDefinitions);
                    });
                }
            }
        };
    }
};
