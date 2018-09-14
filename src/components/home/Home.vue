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
                active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <img :src="homeImg" alt="">
                            <span>首页</span>
                        </template>     
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>                      
                    </el-submenu>




                    <el-submenu index="2">
                        <template slot="title">
                            <img :src="backImg" alt="">
                            <span>后台管理</span>
                        </template>     
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item> 
                    </el-submenu>




                    <el-submenu index="3">
                        <template slot="title">
                            <img :src="dataImg" alt="">
                            <span>数据统计</span>
                        </template>     
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item> 
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <img :src="userMangeImg" alt="">
                            <span>用户管理</span>
                        </template>     
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item> 
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <img :src="channelImg" alt="">
                            <span>渠道管理</span>
                        </template>     
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item> 
                    </el-submenu>
                    <!-- <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item> -->
                </el-menu>
            </el-col>
           













            </el-aside>
            <el-container>
                <el-header>
                    <el-row>
                        当前时间：2018 年 9 月 13 日 10 时 30 分 30 秒
                    </el-row>
                    <el-row>
                        <span>
                            尊敬的  哈哈 ，您好
                        </span>
                        <el-button>
                            修改密码
                        </el-button>
                        <el-button>
                            注销
                        </el-button>
  
                    </el-row>

                  
                </el-header>
                <el-main>
                    <div>

                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import Store from '@/store'
export default {
    name: 'Home',
    data(){
        return {
           logo: require('../../assets/logo.png'),
           homeImg: require('../../assets/home-page.png'),
           backImg: require('../../assets/Backstage.png'),
           dataImg: require('../../assets/data.png'),
           userMangeImg: require('../../assets/user.png'),
           channelImg: require('../../assets/channel.png'),
        }
    },
    computed: {
        msg(){
            return Store.state.count
        }
    },
    methods: {
        jia () {
            Store.commit('increment')
        },

        jian () {
            Store.commit('reduce')
        },
     
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
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
           .el-menu-item{
               padding-left: 72px;
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


