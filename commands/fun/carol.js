const Discord = require('discord.js')
const ytdl = require('ytdl-core')
module.exports = {
    description: 'Joins a VC and plays a random chrsitmas carol!',
    category: 'Fun',
    globalCooldown: '1m',
    callback: async (message, args, client) => {
        const availableSongs = [
            'https://www.youtube.com/watch?v=cRQSw1UK5Zw&list=PLNC6JRvHHCYrNXqOd16vOURRX1mSpmhQ4',
            'https://www.youtube.com/watch?v=XRgHKEQKLjc&list=PLNC6JRvHHCYrNXqOd16vOURRX1mSpmhQ4'
        ]
        let randomSong = availableSongs[Math.floor(Math.random() * availableSongs.length)]
        try {
            const queue = message.client.queue;
            const serverQueue = message.client.queue.get(message.guild.id);
      
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel)
              return message.channel.send(
                "You need to be in a voice channel to play music!"
              );
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
              return message.channel.send(
                "I need the permissions to join and speak in your voice channel!"
              );
            }
      
            const songInfo = await ytdl.getInfo(randomSong);
            const song = {
              title: songInfo.videoDetails.title,
              url: songInfo.videoDetails.video_url
            };
      
            if (!serverQueue) {
              const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
              };
      
              queue.set(message.guild.id, queueContruct);
      
              queueContruct.songs.push(song);
      
              try {
                var connection = await voiceChannel.join();
                queueContruct.connection = connection;
                play(message, queueContruct.songs[0]);
              } catch (err) {
                console.log(err);
                queue.delete(message.guild.id);
                return message.channel.send(err);
              }
            } else {
              serverQueue.songs.push(song);
              return message.channel.send(
                `${song.title} has been added to the queue!`
              );
            }
          } catch (error) {
            console.log(error);
            message.channel.send(error.message);
          }
        },
      
        play(message, song) {
          const queue = message.client.queue;
          const guild = message.guild;
          const serverQueue = queue.get(message.guild.id);
      
          if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
          }
      
          const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on("finish", () => {
              serverQueue.songs.shift();
              this.play(message, serverQueue.songs[0]);
            })
            .on("error", error => console.error(error));
          dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
          serverQueue.textChannel.send(`Started playing: **${song.title}**`);
    }
}