const Discord = require("discord.js");
module.exports = {
    name: "divorce",
    run: async (client, message, args) => {
        let member = message.mentions.members.first();
        message.reply({
            content: `:broken_heart: | ${member} aceita o **pedido de divorcio** de ${message.author}?`,
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("nomarry")
                        .setLabel("Sim, aceito")
                        .setStyle(Discord.ButtonStyle.Danger)
                        .setDisabled(false)
                )
            ],
            fetchReply: true,
        }).then((int) => {
            const coletou = int.createMessageComponentCollector({ time: 36000 });
            coletou.on("collect", async (i) => {
                await i.deferUpdate();
                if (i.customId === "nomarry") {
                    int.edit({ content: `:sob: :ring: | ${i.user} + ${message.author} se divorciarão.`, components: [] });
                    i.followUp({ content: `:lock: Perdeu acesso ao comando **++gf**.`, ephemeral: true });
                }
            });
        });
    }
}
