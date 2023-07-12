const Discord = require("discord.js");
module.exports = {
  name: "rank",
  aliases: ["ranking", "top", "placar"],
  run: async (client, message, args) => {
    await message.channel.sendTyping();
    let top = await client.db.find({}).sort({ "eco.coins": -1 });
    let content = "";
    for (let i = 0; i <= 5; i++) {
      let user = await client.users.fetch(`${top[i]._id}`);
      content += `__${i + 1}__. **${user.username}**` + `\n<:Potion:1128800422220546168> **Magias**: \`${top[i].eco.coins}\`` + "\n";
    }
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
          .setTitle("⭐ Ranking do mais ricos!")
          .setDescription(`${content}`)
          .setColor("#2a2d30")
          .setTimestamp()
      ]
    });
  }
}
