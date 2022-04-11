const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('ewing-db')
const Ruqq = new Set()
const moment = require('moment')
require('moment-duration-format')

exports.run = async (client, message, args) => {
if (!message.member.hasPermission('ADMINISTRATOR')) return
const Choose = args[0]
const Etiketler = db.fetch(`Etiketler_${message.guild.id}`)
if (!Choose) return message.channel.send(`${message.author}, örnek kullanım: \`${ayarlar.prefix}etiket <ekle/sil/liste>\``).then(Mesaj => Mesaj.delete({timeout: 10000}))
if (Choose == 'ekle' || Choose == 'add') {
if (Etiketler && Etiketler.length > 2) return message.channel.send('Zaten sunucunuza 2 tane etiket eklemişsiniz, lütfen bir etiketi silip daha sonra eklemeyi deneyin.')
message.channel.send(`Merhaba, sunucun için 2 tane etiket seçebilirsin. İşte seçebileceğin etiketler:

1 **• Public/Tag** Sunucusu
2 **• Ekip** Sunucusu
3 **• Anime** Sunucusu
4 **• Müzisyen/Şarkı** Sunucusu
5 **• Oyun** Sunucusu
6 **• Sohbet** Sunucusu
7 **• Yazılım/Teknoloji** Sunucusu
8 **• Sanat/Tasarım** Sunucusu
9 **• Fan/Sosyal Medya** Sunucusu

Seçmek için istediğiniz etiketin karşılığı olan sayıyı veya etiketin tam adını yazabilirsiniz.
İşlem **30 Saniye** sonra otomatik olarak iptal edilecektir.
Not: Her 30 saniyede bir bu komutu kullana bilirsiniz`)
const filter = Message => Message.author.id === message.author.id
const collector = message.channel.createMessageCollector(filter, {time: 30000 , limit: 1})
collector.on('collect', collected => {
    if (Ruqq.has(message.author.id)) return
    if (collected.content === '1') return message.channel.send(`Etiketlerinize başarıyla **Public/Tag** etiketi eklendi.`),db.push(`Etiketler_${message.guild.id}`,'Public/Tag'),Ruqq.add(message.author.id)
    if (collected.content === '2') return message.channel.send(`Etiketlerinize başarıyla **Ekip** etiketi eklendi.`),db.push(`Etiketler_${message.guild.id}`,'Ekip'),Ruqq.add(message.author.id)
    if (collected.content === '3') return message.channel.send(`Etiketlerinize başarıyla **Anime** etiketi eklendi.`),db.push(`Etiketler_${message.guild.id}`,'Anime'),Ruqq.add(message.author.id)
    if (collected.content === '4') return message.channel.send(`Etiketlerinize başarıyla **Müzisyen/Şarkı** etiketi eklendi.`),db.push(`Etiketler_${message.guild.id}`,'Müzisyen/Şarkı'),Ruqq.add(message.author.id)
    if (collected.content === '5') return message.channel.send(`Etiketlerinize başarıyla **Oyun** etiketi eklendi.`),db.push(`Etiketler_${message.guild.id}`,'Oyun'),Ruqq.add(message.author.id)
    if (collected.content === '6') return message.channel.send(`Etiketlerinize başarıyla **Sohbet** etiketi eklendi.`),db.push(`Etiketler_${message.guild.id}`,'Sohbet'),Ruqq.add(message.author.id)
    if (collected.content === '7') return message.channel.send(`Etiketlerinize başarıyla **Yazılım/Teknoloji** etiketi eklendi.`),db.push(`Etiketler_${message.guild.id}`,'Yazılım/Teknoloji'),Ruqq.add(message.author.id)
    if (collected.content === '8') return message.channel.send(`Etiketlerinize başarıyla **Sanat/Tasarım** etiketi eklendi.`),db.push(`Etiketler_${message.guild.id}`,'Sanat/Tasarım'),Ruqq.add(message.author.id)
    if (collected.content === '9') return message.channel.send(`Etiketlerinize başarıyla **Fan/Sosyal Medya** etiketi eklendi.`),db.push(`Etiketler_${message.guild.id}`,'Fan/Sosyal Medya'),Ruqq.add(message.author.id)
    if (isNaN(collected.content) || !['1','2','3','4','5','6','7','8','9'].includes(collected.content)) return message.channel.send('Yazdığınız etiket listede bulunmuyor veya yanlış yazılmış. Lütfen tekrar deneyiniz.').then(Mesaj => Mesaj.delete({timeout: 10000}))
})
collector.on('end', collected => {
if (collected.size === '0') return message.channel.send(`Süre bitti! eklemek istediğiniz etiketi gereken sürede belirtmediğiniz için işlem iptal edildi. ${message.author}`).then(Mesaj => Mesaj.delete({timeout: 10000}))
})
setTimeout(async () => {
Ruqq.delete(message.author.id)
},31000)
} else {
if (Choose == 'liste' || Choose == 'list') {
if (!Etiketler) return message.channel.send(`Sunucunuza hiç etiket eklenmemiş, \`${ayarlar.prefix}etiket ekle\` komutu ile ekleyebilirsiniz.`).then(Mesaj => Mesaj.delete({timeout: 10000}))
message.channel.send(`Sunucunuzda **${Etiketler.join('**, **')}** olmak üzere toplamda **${db.fetch(`Etiketler_${message.guild.id}`).length}** etiket var.`)
}
}
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['etiket','tag','tags',"TAG","TAGS","ETİKET","Etiket","Tag","Tags"],
    permLevel: 0
}

exports.help = {
    name: 'Etiket | Tag',
    description: 'Sunucuya etiket eklemenize yarar.',
    usage: 'etiket'
}
