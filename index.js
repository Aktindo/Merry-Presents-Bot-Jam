const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()
 
const client = new DiscordJS.Client()
const mongo = require('./mongo')
 
client.on('ready', async () => {
  // Initialize WOKCommands
  new WOKCommands(client, 'commands', 'features')
  .setMongoPath(process.env.MONGOURL)
  .setDisplayName('☃')
  .setDefaultPrefix('m!')
  .setCategoryEmoji('System', '💻')
  .setCategoryEmoji('Fun', '🎅')
  .setCategoryEmoji('Economy', '❄')
  .setSyntaxError('❄ Incorrect Usage! Please use `{PREFIX}{COMMAND} {ARGUMENTS}`.')
  .setColor('#5DADE2')
  await mongo()
})
 
client.login(process.env.TOKEN)