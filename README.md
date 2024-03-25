# circinibot
![Image showing two embedded proxies in conversation](/image.png)<br><br>
Small and simple bot to allow a version of semi-proxying in Discord DMs.<br><br>
I made this in a day because I was bored. It's a utility intended to be of a Pluralkit-esque nature that allows semi-proxying in DMs through the use of embeds. It takes up a chunk of visual space in the chat, but it's the best I could do with no webhooks available in DMs.<br><br>
This will *NOT* be a continually-updated project. Like I said, I made it in a day because I was bored. If you look at the code, it's a mess and probably needs to be split up into multiple files, but I can't really be bothered for that right now. If it bothers you, I guess you can make the changes yourself, I certainly don't have an issue with that.

# Usage
The bot can only be configured for one system profile at a time. (Again, made it in a day! please don't be irritated with the limitations!) Management can be done entirely through Discord (ideally), though.<br>
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
This bot is *STRONGLY RECOMMENDED* to be run LOCALLY. If you're new to self-hosting a Discord bot, there's a lot of resources and videos available on how to get started.

To run through it quickly -
* download NodeJS from the NodeJS website
* download the bot files and put the bot files somewhere you'll remember
* edit the example.env file and put your own bot token and bot ID in for the TOKEN and CLIENT_ID variables (be sure to rename the `example.env` to just `.env`)
* open the bot folder in your terminal and run `npm install`<br>

...and you should be good to go - from there, just run the circini.js file using `node circini.js` (or use something like pm2 if you want to keep the bot up in the background - I've been using pm2 to keep my bots running). *Note that in order to use it in DMs you'll need to enable "user installs" in the Discord developer portal and install/authorize the bot on your account, not on a server.* If you get stuck, there's plenty of decent videos and etc. showing how to get a bot up and running!

# Support/Contact
Yeah... this bot isn't going to have a lot of support. If you're running into issues, you can contact me on Discord, but *no* guarantees I'll be available or able to help.
