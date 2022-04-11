const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('ewing-db')
const Ruqq = new Set()
module.exports = async message => {
  let client = message.client
  let prefixes = ['?',',',`<@801032623220195369>`,`<@!${client.user.id}>`]
  let prefix = ayarlar.prefix
  for (var i = 0; i < prefixes.length; i++) {
  if (message.content.startsWith(prefixes[i])) prefix = prefixes[i]
  }
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return
  let command = message.content.split(' ')[0].slice(prefix.length)
  let params = message.content.split(' ').slice(1)
  let perms = client.elevation(message)
  let cmd

  if (client.commands.has(command)) {
    cmd = client.commands.get(command)
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command))
  }
  if (cmd) {
    const Bakım = db.fetch('Bakım')
    if (Bakım && !ayarlar.sahip.includes(message.author.id)) {
    const Dil = await db.fetch(`Dil_${message.author.id}`)
    return message.channel.send(new Discord.MessageEmbed().setColor('YELLOW').setTitle('⚠ Botu Şuanda Kullanamazsınız!').setDescription(`
    > ${client.user.username} Şuanda Bakımda!
    > Sebep: \`${Bakım.Sebep}\`
    > Bakıma Alan: \`${Bakım.Alan}\`
    > Bakıma Alınma Tarihi: \`${Bakım.Tarih}\`
    >
    > Detay İçin: [Tıkla!](https://discord.gg/NxCVKx62fD)`).setThumbnail(client.user.avatarURL()).setFooter(message.author.username,message.author.avatarURL({dynamic:true}))).then(Bakımda => Bakımda.delete({timeout: 15000}))
    }
    client.channels.cache.get('963194038985580594').send(
      new Discord.MessageEmbed()
      .setAuthor(message.author.username,message.author.avatarURL({dynamic: true}))
      .setDescription(`\`${message.author.username}\` adlı kullanıcı \`${command}\` komutunu kullandı.`)
      .addField(`**Sunucu Hakkında**`,`
    **Sunucu Adı:** \`${message.guild.name}\`
    **Sunucu ID:** \`${message.guild.id}\`
    **Kanal Adı:** \`#${message.channel.name}\`
      `)
      .addField(`**Kullanıcı Hakkında**`,`
    **Kullanıcı Adı:** \`${message.author.tag}\`
    **Kullanıcı ID:** \`${message.author.id}\`
    **Kullandığı Komut:** \`${command}\`
      `)
      .setColor('#7289AD')
      .setFooter('Servers+')
      .setTimestamp()
      .setThumbnail(message.author.avatarURL({dynamic: true}))
      )
    const KCheck = await db.fetch(`KaraListe_${message.author.id}`)
    const KaraListedesin = new Discord.MessageEmbed()
    .setColor('RED')
    .setAuthor('BOTU KULLANAMAZSIN!')
    .setThumbnail(message.author.avatarURL({dynamic:true}))
    .setDescription(`**Olamaz! Sen botun kara listesinde bulunuyorsun! Eğer kara listeden çıkmak istiyorsan [Destek Sunucusu](https://discord.gg/NxCVKx62fD) üzerinden sahibime ulaş!**`)
    .addField('**Alınma Tarihi:**',`**\`${db.fetch(`KaraListeSaat_${message.author.id}`)}:${db.fetch(`KaraListeDakika_${message.author.id}`)}:${db.fetch(`KaraListeSaniye_${message.author.id}`)} ${db.fetch(`KaraListeGün_${message.author.id}`)}.${db.fetch(`KaraListeAy_${message.author.id}`)}.${db.fetch(`KaraListeYıl_${message.author.id}`)}\`**`)
    .addField('**Alınma Sebebi:**',`**\`${db.fetch(`KaraListeSebep_${message.author.id}`)}\`**`)
    if (KCheck === true) return message.channel.send(KaraListedesin).then(Mesaj => Mesaj.delete({timeout: 15000}))

    if (message.author.avatarURL() == null || undefined) return message.channel.send(`${client.user.username}'yi kullanmak istiyorsan eğer bir avatarın olmalı!`)
    if (cmd.conf.enabled === false) {
       if (!ayarlar.sahip.includes(message.author.id) && !ayarlar.sahip.includes(message.author.id)) {
                 message.channel.send(`:x: **${cmd.help.name}** isimli komut şuanda geçici olarak kullanıma kapalıdır!`)
                 return
       }
     }

    const Check = db.fetch(`Kurallar_${message.author.id}`)
    const Ruqqq = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(client.user.username,client.user.avatarURL())
    .addField('Merhaba',`
    Merhaba sayın <@${message.author.id}> adlı üyemiz!
    Eğer ${client.user.username}yi kullanmak istiyorsan kurallarımızı kabul etmelisin! eğer kurallarımızı kabul etmezsen ${client.user.username}yu Kullanamazsın!`)
    .addField('Kurallar;',`
  1 - ${client.user.username}'nun herhangi bir şekilde altyapısını çıkarmaya çalışmamak,
  2 - Komut spamı yapmamak,
  3 - ${client.user.username} ve Kurucuları hakkında herhangi bir şekilde **Hakareti Küfür** gibi rahatsız edici davranışlarda bulunmamamak,
  4 - ${client.user.username}da herhangi bir hata ve ya açık bulup kullanmayıp direk yetkililere bildirmek,
  4 - Etrafta dolanan **Ben ${client.user.username}** botunun sahibiyim diye gezinen kişileri bildirmek
  5 - Karalisteye girecek hareketlerde bulunmamamak
  6 - Troll yapmamak

  Kurallarımız bunlardır eğer kurallarımızı kabul ediyorsanız ✅ emojisine tıklayın!`)
    .addField('Not:',`
  Kuralları kabul ederek sorumluluğu üzerinize alıyorsunuz.
  ${db.fetch('Kabul') || 1} Adet kişi kurallarımızı kabul etti!`)
    .setFooter(`Arwin+ © ${client.user.username} Bot 2021`,client.user.avatarURL())
    .setThumbnail(message.author.avatarURL({dynamic:true,size:2048}))
    if (!Check) return message.channel.send(Ruqqq).then(async(Embed) => {
    Embed.delete({timeout:20000})
    const Filtre = (reaction, user) => {
      return reaction.emoji.name === '✅' && user.id === message.author.id
    }
    Embed.react('✅')
    var Tepkiler = Embed.createReactionCollector(Filtre, {
    })
    Tepkiler.on('collect', async (Tepki) => {
    if (Tepki.emoji.name === '✅') {
    Embed.delete()
    message.channel.send(`<@${message.author.id}> Kurallarımızı kabul ettiniz! lütfen kurallarımıza uyun! iyi günler!`)
    db.set(`Kurallar_${message.author.id}`,true)
    db.add('Kabul',1)
    }
    })
    })
    if (Ruqq.has(message.author.id)) return
    Ruqq.add(message.author.id)
    setTimeout(() => {
    Ruqq.delete(message.author.id)
    },1000)
    if (perms < cmd.conf.permLevel) return

    cmd.run(client, message, params, perms)
  }
}
