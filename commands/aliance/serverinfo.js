const Discord = require("discord.js");
module.exports = {
    name: "serverinfo",
    aliases: ["server", "si"],
    run: async (client, message, args) => {
        await message.channel.sendTyping();
        let guild = client.guilds.cache.find(guild => guild.id === args[0]) || message.guild;
        const guilddb = await client.gd.findById({ _id: guild.id, });
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
                        name: "<:FlowerPurple:1109899097655222272> Enviado",
                        value: `<t:${~~(guilddb.g.sendDate / 1000)}:R>`
                    }, {
                        name: "<:FlowerPurple:1109899097655222272> Blacklist",
                        value: `\`${guilddb.g.blacklist ? "Sim" : "Não"}\``
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
                        name: "<:FlowerPurple:1109899097655222272> Parceiro da Anxienty",
                        value: `\`${guilddb.g.partner ? "Sim" : "Não"}\``
                    })
            ]
        });
    }
}