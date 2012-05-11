var url = require('url');
var config = require('./config.js');
var http = require('http');

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

    //generate link
    var options = {
        host:  'api.twitter.com',
        port: twitterURL.port,
        path: '/1/statuses/show' + id + '.json'
    };

    return (options);
};
exports.getTwitterURLObject = getTwitterURLObject;

var processMessage = function (message, options)
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
};
exports.processMessage = processMessage;