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
        message.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Corrida concluído!")
                    .setDescription(`${message.author}, ganhou <:Stars:1111647398188564510> **${coins} bits** + <:Exp:1111648750864171154> '1XP!' de experiência ao fazer picos de motorista de aplicativo.`)
                    .setColor("#303136")
                    .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
            ],
            components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("car")
                        .setLabel("Volte em 1 hora!")
                        .setEmoji("<:FlowerPurple:1109899097655222272>")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(true)
                )
            ]
        });
        await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": coins, "eco.xp": 1, }, $set: { "eco.timers.uberCooldown": Date.now() + 3600000, }, });
    }
}
