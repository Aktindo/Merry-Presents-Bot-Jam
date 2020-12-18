const { MessageEmbed } = require('discord.js');

module.exports = {
    description: 'MEME!!!',
    category: 'Fun',
    cooldown: '3s',
    callback: async (message) => {
        const somethingRandom = require('some-random-cat').Random
        somethingRandom.getMeme('meme').then(res => {
            const embed = new MessageEmbed()
            .setTitle(res.title)
            .setURL(`https://www.reddit.com/r/meme`)
            .setImage(res.img)
            .setFooter(`👍 ${res.upvotes} | 💬 ${res.comments}`)
            .setAuthor(`From ${res.author}`)
            .setColor('RANDOM')
            message.channel.send(embed)
            console.log(res)
        }).catch(e => message.channel.send('API Error.'))
    }
};