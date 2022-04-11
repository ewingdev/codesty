const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('ewing-db')
const ms = require('ms')
const Ruqq = new Set()
exports.run = async (client, message, args) => {
if (!db.fetch(`OnaylıSunucu_${message.guild.id}`)) return message.channel.send(new Discord.MessageEmbed().setColor('#ace4e9').setDescription(`\\❌ \`${message.guild.name}\` isimli sunucu onaylı sunucu değil. Onaylı listede olmayan sunuculara kalp atamasınız. Onaylatmak için [botumuzun destek sunucusundan](https://discord.gg/WBCqCYqFu8) başvuru yapmanız lazım . ${message.author}`))
if (!db.fetch(`SunucuDavet_${message.guild.id}`)) return message.channel.send('\\❌ | Bu sunucu için davet linki tanımlanmamış. **;davet-tanımla (sınırsız link)** komutuyla tanımlayabilirsiniz.')
const Süre = db.fetch(`OyVermeSüre_${message.guild.id}_${message.author.id}`)
const CoolDown = 7200000
if(Süre !== null && CoolDown - (Date.now() - Süre) > 0) {
const RSüre = ms(CoolDown - (Date.now() - Süre))
return message.channel.send(`Tekrardan kalp atmak için **${RSüre.hours} saat, ${RSüre.minutes} dakika** beklemen gerekiyor. ${message.author}`)
}
const Embed = new Discord.MessageEmbed()
.setColor('#ace4e9')
.setAuthor(message.author.username,message.author.avatarURL({dynamic: true}))
message.channel.send(Embed.setDescription('**'+message.guild.name+'** sunucusuna Kalp atmak için **30** saniye içerisinde 💖 tepkisine basarak tıklayın')
.setFooter('?top kalp ile sunucuları keşfet.')).then(Embed => {
Embed.react('💖')
const filter = (reaction, user) => {
return reaction.emoji.name === '💖' && user.id === message.author.id
}
const collector = Embed.createReactionCollector(filter, { time: 30000 })
collector.on('collect', (reaction, user) => {
if (Ruqq.has(message.author.id)) return
db.add(`Oy_${message.guild.id}`,1)
db.set(`OyVermeSüre_${message.guild.id}_${message.author.id}`, Date.now())
Ruqq.add(message.author.id)
db.set(`SonOy_${message.author.id}`,message.guild.id)
db.add(`KullanıcıOy_${message.author.id}`,1)
db.add(`EnÇokOyVerdiğiSunucu_${message.author.id}_${message.guild.id}`,1)
const Embbed = new Discord.MessageEmbed()
.setColor('#ace4e9')
.setAuthor(message.author.username,message.author.avatarURL({dynamic: true}))
.setDescription(`Başarıyla **${message.guild.name}** sunucusuna Kalp attınız.💖
Sunucuda toplam **${db.fetch(`Oy_${message.guild.id}`)}** kalp atılmış! Bunlardan **${db.fetch(`EnÇokOyVerdiğiSunucu_${message.author.id}_${message.guild.id}`) ? db.fetch(`EnÇokOyVerdiğiSunucu_${message.author.id}_${message.guild.id}`) : 1}** tanesi sana ait!`)
.setFooter(`?top ile ses sıralamasını gör.`)
Embed.edit(Embbed)
if (!db.has(`AyrıSunucu_${message.guild.id}_${message.author.id}`)) db.add(`AyrıSunucu_${message.author.id}`,1),db.set(`AyrıSunucu_${message.guild.id}_${message.author.id}`,true)
if (db.has(`Hedefler_${message.guild.id}_${db.fetch(`EnÇokOyVerdiğiSunucu_${message.author.id}_${message.guild.id}`)}`) && !message.member.roles.cache.has(db.fetch(`Hedefler_${message.guild.id}_${db.fetch(`EnÇokOyVerdiğiSunucu_${message.author.id}_${message.guild.id}`)}`))) return message.channel.send(Embbed.setDescription(`Tebrikler! **${db.fetch(`EnÇokOyVerdiğiSunucu_${message.author.id}_${message.guild.id}`)}** tane kalp attığınız için sunucuda ayarlanmış olan \`${message.guild.roles.cache.find(Rol => Rol.id == db.fetch(`Hedefler_${message.guild.id}.${db.fetch(`EnÇokOyVerdiğiSunucu_${message.author.id}_${message.guild.id}`)}`)).name}\` rolünü başarıyla elde ettin.`)),message.guild.members.cache.get(message.author.id).roles.add(db.fetch(`Hedefler_${message.guild.id}_${db.fetch(`EnÇokOyVerdiğiSunucu_${message.author.id}_${message.guild.id}`)}`))
let x = db.all().filter(x => x.ID.startsWith(`Hedefler_${message.guild.id}_`))
for (y in x) {
if (db.fetch(`EnÇokOyVerdiğiSunucu_${message.author.id}_${message.guild.id}`) >= x[y].ID.slice(28) && !message.member.roles.cache.has(db.fetch(`Hedefler_${message.guild.id}_${x[y].ID.slice(28)}`))) message.channel.send(Embbed.setDescription(`Tebrikler! **${db.fetch(`EnÇokOyVerdiğiSunucu_${message.author.id}_${message.guild.id}`)}** tane kalp atığınız için sunucuda ayarlanmış olan \`${message.guild.roles.cache.find(Rol => Rol.id == db.fetch(`Hedefler_${message.guild.id}_${x[y].ID.slice(28)}`)).name}\` rolünü elde ettin.`)),message.guild.members.cache.get(message.author.id).roles.add(db.fetch(`Hedefler_${message.guild.id}_${x[y].ID.slice(28)}`))
}
})

collector.on('end', collected => {
if (Ruqq.has(message.author.id)) return
if (collected.size <= 0) return message.channel.send(new Discord.MessageEmbed().setColor('#ace4e9').setDescription(`Belirlenen süre içinde Kalp tepkisine basmadığınızdan dolayı işlem iptal edilmiştir. Komutu tekrar kullanarak kalp atabilirsiniz.`))
})
setTimeout(async () => {
Ruqq.delete(message.author.id)
},36000)
})
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['oy','vote',"Oy","oY","OY","LİKE","Like","Kalp","KALP","star","Star","STAR","kalp","like"],
    permLevel: 0
}

exports.help = {
    name: 'Kalp | Heart',
    description: 'Sunucuya oy vermeye yarar.',
    usage: 'oy'
}
