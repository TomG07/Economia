const Discord = require("discord.js");
module.exports = {
  name: "removercoins",
  aliases: ["removermagias", "rmvmagias"],
  run: async (client, message, args, prefix) => {
    let p = prefix || "ny!";
    let member = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.id === args[0]);
    if (!member) return message.reply({ content: `${message.author}, Você não informou quem será editado!` });
    if (member.user.bot) return message.reply({ content: `${message.author}, Os bots não podem ser editados!` });
    const editores = await client.db.findOne({ userId: `${message.guild.id}-${message.author.id}` });
    if (!editores) return message.reply({ content: `${message.author}, Você deve fazer o registro com o comando:\n**${p}registrar**.` })
    if (editores.guild.editor !== true) return message.reply({ content: `${message.author}, Você não é um editor desse servidor!` });
    const userdb = await client.db.findOne({ userId: `${message.guild.id}-${member.user.id}` });
    if (!userdb) return message.reply({ content: `${message.author.id !== member.user.id ? `${message.author}, Esse jogador **__${member.user.username}__**` : `${message.author}, Você`} deve fazer o registro com o comando:\n**${p}registrar**.` })
    let quantia = args[0]; // para facilitarmos e não ficar usando args[0]
    if (!quantia) return message.reply({ content: `${message.author}, Digite uma quantia para ser retirada!` }); // caso o usuário não escreva um número  
    if (isNaN(quantia)) return message.reply({ content: `${message.author}, Você não definiu uma quantia válida! Exemplo: ${p}removermagias \`valor\` \`@user\`.` });  // Se o usuario não colocar um numero ele tornará esta mensagem
    let soma = Math.floor(userdb.eco.coins - valor);
    if (quantia < 1 || soma < 1) return message.reply({ content: `${message.author}, Valor inválido por ser menor que um ou negativar o jogador!` });
    message.reply({ content: `✅ **|** ${message.author}, Você editou os valores pra "**__${member.user.username}__**" com sucesso.` });
  }
}
