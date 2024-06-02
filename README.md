# circinibot
![Image showing two embedded proxies in conversation](/image.png)<br><br>
Small and simple bot to allow a version of semi-proxying in Discord DMs.<br><br>
I made this in a day because I was bored. It's a utility intended to be of a Pluralkit-esque nature that allows semi-proxying in DMs through the use of embeds. It takes up a chunk of visual space in the chat, but it's the best I could do with no webhooks available in DMs.<br><br>
This will not be a regularly-updated project, but I might come back to it on occasion. Like I said, I made it in a day because I was bored.

# Usage
The bot can only be configured for one system profile at a time. (Again, made it in a day! please don't be irritated with the limitations!) Management can be done entirely through Discord (ideally), though.<br>
Also, please note that the maximum members possible in a system (currently) is 41 (Discord allows 50 slash commands per bot, and 9 of those are taken up by utility functions). I might try to figure out a way to use subcommands to allow more, but - well, haven't done that yet.
### Commands
/resetsys - clear and set up a system<br>
/add - add a member<br>
/list - get a list of system members and their properties<br>
/delete - delete a member<br>
/proxy - change a member's proxy<br>
/avatar - change a member's avatar<br>
/color - change a member's color<br>
/help - about the bot and commands<br>
/register - registers new proxy commands<br>

### Self-hosting
This bot has to be self-hosted. If you're new to self-hosting a Discord bot, there's a lot of resources and videos available on how to get started.

To run through it quickly -
* download NodeJS from the NodeJS website
* download the bot files and put the bot files somewhere you'll remember
* edit the example.env file and put your own bot token and bot ID in for the TOKEN and CLIENT_ID variables (be sure to rename the `example.env` to just `.env`)
* open the bot folder in your terminal and run `npm install`<br>

...and you should be good to go - from there, just run the circini.js file using `node circini.js` (or use something like pm2 if you want to keep the bot up in the background - I've been using pm2 to keep my bots running).

*Note that in order to use it in DMs you'll need to enable "user installs" in the Discord developer portal and install/authorize the bot on your account, not on a server. Also, please note that if you allow other people to authorize your bot, EVERYONE WHO AUTHORIZES THE BOT will be able to send messages with your proxies!!!*

If you get stuck, there's plenty of decent videos and etc. showing how to get a bot up and running!

# Support/Contact
If you're running into issues *with the bot, not with HOSTING the bot,* you can contact me on Discord @neartsua, but *no* guarantees I'll be available or able to help.
