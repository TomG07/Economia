const Discord = require("discord.js");
module.exports = {
    name: "shop",
    aliases: ["loja", "mercado"],
    run: async (client, message, args) => {
        const userdb = await client.db.findById({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**a.registrar**.` });
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("<:FlowerPurple:1109899097655222272> Shop!")
                    .setThumbnail(message.author.displayAvatarURL({ dunamic: true }))
                    .setTimestamp()
                    .setColor("#9b59b6")
                    .addFields({
                        name: ":ox: Fazenda",
                        value: "Preço: <:Bits:1110890676721291346> **20,000 bits**"
                    })
            ],
            components: [
                new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId('wshop')
                            .setPlaceholder('Comprar')
                            .setMinValues(1)
                            .setMaxValues(1)
                            .addOptions(
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Fazenda')
                                    .setDescription('Comprar uma fazenda')
                                    .setValue('farm-20000')
                            )
                    )
            ], fetchReply: true
        }).then((int) => {
            const coletou = int.createMessageComponentCollector({ time: 36000 });
            coletou.on('collect', async (i) => {
                await i.deferUpdate();
                if (i.customId === "wshop") {
                    coletou.stop();
                    if (i.user.id !== message.author.id) return i.followUp({ content: `Essa decisão não é sua!`, ephemeral: true });
                    const x = i.values[0];
                    if (userdb.eco.farm.owner === true) return message.reply({ content: `Voce já tem uma fazenda!` });
                    if (userdb.eco.coins < x.split("-")[1]) return message.reply({ content: `Saldo insuficiente!` });
                    int.edit({ content: `<:1_Correto:1079943018477523004> ${i.user}, Você comprou uma fazenda por **10k de bits**.`, embeds: [], components: [] });
                    await client.db.updateOne({ _id: message.author.id }, { $set: { "eco.farm.owner": true, }, $inc: { "eco.coins": -20000, }, });
                }
            });
        });
    }
}