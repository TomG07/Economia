const Discord = require("discord.js");
const jobs = require("../../../util/jobs.json");
module.exports = {
    name: "jobs",
    aliases: ["empregos"],
    run: async (client, message, args) => {
        await message.channel.sendTyping()
        const userdb = await client.db.findById({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**++registrar**.` });
        const empregos = Object.entries(jobs);
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
                    .setTitle("Painel de Empregos!")
                    .setDescription(`${empregos.map(([key, value]) => {
                        return `\> <:Staff:1107072021231317193> **Trabalhar de ${key}**\nSalário: \`${value.salario}\`\nRequisito: \`${value.exp}XP! de experiência.\` `
                    }).join("\n")}`)
                    .setColor("#9b59b6")
                    .addFields({
                        name: `<:xp:1108743400410329138> Atualmente sua experiência é:`,
                        value: `${userdb.eco.xp}XP!`
                    })
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            ], components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId("jobs")
                        .setPlaceholder("Selecione")
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
                if (i.user.id !== message.author.id) return;
                if (i.customId === "jobs") {
                    let x = i.values[0];
                    if (userdb.eco.xp < x.split("-")[1]) return i.followUp({ content: `${i.user}, Você não possui **${x.split("-")[1]} de experiêcia**, continue realizando suas tarefas para conseguir mais xp.`, ephemeral: true });
                    if (userdb.eco.job === x.split("-")[0]) return i.followUp({ content: `${i.user}, Você já se encontra nesse emprego.`, ephemeral: true });
                    if (userdb.eco.job !== null) {
                        await client.db.updateOne({ _id: i.user.id }, { $set: { "eco.job": x.split("-")[0], }, });
                        i.followUp({ content: `${i.user}, Você foi contradado como **${x.split("-")[0]}** e agora seu salário é de **${x.split("-")[2]} diamantes.**`, ephemeral: false });
                    } else {
                        await client.db.updateOne({ _id: i.user.id }, { $set: { "eco.job": x.split("-")[0], }, $push: { "eco.badges": "STAFF", }, });
                        i.followUp({ content: `${i.user}, Você foi contradado como **${x.split("-")[0]}** e agora seu salário é de **${x.split("-")[2]} diamantes** e você ganhou um novo emblema <:Staff:1107072021231317193>, utilize o comando:\n\`++perfil\``, ephemeral: false });
                    }
                }
            });
        });
    }
}