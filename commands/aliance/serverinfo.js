const Discord = require("discord.js");
module.exports = {
    name: "serverinfo",
    aliases: ["server", "si"],
    run: async (client, message, args) => {
        await message.channel.sendTyping();
        const guilddb = await client.gd.findById({ _id: message.guild.id, });
        if (!guilddb) return message.reply({ content: "Servidor não registrado." })
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Informações do servidor na Anxienty!")
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter({ text: "Anxienty todos os direitos reservados!", iconURL: `${client.user.displayAvatarURL()}` })
                    .setColor("#9b59b6")
                    .addFields({
                        name: "<:FlowerPurple:1109899097655222272> Nome do Servidor",
                        value: `\`${message.guild.name}\``
                    }, {
                        name: "<:FlowerPurple:1109899097655222272> Representante",
                        value: `<@${guilddb.g.repUser}>`
                    }, {
                        name: "<:FlowerPurple:1109899097655222272> Aprovado por",
                        value: `<@${guilddb.g.approvedBy}>`
                    }, {
                        name: "<:FlowerPurple:1109899097655222272> Aprovado",
                        value: `<t:${~~(guilddb.g.approvedDate / 1000)}:R>`
                    }, {
                        name: "<:FlowerPurple:1109899097655222272> Parceuro da Anxienty",
                        value: `\`${guilddb.g.partner ? "Sim" : "Não"}\``
                    })
            ]
        });
    }
}