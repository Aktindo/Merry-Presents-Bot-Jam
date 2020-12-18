const { MessageEmbed } = require('discord.js');

module.exports = {
    description: 'Generates a random topic.',
    category: 'Fun',
    cooldown: '3s',
    callback: async (message) => {
        const somethingRandom = require('some-random-cat').Random
        somethingRandom.getTopic().then(res => {
            message.channel.send(new MessageEmbed()
            .setDescription(res)
            .setColor('RANDOM')
            )
        }).catch(e => message.channel.send('API Error.'))
    }
};