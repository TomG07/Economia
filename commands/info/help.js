const Discord = require("discord.js");
module.exports = {
    name: "help",
    aliases: ["ajuda", "comandos"],
    run: async (client, message, args) => {
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
                    .setTitle("Lista dos meus comandos")
                    .setThumbnail(client.user.displayAvatarURL())
                    .addFields({
                        name: "<:FlowerPurple:1085226294683389992> Economia",
                        value: "`saldo`, `daily`, `empregos`, `cd`, `perfil`, `emblemas`, `casar`, `gf`, `divorciar`, `trabalhar`, `top`, `pagar`"
                    }, {
                        name: "<:FlowerPurple:1085226294683389992> Utilidades",
                        value: "`ajuda`, `botinfo`, `verificar`"
                    })
                    .setColor("#9b59b6")
                    .setTimestamp()
            ]
        });
    }
}
