const Discord = require('discord.js')
const Data = require('../../models/data')
module.exports = {
    description: 'Gives you your weekly coins!',
    category: 'Economy',
    cooldown: '7d',
    callback: async (message, args, client) => {
        const result = await Data.findOneAndUpdate({
            userId: message.author.id,
        }, {
            userId: message.author.id,
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