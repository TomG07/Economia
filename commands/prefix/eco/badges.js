const Discord = require("discord.js");
module.exports = {
  name: "badges",
  aliases: ["emblemas", "conquistas"],
  run: async (client, message, args) => {
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setTitle("Emblemas do Perfil!")
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor("#303136")
          .setFooter({ text: "Caçadores de insignas!", iconURL: `${client.user.displayAvatarURL()}` })
          .setDescription(`<:AnelCasal:1109190514009452615> | Ganhe esse \`badge\` se casando.\n<:Staff:1107072021231317193> | Ganhe esse \`badge\` com seu primeiro emprego.`)
          .addFields({
             name: "Reservadas:",
             value: `<:developeractivo:1104003870180528179> | Somente para os meus criadores.\n<:Badge_HypeSquad_Events:1110898364192665631> | Recrutadores de comunidades na **Anxienty**.`
          })
      ]
    });
  }
}
