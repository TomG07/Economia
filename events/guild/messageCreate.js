const Discord = require("discord.js");
const client = require("../../index");
module.exports = {
    name: Discord.Events.MessageCreate,
    once: false,
    async execute(message) {
       // if (!message.guild) return;
        if (message.author.bot) return;
        // if (message.guild.id !== "1102036342172553226") return;
        if (message.channel.type == Discord.ChannelType.DM) return;
        let prefix = "ny!";
        if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase()
        if (cmd.length === 0) return;
        let command = client.commands.get(cmd)
        if (!command) command = client.commands.get(client.aliases.get(cmd));
        if (!command) return;
        try {
            command.run(client, message, args)
        } catch (err) {
            console.error('Erro:' + err);
        }
    }
}
