const Discord = require("discord.js");
const client = require("../../index")
module.exports = {
  name: Discord.Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    let x = ["pay", "nomarry", "join", "yesmarry", "setpartner", "removepartner"];
    if (x.includes(interaction.customId) === true) return;
    if (interaction.isModalSubmit() === true) return;
    if (interaction.isButton()) {
      if (interaction.customId.startsWith("r")) {
        let guild = await client.guilds.cache.get(interaction.customId.split("-")[1]);
        //if (!guild) return;
        interaction.message.edit({ content: `📩 | **__Ticket fechado__**! A solicitação do servidor (${guild.name}-${guild.id}) foi avaliada pelo(a) **${interaction.user.username}**.`, embeds: [], components: [] });
        interaction.reply({
          embeds: [
            new Discord.EmbedBuilder()
              .setTitle("Servidor - Reprovado!")
              .setThumbnail(interaction.user.displayAvatarURL({ dunamic: true }))
              .setTimestamp()
              .setColor("#303136")
              .addFields({
                name: "<:Remover:1105625912600436776> Servidor Nome",
                value: `${guild.name}`
              }, {
                name: "<:Remover:1105625912600436776> Servidor Id",
                value: `\`${guild.id}\``
              }, {
                name: "<:Remover:1105625912600436776> Servidor População",
                value: `\`${guild.memberCount}\``
              })
          ], ephemeral: true
        });
        await client.gd.findOneAndDelete({ _id: guild.id });
        client.channels.cache.get("1109971281991970866").send({
          embeds: [
            new Discord.EmbedBuilder()
              .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
              .setColor("#303136")
              .setDescription(`<:Remover:1105625912600436776> O recrutador ${interaction.user} reprovou o servidor \`${guild.name} - (${guild.id})\` em sua análise.`)
              .setTimestamp()
          ]
        });
      } else if (interaction.customId.startsWith("a")) {
        let guild = await client.guilds.cache.get(interaction.customId.split("-")[1]);
        interaction.message.edit({ content: `📩 | **__Ticket fechado__**! A solicitação do servidor (${guild.name}-${guild.id}) foi avaliada pelo(a) **${interaction.user.username}**.`, embeds: [], components: [] });
        interaction.reply({
          embeds: [
            new Discord.EmbedBuilder()
              .setTitle("Servidor - Aprovado!")
              .setThumbnail(interaction.user.displayAvatarURL({ dunamic: true }))
              .setTimestamp()
              .setColor("#303136")
              .addFields({
                name: "<:Check:1106590979529637938> Servidor Nome",
                value: `${guild.name}`
              }, {
                name: "<:Check:1106590979529637938> Servidor Id",
                value: `\`${guild.id}\``
              }, {
                name: "<:Check:1106590979529637938> Servidor População",
                value: `\`${guild.memberCount}\``
              })
          ], ephemeral: true
        });
        await client.gd.updateOne({ _id: guild.id, }, { $set: { "g.repUser": `${interaction.customId.split("-")[2]}`, "g.approvedBy": interaction.user.id, "g.approvedDate": Date.now(), } });
        client.channels.cache.get("1110229810694865076").send({
          embeds: [
            new Discord.EmbedBuilder()
              .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
              .setColor("#9b59b6")
              .setDescription(`<:Check:1106590979529637938> O recrutador ${interaction.user} aprovou o servidor \`${guild.name} - (${guild.id})\` em sua análise.`)
              .setTimestamp()
              .setFooter({ text: "Anxienty todos os direitos reservados!", iconURL: `${client.user.displayAvatarURL()}` })                               
          ]
        });
      }
      // interaction.reply({ content: `${interaction.customId}`, ephemeral: true });
    }
  }
}
