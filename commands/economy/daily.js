const Discord = require('discord.js')
const userCoinsSchema = require('../../models/user-coins-model')
module.exports = {
    description: 'Gives you your daily coins!',
    aliases: ['addbal'],
    category: 'Economy',
    expectedArgs: "<user> <snowflakes>",
    cooldown: '1d',
    callback: async (message, args, client) => {
        const result = await userCoinsSchema.findOneAndUpdate({
            userId: message.author.id,
        }, {
            userId: message.author.id,
            $inc: {
                coins: 2500
            }
        }, {
            upsert: true,
            new: true,
        })
        console.log(result.coins)
        message.channel.send(`Here your daily \`2500\` snowflakes ❄`)
    }
}