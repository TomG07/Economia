const Discord = require("discord.js");
const client = require("../../index")
module.exports = {
  name: Discord.Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (interaction.customId === "join") return;
    if (interaction.isModalSubmit() === true) return;
    if (interaction.isButton()){
      interaction.reply({ content: `${interaction.customId}`, ephemeral: true });
    }
  }
}
