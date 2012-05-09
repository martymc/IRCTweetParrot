# IRCTweetParrot
***

## An IRC bot for posting a tweets content

#### Install Dependencies
To install IRCTweetParrots dependencies use:

	npm install

#### Edit Configuration
In server.js edit the following lines to setup your connection:

	var config = {
	        ircServer: 'irc.mibbit.net',
	        ircChannel: '#parrotTest',
	        botName: 'parrot'
	};
	
#### To run the bot
	node server.js
	
#### To run the tests

The tests are written in [Mocha](http://visionmedia.github.com/mocha/)

To install (system wide)

	npm -g install mocha
	
Then to run the tests:

	mocha
	
It runs all tests in the `tests` directory

