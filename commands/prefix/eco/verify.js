const Discord = require("discord.js");
module.exports = {
  name: "verify",
  aliases: ["registrar", "verificar"],
  run: async (client, message, args) => {
    let userdb = await client.db.findOne({ userId: `${message.guild.id}-${message.author.id}` });
    if (!userdb) {
      const create = new client.db({ userId: `${message.guild.id}-${message.author.id}` });
      await create.save();
      return message.reply({ content: `${message.author}, uma conta local foi criada para vc nesse servidor e agora já podes desfrutar dos meus comandos.` });
    } else {
      return message.reply({ content: `${message.author}, Você já tem uma conta registrada nesse servidor.` });
    }
  }
}
