import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("🤍 Por favor, ingresa una URL válida de YouTube.");
  }
  await m.react('🕓');

  // Expresión regular para validar la URL de YouTube
  let ytUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  if (!ytUrlRegex.test(text)) {
    return m.reply("❀ La URL ingresada no es válida. Asegúrate de que sea un enlace de YouTube.");
  }

  try {
    let apiUrl = `https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${encodeURIComponent(text)}`;
    let apiResponse = await fetch(apiUrl);

    // Validar si la respuesta es exitosa
    if (!apiResponse.ok) {
      throw new Error(`Error en la API: ${apiResponse.status} ${apiResponse.statusText}`);
    }

    // Validar si la respuesta es JSON
    let contentType = apiResponse.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      let responseText = await apiResponse.text();
      console.error("Respuesta inesperada de la API:", responseText);
      throw new Error('La respuesta no es un JSON válido.');
    }

    // Parsear el JSON de la respuesta
    let json = await apiResponse.json();
    if (!json.result || !json.result.download_url || !json.result.title) {
      throw new Error('La API devolvió un formato inesperado.');
    }

    let { title, download_url } = json.result;

    // Enviar el video al chat
    await m.react('✅');
    await conn.sendMessage(m.chat, {
      video: { url: download_url },
      caption: `_${title}_`,
      mimetype: 'video/mp4',
      fileName: `${title}.mp4`
    }, { quoted: m });
  } catch (error) {
    console.error("Error procesando la solicitud:", error.message);
    m.reply(`❀ Hubo un error al procesar la URL: ${error.message}`);
  }
};

// Configuración del comando
handler.help = ['ytmp4 *<link yt>*'];
handler.tags = ['dl'];
handler.command = ['ytmp4', 'ytv', 'fgmp4'];

export default handler;