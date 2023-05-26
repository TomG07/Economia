const Discord = require("discord.js");
const client = require("../../index");
module.exports = {
    name: Discord.Events.GuildMemberAdd,
    once: false,
    async execute(member) {
        const dbguild = await client.gd.findById({ _id: member.guild.id, });
        if (!dbguild) return;
        if (dbguild.g.dmWelcome.status !== true) return;
        if (dbguild.g.dmWelcome.status === true) {
            member.send({ content: `${dbguild.g.dmWelcome.content}` }).catch(() => { return; })
        }
    }
}
