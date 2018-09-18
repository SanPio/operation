<template>
    <div id="logbox">
        <img :src="backgroundImg" alt="" id="background">
        <p id="time">
            {{ time }}
        </p>
        <ul id="contant">
            <li class="title">
                <p>
                    小铭跟单运营系统
                </p>
            </li>
            <li class="account clearfix">
                <div class="left">
                    <img :src="accoutImg" alt="">
                </div>
                <div class="right">
                    <input type="text" placeholder="请输入账号"  v-model="account" @focus="errBtnNone">
                </div>
            </li>
            <li class="password clearfix">
                <div class="left">
                    <img :src="passwordImg" alt="">
                </div>
                <div class="right">
                    <input type="password" placeholder="请输入密码" v-model="psd" @focus="errBtnNone">
                </div>
            </li>
            <li class="login">
                <el-button type="primary" v-if="!loging" @click="loging = !loging">
                    登录
                </el-button>
                <router-link to="/home">
                    <el-button type="primary" :loading="true" v-if="loging">
                        登录中...
                    </el-button>
                </router-link>
                
                <el-button type="primary" :loading="false" v-if="errShow" class="err_btn" @click="errBtn">
                    账号或密码错误，请重新填写
                </el-button>
             
            </li>
        </ul>
    </div>
</template>

<script>

import Store from '@/store'
export default {
    name: 'Login',

    data () { 
        return {
            backgroundImg: require('../../assets/Sign in-bg.jpg'),
            accoutImg: require('../../assets/Sign-in-icon1.png'),
            passwordImg: require('../../assets/Sign-in-icon2.png'),
            loging: false,
            errShow: false,
            account: '',
            psd: ''
        }
    },

    watch: {
        account ( val ) {
            this.account = val.replace(/[^\w\.\/]/ig,'')
        }
    },

    computed: {
        
        //获取本地时间
        time () {
            return Store.state.time
        }
    },

    created () {

    },

    mounted () {
        //时间显示
        this.timer = setInterval(this.getMyTime,1000);
    },

    beforeDestroy() {
        //清除计时器
        clearInterval(this.timer)
    },

    methods: {
        
        getMyTime () {
            Store.commit('getTime')
        },

        errBtn () {
            this.errShow = false;
            this.loging = false;
        },

        errBtnNone () {
            this.errShow = false;
        }
    }
}
</script>
<style lang="scss" scoped>
    #logbox {
        width: 100%;
        height: 100%;

        #background {
            display: block;
            width: 100%;
            height: 100%;
        }

        #time {
            position: absolute;
            top: 6.8vh;
            right: 4vw;
            color: #fff;
            font-size: 28px;
            font-weight: bold;
        }

        #contant {
            position: absolute;
            top: 26vh;
            left: 36vw;
            
            li {
                width: 500px;
                height: 76px;
                border-radius: 8px;
                background-color: #fff;
            }
            
            .title {
                background: none;
                color: #fff;
                p {
                    font-size: 28px;
                    line-height: 90px;
                    text-align: left;
                }
            }

            .account, .password {
                margin-bottom: 40px;

                .left {
                    width: 114px;
                    
                    img {
                        margin: 12px 0 0 24px;
                    }
                }

                .right {
                    margin-top: 8px;
                    width: 378px;
                    height: 60px;

                    input {
                        width: 100%;
                        height: 100%;
                        border: none;
                        outline: none;
                        font-size: 24px;
                    }
                    
                }
            }

            .login {
                .el-button {
                    width: 100%;
                    height: 100%;
                    font-size: 34px;
                    border-radius: 8px
                }
                .err_btn {
                    font-size: 24px;
                    color: red;
                }
            }
        }
    }
    

</style>

