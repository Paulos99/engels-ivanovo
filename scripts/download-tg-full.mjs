/**
 * Полный цикл: скачивает каталог @GCsEng3lzz и копирует фото в слоты сайта.
 * Маппинг tg-N проверен визуально в первой сессии (transcript line 80).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const publicRoot = path.join(__dir, '..', 'public')
const tgDir = path.join(publicRoot, 'images', '_tg')
const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0'

/** Первые 14 фото с превью канала (порядок tg-1…tg-14) */
const CHANNEL_PREVIEW = [
  'https://cdn4.telesco.pe/file/Lt02GnnSOs1iE-IxzCev0TfTe4mQC7sueAV1K--qbkN7EqjFKfe_3V5_kfPBT0JW8EkcJ6XG3v76-F38beut8BsWXXKAiMr3FDLvwN8HngkZfQ32KlB8ZGGZl_bqygG5niu-Wes5azbyxSSnuf5PEP2im1DPyladygqNytVrFO1rYy3MvI0dVf2cq0XdN85JVItF6hQb9994S_xamgG7Wzt7KLCpscW9U8MlmjAza22YynTsDtFIpxG2TynWYJMjEwjHWDgwR_LfgJkgbAKj94V_5qZRQv1wUcQLo0Hpu0Ewunjwge5h-9tpjKjLwL0zgmxPBVmxjGZZkqPoCjyZAA.jpg',
  'https://cdn4.telesco.pe/file/Gg0ovLp3H2yXMP1pzbbiXUNYl1hnNY11O4fg12_-UyN8iaHC2ZrnDOW5D5e28t3qeU_7L0xr_DT9wx9drLyKOf0r_IdWACrNB7SoHLmuW9XT6dk4HSjC2Br-vVFMTrvZmWZcBoxb15-8yaIgtljXQhC6e5SMeMwC50NP0lNHxyPlZ2CjIYJ4cF-g8oYwN-RcVXQWvexNpjldM6l29d4qhwUNWSDk7mLT_-THJ8SP2dyF2JKz1rx1K2Pcn0EVWL48mz06E0agZ9FtDgon1LANDd5q4Yk6z3U9jbGDW3V0pQljGBSGw7QxM3Ex1zwfrOHXtEvDFyNrkaSdhAPxf-Ey5g.jpg',
  'https://cdn4.telesco.pe/file/LeyqAt2j7pSHJR_b3uaR_czmgRyFGM04v8JerY0iN7FYURUBfw_7vww1ODp-z4sgFdEi667NIkWpYCnLlupiMznDNlw3HUocIzHtUAkae14hkd6t7xxkWcf8z2dHJMb_NwLAcja-awfdHpZLWt5eYC4rdZuJ8Drm4ADfXrA0FFCLmXSZuKd7Q0nbq7rnFZheeiMRXLFJCbMZCzNE8kPE5Gb2f9hvNViOhSuxlKTy6chlmADRp58bgy3UE07LCR5UNXem1NWE9aVqkmVvY1D4JzUUzo7XDIkguwUytTm4i1InivMNjP6WQiDjcWfxPek9WvgkJ75rRw4QDs9P8IgiIQ.jpg',
  'https://cdn4.telesco.pe/file/op2h8AJ0s2JFlIfr_wafJ36dEdPKpiHl1-tNOS911StTgOHTwqyqJcY8P-yLWFiEhxCfY_X0ZZRMa0xlXOpF0ytsnx-uJiRg9qPN2pEFzZfjriT9nHLtC3lLbGocdCpKytDeJt30Yw0Ftlm3BEY2XliTdcvyUYOtAl7lfgPfswH3eiTBb8J2_mz0pJ0K03eVPKCiXWC9Y0bwwDfwM2uRUgprvYubEZBR9ATzZtDOznlO3zz7lmyiruxTmB4TUDDiJMaNC4v3qMHB0QIaaHduq08A1qVN-XoGweGezp26RtWjy8N202bAX0ppJZSOK-x2GuTWXZxc0_hqI1LBM7oR0A.jpg',
  'https://cdn4.telesco.pe/file/L27koqg_EtruSbljNTWpN_3I9dY4FOrZVKyLa1ORfeEFfxqW2LV1H4Czl13pSmOROWJxsKhdmpRn4RMKcze5sC8IQS5k1bLLdZxiNsKz09PUtRsbPqxIxctFo3WszNQvg8AZ4aRSEkMhnSrkLeUlbwccwCEHnAsrP7KIFozqGQmlZ3FB5LZ9TqWhiNhPhidW4d1Qt11BYHE81OlAeHuv7dxNAh_4gcVzVfJ9U2fmuQjKwTBIlf4LePOcORnCk7DCWIYgXoZXRBDZXtYnWIi3Flx4EdbUXuLK72NyeCwdqPhaI8ofNRWtJMPfMkX-IHSYZLWXox--w9e7i1oCMxtB9g.jpg',
  'https://cdn4.telesco.pe/file/KDzkd6QN9__qo5ZDvJSdlml5miZmW8vt-41-02UM1npRfzcGYTvUV-yyeXrVDW2__4uQlMbGqp1tIUhpoAv34Oqp2zD_dlBoGqNZFp0I8PEzsFb3JAI-KtiTWeqdaco_yr9mICMluUsYECbcJuW2RMg8TudHF6pyxScM7tqTog5v5yFYobdf3cFs3Z5wdvk7AfK9wWNqxrlAparEMvcX3ff50NjiwIcsB-w9lwmDm5c66BCv6mEpiEaVhDJ7VEWZYi3X89cWqixlXTGDreZDo9aSWNnJok01saYzbeoxugpxGIkQPv1kHZrQn0aeOmvNuP8fV8mHge8BAZagV7U2NQ.jpg',
  'https://cdn4.telesco.pe/file/T_xs53mQ_-n5eeJzq2fMra0LuGIS56pBa9eNtauweTqMnyXbFiAg_SRMKWHF3CaZbti0_aikyIJ4e0dVDeGjomDKfAoYLMesoQ16bz2fij3kyMK8TPeopdlziYlkCNhl14IqwIi1hyVUMyhgUNXe4pbAA0OnY8ZcrN399AcOGbqaVa9YlTW9_5-3rnHB0fZncB0CdGJhGEgi5NEt1L7DWLOENOwGETEYJJfJv82FDF-hzlJijpog9TFsQXeAtTkw3mHvlFc0SV2Sfd-6Qb40Y9JS9qlnmFaEg13o0c7LLWr3Pnv-Ac1K4qZUMbtGQOohl68OefwjzZdrblwbAf0tQw.jpg',
  'https://cdn4.telesco.pe/file/gK7lFIOQlHeusj0DFb8zM1eP6KeE_GG-gh54Z9gP34RymcRsnDl15dTd8I_HNebiLlzulEwytGvuPUaAkG52dh1LwBhzgvpHT4MwXoIr230OJssQKuMSZQq43bXk5KIjAG21fXWDDpKbYCrA-7oedufpYMh7Hlb6UcPwrERaG5IyfqA_YFxWomzjpavDxVSgOTl5jVPr-IkjPA3td5NeiprjAuWBFnO63OsZm9_UfjyctCbjedv29B-eysojTHfnw98nHMfApDRNKzc67ob0e8UDEVOZI2rUR-1Atd_-MnmzpNHMuuV8jFBE9iTfMr3kFBZhYsFqlH2sMD6T0MOCyA.jpg',
  'https://cdn4.telesco.pe/file/PmNdsi_UUbasKjDYWHdo1bHbRWSgYulqlY4JRDZsvklH7eFqi5uKRzT5HZzU7uSU6xcTMLbjQ2TSB2T7TLkx3SuR7viYQiFn3gseuFqPQ902xIambYickZ21K2dZ0n3EaB-ATSbZEwkkgJ1dNJOw1MwdiIB5_9dHEVyl1lGun451lhR5-N41d_hlLegQpYNodON_xnciWBQDBo15fix84n2bZUW40_STKr9Timg3J0fXLeWFCYxYPG41SHjkZk6FTs1RWJJvsdg1imFkMOIKAZIgoMaISuSZEFw0JHVi9mKww6-MzRcv6_PwchRQcTraVdHWNngcil2wlCj9SZScBw.jpg',
  'https://cdn4.telesco.pe/file/P58TCIO18uBObjgkIIUVaMlTJSsf89uu08rRZYM6A8qGfHilO3oHkfO-3TFMVXUNblFLBufCXE357lPcf16tTEJq0OAWNpE2WsxKa3GnmOVwSlRopj0nH18rlM4NGHEhfujRLoJHqJ8gNun4tcy8XEB3NQ8B_VGGoKFDGW4V0h3ycd6nBIknTURPVFAc38xOYfOXCV7Hzv8SvbnEghz3jSoNpvncqGsD3XD5Wq5oD-VQyiw9WImI1Dm7sZQH1EAkPWpiwuhyyQoKG60etXkHxoCeyEqbAC72Giz9hvNT6RclftjJhW-kxQ9CCbPMeHbe64seUanaMWa3f4zUso0BZA.jpg',
  'https://cdn4.telesco.pe/file/vIt2jurfdBuLmQudb5FKqLhUJOIGt8Cz6jTv87PtPiqNjtvUw2NU-_a8fRm10kUru8fXzleQBKtheMZ_7oSH_TgZ5jGA51lGEC6_7Af0-9gx80Z5Oh2RUslX3iGJVD7tBLzlH_T4wllMA8nMV1ba3vfihZ8s97C_hRkH1KzSuyFr2gZZ2h5hZyL71zS6Otw3FIYOcSy2090UhdSyxzc-LFq2ct2bDO2SQ06CDGBhHHbpqOl0yKtg5UHTbGgJtyORc9AWTZMs4y3FmzyHFC9v4P0BjbbMVq5uWNWNzITh-Yy_1D4lZj6Y5a4cVjkvCzPe2OHYXArxorKA9dBg7NBvKg.jpg',
  'https://cdn4.telesco.pe/file/ZiIxmUalAovPhnwI__auaflAIVe9Awfaxm3LJa0o3-zofJlBsRqgXXzu5Rc9fAb7sOmHAswYMwe2DiFYBg7Ilb6OBJG7wHzSSvneweAQBlrSjBtkc9n3FENA9T0kAMTjrq3dNzgDlm9_Jnx9ARE0hvTak7DdML50Pg0i-3mdfL4KYgXzAgRN-VwZNNm5__ySUda56osfv5NHafiEHdpfsZ-CHogVCi0zhG6F9tYFf-diCqGI_nTtTfQOoyUpCkjKmS1coO-Mt_oGCedh6QiuWH-qIOF_d_W82wFrniLkLSvPpRaQg91W_mWkIeKblGYBgPcBDOVtfBK4_pFpjemDTA.jpg',
  'https://cdn4.telesco.pe/file/QwaoQrYWBi5OOAxdjoMWw7Om8M_SjTlboQYYme5hxas45PPR939qGSGrjxEhns3BU7xvgAVoCFJkHeC9liAP-ko664xJZ0EzWyp5oyMgQTQ2Pp6AJ_nyauljnkxmIUdWMtGJt2Ab3R1qeAjtIV4l69GKA_hIJtOPZuau3YR5h6NkhM_-5p0tG3xqNPy8vQriBTRy-qfrMnaQUzi8ZbRVEVn0l18f_FopF47ucz0JzLoOGtPr6MkarH76O4gZPDENDq9DK1h7LZ1TonuXHFnvV-cPzvTMbx2_TONMZK2lrBPgvqnWLINz2ttQyrRTd6FnXSA3Q0kzceY0Lmji4aLAYA.jpg',
  'https://cdn4.telesco.pe/file/rd8zkeze_rCutZwa4491bDK3r0XdPkE9QYStfcNs9kWPSa6c5G3gsBxtr7CblAydYnK7tcchXQCnG3icgEwem20Wh-pzNKGiSgNzAcHx2WXrRhNIRVbBhuggYnHObpk3agygYHVBUrvkBoCMWeYT6g8v8StG13f1adji4IyRNvXya__Fs8EYLHTMGl_vhLEYuGp1Y5HPkjDtS-RolMypgiuegtng6EYxQzZJEX2M5204Ft4qAmw1UKMXLoopamdzMH5LjCTmyuwDffM6q1TlcRtF_Gew_-Fv_4ELoNXF7KF5Iw_GruT_qIiizaDzIPqO3ZgJXOoTUV9y4AOUWcwDnw.jpg',
]

