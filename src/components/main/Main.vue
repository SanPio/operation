<template>
    <div id="box">
        <el-container>

            <!-- 左侧导航 -->
            <el-aside>

                <!-- logo -->
                <el-row type="flex" class="row-bg" justify="center">
                    <img :src="logo" alt="" >
                </el-row>

                <!-- 导航列表 -->
                <el-col :span="24">
                    <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#11183f"
                    text-color="#fff"
                    :unique-opened="uniqueOpened"
                    active-text-color="#ffd04b">
                        <el-menu-item index="1" @click="routeTo('/home',0,'','首页')">
                            <img :src="imgCli[0] ? homeImgCli : homeImg" alt="">
                            <span slot="title">
                                首页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                        </el-menu-item>

                        <el-submenu index="2">
                            <template slot="title">
                                <img :src="imgCli[1] ? backImgCli : backImg" alt="">
                                <span>
                                    后台管理
                                </span>
                            </template>     
                            <el-menu-item index="2-1" @click="routeTo('/home',1)">
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;账号管理
                            </el-menu-item>
                            <el-menu-item index="2-2" @click="routeTo('/home',1)">
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;权限管理
                            </el-menu-item> 
                            <el-menu-item index="2-3" @click="routeTo('/home',1)">
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;角色管理
                            </el-menu-item>
                            <el-menu-item index="2-4" @click="routeTo('/home',1)">
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;操作记录
                            </el-menu-item>          
                        </el-submenu>

                        <el-submenu index="3">
                            <template slot="title">
                                <img :src="imgCli[2] ? dataImgCli : dataImg" alt="">
                                <span>
                                    数据统计
                                </span>
                            </template>     
                            <el-menu-item index="3-1" @click="routeTo('/home',2)">
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;数据信息
                            </el-menu-item>
                        
                        </el-submenu>

                        <el-submenu index="4">
                            <template slot="title">
                                <img :src="imgCli[3] ? userMangeImgCli :userMangeImg" alt="">
                                <span>
                                    用户管理
                                </span>
                            </template>     
                            <el-menu-item index="4-1" @click="routeTo('/home',3)">
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;用户信息
                            </el-menu-item>
                            <el-menu-item index="4-2" @click="routeTo('/home',3)">
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;订单信息
                            </el-menu-item> 
                            <el-menu-item index="4-3" @click="routeTo('/home',3)">
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;邀请明细
                            </el-menu-item>
                        </el-submenu>

                        <el-submenu index="5">
                            <template slot="title">
                                <img :src="imgCli[4] ? channelImgCli : channelImg" alt="">
                                <span>
                                    渠道运营
                                </span>
                            </template>   
                            <el-menu-item index="5-1" @click="routeTo('/home',4,'渠道运营','渠道管理')">
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;渠道管理
                            </el-menu-item>    
                            <el-menu-item index="5-2" @click="routeTo('/channeldetail',4,'渠道运营','渠道详情')" >
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;渠道详情
                            </el-menu-item>  
                        </el-submenu>
                    </el-menu>
                </el-col>
            </el-aside>
            <el-container>
                <!-- 头部 -->
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
                <!-- 主体内容 -->
                <el-main>
                   <el-container>
                       <!-- 面包屑导航 -->
                        <el-header style="height:40px ">
                            <span>
                               当前位置： 
                            </span>
                            
                            <span v-if="locTitle" class="loc-title">
                                {{ locTitle }}
                            </span>
                            <span v-if="locTitle" class="loc-title">
                                >
                            </span>
                            <span class="loc-details">
                                {{ locDetails }}
                            </span>
                        </el-header>
                        <!-- 主视口 -->
                        <el-main >
                            <router-view />
                        </el-main>
                        <!-- 底部 -->
                        <el-footer style="height:40px;font-size:10px;line-height:40px;color:#999">
                            <span style="margin-left:40px">
                                版本: {{ version }}
                            </span>
                            <span>
                                铭钰实业有限公司
                            </span>
                        </el-footer>
                    </el-container>
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
                homeImgCli: require('../../assets/home-page2.png'),
                backImgCli: require('../../assets/Backstage-2.png'),
                dataImgCli: require('../../assets/data-2.png'),
                userMangeImgCli: require('../../assets/user-2.png'),
                channelImgCli: require('../../assets/channel-2.png'),
                imgCli: [true,false,false,false,false],
                uniqueOpened: true, // 展开一个列表
                version: 'v1.0',    // 版本号码
                locTitle: '',
                locDetails: '首页'
            
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

        beforeDestroy () {
            clearInterval(this.timer)
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

            routeTo(val,ind,locTit,locdeta){
                //路由跳转
                this.$router.push({
                    path:val,
                    // query:{//通过query 传递参数
                    // goodsDetail:需要传递的参数,
                    // }
                });

                //导航图标变色
                this.imgCli = [false,false,false,false,false,];
                this.$set(this.imgCli,ind,true);
                
                this.locTitle = locTit;
                this.locDetails = locdeta;
            }
    
        }
    }
</script>
<style lang="scss" scoped>   
    .el-header {
        background-color: #fff;
        color: #333;
        height: 8vh;
        padding: 0 20px;
        line-height: 8vh;
        display: flex;
        justify-content:space-between;
        font-size: 14px;
        
        span {
            font-size: 18px;
            font-weight: bold;
            margin-right: 30px;
        }

        .el-button {
            padding: 10px 0;
            color: #666;
            width: 90px;
        }
    }
    .el-aside {
        background-color: #11183f;
        color: #fff;
        width: 300px;

        .el-row {

            img {
                width: 140px;
                height: 56px;
                margin-top: 17px;
            }
        }

        .el-menu {
            width: 300px;

            .el-submenu {

                img{
                    width: 14px;
                    height: 14px;
                }
            }
           .el-menu-item {

               img{
                    width: 14px;
                    height: 14px;
                }
           }
        }
    }
    
    .el-main {
        background-color: #f2f2f2;
        height: 92vh;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        flex: 1;

        .el-container {
            display: flex;
            flex-direction: column;
            .el-header,.el-footer {
                background-color: #f2f2f2;
                padding: 0;
                text-align: left;
                height: 40px;
            }
            .el-header {
                justify-content: left;
                line-height:50px; 
                span {
                    font-size: 12px; 
                    margin-right: 4px;
                }
                
                .loc-title {
                    margin-right: 8px;
                }

                .loc-details {
                    color: #307eff;
                }

            }
            .el-main {
                width: 100%;
                height: 100%;
                flex: 1;
                background-color: #fff;
                border-radius: 10px;
                padding: 0;
                
            }
        }
    }
    
    
    
   
</style>


