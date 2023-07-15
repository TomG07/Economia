const Discord = require("discord.js");
module.exports = {
    name: "marry",
    aliases: ["casar"],
    run: async (client, message, args, prefix) => {
        let p = prefix || "ny!";
        const member = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.id === args[0]);
        if (!member) return message.reply({ content: `${message.author}, Você deve mencionar a pessoa que vc quer casar!` });
        if (member.user.bot) return message.reply({ content: `${message.author}, Você não pode se casar com um bot.` });
        if (member.user.id === message.author.id) return message.reply({ content: `${message.author}, Você não pode se casar consigo mesmo!` });
        const userdb = await client.db.findOne({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**${p}registrar**.` });
        const twouserdb = await client.db.findOne({ _id: member.user.id });
        if (!twouserdb) return message.reply({ content: `${message.author}, Esse jogador **__${member.user.username}__** deve fazer o registro com o comando:\n**${p}registrar**.` })
        if (userdb.eco.marry.userId !== null) return message.reply({ content: `${message.author}, Você já se encontra casado(a)!` });
        if (twouserdb.eco.marry.userId !== null) return message.reply({ content: `${message.author}, O usuário já se encontra casado(a)!` });
        message.reply({
            content: `:ring: **|** ${member} aceita o **pedido de casamento** de ${message.author}?`,
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("yesmarry")
                        .setLabel("Sim casar com ele(a)")
                        .setEmoji("✅")
                        .setStyle(Discord.ButtonStyle.Primary)
                        .setDisabled(false)
                )
            ],
            fetchReply: true,
        }).then((int) => {
            const coletou = int.createMessageComponentCollector({ time: 96000 });
            coletou.on("collect", async (i) => {
                await i.deferUpdate();
                if (i.customId === "yesmarry") {
                    if (i.user.id !== member.user.id) return i.followUp({ content: `Essa decisão não é sua!`, ephemeral: true });
                    int.edit({ content: `:heart: :ring: | ${i.user} + ${message.author} se casarão! Felicidades ao casal.:tada:`, components: [] });
                    i.followUp({ content: `:unlock: **|** ${i.user}, Você ganhou acesso ao comando **${p}sapecar**.`, ephemeral: true });
                    await client.db.updateOne({ _id: i.user.id }, { $set: { "eco.marry.userId": message.author.id, "eco.marry.marryDate": Date.now(), }, $push: { "eco.badges": "MARRY" }, });
                    await client.db.updateOne({ _id: message.author.id }, { $set: { "eco.marry.userId": i.user.id, "eco.marry.marryDate": Date.now(), }, $push: { "eco.badges": "MARRY" }, });
                }
            });
        });
    }
}
