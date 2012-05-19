var nano = require('nano')('http://192.168.0.15:5984');


var parrot = nano.use('parrot');


parrot.insert({karma: 0}, "testNick");


parrot.get('testNick', function(err, body){
   if (!err)
    console.log(body);
});

//alice.get('rabbit', { revs_info: true }, function(err, body) {
//    if (!err)
//        console.log(body);
//});

//nano.db.create('alice');
//nano.db.create('alice');

nano.db.list(function(err, body) {
    // body is an array
    body.forEach(function(db) {
        console.log(db);
    });
});

//var test = nano.use('test', function(err, body){
//    if (!err) {
//        console.log('use result ', body);
//        return;
//    }
//    if (err) {
//        console.log('error using db', err.message);
//        return;
//    }
//});


/*test.insert({test: true}, 'test', function(err, message) {
    if (err) {
        console.log('error ', err.message);
        return;
    }
});*/

var blah;


//// clean up the database we created previously
//nano.db.destroy('alice', function() {
//    // create a new database
//    nano.db.create('alice', function() {
//        // specify the database we are going to use
//        var alice = nano.use('alice');
//        // and insert a document in it
//        alice.insert({ crazy: true }, 'rabbit', function(err, body, header) {
//            if (err) {
//                console.log('[alice.insert] ', err.message);
//                return;
//            }
//            console.log('you have inserted the rabbit.')
//            console.log(body);
//        });
//    });
//});