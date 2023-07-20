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
          .setColor("#ffb6c1")
          .setFooter({ text: "Caçadores de Insignas!", iconURL: `${client.user.displayAvatarURL()}` })
          .setDescription(`- <:money:1119274556352385046> - Recebe essa sendo um dos editores do servidor.\n- <:anel:1119285525984063509> - Recebe essa se casando com um usuário.\n- <:Inventario:1128316648223412284> - Receba essa ao escolher seu primeiro emprego.\n- <:Fazenda:1118670191509913780> - Receba essa comprando uma fazenda.`)
          .addFields({
            name: "Reservadas:",
            value: `- <:Premium:1128773466980630538> - Somente para servidores com meu premium ativado.\n- <:developeractivo:1131556095685570691> - Somente para os meus desenvolvedores.`
          })
      ]
    });
  }
}
