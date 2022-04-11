const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');


exports.run = async(client, message, args) => {

        const embed = new Discord.MessageEmbed()
        .setAuthor(client.user.username)
        .setDescription(`
        Merhaba! Sunucu kalp/ses sıralaması için bir botum.
        
        **__Komut Listesi__**
        
        \`;help\`: Bu menü
        \`;kalp\`: Sunucuya kalp atarsınız
        \`;top\`: Ses sıralaması
        \`;top kalp\`: Oy sıralaması
        \`;davet-tanımla\`: Katıl butonu için davet linkini ayarla _(Sadece yönetici)_ 
        \`;etiket\`: Sunucuna etiket ekle
        \`;hedef <rol> <rakam>\`: Belirlenen kalp sayışına ulaştıktan sonra rol verir
        \`;duyur\`: Duyuru yap
        \`;sunucu <server id>\`: Sunucu bilgileri!
        \`;kalplerim\`: Verdiğiniz kalp lerinize bakın
        \`;profil\`: Profiliniz
        \`;avatar\`: Avatarınız
        
        [Support Server](https://discord.com/invite/NxCVKx62fD) | [Add Bot](https://discord.com/api/oauth2/authorize?client_id=873192637438496768&permissions=8&scope=bot)`)
        .setColor(message.guild.me.roles.highest.hexColor)
        .setThumbnail(client.user.avatarURL())
          
        return message.channel.send(embed);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['yardım','help',"h","H","Y","y","HELP","YARDIM","Help","Yardım"],
    permLevel: 0
}
  
exports.help = {
    name: 'Yardım | Help',
    description: 'Botun komutlarına bakarsınız.',
    usage: 'yardım'
}


