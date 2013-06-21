var url = require('url');
var config = require('./../config.js');
var http = require('http');
var OAuth = require('oauth');

exports.pattern = 'twitter.com';


var receivedMessage = function(message)
{
    getTwitterLink(message);
};
exports.receivedMessage = receivedMessage;


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
        id = twitterURL.path.substring(twitterURL.path.lastIndexOf('/')+1, twitterURL.path.length);
    }
    else
    {
        //we've probably got a #! link
        id = twitterURL.hash.substring(twitterURL.hash.lastIndexOf('/')+1, twitterURL.hash.length);
    }

    //generate link

    var twitterURL = 'https://api.twitter.com/1.1/statuses/show.json?id=' + id ;
    return (twitterURL);
};
exports.getTwitterURLObject = getTwitterURLObject;


var processMessage = function (message, twitterURL, client)
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
};
exports.processMessage = processMessage;