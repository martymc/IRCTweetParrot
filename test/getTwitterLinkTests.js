var assert = require('assert');
//var should = require('should');
var twitterReader = require('../twitterReader.js');

// twitter link examples:
// https://twitter.com/notch/status/200293374132105218
// https://twitter.com/#!/notch/status/200293374132105218


describe('When the bot is passed a non hash bang link', function() {
    it('should return a path to the correct twitter id', function() {
        var result = twitterReader.getTwitterURLObject('https://twitter.com/notch/status/200293374132105218');
        assert.equal(result.path, '/1/statuses/show/200293374132105218.json');
        //result.path.should.equal('/1/statuses/show/200293374132105218.json');
    });
});


describe('When the bot is passed a hash bang link', function() {
   it('should return a path to the correct twitter id', function(){
       var result = twitterReader.getTwitterURLObject('https://twitter.com/#!/notch/status/200293374132105218');
       assert.equal(result.path, '/1/statuses/show/200293374132105218.json');
    });
});

describe('When the bot is passed a non twitter link', function(){
    it('should return undefined', function(){
        var result =  twitterReader.getTwitterURLObject('http://amazon.com');
        assert.equal(result, undefined);
    });
});



