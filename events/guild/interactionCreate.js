const Discord = require("discord.js");
const client = require("../../index")
module.exports = {
  name: Discord.Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (interaction.customId === "join") return;
    if (interaction.isModalSubmit() === true) return;
    if (interaction.isButton()) {
      if (interaction.customId.startsWith("r")) {
        let guild = await client.guilds.cache.get(interaction.customId.split("-")[1]);
        //if (!guild) return;
        interaction.message.edit({ content: "<:Check:1106590979529637938> Ticket fechado!", embeds: [], components: [] });
        interaction.reply({
          embeds: [
            new Discord.EmbedBuilder()
              .setTitle("<a:Reizinho:1109791282575966239> Servidor reprovado!")
              .setThumbnail(interaction.user.displayAvatarURL({ dunamic: true }))
              .setTimestamp()
              .setColor("#9b59b6")
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
              .setDescription(`\> <:Remover:1105625912600436776> O mod ${interaction.user} reprovou o servidor \`${guild.name} - (${guild.id})\` em sua análise.`)
              .setTimestamp()
          ]
        });
      } else if (interaction.customId.startsWith("a")) {
        let guild = await client.guilds.cache.get(interaction.customId.split("-")[1]);
        interaction.message.edit({ content: "<:Check:1106590979529637938> Ticket fechado!", embeds: [], components: [] });
        interaction.reply({
          embeds: [
            new Discord.EmbedBuilder()
              .setTitle("<a:Reizinho:1109791282575966239> Servidor reprovado!")
              .setThumbnail(interaction.user.displayAvatarURL({ dunamic: true }))
              .setTimestamp()
              .setColor("#9b59b6")
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
        await client.gd.updateOne({ _id: guild.id, }, { $set: { "g.approvedBy": interaction.user.id, "g.approvedDate": Date.now(), } });
        client.channels.cache.get("1109971281991970866").send({
          embeds: [
            new Discord.EmbedBuilder()
              .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
              .setColor("#303136")
              .setDescription(`\> <:Check:1106590979529637938> O mod ${interaction.user} aprovou o servidor \`${guild.name} - (${guild.id})\` em sua análise.`)
              .setTimestamp()
          ]
        });
      }
      // interaction.reply({ content: `${interaction.customId}`, ephemeral: true });
    }
  }
}