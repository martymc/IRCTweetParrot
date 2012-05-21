var config = require('./../config.js');
var nano = require('nano')(config.couchDBServer);
var db = nano.use(config.couchDBDataBase);

var saveNickData = function(nick, data)
{
    db.insert(data, nick);
};
exports.saveNickData = saveNickData;


var displayNickData = function(nick, client)
{
    db.get(nick, function(err, body){
        console.log('karma = ', body.karma);
        console.log(config.ircChannel);
        client.say(config.ircChannel, body.karma);
    });
};
exports.displayNickData = displayNickData;

var updateSeen = function(nick)
{
    nick = nick.toLowerCase();

    db.get(nick, function(err, nickData){
        if (err)
        {
            //probably doesn't exist
            console.log('does not exist, creating...');
            var date = new Date();
            nickData = {seen: date};
            db.insert(nickData, nick);
        }
        nickData.seen = new Date();
        //update data
        db.insert(nickData);
    });
};
exports.updateSeen = updateSeen;


var getLastSeen = function(nick, client)
{
    var searchNick = nick.toLowerCase();
    db.get(searchNick, function(err, nickData){
      if (err)
      {
          client.say(config.ircChannel, "I've never seen " + nick);
      }

      var dateLastSeen = new Date(nickData.seen);

      var lastSeen = nick + ' last seen: ' + dateLastSeen;
      client.say(config.ircChannel, lastSeen);
  });
};
exports.getLastSeen = getLastSeen;