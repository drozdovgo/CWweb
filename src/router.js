// Роутер: какой адрес какую страницу показывает
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import FavoritesView from './views/FavoritesView.vue'
import ListingView from './views/ListingView.vue'

export const router = createRouter({
  history: createWebHashHistory(), // адреса вида /#/favorites
  routes: [
    { path: '/', component: HomeView }, // список объявлений
    { path: '/favorites', component: FavoritesView }, // избранное
    { path: '/listing/:id', component: ListingView, props: true }, // одно объявление; id попадёт в props
  ],
  // при переходе на новую страницу — наверх, при «Назад» — туда, где были
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})
