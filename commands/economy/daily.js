const Discord = require('discord.js')
const Data = require('../../models/data')
module.exports = {
    description: 'Gives you your daily coins!',
    category: 'Economy',
    cooldown: '1d',
    callback: async (message, args, client) => {
        const result = await Data.findOneAndUpdate({
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