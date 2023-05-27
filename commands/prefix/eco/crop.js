const Discord = require("discord.js");
module.exports = {
    name: "crop",
    aliases: ["colher", "safra"],
    run: async (client, message, args) => {
        const userdb = await client.db.findById({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**a.registrar**.` });
        if (userdb.eco.farm.owner !== true) return message.reply({ content: `Você não possue uma fazenda, compre utilizando o comando: \n**a.loja**.` });
        message.reply({
            content: `<:fazenda:1112066431585091654> __**Sua fazenda**__!\n\n<:plantacao:1112066775509635162> \`Platação de Batata\`: ${userdb.eco.farm.seeds.batata.count >= 1 ? `\n\> Lotes: [${userdb.eco.farm.seeds.batata.count}]\n\> Colher: ${Date.now() < userdb.eco.farm.seeds.batata.cooldown ? `<:Battery_Yellow:1089745568122818680> <t:${~~(userdb.eco.farm.seeds.batata.cooldown / 1000)}:R>` : "<:Battery_Green:1089745543963623524> | Colete agora!"}` : "Lote vazio!"}`,
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("wgetbatata")
                        .setLabel("Colher")
                        .setEmoji("🥔")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(userdb.eco.farm.seeds.batata.count >= 1 && Date.now() > userdb.eco.farm.seeds.batata.cooldown ? false : true)
                )], fetchReply: true
        }).then((int) => {
            const coletou = int.createMessageComponentCollector({ time: 36000 });
            coletou.on('collect', async (i) => {
                await i.deferUpdate();
                if (i.customId === "wgetbatata") {
                    coletou.stop();
                    if (i.user.id !== message.author.id) return i.followUp({ content: `Essa decisão não cabe a vc!`, ephemeral: true });
                    //if (checar.eco.coins < value) return message.reply({ content: `Saldo insuficiente!` });
                    let size = userdb.eco.farm.seeds.batata.count;
                    if (size <= 0) return;
                    int.edit({ content: `${i.user}, Você colheu **${size} batatas** da sua fazenda.`, components: [] });
                    await client.db.updateOne({ _id: i.user.id }, { $inc: { "eco.coins": 2, "eco.farm.seeds.batata.count": -size, }, });
                }
            });
        });
    }
}
