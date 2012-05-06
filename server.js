var ircLib = require('irc');
var http = require('http');
var url = require('url');

//http://api.twitter.com/1/statuses/show/199118515792392192.json^



var client = new ircLib.Client('irc.mibbit.net', 'mybot', {
        channels: ['#kotg'],
});



client.addListener('message', function (from, to, message) {
	console.log("from: " + from);
	console.log("to: " + to);
	console.log("message: " + message);

	if (message.substring(0, 9) == "IRCParrot")
	{
		//assuming we're addressed "IRCParrot: <link>
		var twitterLink = message.substring(10, message.length);
		console.log("Link: " + twitterLink);	

		var twitterURL = new url.parse(twitterLink);
		
		var id = twitterURL.path.substring(twitterURL.path.lastIndexOf('/'), twitterURL.path.length);
	
		console.log(twitterURL.hostname, twitterURL.path);
		console.log("id: " + id);
		//now get from twitter
		var apiLink = 'http://api.twitter.com/1/statuses/show/' + id + '.json';
		console.log(apiLink); 


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
				var obj = JSON.parse(data);
				console.log(obj);
			});

		});
		
	}

});
