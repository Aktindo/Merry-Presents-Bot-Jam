const Discord = require('discord.js')
const userSchema = require('../../models/data')
module.exports = {
    description: 'Gives you your weekly coins!',
    category: 'Economy',
    cooldown: '7d',
    callback: async (message, args, client) => {
        const result = await userSchema.findOneAndUpdate({
            userID: message.author.id,
        }, {
            userID: message.author.id,
            $inc: {
                coins: 25000
            }
        }, {
            upsert: true,
            new: true,
        })
        console.log(result.coins)
        message.channel.send(`Here your weekly \`25000\` snowflakes ❄`)
    }
}