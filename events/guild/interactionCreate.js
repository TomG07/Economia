const Discord = require("discord.js");
const client = require("../../index")
module.exports = {
  name: Discord.Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (interaction.customId === "join") return;
    if (interaction.isModalSubmit() === true) return;
    if (interaction.isButton()){
      if (interaction.customId.startsWith("r")) {
        let guild = await client.guilds.cache.get(interaction.customId.split("-")[1]);
         interaction.reply({ content: `${guild.name}`, ephemeral: true });
      }
     // interaction.reply({ content: `${interaction.customId}`, ephemeral: true });
    }
  }
}
