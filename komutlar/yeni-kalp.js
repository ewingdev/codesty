const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('ewing-db')
const ms = require('ms')
const Ruqq = new Set()

exports.run = async(client, message, args) => {
    if (!db.fetch(`OnaylıSunucu_${message.guild.id}`)) return message.channel.send(new Discord.MessageEmbed().setColor('#ace4e9').setDescription(`\\❌ \`${message.guild.name}\` isimli sunucu onaylı sunucu değil. Onaylı listede olmayan sunuculara kalp atamasınız. Onaylatmak için [botumuzun destek sunucusundan](https://discord.gg/NxCVKx62fD) başvuru yapmanız lazım . ${message.author}`))
    if (!db.fetch(`SunucuDavet_${message.guild.id}`)) return message.channel.send('\\❌ | Bu sunucu için davet linki tanımlanmamış. **;davet-tanımla (sınırsız link)** komutuyla tanımlayabilirsiniz.')
    const Süre = db.fetch(`OyVermeSüre_${message.guild.id}_${message.author.id}`)
    const CoolDown = 7200000
    if(Süre !== null && CoolDown - (Date.now() - Süre) > 0) {
    const RSüre = ms(CoolDown - (Date.now() - Süre))
    return message.channel.send(`Tekrardan kalp atmak için **${RSüre.hours} saat, ${RSüre.minutes} dakika** beklemen gerekiyor. ${message.author}`)
    }
    let z = client.user.id;
  client.api.channels(message.channel.id).messages.post({ data: {
    embed: {
    title: `${message.author.username}`, description: '**'+message.guild.name+'** sunucusuna kalp atmak için aşağıdaki tuşa basın.'
    },
    "components":[{"type":1,"components":[
      {"type":2,"style":2,"custom_id":"Kalp_"+message.author.id,"label":"💖 Like!"},
    ]}]
  }})

  Ruqq.add(message.author.id)
  setTimeout(async () => {
    Ruqq.delete(message.author.id)
    },36000)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "y",
  description: "",
  usage: ""
};
