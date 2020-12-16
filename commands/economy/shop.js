const Discord = require('discord.js')
const userSchema = require('../../models/data')
const shopItems = require('../../shop-items.json')
module.exports = {
    description: 'Shows your profile!',
    category: 'Economy',
    cooldown: '5s',
    callback: async (message, args, client) => {
        // Start a new item list if items are more than 6
        const firstItems = shopItems
        const Discord = require('discord.js')
        const embed = new Discord.MessageEmbed()
        .setTitle('Elfy Shop')
        .setColor('BLUE')
        .setFooter('Heyo, wanna buy something? Use [prefix]buy <item-key> to buy something!')
        Object.keys(firstItems).forEach(itemName => {
            embed.addField(itemName, `**Item Key:** \`${firstItems[itemName].key}\`\n**Description:** ${firstItems[itemName].description}\n**Price:** ${firstItems[itemName].price} :snowflake:\n**Type:** ${firstItems[itemName].Type}`, true)
        })
        message.channel.send(embed)
    }
}