const Discord = require('discord.js')
const Data = require('../../models/data')
const shopItems = require('../../shop-items.json')
module.exports = {
    description: 'Use an item!',
    category: 'Economy',
    cooldown: '5s',
    callback: async (message, args, client) => {
        // Yo, if you are reading this, this file is going to be more than a 1000 lines. Just prepare yourselves, mentally.

        // Start

        let item = args.join('-')
        if (!item) return message.reply('Please provide an item ')
        let user = ''
        if (item === 'gift') {

            message.channel.send('Whom do you want to gift this? You can gift this to yourself too. We wont notice :) \n Reply with the member\'s mention.').then(msg1 => {
                message.channel.createMessageCollector(m => m.author.id === message.author.id, {max: 1})
                .on('collect', async m => {
                    user += getUserFromMention(m.content)
                    if (!user) return message.reply('Could not find that user.')

                    const msg = await message.channel.send('Opening gift :gift:...')
                    let income = Math.floor(Math.random() * 2000) + 1
                    let chance = Math.random()
                    if (chance >= 0.9) {
                        // 10% chance of receiving a random item.
                        let shopItems = require('../../shop-items.json')
                        let final = []
                        for (const [key, value] of Object.entries(shopItems)) {
                            final.push(key)
                        }
                        let randomItem = final[Math.floor(Math.random() * final.length)]
                        await Data.findOneAndUpdate({
                            userID: user
                        }, {
                            userID: user,
                            $inc: {
                                coins: income
                            },
                            $push: {
                                items: randomItem
                            }
                        }, {
                            upsert: true
                        })
                        await msg.edit(`Yo, the victim received **${income}** snowflakes :snowflake: and a **${randomItem}**! Enjoy...`)
                    }
                    else {
                        const res = await Data.findOneAndUpdate({
                            userID: user
                        }, {
                            userID: user,
                            $inc: {
                                coins: income
                            },
                        }, {
                            upsert: true,
                            new: true,
                        })
                        console.log(res.coins)
                        await msg.edit(`Yo, the victim received **${income}** snowflakes :snowflake:! Enjoy...`)
                    }
                })
            })
        }


        // Functions
        function getUserFromMention(mention) {
            if (!mention) return;
        
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
        
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
        
                return message.guild.members.cache.get(mention);
            }
        }
    }
}