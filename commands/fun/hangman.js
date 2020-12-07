module.exports = {
    description: 'Plays hangman with you!!!',
    aliases: ['hang-m'],
    category: 'Fun',
    cooldown: '20s',
    callback: async (message) => {
      const HangmanGame = require('hangcord')
      const words = require('../../words.json')
      const hangman = new HangmanGame({
        title: 'Hangman', // Title of the embed while displaying the game. Default: Hangman
        color: 'RANDOM', // Color of the embed. Default: RANDOM
        timestamp: true, // Will set timestamp for embeds. Default: true
        gameOverTitle: 'Game Over', // Will set the embed title of the game over embed. Default: 'Game Over'
        words: words// Custom set of words. Deafult: './words.json'
      })
      hangman.newGame(message)
    }
};