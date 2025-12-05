import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import HomeView from '../views/HomeView.vue'
import SimulationView from '../views/DashboardView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'hero',
      component: HomeView,
    },
    {
      path: '/simulation',
      name: 'simulation',
      component: SimulationView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ],
})

export default router
