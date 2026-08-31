/**
 * Скачивает фото из официального Telegram @GCsEng3lzz
 * в правильные слоты сайта. Запуск: node scripts/download-tg-images.mjs
 *
 * Маппинг проверен визуально по содержанию (не по индексу tg-N из постов).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const publicRoot = path.join(__dir, '..', 'public')

/** Проверенное сопоставление URL → файл */
export const TG_IMAGE_MAP = {
  // Логотип
  'logo.jpg':
    'https://cdn4.telesco.pe/file/Lt02GnnSOs1iE-IxzCev0TfTe4mQC7sueAV1K--qbkN7EqjFKfe_3V5_kfPBT0JW8EkcJ6XG3v76-F38beut8BsWXXKAiMr3FDLvwN8HngkZfQ32KlB8ZGGZl_bqygG5niu-Wes5azbyxSSnuf5PEP2im1DPyladygqNytVrFO1rYy3MvI0dVf2cq0XdN85JVItF6hQb9994S_xamgG7Wzt7KLCpscW9U8MlmjAza22YynTsDtFIpxG2TynWYJMjEwjHWDgwR_LfgJkgbAKj94V_5qZRQv1wUcQLo0Hpu0Ewunjwge5h-9tpjKjLwL0zgmxPBVmxjGZZkqPoCjyZAA.jpg',
  // Интерьер: бонсай, каменный стол
  'images/interior/hero.jpg':
    'https://cdn4.telesco.pe/file/L27koqg_EtruSbljNTWpN_3I9dY4FOrZVKyLa1ORfeEFfxqW2LV1H4Czl13pSmOROWJxsKhdmpRn4RMKcze5sC8IQS5k1bLLdZxiNsKz09PUtRsbPqxIxctFo3WszNQvg8AZ4aRSEkMhnSrkLeUlbwccwCEHnAsrP7KIFozqGQmlZ3FB5LZ9TqWhiNhPhidW4d1Qt11BYHE81OlAeHuv7dxNAh_4gcVzVfJ9U2fmuQjKwTBIlf4LePOcORnCk7DCWIYgXoZXRBDZXtYnWIi3Flx4EdbUXuLK72NyeCwdqPhaI8ofNRWtJMPfMkX-IHSYZLWXox--w9e7i1oCMxtB9g.jpg',
  // Пространство: окна, барная зона, посадка
  'images/interior/space-wide.jpg':
    'https://cdn4.telesco.pe/file/P58TCIO18uBObjgkIIUVaMlTJSsf89uu08rRZYM6A8qGfHilO3oHkfO-3TFMVXUNblFLBufCXE357lPcf16tTEJq0OAWNpE2WsxKa3GnmOVwSlRopj0nH18rlM4NGHEhfujRLoJHqJ8gNun4tcy8XEB3NQ8B_VGGoKFDGW4V0h3ycd6nBIknTURPVFAc38xOYfOXCV7Hzv8SvbnEghz3jSoNpvncqGsD3XD5Wq5oD-VQyiw9WImI1Dm7sZQH1EAkPWpiwuhyyQoKG60etXkHxoCeyEqbAC72Giz9hvNT6RclftjJhW-kxQ9CCbPMeHbe64seUanaMWa3f4zUso0BZA.jpg',
  // Бонсай у барной стойки
  'images/interior/bonsai-seating.jpg':
    'https://cdn4.telesco.pe/file/ZiIxmUalAovPhnwI__auaflAIVe9Awfaxm3LJa0o3-zofJlBsRqgXXzu5Rc9fAb7sOmHAswYMwe2DiFYBg7Ilb6OBJG7wHzSSvneweAQBlrSjBtkc9n3FENA9T0kAMTjrq3dNzgDlm9_Jnx9ARE0hvTak7DdML50Pg0i-3mdfL4KYgXzAgRN-VwZNNm5__ySUda56osfv5NHafiEHdpfsZ-CHogVCi0zhG6F9tYFf-diCqGI_nTtTfQOoyUpCkjKmS1coO-Mt_oGCedh6QiuWH-qIOF_d_W82wFrniLkLSvPpRaQg91W_mWkIeKblGYBgPcBDOVtfBK4_pFpjemDTA.jpg',
  // Эспрессо-машина через бонсай
  'images/coffee/espresso-bar.jpg':
    'https://cdn4.telesco.pe/file/rd8zkeze_rCutZwa4491bDK3r0XdPkE9QYStfcNs9kWPSa6c5G3gsBxtr7CblAydYnK7tcchXQCnG3icgEwem20Wh-pzNKGiSgNzAcHx2WXrRhNIRVbBhuggYnHObpk3agygYHVBUrvkBoCMWeYT6g8v8StG13f1adji4IyRNvXya__Fs8EYLHTMGl_vhLEYuGp1Y5HPkjDtS-RolMypgiuegtng6EYxQzZJEX2M5204Ft4qAmw1UKMXLoopamdzMH5LjCTmyuwDffM6q1TlcRtF_Gew_-Fv_4ELoNXF7KF5Iw_GruT_qIiizaDzIPqO3ZgJXOoTUV9y4AOUWcwDnw.jpg',
  // Каша с ягодами (пост 358)
  'images/food/breakfast-porridge.jpg':
    'https://cdn4.telesco.pe/file/OpTHdMRb3_2fRRslOyWqIN3dU16t22duIa_n0YgmGW6q9jdobbGJMiS7dLxYc_sUZZW2rqLC6SI3cjKh74GGTHY0iST1xV-FN8LQd5Yn1v0H7MPe4Tle9B3PPiN848x8B6ap45mxmtH13Mwfv4iuUmVBkxBQPQapeQ7QCobk90IIvP5vNmxAN_BYubk-Gv3Ylmqex3pH8m0TNBcehUozk7Dido5O4KwW7rmWozCx4yjl5exKzZsUAVpP7vk-QdK8bqdo3GtE7MRQi0uBzOXTwPlcfI1oPJzETpbRxCWFOsdtvrGr8Y8EU0TXu-7gtjiSq0BVm4jRhwZvkdcYrLZj_g.jpg',
  // Круассаны с белым шоколадом
  'images/food/croissant.jpg':
    'https://cdn4.telesco.pe/file/Lmo-VjiRycpf3Fe_8Hj4h7y1HH9kKceU0DzFtxjzKpAwTPvN825_nF3GmAucejpBkj-whmSgXU425vPZ1pN-iUZbf-mvy21zIRN230hIyTeRoJ3HGq3W6b8pke-SNdDd1CIV8jRnD5mY-YCdj8XTF9Kz4_hBp4gAwdvrKzHjGFqOAtpnhGJyGyDniWHXUZHwq4z2z8YjZMrnMFGxZjFfbEEWX1a28HIgAkh2fS0OVXWHkQ-EGdFoQYPZ4SeXiIPyTbWI_1Lanln9zN4UoL2RMkz0rFcHOZRNXR4hLUXqJC0fg4h3QGgG8e2WMaktF2JDrUBAoE1C-SZjLzpPH91JQQ.jpg',
  // Витрина десертов
  'images/food/pastry-display.jpg':
    'https://cdn4.telesco.pe/file/KDzkd6QN9__qo5ZDvJSdlml5miZmW8vt-41-02UM1npRfzcGYTvUV-yyeXrVDW2__4uQlMbGqp1tIUhpoAv34Oqp2zD_dlBoGqNZFp0I8PEzsFb3JAI-KtiTWeqdaco_yr9mICMluUsYECbcJuW2RMg8TudHF6pyxScM7tqTog5v5yFYobdf3cFs3Z5wdvk7AfK9wWNqxrlAparEMvcX3ff50NjiwIcsB-w9lwmDm5c66BCv6mEpiEaVhDJ7VEWZYi3X89cWqixlXTGDreZDo9aSWNnJok01saYzbeoxugpxGIkQPv1kHZrQn0aeOmvNuP8fV8mHge8BAZagV7U2NQ.jpg',
  // Зерно на стене
  'images/details/coffee-beans-wall.jpg':
    'https://cdn4.telesco.pe/file/gK7lFIOQlHeusj0DFb8zM1eP6KeE_GG-gh54Z9gP34RymcRsnDl15dTd8I_HNebiLlzulEwytGvuPUaAkG52dh1LwBhzgvpHT4MwXoIr230OJssQKuMSZQq43bXk5KIjAG21fXWDDpKbYCrA-7oedufpYMh7Hlb6UcPwrERaG5IyfqA_YFxWomzjpavDxVSgOTl5jVPr-IkjPA3td5NeiprjAuWBFnO63OsZm9_UfjyctCbjedv29B-eysojTHfnw98nHMfApDRNKzc67ob0e8UDEVOZI2rUR-1Atd_-MnmzpNHMuuV8jFBE9iTfMr3kFBZhYsFqlH2sMD6T0MOCyA.jpg',
}

const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0'

async function download(url) {
  const res = await fetch(url, { headers: { 'User-Agent': ua } })
  if (!res.ok) throw new Error(`${res.status} ${url.slice(0, 80)}`)
  return Buffer.from(await res.arrayBuffer())
}

for (const [rel, url] of Object.entries(TG_IMAGE_MAP)) {
  const out = path.join(publicRoot, rel)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  try {
    const buf = await download(url)
    fs.writeFileSync(out, buf)
    console.log('OK', rel, buf.length)
  } catch (e) {
    console.error('FAIL', rel, e.message)
  }
}
