const Discord = require("discord.js");
module.exports = {
    name: "marry",
    aliases: ["casar"],
    run: async (client, message, args) => {
        const member = message.mentions.members.first();
        if (!member) return message.reply({ content: `Mencione a pessoa que vc quer casar!` });
        if (member.user.bot) return message.reply({ content: `Você não pode se casar com um bot.` });
        if (member.user.id === message.author.id) return message.reply({ content: `Você não pode se casar consigo mesmo!` });
        const userdb = await client.db.findById({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**++registrar**.` });
        const twouserdb = await client.db.findById({ _id: member.user.id });
        if (!twouserdb) return message.reply({ content: `Esse jogador **${member.user.username}** não utilizou o \n**++registrar**.` })
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
                    if (i.user.id !== member.user.id) return i.followUp({ content: `Essa decisão não é sua!`, ephemeral: true });
                    int.edit({ content: `:heart: :ring: | ${i.user} + ${message.author} se casarão.`, components: [] });
                    i.followUp({ content: `:unlock: Recebeu acesso ao comando **++gf**.`, ephemeral: true });
                    await client.db.updateOne({ _id: i.user.id }, { $set: { "eco.marry.userId": message.author.id, "eco.marry.marryDate": Date.now(), }, });
                    await client.db.updateOne({ _id: message.author.id }, { $set: { "eco.marry.userId": i.user.id, "eco.marry.marryDate": Date.now(), }, });
                }
            });
        });
    }
}
