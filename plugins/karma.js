var redis = require('redis');

var redisClient = redis.createClient();

var handleMessage = function(message) {

};

var increaseKarma = function(nick) {
    var karma = redisClient.get(nick);
    if (karma)
    {
        redisClient.set(nick, karma++);
    }
    else
    {
        redisClient.set(nick, 1);
    }

};
exports.increaseKarma = increaseKarma;


increaseKarma('test');
redisClient.get('test', redis.print);

var getKarma = function(nick){
  return redisClient.get(nick, function (err, reply) {
      console.log('twice' + reply.toString())
  });
};

exports.getKarma = getKarma;

redisClient.on('error', function(err) {
   console.log('Error' + err);
});


//redisClient.quit();

//client.set("Boob", "lala");


//client.get("Boob", redis.print);

