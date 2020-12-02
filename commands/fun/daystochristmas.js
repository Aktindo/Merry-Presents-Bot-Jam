module.exports = {
    description: 'Displays the days left to the christmas eve.',
    aliases: ['dtc'],
    category: 'Fun',
    cooldown: '3s',
    callback: async (message) => {
      const axios = require('axios')
      const res = await axios.get('https://christmas-days.anvil.app/_/api/get_days')
      message.channel.send(`🎅 Days left for the Christmas Eve - \`${res.data['Days to Christmas']} days\``)
    }
};