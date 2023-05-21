const Discord = require("discord.js");
module.exports = {
    name: "join",
    aliases: ["participar", "form", "entrar"],
    run: async (client, message, args) => {
        await message.channel.sendTyping();
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Participar da **Anxienty**!")
                    .setTimestamp()
                    .setDescription("\> **Requisitos:**\nTer mais de 150 membros.\nRetenção acima de 15%. (Membros online)\nEstar de acordo com nossas [ToS](https://discord.com/channels/1008736077625970780/1091444609093214341).")
                    .setColor("#9b59b6")
            ],
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("join")
                        .setLabel("Enviar meu servidor!")
                        .setEmoji("<:FlowerPurple:1109899097655222272>")
                        .setStyle(Discord.ButtonStyle.Primary)
                        .setDisabled(message.author.id !== "1027989059198537728")
                )]
        }).then((int) => {
            const coletou = int.createMessageComponentCollector({ time: 36000 });
            coletou.on("collect", async (i) => {
                // await i.deferUpdate();
                if (i.customId === "join") {
                    if (i.user.id !== message.author.id) return;
                    //i.followUp({ content: "Isso não é seu!", ephemeral: true })
                    const modal = new Discord.ModalBuilder()
                        .setCustomId('myModal')
                        .setTitle('Enviar seu servidor');
                    const linkInput = new Discord.TextInputBuilder()
                        .setCustomId('inviteinput')
                        .setLabel("Informe seu convite")
                        .setMaxLength(25)
                        .setMinLength(10)
                        .setStyle(Discord.TextInputStyle.Short)
                        .setRequired(true);
                    const submit = new Discord.ActionRowBuilder().addComponents(linkInput);
                    modal.addComponents(submit);
                    await i.showModal(modal);
                    const cModalInput = await i.awaitModalSubmit({ time: 70000, filter: (i) => i.user.id === message.author.id }).catch(() => null);
                    if (!cModalInput) {
                        return;
                    } else {
                        const { fields } = cModalInput;
                        const text = fields.getTextInputValue("inviteinput");
                        cModalInput.reply({ content: `Sucesso!`, ephemeral: true });
                        client.channels.cache.get("1102545962565644328").send({
                            embeds: [
                                new Discord.EmbedBuilder()
                                    .setTitle("Nova solicitação!")
                                    .setTimestamp()
                                    .setColor("#9b59b6")
                                    .addFields({
                                        name: "Convite",
                                        value: `${text}`
                                    }, {
                                        name: "Servidor Nome",
                                        value: `${i.guild.name}`
                                    }, {
                                        name: "Servidor Id",
                                        value: `${i.guild.id}`
                                    }, {
                                        name: "Servidor População",
                                        value: `${i.guild.memberCount}`
                                    })
                            ]
                        })
                    }
                }
            });
        });
    }
}