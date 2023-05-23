const Discord = require("discord.js");
const fs = require("fs");
module.exports = async (client) => {
    const SlashsArray = [];
    fs.readdir(`./commands/slash`, (error, folder) => {
        folder.forEach(subfolder => {
            fs.readdir(`./commands/slash/${subfolder}/`, (error, files) => {
                files.forEach((files) => {
                    if (!files?.endsWith('.js')) return;
                    files = require(`../commands/slash/${subfolder}/${files}`);
                    if (!files?.name) return;
                    client.slashCommands.set(files?.name, files);
                    SlashsArray.push(files);
                });
            });
        });
    });
    client.once(Discord.Events.ClientReady, async () => {
        await client.application.commands.set(SlashsArray);
    });
};
