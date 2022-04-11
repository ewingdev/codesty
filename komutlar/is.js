const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
const db = require('ewing-db')
exports.run = async (client, message, args) => {
const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");

let aylartoplam = {
        "01": "Ocak",
        "02": "Şubat",
        "03": "Mart",
        "04": "Nisan",
        "05": "Mayıs",
        "06": "Haziran",
        "07": "Temmuz",
        "08": "Ağustos",
        "09": "Eylül",
        "10": "Ekim",
        "11": "Kasım",
        "12": "Aralık"
  }
 let aylar = aylartoplam

 let s = (`${moment(client.user.createdAt).format('DD')} ${aylar[moment(client.user.createdAt).format('MM')]} ${moment(client.user.createdAt).format('YYYY HH:mm:ss')}`)


  const msg = new Discord.MessageEmbed()
    .setColor("")
    .setFooter(client.user.tag, client.user.avatarURL())
  .setThumbnail(client.user.avatarURL())
    .setTitle(`Arwin İstatistik`)
    .addField(
      "**Bot'un Ana Sahibi:**", "<@774591026940739585>",
	  false
    )
    .addField(
      "**Kullanıcı Sayısı:**",
      client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString(),
      true
    )
    .addField(
      "**Sunucu Sayısı:**",
      client.guilds.cache.size.toLocaleString(),
      true
    )
    .addField(
      "**Kanal Sayısı:**",
      client.channels.cache.size.toLocaleString(),
      true
    )
    .addField("**Ping:**", client.ws.ping + " ms", true)
    .addField("**Botun Açık Olduğu Süre**", duration,true)
    .addField("**Botun Kuruluş Tarihi**",s ,true)
  return message.channel.send(msg);


};

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [ 'i','statistics',"İ"],
    permLevel: 0
  };

  exports.help = {
    name: "istatistik",
    description: "Bot i",
    usage: "istatistik"
  };
