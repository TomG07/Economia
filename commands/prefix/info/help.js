🧾const Discord = require("discord.js");
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
                        name: "💰 Economia:",
                        value: "`saldo`, `daily`, `empregos`, `cd`, `perfil`, `emblemas`, `casar`, `gf`, `divorciar`, `trabalhar`, `top`, `pagar`, `fazenda` , `colher`, `loja`"
                    }, {
                        name: "📚 Utilidades:",
                        value: "`ajuda`, `botinfo`, `verificar`"
                    })
                    //.setImage("https://media.discordapp.net/attachments/1062929961754841180/1110975912192778400/e6f35409643fd900051676d5cde22b2c.png")
                    .setColor("#ffb6c1")
                    .setTimestamp()
            ]
        });
    }
}
