const Discord = require("discord.js");
module.exports = {
    name: "help",
    aliases: ["ajuda", "comandos"],
    run: async (client, message, args) => {
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
                    .setTitle("Painel de Ajuda!")
                    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
                    .addFields({
                        name: "💰 Economia | Geral:",
                        value: "`daily`, `gf`, `trabalhar`, `pagar`, `fazenda` , `colher`, `loja`, `rep`"
                    }, {
                        name: "👥 Economia | Social",
                        value: "`saldo`, `cd`, `perfil`,  `empregos`, `emblemas`, `casar`, `divorciar`, `top`"
                    }, {
                        name: "📚 Utilidades | Infos:",
                        value: "`ajuda`, `botinfo`, `verificar`, `setprefix`, `votar`"
                    })
                    //.setImage("https://media.discordapp.net/attachments/1062929961754841180/1110975912192778400/e6f35409643fd900051676d5cde22b2c.png")
                    .setColor("#ffb6c1")
                    .setTimestamp()
            ]
        });
    }
}
