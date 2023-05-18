const Discord = require("discord.js");
const client = require("../../index");
module.exports = {
    name: Discord.Events.MessageCreate,
    once: false,
    async execute(message) {
        if (!message.guild) return;
        if (message.author.bot) return;
        if (message.content == `<!@${client.user.id}>` || message.content == `<@${client.user.id}>`) return message.reply({
            content: `${message.author}, Olá meu prefix é \`++\`, utilize \`++help\` para mostrar minha lista de comandos.`
        });     
    }
}
