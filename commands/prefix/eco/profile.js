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
    // fundo
    let bg = "https://media.discordapp.net/attachments/1113783795942961205/1128775403327193220/pxfuel.jpg";
    const fundo = await Canvas.loadImage(bg);
    context.drawImage(fundo, 192, 0, 608, 377);
    // template
    const template = await Canvas.loadImage("https://media.discordapp.net/attachments/1113783795942961206/1128767691067494501/1689189559756.png");
    context.drawImage(template, 0, 0, canvas.width, canvas.height);
    //name
    context.font = '500 34px "Rubik"';
    context.fillStyle = "#ffffff";
    context.fillText(member.user.username, 220, 401);
    //badges
    let list = [];
    if (member.user.id === "1027989059198537728" || member.user.id === "461618792464646145") list.push("DEV");
    if (member.user.id === "1027989059198537728" || member.user.id === "461618792464646145") list.push("HYPE");
    if (member.user.id === "1027989059198537728" || member.user.id === "461618792464646145") list.push("PREMIUM");
    if (userdb.eco.marry.userId !== null) list.push("MARRY");
    if (userdb.eco.job !== null) list.push("STAFF");
    if (list.length >= 1) {
      list = list.join(",")
        .replace("DEV", "<:developeractivo:1104003870180528179>")
        .replace("MARRY", "<:anel:1119285525984063509>")
        .replace("STAFF", "<:Police:1128771766702051408>")
        .replace("HYPE", "<:cookies_cookie:1117568133574705184>")
        .replace("PREMIUM", "<:Premium:1128773466980630538>");
      context.font = '500 30px "Rubik"';
      await fillTextWithTwemoji(context, list.split(",").join(" "), 223, 438);
    }
    //coins
    context.font = '400 25px "Rubik"';
    context.fillStyle = "#ffffff";
    await fillTextWithTwemoji(context, `${abreviar(userdb.eco.coins)} euros.`, 518, 497);
    // reps
    context.font = '400 25px "Rubik"';
    context.fillStyle = "#ffe4e1";
    await fillTextWithTwemoji(context, `${userdb.eco.reps} reps.`, 555, 560);
    //about
    context.font = '500 23px "Rubik"';
    context.fillStyle = "#ffffff";
    context.fillText("Um mundo perfeito e divertido!", 15, 510);
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


