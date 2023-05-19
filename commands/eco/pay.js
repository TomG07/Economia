const Discord = require("discord.js");
module.exports = {
  name: "pay",
  aliases: ["pagar"],
    run: async(client, message, args) => {
      let member = message.mentions.members.first();
      if (!member) return;
      let value = args.slice(1.2).join(" ");
      
      
  }
}
