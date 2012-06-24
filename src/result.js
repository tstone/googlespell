

var _       = require('underscore'),
    lib     = require('./lib');


var Result = function(base, source, config) { this.__init(base, source, config); };
(function(cls){

    cls.__init = function(base, source, config) {

        this.config = config;
        this.source = source;

        if (base.c) {
            this.suggestions = this.__parseSuggestions(base.c);
        } else {
            this.suggestions = [];
        }
    };

    cls.__parseSuggestions = function(xs){
        var suggestions = [];
        var source = this.source;
        var threshold = this.config.threshold;

        var sugObj = function(o) {
            var sug =  {
                offset: parseInt(o.attrs.o, 10),
                confidence: parseInt(o.attrs.s, 10),
                word: this.source.substr(o.attrs.o - 1, o.attrs.l),
                words: o.chars.split('\t')
            };
            sug.context = lib.getContext(source, sug.word, sug.offset, 50, 30);
            return sug;
        }.bind(this);
        var addSug = function(x) {
            var sug = sugObj(x);
            if (sug.confidence >= threshold) {
                suggestions.push(sug);
            }
        };

        Array.isArray(xs) ? xs.forEach(addSug) : addSug(xs);
        return suggestions;
    };


}(Result.prototype));

module.exports = Result;