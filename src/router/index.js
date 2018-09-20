import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Main from '@/components/main/Main'
import Home from "@/components/main/Home";
import ChannelDetail from "@/components/main/ChannelDetail";

Vue.use(Router)

export default new Router({
  routes: [
    //登录
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    
    //系统主体
    {
      path: '/',
      component: Main,
      children: [
          { path: '',
            redirect: '/home',
          },

          { //主页
            path: '/home',
            component: Home 
          },
          { //渠道详情
            path: '/channeldetail',
            component: ChannelDetail 
          },
      ]
    }
  ]
})
