const Discord = require("discord.js");
const jobs = require("../../../util/jobs.json");
module.exports = {
    name: "work",
    aliases: ["trabalhar", "trampo"],
    run: async (client, message, args) => {
        const userdb = await client.db.findOne({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**ny!registrar**.` });
        if (Date.now() < userdb.eco.timers.workCooldown) return message.reply({ content: `Você se encontra em modo de recarga, tente novamente <t:${~~(userdb.eco.timers.workCooldown / 1000)}:R>.` });
        if (userdb.eco.job == null) return message.reply({ content: `Você não tem um **emprego** utilize o comando: \n**a.empregos**.` })
        let coins = Math.floor(Math.random() * 100) + 250;
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Trabalho concluído!")
                    .setDescription(`${message.author}, ganhou <:Stars:1111647398188564510> **${jobs[`${userdb.eco.job}`].salario} bits** + <:Exp:1111648750864171154> '1XP!' de experiência ao concluir seu trabalho de **${userdb.eco.job}**.`)
                    .setColor("#303136")
                    .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
            ],
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("work")
                        .setLabel("Volte em 1 hora!")
                        .setEmoji("<:FlowerPurple:1109899097655222272>")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(true)
                )
            ]
        });
        await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": coins, "eco.xp": 1, }, $set: { "eco.timers.workCooldown": Date.now() + 3600000, }, });
    }
}
