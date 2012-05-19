var nickDataStorage = require('../db/nickDataStorage.js');


nickDataStorage.saveNickData('testNick', {karma: 0});

var data = nickDataStorage.getNickData('testNick');

console.log(data);