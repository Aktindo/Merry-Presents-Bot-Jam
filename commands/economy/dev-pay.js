const Discord = require('discord.js')
const userSchema = require('../../models/data')
module.exports = {
    description: 'OP Command to pay anyone. Can be used only by the developers :)',
    aliases: ['op'],
    category: 'Economy',
    cooldown: '5s',
    ownerOnly: true,
    callback: async (message, args, client) => {
        let user = message.guild.members.cache.get(args[0])
        if (!user) return messag.channel.send('Could not find that user.')
        let coins = args[1]
        if (!coins) return message.channel.send('Please provide a number.')
        await userSchema.findOneAndUpdate({
            userID: message.author.id
        }, {
            userID: message.author.id,
            $inc: {
                coins,
            }
        }, {
            upsert: true
        })
    }
}