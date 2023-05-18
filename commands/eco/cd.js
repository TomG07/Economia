const Discord = require("discord.js");
module.exports = {
   name: "cd",
   aliases: ["recargas"],
   run: async (client, message, args) => {
      const userdb = await client.db.findById({ _id: message.author.id });
      if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**++registrar**.` });
      let timers = userdb.eco.timers;
      message.reply({
         embeds: [
            new Discord.EmbedBuilder()
               .setTitle("Tempo das suas coletas")
               .setThumbnail(message.author.displayAvatarURL({ dunamic: true }))
               .setTimestamp()
               .setColor("#303136")
               .setDescription(`**Daily**: ${Date.now() < timers.dailyCooldown ? `<:skipper_cooldown:1108750205202993162> <t:${~~(timers.dailyCooldown / 1000)}:R>` : "<:certo:1108750401764851752> | Colete agora!"}\n**Work**: ${Date.now() < timers.workCooldown ? `<:skipper_cooldown:1108750205202993162> <t:${~~(timers.workCooldown / 1000)}:R>` : "<:certo:1108750401764851752> | Colete agora!"}\n**GF**: ${Date.now() < timers.gfCooldown ? `<:skipper_cooldown:1108750205202993162> <t:${~~(timers.gfCooldown / 1000)}:R>` : "<:certo:1108750401764851752> | Colete agora!"}`)
         ]
      });
   }
}
