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
      content += `#**${i + 1}**: ${user.username}` + `\n-Saldo: <:Stars:1111647398188564510> \`${top[i].eco.coins} bits\`` + "\n";
    }
    message.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
          .setTitle("⭐ Top mais rico dos Bits!")
          .setDescription(`${content}`)
          .setColor("#303136")
          .setTimestamp()
      ]
    });
  }
}
