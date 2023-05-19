const Discord = require("discord.js");
module.exports = {
  name: "pay",
  aliases: ["pagar", "transferir"],
    run: async(client, message, args) => {
      let member = message.mentions.members.first();
      if (!member) return;
      let value = args.slice(1).join(" ");
      message.reply({ content: `deseja transferir **${value} diamantes**.` });
  }
}
