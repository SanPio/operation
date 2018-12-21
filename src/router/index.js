import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Main from '@/components/main/Main'
import Home from "@/components/main/Home"
import ChannelDetail from "@/components/main/ChannelDetail"
import RoleManage from "@/components/main/role_manage/RoleManage"
import ChannelManage from "@/components/main/channelMange/ChannelManage"
import UserInfo from "@/components/main/user_info/UserInfo"
import InvitDetail from "@/components/main/invit_detail/InvitDetail"
import Increment from "@/components/main/increment/Increment"
import Collocation from "@/components/main/collocation/Collocation"
import AccountBindList from "@/components/main/accountBindList/AccountBindList"
import DataInformation from "@/components/main/dataInformation/DataInformation"
import SignalInfo from "@/components/main/signal_info/SignalInfo"
import SignalProfit from "@/components/main/signal_profit/SignalProfit"
import followDetails from "@/components/main/follow_details/followDetails"
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

          { //信号源基础信息
            path: '/signal_info',
            component: SignalInfo 
          },

          { //信号源收益详情
            path: '/signal_profit',
            component: SignalProfit
          },

          { //信号源跟随详情
            path: '/follow_details',
            component: followDetails
          },
          
          { //用户信息
            path: '/user_info',
            component: UserInfo 
          },
          
          { //邀请明细
            path: '/invitdetail',
            component: InvitDetail 
          },

          { //VIP增值业务
            path: '/increment',
            component: Increment 
          },

          { //账号绑定记录
            path: '/accountBindList',
            component: AccountBindList 
          },

          { //跟单配置记录
            path: '/collocation',
            component: Collocation 
          },

          { //渠道管理
            path: '/channelmanage',
            component: ChannelManage 
          },

          { //渠道详情
            path: '/channeldetail',
            component: ChannelDetail 
          },

           { //数据信息
              path: '/dataInformation',
              component:DataInformation
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