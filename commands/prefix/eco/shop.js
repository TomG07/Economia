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
                        new Discord.StringSelectMenuOptionBuilder()
                            .setCustomId('wshop')
                            .setPlaceholder('Comprar')
                            .setMinValues(1)
                            .setMaxValues(1)
                            .addOptions(
                                new Discord.StringSelectMenuOptionBuilder()
                                    .setLabel('Fazenda')
                                    .setDescription('Comprar uma fazenda')
                                    .setValue('farm-10000')
                            )
                    )
            ], fetchReply: true
        });
    }
}