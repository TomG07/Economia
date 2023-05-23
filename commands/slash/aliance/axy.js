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
                type: Discord.ApplicationCommandOptionType.String,
                required: true,
            }],
        }],
    }],
    run: async (client, interaction) => {
        const input = interaction.options.getString("mensagem");
        let ids = ["461618792464646145", "1027989059198537728"];
        if (ids.includes(interaction.user.id) !== true) return interaction.reply({ content: ":x: Esse comando só deve ser utilizado por **mika** ou **danger**!", ephemeral: true });

    }
}