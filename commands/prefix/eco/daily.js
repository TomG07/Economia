const Discord = require("discord.js");
module.exports = {
    name: "daily",
    run: async (client, message, args) => {
        const userdb = await client.db.findById({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**a.registrar**.` });
        if (Date.now() < userdb.eco.timers.dailyCooldown) return message.reply({ content: `Você se encontra em modo de recarga, tente novamente <t:${~~(userdb.eco.timers.dailyCooldown / 1000)}:R>.` });
        let coins = Math.floor(Math.random() * 100) + 500;
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Recompensa diária!")
                    .setDescription(`\> ${message.author}, ganhou <:Bits:1110890676721291346> **${coins} bits** + <:xp:1108743400410329138> '1XP!' de experiência em sua recompensa diária.`)
                    .setColor("#9b59b6")
                    .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
            ],
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("daily")
                        .setLabel("Volte em 24 horas!")
                        .setEmoji("<:FlowerPurple:1109899097655222272>")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(true)
                )]
        });
        await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": coins, "eco.xp": 1, }, $set: { "eco.timers.dailyCooldown": Date.now() + 86400000, }, });
    }
}
