'use strict';
const { spawnSync } = require('child_process');
const { red, white, green } = require('chalk');

let errs = [];
function printBanner(messages, borderColorFormatter, bodyColorFormatter) {
    const bannerContent = banner(messages, borderColorFormatter, bodyColorFormatter);
    bannerContent.forEach((message) => {
        console.log(message); // eslint-disable-line no-console
    });
}

function banner(messageArr, borderColorFormatter, bodyColorFormatter) {
    const maxLength = Math.max(...messageArr.map((msg) => msg.length));
    return [borderColorFormatter(`╔═${'═'.repeat(maxLength)}═╗`)].concat(
        messageArr.map(
            (msg) =>
                `${borderColorFormatter('║')} ${bodyColorFormatter(
                    msg + ' '.repeat(maxLength - msg.length)
                )} ${borderColorFormatter('║')}`
        ),
        borderColorFormatter(`╚═${'═'.repeat(maxLength)}═╝`)
    );
}

const prettierCheck = spawnSync(
    './node_modules/.bin/prettier',
    ['--list-different', '**/*.{js,jsx}'],
    {
        stdio: 'inherit'
    }
);
if (prettierCheck.status !== 0) {
    errs.push([
        'FILES LISTED ABOVE NOT FORMATTED CORRECTLY.',
        'Run "npm run fix" to properly format.'
    ]);
}

const eslintCheck = spawnSync('eslint', ['.'], {
    stdio: 'inherit'
});

if (eslintCheck.status !== 0) {
    errs.push(['ESLINT ERRORS FOUND.', 'Running "npm run fix" may solve some errors.']);
}

const runTests = spawnSync('mocha', ['--reporter=progress', 'tests/lib/rules/'], {
    stdio: 'inherit'
});

if (runTests.status !== 0) {
    errs.push(['UNIT TEST ERRORS FOUND.']);
}

if (errs.length > 0) {
    errs = errs.reduce((sum, cur) => sum.concat([''].concat(cur)), ['Rejecting push.']);
    printBanner(errs, red, white);
    process.exit(1);
} else {
    printBanner(['Prepush checks were successful.'], green, white);
}
