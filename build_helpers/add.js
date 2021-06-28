/* eslint-disable no-console */

// This is just a silly little helper method to generate the beginnings
// of a new rule.

const prompt = require('prompt');
const fs = require('fs');
const path = require('path');

function fetchAndInsertVars(pathToTemplate, config) {
	return fs
		.readFileSync(pathToTemplate, 'utf8')
		.replace(/{\s?RULE_NAME\s?}/g, config.ruleName)
		.replace(/{\s?RULE_DESCRIPTION\s?}/g, config.ruleDescription);
}

prompt.start();
prompt.get(
	[
		{
			name: 'ruleName',
			description:
				'What is the name of your eslint rule?\nFormat like no-fun-code\n',
			pattern: /^[\da-z-]*$/,
			message: 'Rule name must be only lower case, numbers, and dash marks.',
		},
		{
			name: 'ruleDescription',
			description:
				"What's the headline description of your rule?\nLike: Disallow use of fun things.\n",
			require: true,
			pattern: /^.{10,60}$/,
			message: 'Title must be between 10 and 60 characters.',
		},
	],
	(err, result) => {
		if (err) {
			console.error(err);
			process.exit(1);
		} else {
			fs.writeFileSync(
				path.join(__dirname, '../docs/rules/', `${result.ruleName}.md`),
				fetchAndInsertVars(
					path.join(__dirname, 'templates/doc.md.template'),
					result
				)
			);
			fs.writeFileSync(
				path.join(__dirname, '../lib/rules/', `${result.ruleName}.js`),
				fetchAndInsertVars(
					path.join(__dirname, 'templates/rule.js.template'),
					result
				)
			);
			fs.writeFileSync(
				path.join(__dirname, '../tests/lib/rules/', `${result.ruleName}.js`),
				fetchAndInsertVars(
					path.join(__dirname, 'templates/test.js.template'),
					result
				)
			);
			const READMEPath = path.join(__dirname, '../README.md');
			const README = fs.readFileSync(READMEPath, 'utf8');
			fs.writeFileSync(
				READMEPath,
				README +
					fetchAndInsertVars(
						path.join(__dirname, 'templates/readme.part.md.template'),
						result
					)
			);

			console.log(`${result.ruleName} was added to the repo. Make sure to add it 
to the index file at /lib/index.js or it won't be exported!`);
		}
	}
);
