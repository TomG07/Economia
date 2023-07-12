const Discord = require("discord.js");
const util = require("util");
module.exports = {
  name: "eval",
  aliases: ["test", "ev"],
  run: async(client, message,args) => {
    if (message.author.id != "1027989059198537728") return;
    const expression = args.join(" ");
    const resultEmbed = new Discord.EmbedBuilder();
    const inputEmbed = new Discord.EmbedBuilder();
    inputEmbed.setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
    inputEmbed.setTitle("Script:")
    inputEmbed.setColor("#303136");
    inputEmbed.setFooter({ text: "Tools 🌸", iconURL: `${client.user.displayAvatarURL()}` })
    await message.guild.members.fetch();
    inputEmbed.setDescription(`${Discord.codeBlock("js", expression)}`);
    try {
      code = await eval(expression);
      const result = util.inspect(code, { depth: 0 });
      if (result.length > 4096) {
        resultEmbed.setTitle("Vish.. Deu errado! 😭");
        resultEmbed.setColor("#ff6347");
        resultEmbed.setDescription("\> O resultado ultrapassou o limite de **4096 caracteres**. *Por esse motivo não pode ser exibido.*");
      } else {
        resultEmbed.setTitle("📦 Saida:");
        resultEmbed.setColor("#303136");
        resultEmbed.setDescription(`${Discord.codeBlock("js", result)}`);
      }
      message.reply({
        embeds: [inputEmbed, resultEmbed]
      });
    } catch (err) {
      resultEmbed.setTitle("Vish.. Algo deu errado! 😭");
      resultEmbed.setColor("#ff6347")
      resultEmbed.setDescription(`${Discord.codeBlock("js", err)}`);
      message.reply({
        embeds: [inputEmbed, resultEmbed]
      });
    }
  }
}
