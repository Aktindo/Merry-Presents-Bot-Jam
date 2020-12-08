const Discord = require('discord.js')
const Data = require('../../models/data')
module.exports = {
    description: 'Gives you your yearly coins!',
    category: 'Economy',
    cooldown: '365d',
    callback: async (message, args, client) => {
        const result = await Data.findOneAndUpdate({
            userId: message.author.id,
        }, {
            userId: message.author.id,
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