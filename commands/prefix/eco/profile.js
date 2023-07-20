const Discord = require("discord.js");
const Canvas = require("canvas");
Canvas.registerFont("assets/fonts/SourceCodePro-VariableFont_wght.ttf", { family: "Source Code Pro", });
Canvas.registerFont("assets/fonts/RobotoCondensed-Bold.ttf", { family: "Rubik", });
const { fillTextWithTwemoji } = require("node-canvas-with-twemoji-and-discord-emoji")
module.exports = {
  name: "profile",
  aliases: ["perfil"],
  run: async (client, message, args) => {
    await message.channel.sendTyping();
    let member = message.mentions.members.first() || message.member;
    const userdb = await client.db.findOne({ userId: `${message.guild.id}-${member.user.id}` });
    if (!userdb) return message.reply({ content: `Esse jogador **${member.user.username}** não utilizou o \n**a.registrar**.` })
    const canvas = Canvas.createCanvas(800, 600);
    const context = canvas.getContext("2d");
    //avatar
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ extension: 'jpg', size: 4096 }));
    context.drawImage(avatar, 10, 274, 190, 190);
    // fundo
    let bg = "https://media.discordapp.net/attachments/1113783796668571658/1129784486041747556/images_1.jpg";
    const fundo = await Canvas.loadImage(bg);
    context.drawImage(fundo, 192, 0, 608, 377);
    // template
    const template = await Canvas.loadImage("https://media.discordapp.net/attachments/1113783796668571658/1129784473857314897/1689431637579.png");
    context.drawImage(template, 0, 0, canvas.width, canvas.height);
    //name
    context.font = '500 34px "RobotoCondensed-Bold"';
    context.fillStyle = "#000000";
    context.fillText(member.user.username, 220, 401);
    //badges
    let list = [];
    if (member.user.id === "1027989059198537728" || member.user.id === "461618792464646145") list.push("DEV");
    if (member.user.id === "1027989059198537728" || member.user.id === "461618792464646145") list.push("HYPE");
    if (member.user.id === "1027989059198537728" || member.user.id === "461618792464646145") list.push("PREMIUM");
    if (userdb.eco.marry.userId !== null) list.push("MARRY");
    if (userdb.eco.job !== null) list.push("STAFF");
    if (userdb.eco.farm.owner === true) list.push("FARM")
    if (userdb.guild.editor === true) list.push("EDITOR");
    if (list.length >= 1) {
      list = list.join(",")
        .replace("DEV", "<:developeractivo:1104003870180528179>")
        .replace("MARRY", "<:anel:1119285525984063509>")
        .replace("STAFF", "<:Inventario:1128316648223412284>")
        .replace("HYPE", "<:Police:1128771766702051408>")
        .replace("PREMIUM", "<:Premium:1128773466980630538>")
        .replace("FARM", "<:Fazenda:1118670191509913780>")
        .replace("EDITOR", "<:money:1119274556352385046>");
      context.font = '500 30px "Rubik"';
      await fillTextWithTwemoji(context, list.split(",").join(" "), 223, 438);
    }
    //coins
    context.font = '500 25px "RobotoCondensed-Bold"';
    context.fillStyle = "#292929";
    await fillTextWithTwemoji(context, `${abreviar(userdb.eco.coins)} magias.`, 518, 497);
    // reps
    context.font = '500 25px "RobotoCondensed-Bold"';
    context.fillStyle = "#ff6f9c";
    await fillTextWithTwemoji(context, `${userdb.eco.reps} reps.`, 555, 560);
    //about
    context.font = '500 23px "RobotoCondensed-Bold"';
    context.fillStyle = "#292929";
    context.fillText("Um mundo perfeito e divertido!", 15, 519);
    //attachment  
    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: "profile.png" });
    message.reply({ content: `${message.author}`, files: [attachment] });
  }
}
function abreviar(number, precision = 2) {
  return number.toLocaleString("en-US", {
    notation: "compact",
    maximumFractionDigits: precision,
  });
}


