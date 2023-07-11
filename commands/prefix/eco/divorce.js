const Discord = require("discord.js");
module.exports = {
    name: "divorce",
    aliases: ["divociar", "separar", "div"],
    run: async (client, message, args) => {
        const userdb = await client.db.findOne({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**ny!registrar**.` });
        if (userdb.eco.marry.userId == null) return message.reply({ content: `Você se encontra solteiro(a), se case utilizando o comando: \n**a.casar**.` });
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
                    if (i.user.id !== member.user.id) return i.followUp({ content: `Essa decisão não é sua!`, ephemeral: true });
                    int.edit({ content: `:sob: :ring: | ${i.user} + ${message.author} se divorciarão.`, components: [] });
                    i.followUp({ content: `:lock: Perdeu acesso ao comando **++gf**.`, ephemeral: true });
                    await client.db.updateOne({ _id: i.user.id }, { $set: { "eco.marry.userId": null, }, $pull: { "eco.badges": "MARRY" }, });
                    await client.db.updateOne({ _id: message.author.id }, { $set: { "eco.marry.userId": null, }, $pull: { "eco.badges": "MARRY" }, });
                }
            });
        });
    }
}
