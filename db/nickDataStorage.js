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

var updateSeen = function(nick)
{
    parrot.get(nick, function(err, nickData){
        if (err)
        {
            //probably doesn't exist
            console.log('does not exist, creating...');
            var date = new Date();
            nickData = {seen: date};
            parrot.insert(nickData, nick);
        }
        nickData.seen = new Date();
        //update data
        parrot.insert(nickData);
    });
};
exports.updateSeen = updateSeen;


var getLastSeen = function(nick, client)
{
  parrot.get(nick, function(err, nickData){

      var dateLastSeen = new Date(nickData.seen);

//      var dateLastSeen = nickData.seen.getDate();
//      dateLastSeen += nickData.seen.getMonth();
//      dateLastSeen += nickData.seen.getFullYear();
//      dateLastSeen += nickData.seen.getHours();
//      dateLastSeen += nickData.seen.getMinutes();

      var lastSeen = nick + ' last seen: ' + dateLastSeen;
      client.say(config.ircChannel, lastSeen);
  });
};
exports.getLastSeen = getLastSeen;