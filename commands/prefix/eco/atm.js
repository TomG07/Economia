const Discord = require("discord.js");
module.exports = {
    name: "atm",
    aliases: ["saldo", "carteira", "diamantes", "bal"],
    run: async (client, message, args) => {
        await message.channel.sendTyping();
        let member = message.mentions.members.first() || message.member;
        const userdb = await client.db.findById({ _id: member.user.id });
        if (!userdb) return message.reply({ content: `${message.author.id !== member.user.id ? `${message.author}, Esse jogador **__${member.user.username}__**` : `${message.author}, Você`} deve fazer o registro com o comando:\n**ny!registrar**.` })
        let coins = 0;//userdb.profile.coins;
        let xp = 0;
        let placar = await client.db.find({}).sort({ "eco.coins": -1 });
        let seachUserRankPosition = placar.findIndex((x) => x._id === member.user.id) + 1;
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
                    .setTitle("Saldo do jogador!")
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor("#303136")
                    .addFields({
                        name: "<:money:1119274556352385046> Carteira:",
                        value: `${userdb.eco.coins > 1 ? `**${abreviar(userdb.eco.coins)}** euro(s).` : "Vazia!"}`
                    }, {
                        name: ":star: Reputações:",
                        value: `${userdb.eco.reps > 1 ? `${abreviar(userdb.eco.reps)} rep(s).` : "Nenhuma!"}`
                    }, {
                        name: "<:cards:1119298011105857641> Posição no Ranking:",
                        value: `#️⃣${numberToEmojis(seachUserRankPosition)}`
                    }, {
                        name: "<:Emoji_GraficoSubiu:1116338129377448016> Experiência:",
                        value: `**${userdb.eco.xp}**XP!`
                    }, {
                        name: "<:marryme:1118146499700850709> Estado Civil:",
                        value: `${userdb.eco.marry.userId ? `Casado(a) com <@${userdb.eco.marry.userId}> <t:${~~(userdb.eco.marry.marryDate / 1000)}:R>.` : "Solteiro(a)"}`
                    })
            ]
        });
    }
}
const numbers = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
function numberToEmojis(number) {
    let finalString = "";
    String(number).split("").forEach((number) => {
        finalString += " " + numbers[Number(number)];
    });
    return finalString;
};
function abreviar(number, precision = 2) {
    return number.toLocaleString("en-US", {
        notation: "compact",
        maximumFractionDigits: precision,
    });
}
