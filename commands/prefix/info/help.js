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
                    .setFooter({ text: "Anxienty todos os direitos reservados!", iconURL: `${client.user.displayAvatarURL()}` })
                    .addFields({
                        name: "<:FlowerPurple:1109899097655222272> Economia",
                        value: "`saldo`, `daily`, `empregos`, `cd`, `perfil`, `emblemas`, `casar`, `gf`, `divorciar`, `trabalhar`, `top`, `pagar`"
                    }, {
                        name: "<:FlowerPurple:1109899097655222272> Utilidades",
                        value: "`ajuda`, `botinfo`, `verificar`"
                    })
                    .setImage("https://media.discordapp.net/attachments/1062929961754841180/1110975912192778400/e6f35409643fd900051676d5cde22b2c.png")
                    .setColor("#9b59b6")
                    .setTimestamp()
            ]
        });
    }
}
