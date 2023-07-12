const Discord = require("discord.js");
module.exports = {
  name: "pay",
  aliases: ["pagar", "transferir"],
  run: async (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.id === args[0]);
    if (!member) return message.reply({ content: `${message.author}, Você deve mencionar o usuário que vai receber o pagamento.` });
    if (member.user.bot) return message.reply({ content: `${message.author}, Os bots não recebem pagamentos.` });
    if (member.user.id === message.author.id) return message.reply({ content: `${message.author}, Você não pode pagar a si mesmo.` });
    const userdb = await client.db.findOne({ _id: message.author.id });
    if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**ny!registrar**.` });
    const twouserdb = await client.db.findOne({ _id: member.user.id });
    if (!twouserdb) return message.reply({ content: `${message.author}, Esse jogador **__${member.user.username}__** deve fazer o registro com o comando:\n**ny!registrar**.` })
    let value = args.slice(1).join(" ");
    if (!value) return message.reply({ content: `${message.author}, Você não informou a quantia do pagamento!` });
    if (isNaN(value)) return message.reply({ content: `${message.author}, Somente números devem ser considerados na quantia do pagamento.` });
    if (value < 100) return message.reply({ content: `${message.author}, Você só pode fazer pagamentos com quantias maiores que **100 euros**.` });
    if (value > 50000) return message.reply({ content: `${message.author}, Você só pode transferir quantias maiores que **50k euros** de uma vez só.` });
    if (userdb.eco.coins < value) return message.reply({ content: `${message.author}, Você não tem saldo suficiente!` });
    message.reply({
      content: `<:Stars:1111647398188564510> **|** ${message.author}, deseja transferir **${abreviar(value)} euros** para a sua conta, confimar?`,
      components: [
        new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("pay")
            .setLabel("Sim, aceitar")
            .setStyle(Discord.ButtonStyle.Success)
            .setDisabled(false)
        )]
    }).then((int) => {
      const coletou = int.createMessageComponentCollector({ time: 36000 });
      coletou.on('collect', async (i) => {
        await i.deferUpdate();
        if (i.customId === "pay") {
          coletou.stop();
          if (i.user.id !== member.user.id) return i.followUp({ content: `Essa decisão não cabe a vc.`, ephemeral: true });
          const checar = await client.db.findById({ _id: message.author.id });
          if (!checar) return message.reply({ content: `Esse jogador **${message.author.username}** não utilizou o \n**++registrar**.` });
          if (checar.eco.coins < value) return message.reply({ content: `Saldo insuficiente!` });
          int.edit({ content: `<:pix:1112785378135507094> ${i.user} aceitou a transferência de **<:Stars:1111647398188564510> ${abreviar(value)} bits** de ${message.author}.`, components: [] });
          await client.db.updateOne({ _id: i.user.id }, { $inc: { "eco.coins": value, }, });
          await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": -value, }, });
        }
      });
    });
  }
}
function abreviar(number, precision = 2) {
  return number.toLocaleString("en-US", {
    notation: "compact",
    maximumFractionDigits: precision,
  });
}
