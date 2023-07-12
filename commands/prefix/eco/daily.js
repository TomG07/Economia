const Discord = require("discord.js");
const abreviar = require("../../../util/abrev");
module.exports = {
    name: "daily",
    aliases: ["coletar", "caxinha"],
    run: async (client, message, args, prefix) => {
        let p = prefix || "ny!";
        const userdb = await client.db.findOne({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**${p}registrar**.` });
        if (Date.now() < userdb.eco.timers.dailyCooldown) return message.reply({ content: `⏰ **|** ${message.author}, Você se encontra em modo de recarga, tente novamente <t:${~~(userdb.eco.timers.dailyCooldown / 1000)}:R>.` });
        let coins = Math.floor(Math.random() * 100) + 1500;
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Daily!")
                    .setDescription(`<:Magia:1128792494377803926> **|** ${message.author}, ganhou **${abreviar(coins)} magias** + ⭐ '1XP!' de experiência na sua recompensa diária.`)
                    .setColor("#2a2d30")
                    .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
            ],
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("daily")
                        .setLabel("Volte em 24 horas!")
                        .setEmoji("🔔")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(true)
                )]
        });
        await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": coins, "eco.xp": 1, }, $set: { "eco.timers.dailyCooldown": Date.now() + 86400000, }, });
    }
}
