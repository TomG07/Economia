const Discord = require("discord.js");
module.exports = {
  name: "badges",
  aliases: ["emblemas", "conquistas"],
  run: async (client, message, args) => {
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setTitle("Badges do Perfil!")
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor("#303136")
          .setFooter({ text: "Caçadores de Insignas!", iconURL: `${client.user.displayAvatarURL()}` })
          .setDescription(`<:anel:1119285525984063509> - Recebe essa se casando.\n<:Fazenda:1118670191509913780> - Receba essa comprando uma fazenda.`)
          .addFields({
             name: "Reservadas:",
             value: `<:developeractivo:1104003870180528179> - Somente para os meus desenvolvedores.`
          })
      ]
    });
  }
}
