<script setup>
import { computed } from 'vue'
import PhotoGallery from '../components/PhotoGallery.vue'
import FavoriteButton from '../components/FavoriteButton.vue'
import { findListing } from '../store.js'
import { formatPrice, roomsText } from '../utils.js'

const props = defineProps({ id: String }) // id приходит из адреса /listing/:id

const listing = computed(() => findListing(props.id))
</script>

<template>
  <RouterLink to="/">← Ко всем объявлениям</RouterLink>

  <div v-if="!listing" class="empty">
    <p><b>Объявление не найдено</b></p>
  </div>

  <div v-else class="detail">
    <PhotoGallery :photos="listing.photos" class="gallery" />

    <div class="info">
      <h1>{{ listing.title }}</h1>
      <div class="price">{{ formatPrice(listing.price) }}</div>

      <div class="actions">
        <FavoriteButton :id="listing.id" />
        <a v-if="listing.url" :href="listing.url" target="_blank" class="btn">Открыть на Циане</a>
      </div>

      <!-- каждая строка показывается, только если поле есть (v-if) -->
      <table class="table">
        <tr v-if="listing.district"><td>Район</td><td>{{ listing.district }}</td></tr>
        <tr v-if="listing.address"><td>Адрес</td><td>{{ listing.address }}</td></tr>
        <tr v-if="listing.metro"><td>Метро</td><td>{{ listing.metro }}</td></tr>
        <tr v-if="roomsText(listing.rooms)"><td>Комнаты</td><td>{{ roomsText(listing.rooms) }}</td></tr>
        <tr v-if="listing.area"><td>Площадь</td><td>{{ String(listing.area).replace('.', ',') }} м²</td></tr>
        <tr v-if="listing.floor"><td>Этаж</td><td>{{ listing.floor }}</td></tr>
        <tr v-if="listing.deposit"><td>Залог</td><td>{{ listing.deposit.toLocaleString('ru-RU') }} ₽</td></tr>
      </table>
    </div>

    <div class="description">
      <h2>Описание</h2>
      <p v-if="listing.description" class="text">{{ listing.description }}</p>
      <p v-else class="muted">Описание не указано.</p>
    </div>
  </div>
</template>

<style scoped>
.detail {
  display: grid;
  grid-template-columns: 3fr 2fr; /* слева фото, справа информация */
  gap: 24px;
  margin-top: 16px;
}

.detail > * {
  min-width: 0; /* не даём ленте миниатюр растянуть колонку */
}

.price {
  font-size: 26px;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 8px;
  margin: 16px 0;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table td {
  padding: 7px 0;
  border-bottom: 1px solid var(--border);
}

.table td:first-child {
  width: 40%;
  color: var(--muted);
}

.description {
  grid-column: 1 / -1; /* описание — на всю ширину под фото и информацией */
  padding: 16px;
  background: white;
  border: 1px solid var(--border);
  border-radius: 8px;
}

.description h2 {
  margin-top: 0;
}

.text {
  white-space: pre-line; /* сохраняем переносы строк из текста продавца */
}

.empty {
  margin-top: 16px;
}

/* на телефоне — всё в одну колонку */
@media (max-width: 800px) {
  .detail {
    grid-template-columns: 1fr;
  }
}
</style>
