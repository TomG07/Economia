const Discord = require("discord.js");
module.exports = {
    name: "help",
    aliases: ["ajuda", "comandos"],
    run: async (client, message, args) => {
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
                    .setTitle("Veja os meus comandos")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("#303136")
                    .addFields({
                        name: "⭐ Pessoal",
                        value: "`saldo`, `daily`, `empregos`, `cd`"
                    }, {
                        name: "👥 Social",
                        value: "`casar`, `gf`, `divorciar`, `trabalhar`"
                    }, {
                        name: "🔧 Utilidades",
                        value: "`ajuda`, `botinfo`, `verificar`"
                    })
                .setTimestamp()
            ]
        });
    }
}
