module.exports = (client, instance) => {
    const welcomeData = require('../models/welcome-data')
    client.on('guildMemberAdd', async member => {
        const result = await welcomeData.findOne({
            _id: member.guild.id,
        }).catch(e=>console.error(e))
        if (!result) return
        else {
            const channel = await member.guild.channels.cache.get(result.channelId)
            if (!channel) return
            let text = result.text
            var mapObj = {
                "{member}": member,
                "{membercount}": member.guild.memberCount,
                "{server}": member.guild.name,
             };
             text = text.replace(/{member}|{membercount}|{server}/gi, function(matched){
               return mapObj[matched];
             });
            await channel.send(text)
        }
    })
}
   
  module.exports.config = {
    displayName: 'wokcommands-welcome-data', // Can be changed any time
    dbName: 'wokcommands-welcome-data-true', // Should be unique and NEVER be changed once set
    loadDBFirst: true,
  }