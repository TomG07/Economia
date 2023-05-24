const Discord = require("discord.js");
const client = require("../../index");
module.exports = {
    name: Discord.Events.GuildDelete,
    once: false,
    async execute(guild) {
        const guild = await client.gd.findById({ _id: guild.id, });
        if (!guild) return;
        await client.gd.findOneAndDelete({ _id: guild.id, });
    }
}
