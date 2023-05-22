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
        interaction.reply({
          embeds: [
            new Discord.EmbedBuilder()
              .setTitle("Servidor reprovado!")
              .setThumbnail(i.user.displayAvatarURL({ dunamic: true }))
              .setTimestamp()
              .setColor("#9b59b6")
              .addFields({
                name: "<:a_sparklespurple:1105803277230153848> Servidor Nome",
                value: `${guild.name}`
              }, {
                name: "<:a_sparklespurple:1105803277230153848> Servidor Id",
                value: `\`${guild.id}\``
              }, {
                name: "<:a_sparklespurple:1105803277230153848> Servidor População",
                value: `\`${guild.memberCount}\``
              })
          ], ephemeral: true
        });
        client.channels.cache.get("1109971281991970866").send({
          embeds: [
            new Discord.EmbedBuilder()
              .setAuthor({ name: `${i.user.username}`, iconURL: `${i.user.displayAvatarURL({ dynamic: true })}` })
              .setColor("#303136")
              .setDescription(`\> <:Remover:1105625912600436776> O mod ${i.user} reprovou o servidor \`${guild.name} - (${guild.id})\` em sua análise.`)
              .setTimestamp()
          ]
        });
      }
      // interaction.reply({ content: `${interaction.customId}`, ephemeral: true });
    }
  }
}