/** Круассаны — прямой URL из поста TG */
const CROISSANT_URL =
  'https://cdn4.telesco.pe/file/Lmo-VjiRycpf3Fe_8Hj4h7y1HH9kKceU0DzFtxjzKpAwTPvN825_nF3GmAucejpBkj-whmSgXU425vPZ1pN-iUZbf-mvy21zIRN230hIyTeRoJ3HGq3W6b8pke-SNdDd1CIV8jRnD5mY-YCdj8XTF9Kz4_hBp4gAwdvrKzHjGFqOAtpnhGJyGyDniWHXUZHwq4z2z8YjZMrnMFGxZjFfbEEWX1a28HIgAkh2fS0OVXWHkQ-EGdFoQYPZ4SeXiIPyTbWI_1Lanln9zN4UoL2RMkz0rFcHOZRNXR4hLUXqJC0fg4h3QGgG8e2WMaktF2JDrUBAoE1C-SZjLzpPH91JQQ.jpg'

/** Проверенный маппинг слот → tg-N (transcript line 80) */
const SLOT_TO_TG = {
  'logo.jpg': 1,
  'images/interior/hero.jpg': 17,
  'images/interior/space-wide.jpg': 5,
  'images/interior/bonsai-seating.jpg': 12,
  'images/coffee/espresso-bar.jpg': 14,
  'images/food/breakfast-porridge.jpg': 30,
  'images/food/pastry-display.jpg': 6,
  'images/details/coffee-beans-wall.jpg': 8,
}

