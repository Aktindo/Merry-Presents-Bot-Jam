const Discord = require('discord.js')
const userSchema = require('../../models/data')
module.exports = {
    description: 'Gives you your hourly coins!',
    category: 'Economy',
    cooldown: '1h',
    callback: async (message, args, client) => {
        const result = await userSchema.findOneAndUpdate({
            userID: message.author.id,
        }, {
            userID: message.author.id,
            $inc: {
                coins: 200
            }
        }, {
            upsert: true,
            new: true,
        })
        console.log(result.coins)
        message.channel.send(`Here your hourly \`200\` snowflakes ❄`)
    }
}