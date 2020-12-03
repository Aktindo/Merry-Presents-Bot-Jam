const { hangman } = require('reconlx')

module.exports = {
    description: 'Traditonal hangman game with christmas eve words',
    category: 'Fun',
    cooldown: '30s',
    callback: async (message, client) => {

        const words = require('../../words.json');

        const word = words[Math.floor(Math.random() * words.length)]

        const hang = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: message.channel
        })

        hang.start()
    }
}