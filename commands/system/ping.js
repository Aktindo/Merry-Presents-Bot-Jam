module.exports = {
    description: 'Displays the bot\'s latency!',
    aliases: ['p'],
    category: 'System',
    cooldown: '5s',
    callback: async (message) => {
      await message.channel.send('Pinging...').then(m => m.edit(`**🎄 Current Ping:** \n Bot evaluation time: \`${Math.round((m.createdAt - message.createdAt) / (message.client.ws.ping))}ms\` \n Latency: \`${m.createdAt - message.createdAt}ms\` \n API Latency: \`${message.client.ws.ping}ms\``))
    }
};