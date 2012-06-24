
var _  = require('underscore');


exports.cleanText = function(source, removeCode, removeHtml) {

    if (removeCode) {
        source = source.replace(/<code[^>]+>[\s\S]*?<\/code>/gi, '');
    }

    if (removeHtml) {
        source = source.replace(/<[^>]+>/gi, '');
    }

    return source;

};

exports.formatResult = function(resp, source) {

    var sugObj = function(o) {
        return {
            offset: o.attrs.o,
            confidence: o.attrs.s,
            word: source.substr(o.attrs.o - 1, o.attrs.l),
            words: o.chars.split('\t')
        };
    };

    // Carry over root attributes
    var root = _.extend({ suggestions: [] }, resp.attrs);

    // Format suggestions
    if (resp.c) {
        if (Array.isArray(resp.c)) {
            root.suggestions = resp.c.map(function(x){
                return sugObj(x);
            });
        } else {
            root.suggestions = [
                sugObj(resp.c)
            ];
        }
    }

    return root;
};

exports.reqXml = function(s, config) {
    var zo = function(bo) { return bo ? '1' : '0'; };   // Zero/One
    return [
        '<?xml version="1.0" encoding="utf-8" ?>',
        '<spellrequest textalreadyclipped="0" ignoredups="' + zo(config.ignoreDupes) + '" ignoredigits="' + zo(config.ignoreDigits) + '" ignoreallcaps="' + zo(config.ignoreCaps) + '">',
        '<text><![CDATA[',
            s,
        ']]></text>',
        '</spellrequest>'
    ].join('\n');
};

