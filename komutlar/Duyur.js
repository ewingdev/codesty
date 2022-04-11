const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('ewing-db')

exports.run = async (client, message, args) => {
if (!message.member.hasPermission('ADMINISTARTOR')) return
const Duyuru = args.slice(0).join(' ')
if (!Duyuru) return message.channel.send(`❌ Duyuru argümanları yerleştirerek tekrar dene!`).then(Mesaj => Mesaj.delete({timeout:10000}))
message.channel.send(`\\✅ Belirttiğiniz \`${message.guild.name}\` isimli sunucuya başarıyla \`${Duyuru}\` içeriğiyle duyuru yapıldı.`)
db.set(`Duyurular_${message.guild.id}`,Duyuru)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['duyur','duyuru','announcment','Duyur','Duyuru','Announcment',"DUYUR","DUYURU","ANNOUNCMENT"],
    permLevel: 0
}

exports.help = {
    name: 'Duyur | Announcment',
    description: 'Sunucu duyurusu atarsınız.',
    usage: 'duyuru'
}
