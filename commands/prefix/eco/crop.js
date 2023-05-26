const Discord = require("discord.js");
module.exports = {
    name: "crop",
    aliases: ["colher", "safra"],
    run: async (client, message, args) => {
        const userdb = await client.db.findById({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**a.registrar**.` });
        if (userdb.eco.farm.owner !== true) return message.reply({ content: `Você não possue uma fazenda, compre utilizando o comando: \n**a.loja**.` });
        message.reply({
            content: `<:FlowerYellow:1085226520710234152> __**Sua fazenda**__!\n\n:potato: \`Platação de Batata\`: ${userdb.eco.farm.seeds.batata.count >= 1 ? `\n\> Lotes: [${userdb.eco.farm.seeds.batata.count}]\n\> Colher: ${Date.now() < userdb.eco.farm.seeds.batata.cooldown ? `<:Battery_Yellow:1089745568122818680> <t:${~~(userdb.eco.farm.seeds.batata.cooldown / 1000)}:R>` : "<:Battery_Green:1089745543963623524> | Colete agora!"}` : "Lote vazio!"}`
        });
    }
}