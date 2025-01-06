/* 
❀ By JTxs

[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

[ Canal Rikka Takanashi Bot ] :
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

[ Canal StarlightsTeam] :
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

[ HasumiBot FreeCodes ] :
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

// *[ ❀ YTMP4 ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
let [url, resolution] = text.split(' ')
if (!url) {
return conn.reply(m.chat, `Ingresa el link de un video de youtube y una calidad ejemplo : ${usedPrefix + command} + *link* *360* `, m)
}
    
try {
let apiinfo = await fetch(`https://ytdownloader.nvlgroup.my.id/info?url=${url}`);
let jsoninfo = await apiinfo.json()
let titulo = jsoninfo.title
let duracion = jsoninfo.duration || '-'
let calidad = resolution || '360'
let img = jsoninfo.thumbnail
let dl_url = `https://ytdownloader.nvlgroup.my.id/download?url=${url}&resolution=${calidad}`
let vidFetch = await fetch(dl_url)
let video = await vidFetch.buffer()
let Tamaño = video.length / (1024 * 1024)

let HS = `- *Titulo* : ${titulo}
- *Link* : ${url}
- *Duracion* : ${duracion}
- *Calidad* ${calidad}`
if (Tamaño > 100) {
await conn.sendMessage(m.chat, { document: video, caption: HS, mimetype: 'video/mp4', fileName: `${titulo}.mp4`})
} else {
await conn.sendMessage(m.chat, { video: video, caption: HS, mimetype: 'video/mp4'})
}
} catch (error) {
console.error(error)    
}}

handler.command = ['ytmp4']

export default handler