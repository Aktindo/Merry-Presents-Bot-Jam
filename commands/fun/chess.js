module.exports = {
    description: 'Plays chess with you!!!',
    aliases: ['dtc'],
    category: 'Fun',
    cooldown: '20s',
    callback: async (message) => {
      const chess = require('../../games/chess')
      const Chess = new chess()
      Chess.newGame(message)
    }
};