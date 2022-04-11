const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('ewing-db')
const Data = new Set()
const moment = require('moment')
require('moment-duration-format')
exports.run = async (client, message, args) => { // Onaylı Olmak Zorunda
if (args[0] == 'kalp') {
const Sıralama = db.all().filter(data => data.ID.startsWith(`Oy_`)).sort((a,b) => b.data - a.data)
Sıralama.length = 10
let SonuçDB = ''
const PepeCode = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('💖 Kalp Sıralaması 💖')
.setDescription(`Kullanıcıların en sevdiği, aldığı destek ile fark yaratan sunucular gösterilmektedir. Sunucunuza etiket eklemek için __**${ayarlar.prefix}etiket ekle**__ komutunu kullanınız.

"Tüm Sunucular" Sıralaması`)
for (var i in Sıralama) {
PepeCode.addField(`> ${client.guilds.cache.get(Sıralama[i].ID.slice(3))?client.guilds.cache.get(Sıralama[i].ID.slice(3)).name+' \n(`'+client.guilds.cache.get(Sıralama[i].ID.slice(3)).id+'`)':'Bilinmiyor'}
${client.guilds.cache.get(Sıralama[i].ID.slice(3))?client.guilds.cache.get(Sıralama[i].ID.slice(3)).memberCount:'Bilinmiyor'} üye, ${client.guilds.cache.get(Sıralama[i].ID.slice(3))?client.guilds.cache.get(Sıralama[i].ID.slice(3)).members.cache.filter(Member => Member.voice.channel).size:'Bilinmiyor'} ses`,`\\💖 ${db.fetch(`Oy_${client.guilds.cache.get(Sıralama[i].ID.slice(3))?client.guilds.cache.get(Sıralama[i].ID.slice(3)).id:'831158424917901322'}`)}
Sunucu, ${Sıralama.indexOf(Sıralama[i])+1}.sırada`,true)
}

message.channel.send(PepeCode)

} else {
let OutPut = ''
for (let i = 0; i < 15; i++) {
client.guilds.cache.filter(Server => Server.members.cache.filter(member => member.voice.channel && !member.user.bot).size > 0).sort((a,b) => b.members.cache.filter(member => member.voice.channel && !member.user.bot).size - a.members.cache.filter(member => member.voice.channel && !member.user.bot).size).map(async Sunucu => {
if (Data.has(Sunucu.id)) return
Data.add(Sunucu.id)
i++
OutPut += `**${i}.** » ${Sunucu.name}(\`${Sunucu.id}\`)${client.emojis.cache.get('903668970815635497')}(${Sunucu.members.cache.filter(member => member.voice.channel && !member.user.bot).size} \\🔉)\n`
})
}

const Embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle(`Ses Aktifliği Sıralaması`)
.setDescription(`Kategorilerde sadece **Onaylı Sunucular \\✅** yer almaktadır. Sunucunuzu onaylatmak ve daha fazla bilgi için [Destek Sunucumuza](${client.destek}) katılın.

${OutPut || '`¯\_(ツ)_/¯`'}
`)
message.channel.send(Embed).then(() => {
client.guilds.cache.forEach(server => {
Data.delete(server.id)
})
})
}
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['top'],
    permLevel: 0
}

exports.help = {
    name: 'Top',
    description: 'En çok listesine bakarsınız.',
    usage: 'top'
}
