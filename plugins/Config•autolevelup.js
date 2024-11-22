import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'
export function before(m, { conn }) {
//if (!db.data.chats[m.chat].autonivel && m.isGroup) throw 

let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
let user = global.db.data.users[m.sender]
let chat = global.db.data.chats[m.chat]
if (!chat.autolevelup)
return !0

let before = user.level * 1
while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
if (before !== user.level) {
m.reply(`*🎉 ¡ F E L I C I D A D E S ! 🎉*\n\n💫 Nivel Actual » *${user.level}*\n🌵 Rango » *${user.role}*\n📆 Fecha » *${moment.tz('America/Bogota').format('DD/MM/YY')}*\n\n> *\`¡Has alcanzado un Nuevo Nivel!\`*
`.trim())

if (level >= 1) {
let chtxt = `
👤 *Usuario:* ${m.pushName || 'Anónimo'}
🐢 *Nivel anterior:* ${before}
💫 *Nivel actual:* ${level}
👾 *Rango:* ${user.role}
✨️ *Bot:* ${wm}${level % 5 === 0 ? `

💰 *Recompensa por alacanzar el nivel ${level}:*
🎁 *Bono:* \`X${Math.floor((level - 1) / 10) + 1}\`
- *${especialCant * Math.floor((level - 1) / 10) + 1} ${global.rpgshop.emoticon(especial)}*
- *${especialCant2 * Math.floor((level - 1) / 10) + 1} ${global.rpgshop.emoticon(especial2)}*
- *${especialCant3 * Math.floor((level - 1) / 10) + 1} ${global.rpgshop.emoticon(especial3)}*
- *${especialCant4 * Math.floor((level - 1) / 10) + 1} ${global.rpgshop.emoticon(especial4)}*

> 👀 Siguiente recompensa en el *nivel ${level + 5}*` : ''}`.trim()
await conn.sendMessage(ch.ch1, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔 】",
body: '🥳 ¡Alguien a subido de nivel!',
thumbnailUrl: perfil,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
}
    }
} 