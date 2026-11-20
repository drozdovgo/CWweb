// Запуск парсера: npm run parse
//
// Берёт все сохранённые страницы Циана из папки parser/samples,
// достаёт из них объявления и записывает их в src/data/listings.json.
// Этот файл потом показывает сайт.

import fs from 'node:fs'
import { parsePage } from './cian.js'

const SAMPLES_DIR = 'parser/samples'
const OUTPUT_FILE = 'src/data/listings.json'

const files = fs.readdirSync(SAMPLES_DIR).filter((name) => name.endsWith('.html'))
let listings = []

for (const name of files) {
  const html = fs.readFileSync(`${SAMPLES_DIR}/${name}`, 'utf-8')
  const items = parsePage(html)
  console.log(`${name}: найдено объявлений ${items.length}`)
  listings.push(...items)
}

// одно и то же объявление могло попасть на две страницы — оставляем по одному на каждый id
const unique = new Map()
for (const item of listings) unique.set(item.id, item)
listings = [...unique.values()]

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(listings, null, 2))
console.log(`Сохранено ${listings.length} объявлений в ${OUTPUT_FILE}`)
