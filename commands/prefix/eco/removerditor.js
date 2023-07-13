const Discord = require("discord.js");
module.exports = {
  name: "removereditor",
  aliases: ["removeredit", "reditor"],
  run: async(client, message, args, prefix) => {
    let p = prefix || "ny!";
    if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) return message.reply({ content: `${message.author}, Você não tem a permissão necessária: \`Gerenciar Servidor\`` });
    let member = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.id === args[0]);
    if (!member) return message.reply({ content: `${message.author}, Você deve mencionar quem vai ser removido como editor nesse servidor!` });
    if (member.user.bot) return message.reply({ content: `${message.author}, Os bots não podem ser removidos/adicionados aos editores!` });
    const userdb = await client.db.findOne({ userId: `${message.guild.id}-${member.user.id}` });
    if (!userdb) return message.reply({ content: `${message.author.id !== member.user.id ? `${message.author}, Esse jogador **__${member.user.username}__**` : `${message.author}, Você`} deve fazer o registro com o comando:\n**${p}registrar**.` })
    if (userdb.guild.editor !== true) return message.reply({ content: `${message.author}, O jogador mencionado(a) não é um editor(a) desse servidor!` });
    message.reply({ content: `✅ **|** ${message.author}, Você removeu ${member} da lista dos editores desse servidor com sucesso.` });    
    await client.db.updateOne({ userId: `${message.guild.id}-${member.user.id}` }, { $set: { "guild.editor": false }, });
  }
}
