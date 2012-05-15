var assert = require('assert');
var karma = require('../plugins/karma.js');


describe('When passed a nick and an increase in karma', function() {
   it('should increase karma by one', function() {
       var storedKarma = 0

       //console.log('stored karma: ' + storedKarma);

       karma.increaseKarma('test');
       karma.increaseKarma('test');
       karma.increaseKarma('test');

       console.log('karma ' + karma.getKarma('test'));

       storedKarma.should.equal(karma.getKarma('test') - 3);

   });
});