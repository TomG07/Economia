const Discord = require("discord.js");
module.exports = {
    name: "farm",
    aliases: ["plantar", "fazenda"],
    run: async (client, message, args) => {
        const userdb = await client.db.findById({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**a.registrar**.` });
        if (userdb.eco.farm.owner !== true) return message.reply({ content: `Você não possue uma fazenda, compre utilizando o comando: \n**a.loja**.` });
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("<:FlowerPurple:1109899097655222272> Fazendinha!")
                    .setThumbnail(message.author.displayAvatarURL({ dunamic: true }))
                    .setTimestamp()
                    .setColor("#303136")
                    .setDescription(`${message.author}, essa é sua fazenda plante algo nela uilizando o menu abaixo.`)
                    .addFields({ name: "<:pix:1112785378135507094> Custo do terreno:", value: "Pagou a vista **<:Stars:1111647398188564510> 20k de bits** nessa propriedade." })
                    .setImage("https://media.discordapp.net/attachments/1111358828282388532/1111613494245199923/0bd3cb289b1209b614923f09afc58e5d.png?width=1080&height=479")
            ],
            components: [
                new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId('wplant')
                            .setPlaceholder('Plantar')
                            .setMinValues(1)
                            .setMaxValues(1)
                            .addOptions(
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Plantar (2x) Batata')
                                    .setEmoji("🚜")
                                    .setDescription('Plante [2] lotes no custo de 300 bits')
                                    .setValue('batata-2-300'),
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Plantar (4x) Batata')
                                    .setEmoji("🚜")
                                    .setDescription('Plante [4] lotes no custo de 600 bits')
                                    .setValue('batata-4-600'),
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Plantar (2x) Trigo')
                                    .setEmoji("🚜")
                                    .setDescription('Plante [2] lotes no custo de 400 bits')
                                    .setValue('trigo-2-400'),
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Plantar (6x) Trigo')
                                    .setEmoji("🚜")
                                    .setDescription('Plante [6] lotes no custo de 800 bits')
                                    .setValue('trigo-6-800'),
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Plantar (2x) Milho')
                                    .setEmoji("🚜")
                                    .setDescription('Plante [2] lotes no custo de 180 bits')
                                    .setValue('milho-2-180'),
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Plantar (5x) Milho')
                                    .setEmoji("🚜")
                                    .setDescription('Plante [5] lotes no custo de 500 bits')
                                    .setValue('milho-5-500'),
                            )
                    )
            ], fetchReply: true
        }).then((int) => {
            const coletou = int.createMessageComponentCollector({ time: 36000 });
            coletou.on('collect', async (i) => {
                await i.deferUpdate();
                if (i.customId === "wplant") {
                    coletou.stop();
                    if (i.user.id !== message.author.id) return i.followUp({ content: `Essa decisão não é sua!`, ephemeral: true });
                    const x = i.values[0];
                    let semente = userdb.eco.farm.seeds[`${x.split("-")[0]}`];
                    let calcular = semente.count + Number(`${x.split("-")[1]}`);
                    if (calcular >= semente.max) return message.reply({ content: `\`[${calcular}/${semente.max}\`] Você iria passar o limite de seus lotes de ${x.split("-")[0]}, realize a colheita utilizando o comando:\n**a.colher**` });
                    if (semente.count >= semente.max) return message.reply({ content: `Você já lotou os seus lote de ${x.split("-")[0]}, realize a colheita utilizando o comando:\n**a.colher**` });
                    if (userdb.eco.coins < x.split("-")[2]) return message.reply({ content: `Saldo insuficiente!` });
                    int.edit({ content: `<:1_Correto:1079943018477523004> ${i.user}, Você plantou **${x.split("-")[1]} lotes** de **${x.split("-")[0]}** com sucesso.`, embeds: [], components: [] });
                    if (x.split("-")[0] === "batata") {
                        let valores = Number(`${x.split("-")[2]}`);
                        let quantias = Number(`${x.split("-")[1]}`);
                        await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": -valores, "eco.farm.seeds.batata.count": quantias, }, $set: { "eco.farm.seeds.batata.cooldown": Date.now() + 7200000, } });
                    } else if (x.split("-")[0] === "trigo") {
                        let valores = Number(`${x.split("-")[2]}`);
                        let quantias = Number(`${x.split("-")[1]}`);
                        await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": -valores, "eco.farm.seeds.trigo.count": quantias, }, $set: { "eco.farm.seeds.trigo.cooldown": Date.now() + 7200000, } });
                    } else if (x.split("-")[0] === "milho") {
                        let valores = Number(`${x.split("-")[2]}`);
                        let quantias = Number(`${x.split("-")[1]}`);
                        await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": -valores, "eco.farm.seeds.milho.count": quantias, }, $set: { "eco.farm.seeds.milho.cooldown": Date.now() + 7200000, } });
                    }
                }
            });
        });
    }
}
