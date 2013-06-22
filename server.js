var ircLib = require('irc');
var http = require('http');
var url = require('url');
var OAuth = require('oauth');

var config = {
	ircServer: 'irc.mibbit.net',
	ircChannel: '#testParrot',
	botName: 'parrot',
    twitterConsumerKey: '',
    twitterConsumerSecret: '',
    twitterAccessToken: '',
    twitterAccessTokenSecret: ''
};

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
		var apiLink = getTwitterLink(message);
		processMessage(message, apiLink);
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

var getTwitterLink = function(message)
{
    //assuming we're addressed "parrot: <link>
    //oh dear, I think this needs some regex.
    var twitterLink = message.substring(config.botName.length + 2, message.length);

    return getTwitterURLObject(twitterLink);
};
exports.getTwitterLink = getTwitterLink;


var getTwitterURLObject = function (twitterLink)
{
	//if it isn't a twitter link, just exit.
    //oh dear, this is a bit of a goto isn't it... :)
    if (twitterLink.indexOf('twitter.com') == -1)
    {
        return;
    }

    var twitterURL = new url.parse(twitterLink);

    var id = undefined;
    if (twitterURL.path.length > 1)
    {
	    id = twitterURL.path.substring(twitterURL.path.lastIndexOf('/'), twitterURL.path.length);
    }
    else
    {
        //we've probably got a #! link
        id = twitterURL.hash.substring(twitterURL.hash.lastIndexOf('/'), twitterURL.hash.length);
    }


    var twitterURL = 'https://api.twitter.com/1.1/statuses/show.json?id=' + id ;

	return (twitterURL);
};
exports.getTwitterURLObject = getTwitterURLObject;

var processMessage = function (message, options)
{
    var oauth = new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        config.twitterConsumerKey,
        config.twitterConsumerSecret,
        '1.0A',
        null,
        'HMAC-SHA1'
    );
    oauth.get(twitterURL,
        config.twitterAccessToken, //test user token
        config.twitterAccessTokenSecret, //test user secret

        function (e, data, res){
            if (e) console.error(e);
            var tweet = JSON.parse(data);
            //console.log(tweet);
            client.say(config.ircChannel, 'Tweet from: ' + tweet.user.screen_name);
            client.say(config.ircChannel, tweet.text);
        });
};
exports.processMessage = processMessage;

//don't die on exceptions..
process.on('uncaughtException', function(err) {
  console.log(err);
});

