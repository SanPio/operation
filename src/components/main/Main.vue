<template>
    <div id="box">
        <el-container>

            <!-- 左侧导航 -->
            <el-aside style="width:200px;">

                <!-- logo -->
                <el-row type="flex" class="row-bg" justify="center">
                    <img :src="logo" alt="" id="logo" @click="logoload">
                </el-row>

                <!-- 导航列表 -->
                <el-col :span="24">
                    <el-menu
                    :default-active="navSelected"
                    class="el-menu-vertical-demo"
                    @select="handleSelect"
                    background-color="#11183f"
                    text-color="#fff"
                    :unique-opened="uniqueOpened"
                    active-text-color="#ffd04b">
                        <el-menu-item index="1">
                            <img :src="imgCli[0] ? homeImgCli : homeImg" alt="">
                            <span slot="title">
                                首页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                        </el-menu-item>

                        <el-submenu index="2">
                            <template slot="title">
                                <img :src="imgCli[1] ? backImgCli : backImg" alt="">
                                <span :class="{'yellowColor':itemChoose == 2}">
                                    后台管理&nbsp;&nbsp;&nbsp;
                                </span>
                            </template>     
                            <el-menu-item index="2-1" >
                                &nbsp;&nbsp;账号管理
                            </el-menu-item>
                            <el-menu-item index="2-2">
                                &nbsp;&nbsp;权限管理
                            </el-menu-item> 
                            <el-menu-item index="2-3">
                                &nbsp;&nbsp;角色管理
                            </el-menu-item>
                            <el-menu-item index="2-4">
                                &nbsp;&nbsp;操作记录
                            </el-menu-item>          
                        </el-submenu>

                        <el-submenu index="3">
                            <template slot="title">
                                <img :src="imgCli[2] ? dataImgCli : dataImg" alt="">
                                <span :class="{'yellowColor':itemChoose == 3}">
                                    数据统计&nbsp;&nbsp;&nbsp;
                                </span>
                            </template>     
                            <el-menu-item index="3-1">
                                &nbsp;&nbsp;数据信息
                            </el-menu-item>
                        
                        </el-submenu>

                        <el-submenu index="6">
                            <template slot="title">
                                <img :src="imgCli[5] ? signalImgCli :signalImg" alt="">
                                <span :class="{'yellowColor':itemChoose == 6}">
                                    信号源管理
                                </span>
                            </template>     
                            <el-menu-item index="6-1" style="text-align:left">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信号源基础信息
                            </el-menu-item>
                            <el-menu-item index="6-2" style="text-align:left">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信号源效益汇总
                            </el-menu-item> 
                            <el-menu-item index="6-3" style="text-align:left">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信号源效益详情
                            </el-menu-item>
                            <el-menu-item index="6-4" style="text-align:left">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信号源跟随详情
                            </el-menu-item> 
                        </el-submenu>

                        <el-submenu index="4">
                            <template slot="title">
                                <img :src="imgCli[3] ? userMangeImgCli :userMangeImg" alt="">
                                <span :class="{'yellowColor':itemChoose == 4}">
                                    用户管理&nbsp;&nbsp;&nbsp;
                                </span>
                            </template>     
                            <el-menu-item index="4-1">
                                &nbsp;&nbsp;用户信息
                            </el-menu-item>
                            <el-menu-item index="4-2">
                                &nbsp;&nbsp;订单信息
                            </el-menu-item> 
                        </el-submenu>

                        <el-submenu index="5">
                            <template slot="title">
                                <img :src="imgCli[4] ? channelImgCli : channelImg" alt="">
                                <span :class="{'yellowColor':itemChoose == 5}">
                                    渠道运营&nbsp;&nbsp;&nbsp;
                                </span>
                            </template>   
                            <el-menu-item index="5-1">
                                &nbsp;&nbsp;渠道管理
                            </el-menu-item>    
                            <el-menu-item index="5-2">
                                &nbsp;&nbsp;渠道详情
                            </el-menu-item>  
                        </el-submenu>
                    </el-menu>
                </el-col>
            </el-aside>
            <el-container>
                <!-- 头部 -->
                <el-header>
                    <el-row>
                        当前时间：{{ myTime }}
                    </el-row>
                    <el-row>
                        <span>
                            尊敬的 {{ userName }}，您好
                        </span>
                        <el-button @click="changePassword">
                            修改密码
                        </el-button>
                        <el-button @click="logOut">
                            注销
                        </el-button>
                  
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
                        <el-main style="height:100%" >
                            <router-view  style="height:100%"/>
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
        <!-- 修改密码弹窗 -->
        <el-dialog title="修改密码" :visible.sync="passwordDialogTableVisible" style="width: 1000px;margin:0 auto;">
            <el-form label-width="80px">
                <el-form-item label="旧密码">
                    <el-input v-model="oldPassword" placeholder="请输入旧密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="newPassword" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="confirmPassword" placeholder="请输入确认新密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="sure" style="margin-bottom: 20px">确认</el-button>
                    <el-button @click="cancel" style="margin-bottom: 20px">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
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
                signalImg: require('../../assets/signal.png'),
                homeImgCli: require('../../assets/home-page2.png'),
                backImgCli: require('../../assets/Backstage-2.png'),
                dataImgCli: require('../../assets/data-2.png'),
                userMangeImgCli: require('../../assets/user-2.png'),
                channelImgCli: require('../../assets/channel-2.png'),
                signalImgCli: require('../../assets/signal-2.png'),
                userName: '',
                imgCli: [false,false,false,false,false,false],
                uniqueOpened: true, // 展开一个列表
                version: 'v1.0',    // 版本号码
                locTitle: '',// 当前位置
                locDetails: '',
                imgCliInd: 0,
                navSelected:"1",
                itemChoose: 0,
                passwordDialogTableVisible:false,
                oldPassword:'',
                newPassword:'',
                confirmPassword:''
            }
        },

        computed: {
            //获取本地时间
            myTime () {
                return Store.state.time;
            }
        },

        created () {
            if ( sessionStorage.userName ) {
                this.userName = sessionStorage.userName;
            }else {
                this.userName = '管理员';
            }
            if ( sessionStorage.locTitle ) {
                this.locTitle = sessionStorage.locTitle;
            }else {
                this.locTitle = '';
            }
            if ( sessionStorage.locDetails ) {
                this.locDetails = sessionStorage.locDetails;
            }else {
                this.locDetails = '首页';
            }
            if ( sessionStorage.imgCliInd ) {
                this.$set( this.imgCli,sessionStorage.imgCliInd,true);
                this.itemChoose = Number( sessionStorage.imgCliInd ) +1;
            }else {
                this.$set( this.imgCli,0,true);
            }
            if ( sessionStorage.navSelected ) {
                this.navSelected = sessionStorage.navSelected;
            }else {
                this.navSelected = '1';
            }

        },

        mounted () {
        
            this.timer = setInterval(this.getMyTime,1000);
        },

        beforeDestroy () {
            clearInterval(this.timer);
        },

        methods: {
            
            // nav导航选择
            handleSelect(key,keyPath){
                sessionStorage.setItem('navSelected', key);
                if ( key == '1' ) {
                    this.routeTo('/home',0,'','首页');
                    this.itemChoose = 0;
                }else if ( key == '2-1') {
                    this.routeTo('/home',1,'后台管理','账号管理');
                    this.itemChoose = 2;
                }else if ( key == '2-2') {
                    this.routeTo('/home',1,'后台管理','权限管理');
                    this.itemChoose = 2;
                }else if ( key == '2-3') {
                    this.routeTo('/rolemanage',1,'后台管理','角色管理');
                    this.itemChoose = 2;
                }else if ( key == '2-4') {
                    this.routeTo('/home',1,'后台管理','操作记录');
                    this.itemChoose = 2;
                }else if ( key == '3-1') {
                    this.routeTo('/dataInformation',2,'数据统计','数据信息');
                    this.itemChoose = 3;
                }else if ( key == '4-1') {
                    this.routeTo('/user_info',3,'用户管理','用户信息');
                    this.itemChoose = 4;
                }else if ( key == '4-2') {
                    this.routeTo('/home',3,'用户管理','订单信息');
                    this.itemChoose = 4;
                }else if ( key == '5-1') {
                    this.routeTo('/channelmanage',4,'渠道运营','渠道管理');
                    this.itemChoose = 5;
                }else if ( key == '5-2') {
                    this.routeTo('/channeldetail',4,'渠道运营','渠道详情');
                    this.itemChoose = 5;
                }else if ( key == '6-1') {
                    this.routeTo('/signal_info',5,'信号源管理','信号源基础信息');
                    this.itemChoose = 6;
                }else if ( key == '6-2') {
                    this.routeTo('/signal_profit',5,'信号源管理','信号源效益汇总');
                    this.itemChoose = 6;
                }else if ( key == '6-3') {
                    this.routeTo('/signal_benefit',5,'信号源管理','信号源效益详情');
                    this.itemChoose = 6;
                }else if ( key == '6-4') {
                    this.routeTo('/follow_details',5,'信号源管理','信号源跟随详情');
                    this.itemChoose = 6;
                }
                

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
                this.imgCli = [false,false,false,false,false,false];
                this.$set(this.imgCli,ind,true);
                this.locTitle = locTit;
                this.locDetails = locdeta;
                sessionStorage.setItem('locTitle', locTit);
                sessionStorage.setItem('locDetails', locdeta);
                sessionStorage.setItem('imgCliInd', ind);
            },

            // 刷新
            logoload () {
                location.reload() 
            },

            // 登出
            logOut () {
                sessionStorage.clear()
                this.$router.push({
                    path: '/login',
                    // query:{//通过query 传递参数
                    // goodsDetail:需要传递的参数,
                    // }
                });
            },
            // 修改密码
            changePassword(){
                this.passwordDialogTableVisible = true;
            },
            sure(){
                if(this.newPassword==this.confirmPassword){
                    let postData = this.$qs.stringify({
                        employeeId: sessionStorage.userId,
                        oldPassword : this.oldPassword,
                        newPassword : this.newPassword
                    });
                    this.$http({
                        method:'post',
                        url: this.$path + 'web/emp/updatePassword',
                        data:postData
                    }).then(res=>{
                        console.log(res)
                        if(res.data.data.code==1){
                            this.$message({
                                message: res.data.data.str,
                                type: 'success'
                            });
                            this.oldPassword = "";
                            this.newPassword = "";
                            this.confirmPassword = "";
                            this.passwordDialogTableVisible = false
                        }else{
                            this.$message.error(res.data.data.str);
                            this.oldPassword = "";
                            this.newPassword = "";
                            this.confirmPassword = "";
                        }
                        
                        
                    }).catch(err=>{
                        console.log(err)
                    })
                }else{
                    this.$message.error('两次新密码两次输入不一致，请重新输入');
                    this.oldPassword = "";
                    this.newPassword = "";
                    this.confirmPassword = "";
                }
                
            },
            cancel(){
                this.passwordDialogTableVisible = false
            }
        }
    }
</script>
<style lang="scss" scoped>   
    #logo{
        cursor:pointer;
    }
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
        // width: 300px;
        width: 200px;
        overflow:-moz-scrollbars-none;
        .el-row {

            img {
                width: 140px;
                height: 56px;
                margin-top: 17px;
            }
        }

        .el-menu {
            // width: 300px;
            width: 200px;
            .yellowColor{
                color: rgb(255, 208, 75);
            }
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
        overflow:-moz-scrollbars-none;
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


