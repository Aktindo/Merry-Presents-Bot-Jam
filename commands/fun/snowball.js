const { MessageAttachment } = require('discord.js');

module.exports = {
    description: 'Throw a snowball!',
    category: 'Fun',
    cooldown: '1s',
    callback: async (message) => {
        const Canvas = require('canvas')
        const canvas = Canvas.createCanvas(1920, 1440);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/783582511220785162/783711902487412756/kermit-601710_1920.jpg')
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 1110, 250, 600, 600);
        const attachment = new MessageAttachment(canvas.toBuffer(), 'snowball.png');
        message.channel.send(attachment)
    }
};