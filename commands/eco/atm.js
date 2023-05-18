const Discord = require("discord.js");
module.exports = {
    name: "atm",
    aliases: ["saldo", "carteira", "diamantes"],
    run: async (client, message, args) => {
        let member = message.mentions.members.first() || message.member;
        const userdb = await client.db.findById({ _id: member.user.id });
        if (!userdb) return message.reply({ content: `Esse jogador **${member.user.username}** não utilizou o \n**++registrar**.` })
        let coins = 0;//userdb.profile.coins;
        let xp = 0;
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
                    .setTitle("Saldo do jogador!")
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor("#303136")
                    .addFields({
                        name: "<:diamante:1108743116778917958> Carteira",
                        value: `**${userdb.eco.coins}** diamantes.`
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
