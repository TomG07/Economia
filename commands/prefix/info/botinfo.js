const Discord = require("discord.js");
module.exports = {
    name: "botinfo",
    aliases: ["info"],
    run: async (client, message, args) => {
        let dataGuild = (await client.server.findOne({ guildId: message.guild.id })) || { config: { prefix: "ny!" } };
        let prefix = dataGuild.config.prefix;
        let user = await client.users.fetch("1027989059198537728");
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Minhas informações!")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("#ffb6c1")
                    .addFields({
                        name: "<:Girl:1128352238537031760> Creator:",
                        value: `${user.username}-(ID: \`1027989059198537728\`)`
                    }, {
                        name: "Versão da Bot;",
                        value: "junior-1.3.2"
                    }, {
                        name: "Livraria da Bot:",
                        value: "<:djs:1128352183981719582> `Discord.js`"
                    }, {
                        name: "Prefixo da Bot:",
                        value: `\`${prefix}\``
                    }, {
                        name: "Total de Comandos:",
                        value: `${client.commands.size}`
                    })
                    .setTimestamp()
            ]
        });
    }
}
