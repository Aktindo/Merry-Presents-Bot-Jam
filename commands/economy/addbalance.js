const Discord = require('discord.js')
const userCoinsSchema = require('../../models/user-coins-model')
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
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        if (!user) return message.reply('Please provide a valid user!')
        if (isNaN(args[1])) return message.reply('That is not a number...')
        const result = await userCoinsSchema.findOneAndUpdate({
            userId: user.id,
        }, {
            userId: user.id,
            $inc: {
                coins: args[1],
            }
        }, {
            upsert: true,
            new: true,
        })
        console.log(result.coins)
        message.channel.send(`<@${user.id}> now has \`${result.coins}\` snowflakes ❄`)
    }
}