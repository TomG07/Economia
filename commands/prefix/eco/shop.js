const Discord = require("discord.js");
module.exports = {
    name: "shop",
    aliases: ["loja", "mercado"],
    run: async (client, message, args, prefix) => {
        await message.channel.sendTyping();
        let p = prefix || "ny!";
        const userdb = await client.db.findOne({ userId: `${message.guild.id}-${message.author.id}` });
        if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**${p}registrar**.` });
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("<:FlowerPurple:1109899097655222272> Shop!")
                    .setThumbnail(message.author.displayAvatarURL({ dunamic: true }))
                    .setTimestamp()
                    .setColor("#ffb6c1")
                    .addFields({
                        name: "<:Fazenda:1118670191509913780> Fazenda",
                        value: "- Preço: **20,000 magias**"
                    }, {
                        name: ":magic_wand:  Varinha",
                        value: "- Preço: **15,000 magias**"
                    })
            ],
            components: [
                new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId('wshop')
                            .setPlaceholder('Adicionar no carrinho')
                            .setMinValues(1)
                            .setMaxValues(1)
                            .addOptions(
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Comprar (1x) Fazenda')
                                    .setEmoji("<:Potion:1128800422220546168>")
                                    .setDescription('Compre uma fazenda para platar suas sementes')
                                    .setValue('farm-20000'),
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Comprar (1x) Varinha')
                                    .setEmoji("<:Potion:1128800422220546168>")
                                    .setDescription('Compre um varinha para fazer feitiços')
                                    .setValue('car-15000')
                            )
                    )
            ], fetchReply: true
        }).then((int) => {
            const coletou = int.createMessageComponentCollector({ time: 36000 });
            coletou.on('collect', async (i) => {
                await i.deferUpdate();
                if (i.customId === "wshop") {
                    coletou.stop();
                    const x = i.values[0];
                    if (x.split("-")[0] === "farm") {
                        if (i.user.id !== message.author.id) return i.followUp({ content: `Essa decisão não é sua!`, ephemeral: true });
                        if (userdb.eco.farm.owner === true) return message.reply({ content: `Você já possui uma fazenda!` });
                        if (userdb.eco.coins < x.split("-")[1]) return message.reply({ content: `Saldo insuficiente!` });
                        int.edit({ content: `<:pix:1112785378135507094> ${i.user}, Você comprou uma fazenda por **<:Stars:1111647398188564510> 20k de bits**.`, embeds: [], components: [] });
                        await client.db.updateOne({ _id: message.author.id }, { $set: { "eco.farm.owner": true, }, $inc: { "eco.coins": -20000, }, });
                    } else if (x.split("-")[0] === "car") {
                        if (i.user.id !== message.author.id) return i.followUp({ content: `Essa decisão não é sua!`, ephemeral: true });
                        if (userdb.eco.car === true) return message.reply({ content: `Você já possui um carro!` });
                        if (userdb.eco.coins < x.split("-")[1]) return message.reply({ content: `Saldo insuficiente!` });
                        int.edit({ content: `<:pix:1112785378135507094> ${i.user}, Você comprou um carro por **<:Stars:1111647398188564510> 15k de bits**.`, embeds: [], components: [] });
                        await client.db.updateOne({ _id: message.author.id }, { $set: { "eco.car": true, }, $inc: { "eco.coins": -15000, }, });
                    }
                }
            });
        });
    }
}
