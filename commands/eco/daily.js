const Discord = require("discord.js");
module.exports = {
    name: "daily",
    run: async (client, message, args) => {
        const userdb = await client.db.findById({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**++registrar**.` });
        if (Date.now() < userdb.eco.timers.dailyCooldown) return message.reply({ content: `Você se encontra em modo de recarga, tente novamente <t:${~~(userdb.eco.timers.dailyCooldown / 1000 )}:R>.` });
        let coins = Math.floor(Math.random() * 100) + 500;
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Recompensa diária")
                    .setDescription(`:coin: | ${message.author}, ganhou **${coins} diamantes** + '1XP!' de experiência em sua recompensa diária.`)
                    .setColor("#303136")
                    .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
            ],
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("daily")
                        .setLabel("Volte em 24 horas!")
                        .setStyle(Discord.ButtonStyle.Success)
                        .setDisabled(true)
                )]
        });
        await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": coins, "exo.xp": 1, }, $set: { "eco.timers.dailyCooldown": Date.now() + 86400000, }, });
    }
}
