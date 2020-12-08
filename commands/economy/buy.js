const discord = require('discord.js');
const Data = require('../../models/data');

module.exports = {
    description: 'Buy something from the shop',
    category: 'Economy',
    cooldown: '5s',
    callback: async (message, args, client) => {

        let item = args.slice(0).join('-')

        if (!item) return message.channel.send('Please include the item that you want to buy!')

        // testing with the gift and the chances, will add more items support later

        if (item == 'gift') {

            await Data.findOne({
                userId: message.author.id
            }, async (err, res) => {

                if (err) throw err

                if (!res) return message.channel.send('You dont have any coins or items yet!')

                if (res.coins < 5000) {

                    return message.channel.send("I'm sorry but you don't have enough coins.")

                }else {

                    res.items.push('gift')

                    res.coins = res.coins - 5000

                    res.save()

                    message.channel.send('A wild :gift: has been added to your inventory! Would you like to open it?\nReply with `yes` or `no`')

                    const filter = m => m.id == message.author.id

                    message.channel.awaitMessages(filter, {

                        max: 1,
                        time: 45000,
                        errors: ["time"]

                    })
                    .then( async collected => {

                        if (collected.first().content.toLowerCase() === 'no') return message.channel.send(`Alright, keeping the gift in your inventory`)
                        if (collected.first().content.toLowerCase() === 'yes') {

                            const msg = await message.channel.send('Opening your gift...')

                            const income = Math.floor(Math.random() * 100) + 1950

                            let chance = Math.floor(Math.random() * 100) + 1

                            if (chance >= 50) {

                                setTimeout(function () {

                                    res.coins = res.coins + income;

                                    res.items = res.items.push(':snowflake:')

                                    res.save()

                                    msg.edit(`:tada: **You get ${income} snowflakes and a lucky :snowflake: Rare Snowflake`)

                                }, 5000)

                            }else {

                                setTimeout(function () {

                                    res.coins = res.coins + income;

                                    res.save()

                                    msg.edit(`:tada: **You get ${income} snowflakes and... well nothing else :(`)

                                }, 5000)
                                
                            }

                        }

                    })

                }

            })


        }
    }
}