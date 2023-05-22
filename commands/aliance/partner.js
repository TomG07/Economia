const Discord = require("discord.js");
module.exports = {
    name: "partner",
    aliases: ["parceiro", "aliado"],
    run: async (client, message, args) => {
        await message.channel.sendTyping();
        let ids = ["461618792464646145", "1027989059198537728"];
        if (ids.includes(message.author.id) !== true) return message.reply({ content: ":x: Esse comando só deve ser utilizado por **mika** ou **danger**!" });
        const guild = await client.guilds.cache.get(args[0]);
        const guilddb = await client.gd.findById({ _id: guild.id, });
        if (!guilddb) {
            const create = new client.gd({ _id: i.guild.id });
            await create.save();
            guilddb = await client.gd.findById({ _id: guild.id, });
        }
        // if (guild.g.partner === true) return message.reply({ content: ":x: Esse comando só deve ser utilizado por **mika** ou **danger**!" });

    }
}