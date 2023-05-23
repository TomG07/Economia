const Discord = require("discord.js");
module.exports = {
    name: "botinfo",
    aliases: ["info"],
    run: async (client, message, args) => {
        let user = await client.users.fetch("461618792464646145");
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Minhas informações")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("#9b59b6")
                    .addFields({
                        name: "👑 Donos",
                        value: `${user.username} (Id: \`461618792464646145\`) & MikaCat (Id: \`1027989059198537728\`)`
                    }, {
                        name: "💻 Minha versão",
                        value: "1.0.2"
                    }, {
                        name: "📚 Livraria",
                        value: "`Discord.js`"
                    }, {
                        name: "⚙ Prefixo",
                        value: "`++`"
                    }, {
                        name: "🗂 Total de comandos",
                        value: `${client.commands.size}`
                    })
                    .setTimestamp()
            ]
        });
    }
}
