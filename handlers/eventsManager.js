const Discord = require("discord.js");
const fs = require("fs");
module.exports = async (client) => {
    fs.readdir(`./events`, (error, folder) => {
        folder.forEach(subfolder => {
            fs.readdir(`./events/${subfolder}/`, (error, files) => {
                files.forEach((files) => {
                    if (!files?.endsWith('.js')) return;
                    files = require(`../events/${subfolder}/${files}`);
                    if (!files?.name) return;
                    if (files?.once) {
                        client.once(files?.name, (...args) => files?.execute(...args));
                    } else {
                        client.on(files?.name, (...args) => files?.execute(...args));
                    }
                });
            });
        });
    });
};
