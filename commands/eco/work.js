const Discord = require("discord.js");
module.exports = {
    name: "work",
    run: async (client, message, args) => {
        // const userdb = await client.userdb.findById({ _id: message.author.id });
        /* if (!userdb) {
             const newDocument = new client.userdb({ _id: message.author.id });
             await newDocument.save();
             return message.reply({ content: `${message.author}, Uma nova conta foi gerada para você com sucesso, utiize novamente esse comando para resgatar seu premio.` });
         }*/
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