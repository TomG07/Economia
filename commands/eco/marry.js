const Discord = require("discord.js");
module.exports = {
    name: "marry",
    run: async (client, message, args) => {
        const member = message.mentions.members.first();
        if (!member) return message.reply({ content: `Mencione a pessoa que vc quer casar!` });
        if (member.user.bot) return message.reply({ content: `Você não pode se casar com um bot.` });
        if (member.user.id === message.author.id) return message.reply({ content: `Você não pode se casar consigo mesmo!` });
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
