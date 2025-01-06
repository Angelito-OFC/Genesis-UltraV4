/* 

*❀ By JTxs*

[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n*/
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) {
        await m.react('✖️');
        return conn.reply(m.chat, `☁️ Ingresa un link de youtube`, m, fake);
    }

    try {
        await m.react('🕒');

        let api = await fetch(`https://axeel.my.id/api/download/video?url=${text}`);
        let json = await api.json();
        let { title, views, likes, description, author } = json.metadata;
        let txt = `• *Titulo :* ${title}
• *Autor :* ${author}
• *Tamaño :* ${json.downloads.size}`;

        await conn.sendMessage(m.chat, { video: { url: json.downloads.url }, caption: txt }, { quoted: m });
        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('❌');
        conn.reply(m.chat, `☁️ Hubo un error al procesar tu solicitud. Inténtalo de nuevo más tarde.`, m);
    }
};

handler.help = ['ytmp4 *<url>*'];
handler.tags = ['dl'];
handler.command = /^(ytmp4)$/i;

export default handler;