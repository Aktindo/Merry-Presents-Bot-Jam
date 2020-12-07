const Discord = require('discord.js')
const userSchema = require('../../models/data')
const begLines = require('../../beg-lines.json')
module.exports = {
    description: 'Begs for snowflakes!',
    aliases: ['beg-snowflakes'],
    category: 'Economy',
    cooldown: '60s',
    callback: async (message, args, client) => {
        const randomResult = Math.floor(Math.random() * 2)
        if (randomResult === 1) {
            const money = Math.floor(Math.random() * 200) + 50
            const randomLine = begLines.success[Math.floor(Math.random() * begLines.success.length)]
            message.channel.send(randomLine + " " + money + " snowflakes ❄")
            await userSchema.findOneAndUpdate({
                userID: message.author.id
            }, {
                userID: message.author.id,
                $inc: {
                    coins: money
                }
            }, {
                upsert: true
            })
        }
        if (randomResult === 0) {
            const randomLine = begLines.fail[Math.floor(Math.random() * begLines.fail.length)]
            message.channel.send(randomLine)
        }
    }
}