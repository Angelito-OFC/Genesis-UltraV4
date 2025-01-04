import fs from 'fs'
import FormData from 'form-data'
import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  await m.react('🕒')
  if (!mime.startsWith('image/')) {
    return m.reply('Responde a una *Imagen.*')
  }

  let media = await q.download()
  let formData = new FormData()
  formData.append('file', media, { filename: 'file' })

  // Subir imagen a ImgBB
  let imgbbApi = await axios.post('https://api.imgbb.com/1/upload?key=10604ee79e478b08aba6de5005e6c798', formData, {
    headers: {
      ...formData.getHeaders()
    }
  })

  // Subir imagen a Free Image Host
  let freeImageHostApi = await fetch('https://www.freeimage.host/upload', {
    method: 'POST',
    body: formData,
  })
  let freeImageHostData = await freeImageHostApi.json()

  await m.react('✅')
  if (imgbbApi.data.data || freeImageHostData.url) {
    let txt = '`I M A G E  -  U P L O A D E R`\n\n'
    
    // Información ImgBB
    if (imgbbApi.data.data) {
      txt += `*🔖 Titulo (ImgBB)* : ${q.filename || 'x'}\n`
      txt += `*🔖 Id (ImgBB)* : ${imgbbApi.data.data.id}\n`
      txt += `*🔖 Enlace (ImgBB)* : ${imgbbApi.data.data.url}\n`
      txt += `*🔖 Directo (ImgBB)* : ${imgbbApi.data.data.url_viewer}\n`
      txt += `*🔖 Mime (ImgBB)* : ${mime}\n`
      txt += `*🔖 File (ImgBB)* : ${q.filename || 'x.jpg'}\n`
      txt += `*🔖 Extension (ImgBB)* : ${imgbbApi.data.data.image.extension}\n`
      txt += `*🔖 Delete (ImgBB)* : ${imgbbApi.data.data.delete_url}\n\n`
    }
    
    // Información Free Image Host
    if (freeImageHostData.url) {
      txt += `*🔖 Enlace (FreeImageHost)* : ${freeImageHostData.url}\n`
      txt += `*🔖 Delete (FreeImageHost)* : ${freeImageHostData.delete_url}\n\n`
    }

    txt += `© By: Genesis`

    await conn.sendFile(m.chat, imgbbApi.data.data ? imgbbApi.data.data.url : freeImageHostData.url, 'ibb.jpg', txt, m, null, fake)
  } else {
    await m.react('✅')
  }
}
handler.tags = ['convertir']
handler.help = ['toibb']
handler.command = /^(tourl2|toibb)$/i
handler.register = true 
export default handler




/* import fs from 'fs'
import FormData from 'form-data'
import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  await m.react('🕒')
  if (!mime.startsWith('image/')) {
    return m.reply('Responde a una *Imagen.*')
  }

  let media = await q.download()
  let formData = new FormData()
  formData.append('image', media, { filename: 'file' })

  let api = await axios.post('https://api.imgbb.com/1/upload?key=10604ee79e478b08aba6de5005e6c798', formData, {
    headers: {
      ...formData.getHeaders()
    }
  })

  await m.react('✅')
  if (api.data.data) {
    let txt = '`I B B  -  U P L O A D E R`\n\n'
        txt += `*🔖 Titulo* : ${q.filename || 'x'}\n`
        txt += `*🔖 Id* : ${api.data.data.id}\n`
        txt += `*🔖 Enlace* : ${api.data.data.url}\n`
        txt += `*🔖 Directo* : ${api.data.data.url_viewer}\n`
        txt += `*🔖 Mime* : ${mime}\n`
        txt += `*🔖 File* : ${q.filename || 'x.jpg'}\n`
        txt += `*🔖 Extension* : ${api.data.data.image.extension}\n`
        txt += `*🔖 Delete* : ${api.data.data.delete_url}\n\n`
        txt += `© By: Genesis`
    await conn.sendFile(m.chat, api.data.data.url, 'ibb.jpg', txt, m, null, fake)
  } else {
    await m.react('✅')
  }
}
handler.tags = ['convertir']
handler.help = ['toibb']
handler.command = /^(tourl2|toibb)$/i
handler.register = true 
export default handler */