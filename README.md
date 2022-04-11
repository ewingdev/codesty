Merhaba Hoşgeldin 

Alt yapıyı kurmak için ayarlar.jsona bazı şeyleri girmen lazım 

{
  "prefix": "PREFİX", Botun prefxi 
  "sahip": ["SAHİP İD"], Botun sahip idsi
  "geliştiriciler": ["DEVELOPER İD"], botun geliştiricilerin id si
  "destek":["SUNUCU ONAYLAYIN EKİBİN İD"], (prefix)id-onayla ile sunucu onaylayan ekipteki kişilerin id si
  "token": "TOKEN", Botun token id si
  "port": 8000 Buna elemene gerek yok 
}

Main ve events/message.js dosyalarına bazı değiştirmemiz gereken kanal idleri var. Bunlar;
main dosyasında 153. satır
main dosyasında 169. satır
main dosyasında 184. satır
message.js dosyasında 36. satır
