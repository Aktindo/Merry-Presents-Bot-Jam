const Discord = require('discord.js')
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

        if (!giveawayChannel) return message.channel.send('Please mention the channel where your giveaway will be hosted on!')

        const permissions = giveawayChannel.permissionsFor(message.client.user)

        if (!permissions.has("SEND_MESSAGES")) return message.channel.send("**I can\'t send messages to that channel!**")

        if (!permissions.has("VIEW_CHANNEL")) return message.channel.send('**I can\'t view that channel!**')

        let giveawayDuration = args[1];

        if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send('**That is not a valid giveaway duration, use this format**:\n`1 [s | m | h | d ]`');

        let giveawayNumberWinners = args[2];

        if (isNaN(giveawayNumberWinners) || (parseInt(giveawayWinners) <= 0)) return message.channel;send('Please provide a number for the giveaway winners!')

        let giveawayPrize = args.slice(3).join(' ');

        if (!giveawayPrize) return message.channel.send('Ok so you want to giveaway nothing?')

        
        await client.giveaways.startGiveaway({
            prize: giveawayPrize,
            channelId: giveawayChannel.id,
            guildId: message.guild.id,
            duration: ms(giveawayDuration), 
            winners: giveawayNumberWinners, 
            hostedBy: message.author.id
        });
    }
}