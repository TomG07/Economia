const Discord = require("discord.js");
const Canvas = require("canvas");
Canvas.registerFont("assets/fonts/SourceCodePro-VariableFont_wght.ttf", { family: "Source Code Pro", });
Canvas.registerFont("assets/fonts/Rubik-VariableFont_wght.ttf", { family: "Rubik", });
const { fillTextWithTwemoji } = require("node-canvas-with-twemoji-and-discord-emoji")
module.exports = {
  name: "profile",
  aliases: ["perfil"],
  run: async (client, message, args) => {
    await message.channel.sendTyping();
    let member = message.mentions.members.first() || message.member;
    const userdb = await client.db.findById({ _id: member.user.id });
    if (!userdb) return message.reply({ content: `Esse jogador **${member.user.username}** não utilizou o \n**a.registrar**.` })
    const canvas = Canvas.createCanvas(800, 600);
    const context = canvas.getContext("2d");
    //avatar
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ extension: 'jpg', size: 4096 }));
    context.drawImage(avatar, 10, 274, 190, 190);
    //BG
    let bg = "https://media.discordapp.net/attachments/1062929961754841180/1111678590258520124/1685115140862.png";
    if (member.user.id === "1014244324772413462") bg = "https://media.discordapp.net/attachments/1062929961754841180/1112077966705442836/1685210382326.png";
    const background = await Canvas.loadImage(bg);
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    //name
    context.font = '500 34px "Rubik"';
    context.fillStyle = "#ffffff";
    context.fillText(member.user.username, 220, 401);
    //badges
    let list = [];
    if (member.user.id === "1027989059198537728" || member.user.id === "461618792464646145") list.push("DEV");
    if (member.user.id === "1027989059198537728" || member.user.id === "461618792464646145") list.push("HYPE");
    if (member.user.id === "1027989059198537728" || member.user.id === "461618792464646145" || member.user.id === "1014244324772413462") list.push("APOIADOR");
    if (userdb.eco.marry.userId !== null) list.push("MARRY");
    if (userdb.eco.job !== null) list.push("STAFF");
    if (list.length >= 1) {
      list = list.join(",")
        .replace("DEV", "<:developeractivo:1104003870180528179>")
        .replace("MARRY", "<:AnelCasal:1109190514009452615>")
        .replace("STAFF", "<:Staff:1107072021231317193>")
        .replace("HYPE", "<:Badge_HypeSquad_Events:1110898364192665631>")
        .replace("APOIADOR", "<:Badge_Early_Supporter:1110898281875251200>");
      context.font = '500 30px "Rubik"';
      await fillTextWithTwemoji(context, list.split(",").join(" "), 223, 438);
    }
    //coins
    context.font = '400 25px "Rubik"';
    context.fillStyle = "#ffffff";
    await fillTextWithTwemoji(context, `<:Stars:1111647398188564510> ${abreviar(userdb.eco.coins)}`, 600, 520);
    //about
    context.font = '500 23px "Rubik"';
    context.fillStyle = "#ffffff";
    context.fillText("Anxienty realizando sonhos!", 15, 510);
    //attachment  
    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "profile.png" });
    message.reply({ files: [attachment] });
  }
}
function abreviar(number, precision = 2) {
  return number.toLocaleString("en-US", {
    notation: "compact",
    maximumFractionDigits: precision,
  });
}


