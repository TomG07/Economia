const Discord = require("discord.js");
module.exports = {
    name: "partner",
    aliases: ["parceiro", "aliado"],
    run: async (client, message, args) => {
        await message.channel.sendTyping();
        let ids = ["461618792464646145", "1027989059198537728"];
        if (ids.includes(message.author.id) !== true) return message.reply({ content: ":x: Esse comando só deve ser utilizado por **mika** ou **danger**!" });
        const guild = await client.guilds.cache.get(args[0]);
        if (!guild) return message.reply({ content: ":x: Você não informou o id de um servidor!" });
        const guilddb = await client.gd.findById({ _id: guild.id, });
        if (!guilddb) {
            const create = new client.gd({ _id: i.guild.id });
            await create.save();
            guilddb = await client.gd.findById({ _id: guild.id, });
        }
        // if (guild.g.partner === true) return message.reply({ content: ":x: Esse comando só deve ser utilizado por **mika** ou **danger**!" });
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("<:PartnerPurble:1106998251019829309> Parceiros da Anxienty!")
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter({ text: "Anxienty todos os direitos reservados!", iconURL: `${client.user.displayAvatarURL()}` })
                    .setColor("#9b59b6")
                    .addFields({
                        name: "<:FlowerPurple:1109899097655222272> Nome do Servidor",
                        value: `\`${guild.name}\``
                    }, {
                        name: "<:FlowerPurple:1109899097655222272> Moderador/RESP.",
                        value: `${message.author}`
                    })
            ],
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("setpartner")
                        .setLabel("Adicionar")
                        .setEmoji("<:FlowerPurple:1109899097655222272>")
                        .setStyle(Discord.ButtonStyle.Success)
                        .setDisabled(guilddb.g.partner),
                    new Discord.ButtonBuilder()
                        .setCustomId("removepartner")
                        .setLabel("Remover")
                        .setEmoji("<:FlowerPurple:1109899097655222272>")
                        .setStyle(Discord.ButtonStyle.Danger)
                        .setDisabled(guilddb.g.partner === false ? true : false)
                )]
        }).then((int) => {
            const coletou = int.createMessageComponentCollector({ time: 36000 });
            coletou.on("collect", async (i) => {
                await i.deferUpdate();
                if (i.user.id !== message.author.id) return;
                coletou.stop();
                if (i.customId === "setpartner") {
                    int.edit({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setTitle("<:PartnerPurble:1106998251019829309> Parceiros da Anxienty!")
                                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                                .setFooter({ text: "Anxienty todos os direitos reservados!", iconURL: `${client.user.displayAvatarURL()}` })
                                .setColor("#9b59b6")
                                .setDescription(`\> <:Check:1106590979529637938> O servidor \`${guild.name}\` adicionado aos parceiros.`)
                                .setTimestamp()
                        ], components: []
                    })
                    client.channels.cache.get("1109971281991970866").send({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
                                .setColor("#303136")
                                .setDescription(`\> <:PartnerPurble:1106998251019829309> O mod ${interaction.user} adicionou o servidor \`${guild.name} - (${guild.id})\` aos parceiros.`)
                                .setTimestamp()
                        ]
                    });
                }
            });
        });
    }
}