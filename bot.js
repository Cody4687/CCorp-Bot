const Discord = require('discord.js');
const mineflayer = require('mineflayer');
const client = new Discord.Client();
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
var colors = require('colors');
var config = require("./config.json")
var prefix = config.prefix

/*
0b0t Chat Colors
! yellow
# pink
> green
< red
, orange
; dark blue
: light blue
[ gray
] black
*/
var options = {
    host: "0b0t.org",
    port: 25565,
    username: config.email,
    version: "1.12.2",
    verbose: "true",
    password: config.password,
};

var bot = mineflayer.createBot(options);
bindEvents(bot);
navigatePlugin(bot);

function bindEvents(bot) {

    function antiafk() {
        bot.navigate.to(bot.entity.position.offset(-1, 0, -1));
        bot.navigate.to(bot.entity.position.offset(1, 0, 1));
    }

    function RussianRoulette() {
        let math = Math.floor(Math.random() * 7)
        if (math < 1) {
            return ('< You died!')
        } else {
            return ('> You lived!')
        }
    }

    let responses = ['# Yes.', '# No.', '# Not Likely.', '# Very Likely.', '# Unsure.', '# It is certain.']
function Ball() {
    let math = Math.floor(Math.random() * responses.length)
    return(responses[math])
}

    function chat(b, c) {
        bot.chat(b)
        console.log(c)
    }

    function isAllowed(username) {
        array = ['Cody4687', 'DecendiumXD', 'Kory_B_Cervado', 'Garmadon_Prime', 'Mr_MagicMan', 'NiuNiu0326', 'heccinsucc', 'Zachere', 'DouglasJack', 'MireDieYoung', 'Distaf']
        if (array.includes(username)) {
            chat(`> Accepted tpa for ${username}.`, `Accepted tpa for ${username}.`.green)
            return (username)
        } else return chat(`< You're not on the list, ${username}!`, `${username} attempted to tpa.`.red)
    }

    bot.on('login', function () {
        console.log(`Minecraft Bot Online!`.rainbow)
        setTimeout(function () {
            antiafk();
        }, 5000);

    });

    bot.on('error', function (err) {
        console.log('Error attempting to reconnect: ' + err.errno + '.');
        if (err.code == undefined) {
            console.log('Invalid credentials OR bot needs to wait because it relogged too quickly.');
            console.log('Will retry to connect in 30 seconds. ');
            setTimeout(relog, 30000);
        }
    });


    bot.on('end', function () {
        console.log("Bot has ended");

        setTimeout(relog, 30000);
    });


    function relog() {
        console.log("Attempting to reconnect...");
        bot = mineflayer.createBot(options);
        bindEvents(bot);
        navigatePlugin(bot);
    }

    client.on('ready', () => {
        console.log(`Discord Bot Online!`.rainbow)
    });

    bot.on('chat', function (username, message) {
        if (username === bot.username) return;
        client.channels.get(config.channelID).send(`<${username}> ${message}`)
    });

    bot.on('chat', (username, message) => {
        const args = message.split(' ')
        const cmd = message.split(' ')[0]

        if (cmd === `${prefix}accept`) {
            bot.chat(`/tpy ${isAllowed(username)}`)
        }

        if (cmd === `${prefix}a`) {
            bot.chat(`/tpy ${isAllowed(username)}`)
        }

        if (cmd === `${prefix}russianroulette`) {
            chat(`${RussianRoulette()}`, `${username} used ${prefix}russianroulette!`.yellow)
        }

        if (cmd === `${prefix}8ball`) {
            chat(`${Ball()}`, `${username} used ${prefix}8ball!`.yellow)
        }

        if (cmd === `${prefix}tpa`) {
            chat(`/tpa Cody4687`, `Bot tpa'd to Cody4687.`.green)
        }

        if (cmd === `${prefix}coinflip`) {
            function coinflip() {
                let math = Math.random()
                if (math < 0.5) {
                    return ('Heads!')
                }
                if (math > 0.5) {
                    return ('Tails!')
                }
            }
            return (chat(`, ${coinflip()}`, `${username} used ${prefix}coinflip.`.yellow))
        }

        
    })
}
client.login(config.token)