async function download(url) {
  const res = await fetch(url, { headers: { 'User-Agent': ua } })
  if (!res.ok) throw new Error(`${res.status} ${url.slice(0, 60)}`)
  return Buffer.from(await res.arrayBuffer())
}

async function urlsFromPosts(from, to) {
  const found = []
  for (let id = from; id <= to; id++) {
    try {
      const res = await fetch(`https://t.me/GCsEng3lzz/${id}`, {
        headers: { 'User-Agent': ua },
      })
      if (!res.ok) continue
      const html = await res.text()
      for (const m of html.matchAll(/https:\/\/cdn[0-9]\.telesco\.pe\/file\/[^"'\\s]+\.jpg/g)) {
        found.push(m[0])
      }
    } catch {
      /* skip unreachable posts */
    }
  }
  return [...new Set(found)]
}

fs.mkdirSync(tgDir, { recursive: true })

// tg-1…tg-14
for (let i = 0; i < CHANNEL_PREVIEW.length; i++) {
  const buf = await download(CHANNEL_PREVIEW[i])
  fs.writeFileSync(path.join(tgDir, `tg-${i + 1}.jpg`), buf)
  console.log('OK tg-' + (i + 1), buf.length)
}

// tg-15…tg-27 из постов 378–400
const batch2 = await urlsFromPosts(378, 400)
for (let i = 0; i < batch2.length; i++) {
  const n = 15 + i
  const buf = await download(batch2[i])
  fs.writeFileSync(path.join(tgDir, `tg-${n}.jpg`), buf)
  console.log('OK tg-' + n, buf.length)
}

// tg-28… из постов 350–377
const batch3 = await urlsFromPosts(350, 377)
for (let i = 0; i < batch3.length; i++) {
  const n = 28 + i
  const buf = await download(batch3[i])
  fs.writeFileSync(path.join(tgDir, `tg-${n}.jpg`), buf)
  console.log('OK tg-' + n, buf.length)
}

// Копируем в слоты
for (const [rel, tgN] of Object.entries(SLOT_TO_TG)) {
  const src = path.join(tgDir, `tg-${tgN}.jpg`)
  const dest = path.join(publicRoot, rel)
  if (!fs.existsSync(src)) {
    console.error('MISSING', rel, '← tg-' + tgN)
    continue
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(src, dest)
  console.log('SLOT', rel, '← tg-' + tgN)
}

// Круассан — отдельный URL
{
  const buf = await download(CROISSANT_URL)
  const dest = path.join(publicRoot, 'images/food/croissant.jpg')
  fs.writeFileSync(dest, buf)
  console.log('SLOT images/food/croissant.jpg (direct URL)', buf.length)
}

console.log('Done.')
