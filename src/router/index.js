import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import App from "@/App";
import PageOne from "@/views/PageOne";
import PageTwo from "@/views/PageTwo";
import PageThree from "@/views/PageThree";
import PageFour from "@/views/PageFour";
import Index from "@/views/Index";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "图书管理",
    component: Index,
    redirect: '/pageOne',
    children: [
      {
        path: '/pageOne',
        name: "查询图书",
        component: PageOne
      },
      {
        path: '/pageTwo',
        name: "添加图书",
        component: PageTwo
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
