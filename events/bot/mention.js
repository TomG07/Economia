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
            content: `<:achocolatado:1130948383956291604> **|** ${message.author}, Olá sou uma bot brasileira focada em economia, meu prefix nesse servidor é \`${prefix}\`! Pode utilizar \`${prefix}ajuda\` para mostrar os meus comandos.`,
            components: [
              new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setLabel("Me adicione")
                  .setURL("https://discord.com/api/oauth2/authorize?client_id=1128306038337183795&permissions=2684676160&scope=bot%20applications.commands")
                  .setStyle(Discord.ButtonStyle.Link)
              )
            ]
        });
    }
}
