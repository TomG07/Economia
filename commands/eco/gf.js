const Discord = require("discord.js");
module.exports = {
    name: "gf",
    run: async (client, message, args) => {
        // const userdb = await client.userdb.findById({ _id: message.author.id });
        /* if (!userdb) {
             const newDocument = new client.userdb({ _id: message.author.id });
             await newDocument.save();
             return message.reply({ content: `${message.author}, Uma nova conta foi gerada para você com sucesso, utiize novamente esse comando para resgatar seu premio.` });
         }*/
        let coins = Math.floor(Math.random() * 200) + 500;
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
    }
}