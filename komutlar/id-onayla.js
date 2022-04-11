const Discord = require("discord.js");
const db = require('ewing-db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
    if (!ayarlar.destek.includes(message.author.id)) return  message.channel.send('Bu Komutu Kullanmak İçin **`Desktek Ekibinde`** Olman Lazım!')
    const Sunucu = client.guilds.cache.get(args[0])
    if(!args[0]) return  message.channel.send(`\\❌ Onaylamak istediğin sunucunun ID'sini girmelisin.`)
    db.set(`OnaylıSunucu_${Sunucu.id}`,true)
    message.channel.send(`\\✅ \`${Sunucu.name}\` isimli sunucu onaylandı. `)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['id-onayla'],
    permLevel: 0
}

exports.help = {
    name: 'ID Onayla',
    description: 'ID ile Sunucu onaylamak.',
    usage: 'id-onayla'
}
