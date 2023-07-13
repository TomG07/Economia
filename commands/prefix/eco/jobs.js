const Discord = require("discord.js");
const jobs = require("../../../util/jobs.json");
module.exports = {
    name: "jobs",
    aliases: ["empregos"],
    run: async (client, message, args, prrfix) => {
        await message.channel.sendTyping();
        let p = prefix || "ny!";
        const userdb = await client.db.findById({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**${p}registrar**.` });
        const empregos = Object.entries(jobs);
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
                    .setTitle("Painel de Empregos!")
                    .setDescription(`${empregos.map(([key, value]) => {
                        return `\> <:Inventario:1128316648223412284> **Emprego ${key}**\nSalário: \`${value.salario} magias.\`\nRequisito: \`${value.exp}XP! de experiência.\` `
                    }).join("\n")}`)
                    .setColor("#2a2d30")
                    .addFields({
                        name: `<:Emoji_GraficoSubiu:1116338129377448016> Experiência:`,
                        value: `Você tem **__${userdb.eco.xp}XP__**!`
                    })
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            ], components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId("jobs")
                        .setPlaceholder("Escolha um emprego")
                        .setMaxValues(1)
                        .setMinValues(1)
                        .addOptions(empregos.map(([key, value]) => {
                            return new Discord.StringSelectMenuOptionBuilder()
                                .setLabel(`Emprego de ${key}`)
                                .setDescription(`Requer ${value.exp}XP! de experiência.`)
                                .setEmoji("<:join:1108748868310540299>")
                                .setValue(`${key}-${value.exp}-${value.salario}`)
                        }))
                )]
        }).then((int) => {
            const coletou = int.createMessageComponentCollector({ time: 36000 });
            coletou.on("collect", async (i) => {
                await i.deferUpdate();
                if (i.user.id !== message.author.id) return i.followUp({ content: `:x: Não é o usuário que executou o comando!`, ephemeral: true });
                if (i.customId === "jobs") {
                    let x = i.values[0];
                    if (userdb.eco.xp < x.split("-")[1]) return i.followUp({ content: `${i.user}, Você não tem **${x.split("-")[1]} de experiêcia**! Continue realizando suas tarefas para conseguir mais xp.`, ephemeral: true });
                    if (userdb.eco.job === x.split("-")[0]) return i.followUp({ content: `${i.user}, Você já se encontra nesse emprego!`, ephemeral: true });
                    if (userdb.eco.job !== null) {
                        await client.db.updateOne({ _id: i.user.id }, { $set: { "eco.job": x.split("-")[0], }, });
                        i.followUp({ content: `${i.user}, Você foi contradado como **${x.split("-")[0]}** e agora seu salário é de **${x.split("-")[2]} magias.**`, ephemeral: false });
                    } else {
                        await client.db.updateOne({ _id: i.user.id }, { $set: { "eco.job": x.split("-")[0], }, $push: { "eco.badges": "STAFF", }, });
                        i.followUp({ content: `${i.user}, Você foi contradado como **${x.split("-")[0]}** e agora seu salário é de **${x.split("-")[2]} magias** e você resgatou um novo emblema (<:Inventario:1128316648223412284>) em seu perfil! Veja utilizando o comando:\n\`${p}perfil\``, ephemeral: false });
                    }
                }
            });
        });
    }
}
