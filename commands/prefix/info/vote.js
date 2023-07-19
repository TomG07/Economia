const Discord = require("discord.js");
module.exports = {
  name: "vote",
  aliases: ["votar", "topgg", "bl"],
  run: async (client, message, args) => {
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
          .setDescription(`✨ ${message.author}, Você sabia que pode votar em mim a cada **12 horas** e receber um bônus de **1,200 magias** a cada voto que vc me der! Vote em mim [clicando aqui](https://top.gg/bot/1128306038337183795/vote).`)
          .setColor("#ffb6c1")
      ],
      components: [
        new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setLabel("Votar")
            .setEmoji("💖")
            .setURL("https://top.gg/bot/1128306038337183795/vote")
            .setStyle(Discord.ButtonStyle.Link)
        )
      ]
    });
  }
}