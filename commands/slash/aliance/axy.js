const Discord = require("discord.js");
module.exports = {
    name: "axy",
    description: "[Anxienty] Defina a mensagem Dm",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [{
        name: "div",
        description: "[Anxienty] Defina a mensagem Dm",
        type: Discord.ApplicationCommandOptionType.SubcommandGroup,
        options: [{
            name: "set",
            description: "[Anxienty] Defina a mensagem Dm",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "mensagem",
                description: "Qual será a mensagem?",
                type: Discord.ApplicationCommandOptionType.String,
                min_length: 20,
                max_length: 2450,
                required: true,
            }],
        }, {
            name: "off",
            description: "[Anxienty] Desativa a mensagem Dm",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "servidor",
                description: "Qual o ID do servidor?",
                type: Discord.ApplicationCommandOptionType.String,
                min_length: 18,
                max_length: 20,
                required: true,
            }],
        }],
    }],
    run: async (client, interaction) => {
        let ids = ["461618792464646145", "1027989059198537728"];
        if (ids.includes(interaction.user.id) !== true) return interaction.reply({ content: ":x: Esse comando só deve ser utilizado por **mika** ou **danger**!", ephemeral: true });
        if (interaction.options.getSubcommand() === 'set') {
            const guilddb = await client.gd.findById({ _id: interaction.guild.id, });
            if (!guilddb) return message.reply({ content: "Servidor não registrado." });
            const input = interaction.options.getString("mensagem");
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle("<:ModOnly:1106586713649840198> Sistema de Welcome |  Anxienty!")
                        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                        .setFooter({ text: "Anxienty todos os direitos reservados!", iconURL: `${client.user.displayAvatarURL()}` })
                        .setColor("#9b59b6")
                        .setDescription(`\> <:Check:1106590979529637938> O servidor \`${interaction.guild.name}\` foi adicionado ao nosso programa de div.`)
                        .setTimestamp()
                ], components: [
                    new Discord.ActionRowBuilder().addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId("wpv")
                            .setLabel("Testar a mensagem!")
                            .setEmoji("<:FlowerPurple:1109899097655222272>")
                            .setStyle(Discord.ButtonStyle.Primary)
                            .setDisabled(false)
                    )
                ], ephemeral: true
            }).then((int) => {
                const coletou = int.createMessageComponentCollector({ time: 36000 });
                coletou.on("collect", async (i) => {
                    await i.deferUpdate();
                    if (i.user.id !== interaction.user.id) return;
                    coletou.stop();
                    if (i.customId === "wpv") {
                        try {
                            await interaction.member.send({ content: `✅ | **Anxienty todos os direitos reservados!**\n\n${input}` });
                        } catch (err) {
                            return interaction.channel.send({ content: `🧐 Erro! Seu privado tá fechado?` });
                        }
                        i.followUp({ content: `:kissing_heart: **Prontinho**! Confira seu privado!`, ephemeral: true });
                    }
                });
            });
            client.channels.cache.get("1110229810694865076").send({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
                        .setColor("#9b59b6")
                        .setDescription(`\> <:d_newmembers:1106397642252099594> O mod ${interaction.user} setou a **mensagem de DM** no servidor \`${interaction.guild.name} - (${interaction.guild.id})\`.`)
                        .setFooter({ text: "Anxienty todos os direitos reservados!", iconURL: `${client.user.displayAvatarURL()}` })
                        .setTimestamp()
                ]
            });
            await client.gd.updateOne({ _id: interaction.guild.id, }, { $set: { "g.dmWelcome.status": true, "g.dmWelcome.content": input, } });
        } else if (interaction.options.getSubcommand() === 'off') {
            const input2 = interaction.options.getString("servidor");
            const guild = await client.guilds.cache.get(input2);
            if (!guild) return interaction.reply({ content: ":x: Você não informou o Id de um servidor!", ephemeral: true });
            const guilddb = await client.gd.findById({ _id: guild.id, });
            if (!guilddb) return message.reply({ content: "Servidor não registrado." });
            if (guilddb.g.dmWelcome.status === true) return message.reply({ content: "Servidor já possui o sistema desativado." });
            interaction.reply({ content: `:kissing_heart: **Prontinho**! A mensagem foi desativada!`, ephemeral: true });
            client.channels.cache.get("1110229810694865076").send({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
                        .setColor("#9b59b6")
                        .setDescription(`\> <:d_newmembers:1106397642252099594> O mod ${interaction.user} desativou a **mensagem de DM** no servidor \`${interaction.guild.name} - (${interaction.guild.id})\`.`)
                        .setFooter({ text: "Anxienty todos os direitos reservados!", iconURL: `${client.user.displayAvatarURL()}` })
                        .setTimestamp()
                ]
            });
            await client.gd.updateOne({ _id: guild.id, }, { $set: { "g.dmWelcome.status": false, } });
        }

    }
}
