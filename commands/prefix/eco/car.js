const Discord = require("discord.js");
module.exports = {
    name: "car",
    aliases: ["uber", "taxi", "corrida"],
    run: async (client, message, args) => {
        const userdb = await client.db.findById({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**a.registrar**.` });
        if (Date.now() < userdb.eco.timers.uberCooldown) return message.reply({ content: `Você se encontra em modo de recarga, tente novamente <t:${~~(userdb.eco.timers.uberCooldown / 1000)}:R>.` });
        if (userdb.eco.car !== true) return message.reply({ content: `Você não tem um **carro**, compre utilizando o comando: \n**a.loja**.` })
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Corrida concluído!")
                    .setDescription(`${message.author}, ganhou <:Stars:1111647398188564510> **${coins} bits** + <:Exp:1111648750864171154> '1XP!' de experiência ao fazer picos de motorista de aplicativo.`)
                    .setColor("#303136")
                    .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
            ],
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("car")
                        .setLabel("Volte em 1 hora!")
                        .setEmoji("<:FlowerPurple:1109899097655222272>")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(true)
                )
            ]
        });
        await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": coins, "eco.xp": 1, }, $set: { "eco.timers.uberCooldown": Date.now() + 3600000, }, });
    }
}
