<script setup>
import { favorites } from './store.js'
</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <RouterLink to="/" class="logo">Сдаётся</RouterLink>
      <nav class="nav">
        <RouterLink to="/">Объявления</RouterLink>
        <RouterLink to="/favorites">♥ Избранное ({{ favorites.length }})</RouterLink>
      </nav>
    </div>
  </header>

  <!-- сюда роутер подставляет текущую страницу -->
  <main class="container main">
    <RouterView />
  </main>
</template>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid var(--border);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: var(--text);
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 16px;
}

.nav a {
  color: var(--text);
  text-decoration: none;
}

/* router-link-exact-active роутер сам ставит ссылке на текущую страницу */
.nav a.router-link-exact-active {
  color: var(--accent);
  font-weight: bold;
}

.main {
  padding-top: 24px;
  padding-bottom: 40px;
}
</style>
