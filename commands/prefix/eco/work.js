const Discord = require("discord.js");
const jobs = require("../../../util/jobs.json");
module.exports = {
    name: "work",
    aliases: ["trabalhar", "trampo"],
    run: async (client, message, args) => {
        const userdb = await client.db.findOne({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**ny!registrar**.` });
        if (Date.now() < userdb.eco.timers.workCooldown) return message.reply({ content: `⏰ **|** ${message.author},Você se encontra em modo de recarga, tente novamente <t:${~~(userdb.eco.timers.workCooldown / 1000)}:R>.` });
        if (userdb.eco.job == null) return message.reply({ content: `${message.author}, Você não tem um **emprego**! Para ser contratado utilize o comando: \n**ny!empregos**.` })
        let coins = Math.floor(Math.random() * 100) + 250;
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Trabalho concluído!")
                    .setDescription(`<:money:1119274556352385046> **|** ${message.author}, ganhou **${jobs[`${userdb.eco.job}`].salario} euros** + ⭐ '1XP!' de experiência após terminar seu trabalho de **${userdb.eco.job}**.`)
                    .setColor("#303136")
                    .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
            ],
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("work")
                        .setLabel("Volte em 1 hora!")
                        .setEmoji("🔔")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(true)
                )
            ]
        });
        await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": coins, "eco.xp": 1, }, $set: { "eco.timers.workCooldown": Date.now() + 3600000, }, });
    }
}
