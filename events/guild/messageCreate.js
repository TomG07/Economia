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
        let dataGuild = (await client.server.findOne({ guildId: message.guild.id })) || { config: { prefix: "ny!" } };
        let prefix = dataGuild.config.prefix;
        if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase()
        if (cmd.length === 0) return;
        let command = client.commands.get(cmd)
        if (!command) command = client.commands.get(client.aliases.get(cmd));
        if (!command) return;
        try {
            command.run(client, message, args, prefix)
        } catch (err) {
            console.error('Erro:' + err);
        }
    }
}
