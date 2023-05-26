const Discord = require("discord.js");
module.exports = {
   name: "cd",
   aliases: ["recargas"],
   run: async (client, message, args) => {
      const userdb = await client.db.findById({ _id: message.author.id });
      if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**a.registrar**.` });
      let timers = userdb.eco.timers;
      message.reply({
         embeds: [
            new Discord.EmbedBuilder()
               .setTitle("<:FlowerPurple:1109899097655222272> Tempo das suas coletas!")
               .setThumbnail(message.author.displayAvatarURL({ dunamic: true }))
               .setTimestamp()
               .setColor("#303136")
               .setDescription(`**daily**: ${Date.now() < timers.dailyCooldown ? `<:Battery_Yellow:1089745568122818680> <t:${~~(timers.dailyCooldown / 1000)}:R>` : "<:Battery_Green:1089745543963623524> | Colete agora!"}\n**work**: ${Date.now() < timers.workCooldown ? `<:Battery_Yellow:1089745568122818680> <t:${~~(timers.workCooldown / 1000)}:R>` : "<:Battery_Green:1089745543963623524> | Colete agora!"}\n**GF**: ${Date.now() < timers.gfCooldown ? `<:Battery_Yellow:1089745568122818680> <t:${~~(timers.gfCooldown / 1000)}:R>` : "<:Battery_Green:1089745543963623524> | Colete agora!"}`)
         ]
      });
   }
}
