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



client.addListener('message', function (from, to, message) {
	console.log("from: " + from);
	console.log("to: " + to);
	console.log("message: " + message);
  
  // regex for name, regex for url
	var reName = new RegExp('^' + config.botname, 'i'),
  
  // url regex, stolen from internets
  reUrl = /((?:http|https):\/\/[a-z0-9\/\?=_#&%~-]+(\.[a-z0-9\/\?=_#&%~-]+)+)|(www(\.[a-z0-9\/\?=_#&%~-]+){2,})/gi,
  
  // check if there's any urls in message, store the result (rather than doing test then exec)
  match = reUrl.exec(message[i]);
  
  // if we are addressed and there's a url to work with
	if (reName.test(message) && match) {   

		var twitterLink = match[0];  // matched string, exec returns null if it fails

		var twitterURL = new url.parse(twitterLink);
		
		var id = twitterURL.path.substring(twitterURL.path.lastIndexOf('/'), twitterURL.path.length);
	
		//now get from twitter
		var apiLink = 'http://api.twitter.com/1/statuses/show/' + id + '.json';

		var options = {
			host:  'api.twitter.com',
			port: twitterURL.port,
			path: '/1/statuses/show/' + id + '.json' 
		};

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

});

//don't die on exceptions..
process.on('uncaughtException', function(err) {
  console.log(err);
});

