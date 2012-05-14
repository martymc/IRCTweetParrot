/*
These are the main tests of the plugin functionality
 */
var fs = require('fs');
var assert = require('assert');
var ircBot = require('../bot.js');

//essentially a test setup and tear down here.. not sure how to do that in mocha yet.

//http://stackoverflow.com/a/4986652
var createTestPlugin = function()
{
    var newFile = fs.createWriteStream('./plugins/botPluginTest.js', { flags: 'w'});
    var oldFile = fs.createReadStream('./test/botPluginTest.txt', { flags: 'r'});

    newFile.once('open', function(fd) {
       require('util').pump(oldFile, newFile);
    });
};


/*after(function()
{
    fs.unlink('./plugins/botPluginTest.js');
});*/


describe('When a plugin is added to the plugins directory', function() {
    it('it gets dynamically loaded on startup without any code changes', function() {
        //createTestPlugin();
        ircBot.loadPlugins();
        var plugin = ircBot.findPlugin('testPattern');

        assert.equal(plugin.testPlugin, 'this is the test model');
        //removeTestPlugin();

    });
});