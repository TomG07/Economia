const Discord = require("discord.js");
module.exports = {
    name: "rep",
    aliases: ["reputação", "medalha", "curtir"],
    run: async (client, message, args) => {
        let member = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.id === args[0]);;
        if (!member) return message.reply({ content: `${message.author}, Você deve mencionar o usuário que vai receber essa reputação.` });
        if (member.user.bot) return message.reply({ content: `${message.author}, Bots não recebem reputações.` });
        if (member.user.id === message.author.id) return message.reply({ content: `${message.author}, Não pode dar uma reputação si mesmo.` });
        const userdb = await client.db.findOne({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**ny!registrar**.` });
        const twouserdb = await client.db.findOne({ _id: member.user.id });
        if (!twouserdb) return message.reply({ content: `${message.author}, Esse jogador **__${member.user.username}__** deve fazer o registro com o comando:\n**ny!registrar**.` })
        if (Date.now() < userdb.eco.timers.repCooldown) return message.reply({ content: `⏰ **|** ${message.author},Você se encontra em modo de recarga, tente novamente <t:${~~(userdb.eco.timers.repCooldown / 1000)}:R>.` });
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle(":star: Reputação!")
                    .setDescription(`${message.author}, você deu (+1) reputação para ${member} e agora ele(a) tem um total de **${Math.floor(twouserdb.eco.reps + 1)} reputações**.`)
                    .setColor("#303136")
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
            ]
        });
        await cliient.db.updateOne({ _id: member.user.id }, { $inc: { "eco.reps": 1 }, });
        await client.db.updateOne({ _id: message.author.id }, { $set: { "eco.timers.repCooldown": Date.now() + 7600000, }, });
    }
}
