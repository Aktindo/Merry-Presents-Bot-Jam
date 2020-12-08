const { MessageEmbed } = require('discord.js');

module.exports = {
    description: 'Ohhh this funi',
    category: 'Fun',
    cooldown: '3s',
    callback: async (message) => {
        const somethingRandom = require('some-random-cat')
        somethingRandom.Random.newJoke().then(res => {
            const embed = new MessageEmbed()
            .setTitle(res.title)
            .setDescription(res.body)
            .setColor('RANDOM')
            .setURL(res.url)
            message.channel.send(embed)
        })
    }
};