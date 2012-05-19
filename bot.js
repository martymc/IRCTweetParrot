var ircLib = require('irc');
var config = require('./config.js');
var nickDataStorage = require('./db/nickDataStorage.js');
//var twitterReader = require('./plugins/twitterReader.js');

var fs = require('fs');
var plugins = [];



var loadPlugins = function(){

    fs.readdir("./plugins/",function(err, files) {
        //Add everything to the plugins array.
        files.forEach(function(element){
            plugins.push(require("./plugins/" + element));
        });
    });
};
exports.loadPlugins = loadPlugins;


var client = new ircLib.Client(config.ircServer, config.botName, {
        channels: [config.ircChannel]
});

loadPlugins();

client.addListener('registered', function (message) {
        console.log('registered with the server...');
});


client.addListener('message', function (from, to, message) {
	console.log("from: " + from);
	console.log("to: " + to);
	console.log("message: " + message);

    var plugin = findPlugin(message);

	if (addressedToBot(message))
	{

        if (message.indexOf(plugin.pattern) != -1)
        {
            plugin.increaseKarma('testNick');

            plugin.displayKarma('testNick', client);
        }

//        if (message.indexOf(plugin.pattern) != -1)
//        {
//            var apiLink = plugin.getTwitterLink(message);
//            plugin.processMessage(message, apiLink, client);
//        }
	}
});


var findPlugin = function(message)
{
    for (var number in plugins)
    {
        if (message.indexOf(plugins[number].pattern) > -1 )
        {
            return plugins[number];
        }
    }
};
exports.findPlugin = findPlugin;

var addressedToBot = function (message)
{
	if (message.substring(0, config.botName.length) == config.botName)
	{
		return true;
	}
};
exports.addressedToBot = addressedToBot;


//don't die on exceptions..
process.on('uncaughtException', function(err) {
  console.log(err.message);
});

