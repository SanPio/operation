<template>
    <div id="box">
        <el-container>
            <el-aside>
                <el-row type="flex" class="row-bg" justify="center">
                    <img :src="logo" alt="" >
                </el-row>

                <el-col :span="24">
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#11183f"
                text-color="#fff"
                :unique-opened="uniqueOpened"
              
                active-text-color="#ffd04b">
                   
                    <el-menu-item index="1">
                        <img :src="homeImg" alt="">
                        <span slot="title">
                            首页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                 
                    </el-menu-item>
                    


                    <el-submenu index="2">
                        <template slot="title">
                            <img :src="backImg" alt="">
                            <span>
                                后台管理
                            </span>
                        </template>     
                        <el-menu-item index="2-1">
                            账号管理
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            权限管理
                        </el-menu-item> 
                        <el-menu-item index="2-3">
                            角色管理
                        </el-menu-item>
                        <el-menu-item index="2-4">
                            操作记录
                        </el-menu-item>
                        <el-menu-item index="2-5">
                            密码修改
                        </el-menu-item>
                    </el-submenu>




                    <el-submenu index="3">
                        <template slot="title">
                            <img :src="dataImg" alt="">
                            <span>
                                数据统计
                            </span>
                        </template>     
                        <el-menu-item index="3-1">
                            数据信息
                        </el-menu-item>
                       
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <img :src="userMangeImg" alt="">
                            <span>
                                用户管理
                            </span>
                        </template>     
                        <el-menu-item index="4-1">
                            用户信息
                        </el-menu-item>
                        <el-menu-item index="4-2">
                            订单信息
                        </el-menu-item> 
                        <el-menu-item index="4-3">
                            邀请明细
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <img :src="channelImg" alt="">
                            <span>
                                渠道管理
                            </span>
                        </template>     
                        <el-menu-item index="5-1" @click="hahah('/main/home')">
                            渠道详情
                        </el-menu-item>
                        
                    </el-submenu>
               
                </el-menu>
            </el-col>
           













            </el-aside>
            <el-container>
                <el-header>
                    <el-row>
                        <!-- 当前时间：2018 年 9 月 13 日 10 时 30 分 30 秒 -->
                        当前时间：{{ myTime }}
                    </el-row>
                    <el-row>
                        <span>
                            尊敬的  哈哈 ，您好
                        </span>
                        <el-button>
                            修改密码
                        </el-button>
                        <router-link to="/login">
                            <el-button>
                                注销
                            </el-button>
                        </router-link>
                        
  
                    </el-row>

                  
                </el-header>
                <el-main>
                    <div>
                        <p>
                           当前位置:主页 
                        </p>
                        <router-view/>
                        <router-link to="/main/home">Home</router-link>
                    </div>
                    
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script>

import Store from '@/store'

export default {
    name: 'Main',
    data(){
        return {
            logo: require('../../assets/logo.png'),
            homeImg: require('../../assets/home-page.png'),
            backImg: require('../../assets/Backstage.png'),
            dataImg: require('../../assets/data.png'),
            userMangeImg: require('../../assets/user.png'),
            channelImg: require('../../assets/channel.png'),
            uniqueOpened: true,
            routerOpen: true,
           
        }
    },
    computed: {
        //获取本地时间
        myTime () {
            return Store.state.time
        }
    },
    mounted () {
       
        this.timer = setInterval(this.getMyTime,1000)
    },
    methods: {
        
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        getMyTime () {
            Store.commit('getTime')
        },



        hahah(val){
            this.$router.push({
                path:val,
                // query:{//通过query 传递参数
                // goodsDetail:需要传递的参数,
                // }
            });
        }
 
    }
}
</script>
<style lang="scss" scoped>   
    .el-header {
        background-color: #fff;
        color: #333;
        height: 8vh;
        padding: 0 2%;
        line-height: 8vh;
        display: flex;
        justify-content:space-between;
        font-size: 14px;
        
        span{
            font-size: 20px;
            font-weight: bold;
            margin-right: 30px;
        }
        .el-button{
            padding: 10px 0;
            color: #666;
            width: 90px;
        }
    }
    .el-aside {
        background-color: #11183f;
        color: #fff;
        width: 300px;
        .el-row{
            img{
                width: 140px;
                height: 56px;
                margin-top: 17px;
            }
        }
        .el-menu{
            width: 300px;
            .el-submenu{
                span {
                    font-size: 16px;
                }
            }
           .el-menu-item{
               padding-left: 72px;
               span{
                   font-size: 16px;
               }
           }
        }
        

    }
    
    .el-main {
        background-color: #f2f2f2;
        height: 92vh;
        padding: 0 2%;
        div{
            width: 100%;
            height: 100%;
            background-color: red;
        }
    }
    
    
    
   
</style>


