const Discord = require("discord.js");
const client = require("../../index");
module.exports = {
    name: Discord.Events.GuildMemberRemove,
    once: false,
    async execute(member) {
      const data = await client.db.findOne({ userId: `${member.guild.id}-${member.user.id}` });
      if (!data) return;
      await client.db.findOneAndDelete({ userId: `${member.guild.id}-${member.user.id}` });
    }
}
