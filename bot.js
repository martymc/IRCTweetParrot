var ircLib = require('irc');
var config = require('./config.js');
//var twitterReader = require('./plugins/twitterReader.js');

var fs = require('fs');
var models = [];



var loadPlugins = function(){

    fs.readdir("./plugins/",function(err, files) {
        //For the sake of the example, output the files in ./models/
        console.log(files);

        //Add everything to the models array.
        files.forEach(function(element){
            models.push(require("./plugins/" + element));
        });

        //Profit!
        console.log(models);
    });
};
exports.loadPlugins = loadPlugins;


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
        if (message.indexOf(models[0].pattern) != -1)
        {
            var apiLink = models[0].getTwitterLink(message);
            models[0].processMessage(message, apiLink, client);
        }
	}
});


var findPlugin = function(message)
{
    for (var model in models)
    {
        if (message.indexOf(model.pattern) > -1 )
        {
            return model;
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
  console.log(err);
});

