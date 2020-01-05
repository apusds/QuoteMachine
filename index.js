const discord = require('discord.js')
const config = require('./config.json')
const bot = new discord.Client({ disableEveryone: true })

const apiFile = require('./helper/APIProvider');
const API = new apiFile;

bot.on("message", async message => {
    if (message.author.bot || message.channel.type === "dm") return;

    if (message.mentions.users.first() && message.mentions.users.first().id === bot.user.id) {
        await API.getQuote().then((response) => {
            message.channel.send("```" + response.data.QUOTE + "```" + "\n" + "~ " + response.data.AUTHOR);
        }).catch((e) => {
            message.channel.send('Whoops! Looks like the API is returning something else.');
        });
    }
})

bot.on("ready", () => {
    bot.user.setActivity("AI Sifu's Quotes", { type: "LISTENING" });
    console.log('I am active!')
})

if (config.bot.token === "") {
    console.log("Token is invalid!")
    return;
} else {
    bot.login(config.bot.token)
}