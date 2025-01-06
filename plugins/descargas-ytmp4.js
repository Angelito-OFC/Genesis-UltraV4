import fetch from "node-fetch"
 
let handler = async (m, { text, conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply("ingresa un link de youtube")
 
try {
let api = await fetch(`https://api.agatz.xyz/api/ytmp4?url=${args[0]}`)
let json = await api.json()
let { title, thumbnail, quality, downloadUrl:dl_url } = json.data
 
let JT = `*Titulo :* ${title}
*Calidad :* ${quality}`
 
await conn.sendFile(m.chat, dl_url, 'HasumiBotFreeCodes.mp4', JT, m)
} catch (error) {
console.error(error)
}}
 
handler.command = ['ytmp4']
 
export default handler