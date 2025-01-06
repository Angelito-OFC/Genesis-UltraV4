/*
*❀ By JTxs*
[ Canal Principal ] :
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

[ Canal Rikka Takanashi Bot ] :
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

[ Canal StarlightsTeam ] :
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

[ HasumiBot FreeCodes ] :
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/

// *[ ❀ YTMP3 ]*
import fetch from 'node-fetch';

let handler = async (m, { conn, command, text }) => {
    if (!text) return conn.reply(m.chat, `❀ Ingresa un link de YouTube`, m);

    try {
        let api = await fetch(`https://axeel.my.id/api/download/audio?url=${text}`);
        let json = await api.json();

        if (!json.metadata || !json.downloads) {
            return conn.reply(m.chat, `❀ No se pudo obtener la información del enlace. Verifica el link ingresado.`, m);
        }

        let { title, views, likes, description, author, thumbnail } = json.metadata;
        let { url: audioUrl, size } = json.downloads;

        // Descargar la imagen del thumbnail
        let imgBuffer = await fetch(thumbnail).then(res => res.buffer());

        let caption = `❀ *Titulo :* ${title}
❀ *Descripcion :* ${description || 'No disponible'}
❀ *Visitas :* ${views}
❀ *Likes :* ${likes}
❀ *Autor :* ${author}
❀ *Tamaño :* ${size}`;

        // Enviar imagen con información
        await conn.sendMessage(m.chat, { 
            image: imgBuffer, 
            caption 
        }, { quoted: m });

        // Enviar el audio
        await conn.sendMessage(m.chat, { 
            audio: { url: audioUrl }, 
            mimetype: 'audio/mpeg' 
        }, { quoted: m });
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, `❀ Hubo un error al procesar tu solicitud. Inténtalo de nuevo más tarde.`, m);
    }
};

handler.command = /^(ytmp3)$/i;

export default handler;