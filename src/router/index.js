import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Main from '@/components/main/Main'
import Home from "@/components/main/Home"
import ChannelDetail from "@/components/main/ChannelDetail"
import RoleManage from "@/components/main/role_manage/RoleManage"
import ChannelManage from "@/components/main/channelMange/ChannelManage"

Vue.use(Router)


  const routes = [
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

          { //角色管理
            path: '/rolemanage',
            component: RoleManage 
          },

          { //渠道管理
            path: '/channelmanage',
            component: ChannelManage 
          },

          { //渠道详情
            path: '/channeldetail',
            component: ChannelDetail 
          }
      ]
    }
  ]


const router = new Router({
  routes: routes
})

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token');
  if ( token !== "TRUE" && to.path != '/login' ) {
    next({ path: '/login' });
  }else {
    next();
  }

 
})

export default router