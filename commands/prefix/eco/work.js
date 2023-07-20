const Discord = require("discord.js");
const jobs = require("../../../util/jobs.json");
module.exports = {
    name: "work",
    aliases: ["trabalhar", "trampo"],
    run: async (client, message, args, prefix) => {
        let p = prefix || "ny!";
        const userdb = await client.db.findOne({ userId: `${message.guild.id}-${message.author.id}` });
        if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**${p}registrar**.` });
        if (Date.now() < userdb.eco.timers.workCooldown) return message.reply({ content: `⏰ **|** ${message.author}, Você se encontra em modo de recarga, tente novamente <t:${~~(userdb.eco.timers.workCooldown / 1000)}:R>.` });
        if (userdb.eco.job == null) return message.reply({ content: `${message.author}, Você não tem um **emprego**! Para ser contratado utilize o comando: \n**${p}empregos**.` })
        let coins = Math.floor(Math.random() * 100) + 250;
        message.reply({
            content: `${message.author}, ganhou <:Potion:1128800422220546168> **${jobs[`${userdb.eco.job}`].salario} magias** + ⭐ '__1XP__!' de experiência após terminar seu trabalho de **${userdb.eco.job}**.`
        });
        await client.db.updateOne({ userId: `${message.guild.id}-${message.author.id}` }, { $inc: { "eco.coins": coins, "eco.xp": 1, }, $set: { "eco.timers.workCooldown": Date.now() + 3600000, }, });
    }
}
