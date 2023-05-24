const Discord = require("discord.js");
const client = require("../../index");
module.exports = {
    name: Discord.Events.GuildMemberAdd,
    once: false,
    async execute(member) {
        const guild = await client.gd.findById({ _id: member.guild.id, });
        if (!guild) return;
        if (guild.g.dmWelcome !== true) return;

    }
}
