const discord = require('discord.js');
const Data = require('../../models/data');

module.exports = {
    description: 'Work with seasonal winter jobs and get some snowflakes!',
    cooldown: '2m',
    category: 'Economy',
    callback: async (message) => {

        let lines = require('../../job-lines.json');

        let randomLine = lines[Math.floor(Math.random() * lines.length)];

        let income = Math.round(Math.random() * 50) + 300

        const result = await Data.findOneAndUpdate({
            userID: user.user.id,
        }, {
            userID: user.user.id,
            $inc: {
                coins: income,
            }
        }, {
            upsert: true,
            new: true,
        })

        message.channel.send(randomLine + " " + income + " snowflakes ❄")
    }
}