const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const http = require('http')
const express = require('express')
const ayarlar = require('./ayarlar.json')
const app = express()
const db = require('ewing-db')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')
const Peppe = message => {
  console.log(`[ » ] ${message}`)
}
require('./util/eventLoader.js')(client)

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./komutlar/', (Error, Files) => {
    if (Error) console.error(Error)
    Peppe(`${Files.length} Komut Yüklenecek!`)
    Files.forEach(Pepe => {
        let Props = require(`./komutlar/${Pepe}`)
        Peppe(`Yüklenen Komut: ${Props.help.name}.`)
        client.commands.set(Props.help.name, Props)
        Props.conf.aliases.forEach(Alias => {
        client.aliases.set(Alias, Props.help.name)
})})})

client.reload = command => {
 return new Promise((Resolve, Reject) => {
 try {
 delete require.cache[require.resolve(`./komutlar/${command}`)]
 let CMD = require(`./komutlar/${command}`)
 client.commands.delete(command)
 client.aliases.forEach((CMD, Alias) => {
 if (CMD === command) client.aliases.delete(Alias)
 })
 client.commands.set(command, CMD)
 CMD.conf.aliases.forEach(Alias => {
 client.aliases.set(Alias, CMD.help.name)
 })
 Resolve()
 } catch (Hata) {
 Reject(Hata)
}})}

client.load = command => {
 return new Promise((Resolve, Reject) => {
 try {
 let CMD = require(`./komutlar/${command}`)
client.commands.set(command, CMD)
CMD.conf.aliases.forEach(Alias => {
client.aliases.set(Alias, CMD.help.name)
})
Resolve()
} catch (Hata) {
Reject(Hata)
}})}

client.unload = command => {
 return new Promise((Resolve, Reject) => {
 try {
 delete require.cache[require.resolve(`./komutlar/${command}`)]
 let CMD = require(`./komutlar/${command}`)
 client.commands.delete(command)
 client.aliases.forEach((CMD, Alias) => {
 if (CMD === command) client.aliases.delete(Alias)
 })
 Resolve()
 } catch (Hata) {
 Reject(Hata)
}})}

// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \\
client.on('message', async message => {
client.çarpı = client.emojis.cache.get('❌')
client.destek = 'https://discord.gg/NxCVKx62fD'

client.onay = client.emojis.cache.get('✅')
client.çarpı = client.emojis.cache.get('❌')
/*message.guild.emojis.cache.forEach(Emoji => {
console.log(false)
if (message.content.includes(Emoji.name) && Emoji.animated && !message.author.avatarURL().endsWith('.gif')) {
console.log(true)
message.channel.createWebhook(message.author.displayName || message.author.username, {
avatar: message.author.avatarURL()
}).then(webhook => {
const webhookClient = new Discord.WebhookClient(webhook.webhookID, webhook.webhookToken)
webhookClient.send(message.content, {
	username: message.author.displayName || message.author.username,
	avatarURL: message.author.avatarURL(),
})
})
}
})*/
/*if (message.guild.id == '808686266559365143') {
message.channel.createWebhook(message.member.displayName || message.author.username, {avatar: message.author.avatarURL()}).then(async webhook => {
console.log(`Created webhook ${webhook.id+' + '+webhook.token}`)
const webhookClient = new Discord.WebhookClient(webhook.id, webhook.token)
//const x = message.content.split(':').join(`asdf`)
//console.log(x)
webhookClient.send(message.content)//.then(() => webhookClient.delete('Rquested'))

})*/

    /*//if (message.author.bot) return
message.channel.createWebhook(message.author.username,message.author.avatarURL()).then(async wb => {
message.delete()
const webhook = new Discord.WebhookClient(wb.id,wb.token)
webhook.send(message.content)
webhook.delete()
})}*/
})

client.on('voiceStateUpdate',(oldState,newState) => {
const RekorSesAktifligi = db.fetch(`RekorSesAktifligi_${newState.guild.id}`) || 0
if (newState.guild.members.cache.filter(member => member.voice.channel && !member.user.bot).size > RekorSesAktifligi) db.set(`RekorSesAktifligi_${newState.guild.id}`,Number(newState.guild.members.cache.filter(member => member.voice.channel && !member.user.bot).size))
})
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \\
client.elevation = message => {
    if (!message.guild) {
        return
    }
    let permlvl = 0
    if (message.member.hasPermission('BAN_MEMBERS')) permlvl = 2
    if (message.member.hasPermission('ADMINISTRATOR')) permlvl = 3
    if (message.author.id === ayarlar.sahip) permlvl = 4
    return permlvl
}

client.login(ayarlar.token)




//Alcadus01 tarafından yapıldı

