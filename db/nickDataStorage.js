var nano = require('nano')('http://192.168.0.15:5984');
var parrot = nano.use('parrot');
var config = require('./../config.js');


var saveNickData = function(nick, data)
{
  parrot.insert(data, nick);
};
exports.saveNickData = saveNickData;


var displayNickData = function(nick, client)
{
    parrot.get(nick, function(err, body){
        console.log('karma = ', body.karma);
        console.log(config.ircChannel);
        client.say(config.ircChannel, body.karma);
    });
};
exports.displayNickData = displayNickData;

