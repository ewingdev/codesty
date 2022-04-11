const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('ewing-db')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')

exports.run = async (client, message, args) => {
if (!ayarlar.sahip.includes(message.author.id)) return message.channel.send('Bu Komutu Kullanmak İçin **`Sahibim`** Olman Lazım!')
if (args[0] == 'çıkart') {
message.channel.send('BOT Bakımdan Çıkartıldı!')
db.delete('Bakım')
} else {
const Tarih = moment().format('Do MMMM YYYY, H:MM:SS')
const Sebep = args.slice(0).join(' ')
if (!Sebep) return message.channel.send('Lütfen Bir Sebep Giriniz!')
message.channel.send(`BOT \`${Sebep}\` Sebebiyle Bakıma Alındı! `)
db.set('Bakım',{Sebep:Sebep, Alan: message.author.tag, Tarih: Tarih})

}
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bakım'],
    permLevel: 0
  }

  exports.help = {
    name: 'Bakım',
    description: 'Botuma Bakıma Alır.',
    usage: 'bakım'
  }
