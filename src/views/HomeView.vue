<script setup>
import { computed } from 'vue'
import FiltersPanel from '../components/FiltersPanel.vue'
import ListingCard from '../components/ListingCard.vue'
import { listings, filters, resetFilters } from '../store.js'
import { filterListings, sortListings, countText } from '../utils.js'

// computed пересчитывается сам, как только меняется любой фильтр
const results = computed(() => sortListings(filterListings(listings, filters), filters.sort))
</script>

<template>
  <h1>Аренда квартир в Новосибирске</h1>

  <FiltersPanel />

  <div class="toolbar">
    <span>Найдено: <b>{{ countText(results.length) }}</b></span>
    <select v-model="filters.sort" class="input">
      <option value="none">Без сортировки</option>
      <option value="cheap">Сначала дешевле</option>
      <option value="expensive">Сначала дороже</option>
    </select>
  </div>

  <div v-if="results.length > 0" class="grid">
    <ListingCard v-for="listing in results" :key="listing.id" :listing="listing" />
  </div>

  <div v-else class="empty">
    <p><b>Ничего не найдено</b></p>
    <p class="muted">По выбранным условиям объявлений нет. Попробуйте изменить фильтры.</p>
    <button class="btn" @click="resetFilters">Сбросить фильтры</button>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 16px 0;
}
</style>
