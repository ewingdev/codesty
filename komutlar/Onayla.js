const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('ewing-db')
const newArray = []
exports.run = async (client, message, args) => {
     if (!ayarlar.destek.includes(message.author.id)) return  message.channel.send('Bu Komutu Kullanmak İçin **`Desktek Ekibinde`** Olman Lazım!')
client.guilds.cache.sort((a,b) => b.memberCount - a.memberCount).array().filter(Sunucu => {
if(!db.has(`OnaylıSunucu_${Sunucu.id}`)) newArray.push(Sunucu.id)
})
if (newArray.length < 1) return message.channel.send('Bütün sunucular onaylı!')
let Page = 0
const Embed = new Discord.MessageEmbed()
.setColor('RED')
.setDescription(`
> Sunucu: \`${client.guilds.cache.get(newArray[Page]).name}\`
> Üye Sayısı: \`${client.guilds.cache.get(newArray[Page]).memberCount}\`
> Durum: \`${db.fetch(`OnaylıSunucu_${newArray[Page]}`) ? 'Onaylı': 'Onaysız'}\`
`)
message.channel.send(Embed).then(async Message => {
await Message.react('⬅️')
await Message.react('🟩')
await Message.react('➡️')
const filter = (reaction, user) => {return (['⬅️','🟩','➡️'].includes(reaction.emoji.name) && user.id === message.author.id && reaction.users.remove(message.author.id))}
const collector = Message.createReactionCollector(filter, {time: 120000})
collector.on('collect', (reaction, user) => {
if (reaction.emoji.name == '⬅️') {
if (Page == 0) return
--Page
let Color;
if (db.fetch(`OnaylıSunucu_${newArray[Page]}`) == true) Color = 'GREEN'
else Color = 'RED'
Message.edit(Embed.setColor(Color).setDescription(`
> Sunucu: \`${client.guilds.cache.get(newArray[Page]).name}\`
> Üye Sayısı: \`${client.guilds.cache.get(newArray[Page]).memberCount}\`
> Durum: \`${db.fetch(`OnaylıSunucu_${newArray[Page]}`) ? 'Onaylı': 'Onaysız'}\`
`))
}
if (reaction.emoji.name == '🟩') {
db.set(`OnaylıSunucu_${newArray[Page]}`,true)
Message.edit(Embed.setColor('GREEN').setDescription(`
> Sunucu: \`${client.guilds.cache.get(newArray[Page]).name}\`
> Üye Sayısı: \`${client.guilds.cache.get(newArray[Page]).memberCount}\`
> Durum: \`Onaylandı\`
`))
}
if (reaction.emoji.name == '➡️') {
if (Page == newArray.length) return
++Page
if (db.fetch(`OnaylıSunucu_${newArray[Page]}`) == true) Color = 'GREEN'
else Color = 'RED'
Message.edit(Embed.setColor(Color).setDescription(`
> Sunucu: \`${client.guilds.cache.get(newArray[Page]).name}\`
> Üye Sayısı: \`${client.guilds.cache.get(newArray[Page]).memberCount}\`
> Durum: \`${db.fetch(`OnaylıSunucu_${newArray[Page]}`) ? 'Onaylı': 'Onaysız'}\`
`))
}
})
})

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['onayla','confirm','ONAYLA','Onayla','Confirm','CONFIRM'],
    permLevel: 0
}

exports.help = {
    name: 'Onayla | Confirm',
    description: 'Sunucu onaylamak.',
    usage: 'onayla'
}
