<script setup>
import { computed } from 'vue'
import ListingCard from '../components/ListingCard.vue'
import { listings, favorites } from '../store.js'
import { countText } from '../utils.js'

// из всех объявлений оставляем те, чьи id лежат в избранном
const favoriteListings = computed(() => listings.filter((item) => favorites.value.includes(item.id)))
</script>

<template>
  <h1>Избранное</h1>

  <div v-if="favoriteListings.length > 0">
    <p class="muted">{{ countText(favoriteListings.length) }}</p>
    <div class="grid">
      <ListingCard v-for="listing in favoriteListings" :key="listing.id" :listing="listing" />
    </div>
  </div>

  <div v-else class="empty">
    <p><b>В избранном пока пусто</b></p>
    <p class="muted">Нажмите «♡ В избранное» на карточке объявления.</p>
    <RouterLink to="/" class="btn">Смотреть объявления</RouterLink>
  </div>
</template>
