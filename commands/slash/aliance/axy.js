const Discord = require("discord.js");
module.exports = {
    name: "axy",
    description: "[Anxienty] Defina a mensagem Dm",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [{
        name: "set",
        description: "[Anxienty] Defina a mensagem Dm",
        type: Discord.ApplicationCommandOptionType.SubcommandGroup,
        options: [{
            name: "div",
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
        }],
    }],
    run: async (client, interaction) => {
        const input = interaction.options.getString("mensagem");
        let ids = ["461618792464646145", "1027989059198537728"];
        if (ids.includes(interaction.user.id) !== true) return interaction.reply({ content: ":x: Esse comando só deve ser utilizado por **mika** ou **danger**!", ephemeral: true });
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
                        .setDisabled(true)
                )
            ], ephemeral: true
        }).then((int) => {
            const coletou = int.createMessageComponentCollector({ time: 36000 });
            coletou.on("collect", async (i) => {
                await i.deferUpdate();
                if (i.user.id !== interaction.user.id) return;
                coletou.stop();
                if (i.customId === "wpv") {
                    i.followUp({ content: `:kissing_heart: **Prontinho**! Confira seu privado!`, ephemeral: true });
                }
            });
        });
        client.channels.cache.get("1110229810694865076").send({
            embeds: [
                new Discord.EmbedBuilder()
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
                    .setColor("#9b59b6")
                    .setDescription(`\> <:Editar:1105250558509596722> O mod ${interaction.user} setou a **mensagem de DM** no servidor \`${interaction.guild.name} - (${interaction.guild.id})\`.`)
                    .setFooter({ text: "Anxienty todos os direitos reservados!", iconURL: `${client.user.displayAvatarURL()}` })
                    .setTimestamp()
            ]
        });
    }
}