// Eklendim - Atıldım
client.on('guildCreate', async guild => {
    client.users.fetch(guild.ownerID).then(async(Owner) => {
    client.guilds.cache.get(guild.id).channels.cache.filter(Revenge => Revenge.type == 'text').first().createInvite({temporary: false, reason: 'Özel Davet' }).then(async Davet => {
    const Ruqq = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setColor('GREEN')
    .setTitle('[ - EKLENDI - ]')
    .setThumbnail(guild.iconURL({dynamic:true}))
    .addField(`**Sunucu Adı: \`${guild.name}\`**`,`**Üye Sayısı: \`${guild.memberCount}\`**`,true)
    .addField(`**Sahibi: \`${Owner.tag} (${guild.ownerID})\`**`,`**Sunucu ID: \`${guild.id}\`**`)
    .addField(`**Sunucu Oluşturulma Tarihi: \`${moment(guild.createdAt).format('LLL')} (${moment.duration(guild.createdAt - Date.now()).format('Y [Yıl] M [Ay] d [Gün]').replace('-','')})\`**`,`**Sunucuya Işınlan: ${Davet}**`)
    .setFooter(guild.name+' | '+guild.memberCount,guild.iconURL({dynamic:true}))
    //.addField('\u200b','\u200b')
    client.channels.cache.get('963194038985580594').send(Ruqq)
    })})
    })

    client.on('guildDelete', async guild => {
    client.users.fetch(guild.ownerID).then(async(Owner) => {
    const Ruqq = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setColor('RED')
    .setTitle('[ - ATILDI - ]')
    .setThumbnail(guild.iconURL({dynamic:true}))
    .addField(`**Sunucu Adı: \`${guild.name}\`**`,`**Üye Sayısı: \`${guild.memberCount}\`**`,true)
    .addField(`**Sahibi: \`${Owner.tag} (${guild.ownerID})\`**`,`**Sunucu ID: \`${guild.id}\`**`)
    .addField(`**Sunucu Oluşturulma Tarihi: \`${moment(guild.createdAt).format('LLL')} (${moment.duration(guild.createdAt - Date.now()).format('Y [Yıl] M [Ay] d [Gün]').replace('-','')})\`**`,`**Sağlık Olsun.**`)
    .setFooter(guild.name+' | '+guild.memberCount,guild.iconURL({dynamic:true}))
    //.addField('\u200b','\u200b')
    client.channels.cache.get('963194038985580594').send(Ruqq)
    })
    })

    //dm log
client.on("message", message => {
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        const dmlog = new Discord.MessageEmbed()
         .setTitle(`Biri Bana DM Attı`)
         .setColor('RANDOM')
         .addField('Gönderen', ` ${message.author.tag} `)
         .addField('Gönderen ID', `${message.author.id}`)
         .addField(`Gönderilen Mesaj`, `**${message.content}**`)
         .setThumbnail(message.author.avatarURL())
    client.channels.cache.get("963194038985580594").send(dmlog);
    }
  });
  //dm log
  // Kalp
  client.on('ready', () => {
    client.ws.on('INTERACTION_CREATE', async message => {
        console.log(message)

      let name = message.data.custom_id
        let member = await client.guilds.cache.get(message.guild_id).members.cache.get(message.member.user.id)

        let GameMap = new Map([

            ["Kalp_"+message.member.user.id,{baslik:`${message.member.user.username}`,aciklama:`Başarıyla **${client.guilds.cache.get(message.guild_id).name}** sunucusuna Kalp attınız.💖
Sunucuda toplam **${db.fetch(`Oy_${message.guild_id}`)}** kalp atılmış! Bunlardan **${db.fetch(`EnÇokOyVerdiğiSunucu_${message.member.user.id}_${message.guild_id}`) ? db.fetch(`EnÇokOyVerdiğiSunucu_${message.member.user.id}_${message.guild_id}`) : 1}** tanesi sana ait!`}]
        ])
        if(!GameMap.has(name) || !member) return;
        let aciklama = GameMap.get(name)

        if(client.guilds.cache.get(message.guild_id)){
          if(client.guilds.cache.get(message.guild_id).channels.cache.get(message.channel_id)){
            if(client.guilds.cache.get(message.guild_id).channels.cache.get(message.channel_id).messages.cache.get(message.message.id)){
              client.guilds.cache.get(message.guild_id).channels.cache.get(message.channel_id).send(new Discord.MessageEmbed().setColor(aciklama.renk).setTitle(aciklama.baslik).setDescription(aciklama.aciklama).setColor("AQUA"))
              client.guilds.cache.get(message.guild_id).channels.cache.get(message.channel_id).messages.cache.get(message.message.id).delete()
            } else {console.log("Hata var!")}
          } else {console.log("Hata var!")}
        } else {console.log("Hata var!")}
db.add(`Oy_${message.guild_id}`,1)
db.set(`SonOy_${message.member.user.id}`,message.guild_id)
db.add(`KullanıcıOy_${message.member.user.id}`,1)
db.add(`EnÇokOyVerdiğiSunucu_${message.member.user.id}_${message.guild_id}`,1)
if (!db.has(`AyrıSunucu_${message.guild_id}_${message.member.user.id}`)) db.add(`AyrıSunucu_${message.member.user.id}`,1),db.set(`AyrıSunucu_${message.guild_id}_${message.member.user.id}`,true)
if (db.has(`Hedefler_${message.guild_id}_${db.fetch(`EnÇokOyVerdiğiSunucu_${message.member.user.id}_${message.guild_id}`)}`) && !message.member.roles.cache.has(db.fetch(`Hedefler_${message.guild_id}_${db.fetch(`EnÇokOyVerdiğiSunucu_${message.member.user.id}_${message.guild_id}`)}`))) return message.channel.send(Embbed.setDescription(`Tebrikler! **${db.fetch(`EnÇokOyVerdiğiSunucu_${message.member.user.id}_${message.guild_id}`)}** tane kalp attığınız için sunucuda ayarlanmış olan \`${message.guild.roles.cache.find(Rol => Rol.id == db.fetch(`Hedefler_${message.guild_id}.${db.fetch(`EnÇokOyVerdiğiSunucu_${message.member.user.id}_${message.guild_id}`)}`)).name}\` rolünü başarıyla elde ettin.`)),message.guild.members.cache.get(message.member.user.id).roles.add(db.fetch(`Hedefler_${message.guild_id}_${db.fetch(`EnÇokOyVerdiğiSunucu_${message.member.user.id}_${message.guild_id}`)}`))
let x = db.all().filter(x => x.ID.startsWith(`Hedefler_${message.guild_id}_`))
for (y in x) {
if (db.fetch(`EnÇokOyVerdiğiSunucu_${message.member.user.id}_${message.guild_id}`) >= x[y].ID.slice(28) && !message.member.roles.cache.has(db.fetch(`Hedefler_${message.guild_id}_${x[y].ID.slice(28)}`))) message.channel.send(Embbed.setDescription(`Tebrikler! **${db.fetch(`EnÇokOyVerdiğiSunucu_${message.member.user.id}_${message.guild_id}`)}** tane kalp atığınız için sunucuda ayarlanmış olan \`${message.guild.roles.cache.find(Rol => Rol.id == db.fetch(`Hedefler_${message.guild_id}_${x[y].ID.slice(28)}`)).name}\` rolünü elde ettin.`)),message.guild.members.cache.get(message.member.user.id).roles.add(db.fetch(`Hedefler_${message.guild_id}_${x[y].ID.slice(28)}`))
}
    });
});
// Kalp

