const Discord = require('discord.js')
const userCoinsSchema = require('../../models/user-coins-model')
module.exports = {
    description: 'Gives you your monthly coins!',
    category: 'Economy',
    cooldown: '31d',
    callback: async (message, args, client) => {
        const result = await userCoinsSchema.findOneAndUpdate({
            userId: message.author.id,
        }, {
            userId: message.author.id,
            $inc: {
                coins: 50000
            }
        }, {
            upsert: true,
            new: true,
        })
        console.log(result.coins)
        message.channel.send(`Here your monthly \`50000\` snowflakes ❄`)
    }
}