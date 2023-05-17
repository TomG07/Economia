const Discord = require("discord.js");
module.exports = {
    name: "daily",
    run: async (client, message, args) => {
        // const userdb = await client.userdb.findById({ _id: message.author.id });
        /* if (!userdb) {
             const newDocument = new client.userdb({ _id: message.author.id });
             await newDocument.save();
             return message.reply({ content: `${message.author}, Uma nova conta foi gerada para você com sucesso, utiize novamente esse comando para resgatar seu premio.` });
         }*/
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
                )
            ]
        });
    }
}