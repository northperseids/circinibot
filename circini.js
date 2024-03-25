const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes, ApplicationCommandOptionType } = require('discord.js')
require('dotenv').config();
const fs = require('fs')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
})

client.on('ready', () => {
    console.log('Bot online!')
})

// Slash commands

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    var otherCommand = false;

    // Functions

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    // utility commands

    if (interaction.commandName === 'avatar') {
        let name = interaction.options.get('name').value;
        let url = interaction.options.get('avatar').value;

        let file = fs.readFileSync('./system.json', 'utf-8').replace(/\s*/g, "");
        let system = JSON.parse(file);
        let members = system.members;

        for (const property in members) {
            let member = members[property]
            if (member.name === name) {
                let newObj = {};
                newObj.name = name;
                newObj.avatar = url;
                newObj.proxy = member.proxy;
                newObj.color = member.color;
                let oldString = JSON.stringify(member)
                let objString = JSON.stringify(newObj)
                let newString = file.replace(oldString, objString)
                fs.writeFileSync('./system.json', newString, 'utf-8')
                interaction.reply({ content: `${name}'s avatar has been changed!`, ephemeral: true })
            }
        }
        otherCommand = true;
    }

    if (interaction.commandName === 'resetsys') {
        let name = interaction.options.get('name').value;
        let obj = {};
        obj.name = name;
        obj.members = {};
        fs.writeFileSync('./system.json', JSON.stringify(obj));
        interaction.reply({ content: `System reset and ${name} created!`, ephemeral: true })
        otherCommand = true;
    }

    if (interaction.commandName === 'register') {
        register();
        otherCommand = true;
    }

    if (interaction.commandName === 'list') {
        let system = JSON.parse(fs.readFileSync('./system.json', 'utf-8').replace(/\s*/g, ''))
        let sysname = system.name;
        let members = system.members;
        let arr = [];
        for (const property in members) {
            let name = members[property].name;
            let proxy = members[property].proxy;
            let avatar = members[property].avatar;
            let color = members[property].color;
            arr.push(`Name: ${name}\nProxy: ${proxy}\nAvatar: ${avatar}\nColor: ${color}`)
        }
        if (arr.length > 0) {
            let embed = new EmbedBuilder()
                .setTitle(sysname)
                .setDescription(arr.join('\n\n'))
                .setColor('#FFFFFF')

            interaction.reply({ embeds: [embed], ephemeral: true })
        } else {
            let embed = new EmbedBuilder()
                .setTitle(sysname)
                .setDescription(`No system members. Add some with /add.`)
                .setColor('#FFFFFF')

            interaction.reply({ embeds: [embed], ephemeral: true })
        }

        otherCommand = true;
    }

    if (interaction.commandName === 'help') {
        let embed = new EmbedBuilder()
            .setTitle('Help')
            .setDescription(`Hello!\n\n
            This is a really barebones bot that allows PK-ish messages to be sent in DMs through embeds and slash commands.\n
            It has to be self-hosted, meaning YOU have to host it yourself, and assume the responsibility for doing so.\n
            To set it up, see the github here: https://github.com/northperseids/circinibot\n
            Once you've got the bot running, run the /resetsys command to clear and initialize your system profile, then run /add to add your first system member. You'll need to input name, avatar *(HAS TO BE A URL)*, and proxy, with an optional color field which determines the color of the little bar to the left of the embeds.\n
            There's no hard limit set into the code for the max number of system members, so it's up to you to manage that.\n
            Once you're done adding system members, run the /register command and it'll register the commands for you. You may need to refresh Discord's page for the proxy commands to show up.\n
            Other commands:
            /list - get a list of system members and their properties
            /delete - delete a member
            /proxy - change a member's proxy
            /avatar - change a member's avatar
            /color - change a member's color
            /help - in case you need this help info again.\n
            This won't be a continually-updated or supported project. I made it in a day because I was bored. If you have any issues, you can contact me through Discord at @neartsua, but I can't promise I'll be able to troubleshoot or fix it - *please* google your problem first!\n
            Thank you, and have fun!`)
            .setColor('#FFFFFF')

        interaction.reply({ embeds: [embed], ephemeral: true })

        otherCommand = true;
    }

    if (interaction.commandName === 'add') {
        let name = interaction.options.get('name').value;
        let url = interaction.options.get('avatar').value;
        let proxyString = interaction.options.get('proxy').value;
        let proxy = proxyString.toLowerCase();
        var color;
        try {
            color = interaction.options.get('color').value;
        } catch {
            color = '#FFFFFF';
        }

        let uid = Date.now().toString(36) + Math.random().toString(36).substring(2);

        let system = JSON.parse(fs.readFileSync('./system.json', 'utf-8').replace(/\s*/g, ""))
        let newMember = {};
        newMember.name = name;
        newMember.avatar = url;
        newMember.proxy = proxy;
        newMember.color = color;

        system['members'][`${uid}`] = newMember;

        let newString = JSON.stringify(system)
        fs.writeFileSync('./system.json', newString)
        interaction.reply({ content: `${name} added to system ${system.name}! (Be sure to register your proxy commands with the /register command!)`, ephemeral: true })
        otherCommand = true;
    }

    if (interaction.commandName === 'delete') {
        let name = interaction.options.get('name').value;

        let file = fs.readFileSync('./system.json', 'utf-8').replace(/\s*/g, "");
        let system = JSON.parse(file);
        let members = system.members;

        for (const property in members) {
            let selected = members[property].name
            if (selected === name) {
                let toBeDeleted = getKeyByValue(members, members[property])
                delete members[toBeDeleted];
                let newString = JSON.stringify(system)
                fs.writeFileSync('./system.json', newString)
                interaction.reply({ content: `${selected} deleted. Remove their proxy command with the /register command.`, ephemeral: true })
            }
        }
        otherCommand = true;
    }

    if (interaction.commandName === 'proxy') {
        let name = interaction.options.get('name').value;
        let newProxy = interaction.options.get('proxy').value;

        let system = fs.readFileSync('./system.json', 'utf-8').replace(/\s*/g, "");
        let sysObj = JSON.parse(system)
        let members = sysObj.members;
        for (const property in members) {
            let member = members[property]
            if (member.name === name) {
                let newObj = {};
                newObj.name = name;
                newObj.avatar = member.avatar;
                newObj.proxy = newProxy;
                newObj.color = member.color;
                let oldString = JSON.stringify(member)
                let objString = JSON.stringify(newObj)
                let newString = system.replace(oldString, objString)
                fs.writeFileSync('./system.json', newString, 'utf-8')
                interaction.reply({ content: `${name}'s proxy has been changed! Be sure to register the new proxy with the /register command!`, ephemeral: true })
            }
        }
        otherCommand = true;
    }

    if (interaction.commandName === 'color') {
        let name = interaction.options.get('name').value;
        let newColor = interaction.options.get('color').value;

        let system = fs.readFileSync('./system.json', 'utf-8').replace(/\s*/g, "");
        let sysObj = JSON.parse(system)
        let members = sysObj.members;
        for (const property in members) {
            let member = members[property]
            if (member.name === name) {
                let newObj = {};
                newObj.name = name;
                newObj.avatar = member.avatar;
                newObj.proxy = member.proxy;
                newObj.color = newColor;
                let oldString = JSON.stringify(member)
                let objString = JSON.stringify(newObj)
                let newString = system.replace(oldString, objString)
                fs.writeFileSync('./system.json', newString, 'utf-8')
                interaction.reply({ content: `${name}'s color has been changed!`, ephemeral: true })
            }
        }
        otherCommand = true;
    }

    // individual proxy command handling

    let system = JSON.parse(fs.readFileSync('./system.json', 'utf-8').replace(/\s*/g, ""))
    let members = system.members;

    for (const property in members) {
        let member = members[property]
        let name = member.name;
        let avatar = member.avatar;
        let proxy = member.proxy;
        let color = member.color;
        if (interaction.commandName === proxy) {
            otherCommand = true;
            let echo = interaction.options.get('input').value;
            let embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(echo)
                .setAuthor({ name: name, iconURL: avatar })
            interaction.reply({ embeds: [embed] })
        }
    }

    // REGISTER COMMANDS FUNCTION - BE CAREFUL
    function register() {
        const commands = [
            {
                name: `resetsys`,
                description: `Clears the system and re-initializes it. (THIS WILL DELETE ALL INFO.)`,
                integration_types: [0, 1],
                contexts: [0, 1, 2],
                options: [
                    {
                        name: 'name',
                        description: 'Name your new system.',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            },
            {
                name: `delete`,
                description: `Deletes a system member.`,
                integration_types: [0, 1],
                contexts: [0, 1, 2],
                options: [
                    {
                        name: 'name',
                        description: 'Who to remove?',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            },
            {
                name: `register`,
                description: `Registers all proxies as commands.`,
                integration_types: [0, 1],
                contexts: [0, 1, 2],
            },
            {
                name: `list`,
                description: `Shows all sys members and proxies.`,
                integration_types: [0, 1],
                contexts: [0, 1, 2],
            },
            {
                name: `help`,
                description: `Shows help and setup info.`,
                integration_types: [0, 1],
                contexts: [0, 1, 2],
            },
            {
                name: `proxy`,
                description: `Change someone's proxy.`,
                integration_types: [0, 1],
                contexts: [0, 1, 2],
                options: [
                    {
                        name: 'name',
                        description: 'Who to edit?',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                    {
                        name: 'proxy',
                        description: 'What is their new proxy? (MUST BE LOWER CASE)',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            },
            {
                name: `color`,
                description: `Change someone's color.`,
                integration_types: [0, 1],
                contexts: [0, 1, 2],
                options: [
                    {
                        name: 'name',
                        description: 'Who to edit?',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                    {
                        name: 'color',
                        description: 'What is their new color? (MUST BE HEX CODE #XXXXXX)',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            },
            {
                name: `avatar`,
                description: `Change someone's avatar`,
                integration_types: [0, 1],
                contexts: [0, 1, 2],
                options: [
                    {
                        name: 'name',
                        description: 'Who to edit?',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                    {
                        name: 'avatar',
                        description: 'Avatar URL?',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            },
            {
                name: `add`,
                description: `Add someone to the system file.`,
                integration_types: [0, 1],
                contexts: [0, 1, 2],
                options: [
                    {
                        name: 'name',
                        description: 'Who to add?',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                    {
                        name: 'avatar',
                        description: 'Avatar URL?',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                    {
                        name: 'proxy',
                        description: 'What is their proxy? (MUST BE LOWER CASE)',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                    {
                        name: 'color',
                        description: 'Enter a hex color (optional).',
                        type: ApplicationCommandOptionType.String,
                        required: false
                    }
                ]
            }
        ];

        let string = fs.readFileSync('./system.json', 'utf-8');
        let system = JSON.parse(string);
        let members = system.members;

        for (const property in members) {
            let member = members[property]
            let command = {
                name: `${member.proxy}`,
                description: `Send a message as ${member.name}`,
                integration_types: [0, 1],
                contexts: [0, 1, 2],
                options: [
                    {
                        name: 'input',
                        description: 'message',
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            }
            commands.push(command);
        }

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

        (async () => {
            try {
                console.log('Registering commands...')
                await rest.put(
                    Routes.applicationCommands(process.env.CLIENT_ID),
                    { body: commands }
                )
                console.log('Commands registered!')
                interaction.reply({ content: `Commands registered!`, ephemeral: true })
            } catch (error) {
                console.log(error);
                interaction.reply({ content: `There was a problem. Do you have any duplicate proxies? (Check with /list.)`, ephemeral: true })
            }
        })();
    }
})

client.login(process.env.TOKEN)
