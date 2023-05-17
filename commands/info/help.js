const Discord = require("discord.js");
module.exports = {
    name: "help",
    aliases: ["ajuda", "comandos"],
    run: async (client, message, args) => {
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Meus comandos")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("#303136")
            ]
        });
    }
}
