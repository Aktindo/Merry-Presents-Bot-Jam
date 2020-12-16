const Discord = require('discord.js')
const welcomeData = require('../../models/welcome-data')
module.exports = {
    description: 'Gift your members with some prizes!',
    minArgs: 4,
    maxArgs: -1,
    expectedArgs: '<channel> <time> <winners> <prize>',
    requiredPermissions: ['MANAGE_MESSAGES'],
    category: 'Admin',
    cooldown: '10s',
    callback: async (client, message, args) => {
        const ms = require('ms')
        let giveawayChannel = message.mentions.channels.first();
        let giveawayDuration = args[1];
        let giveawayNumberWinners = args[2];
        let giveawayPrize = args.slice(3).join(' ');
        await client.giveaways.startGiveaway({
            prize: giveawayPrize,
            channelId: giveawayChannel.id,
            guildId: message.guild.id,
            duration: ms(giveawayDuration), // 30 Seconds
            winners: giveawayNumberWinners, // 1 winner
            hostedBy: message.author.id
        });
    }
}