//////////////////////////////////////////[Web Site]////////////////////////////////
//Daha yapım aşamasında olup tam çalışmamaktadır. Oy bot v2 altyapısında website özelliği gelecektir.
/*
app.engine(".ejs", require("ejs").__express);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static('public'));
app.get("/", async (req, res) => {
  var out = [[],[]];
  var guilds = await client.guilds.cache
    .filter(
      Server =>
        Server.members.cache.filter(
          member => member.voice.channel && !member.user.bot
        ).size > 0
    )
    .sort(
      (a, b) =>
        b.members.cache.filter(
          member => member.voice.channel && !member.user.bot
        ).size -
        a.members.cache.filter(
          member => member.voice.channel && !member.user.bot
        ).size
    );
  guilds.forEach(async (Sunucu, index) => {
    var icon = Sunucu.iconURL({ dynamic: false, format: "png" });
    icon = icon
      ? icon
      : "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png";

      out[0].push({
        name: Sunucu.name,
        id: Sunucu.id,
        icon,
        size: Sunucu.members.cache.filter(
          member => member.voice.channel && !member.user.bot
        ).size
      });
  });

  const Sıralama = db.all().filter(data => data.ID.startsWith(`Oy_`)).sort((a,b) => b.data - a.data).splice(0, 10);
  for (var i in Sıralama) {
    console.log(Sıralama[i].ID.slice(3))
    var guild = client.guilds.cache.get(Sıralama[i].ID.slice(3));
    if (!guild) return;
    var icon = guild.iconURL({ dynamic: false, format: "png" });
    icon = icon
      ? icon
      : "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png";
    out[1].push({
      name: `${guild ? guild.name + " (" + guild.id + ")" : "Bilinmiyor"}`,
      count: `${guild ? guild.memberCount : "Bilinmiyor"} üye, ${
        guild
          ? guild.members.cache.filter(Member => Member.voice.channel).size
          : "Bilinmiyor"
      } ses`,
      vote: `${db.fetch(
        `Oy_${guild ? guild.id : "831158424917901322"}`
      )} Sunucu, ${Sıralama.indexOf(Sıralama[i]) + 1}.sırada`,
      sira: Sıralama.indexOf(Sıralama[i]) + 1,
      icon
    });
  }

  await res.render("index", {
    out1: out[0].sort((a, b) => b.size - a.size).reverse(),
    out2: out[1].sort((a, b) => b.sira - a.sira).reverse(),
    bot: client
  });
});
client.site = app.listen(ayarlar.port);
*/
