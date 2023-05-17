const Discord = require("discord.js");
module.exports = {
    name: "work",
    run: async (client, message, args) => {
        const userdb = await client.db.findById({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**++registrar**.` });
        if (Date.now() < userdb.timers.workCooldown) return message.reply({ content: `Você se encontra em modo de recarga, tente novamente ${~~(userdb.timers.workCooldown / 1000 )}.` });
        if (!userdb.eco.job) return message.reply({ content: `Você não tem um **emprego** utilize o comando: \n**++empregos**.` })
        let coins = Math.floor(Math.random() * 700) + 900;
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Trabalho concluído!")
                    .setDescription(`:coin: | ${message.author}, ganhou **${coins} diamantes** + '1XP!' de experiência ao concluir seu trabalho de **lixeiro**.`)
                    .setColor("#303136")
                    .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
            ],
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("work")
                        .setLabel("Volte em 1 hora!")
                        .setStyle(Discord.ButtonStyle.Success)
                        .setDisabled(true)
                )
            ]
        });
    }
}
