var ircLib = require('irc');
var http = require('http');
var url = require('url');


var config = {
	ircServer: 'irc.mibbit.net',
	ircChannel: '#testParrot',
	botName: 'parrot'
};

var client = new ircLib.Client(config.ircServer, config.botName, {
        channels: [config.ircChannel],
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
		var apiLink = getTwitterLink(message);
		processMessage(message, apiLink);
	}
	
});

function addressedToBot(message)
{
	if (message.substring(0, config.botName.length) == config.botName)
	{
		return true;
	}
}

function getTwitterLink(message)
{
	//assuming we're addressed "parrot: <link>
	//oh dear, I think this needs some regex.
	var twitterLink = message.substring(config.botName.length + 2, message.length);

	var twitterURL = new url.parse(twitterLink);
	
	var id = twitterURL.path.substring(twitterURL.path.lastIndexOf('/'), twitterURL.path.length);
	
	//generate link
	var options = {
		host:  'api.twitter.com',
		port: twitterURL.port,
		path: '/1/statuses/show/' + id + '.json' 
	};
	
	return (options);
}

function processMessage(message, options)
{
		var request = http.get(options, function(res) {
			var data = '';
			
			res.on('data', function(chunk) {
				data += chunk;
			});

			res.on('end', function() {
				var tweet = JSON.parse(data);
				//console.log(tweet);
				client.say(config.ircChannel, 'Tweet from: ' + tweet.user.screen_name);
				client.say(config.ircChannel, tweet.text);
			});

		});
}

//don't die on exceptions..
process.on('uncaughtException', function(err) {
  console.log(err);
});

