/*describe your bot's functionality here*/


var twitterReader = {
    file: 'plugins/twitterReader.js',
    pattern: 'twitter.com'
}

var pluginConfig = {
    twitterReaderPlugin: twitterReader
};

/*pluginConfig.twitterReader = {};
pluginConfig.twitterReader.file = 'plugins/twitterReader.js';
pluginConfig.twitterReader.pattern = 'twitter.com';*/

exports.pluginConfig = pluginConfig;