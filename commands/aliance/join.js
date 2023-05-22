const Discord = require("discord.js");
module.exports = {
    name: "join",
    aliases: ["participar", "form", "entrar"],
    run: async (client, message, args) => {
        await message.channel.sendTyping();
        if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) return message.reply({ content: `Você não tem a permissão: \`Gerenciar Servidor\`` });
        let guilddb = (await client.gd.findById({ _id: `${message.guild.id}`, })) || { g: { status: false, partner: false }, }
        if (message.guild.memberCount < 1 && guilddb.g.partner !== true) return message.reply({ content: ":x: Servidor não possui 150 membros!" });
        if (guilddb.g.status === true) return message.reply({ content: ":x: Servidor já registrado!" });
        const invite = await message.channel.createInvite({ maxUses: 0, maxAge: 0 }).catch(err => null);
        if (!invite) return message.reply({ content: ":x: Estou sem permissão de criar convite nesse canal!" });
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
                    int.edit({ components: [] });
                    coletou.stop();
                    //i.followUp({ content: "Isso não é seu!", ephemeral: true })
                    const modal = new Discord.ModalBuilder()
                        .setCustomId('myModal')
                        .setTitle('Enviar seu servidor');
                    const linkInput = new Discord.TextInputBuilder()
                        .setCustomId('inviteinput')
                        .setLabel("Digite CONFIRMAR no campo abaixo!")
                        .setMaxLength(9)
                        .setMinLength(9)
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
                        let fetchGuild;
                        cModalInput.reply({ content: `<:Check:1106590979529637938> Sucesso!`, ephemeral: true });
                        client.channels.cache.get("1102545962565644328").send({
                            embeds: [
                                new Discord.EmbedBuilder()
                                    .setAuthor({ name: `${i.user.username}`, iconURL: `${i.user.displayAvatarURL({ dynamic: true })}` })
                                    .setTitle("Nova solicitação!")
                                    .setTimestamp()
                                    .setThumbnail(i.guild.iconURL({ dynamic: true }) ? i.guild.iconURL({ dynamic: true }) : client.user.displayAvatarURL())
                                    .setColor("#9b59b6")
                                    .addFields({
                                        name: "<:a_sparklespurple:1105803277230153848> Convite",
                                        value: `${invite.code}`
                                    }, {
                                        name: "<:a_sparklespurple:1105803277230153848> Servidor Nome",
                                        value: `${i.guild.name}`
                                    }, {
                                        name: "<:a_sparklespurple:1105803277230153848> Servidor Id",
                                        value: `\`${i.guild.id}\``
                                    }, {
                                        name: "<:a_sparklespurple:1105803277230153848> Servidor População",
                                        value: `\`${i.guild.memberCount}\``
                                    })
                            ],
                            components: [
                                new Discord.ActionRowBuilder().addComponents(
                                    new Discord.ButtonBuilder()
                                        .setCustomId(`a-${i.guild.id}-${i.user.id}`)
                                        .setLabel("Aprovar!")
                                        .setEmoji("<:FlowerPurple:1109899097655222272>")
                                        .setStyle(Discord.ButtonStyle.Success)
                                        .setDisabled(true),
                                    new Discord.ButtonBuilder()
                                        .setCustomId(`r-${i.guild.id}-${i.user.id}`)
                                        .setLabel("Reprovar!")
                                        .setEmoji("<:FlowerPurple:1109899097655222272>")
                                        .setStyle(Discord.ButtonStyle.Danger)
                                        .setDisabled(false)
                                )]
                        });
                        const checkDocumentHas = await client.gd.findById({ _id: i.guild.id, })
                        if (!checkDocumentHas) {
                            const create = new client.gd({ _id: i.guild.id });
                            await create.save();
                        }
                        await client.gd.updateOne({ _id: i.guild.id, }, { $set: { "g.status": true, "g.repUser": i.user.id, "g.sendDate": Date.now(), } });
                        client.channels.cache.get("1109971281991970866").send({
                            embeds: [
                                new Discord.EmbedBuilder()
                                    .setAuthor({ name: `${i.user.username}`, iconURL: `${i.user.displayAvatarURL({ dynamic: true })}` })
                                    .setColor("#303136")
                                    .setDescription(`\> <:Editar:1105250558509596722> O usuário ${i.user} enviou o servidor \`${i.guild.name} - (${i.guild.id})\` para análise.`)
                                    .setTimestamp()
                            ]
                        });
                    }
                }
            });
        });
    }
}
