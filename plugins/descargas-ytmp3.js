import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) {
        await m.react('❓'); // Reacción si falta el texto
        return conn.reply(m.chat, `❀ Ingresa un link de YouTube`, m);
    }

    try {
        await m.react('🕒'); // Reacción mientras se procesa la solicitud

        let api = await fetch(`https://axeel.my.id/api/download/audio?url=${text}`);
        let json = await api.json();
        let { title, views, likes, description, author } = json.metadata;

        let HS = `❀ *Titulo :* ${title}
❀ *Descripcion :* ${description}
❀ *Visitas :* ${views}
❀ *Likes :* ${likes}
❀ *Autor :* ${author}
❀ *Tamaño :* ${json.downloads.size}`;

        m.reply(HS);

        await conn.sendMessage(m.chat, { audio: { url: json.downloads.url }, mimetype: 'audio/mpeg' }, { quoted: m });
        await m.react('✅'); // Reacción de éxito
    } catch (error) {
        console.error(error);
        await m.react('❌'); // Reacción de error
        conn.reply(m.chat, `❀ Hubo un error al procesar tu solicitud. Inténtalo de nuevo más tarde.`, m);
    }
};

handler.command = /^(ytmp3)$/i;

export default handler;