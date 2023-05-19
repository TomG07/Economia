const Discord = require("discord.js");
const Canvas = require("canvas");
Canvas.registerFont("assets/fonts/SourceCodePro-VariableFont_wght.ttf", {
  family: "Source Code Pro",
});
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
     const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ extension: 'jpg', size: 4096 }));
     context.drawImage(avatar, 10, 274, 190, 190);
     //BG
     const background = await Canvas.loadImage("https://media.discordapp.net/attachments/1108841656729485393/1109096161568108574/1684499475063.png");
     context.drawImage(background, 0, 0, canvas.width, canvas.height);
     //name
     context.font = '500 30px "Source Code Pro"';
     context.fillStyle = "#ffffff";
     context.fillText(member.user.username, 220, 405);
     //badges
     let list = [];
     if (userdb.eco.marry.userId !== null) list.push("MARRY");
     if (list.length => 1) {
        context.font = '500 25px "Source Code Pro"';
        context.fillText(list.join(" "), 223, 432);
     }
     //attachment  
    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "profile.png" });
    message.reply({ files: [attachment] });
  }
}
