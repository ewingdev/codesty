const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('ewing-db')

exports.run = async (client, message, args) => {
if(!ayarlar.sahip.includes(message.author.id)) return message.channel.send('Dostum! Bunu Sadece `Sahiplerimden Birisi` Yapabilir!')
if (args[0] == 'çıkart') {
const Mal = message.mentions.users.first() || client.users.cache.get(args[1])
if (!Mal) return message.channel.send('Lütfen Birisini Etiketle.')
const Dil = await db.fetch(`Dil_${Mal.id}`)
if (!db.fetch(`KaraListe_${Mal.id}`)) return message.channel.send('Kullanıcı Zaten Kara Listede Değil!')
const Revenge = new Discord.MessageEmbed()
.setColor('GREEN')
.setAuthor(Mal.tag,Mal.avatarURL({dynamic:true}))
.setDescription(`\`${Mal.tag}\` Kullanıcısı Beyaz Listeye Alındı!`)
message.channel.send(Revenge).then(x => x.delete({timeout: 7500}))
db.delete(`KaraListe_${Mal.id}`)
db.delete(`KaraListeYıl_${Mal.id}`)
db.delete(`KaraListeAy_${Mal.id}`)
db.delete(`KaraListeGün_${Mal.id}`)
db.delete(`KaraListeSaat_${Mal.id}`)
db.delete(`KaraListeDakika_${Mal.id}`)
db.delete(`KaraListeSaniye_${Mal.id}`)
db.delete(`KaraListeSebep_${Mal.id}`)
db.delete(`KaraAlan_${Mal.id}`)
if (Dil == 'en') {
client.users.cache.get(Mal.id).send(`You Are Moved To White List By \`${message.author.tag}\`! Now You Can Use Commands! https://discord.gg/NxCVKx62fD`).catch(Error => message.author.send(`\`${Mal.tag}\` Kullanıcısı Beyaz Listeye Aldın Ancak Özel Mesaj Kutusu Kapalı Olduğu İçin Mesaj Atamadım!`))
} else {
client.users.cache.get(Mal.id).send(`\`${message.author.tag}\` Tarafından Beyaz Listeye Alındın! Artık Komutları Kullanabilirsin! https://discord.gg/NxCVKx62fD`).catch(Error => message.author.send(`\`${Mal.tag}\` Kullanıcısı Beyaz Listeye Aldın Ancak Özel Mesaj Kutusu Kapalı Olduğu İçin Mesaj Atamadım!`))
}
} else {
const Tarih = new Date()
const Mal = message.mentions.users.first() || client.users.cache.get(args[0])
if (!Mal) return message.channel.send('Lütfen Birisini Etiketle.')
const Dil = await db.fetch(`Dil_${Mal.id}`)
let KSebep;
const Sebep = args.slice(1).join(' ')
if (!Sebep) KSebep = 'Unknown'
if (Sebep) KSebep = Sebep
const Aventadoria = new Discord.MessageEmbed()
.setColor('ORANGE')
.setTitle('⚠ Hata')
.setDescription(`Bu Kullanıcı Zaten \`${db.fetch(`KaraAlan_${Mal.id}`)}\`Tarafından **\`${db.fetch(`KaraListeSaat_${Mal.id}`)}:${db.fetch(`KaraListeDakika_${Mal.id}`)}:${db.fetch(`KaraListeSaniye_${Mal.id}`)} ${db.fetch(`KaraListeGün_${Mal.id}`)}.${db.fetch(`KaraListeAy_${Mal.id}`)}.${db.fetch(`KaraListeYıl_${Mal.id}`)}\`** Tarihinde \`${db.fetch(`KaraListeSebep_${Mal.id}`)}\` Sebebiyle Kara Listeye Alınmış!`)
if (await db.has(`KaraListe_${Mal.id}`)) return message.channel.send(Aventadoria)
const Revenge = new Discord.MessageEmbed()
.setColor('GREEN')
.setAuthor(Mal.tag,Mal.avatarURL({dynamic:true}))
.setDescription(`\`${Mal.tag}\` Kullanıcısı \`${KSebep}\` Sebebiyle Kara Listeye Alındı!`)
message.channel.send(Revenge).then(x => x.delete({timeout: 7500}))
db.set(`KaraListe_${Mal.id}`,true)
db.set(`KaraListeYıl_${Mal.id}`,Tarih.getFullYear())
db.set(`KaraListeAy_${Mal.id}`,Tarih.getMonth())
db.set(`KaraListeGün_${Mal.id}`,Tarih.getDay())
db.set(`KaraListeSaat_${Mal.id}`,Tarih.getHours())
db.set(`KaraListeDakika_${Mal.id}`,Tarih.getMinutes())
db.set(`KaraListeSaniye_${Mal.id}`,Tarih.getSeconds())
db.set(`KaraListeSebep_${Mal.id}`,KSebep)
db.set(`KaraAlan_${Mal.id}`,message.author.tag)
if (Dil == 'en') {
client.users.cache.get(Mal.id).send(`You Are Moved To Black List By \`${message.author.tag}\`! Reason: \`${KSebep}\`. If You Think we're Wrong Come and Speak with Us! https://discord.gg/NxCVKx62fD`).catch(Error => message.author.send(`\`${Mal.tag}\` Kullanıcısı Kara Listeye Aldın Ancak Özel Mesaj Kutusu Kapalı Olduğu İçin Mesaj Atamadım!`))
} else {
client.users.cache.get(Mal.id).send(`\`${message.author.tag}\` Tarafından \`${KSebep}\` Sebebiyle Kara Listeye Alındın! Eğer Bir Hatamız Var İse https://discord.gg/NxCVKx62fD`).catch(Error => message.author.send(`\`${Mal.tag}\` Kullanıcısı Kara Listeye Aldın Ancak Özel Mesaj Kutusu Kapalı Olduğu İçin Mesaj Atamadım!`))
}
}
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kara-liste','karaliste','kl'],
    permLevel: 0
  }

  exports.help = {
    name: 'Kara Liste',
    description: 'Kullanıcıyı Kara Listeye Alır.',
    usage: 'kl'
  }
