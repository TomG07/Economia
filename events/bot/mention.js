const Discord = require("discord.js");
const client = require("../../index");
module.exports = {
    name: Discord.Events.MessageCreate,
    once: false,
    async execute(message) {
        if (!message.guild) return;
        if (message.author.bot) return;
        let dataGuild = (await client.server.findOne({ guildId: message.guild.id })) || { config: { prefix: "ny!" } };
        let prefix = dataGuild.config.prefix || "ny!";
        if (message.content == `<!@${client.user.id}>` || message.content == `<@${client.user.id}>`) return message.reply({
            content: `🌸 **|** ${message.author}, Olá sou uma bot brasileira de economia, meu prefix é \`${prefix}\`, utilize \`${prefix}ajuda\` para ver minha lista de comandos.`
        });
    }
}
