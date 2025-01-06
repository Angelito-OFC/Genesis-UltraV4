/* import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un  link de youtube`, m)

try {
let api = await (await fetch(`https://api.siputzx.my.id/api/d/ytmp3?url=${text}`)).json()
let dl_url = api.data.dl
let dl_url = api.data.title

conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: "audio/mp4", ptt: true }, { quoted: m })
} catch (error) {
console.error(error)
}}

handler.command = ['ytmp3']

export default handler */


/* 

[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

[ Canal Rikka Takanashi Bot ] :
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

[ Canal StarlightsTeam] :
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

[ HasumiBot FreeCodes ] :
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

// *[ ❀ YTMP3 ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) {
return m.reply("❀ Ingresa un link de youtube")
}
    
try {
let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url=${text}`)
let json = await api.json()
let { quality, title, download_url } = json.result

await conn.sendMessage(m.chat, { audio: { url: download_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })
} catch (error) {
console.error(error)
}}

handler.command = /^(ytmp3)$/i

export default handler