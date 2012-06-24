

var _  = require('underscore');


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
        var threshold = this.config.threshold;

        var sugObj = function(o) {
            return {
                offset: o.attrs.o,
                confidence: o.attrs.s,
                word: this.source.substr(o.attrs.o - 1, o.attrs.l),
                words: o.chars.split('\t')
            };
        }.bind(this);
        var addSug = function(x) {
            var sug = sugObj(x);
            if (sug.confidence >= threshold) {
                suggestions.push(sug);
            }
        };

        Array.isArray(xs) ? xs.forEach(addSug) : addSug(xs);
        this.suggestions = suggestions;
    };

}(Result.prototype));

module.exports = Result;