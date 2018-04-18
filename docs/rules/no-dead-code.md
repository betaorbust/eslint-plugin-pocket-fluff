Disallow code past its marked @deathdate.  (no-dead-code)
=====================================================

_"There is nothing more permanent than a temporary fix."_


## Context
We've all been there: there's a fix coming in soon, but it's currently a blocker, and there's just a _little_ hack needed today, which you can fix up later. 

What about that PR that exposed some needed maintenance tasks, but you didn't want to junk up/confuse the diffs, so you said that work would happen "... in a future pull request."

With 100% good intentions, there's still a pretty good chance your codebase has that _little_ hack, and that second PR just hasn't made it yet.

The @deathdate annotation allows you to leave a toolable and human-readable task for a later date. Like a TODO comment that reminds you it exists without you having to dig it back out.

It might be a fix that needs to happen once some other code has been merged in, it might be a deprecated API that's scheduled to go away, or maybe it's something to fix right after this next sprint.

Whatever it is, slap a @deathdate annotation on it to make sure you get reminded when it's time is up.

```js
// @deathdate 12/21/2018 dev@example.com Remove after snow.
```

## The following patterns are considered warnings/errors
_**Assuming the current date is 8/1/2018.**_
```js
celebrate(); // @deathdate 7/5/2018 dev@example.com Remove after July 4th sale.
```
```js
/*
 * @deathdate 7/5/2018 dev@example.com Remove after 4th of July sale. 
 */
celebrate();
```

```js
// Will error because of malformed date and email.
celebrate(); // @deathdate a/b/cc @example.com Bad format :(
```

## The following patterns are not warnings
_**Assuming the current date is 12/20/2017.**_
```js
celebrate(); // @deathdate 7/5/2018 dev@example.com Remove after July 4th sale.
```
```js
/*
 * @deathdate 7/5/2018 dev@example.com Remove after 4th of July sale. 
 */
celebrate();
```

## Options
The rule takes a single options object with the properties and default values shown:

```js
/* .eslintrc */
{
    "rules": {
        "pocket-fluff/no-jsx-spread": [
            "error", 
            {
                "currentEpochTimeMS": Date.now(), // For testing or decoupling from system time. 
                "daysBeforeDeathToReport": 0      // For warning/email pass X days before death.
            }
        ],
    }
}
```
