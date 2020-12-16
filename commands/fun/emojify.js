module.exports = {
    aliases: ['e-f'],
    category: 'Fun',
    cooldown: '3s',
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: '<content>',
    callback: async (message, args) => {
        const emoji = require('discord-emoji-convert');
        if (args.join(' ').length > 200) return message.reply('Too much to convert lol') 
        let res = emoji.convert(args.join(' '))
        if (!res) {
            res = 'Could not convert that!'
        }
        message.channel.send(res)
    }
}