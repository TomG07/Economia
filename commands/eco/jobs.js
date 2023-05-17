const Discord = require("discord.js");
const jobs = require("../../util/jobs.json")
module.exports = {
    name: "jobs",
    run: async (client, message, args) => {
        const empregos = Object.entries(jobs);
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
                    .setTitle("Empregos!")
                    .setDescription(`${empregos.map(([key, value]) => {
                        return `\> :mortar_board: **Trabalhar de ${key}**\nSalário: \`${value.salario}\`\nRequisito: \`${value.exp}XP! de experiência.\` `
                    }).join("\n")}`)
                    .setColor("#303136")
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
                                .setEmoji("💰")
                                .setValue(`${key}`)
                        }))
                )]
        }).then((int) => {
            const coletou = int.createMessageComponentCollector({ time: 36000 });
            coletou.on("collect", async (i) => {
                await i.deferUpdate();
                if (i.user.id !== message.author.id) return;
                if (i.customId === "jobs") {
                    let x = i.values[0];
                    i.followUp({ content: `${x}`, ephemeral: false });
                }
            });
        });
    }
}