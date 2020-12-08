module.exports = {
    description: 'Plays snek with you!!!',
    aliases: ['play-snake'],
    category: 'Fun',
    cooldown: '20s',
    callback: async (message) => {
        const SnakeGame = require('snakecord');
        const snakeGame = new SnakeGame({
            title: 'Snake Game 🐍',
            color: "GREEN",
            timestamp: false,
            gameOverTitle: "Game Over :("
        })
        snakeGame.newGame(message);
    }
};