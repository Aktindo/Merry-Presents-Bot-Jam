const Discord = require('discord.js')
const userSchema = require('../../models/data')
module.exports = {
    description: 'Shows your profile!',
    category: 'Economy',
    cooldown: '5s',
    callback: async (message, args, client) => {
        const result = await userSchema.findOne({
            userID: message.author.id
        }).catch(e=>console.error(e))

        if (!result) return message.channel.send('You have not played anything yet! Get some coins maite.')
        else {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}'s Profile`, message.author.displayAvatarURL())
            .setColor('BLUE')
            .setTimestamp()
            if (result.coins) {
                embed.addField('Snowflakes', `${result.coins} :snowflake:`, false)
            }
            if (result.wins) {
                embed.addField('Wins', `${result.wins} <:trophy:785123120468983808>`, true)
            }
            if (result.losses) {
                embed.addField('Losses', `${result.losses} <:lose:785123544249532446>`, true)
            }
            if (result.badges) {
                embed.addField('Badges', `${result.badges}`, false)
            }
            message.channel.send(embed)
        }
    }
}