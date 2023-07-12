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
      content += `__${i + 1}__. **${user.username}**` + `\n<:money:1119274556352385046> **Magias**: \`${top[i].eco.coins}\`` + "\n";
    }
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
          .setTitle("⭐ Ranking do mais ricos!")
          .setDescription(`${content}`)
          .setColor("#303136")
          .setTimestamp()
      ]
    });
  }
}
