// Общие данные сайта, которыми пользуются все страницы:
// список объявлений, значения фильтров и избранное.

import { reactive, ref, watch } from 'vue'
import data from './data/listings.json' // файл, который создал парсер

// Все объявления
export const listings = data

// Найти объявление по id (нужно странице подробностей)
export function findListing(id) {
  return listings.find((item) => item.id === id)
}

// Значения фильтров. reactive — значит, при изменении Vue сам перерисует страницу.
// Лежат здесь, а не в компоненте, поэтому не сбрасываются при переходе на другую страницу.
export const filters = reactive({
  search: '',
  priceFrom: '',
  priceTo: '',
  rooms: [], // выбранное число комнат, например [0, 2] (0 — студия)
  district: '',
  sort: 'none',
})

export function resetFilters() {
  filters.search = ''
  filters.priceFrom = ''
  filters.priceTo = ''
  filters.rooms = []
  filters.district = ''
}

// Избранное — массив id объявлений. Храним в localStorage браузера,
// поэтому оно не пропадает после перезагрузки страницы.
export const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))

// watch следит за массивом и сохраняет его при каждом изменении
watch(favorites, (value) => localStorage.setItem('favorites', JSON.stringify(value)), { deep: true })

export function toggleFavorite(id) {
  if (favorites.value.includes(id)) {
    favorites.value = favorites.value.filter((favId) => favId !== id) // убрать
  } else {
    favorites.value.push(id) // добавить
  }
}
