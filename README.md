
googlespell
===========

A simple node.js module for accessing the (undocumented) Google Toolbar spellchecker API.  It would probably be a good idea to only use this module for personal projects or things that will only have light traffic, as Google could yank acess to that API at any time for any reason.

Installation
------------

The usual...

    npm install googlespell

Then

    var googlespell = require('googlespell');

Usage
-----

### Initialization

`googlespell` exposes a `Checker` object which will handle doing the spell checking.  It takes one input parameter, `config`;

    var googlespell = require('googlespell');
    var checker     = new googlespell.Checker(options);

#### Checker Config

    ignoreDupes:    Ignore duplicates. // (default: false)
    ignoreDigits:   Ignore numbers. // (default: true)
    ignoreCaps:     Ignore caps. // (default: true)
    ignoreHtml:     Remove all HTML tags, keeping inner HTML. // (default: true)
    ignoreCode:     Completely remove all <code> tags. // (default: true)
    language:       Language to check against. // (default: 'en')
    threshold:      Filter suggestions based on Google's confidence level. // (default: 0)

### Doing the Check

Once the checker is initialized call the `.check` method.

    Checker.check(text, callback(err, result));

Example:

    var googlespell = require('googlespell');
    var checker     = new googlespell.Checker();

    checker.check('This is an exmaple', function(err, result) {
        console.log(result);
    });

### Results
`googlespell` will return a `Result` object which has an array of suggestions.  Each suggestion contains the following properites:

    confidence -- How confident Google is about this suggestion
    context -- A snippet of the word within the source string
    offset -- Position in source string where word is
    word -- The word Google things is misspelled
    words -- Suggestions for what that word might be

In the above example, the suggestion returned would look like this:

    { offset: 12
      confidence: 1
      word: 'example',
      words: [ 'example', 'ex maple', 'ex-maple', 'exampled', 'examples' ],
      context: 'This is an [exmaple]' }

