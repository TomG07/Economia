const Discord = require("discord.js");
module.exports = {
    name: "crop",
    aliases: ["colher", "safra"],
    run: async (client, message, args) => {
        const userdb = await client.db.findById({ _id: message.author.id });
        if (!userdb) return message.reply({ content: `Você não utilizou o comando: \n**a.registrar**.` });
        if (userdb.eco.farm.owner !== true) return message.reply({ content: `Você não possue uma fazenda, compre utilizando o comando: \n**a.loja**.` });
        let db = [];
        userdb.eco.farm.seeds.toArray().forEach((x) => {
            db.push(x);
        });
        message.reply({ content: `${db}` })
    }
}