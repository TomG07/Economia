const Discord = require("discord.js");
module.exports = {
    name: "gf",
    aliases: ["amor"],
    run: async (client, message, args) => {
        const userdb = await client.db.findById({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**a.registrar**.` });
        if (Date.now() < userdb.eco.timers.gfCooldown) return message.reply({ content: `Você se encontra em modo de recarga, tente novamente <t:${~~(userdb.eco.timers.gfCooldown / 1000)}:R>.` });
        if (userdb.eco.marry.userId == null) return message.reply({ content: `Você se encontra solteiro(a), se case utilizando o comando: \n**a.casar**.` });
        let coins = Math.floor(Math.random() * 150) + 300;
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Sapequinha..!")
                    .setDescription(`${message.author}, ganhou <:Stars:1111647398188564510> **${coins} bits** + <:Stars:1111647398188564510> '1XP!' de experiência ao fazer **GF** com <@${userdb.eco.marry.userId}>.`)
                    .setColor("#303136")
                    .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
            ],
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("gf")
                        .setLabel("Volte em 1 hora!")
                        .setEmoji("<:FlowerPurple:1109899097655222272>")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(true)
                )
            ]
        });
        await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": coins, "eco.xp": 1, }, $set: { "eco.timers.gfCooldown": Date.now() + 3600000, }, });
    }
}
