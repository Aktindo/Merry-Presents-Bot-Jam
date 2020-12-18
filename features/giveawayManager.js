module.exports = client => {
const { GiveawayCreator } = require('discord-giveaway');
const Creator = new GiveawayCreator(client, process.env.MONGOURL);
 
client.giveaways = Creator; // Access the Creator from anywhere.
}

module.exports.config = {
    displayName: 'wokcommands-giveaway-data', // Can be changed any time
    dbName: 'wokcommands-giveaway-data-true', // Should be unique and NEVER be changed once set
    loadDBFirst: true,
  }