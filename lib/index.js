/* eslint-disable  global-require */

/**
 * @fileoverview A collection of  eslint rules.
 * @author Jacques Favreau (@betaorbust)
 */

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------
// import all rules in lib/rules
module.exports.rules = {
	'no-jsx-spread': require('./rules/no-jsx-spread'),
	'no-dead-code': require('./rules/no-dead-code'),
	'no-reassigned-consts': require('./rules/no-reassigned-consts'),
	'no-react-scope-bound-assignment': require('./rules/no-react-scope-bound-assignment'),
};
