const Discord = require("discord.js");
module.exports = {
    name: "atm",
    aliases: ["saldo", "carteira", "diamantes", "bal"],
    run: async (client, message, args) => {
        await message.channel.sendTyping();
        let member = message.mentions.members.first() || message.member;
        const userdb = await client.db.findById({ _id: member.user.id });
        if (!userdb) return message.reply({ content: `Esse jogador **${member.user.username}** não utilizou o \n**a.registrar**.` })
        let coins = 0;//userdb.profile.coins;
        let xp = 0;
        let placar = await client.db.find({}).sort({ "eco.coins": -1 });
        let seachUserRankPosition = placar.findIndex((x) => x._id === member.user.id) + 1;
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
                    .setTitle("Saldo do jogador!")
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor("#9b59b6")
                    .addFields({
                        name: "<:FusionCoins:1109901003572133994> BitsCard",
                        value: `**${abreviar(userdb.eco.coins)}** bits.`
                    }, {
                        name: "🏆 Posição no ranking",
                        value: `#️⃣${numberToEmojis(seachUserRankPosition)}`
                    }, {
                        name: "<:xp:1108743400410329138> Experiência",
                        value: `**${userdb.eco.xp}**XP!`
                    }, {
                        name: "<:AnelDiamante:1108746236657405983> Estado Civil",
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
