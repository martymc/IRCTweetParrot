var ircLib = require('irc');
var config = require('./config.js');
var twitterReader = require('./plugins/twitterReader.js');


//load the plugins
var plugins = require('./plugins/plugins.js');

var plugin;
console.log(plugins.pluginConfig.twitterReaderPlugin.file);

for (var key in plugins)
{
    if (plugins.hasOwnProperty(key))
    {

        console.log(key + " -> " + plugins[key]);
    }
}


var client = new ircLib.Client(config.ircServer, config.botName, {
        channels: [config.ircChannel]
});

client.addListener('registered', function (message) {
        console.log('registered with the server...');
});

client.addListener('message', function (from, to, message) {
	console.log("from: " + from);
	console.log("to: " + to);
	console.log("message: " + message);
	
	if (addressedToBot(message))
	{
		var apiLink = twitterReader.getTwitterLink(message);
        twitterReader.processMessage(message, apiLink, client);
	}
	
});

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
  console.log(err);
});

