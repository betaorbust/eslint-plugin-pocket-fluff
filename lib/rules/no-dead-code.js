'use strict';
/**
 * @fileoverview Disallow code past its marked @deathdate.
 * @author Jacques Favreau (@betaorbust)
 * See LICENSE file in root directory for full license.
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const DEATH_ANNOTATION_MATCH = /@deathdate/i;
const DEATH_PARSE_MATCH = /^[^\w]*@deathdate ([\d-\/]*) ([^\s@]+@\S*)(?:[ \t]+(.+)?)?$/im;
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Unify block and line comments as single-line comments.
 *
 * @param {object} comment A block or line AST comment containing a deathdate annotation.
 * @returns {object}       A normalized one-line comment with value and loc info.
 */
function normalizeBlockAndLineComments(comment) {
    if (comment.type === 'Line') {
        return comment;
    } else {
        const commentLines = comment.value.split('\n');
        const lineOffset = commentLines.findIndex((line) => line.match(DEATH_ANNOTATION_MATCH));
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
 * Checks a comment for death and reports out if TODAY is after the deathdate.
 *
 * @param {object} comment  A comment AST node.
 * @param {object} context  The eslint context.
 * @param {object} options  The rule options.
 * @returns {void}
 */
function checkForDeath(comment, context, options) {
    if (comment.value.match(DEATH_ANNOTATION_MATCH)) {
        const normalizedComment = normalizeBlockAndLineComments(comment);
        let deathDate;
        let user;
        let description;
        try {
            [, deathDate, user, description] = DEATH_PARSE_MATCH.exec(normalizedComment.value);
            deathDate = new Date(deathDate);
        } catch (e) {
            context.report({
                node: normalizedComment,
                messageId: 'malformedAnnotation'
            });
        }
        if (
            deathDate <
            options.currentEpochTimeMS + options.daysBeforeDeathToReport * ONE_DAY_IN_MS
        ) {
            context.report({
                node: normalizedComment,
                data: { deathDate, user, description },
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
            deadCode: 'This code is past its expiration date. Please contact {user}',
            malformedAnnotation:
                '@deathdate annotation format: "@deathdate <m/d/yyyy> <email address> [<optional message>]"'
        },
        schema: [
            {
                type: 'object',
                properties: {
                    currentEpochTimeMS: {
                        type: 'integer'
                    },
                    daysBeforeDeathToReport: {
                        type: 'integer'
                    }
                },
                additionalProperties: false
            }
        ]
    },
    create: function(context) {
        const options = Object.assign(
            { currentEpochTimeMS: Date.now, daysBeforeDeathToReport: 0 }, //defaults
            context.options[0] || {} //values from the actual options
        );
        return {
            Program: (node) => {
                if (node.comments && node.comments.length > 0) {
                    node.comments.forEach((comment) => {
                        checkForDeath(comment, context, options);
                    });
                }
            }
        };
    }
};
