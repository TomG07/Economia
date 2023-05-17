const Discord = require("discord.js");
module.exports = {
    name: "marry",
    run: async (client, message, args) => {
        let member = message.mentions.members.first();
        message.reply({
            content: `:ring: | ${member} aceita o **pedido de casamento** de ${message.author}?`,
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("yesmarry")
                        .setLabel("Sim, aceito")
                        .setStyle(Discord.ButtonStyle.Success)
                        .setDisabled(false)
                )
            ],
            fetchReply: true,
        }).then((int) => {
            const coletou = int.createMessageComponentCollector({ time: 36000 });
            coletou.on("collect", async (i) => {
                await i.deferUpdate();
                if (i.customId === "yesmarry") {
                    int.edit({ content: `:heart: :ring: | ${i.user} + ${message.author} se casarão.`, components: [] });
                    i.followUp({ content: `:unlock: Recebeu acesso ao comando **++gf**.`, ephemeral: true });
                }
            });
        });
    }
}
