
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('ewing-db')
const moment = require('moment')
require('moment-duration-format')

exports.run = async (client, message, args) => {
let Userr;
if (message.mentions.members.first()) Userr = message.mentions.members.first().id
if (args[0] && isNaN(Userr)) Userr = args[0]
if (!Userr) Userr = message.author.id
client.users.fetch(Userr).then((User) => {
let AddField;
if (ayarlar.geliştiriciler.includes(User.id)) AddField = `${User.bot ? `${User.tag} \\🤖 && ${client.emojis.cache.get('903668970815635497')}

\\🤖 » Discord Botu
${client.emojis.cache.get('903668970815635497')} » ${client.user.username} Geliştiricisi` : `${User.tag} ${client.emojis.cache.get('903668970815635497')}

${client.emojis.cache.get('903668970815635497')} » ${client.user.username} Geliştiricisi`}`
if (!ayarlar.geliştiriciler.includes(User.id)) AddField = `${User.bot ? `${User.tag} \\🤖

\\🤖 » Discord Botu` : User.tag}`
const Embed = new Discord.MessageEmbed()
.setColor(message.guild.me.roles.highest.hexColor)
.setAuthor(User.tag,User.avatarURL({dynamic:true}))
.addField('Discord Etiketi',AddField,true)
.addField('Sahibi Olduğu Onaylı Sunucular',client.guilds.cache.filter(Sunucu => Sunucu.ownerID == User && db.fetch(`OnaylıSunucu_${Sunucu.id}`) == true).sort((a,b) => a-b).map(Sunucu =>
`${client.guilds.cache.get(Sunucu.id).name}
${client.guilds.cache.get(Sunucu.id).memberCount} üye`).join('\n') || 'Sahibi olduğu onaylı sunucu bulunmamaktadır.',true)
.addField('Hesap Oluşturulma',`${moment(User.createdAt).format('LL')} \`(${moment.duration(new Date().getTime() - User.createdAt.getTime()).format('DD').toString().replace(',','')} gün)\``,true)
.setThumbnail(User.avatarURL({dynamic:true}))
.setFooter(`Kullanıcı ID: ${User.id}`)
message.channel.send(Embed)
})
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['profil','profile',"Userinfo","kb","userinfo","kullanıcı-bilgi","kullanıcıbilgi",'Profil','Profile',"Kb","USERİNFO","Kullanıcı-bilgi","Kullanıcıbilgi"],
    permLevel: 0
}

exports.help = {
    name: 'Profil | Profile',
    description: 'Profilinize bakmanıza yarar.',
    usage: 'profil'
}
