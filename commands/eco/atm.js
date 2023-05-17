const Discord = require("discord.js");
module.exports = {
    name: "atm",
    run: async (client, message, args) => {
        let member = message.mentions.members.first() || message.member;
        //const userdb = await client.userdb.findById({ _id: member.user.id });
        // if (!userdb) return message.reply({ content: `Esse jogador não coletou o daily.` })
        let coins = 0;//userdb.profile.coins;
        let xp = 0;
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
                    .setTitle("Saldo do jogador")
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor("#303136")
                    .addFields({
                        name: ":gem: Carteira",
                        value: `**${coins}** diamantes.`
                    }, {
                        name: ":star: Experiência",
                        value: `**${xp}**XP!`
                    }, {
                        name: ":ring: Estado Civil",
                        value: `Solteiro(a)`
                    })
            ]
        });
    }
}