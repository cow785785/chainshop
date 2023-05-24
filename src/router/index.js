import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import LoginView from "../views/LoginView.vue"
import RegisterView from "../components/RegisterView.vue"
import ShopCarView from "../components/ShopCarView.vue"
import Question from "../components//Question.vue"
import BackSystem from "../views/BackSystem.vue"
import circle from "../components/circle.vue"
import BackMembers from "../views/BackMembers.vue"
import BackProduct from "../views/BackProduct.vue"
import BackOrderListView from "../views/BackOrderListView.vue"



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
      path: '/backSystem',
      name: 'BackSystem',
      component:BackSystem,
    },
    {
      path: '/circle',
      name: 'circle',
      component:circle,
    },
    {
      path: '/backMembers',
      name: 'backMembers',
      component:BackMembers,
    },
    {
      path: '/backProduct',
      name: 'BackProduct',
      component:BackProduct,
    },
    {
      path: '/backOrderListView',
      name: 'BackOrderListView',
      component:BackOrderListView,
    }
  ]
})

export default router
