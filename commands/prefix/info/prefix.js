const Discord = require("discord.js");
module.exports = {
  name: "prefix",
  aliases: ["prefixo", "setprefix"],
  run: async (client, message, args) => {
    const newPrefix = args[0];
    if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) return message.reply({ content: `${message.author}, Você não tem a permissão necessária: \`Gerenciar Servidor\`` });
    if (!newPrefix) return message.reply({ content: `${message.author}, Você deve informar o novo prefixo!` });
    if (newPrefix.length < 1 || newPrefix.length > 3) return message.reply({ content: `${message.author}, Seu novo prefixo deve ter entre 1-3 caracteres.` });
    let guildData = await client.server.findOne({ guildId: message.guild.id });
    if (!guildData) {
      const create = new client.server({ guildId: message.guild.id });
      await create.save();
      guildData = await client.server.findOne({ guildId: message.guild.id });
    }
    message.reply({ content: `✅ **|** ${message.author}, Meu prefixo foi alterado para "\`${newPrefix}\`" nesse servidor!` });
    await client.server.updateOne({ guildId: message.guild.id }, { $set: { "config.prefix": newPrefix }, });
  }
}
