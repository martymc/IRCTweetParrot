var assert = require('assert');
var ircParrot = require('../server.js');

describe('When the bot is addressed correctly', function() {
	it('should return true', function() {
		var result = ircParrot.addressedToBot('parrot: ');
		assert.equal(result, true);
		//result.should.equal(true);
	});

});
