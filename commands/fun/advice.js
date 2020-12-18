const { MessageEmbed } = require('discord.js');

module.exports = {
    description: 'Get an advice',
    category: 'Fun',
    cooldown: '3s',
    callback: async (message) => {
        const somethingRandom = require('some-random-cat').Random
        somethingRandom.getAdvice().then(res => {
            message.channel.send(new MessageEmbed()
            .setDescription(res)
            .setColor('RANDOM')
            )
        }).catch(e => message.channel.send('API Error.'))
    }
};