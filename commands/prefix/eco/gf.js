const Discord = require("discord.js");
module.exports = {
    name: "gf",
    aliases: ["amor"],
    run: async (client, message, args, prefix) => {
        let p = prefix || "ny!";
        const userdb = await client.db.findOne({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**${p}registrar**.` });
        if (Date.now() < userdb.eco.timers.gfCooldown) return message.reply({ content: `⏰ **|** ${message.author}, Você se encontra em modo de recarga, tente novamente <t:${~~(userdb.eco.timers.gfCooldown / 1000)}:R>.` });
        if (userdb.eco.marry.userId == null) return message.reply({ content: `${message.author}, Você se encontra solteiro(a)! Para se casar utilize o comando: \n**${p}casar**.` });
        let coins = Math.floor(Math.random() * 150) + 300;
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Sapequinha..!")
                    .setDescription(`<:money:1119274556352385046> **|** ${message.author}, ganhou **${coins} magias** + ⭐ '1XP!' de experiência ao fazer **GF** com <@${userdb.eco.marry.userId}>.`)
                    .setColor("#303136")
                    .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
            ],
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("gf")
                        .setLabel("Volte em 1 hora!")
                        .setEmoji("🔔")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(true)
                )
            ]
        });
        await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": coins, "eco.xp": 1, }, $set: { "eco.timers.gfCooldown": Date.now() + 3600000, }, });
    }
}
