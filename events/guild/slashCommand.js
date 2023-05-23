const Discord = require("discord.js");
const client = require("../../index");
module.exports = {
    name: Discord.Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (interaction.channel.type === Discord.ChannelType.DM) return interaction.channel.send({ content: "Teste" });
        if (!interaction.guild) return;
        //if (!interaction.isChatInputCommand()) return;
        if (interaction.type === Discord.InteractionType.ApplicationCommand) {
            const cmd = client.slashCommands.get(interaction.commandName);
            if (!cmd) return interaction.reply({ content: `:x: Ops! dados essenciais para construir este comando não foram encontrados!`, ephemeral: true });
            interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
            cmd.run(client, interaction);
        }
    }
}