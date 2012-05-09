var assert = require('assert');
var ircParrot = require('../server.js');

describe('When the bot is addressed correctly', function() {
	it('should return true', function() {
		var result = ircParrot.addressedToBot('parrot: ');
		assert.equal(result, true);
		//result.should.equal(true);
	});

});

describe('When the bot is addressed incorrectly', function() {
	it('should return undefined', function() {
		var result = ircParrot.addressedToBot('test');
		assert.equal(result, undefined);
	});
});


describe('When the bot receives an empty message', function() {
	it('should return undefined', function() {
		var result = ircParrot.addressedToBot('');
		assert.equal(result, undefined);
	});
});
