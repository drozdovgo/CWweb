// Проверки поиска и фильтров: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { filterListings, sortListings, countText, formatPrice } from './utils.js'

const listings = [
  { id: 'a', title: 'Студия, 28 м²', address: 'ул. Зелёная, 1', price: 30000, rooms: 0, district: 'Центральный' },
  { id: 'b', title: '1-комн. квартира, 35 м²', address: 'ул. Военная, 5', price: 40000, rooms: 1, district: 'Ленинский' },
  { id: 'c', title: '2-комн. квартира, 54 м²', address: null, price: 70000, rooms: 2, district: 'Центральный' },
]

const noFilters = { search: '', priceFrom: '', priceTo: '', rooms: [], district: '', sort: 'none' }
const ids = (list) => list.map((item) => item.id)

test('без фильтров видны все объявления', () => {
  assert.deepEqual(ids(filterListings(listings, noFilters)), ['a', 'b', 'c'])
})

test('поиск по названию и улице, без учёта регистра и «ё»', () => {
  assert.deepEqual(ids(filterListings(listings, { ...noFilters, search: 'СТУДИЯ' })), ['a'])
  assert.deepEqual(ids(filterListings(listings, { ...noFilters, search: 'зеленая' })), ['a'])
  assert.deepEqual(ids(filterListings(listings, { ...noFilters, search: 'военная' })), ['b'])
  assert.deepEqual(ids(filterListings(listings, { ...noFilters, search: 'дворец' })), [])
})

test('фильтры по цене, комнатам и району', () => {
  assert.deepEqual(ids(filterListings(listings, { ...noFilters, priceFrom: 35000 })), ['b', 'c'])
  assert.deepEqual(ids(filterListings(listings, { ...noFilters, priceTo: 40000 })), ['a', 'b'])
  assert.deepEqual(ids(filterListings(listings, { ...noFilters, rooms: [0, 2] })), ['a', 'c'])
  assert.deepEqual(ids(filterListings(listings, { ...noFilters, district: 'Центральный' })), ['a', 'c'])
})

test('сортировка по цене', () => {
  assert.deepEqual(ids(sortListings(listings, 'expensive')), ['c', 'b', 'a'])
  assert.deepEqual(ids(sortListings(listings, 'cheap')), ['a', 'b', 'c'])
})

test('тексты: склонение и цена', () => {
  assert.equal(countText(1), '1 объявление')
  assert.equal(countText(3), '3 объявления')
  assert.equal(countText(11), '11 объявлений')
  assert.equal(countText(83), '83 объявления')
  assert.equal(formatPrice(32000).replace(/\s/g, ' '), '32 000 ₽/мес.')
  assert.equal(formatPrice(null), 'Цена не указана')
})
