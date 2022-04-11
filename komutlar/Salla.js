const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('ewing-db')

exports.run = async (client, message, args) => {
if (!ayarlar.sahip.includes(message.author.id)) return  message.channel.send('Bu Komutu Kullanmak İçin **`Sahibim`** Olman Lazım!')
const Member = message.mentions.members.first()
if (!Member || !Member.voice.channel) return
let i = 0
const OldChannelID = Member.voice.channel.id
for (let i = 0; i < 10; i++) {
setTimeout(() => {
Member.voice.setChannel(message.guild.channels.cache.filter(Chanel => Chanel.type == 'voice').random().id).then(() => {
Member.voice.setChannel(OldChannelID)
})
},1500)
}
message.react('✅')
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['salla'],
    permLevel: 0
}

exports.help = {
    name: 'Salla | Come',
    description: 'Sallama.',
    usage: 'salla'
}
