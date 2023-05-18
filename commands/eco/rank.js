const Discord = require("discord.js");
module.exports = {
  name: "rank",
  aliases: ["ranking", "top"],
  run: async(client, message, args) => {
     let top = await client.db.find({}).sort({ "eco.coins": -1 });
     let content = "";
     for (let i = 0; i <= 3; i++) {
       let user = await client.users.fetch(`${top[i].^
                   
                                           
                                           
                                           
                                }`);
     }
  }
}
