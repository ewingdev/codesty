const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('ewing-db')

exports.run = async (client, message, args) => {
if (!message.member.hasPermission('MANAGE_GUILD')) return;
const Rol = message.mentions.roles.first()
if (!Rol) return message.channel.send('\\❌ Bir rol etiketlemelisiniz')
if (Rol.position >= message.guild.me.roles.highest.position) return message.channel.send('\\❌ Belirlenen rol benim yukarımda! Lütfen yetkilerimi kontrol edin.')
const Hedef = args[1]
if (isNaN(args[1])) return message.channel.send('\\❌ Lütfen bir hedef sayısı girin.')
message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`Artık **${Hedef}** oy sayısına ulaşana ${Rol} rolünü vereceğim.`))
db.set(`Hedefler_${message.guild.id}_${Hedef}`,Rol.id)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['hedef', 'target'],
    permLevel: 0
}

exports.help = {
    name: 'Hedef | Target',
    description: 'Hedef ayarlamacalar s.',
    usage: 'hedef'
}
