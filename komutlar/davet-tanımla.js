const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('ewing-db')
const fetch = require('node-fetch')
const moment = require('moment')
require('moment-duration-format')
exports.run = async (client, message, args) => {
if (!message.member.hasPermission('ADMINISTARTOR')) return
const Linkk = args[0]
if (!Linkk) return message.channel.send('\\❌ Davet bağlantısı belirtip tekrar dene!')
const Link = Linkk.split('https://').join('').split('discord.com/invite').join('').split('discord.gg/').join('')
const req = fetch(`https://discordapp.com/api/v6/invite/${Link}`).then(res => res.json()).then(json => {
if (json.message == 'Unknown Invite' && json.code == 10006) return message.channel.send('\\❌ Belirttiğiniz davet linki geçersiz.')
if (json.guild.id !== message.guild.id) return message.channel.send(`\\❌ Girmiş olduğunuz davet bağlantısı \`${message.guild.name}\` sunucusu ile uyuşmamaktadır.\`${message.guild.name}\` sunucusuna yönlendiren bir davet bağlantısı girerek tekrar dene!`)
if (json.guild.id === message.guild.id) { message.channel.send(`\\⚙️ Başarıyla \`${message.guild.name}\` sunucusu için davet kodu \`${Link}\` olarak kaydedildi.`)
db.set(`SunucuDavet_${message.guild.id}`,Link)
}
})
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['davet-tanımla','dt',"Dt","DAVET-TANIMLA","invite-define","İnvite-Define","Davet-Tanımla"],
    permLevel: 0
}

exports.help = {
    name: 'davet-tanımla | invite-define',
    description: 'Sunucu davet linkini ayarlarsınız.',
    usage: 'davet'
}
