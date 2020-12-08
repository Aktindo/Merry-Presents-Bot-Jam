const Discord = require('discord.js')
const Data = require('../../models/data')
module.exports = {
    description: 'Gives you your monthly coins!',
    category: 'Economy',
    cooldown: '31d',
    callback: async (message, args, client) => {
        const result = await Data.findOneAndUpdate({
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