const Discord = require('discord.js')
const userSchema = require('../../models/data')
module.exports = {
    description: 'Shows your profile!',
    category: 'Economy',
    cooldown: '5s',
    callback: async (message, args, client) => {
        // Start a new item list if items are more than 6
        const firstItems = {
            "🎄 Christmas Tree": {
                key: 'christmas-tree',
                description: 'A home looks incomplete without an xmas tree.',
                price: 1050
            },
            "🔔 Xmas Bells": {
                key: 'bells',
                description: 'Yooo, the bells sound hectically amazing!',
                price: 300,
            },
            "🎁 Gift": {
                key: 'gift',
                description: 'Gift someone a random item!',
                price: 5000,
            },
            "🎅 Santa Hat": {
                key: 'santa-hat',
                description: 'Very fluffy ikr',
                price: 2500,
            },
            "🧝‍♂️ Mystery Elf": {
                key: 'mystery-elf',
                description: 'The mystery elf, here to help you.',
                price: 10000,
            },
            "❄ Rare Snowflake": {
                key: 'rare-snowflake',
                description: 'Ooooh, formed from the most dense water ever, the _rare snowflake_!',
                price: 50000,
            }
        }
        const Discord = require('discord.js')
        const embed = new Discord.MessageEmbed()
        .setTitle('Elfy Shop')
        .setColor('BLUE')
        .setFooter('Heyo, wanna buy something? Use [prefix]buy <item-key> to buy something!')
        for (const [key, value] of Object.entries(firstItems)) {
            embed.addField(key, `**Item Key:** \`${value.key}\`\n**Description:** ${value.description}\n**Price:** ${value.price}:snowflake:`, true)
        }
        
        message.channel.send(embed)
    }
}