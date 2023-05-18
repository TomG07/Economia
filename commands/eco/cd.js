const Discord = require("discord.js");
module.exports = {
   name: "cd",
   aliases: ["recargas"],
  run: async(client, message, args) => {
        const userdb = await client.db.findById({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**++registrar**.` });

       
  }
}
