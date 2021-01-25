import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/views/Index";
import BookManage from "@/views/BookManage";
import AddBook from "@/views/AddBook";
import Update from "@/views/Update";

Vue.use(VueRouter)

const routes = [
  {
    show: true,
    path: "/",
    name: "图书管理",
    component: Index,
    redirect: '/BookManage',
    children: [
      {
        path: '/BookManage',
        name: "查询图书",
        component: BookManage
      },
      {
        path: '/AddBook',
        name: "添加图书",
        component: AddBook
      }
    ]
  },
  {
    show: false,
    path: "/Update",
    component: Update
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
