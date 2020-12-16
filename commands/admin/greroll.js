const Discord = require('discord.js')
module.exports = {
    description: 'Reroll a giveaway!',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<giveaway id>',
    requiredPermissions: ['MANAGE_MESSAGES'],
    category: 'Admin',
    cooldown: '10s',
    callback: async (client, message, args) => {


        const rerolled = await client.giveaways.rerollGiveaway(args[0]);
        
        if (!rerolled) {
            return message.channel.send('**This giveaway hasn\'t ended**');
        }
        else {

            message.channel.send('**Rerolled the giveaway!**');
            
        }
    }
}