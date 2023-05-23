import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import LoginView from "../views/LoginView.vue"
import RegisterView from "../views/RegisterView.vue"
import ShopCarView from "../views/ShopCarView.vue"
import Question from "../views//QuestionView.vue"
import BackSystem from "../views/BackSystemView.vue"
import circle from "../components/circle.vue"
import BackMembers from "../components/BackMembers.vue"
import BackProduct from "../components/BackProduct.vue"



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
      component: ShopCarView,
    },
    {
      path: '/question',
      name: 'Question',
      component: Question,
    },
    {
      path: '/member',
      name: 'MemberView',
      component: () => import("../views/MemberView.vue"),
    },
    {
      path: '/backSystem',
      name: 'BackSystem',
      component: BackSystem,
    },
    {
      path: '/circle',
      name: 'circle',
      component: circle,
    },
    {
      path: '/backMembers',
      name: 'backMembers',
      component: BackMembers,
    },
    {
      path: '/backProduct',
      name: 'BackProduct',
      component: BackProduct,
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
