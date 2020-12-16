const discord = require('discord.js');
const Data = require('../../models/data');
const fs = require('fs')
module.exports = {
    description: 'Buy something from the shop',
    category: 'Economy',
    cooldown: '5s',
    callback: async (message, args, client) => {
        const { confirmation } = require('reconlx')
        let item = args.slice(0).join('-')

        if (!item) return message.channel.send('Please include the item that you want to buy!')

        const items = require('../../shop-items.json')
        let itemName = '';
        let itemPrice = 0;
        let itemDesc = '';
        for (const i in items) {
            if (item.toLowerCase() === items[i].key.toLowerCase()) { // If item is found, run this...
                itemName = items[i].name
                itemPrice = items[i].price;
                itemDesc = items[i].description;
            }
        }

        if (itemName === '') {
            return message.channel.send(`**Item ${item} not found.**`)
        }
        const res = await Data.findOne({
            userID: message.author.id
        }).catch(e=>console.error(e))

        if (res.coins < itemPrice) {
            message.channel.send(`You do not have enough snowflakes :snowflake: to buy that item.\nYou need more \`${itemPrice - res.coins}\` snowflakes :snowflake: to buy it!`)
            return
        }
        else {
            message.channel.send('Confirmation for Buying the item... Please react in 10 seconds.').then(async msg => {
                const emoji = await confirmation(msg, message.author, ['✅', '❌'], 10000)
                if(emoji === '✅') { //if author reacts on check
                    await Data.findOneAndUpdate({
                        userID: message.author.id,
                    }, {
                        userID: message.author.id,
                        $push: {
                            items: itemName
                        },
                        $inc: {
                            coins: -itemPrice
                        }
                    }, {
                        upsert: true,
                        new: true
                    })
                    message.channel.send(`You bought a **${itemName}** for \`${itemPrice}\` snowflakes :snowflake:`)
                    msg.delete()
                  } 
                  if(emoji === '❌') { // if author reacts on cross
                  // delete the confirmation message
                    msg.delete()
                  }
            })
        }
    }
}