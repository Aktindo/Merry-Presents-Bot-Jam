const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()
 
const client = new DiscordJS.Client({
  partials: ['MESSAGE', 'REACTION'],
})
const mongo = require('./mongo')
const queue = new Map()
client.queue = queue
 
client.on('ready', async () => {
  // Initialize WOKCommands
  new WOKCommands(client, 'commands', 'features')
  .setMongoPath(process.env.MONGOURL)
  .setDisplayName('☃')
  .setDefaultPrefix('m!')
  .setCategoryEmoji('System', '💻')
  .setCategoryEmoji('Fun', '🎅')
  .setCategoryEmoji('Economy', '❄')
  .setCategoryEmoji('Admin', '👨‍⚖️')
  .setColor('#5DADE2')
  .setSyntaxError("❄ Incorrect Usage! Please use `{PREFIX}{COMMAND} {ARGUMENTS}`.")
  .setBotOwner('683879319558291539')
  await mongo()
  console.log('Clearing screen...')
  console.clear()
  console.log('Ready!')
})
 
client.login(process.env.TOKEN)