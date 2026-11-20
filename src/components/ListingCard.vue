<script setup>
import FavoriteButton from './FavoriteButton.vue'
import { formatPrice } from '../utils.js'

defineProps({ listing: Object })
</script>

<template>
  <!-- вся карточка — ссылка на страницу объявления -->
  <RouterLink :to="`/listing/${listing.id}`" class="card">
    <img v-if="listing.photos.length" :src="listing.photos[0].small" class="photo" alt="" />
    <div v-else class="photo no-photo">Нет фото</div>

    <div class="info">
      <div class="price">{{ formatPrice(listing.price) }}</div>
      <div class="title">{{ listing.title }}</div>
      <!-- v-if: строка показывается, только если поле есть -->
      <div v-if="listing.district" class="muted">р-н {{ listing.district }}</div>
      <div v-if="listing.address" class="muted">{{ listing.address }}</div>
      <FavoriteButton :id="listing.id" class="fav" />
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
}

.card:hover {
  border-color: var(--accent);
}

.photo {
  width: 100%;
  height: 170px;
  object-fit: cover;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  flex: 1;
}

.price {
  font-size: 19px;
  font-weight: bold;
}

.title {
  font-weight: bold;
}

.fav {
  align-self: flex-start;
  margin-top: auto; /* кнопка прижата к низу карточки */
}

.info .muted:last-of-type {
  margin-bottom: 8px;
}
</style>
