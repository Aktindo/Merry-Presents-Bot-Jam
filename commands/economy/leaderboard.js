const Discord = require('discord.js')
const Data = require('../../models/data')
module.exports = {
    description: 'Shows the server\'s most rich users.',
    aliases: ['lb'],
    category: 'Economy',
    cooldown: '5s',
    callback: async (message, args, client) => {
        const results = await Data.find({}).limit(10).sort({
            coins: -1
        })
        if (!results) return message.channel.send('I am afraid to tell that nobody has a single snowflake yet :(')
        let text = ''
        for (let counter = 0; counter < results.length; ++counter) {
            const { userId, coins = 0 } = results[counter]
        
            text += `\`${counter + 1})\` <@${userId}> with \`${coins}\` snowflakes!\n`
          }

          const embed = new Discord.MessageEmbed()
          .setAuthor(`Economy Leaderboard`, 'https://cdn.discordapp.com/attachments/783582511220785162/783947640592924672/snowflake-2910087_1920.png')
          .setThumbnail(message.guild.iconURL())
          .setDescription(text)
          .setColor('#5DADE2')

          message.channel.send(embed)
        
    }
}