
var xml2js      = require('xml2js'),
    request     = require('request'),
    _           = require('underscore'),
    lib         = require('./lib');

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
};

Checker.prototype.check = function(s, callback){

    request({
        uri: 'http://www.google.com/tbproxy/spell?lang=' + this.config.language + '&hl=' + this.config.language,
        method: 'POST',
        body: lib.reqXml(s, this.config)
    }, function(err, res, body){
        if (err || res.statusCode !== 200) {
            if (typeof callback === 'function') { callback(err); }
        } else {
            var parser = new xml2js.Parser({ attrkey: 'attrs', charkey: 'chars' });
            parser.parseString(body, function(err, result){
                result = lib.formatResult(result, s);
                console.log(result);
                if (typeof callback === 'function') { callback(undefined, result); }
            }.bind(this));
        }
    }.bind(this));

};

module.exports.Checker = exports.Checker = Checker;