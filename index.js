const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildInvites
    ]
});//jj
module.exports = client;
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://mikaradb:uRDZ0k4Ko1qWb0kj@cluster0.6issots.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true, });
const statusdb = mongoose.connection;
statusdb.on("error", console.error);
statusdb.on("open", () => {
    console.log("📚 | Conectada ao banco de dados com sucesso.");
});
client.db = require("./database/users/players");
client.server = require("./database/guild/guilds");
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.aliases = new Discord.Collection();
require('./handlers/commandsManager')(client);
require('./handlers/eventsManager')(client);
client.once(Discord.Events.ClientReady, () => {
    console.log(`🌸 | Longin no discord realizado com a conta ${client.user.tag}`);
    client.user.setPresence({ activities: [{ name: `Me adicione!`, type: Discord.ActivityType.Competing }], status: 'online', });
});
//i55
process.on("unhandRejection", (reason, promise) => console.log(reason));
process.on("uncaughtException", (error, origin) => console.log(error, origin));
client.login("MTEyODMwNjAzODMzNzE4Mzc5NQ.GszoXo.uLt3HKLMMjvDrjyPBOePIuQJqv5EqzjxMPOx8I");
