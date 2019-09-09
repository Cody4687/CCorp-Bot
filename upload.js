const Discord = require('discord.js');
const mineflayer = require('mineflayer');
const client = new Discord.Client();
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
var colors = require('colors');


var options = {
    host: "0b0t.org",
    port: 25565,
    username: "redacted",
    version: "1.12.2",
    verbose: "true",
    password: "redacted",
};

var bot = mineflayer.createBot(options);
bindEvents(bot);
navigatePlugin(bot);
function bindEvents(bot) {

    function antiafk() {
        bot.navigate.to(bot.entity.position.offset(-1, 0, -1));
        bot.navigate.to(bot.entity.position.offset(1, 0, 1));
    }

    bot.on('login', function () {
        console.log(`Minecraft Bot Online!`.green)
        setTimeout(function() { antiafk(); }, 5000);

    });

    bot.on('error', function(err) {
        console.log('Error attempting to reconnect: ' + err.errno + '.');
        if (err.code == undefined) {
            console.log('Invalid credentials OR bot needs to wait because it relogged too quickly.');
            console.log('Will retry to connect in 30 seconds. ');
            setTimeout(relog, 30000);
        }
    });


    bot.on('end', function() {
        console.log("Bot has ended");

        setTimeout(relog, 30000);
    });


function relog() {
    console.log("Attempting to reconnect...");
    bot = mineflayer.createBot(options);
    bot.setControlState('jump', true)
    bindEvents(bot);
    navigatePlugin(bot);
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

client.on('ready', () => {
    console.log(`Bridge online!`)
});

bot.on('chat', function(username, message) {
    if (username === bot.username) return;
    client.channels.get("620203433898672161").send(`<${username}> ${message}`)
});

bot.on('chat', (username, message) => {
    const args = message.split(' ')
    const cmd = message.split(' ')[0]
    var translateee = args.join(" ");

    if (cmd === '!accept') {
        bot.chat(`/tpy ${isAllowed(username)}`)
    }


    if (cmd === '!tpa') {
        chat(`/tpa Cody4687`, `Bot tpa'd to Cody4687.`.green)
    }
    if (cmd === '!secret') {
        bot.chat('/ignore hub235')
    }

    if (cmd === '!coinflip') {
        function coinflip() {
            let math = Math.random()
            if (math < 0.5) {
                return ('Heads!')
            }
            if (math > 0.5) {
                return ('Tails!')
            }
        }
        return (chat(`, ${coinflip()}`, `${username} used !coinflip.`.yellow))
    }
})
}
client.login('redacted')