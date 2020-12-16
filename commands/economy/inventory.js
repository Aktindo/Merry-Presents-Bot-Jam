const Discord = require('discord.js')
const userSchema = require('../../models/data')
module.exports = {
    description: 'Shows your current inventory!',
    aliases: ['inv'],
    category: 'Economy',
    cooldown: '5s',
    callback: async (message, args, client) => {
        const res = await userSchema.findOne({
            userID: message.author.id
        }).catch(e=>console.error(e))

        if (!res.items) {
            message.channel.send('You do not have anything.')
            return
        }
        const invArray = res.items
        const items =  invArray.reduce((total, value) => {
            total[value] = (total[value] || 0) + 1;
            return total;
       }, {});

        let final = ''
        for (const [key, value] of Object.entries(items)) {
            final += `${key} **x${value}**\n`
        }

        return message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}'s Inventory`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(final)
            .setColor('RANDOM')
        )
    }
}