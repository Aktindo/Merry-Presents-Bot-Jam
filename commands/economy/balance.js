const Discord = require('discord.js')
const userSchema = require('../../models/data')
module.exports = {
    description: 'Shows the user\'s current snowflakes!',
    aliases: ['bal'],
    category: 'Economy',
    cooldown: '5s',
    callback: async (message, args, client) => {
        let user = message.mentions.members.first() || message.member
        const result = await userSchema.findOne({
            userID: user.user.id,
        })
        if (!result) return message.channel.send(`${user.user.username} has \`0\` snowflakes ❄`)
        else {
            message.channel.send(`${user.user.username} has \`${result.coins}\` snowflakes ❄`)
        }
    }
}