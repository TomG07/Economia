const Discord = require("discord.js");
module.exports = {
  name: "pay",
  aliases: ["pagar", "transferir"],
    run: async(client, message, args) => {
      let member = message.mentions.members.first();
      if (!member) return message.reply({ content: `Você deve mencionar o usuário que vai pagar.` });
      if (member.user.bot) return message.reply({ content: `Bots não recebem pagamentos.` });
      if (member.user.id === message.author.id) return message.reply({ content: `Não pode pagar a si mesmo.` });
      let value = args.slice(1).join(" ");
      if (!value) return message.reply({ content: `` });
      if (isNaN(value)) return message.reply({ content: `Somente números devem ser considerados na quantia do pagamento.` });
      if (value < 100) return message.reply({ content: `Você só pode fazer pagamentos com quantias maiores que **100 diamantes**.` });
      if (value > 50000) return message.reply({ content: `Você só pode transferir quantias maiores que **50k** de uma vez só.` });
      message.reply({ content: `<:diamantes:1109086535439110164> **|** ${message.author}, deseja transferir **${value} diamantes** para sua conta.` });
  }
}
