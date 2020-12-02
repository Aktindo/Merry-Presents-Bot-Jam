const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()
 
const client = new DiscordJS.Client()
 
client.on('ready', () => {
  // Initialize WOKCommands
  new WOKCommands(client, 'commands', 'features')
  .setMongoPath(process.env.MONGOURL)
  .setDefaultPrefix('m!')
  .setCategoryEmoji('System', '💻')
  .setCategoryEmoji('Fun', '🎅')
  .setSyntaxError('❄ Incorrect Usage! Please use `{PREFIX}{COMMAND} {ARGUMENTS}`.')
  .setColor('#5DADE2')
})
 
client.login(process.env.TOKEN)