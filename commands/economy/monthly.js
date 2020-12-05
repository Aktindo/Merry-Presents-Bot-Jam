const Discord = require('discord.js')
const userSchema = require('../../models/data')
module.exports = {
    description: 'Gives you your monthly coins!',
    category: 'Economy',
    cooldown: '31d',
    callback: async (message, args, client) => {
        const result = await userSchema.findOneAndUpdate({
            userID: message.author.id,
        }, {
            userID: message.author.id,
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