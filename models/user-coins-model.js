const mongoose = require('mongoose')

const userCoinsSchema = mongoose.Schema({
    userId: String,
    coins: Number,
})

module.exports = mongoose.model('user-coins', userCoinsSchema)