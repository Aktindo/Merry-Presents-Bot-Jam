module.exports = {
    description: 'cat? aww :3',
    category: 'Fun',
    cooldown: '3s',
    callback: async (message) => {
        const somethingRandom = require('some-random-cat')
        somethingRandom.Random.newCat().then(res => message.channel.send(res))
    }
};