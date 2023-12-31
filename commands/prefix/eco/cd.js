const Discord = require("discord.js");
module.exports = {
   name: "cd",
   aliases: ["recargas", "tempos", "intervalos", "tempo", "cooldowns"],
   run: async (client, message, args, prefix) => {
      let p = prefix || "ny!";
      const userdb = await client.db.findOne({ userId: `${message.guild.id}-${message.author.id}` });
      if (!userdb) return message.reply({ content: `${message.author}, Você deve se registrar com o comando: \n**${p}registrar**.` });
      let timers = userdb.eco.timers;
      message.reply({
         embeds: [
            new Discord.EmbedBuilder()
               .setTitle("Tempos de Espera!")
               .setThumbnail(message.author.displayAvatarURL({ dunamic: true }))
               .setTimestamp()
               .setColor("#ffb6c1")
               .setDescription(`- **Daily**: ${Date.now() < timers.dailyCooldown ? `⚡ | <t:${~~(timers.dailyCooldown / 1000)}:R>` : "✅ | __Colete agora__!"}\n- **Work**: ${Date.now() < timers.workCooldown ? `⚡ | <t:${~~(timers.workCooldown / 1000)}:R>` : "✅ | __Colete agora__!"}\n- **Sapecar**: ${Date.now() < timers.gfCooldown ? `⚡ | <t:${~~(timers.gfCooldown / 1000)}:R>` : "✅ | __Colete agora__!"}\n- **Rep**: ${Date.now() < timers.repCooldown ? `⚡ | <t:${~~(timers.repCooldown / 1000)}:R>` : "✅ | __Colete agora__!"}`)
               .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
         ]
      });
   }
}
