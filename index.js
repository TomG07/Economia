const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent
    ]
});//jj
module.exports = client;
client.commands = new Discord.Collection();
require('./handlers/commandsManager')(client);
require('./handlers/eventsManager')(client);
client.once(Discord.Events.ClientReady, () => {
    console.log(`Online em ${client.user.tag}`)
});
client.login("MTA5ODU3NDU0OTE4MTgwNDY0NA.GGC0Az.PTgpnz0pg-sGDlPhwGftAgrCYqlD8Fen5FBhIc");