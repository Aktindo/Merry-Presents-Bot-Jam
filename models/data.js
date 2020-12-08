const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userId: String,
    username: String,
    coins: Number,
    badges: String,
    items: Array,
})

module.exports = mongoose.model('Data', userSchema)