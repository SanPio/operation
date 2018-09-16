import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Main from '@/components/main/Main'
import Home from "@/components/main/Home";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
         { path: '/main/home', component: Home },
    // { path: '/home/reg', component: Reg }
      ]
    }
  ]
})
