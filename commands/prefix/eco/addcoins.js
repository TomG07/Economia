const Discord = require("discord.js");
module.exports = {
  name: "addcoins",
  aliases: ["addmagias", "setmagias"],
  run: async(client, message, args, prefix) => {
    let p = prefix || "ny!";
    let member = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.id === args[0]);
    if (!member) return message.reply({ content: `${message.author}, Você não informou quem será editado!` });
    if (member.user.bot) return message.reply({ content: `${message.author}, Os bots não podem ser editados!`});
    const userdb = await client.db.findOne({ userId: `${message.guild.id}-${member.user.id}` });
    if (!userdb) return message.reply({ content: `${message.author.id !== member.user.id ? `${message.author}, Esse jogador **__${member.user.username}__**` : `${message.author}, Você`} deve fazer o registro com o comando:\n**${p}registrar**.` })
        
  }
}
