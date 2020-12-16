const Discord = require('discord.js')
const userSchema = require('../../models/data')
const myFunc = require('../../util/user-mention')
module.exports = {
    description: 'Pay someone some juicy snowflakes B)',
    category: 'Economy',
    cooldown: '10s',
    minArgs: 2,
    maxArgs: -1,
    expectedArgs: '<user> <money>',
    callback: async (message, args, client) => {
        let user = myFunc(args[0]) || message.guild.members.cache.get(args[0])

        if (!user) return message.reply('Whom do you want to give money too?')

        const res = await userSchema.findOne({
            userID: user.id
        }).catch(e=>console.error(e))

        let coinsToPay = args[1]

        if (isNaN(coinsToPay)) return message.channel.send('That is not a number.')

        if (coinsToPay < 1) return message.channel.send('Really?')

        if (coinsToPay > res.coins) return message.channel.send('You do not have that many snowflakes.')

        parseInt(coinsToPay)

        let randomChance = Math.random()

        if (randomChance < 0.5) {
            // 50% chance of getting tax
            var price = coinsToPay

            var sum = eval(price);
            var tax = 0.12 * sum;
            var final = Math.round(sum + tax);
            await userSchema.findOneAndUpdate({
                userID: message.author.id
            }, {
                userID: message.author.id,
                $inc: {
                    coins: -final
                }
            }, {
                upsert: true
            })
            await userSchema.findOneAndUpdate({
                userID: user.id
            }, {
                userID: user.id,
                $inc: {
                    coins: final
                }
            }, {
                upsert: true
            })
            message.channel.send(`You paid ${user.displayName}, ${final} snowflakes :snowflake: after a ${Math.round((1/tax) * 100)}% tax rate.`)
        }
        else {
    
            await userSchema.findOneAndUpdate({
                userID: user.id
            }, {
                userID: user.id,
                $inc: {
                    coins: coinsToPay
                }
            }, {
                upsert: true
            })
            message.channel.send(`You paid ${user.displayName}, ${coinsToPay} snowflakes :snowflake: with no tax rate :)`)
        }
    
    }
}