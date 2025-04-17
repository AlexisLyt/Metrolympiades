import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LeaderboardView from '@/views/LeaderboardView.vue'
import GamesView from '@/views/GamesView.vue'
import TeamView from '@/views/TeamView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderboardView,
    },
    {
      path: '/games',
      name: 'games',
      component: GamesView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/team',
      name: 'team',
      component: TeamView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isAuthenticated = localStorage.getItem('user') !== null

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})


export default router
