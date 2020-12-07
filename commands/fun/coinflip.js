const Data = require('../../models/data');
const discord = require('discord.js');

module.exports = {
    description: 'a simple coinflip command, or is it?',
    aliases: ['cf', 'c-f'],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<choice> <price>',
    category: 'Fun',
    cooldown: '10s',

    callback: async (message, args) => {

        let choices = ["heads", "tails"]

        let price = parseInt(args[1]);

        if (isNaN(price)) return message.channel.send('Really?')


        let embed = new discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Le epic coinflip')
        .setDescription(`${price} snowflakes ❄ at stake`)
        .setFooter("Let's see who's gonna win")

        const res = await Data.findOne({
            userID: message.author.id
        }).catch(e => console.error(e))
        if (!res) return message.channel.send("I'm sorry but you dont have that much snowflakes ❄")
        if (price > res.coins) return message.channel.send("I'm sorry but you dont have that much snowflakes ❄")

        await message.channel.send(embed)

        if (choices.includes((args[0]).toLowerCase())){

        let number = Math.floor(Math.random() * 2);

        if (number == 1) {

            await Data.findOneAndUpdate({
                userID: message.author.id
            }, {
                userID: message.author.id,
                $inc: {
                    coins: -price,
                    losses: 1
                }
            }, {
                upsert: true
            }).catch(e=>console.error(e))

            if ((args[0]).toLowerCase() == "heads") {

                let losing = new discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription(`It was tails, you lose ${price} snowflakes ❄`)
                .setFooter('I am sad for you :(')

                return message.channel.send(losing)
                
            }

            if ((args[0]).toLowerCase() == 'tails') {

                let losing = new discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription(`It was heads, you lose ${price} snowflakes ❄`)
                .setFooter('I am sad for you :(')

                return message.channel.send(losing)

            }

        }

        if (number == 0) {

            const data = await Data.findOneAndUpdate({
                userID: message.author.id
            }, {
                userID: message.author.id,
                $inc: {
                    coins: price,
                    wins: 1
                }
            }, {
                upsert: true,
                new: true
            }).catch(e=>console.error(e))
            console.log(data.wins)
            if (data.wins === 1) {
                let firstWin = data.badges + '<:1win:785359924997783592>'
            if (!data.badges) firstWin = '' + '<:1win:785359924997783592>'
            await Data.findOneAndUpdate({
                userID: message.author.id,
            }, {
                userID: message.author.id,
                badges: firstWin
            }, {
                upsert: true
            })
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            
            today = dd + '/' + mm + '/' + yyyy;


            const embed = new discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle('Your first win!!!')
            .setDescription(`You are getting better at this! You just earned a badge for completing your first win!`)
            .addFields(
                {name: 'Badge', value: '<:1win:785359924997783592>', inline: true},
                {name: 'Rarity' ,value: 'Very Easy (99.9%)', inline: true},
            )
            .setImage('https://cdn.discordapp.com/attachments/785357477784846407/785359839248646184/10__8_-removebg-preview.png')
            .setFooter(`Obtained on ${today}`)
            .setColor('BLUE')
            message.channel.send(embed)
            }
            if (data.wins === 10) {
                let coinflip = data.badges + '<:10wins:785356984811126815>'
            if (!data.badges) coinflip = '' + '<:10wins:785356984811126815>'
            await Data.findOneAndUpdate({
                userID: message.author.id,
            }, {
                userID: message.author.id,
                badges: coinflip
            }, {
                upsert: true
            })
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            
            today = dd + '/' + mm + '/' + yyyy;


            const embed = new discord.MessageEmbed()
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

            message.channel.send(`Correct guess my g, you get ${price} snowflakes ❄!`)

        }

        }else {

            return message.channel.send('G, thats not how you play the game')
        }
        
    }
}