const Discord = require("discord.js");
const client = require("../../index");
module.exports = {
    name: Discord.Events.GuildDelete,
    once: false,
    async execute(guild) {
        const dbguild = await client.gd.findById({ _id: guild.id, });
        if (!dbguild) return;
        await client.gd.findOneAndDelete({ _id: guild.id, });
    }
}
