const Discord = require("discord.js");
module.exports = {
    name: "botinfo",
    aliases: ["info"],
    run: async (client, message, args) => {
        let user = await client.users.fetch("461618792464646145");
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Minhas informações!")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("#303136")
                    .addFields({
                        name: "<:k_cmtyOwner:1106396096332300298> Creator(s)",
                        value: `${user.username} (Id: \`461618792464646145\`) & MikaCat (Id: \`1027989059198537728\`)`
                    }, {
                        name: "<:k_cmtyOwner:1106396096332300298> Minha versão",
                        value: "beta-1.1.2"
                    }, {
                        name: "<:k_cmtyOwner:1106396096332300298> Livraria",
                        value: "`Discord.js`"
                    }, {
                        name: "<:k_cmtyOwner:1106396096332300298> Prefixo",
                        value: "`a.`"
                    }, {
                        name: "<:k_cmtyOwner:1106396096332300298> Total de comandos",
                        value: `${client.commands.size}`
                    })
                    .setTimestamp()
            ]
        });
    }
}
