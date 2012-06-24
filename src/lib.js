



exports.cleanText = function(source, removeCode, removeHtml) {

    if (removeCode) {
        source = source.replace(/<code[^>]+>[\s\S]*?<\/code>/gi, '');
    }

    if (removeHtml) {
        source = source.replace(/<[^>]+>/gi, '');
    }

    return source;

};

exports.getContext = function(source, word, start, leftCount, rightCount) {

    var loffset = start - leftCount;
    var left = loffset > -1 ? source.substr(loffset, leftCount) : source.substr(0, start - 1);
    var right = source.substr(start - 1 + word.length, rightCount);

    // Check for new lines
    if (loffset < 0) {
        // Do nothing
    } else if (left.indexOf('\n') > -1) {
        left = left.substr(left.lastIndexOf('\n'));
    } else {
        // Otherwise find the first space and chop from there
        left = left.substr(left.indexOf(' '));
    }

    if (right.indexOf('\n') > -1) {
        right = right.substr(0, right.indexOf('\n'));
    } else {
        right = right.substr(0, right.lastIndexOf(' '));
    }

    return (left + '[' + word + ']' + right).trim();
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

