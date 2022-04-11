const Discord = require('discord.js')
const db = require('ewing-db')
const moment = require('moment')
require('moment-duration-format')

exports.run = async (client, message, args) => {
const Sıralama = db.all().filter(data => data.ID.startsWith(`EnÇokOyVerdiğiSunucu_${message.guild.id}_`)).sort((a,b) => b.data - a.data)
Sıralama.length = 10
let SonuçDB = ''
for (var i in Sıralama) {
SonuçDB += `**#${Sıralama.indexOf(Sıralama[i])+1} |** <@${client.users.cache.get(Sıralama[i].ID.slice(35)).id}> Kalp: \`${Sıralama[i].data}\`\n`
}
const PepeCode = new Discord.MessageEmbed()
.setColor('GREY')
.setAuthor('💖 Sunucu Atılan Kalp Sıralaması',message.guild.iconURL({dynamic: true}))
.setTitle('**Bu Sunucuya En Çok Kalp Atan Kişiler**')
.setDescription(`
${SonuçDB ? SonuçDB:'Kimse (Henüz) Kalp Atanların 💖'}`)
.setFooter(message.author.tag,message.author.avatarURL({dynamic: true}))
.setTimestamp()
message.channel.send(PepeCode)
}

    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['top-kalp','Topkalp','top-oy','to'],
        permLevel: 0
      }

      exports.help = {
        name: 'Topoy',
        description: 'Top BOT',
        usage: 'top'
      }
