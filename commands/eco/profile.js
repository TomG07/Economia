const Discord = require("discord.js");
const Canvas = require("canvas");
module.exports = {
  name: "profile",
  aliases: ["perfil"],
  run: async(client, message, args) => {
  await message.channel.sendTyping();   
  let member = message.mentions.members.first() || message.member;
  const userdb = await client.db.findById({ _id: member.user.id });
  if (!userdb) return message.reply({ content: `Esse jogador **${member.user.username}** não utilizou o \n**++registrar**.` })
     const canvas = Canvas.createCanvas(800, 600);
     const context = canvas.getContext("2d");
    //avatar
     const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: "jpeg", size: 4096 }));
     context.drawImage(avatar, 10, 274, 190, 190);
    //BG
     const background = await Canvas.loadImage("https://media.discordapp.net/attachments/1108841656729485393/1108946387258835115/1684463768146.png");
     context.drawImage(background, 0, 0, canvas.width, canvas.height);
        
  }
}
