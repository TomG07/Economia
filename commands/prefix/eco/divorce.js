const Discord = require("discord.js");
module.exports = {
    name: "divorce",
    aliases: ["divociar", "separar", "div"],
    run: async (client, message, args, prefix) => {
        let p = prefix || "ny!";
        const userdb = await client.db.findOne({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**${p}registrar**.` });
        if (userdb.eco.marry.userId == null) return message.reply({ content: `${message.author}, Você se encontra solteiro(a)! Para se casar utilize o comando: \n**${p}casar**.` });
        let marryId = userdb.eco.marry.userId;
        message.reply({
            content: `:broken_heart: ** |** ${message.author} Você realmente quer se divorciar de <@${marryId}>?`,
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("nomarry")
                        .setLabel("Sim quero divorciar")
                        .setEmoji("✅")
                        .setStyle(Discord.ButtonStyle.Primary)
                        .setDisabled(false)
                )
            ],
            fetchReply: true,
        }).then((int) => {
            const coletou = int.createMessageComponentCollector({ time: 36000 });
            coletou.on("collect", async (i) => {
                await i.deferUpdate();
                if (i.customId === "nomarry") {
                    if (i.user.id !== message.author.id) return i.followUp({ content: `${i.user}, Essa decisão não é sua!`, ephemeral: true });
                    int.edit({ content: `:sob: :ring: | ${i.user} + <@${marryId}> se divorciarão!`, components: [] });
                    i.followUp({ content: `:lock: **|** ${i.user}, Você perdeu acesso ao comando **${p}sapecar**.`, ephemeral: true });
                    await client.db.updateOne({ _id: i.user.id }, { $set: { "eco.marry.userId": null, }, $pull: { "eco.badges": "MARRY" }, });
                    await client.db.updateOne({ _id: marryId }, { $set: { "eco.marry.userId": null, }, $pull: { "eco.badges": "MARRY" }, });
                }
            });
        });
    }
}
