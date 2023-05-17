const Discord = require("discord.js");
module.exports = {
  name: "verify",
  aliases: ["registrar", "verificar"],
  run: async (client, message, args) => {
    let userdb = client.db.findById({ _id: message.author.id });
    if (!userdb) {
      const create = new client.db({ _id: message.author.id });
      await create.save();
      return message.reply({ content: `${message.author}, uma conta foi criada para vc e agora já podes desfrutar dos meus comandos.` });
    } else if (userdb) {
      return message.reply({ content: `${message.author}, Você já está registrado em uma conta.` });
    }
  }
}
