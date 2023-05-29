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
                    .setColor("#303136")
                    .addFields({
                        name: ":ox: Fazenda",
                        value: "Preço: <:Stars:1111647398188564510> **20,000 bits**"
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
                                    .setLabel('Comprar uma Fazenda')
                                    .setEmoji("<:pix:1112785378135507094>")
                                    .setDescription('Compre uma fazenda para platar suas sementes')
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
                    if (userdb.eco.farm.owner === true) return message.reply({ content: `Você já possui uma fazenda!` });
                    if (userdb.eco.coins < x.split("-")[1]) return message.reply({ content: `Saldo insuficiente!` });
                    int.edit({ content: `<:pix:1112785378135507094> ${i.user}, Você comprou uma fazenda por **<:Stars:1111647398188564510> 20k de bits**.`, embeds: [], components: [] });
                    await client.db.updateOne({ _id: message.author.id }, { $set: { "eco.farm.owner": true, }, $inc: { "eco.coins": -20000, }, });
                }
            });
        });
    }
}
