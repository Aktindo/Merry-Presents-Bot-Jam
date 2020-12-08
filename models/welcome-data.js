const mongoose = require('mongoose')

const welcomeData = mongoose.Schema({
    _id: String,
    channelId: String,
    text: String,
})

module.exports = mongoose.model('welcome-data', welcomeData)