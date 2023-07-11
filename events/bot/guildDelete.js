const Discord = require("discord.js");
const client = require("../../index");
module.exports = {
    name: Discord.Events.GuildDelete,
    once: false,
    async execute(guild) {
        //code
    }
}
