const Discord = require('discord.js')
module.exports = {
    description: 'End a giveaway!',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<giveaway id>',
    requiredPermissions: ['MANAGE_MESSAGES'],
    category: 'Admin',
    cooldown: '10s',
    callback: async (client, message, args) => {

        const ended = await client.giveaways.endGiveaway(args[0]);
        
        if (!ended) {
            return message.channel.send('**This giveaway has already ended!**');
        }
        else {
            message.channel.send('**Ended the giveaway!**');
        }
    }
}