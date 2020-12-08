const Discord = require('discord.js')
const Data = require('../../models/data')
module.exports = {
    description: 'Adds a bunch of snowflakes to a user\'s profile.',
    aliases: ['addbal'],
    category: 'Economy',
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<user> <snowflakes>",
    cooldown: '5s',
    requiredPermissions: ['ADMINISTRATOR'],
    callback: async (message, args, client) => {
        let user = message.mentions.members.first() || message.member
        if (isNaN(args[1])) return message.reply('That is not a number...')
        const result = await Data.findOneAndUpdate({
            userId: user.user.id,
        }, {
            userId: user.user.id,
            $inc: {
                coins: args[1],
            }
        }, {
            upsert: true,
            new: true,
        })
        console.log(result.coins)
        message.channel.send(`**${user.user.tag}** now has \`${result.coins}\` snowflakes ❄`)
    }
}