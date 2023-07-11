const Discord = require("discord.js");
module.exports = {
    name: "farm",
    aliases: ["plantar", "fazenda"],
    run: async (client, message, args) => {
        const userdb = await client.db.findOne({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**ny!registrar**.` });
        if (userdb.eco.farm.owner !== true) return message.reply({ content: `${message.author}, Você não tem uma fazenda! Compre utilizando o comando: \n**ny!loja**.` });
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("<:Fazenda:1118670191509913780> Fazendinha!")
                    .setThumbnail(message.author.displayAvatarURL({ dunamic: true }))
                    .setTimestamp()
                    .setColor("#303136")
                    .setDescription(`${message.author}, essa é sua fazenda plante algo nela uilizando o menu abaixo.`)
                    .addFields({ name: "Tempo de colheita:", value: "- Todos os seus lotes referentes ao novo plantio terão seu tempo de **crescimento resetados** e atualizados." })
                    .setImage("https://media.discordapp.net/attachments/1113783795942961204/1126613681447387327/images_1.jpg")
            ],
            components: [
                new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId('wplant')
                            .setPlaceholder('Plantar novo lote')
                            .setMinValues(1)
                            .setMaxValues(1)
                            .addOptions(
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Plantar (2x) Batata')
                                    .setEmoji("🚜")
                                    .setDescription('Plante [2] lotes no custo de 300 euros.')
                                    .setValue('batata-2-300'),
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Plantar (4x) Batata')
                                    .setEmoji("🚜")
                                    .setDescription('Plante [4] lotes no custo de 600 euros.')
                                    .setValue('batata-4-600'),
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Plantar (2x) Trigo')
                                    .setEmoji("🚜")
                                    .setDescription('Plante [2] lotes no custo de 400 euros.')
                                    .setValue('trigo-2-400'),
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Plantar (6x) Trigo')
                                    .setEmoji("🚜")
                                    .setDescription('Plante [6] lotes no custo de 800 euros.')
                                    .setValue('trigo-6-800'),
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Plantar (2x) Milho')
                                    .setEmoji("🚜")
                                    .setDescription('Plante [2] lotes no custo de 180 euros.')
                                    .setValue('milho-2-180'),
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Plantar (5x) Milho')
                                    .setEmoji("🚜")
                                    .setDescription('Plante [5] lotes no custo de 500 euros.')
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
                    if (i.user.id !== message.author.id) return i.followUp({ content: `:x: Não é o usuário que executou o comando!`, ephemeral: true });
                    const x = i.values[0];
                    let semente = userdb.eco.farm.seeds[`${x.split("-")[0]}`];
                    let calcular = semente.count + Number(`${x.split("-")[1]}`);
                    if (calcular >= semente.max) return i.followUp({ ephemeral: true, content: `\`[${calcular}/${semente.max}\`] ${i.user}, Você iria passar o limite de seus lotes de ${x.split("-")[0]}! Realize a colheita utilizando o comando:\n**ny!colher**` });
                    if (semente.count >= semente.max) return i.followUp({ ephemeral: true, content: `${i.user}, Você já lotou os seus lote de ${x.split("-")[0]}! Realize a colheita utilizando o comando:\n**ny!colher**` });
                    if (userdb.eco.coins < x.split("-")[2]) return i.followUp({ ephemeral: true, content: `${i.user}, Você não tem saldo suficiente!` });
                    int.edit({ content: `<:money:1119274556352385046> **|** ${i.user}, Você plantou **${x.split("-")[1]} lotes** de **${x.split("-")[0]}** em sua fazenda com sucesso! Você gastou **${Number(`${x.split("-")[2]}`)} euros** com a nova plantação.`, embeds: [], components: [] });
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
