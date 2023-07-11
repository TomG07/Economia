const Discord = require("discord.js");
module.exports = {
   name: "cd",
   aliases: ["recargas", "tempos", "intervalos", "tempo"],
   run: async (client, message, args) => {
      const userdb = await client.db.findOne({ _id: message.author.id });
      if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**ny!registrar**.` });
      let timers = userdb.eco.timers;
      message.reply({
         embeds: [
            new Discord.EmbedBuilder()
               .setTitle("Intervalos!")
               .setThumbnail(message.author.displayAvatarURL({ dunamic: true }))
               .setTimestamp()
               .setColor("#303136")
               .setDescription(`- **Daily**: ${Date.now() < timers.dailyCooldown ? `<:cooldown:1118919475442487316> | <t:${~~(timers.dailyCooldown / 1000)}:R>` : "<:Check:1118513881107660923> Colete agora!"}\n- **Work**: ${Date.now() < timers.workCooldown ? `<:cooldown:1118919475442487316> | <t:${~~(timers.workCooldown / 1000)}:R>` : "<:Check:1118513881107660923> Colete agora!"}\n- **GF**: ${Date.now() < timers.gfCooldown ? `<:cooldown:1118919475442487316> | <t:${~~(timers.gfCooldown / 1000)}:R>` : "<:Check:1118513881107660923> Colete agora!"}\n- **Rep**: ${Date.now() < timers.repCooldown ? `<:cooldown:1118919475442487316> | <t:${~~(timers.repCooldown / 1000)}:R>` : "<:Check:1118513881107660923> Colete agora!"}`)
         ]
      });
   }
}
