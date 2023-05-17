const Discord = require("discord.js");
module.exports = {
    name: "gf",
    run: async (client, message, args) => {
        const userdb = await client.db.findById({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**++registrar**.` });
        if (Date.now() < userdb.eco.timers.gfCooldown) return message.reply({ content: `Você se encontra em modo de recarga, tente novamente ${~~(userdb.eco.timers.gfCooldown / 1000)}.` });
        if (userdb.eco.marry.userId == null) return message.reply({ content: `Você se encontra solteiro(a), se case utilizando o comando: \n**++registrar**.` });
        let coins = Math.floor(Math.random() * 150) + 300;
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Sapequinha")
                    .setDescription(`:coin: | ${message.author}, ganhou **${coins} diamantes** + '1XP!' de experiência ao fazer **GF** com {null}.`)
                    .setColor("#303136")
                    .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
            ],
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("gf")
                        .setLabel("Volte em 1 hora!")
                        .setStyle(Discord.ButtonStyle.Success)
                        .setDisabled(true)
                )
            ]
        });
        await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": coins, "eco.xp": 1, }, $set: { "eco.timers.gfCooldown": Date.now() + 3600000, }, });
    }
}