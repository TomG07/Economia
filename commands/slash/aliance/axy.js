const Discord = require("discord.js");
module.exports = {
    name: "axy",
    description: "[Anxienty] Defina a mensagem Dm",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [{
        name: "set",
        description: "[Anxienty] Defina a mensagem Dm",
        type: Discord.ApplicationCommandOptionType.SubcommandGroup,
        options: [{
            name: "div",
            description: "[Anxienty] Defina a mensagem Dm",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "mensagem",
                description: "Qual será a mensagem?",
                type: Discord.ApplicationCommandOptionType.Channel,
                required: true,
            }],
        }],
    }],
    run: async (client, interaction) => {
        const input = interaction.options.getString("mensagem");
    }
}