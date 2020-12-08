module.exports = {
    description: 'Displays the MongoDB Ping!',
    aliases: ['db-ping'],
    category: 'System',
    cooldown: '5s',
    ownerOnly: true,
    callback: async (message) => {
        const userSchema = require('../../models/data')
        const firstTime = Date.now()
        await userSchema.findOne({})
        const secondTime = Date.now()
        const final = secondTime - firstTime
        message.channel.send(`🍃 MongoDB Latency: **${final}**ms`)
    }
};