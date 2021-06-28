# Disallow code past its marked @removeby. (no-dead-code)

_"There is nothing more permanent than a temporary fix."_

- [Rule details](#rule-details)
- [Patterns considered warnings/errors](#patterns-considered-warningserrors)
- [Patterns not considered warnings/errors](#patterns-not-considered-warningserrors)
- [Installation](#installation)
- [Options](#options)

![Screenshot of JS code with annotation "@removeby 4/17/2018 dev@example.com" and ESLint error reading "Code is past its expiration date. Please contact dev@example.com"](https://i.imgur.com/hUUI5CO.png)

## Rule details

We've all been there: there's a fix coming in soon, but it's currently a blocker, and there's just a _little_ hack needed today, which you can fix up later.

What about that PR that exposed some needed maintenance tasks, but you didn't want to junk up/confuse the diffs, so you said that work would happen "... in a future pull request."

With 100% good intentions, there's still a pretty good chance your codebase has that _little_ hack, and that second PR just hasn't made it yet.

The @removeby annotation allows you to leave a toolable and human-readable task for a later date. Like a TODO comment that reminds you it exists without you having to dig it back out.

It might be a fix that needs to happen once some other code has been merged in, it might be a deprecated API that's scheduled to go away, or maybe it's something to fix right after this next sprint.

Whatever it is, slap a @removeby annotation on it to make sure you get reminded when it's time is up.

```js
// @removeby 12/21/2018 dev@example.com Remove after snow.
```

## Patterns considered warnings/errors

_**Assuming the current date is 8/1/2018.**_

```js
celebrate(); // @removeby 7/5/2018 dev@example.com Remove after July 4th sale.
```

```js
/*
 * @removeby 7/5/2018 dev@example.com Remove after 4th of July sale.
 */
celebrate();
```

```js
// Will error because of malformed date and email.
celebrate(); // @removeby a/b/cc @example.com Bad format :(
```

## Patterns not considered warnings/errors

_**Assuming the current date is 12/20/2017.**_

```js
celebrate(); // @removeby 7/5/2018 dev@example.com Remove after July 4th sale.
```

```js
/*
 * @removeby 7/5/2018 dev@example.com Remove after 4th of July sale.
 */
celebrate();
```

## Installation

Install the pocket-fluff eslint plugin in your project.

```bash
# NPM
npm install eslint-plugin-pocket-fluff --dev

# Yarn
yarn add eslint-plugin-pocket-fluff --dev
```

Enable the plugin and the rule in your .eslintrc ([or other config](https://eslint.org/docs/user-guide/configuring)) file.

```json
{
	"plugins": ["pocket-fluff"],
	"rules": {
		"pocket-fluff/no-dead-code": "error"
	}
}
```

## Options

The rule takes a single, optional, options object with the properties and default values shown:

```js
{
    "rules": {
        "pocket-fluff/no-dead-code": [
            "error",
            {
                "currentEpochTimeMS": Date.now(), // For testing or decoupling from system time.
                "daysBeforeToReport": 0,          // For warning/email pass X days before removeby.
                "annotation": '@removeby'         // For renaming the annotation. String form of regex match.
            }
        ],
    }
}
```
