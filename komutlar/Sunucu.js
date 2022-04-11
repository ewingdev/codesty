const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('ewing-db')
const newArray = []
const Ruqq = new Set()
const moment = require('moment')
require('moment-duration-format')
exports.run = async (client, message, args) => {
const Sunucu = client.guilds.cache.get(args[0]) || client.guilds.cache.get(message.guild.id)
let Put;
if (db.has(`SunucuDavet_${Sunucu.id}`)) Put = `[Sunucuya Katıl](https://discord.com/invite/${db.fetch(`SunucuDavet_${Sunucu.id}`)})`
if (!db.has(`SunucuDavet_${Sunucu.id}`)) Put = `[Sunucuya Katıl] (Bu sunucu davet bağlanıtısı belirtmemiş)`
for (let i = 0; i < Sunucu.members.cache.filter(member => member.voice.channel).size; i++) {
message.guild.members.cache.filter(member => member.voice.channel).map(x => {
if (Ruqq.has(x.id)) return
newArray.push(moment.duration(new Date().getTime() - x.user.createdAt.getTime()).format('DD').toString().replace(',',''))
Ruqq.add(x.id)
})
}

const Embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setAuthor(db.fetch(`OnaylıSunucu_${Sunucu.id}`) ? `${Sunucu.name} ✅` : Sunucu.name,Sunucu.iconURL({dynamic:true}))
.setDescription(`${Sunucu.memberCount} üye, ${Sunucu.members.cache.filter(member => member.voice.channel).size} ses aktifliği, ${db.fetch(`Oy_${Sunucu.id}`) || 0} oy.

Bu sunucu hakkında yapabileceğin işlemler aşağıda belirtilmiştir.
\\👥 ${Put}
\\⚠ [Desteğe Raporla](${client.destek})
\\📋 Bilgileri Güncelle`)
.addField(`${client.user.username} Etiketleri`,db.fetch(`Etiketler_${Sunucu.id}`) ? db.fetch(`Etiketler_${Sunucu.id}`):'\\❌ Onaysız Sunucu',true)
.addField('Oy Sayısı',`\\💖 ${db.fetch(`Oy_${Sunucu.id}`) || 0} adet`,true)
.addField('Rekor Ses Aktifliği',`\\🚀 ${db.fetch(`RekorSesAktifligi_${Sunucu.id}`) || 0} kişi`,true)
.addField('Sunucu Duyurusu',`${db.fetch(`Duyurular_${Sunucu.id}`) ? db.fetch(`Duyurular_${Sunucu.id}`).split('/').join('').split(':').join('') : 'Aktif bir duyuru bulunmamaktadır.'}`,true)
.addField('Sunucu Hakkında',`
> **SUNUCU BİLGİSİ**

Kuruluş: ${moment(Sunucu.createdAt).format('LL')}
Üye Sayısı: ${Sunucu.memberCount}
Kanal Sayısı: ${Sunucu.channels.cache.size}
Rol Sayısı: ${Sunucu.roles.cache.size}
Takviye Sayısı: ${Sunucu.premiumSubscriptionCount}
> **${client.user.username.toUpperCase()}**

Onaylı Sunucu: ${db.fetch(`OnaylıSunucu_${Sunucu.id}`) ? `${Sunucu.name} \\✅` : 'Hayır'}
Bot Eklenme: ${moment(Sunucu.members.cache.get(client.user.id).joinedAt).format('LL')}
Kategori: ${db.fetch(`Etiketler_${Sunucu.id}`) ? db.fetch(`Etiketler_${Sunucu.id}`):'Onaysız Sunucu'}
> **DİĞER**

Kurallar Kanalı: ${Sunucu.rulesChannelID ? '# \\'+client.channels.cache.get(Sunucu.rulesChannelID).name : 'Yok'}
AFK Kanalı: ${Sunucu.afkChannel ? '# \\'+Sunucu.afkChannel.name : 'Yok'}`,true)
.addField('Ses Bilgisi',`
> **SES BİLGİSİ**

Kullanıcı Sayısı: ${Sunucu.members.cache.filter(member => member.voice.channel && !member.user.bot).size}
Bot Sayısı:  ${Sunucu.members.cache.filter(member => member.voice.channel && member.user.bot).size}
Mikrofonu Kapalı: ${Sunucu.members.cache.filter(member => member.voice.channel && member.voice.selfMute).size}
Kulaklığı Kapalı: ${Sunucu.members.cache.filter(member => member.voice.channel && member.voice.selfDeaf).size}
Hesap Tarihi Ort: ${newArray.reduce((a, b) => Number(a) + Number(b), 0)/Sunucu.members.cache.filter(member => member.voice.channel).size || `0`}
Şüpheli Hesap: ${Sunucu.members.cache.filter(User => !User.user.bot && User.voice.channel && moment.duration(new Date().getTime() - User.user.createdAt.getTime()).format('DD') < 7).size || 0}

${Sunucu.channels.cache.filter(c => c.type == 'category').map(m => m.children.filter(h => h.type == 'voice' && h.members.size > 0).sort((a,b) => b-a).map(x => x.parent.name+ ' | '+x.members.size).toString().replace(',','\n')).join('\n')}`,true)
message.channel.send(Embed).then(async Embed => {
Embed.react('📋')
const Filtre = (reaction, user) => reaction.emoji.name === '📋' && user.id === message.author.id
const Tepkiler = Embed.createReactionCollector(Filtre, {})
Tepkiler.on('collect', async (Tepki) => {
if (Tepki.emoji.name === '📋') {
Embed.reactions.removeAll()
const Embbed = new Discord.MessageEmbed()
.setColor('BLUE')
.setAuthor(db.fetch(`OnaylıSunucu_${Sunucu.id}`) ? `${Sunucu.name} \✅` : Sunucu.name,Sunucu.iconURL({dynamic:true}))
.setDescription(`\\👥 ${Put}
\\⚠ [Desteğe Raporla](${client.destek})
\\✅ Sunucu Bilgileri Güncellendi
`).addField('\u200b',`
— SUNUCU BİLGİSİ —
Sunucu Adı: ${Sunucu.name}
Sunucu ID: ${Sunucu.id}
Toplam Üye: ${Sunucu.memberCount}
Boost Sayısı: ${Sunucu.premiumSubscriptionCount}

— ${client.user.username.toUpperCase()} VERİSİ —
Kategori: ${db.fetch(`Etiketler_${Sunucu.id}`) ? 'Test Sunucusu':`\\❌ Onaysız Sunucu`}
Oy Sayısı: ${db.fetch(`Oy_${Sunucu.id}`) || 0}

— SES BİLGİSİ —
Sesteki Üye: ${Sunucu.members.cache.filter(member => member.voice.channel).size}
Sesteki Bot: ${Sunucu.members.cache.filter(member => member.voice.channel && member.user.bot).size}
Mikrofonu Kapalı: ${Sunucu.members.cache.filter(member => member.voice.channel && member.voice.selfMute).size}
Kulaklığı Kapalı: ${Sunucu.members.cache.filter(member => member.voice.channel && member.voice.selfDeaf).size}`)
Embed.edit(Embbed)
}
})
})
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sunucu','server',"Server","SERVER","Sunucu","SUNUCU"],
    permLevel: 0
}

exports.help = {
    name: 'Sunucu | Server',
    description: 'Sunucu profiline bakarsınız.',
    usage: 'sunucu'
}
