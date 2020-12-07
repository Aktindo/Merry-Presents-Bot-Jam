const Discord = require('discord.js')
const welcomeData = require('../../models/welcome-data')
module.exports = {
    description: 'Give your new members a warm greeting!',
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: '<text{Variables: {member}, {membercount}, {server}}>',
    requiredPermissions: ['ADMINISTRATOR'],
    category: 'Admin',
    cooldown: '10s',
    callback: async (message, args, client) => {
        const channel = message.channel.id
        const text = args.join(' ')
        await welcomeData.findOneAndUpdate({
            _id: message.guild.id
        }, {
            _id: message.guild.id,
            channelId: channel,
            text: text
        }, {
            upsert: true
        })
        message.channel.send(`Successfully set ${message.channel} as the welcome channel!`)
    }
}