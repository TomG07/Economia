const Discord = require("discord.js");
const abreviar = require("../../../util/abrev");
module.exports = {
  name: "pay",
  aliases: ["pagar", "transferir"],
  run: async (client, message, args, prefix) => {
    let p = prefix || "ny!";
    let member = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.id === args[0]);
    if (!member) return message.reply({ content: `${message.author}, Você deve mencionar o usuário que vai receber o pagamento.` });
    if (member.user.bot) return message.reply({ content: `${message.author}, Os bots não recebem pagamentos.` });
    if (member.user.id === message.author.id) return message.reply({ content: `${message.author}, Você não pode pagar a si mesmo.` });
    const userdb = await client.db.findOne({ _id: message.author.id });
    if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**${p}registrar**.` });
    const twouserdb = await client.db.findOne({ _id: member.user.id });
    if (!twouserdb) return message.reply({ content: `${message.author}, Esse jogador **__${member.user.username}__** deve fazer o registro com o comando:\n**${p}registrar**.` })
    let value = args.slice(1).join(" ");
    if (!value) return message.reply({ content: `${message.author}, Você não informou a quantia do pagamento!` });
    if (isNaN(value)) return message.reply({ content: `${message.author}, Somente números devem ser considerados na quantia do pagamento.` });
    if (value < 100) return message.reply({ content: `${message.author}, Você só pode fazer pagamentos com quantias maiores que **100 euros**.` });
    if (value > 50000) return message.reply({ content: `${message.author}, Você só pode transferir quantias maiores que **50k euros** de uma vez só.` });
    if (userdb.eco.coins < value) return message.reply({ content: `${message.author}, Você não tem saldo suficiente!` });
    message.reply({
      content: `<:cooldown:1118919475442487316> **|** O usuário ${message.author}, deseja transferir **${abreviar(value)} euros** para a sua conta! ${member}, Você deseja confimar eesa transação?`,
      components: [
        new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("pay")
            .setLabel("Aceitar o pagamento")
            .setEmoji("✅")
            .setStyle(Discord.ButtonStyle.Primary)
            .setDisabled(false)
        )]
    }).then((int) => {
      const coletou = int.createMessageComponentCollector({ time: 86000 });
      coletou.on('collect', async (i) => {
        await i.deferUpdate();
        if (i.user.id !== member.user.id) return i.followUp({ content: `${i.user}, Essa decisão não é sua!`, ephemeral: true });
        if (i.customId === "pay") {
          coletou.stop();
          const checar = await client.db.findOne({ _id: message.author.id });
          if (!checar) return message.reply({ content: `${i.user}, Você não utilizou o \n**ny!registrar**.` });
          if (checar.eco.coins < value) return message.reply({ content: `${i.user}, Você não tem saldo suficiente!` });
          int.edit({ content: `<:money:1119274556352385046> **|** ${i.user} aceitou a transferência de **${abreviar(value)} euros** de ${message.author}.`, components: [] });
          await client.db.updateOne({ _id: i.user.id }, { $inc: { "eco.coins": value, }, });
          await client.db.updateOne({ _id: message.author.id }, { $inc: { "eco.coins": -value, }, });
        }
      });
    });
  }
}