const Discord = require("discord.js");
module.exports = {
  name: "verify",
  run: async(client, message, args) => {
    const create = new client.db({ _id: message.author.id });
    await create.save();
    message.reply({ content: `${message.author}, uma conta foi criada para vc e agora já podes desfrutar dos meus comandos.` });
  }
}
