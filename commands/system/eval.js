const Discord = require('discord.js')
module.exports = {
    description: 'Runs a javascript code given!',
    aliases: ['run', 'runcode'],
    category: 'System',
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<code>",
    cooldown: '5s',
    callback: async (message, args, client) => {
        const { inspect } = require("util")

        let command = args.slice(0).join(" ")

        if(message.author.id === "683879319558291539"){

        try{
            let evaled = eval(command)

            var embed = new Discord.MessageEmbed()
			.setColor('GREEN')
            .setAuthor('Eval Response', message.author.displayAvatarURL())
            .addField("📥 To Eval", `\`\`\`${command}\`\`\``)
            .addField("📤 Evaled", `\`\`\`js\n${inspect(evaled, { depth: 0})}\`\`\``)  
			.addField("Type Of", `\`\`\`${typeof(evaled)}\`\`\``)
			.setTimestamp()
            message.channel.send(embed)
        } catch  (error) {
            var embed = new Discord.MessageEmbed()
            .addField("Error", `${error}`)
            .setColor('RED')

            message.channel.send(embed)
        }
     } else {
        return
     }
    }
}