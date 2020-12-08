const { MessageEmbed } = require("discord.js");
const createBar = require("string-progressbar");
const userSchema = require('../../models/data')
module.exports = {
    description: 'Plays rock paper scissors with you!',
    aliases: ['rockpaperscissors'],
    category: 'Fun',
    cooldown: '60s',
    callback: async (message, args) => {
        // to access data from anywhere
    
        const chooseArr = ["🗻", "📰", "✂"];

        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL)
            .setDescription("Add a reaction to one of these emojis to play the game!")
            .setTimestamp();

        const m = await message.channel.send(embed);
        // Wait for a reaction to be added
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        // Get a random emoji from the array
        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        // Check if it's a win/tie/loss
        const result = getResult(reacted, botChoice);
        if (result === 'You won!') {
            await userSchema.findOneAndUpdate({
                userID: message.author.id
            }, {
                userID: message.author.id,
                $inc: {
                    coins: 50,
                    wins: 1
                }
            }, {
                upsert: true,
                new: true
            })
            message.channel.send('Santa gave you 50 snowflakes :snowflake: for winning!')
        }
        else if (result === 'You lost!') {
            await userSchema.findOneAndUpdate({
                userID: message.author.id
            }, {
                userID: message.author.id,
                $inc: {
                    coins: 10,
                    losses: 1
                }
            }, {
                upsert: true,
            })
            message.channel.send('Santa gave you 10 snowflakes :snowflake: for participating!')
        }
        const data = await userSchema.findOne({
            userID: message.author.id
        })
        if (data.wins === 10) {
            let rpsBadge = data.badges + '<:10wins:785356984811126815>'
            if (!data.badges) rpsBadge = '' + '<:10wins:785356984811126815>'
            await userSchema.findOneAndUpdate({
                userID: message.author.id,
            }, {
                userID: message.author.id,
                badges: rpsBadge
            }, {
                upsert: true
            })
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            
            today = dd + '/' + mm + '/' + yyyy;


            const embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle('Whoa!')
            .setDescription(`You are getting better at this! You just earned a badge for completing 10 wins!`)
            .addFields(
                {name: 'Badge', value: '<:10wins:785356984811126815>', inline: true},
                {name: 'Rarity' ,value: 'Easy (90%)', inline: true},
            )
            .setImage('https://cdn.discordapp.com/attachments/785357477784846407/785357588148781056/10__7_-removebg-preview.png')
            .setFooter(`Obtained on ${today}`)
            .setColor('BLUE')
            message.channel.send(embed)
        }
        // Clear the reactions
        await m.reactions.removeAll();

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);
    }
};
function getResult(me, clientChosen) {
    if ((me === "🗻" && clientChosen === "✂") ||
        (me === "📰" && clientChosen === "🗻") ||
        (me === "✂" && clientChosen === "📰")) {
            return "You won!";
    } else if (me === clientChosen) {
        return "It's a tie!";
    } else {
        return "You lost!";
    }
}
async function promptMessage(message, author, time, validReactions) {
    time *= 1000;
    for (const reaction of validReactions) await message.react(reaction);
    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
    return message
        .awaitReactions(filter, { max: 1, time: time})
        .then(collected => collected.first() && collected.first().emoji.name);
}