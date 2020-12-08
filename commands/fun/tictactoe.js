module.exports = {
    description: 'Tictactoe with a friend!',
    aliases: ['ttc'],
    category: 'Fun',
    cooldown: '20s',
    callback: async (message) => {
        const { tictactoe } = require('reconlx')
        let user = message.mentions.members.first()
        if (!user) return message.reply('Whom will you play with? Please mention a user.')
        new tictactoe({
            message: message,
            player_two : user
          })
          message.channel.send('Please wait till I react to the message. If not, the game can crash...')
    }
};