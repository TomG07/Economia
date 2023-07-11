const Discord = require("discord.js");
const ms = require("../../../util/ms");
const Canvas = require("canvas");
Canvas.registerFont("assets/fonts/SourceCodePro-VariableFont_wght.ttf", { family: "Source Code Pro", });
Canvas.registerFont("assets/fonts/Rubik-VariableFont_wght.ttf", { family: "Rubik", });
const wait = require('node:timers/promises').setTimeout;
module.exports = {
    name: "crop",
    aliases: ["colher", "safra"],
    run: async (client, message, args) => {
        const userdb = await client.db.findOne({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**ny!registrar**.` });
        if (userdb.eco.farm.owner !== true) return message.reply({ content: `${message.author}, Você não tem uma fazenda! Compre utilizando o comando: \n**ny!loja**.` });
        let timestampBatata = "Lote vazio!";
        if (userdb.eco.farm.seeds.batata.cooldown !== 0 && userdb.eco.farm.seeds.batata.count >= 1) {
            let check1 = userdb.eco.farm.seeds.batata.cooldown - Date.now();
            timestampBatata = `${Date.now() < userdb.eco.farm.seeds.batata.cooldown ? `${ms(check1).hours}h ${ms(check1).minutes}m ${ms(check1).seconds}s` : "Colher agora!"}`;
        }
        //trigo
        let timestampTrigo = "Lote vazio!";
        if (userdb.eco.farm.seeds.trigo.cooldown !== 0 && userdb.eco.farm.seeds.trigo.count >= 1) {
            let check2 = userdb.eco.farm.seeds.trigo.cooldown - Date.now();
            timestampTrigo = `${Date.now() < userdb.eco.farm.seeds.trigo.cooldown ? `${ms(check2).hours}h ${ms(check2).minutes}m ${ms(check2).seconds}s` : "Colher agora!"}`;
        }
        //milho
        let timestampMilho = "Lote vazio!";
        if (userdb.eco.farm.seeds.milho.cooldown !== 0 && userdb.eco.farm.seeds.milho.count >= 1) {
            let check3 = userdb.eco.farm.seeds.milho.cooldown - Date.now();
            timestampMilho = `${Date.now() < userdb.eco.farm.seeds.milho.cooldown ? `${ms(check3).hours}h ${ms(check3).minutes}m ${ms(check3).seconds}s` : "Colher agora!"}`;
        }
        // msg
        const msg = await message.reply('<a:carregando:1118129946158706708> Gerando terreno, aguarde..');
        await wait(4000);
        //create canvas
        const canvas = Canvas.createCanvas(800, 300);
        const ctx = canvas.getContext("2d");
        //avatar
        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ extension: 'jpg', size: 4096 }));
        ctx.drawImage(avatar, 60, 45, 207, 206);
        //template
        const template = await Canvas.loadImage("https://media.discordapp.net/attachments/1118956763656507393/1119752823182213160/IMG_20230617_191558.png");
        ctx.drawImage(template, 0, 0, canvas.width, canvas.height);
        //milho
        ctx.font = '500 19px "Rubik"';
        ctx.fillStyle = "#111";
        ctx.fillText(`${timestampMilho}`, 440, 102);
        //batata
        ctx.font = '500 19px "Rubik"';
        ctx.fillStyle = "#111";
        ctx.fillText(`${timestampBatata}`, 440, 167);
        //trigo
        ctx.font = '500 19px "Rubik"';
        ctx.fillStyle = "#111";
        ctx.fillText(`${timestampTrigo}`, 440, 243);
        //reply
        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: 'farms.png' });
        msg.edit({
            content: `${message.author}`,
            files: [attachment],
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("wgetbatata")
                        .setLabel("Colher")
                        .setEmoji("🥔")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(userdb.eco.farm.seeds.batata.count >= 1 && Date.now() > userdb.eco.farm.seeds.batata.cooldown ? false : true),
                    new Discord.ButtonBuilder()
                        .setCustomId("wgettrigo")
                        .setLabel("Colher")
                        .setEmoji("🌾")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(userdb.eco.farm.seeds.trigo.count >= 1 && Date.now() > userdb.eco.farm.seeds.trigo.cooldown ? false : true),
                    new Discord.ButtonBuilder()
                        .setCustomId("wgetmilho")
                        .setLabel("Colher")
                        .setEmoji("🌽")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(userdb.eco.farm.seeds.milho.count >= 1 && Date.now() > userdb.eco.farm.seeds.milho.cooldown ? false : true)
                )], fetchReply: true
        }).then((int) => {
            const coletou = int.createMessageComponentCollector({ time: 36000 });
            coletou.on('collect', async (i) => {
                await i.deferUpdate();
                if (i.customId === "wgetbatata") {
                    coletou.stop();
                    if (i.user.id !== message.author.id) return i.followUp({ content: `:x: Não é o usuário que executou o comando!`, ephemeral: true });
                    //if (checar.eco.coins < value) return message.reply({ content: `Saldo insuficiente!` });
                    let size = userdb.eco.farm.seeds.batata.count;
                    if (size <= 0) return;
                    int.edit({ content: `<:1_Correto:1079943018477523004> ${i.user}, Você colheu **${size} batatas** da sua fazenda.`, components: [] });
                    await client.db.updateOne({ _id: i.user.id }, { $inc: { "eco.coins": 2, "eco.farm.seeds.batata.count": -size, }, });
                } else if (i.customId === "wgettrigo") {
                    coletou.stop();
                    if (i.user.id !== message.author.id) return i.followUp({ content: `Essa decisão não cabe a vc!`, ephemeral: true });
                    //if (checar.eco.coins < value) return message.reply({ content: `Saldo insuficiente!` });
                    let size = userdb.eco.farm.seeds.trigo.count;
                    if (size <= 0) return;
                    int.edit({ content: `<:1_Correto:1079943018477523004> ${i.user}, Você colheu **${size} trigos** da sua fazenda.`, components: [] });
                    await client.db.updateOne({ _id: i.user.id }, { $inc: { "eco.coins": 2, "eco.farm.seeds.trigo.count": -size, }, });
                } else if (i.customId === "wgetmilho") {
                    coletou.stop();
                    if (i.user.id !== message.author.id) return i.followUp({ content: `Essa decisão não cabe a vc!`, ephemeral: true });
                    //if (checar.eco.coins < value) return message.reply({ content: `Saldo insuficiente!` });
                    let size = userdb.eco.farm.seeds.milho.count;
                    if (size <= 0) return;
                    int.edit({ content: `<:1_Correto:1079943018477523004> ${i.user}, Você colheu **${size} milhos** da sua fazenda.`, components: [] });
                    await client.db.updateOne({ _id: i.user.id }, { $inc: { "eco.coins": 2, "eco.farm.seeds.milho.count": -size, }, });
                }
            });
        });
    }
}
//aa 