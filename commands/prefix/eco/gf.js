const Discord = require("discord.js");
module.exports = {
    name: "gf",
    aliases: ["sapecar", "namorar"],
    run: async (client, message, args, prefix) => {
        let p = prefix || "ny!";
        const userdb = await client.db.findOne({ userId: `${message.guild.id}-${message.author.id}` });
        if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**${p}registrar**.` });
        if (Date.now() < userdb.eco.timers.gfCooldown) return message.reply({ content: `⏰ **|** ${message.author}, Você se encontra em modo de recarga, tente novamente <t:${~~(userdb.eco.timers.gfCooldown / 1000)}:R>.` });
        if (userdb.eco.marry.userId == null) return message.reply({ content: `${message.author}, Você se encontra solteiro(a)! Para se casar utilize o comando: \n**${p}casar**.` });
        let coins = Math.floor(Math.random() * 150) + 300;
        message.reply({
            content: `*Sapequinha..!* ${message.author}, ganhou **<:Potion:1128800422220546168> ${coins} magias** + ⭐ '__1XP__!' de experiência sendo **sapeca** com <@${userdb.eco.marry.userId}>.`
        });
        await client.db.updateOne({ userId: `${message.guild.id}-${message.author.id}` }, { $inc: { "eco.coins": coins, "eco.xp": 1, }, $set: { "eco.timers.gfCooldown": Date.now() + 3600000, }, });
    }
}
