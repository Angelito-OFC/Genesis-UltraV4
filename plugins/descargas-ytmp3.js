/* *❀ By JTxs*

[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n */
import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) {
        await m.react('✖️');
        return conn.reply(m.chat, `☁️ Ingresa un link de YouTube`, m, fake);
    }

    try {
        await m.react('🕒');

        let api = await fetch(`https://axeel.my.id/api/download/audio?url=${text}`);
        let json = await api.json();
        let { title, url, views, thumbnail, likes, description, author } = json.metadata;

      const doc = {
      audio: { url: json.downloads.url },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: url,
          title: title,
          sourceUrl: url,
          thumbnail: thumbnail,
        }
      }
    };
    await conn.sendMessage(m.chat, doc, { quoted: m })
        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('❌');
        conn.reply(m.chat, `☁️ Hubo un error al procesar tu solicitud. Inténtalo de nuevo más tarde.`, m);
    }
};

handler.help = ['ytmp3 *<url>*'];
handler.tags = ['dl'];
handler.command = /^(ytmp3)$/i;

export default handler;