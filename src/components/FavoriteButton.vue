<script setup>
import { favorites, toggleFavorite } from '../store.js'

defineProps({ id: String })
</script>

<template>
  <!-- .prevent — кнопка лежит внутри ссылки-карточки, и при клике переходить по ссылке не нужно -->
  <button class="fav" :class="{ active: favorites.includes(id) }" @click.prevent="toggleFavorite(id)">
    {{ favorites.includes(id) ? '♥ В избранном' : '♡ В избранное' }}
  </button>
</template>

<style scoped>
.fav {
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: white;
  font: inherit;
  cursor: pointer;
}

.fav.active,
.fav:hover {
  border-color: var(--red);
  color: var(--red);
}
</style>
