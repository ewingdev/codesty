const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('ewing-db')

exports.run = async (client, message, args) => {
const Sıralama = db.all().filter(Data => Data.ID.startsWith(`EnÇokOyVerdiğiSunucu_${message.author.id}_`)).sort((a,b) => b.data - a.data)
const Embed = new Discord.MessageEmbed()
.setColor('#171819')
.setAuthor(message.author.tag,message.author.avatarURL({dynamic:true}))
.setDescription(`Kuzllanıcının şu ana kadar verdiği kalpler sıralanmaktadır. Kullanıcı **${db.fetch(`AyrıSunucu_${message.author.id}`) || 0}** ayrı sunucuya toplamda **${db.fetch(`KullanıcıOy_${message.author.id}`) || 0}** kalp atmış. En çok kalp atığı sunucular:

${db.all().filter(Data => Data.ID.startsWith(`EnÇokOyVerdiğiSunucu_${message.author.id}_`)).sort((a,b) => b.data - a.data).splice(0, 10).map((item, index) =>
`${db.fetch(`EnÇokOyVerdiğiSunucu_${message.author.id}_${Sıralama[index].ID.slice(22+message.author.id.length)}`)} kalp **• ${client.guilds.cache.get(Sıralama[index].ID.slice(22+message.author.id.length))?client.guilds.cache.get(Sıralama[index].ID.slice(22+message.author.id.length)).name:'Bilinmiyor'}**`).join("\n")}

Kullanıcı en son **__${client.guilds.cache.get(db.fetch(`SonOy_${message.author.id}`))?client.guilds.cache.get(db.fetch(`SonOy_${message.author.id}`)).name:'Bilinmiyor'}__** sunucusuna kalp atmış.
`)
message.channel.send(Embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['oylarım','votes','Oylarım','Votes',"OYLARIM","VOTES","Kalplerim","kalplerim"],
    permLevel: 0
}

exports.help = {
    name: 'Oylarım | Votes',
    description: 'Oy verdiğiniz sunucular.',
    usage: 'oylarım'
}
