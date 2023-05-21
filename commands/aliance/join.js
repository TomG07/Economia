const Discord = require("discord.js");
module.exports = {
    name: "join",
    aliases: ["participar", "form", "entrar"],
    run: async (client, message, args) => {
        await message.channel.sendTyping();
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Participar da **Anxienty**!")
                    .setTimestamp()
                    .setDescription("\> **Requisitos:**\nTer mais de 150 membros.\nRetenção acima de 15%. (Membros online)\nEstar de acordo com nossas [ToS](https://discord.com/channels/1008736077625970780/1091444609093214341).")
                    .setColor("#9b59b6")
            ],
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("join")
                        .setLabel("Enviar meu servidor!")
                        .setEmoji("<:FlowerPurple:1109899097655222272>")
                        .setStyle(Discord.ButtonStyle.Primary)
                        .setDisabled(true)
                )]
        });
    }
}