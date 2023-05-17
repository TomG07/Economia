const Discord = require("discord.js");
const fs = require("fs");
module.exports = async (client) => {
  fs.readdir(`./commands`, (error, folder) => {
    folder.forEach(subfolder => {
      fs.readdir(`./commands/${subfolder}/`, (error, files) => {
        files.forEach((files) => {
          if (!files?.endsWith('.js')) return;
          files = require(`../commands/${subfolder}/${files}`);
          if (!files?.name) return;
          client.commands.set(files?.name, files);
          if (files?.aliases && Array.isArray(files?.aliases)) {
              files?.aliases.forEach(x => client.aliases.set(x, files?.name))
           } 
        });
      });
    });
  });
};
