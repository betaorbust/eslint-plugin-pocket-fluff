'use strict';
const { spawnSync } = require('child_process');
const { red } = require('chalk');

let errCt = 0;
function printError(messages) {
    messages.forEach((message) => {
        console.log(red(message)); // eslint-disable-line no-console
    });
}

const prettierCheck = spawnSync(
    './node_modules/.bin/prettier',
    ['--list-different', '**/*.{js,jsx}'],
    {
        stdio: 'inherit'
    }
);
if (prettierCheck.status !== 0) {
    printError([
        'FILES LISTED ABOVE NOT FORMATTED CORRECTLY.',
        'Run "npm run fix" to properly format.'
    ]);
    errCt++;
}

const eslintCheck = spawnSync('eslint', ['.'], {
    stdio: 'inherit'
});

if (eslintCheck.status !== 0) {
    printError(['ESLINT ERRORS FOUND.', 'Running "npm run fix" may solve some errors.']);
    errCt++;
}

if (errCt > 0) {
    printError([
        '',
        '╔═════════════════════════════════════════════════════╗',
        '║ Linting or formatting errors found. Rejecting push. ║',
        '╚═════════════════════════════════════════════════════╝'
    ]);
    process.exit(1);
}
