const Discord = require('discord.js')
const userCoinsSchema = require('../../models/data')
module.exports = {
    description: 'Adds a bunch of snowflakes to a user\'s profile.',
    aliases: ['addbal'],
    category: 'Economy',
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<user> <snowflakes>",
    cooldown: '5s',
    callback: async (message, args, client) => {
        if (message.author.id === '683879319558291539') {
            let user = message.mentions.members.first() || message.member
            if (isNaN(args[1])) return message.reply('That is not a number...')
            const result = await userCoinsSchema.findOneAndUpdate({
                userID: user.user.id,
            }, {
                userID: user.user.id,
                $inc: {
                    coins: args[1],
                }
            }, {
                upsert: true,
                new: true,
            })
            message.channel.send(`**${user.user.tag}** now has \`${result.coins}\` snowflakes ❄`)
        }
        else {
            return
        }
    }
}