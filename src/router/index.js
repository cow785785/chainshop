import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import LoginView from "../components/LoginView.vue"
import RegisterView from "../components/RegisterView.vue"
import ShopCarView from "../components/ShopCarView.vue"
import Question from "../components//Question.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/loginView',
      name: 'LoginView',
      component: LoginView,
    },
    {
      path: '/registerView',
      name: 'RegisterView',
      component: RegisterView,
    },
    {
      path: '/shopCarView',
      name: 'ShopCarView',
      component:ShopCarView,
    },
    {
      path: '/question',
      name: 'Question',
      component:Question,
    },
    {
      path: '/member',
      name: 'MemberView',
      component: () => import("../views/MemberView.vue"),
    },
    {
      path: '/backstage',
      name: 'BackstageView',
      component: () => import("../views/BackstageView.vue"),
    },
    {
      path: '/order',
      name: 'OrderView',
      component: () => import("../views/OrderView.vue"),
    },
    {
      path: '/product_info',
      name: 'ProductInfoView',
      component: () => import("../views/ProductInfoView.vue"),
    },

  ]
})

export default router
