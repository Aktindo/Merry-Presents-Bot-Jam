const Discord = require('discord.js')
const userCoinsSchema = require('../../models/user-coins-model')
module.exports = {
    description: 'Shows the user\'s current snowflakes!',
    aliases: ['bal'],
    category: 'Economy',
    cooldown: '5s',
    callback: async (message, args, client) => {
        let user = message.mentions.members.first() || message.member
        const result = await userCoinsSchema.findOne({
            userId: user.user.id,
        })
        if (!result) return message.channel.send(`${user.user.username} has \`0\` snowflakes ❄`)
        else {
            message.channel.send(`${user.user.username} has \`${result.coins}\` snowflakes ❄`)
        }
    }
}