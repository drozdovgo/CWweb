<script setup>
import { listings, filters, resetFilters } from '../store.js'
import { roomsText } from '../utils.js'

// Варианты для фильтров берём из самих объявлений.
// new Set убирает повторы, sort — по порядку.
const roomOptions = [...new Set(listings.map((item) => item.rooms))].filter((r) => r !== null).sort()
const districts = [...new Set(listings.map((item) => item.district))].filter(Boolean).sort()
</script>

<template>
  <div class="filters">
    <!-- v-model связывает поле ввода со значением в filters: ввели текст — filters.search изменился -->
    <input v-model="filters.search" class="input search" placeholder="Поиск по названию или улице" />

    <div class="row">
      <label>
        Цена от, ₽<br />
        <!-- .number — превращает введённый текст в число -->
        <input v-model.number="filters.priceFrom" class="input" type="number" />
      </label>

      <label>
        Цена до, ₽<br />
        <input v-model.number="filters.priceTo" class="input" type="number" />
      </label>

      <div>
        Комнаты<br />
        <!-- v-model на массив: отмеченные галочки попадают в filters.rooms -->
        <label v-for="rooms in roomOptions" :key="rooms" class="room">
          <input v-model="filters.rooms" type="checkbox" :value="rooms" />
          {{ roomsText(rooms) }}
        </label>
      </div>

      <label>
        Район<br />
        <select v-model="filters.district" class="input">
          <option value="">Все районы</option>
          <option v-for="district in districts" :key="district">{{ district }}</option>
        </select>
      </label>

      <button class="btn" @click="resetFilters">Сбросить</button>
    </div>
  </div>
</template>

<style scoped>
.filters {
  padding: 16px;
  background: white;
  border: 1px solid var(--border);
  border-radius: 8px;
}

.search {
  width: 100%;
  font-size: 16px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 12px 20px;
  margin-top: 12px;
  color: var(--muted);
  font-size: 14px;
}

.row .input {
  width: 140px;
  margin-top: 4px;
  color: var(--text);
}

.row select.input {
  width: 190px;
}

.room {
  display: inline-block;
  margin: 10px 12px 0 0;
  color: var(--text);
  font-size: 15px;
}
</style>
