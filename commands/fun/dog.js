module.exports = {
    description: 'A random image of dog',
    category: 'Fun',
    cooldown: '3s',
    callback: async (message) => {
        const somethingRandom = require('some-random-cat')
        somethingRandom.Random.getDog().then(res => message.channel.send(res))
    }
};