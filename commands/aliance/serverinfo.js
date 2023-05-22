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
                    .setTitle("Informações do Servidor!")
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor("#9b59b6")
                    .addFields({
                        name: "<:FlowerPurple:1085226294683389992> Nome do Servidor",
                        value: `${message.guild.name}`
                    }, {
                        name: "<:FlowerPurple:1085226294683389992> Representante",
                        value: `<@${guilddb.g.repUser}>`
                    }, {
                        name: "<:FlowerPurple:1085226294683389992> Aprovado por",
                        value: `<@${guilddb.g.approvedBy}>`
                    }, {
                        name: "<:FlowerPurple:1085226294683389992> Aprovado",
                        value: `<t:${~~(guilddb.g.approvedDate / 1000)}:R>`
                    })
            ]
        });
    }
}