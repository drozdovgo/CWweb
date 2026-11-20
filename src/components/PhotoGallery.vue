<script setup>
import { ref } from 'vue'

const props = defineProps({ photos: Array })

const current = ref(0) // номер фото, которое сейчас показано

// листаем по кругу: после последнего фото — снова первое
function next() {
  current.value = (current.value + 1) % props.photos.length
}
function prev() {
  current.value = (current.value - 1 + props.photos.length) % props.photos.length
}
</script>

<template>
  <div v-if="photos.length === 0" class="big no-photo">Нет фото</div>

  <div v-else>
    <div class="big-wrap">
      <img :src="photos[current].big" class="big" alt="" />
      <button v-if="photos.length > 1" class="arrow left" @click="prev">‹</button>
      <button v-if="photos.length > 1" class="arrow right" @click="next">›</button>
      <span class="counter">{{ current + 1 }} / {{ photos.length }}</span>
    </div>

    <!-- маленькие фото: клик по ним открывает это фото крупно -->
    <div class="thumbs">
      <img
        v-for="(photo, index) in photos"
        :key="photo.small"
        :src="photo.small"
        :class="{ active: index === current }"
        alt=""
        @click="current = index"
      />
    </div>
  </div>
</template>

<style scoped>
.big-wrap {
  position: relative;
}

.big {
  display: block;
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 8px;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  font-size: 26px;
  cursor: pointer;
}

.left {
  left: 10px;
}

.right {
  right: 10px;
}

.counter {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 13px;
}

.thumbs {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  overflow-x: auto;
}

.thumbs img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.6;
}

.thumbs img.active {
  border-color: var(--accent);
  opacity: 1;
}

@media (max-width: 600px) {
  .big {
    height: 260px;
  }
}
</style>
