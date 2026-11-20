// Вспомогательные функции: поиск/фильтры и форматирование текста.
// В них нет ничего от Vue, поэтому их легко проверить тестами (utils.test.js).

// Приводим текст к одному виду, чтобы «Студия» = «студия», а «ё» = «е»
function normalize(text) {
  return String(text || '').toLowerCase().replace(/ё/g, 'е').trim()
}

// Оставляет только объявления, которые подходят под все фильтры
export function filterListings(listings, filters) {
  const search = normalize(filters.search)

  return listings.filter((item) => {
    // поиск по названию (и по адресу — чтобы можно было искать улицу)
    if (search && !normalize(item.title + ' ' + item.address).includes(search)) return false

    // цена «от» и «до». Пустое поле — значит, ограничения нет
    if (filters.priceFrom !== '' && item.price < filters.priceFrom) return false
    if (filters.priceTo !== '' && item.price > filters.priceTo) return false

    // комнаты: если что-то отмечено, число комнат должно быть среди отмеченных
    if (filters.rooms.length > 0 && !filters.rooms.includes(item.rooms)) return false

    // район
    if (filters.district && item.district !== filters.district) return false

    return true
  })
}

// Сортировка. [...list] — копия, чтобы не менять исходный массив
export function sortListings(list, sort) {
  if (sort === 'cheap') return [...list].sort((a, b) => a.price - b.price)
  if (sort === 'expensive') return [...list].sort((a, b) => b.price - a.price)
  return list
}

// 32000 -> «32 000 ₽/мес.»
export function formatPrice(price) {
  return price ? `${price.toLocaleString('ru-RU')} ₽/мес.` : 'Цена не указана'
}

// 0 -> «Студия», 2 -> «2 комн.»
export function roomsText(rooms) {
  if (rooms === 0) return 'Студия'
  if (rooms) return `${rooms} комн.`
  return null
}

// 1 объявление, 3 объявления, 5 объявлений
export function countText(n) {
  const last = n % 10
  const lastTwo = n % 100
  let word = 'объявлений'
  if (last === 1 && lastTwo !== 11) word = 'объявление'
  else if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) word = 'объявления'
  return `${n} ${word}`
}
