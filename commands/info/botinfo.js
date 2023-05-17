const Discord = require("discord.js");
module.exports = {
    name: "botinfo",
    aliases: ["info"],
    run: async (client, message, args) => {
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Minhas informações")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("#303136")
            ]
        });
    }
}
