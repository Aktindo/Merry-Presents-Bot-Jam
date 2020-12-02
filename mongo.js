require('dotenv').config()
const mongoose = require('mongoose')
const mongoPath = process.env.MONGOURL

module.exports = async () => {
  mongoose.connect(mongoPath, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
}
