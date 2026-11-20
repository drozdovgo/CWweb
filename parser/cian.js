// Функции, которые достают объявления из HTML-страницы поиска Циана.
//
// Как Циан хранит данные. Внутри страницы есть тег <script> с такой строкой:
//   window._cianConfig['frontend-serp'] = (window._cianConfig['frontend-serp'] || []).concat([ ...JSON... ]);
// Внутри concat( ... ) лежит обычный JSON-массив. В нём есть элемент с key = "initialState",
// а в нём — список объявлений: value.results.offers.
// Значит, разбирать вёрстку не нужно: вырезаем этот JSON и читаем его.

const MARKER = "_cianConfig['frontend-serp'] = ("

// 1. Из HTML достаём массив объявлений в том виде, как его хранит Циан
export function extractOffers(html) {
  const markerPos = html.indexOf(MARKER)
  if (markerPos === -1) {
    throw new Error('На странице нет данных Циана. Возможно, вместо поиска сохранилась капча.')
  }

  const start = html.indexOf('.concat(', markerPos) + '.concat('.length // начало JSON
  const end = html.indexOf('</script>', start) // конец тега script
  const json = html.slice(start, end).trim().replace(/\);$/, '') // убираем хвост ");"

  const config = JSON.parse(json)
  const state = config.find((item) => item.key === 'initialState')
  return state.value.results.offers
}

// 2. Одно объявление Циана превращаем в простой объект для нашего сайта.
//    Если какого-то поля нет, кладём null — сайт просто не покажет эту строку.
export function convertOffer(offer) {
  const rooms = offer.flatType === 'studio' ? 0 : offer.roomsCount ?? null // студия = 0 комнат
  const area = offer.totalArea ? Number(offer.totalArea) : null
  const address = offer.geo?.address || []
  const findPart = (type) => address.find((part) => part.type === type)
  const street = findPart('street')?.shortName // «ул. Коминтерна»
  const house = findPart('house')?.shortName // «130»
  const metro = offer.geo?.undergrounds?.[0]
  const floorsCount = offer.building?.floorsCount

  return {
    id: String(offer.id),
    title: makeTitle(rooms, area),
    price: offer.bargainTerms?.priceRur ?? null,
    deposit: offer.bargainTerms?.deposit || null,
    district: findPart('raion')?.name ?? null, // «Дзержинский»
    address: [street, house].filter(Boolean).join(', ') || null,
    metro: metro ? `${metro.name}, ${metro.time} мин.` : null,
    rooms,
    area,
    floor: offer.floorNumber ? (floorsCount ? `${offer.floorNumber} из ${floorsCount}` : String(offer.floorNumber)) : null,
    description: offer.description || null,
    photos: (offer.photos || []).map((photo) => ({ small: photo.thumbnail2Url, big: photo.fullUrl })),
    url: offer.fullUrl ? offer.fullUrl.split('?')[0] : null, // ссылка без служебных параметров
  }
}

// Название одинакового вида для всех объявлений: «Студия, 28 м²», «2-комн. квартира, 54 м²»
export function makeTitle(rooms, area) {
  let title = 'Квартира'
  if (rooms === 0) title = 'Студия'
  else if (rooms) title = `${rooms}-комн. квартира`
  return area ? `${title}, ${String(area).replace('.', ',')} м²` : title // 54.5 -> «54,5»
}

// 3. Всё вместе: HTML страницы -> массив наших объявлений
export function parsePage(html) {
  return extractOffers(html).map(convertOffer)
}
