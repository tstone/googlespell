
var xml2js      = require('xml2js'),
    request     = require('request'),
    _           = require('underscore'),
    lib         = require('./lib'),
    Result      = require('./result'),
    fs          = require('fs');

var Checker = function(config){
    this.config = _.extend({
        ignoreDupes: false,
        ignoreDigits: true,
        ignoreCaps: true,
        ignoreHtml: true,
        ignoreCode: true,
        language: 'en',
        threshold: 0
    }, config);

    // Setup dictionary
    if (config.dictionary) {
        if (Array.isArray(config.dictionary)) {
            this.config.dictionary = config.dictionary;
        } else {
            this.config.dictionary = fs.readFileSync(config.dictionary, 'utf8').split('\n');
        }
    } else {
        this.config.dictionary = [];
    }
};

Checker.prototype.check = function(s, callback){

    var text = lib.cleanText(s);

    request({
        uri: 'http://www.google.com/tbproxy/spell?lang=' + this.config.language + '&hl=' + this.config.language,
        method: 'POST',
        body: lib.reqXml(text, this.config)
    }, function(err, res, body){
        if (err || res.statusCode !== 200) {
            if (typeof callback === 'function') { callback(err); }
        } else {
            var parser = new xml2js.Parser({ attrkey: 'attrs', charkey: 'chars' });
            parser.parseString(body, function(err, result){
                var r = new Result(result, text, this.config);
                if (typeof callback === 'function') { callback(undefined, r); }
            }.bind(this));
        }
    }.bind(this));

};

module.exports = Checker;