import { createRouter, createWebHistory } from 'vue-router'
import HeaderView from "../components/HeaderView.vue"
import LoginView from "../components/LoginView.vue"
// import RegisterView from "../components/RegisterView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HeaderView',
      component:HeaderView,
    },
    {
      path: '/loginView',
      name: 'LoginView',
      component:LoginView,
    }
    
  ]
})

export default router
