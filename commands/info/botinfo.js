const Discord = require("discord.js");
module.exports = {
    name: "botinfo",
    aliases: ["info"],
    run: async (client, message, args) => {
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Minhas informações")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("#303136")
                    .addFields({
                        name:"🛠 Creator",
                        value: `MikaCat (Id: \`1027989059198537728\`)`
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
            ]
        });
    }
}
