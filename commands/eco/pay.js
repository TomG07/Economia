const Discord = require("discord.js");
module.exports = {
  name: "pay",
  aliases: ["pagar", "transferir"],
  run: async (client, message, args) => {
    let member = message.mentions.members.first();
    if (!member) return message.reply({ content: `Você deve mencionar o usuário que vai pagar.` });
    if (member.user.bot) return message.reply({ content: `Bots não recebem pagamentos.` });
    if (member.user.id === message.author.id) return message.reply({ content: `Não pode pagar a si mesmo.` });
    const userdb = await client.db.findById({ _id: message.author.id });
    if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**++registrar**.` });
    const twouserdb = await client.db.findById({ _id: member.user.id });
    if (!twouserdb) return message.reply({ content: `Esse jogador **${member.user.username}** não utilizou o \n**++registrar**.` })
    let value = args.slice(1).join(" ");
    if (!value) return message.reply({ content: `Quantia do pagamento não informada!` });
    if (isNaN(value)) return message.reply({ content: `Somente números devem ser considerados na quantia do pagamento.` });
    if (value < 100) return message.reply({ content: `Você só pode fazer pagamentos com quantias maiores que **100 diamantes**.` });
    if (value > 50000) return message.reply({ content: `Você só pode transferir quantias maiores que **50k** de uma vez só.` });
    if (userdb.eco.coins < value) return message.reply({ content: `Saldo insuficiente!` });
    message.reply({
      content: `<:diamantes:1109086535439110164> **|** ${message.author}, deseja transferir **${value} diamantes** para sua conta.`,
      components: [
        new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("pay")
            .setLabel("Sim, aceitar")
            .setStyle(Discord.ButtonStyle.Success)
            .setDisabled(true)
        )]
    }).then((int) => {
      const coletou = int.createMessageComponentCollector({ time: 36000 });
      coletou.on('collect', async (i) => {
        await i.deferUpdate();
        if (i.customId === "pay") {
          coletou.stop();
          if (i.user.id !== member.user.id) return i.followUp({ content: `Essa decisão não é sua!`, ephemeral: true });
          const checar = await client.db.findById({ _id: message.author.id });
          if (!checar) return message.reply({ content: `Esse jogador **${message.author.username}** não utilizou o \n**++registrar**.` });
          if (checar.eco.coins < value) return message.reply({ content: `Saldo insuficiente!` });
          int.edit({ content: `${i.user} aceitou a transferência de ${message.author}.`, components: [] });
          await client.db.updateOne({ _id: i.user.id }, { $inc: { "eco.coins": value, }, });
          await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": -value, }, });
        }
      })
    });
  }
}
