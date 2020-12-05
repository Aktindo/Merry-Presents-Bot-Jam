const Discord = require('discord.js')
const userCoinsSchema = require('../../models/data')
module.exports = {
    description: 'Gives you your yearly coins!',
    category: 'Economy',
    cooldown: '365d',
    callback: async (message, args, client) => {
        const result = await userCoinsSchema.findOneAndUpdate({
            userID: message.author.id,
        }, {
            userID: message.author.id,
            $inc: {
                coins: 100000
            }
        }, {
            upsert: true,
            new: true,
        })
        console.log(result.coins)
        message.channel.send(`Here your yearly \`100000\` snowflakes ❄`)
    }
}