const Data = require('../../models/data');
const discord = require('discord.js');

module.exports = {
    description: 'a simple coinflip command, or is it?',
    aliases: ['cf', 'c-f'],
    category: 'Fun',
    cooldown: '10s',

    callback: async (client, message, args) => {

        if (!args[0]) return message.channel.send('Please include your choice and the amount of coins');

        let choices = ["heads", "tails"]

        let price = parseInt(args[1]);

        if (!price || isNaN(price) ||price < 1) return message.channel.send('G you need to bet some coins')

        let embed = new discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Le epic coinflip')
        .setDescription(`${price} snowflakes ❄ at stake`)
        .setFooter("Let's see who's gonna win")

        Data.findOne({
            userId: message.author.id
        }, async (err, res) => {
            if (err) console.log(err)

            //if the author's bet is too high

            if (!res || res.coins < price) return message.channel.send("I'm sorry but you dont have that much snowflakes ❄")

            const msg = await message.channel.send(embed)

            if (choices.includes((args[0]).toLowerCase())){

            let number = Math.floor(Math.random() * 2);

            if (number == 1) {

                res.coins = res.coins - price;
                res.save()

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

                res.coins = res.coins + price;
                res.save()
                

                message.channel.send(`Correct guess my g, you get ${price} snowflakes ❄!`)

            }

            }else {

                return message.channel.send('G, thats not how you play the game')
            }
        })

        
    }
}