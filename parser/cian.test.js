// Проверки парсера: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { parsePage, convertOffer, makeTitle } from './cian.js'

test('настоящая страница Циана разбирается: 28 объявлений', () => {
  const html = fs.readFileSync('parser/samples/cian-novosibirsk-p1.html', 'utf-8')
  const listings = parsePage(html)

  assert.equal(listings.length, 28)

  const first = listings[0]
  assert.equal(first.title, 'Студия, 28 м²')
  assert.equal(first.price, 32000)
  assert.equal(first.district, 'Дзержинский')
  assert.equal(first.rooms, 0)
  assert.equal(first.area, 28)
  assert.equal(first.floor, '17 из 25')
  assert.equal(first.address, 'ул. Коминтерна, 130')
  assert.ok(first.description.length > 0)
  assert.ok(first.photos.length > 0)
})

test('объявление без данных не ломает парсер', () => {
  const listing = convertOffer({ id: 1 })
  assert.equal(listing.title, 'Квартира')
  assert.equal(listing.price, null)
  assert.equal(listing.district, null)
  assert.deepEqual(listing.photos, [])
})

test('название собирается из комнат и площади', () => {
  assert.equal(makeTitle(0, 28), 'Студия, 28 м²')
  assert.equal(makeTitle(2, 54.5), '2-комн. квартира, 54,5 м²')
  assert.equal(makeTitle(null, null), 'Квартира')
})

test('страница без данных (капча) даёт понятную ошибку', () => {
  assert.throws(() => parsePage('<html>Вы не робот?</html>'), /нет данных Циана/)
})
