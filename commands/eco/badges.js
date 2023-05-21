const Discord = require("discord.js");
module.exports = {
  name: "badges",
  aliases: ["emblemas", "conquistas"],
  run: async (client, message, args) => {
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setTitle("Emblemas de perfil")
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor("#9b59b6")
          .setDescription(`<:AnelCasal:1109190514009452615> | Ganhe esse \`cracha\` se casando.\n<:Staff:1107072021231317193> | Ganhe esse \`cracha\` com seu primeiro emprego.`)
      ]
    });
  }
}
