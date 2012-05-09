# IRCTweetParrot

***

## An IRC bot for posting a tweets content

***

#### Install Dependencies
To install IRCTweetParrots dependencies use:

  npm install

#### Edit Configuration
In server.js edit the following lines to setup your connection:

	var config = {
	        ircServer: 'irc.perl.org',
	        ircChannel: '#cabal',
	        botName: 'parrot'
	};
	
#### To run the bot
	node server.js
