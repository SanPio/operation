<template>
    <div id="user_info_box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%">

            <!-- 头部 -->
        <div id="header" class="clearfix">
            <div class="left he_le">
                <el-select v-model="searchType">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select> 
            </div>
            <div class="left he_cen">
                <el-input
                    placeholder="请输入ID、邀请码、手机号"
                    prefix-icon="el-icon-search"
                    type="number"
                    v-model="searchValue">
                </el-input> 
            </div>
            <div class="left he_ri">
                <el-button type="primary" plain @click="query">
                    查询
                </el-button>
            </div>
        </div>

           <!-- 列表 -->
        <div id="list_info">
            <ul class="list_tit clearfix">
                <li class="num left">
                    序号
                </li>
                <li class="id left">
                    用户ID
                </li>
                <li class="invit left">
                    邀请码
                </li>
                <li class="name left">
                    昵称
                </li>
                <li class="phone left">
                    绑定手机号
                </li>
                <li class="follow-money left">
                    真实账号跟单收益（模拟）
                </li>
                <li class="accnum left">
                    真实账号跟单数（模拟）
                </li>
                <li class="mt left">
                    绑定MT4账户数
                </li>
                <li class="invitname left">
                    引荐人
                </li>
                <li class="invitnum left">
                    邀请数量/人
                </li>
                <li class="operation left" style="line-height:50px">
                    操作
                </li>
            </ul>
            <ul class="list-contant clearfix" v-if="info.length">
                <li v-for="(item, index) in info" :key="index" class="listinfo" >
                    <p class="num left">
                        {{ index + 1 }}
                    </p>
                    <p class="id left">
                        {{ item.userId | numberNull }}
                    </p>
                    <p class="invit left">
                        {{ item.invitationCode  | textNull }}
                    </p>
                    <p class="name left">
                        {{ item.wxNickname | textNull }}
                    </p>
                    <p class="phone left">
                        {{ item.phone | textNull }}
                    </p>
                    <p class="follow-money left">
                        {{ item.realProfits | numberNull }} ( {{ item.notRealProfits | numberNull }} )
                    </p>
                    <p class="accnum left">
                        {{ item.realFollow | numberNull }} ( {{item.notRealFollow | numberNull }} )
                    </p>
                    <p class="mt left">
                        {{ item.countBindMT4 | numberNull }}
                    </p>
                    <p class="invitname left">
                        {{ item.inviterUserName | textNull }}
                    </p>
                    <p class="invitnum left">
                        {{ item.countInviter | numberNull }}
                    </p>
                    <div class="operation left">
                        <p>
                            <el-button type="primary" @click="toInvitDetail(item.userId)">
                                邀请明细
                            </el-button> 
                            <el-button type="primary" plain >
                                跟单配置记录
                            </el-button> 
                        </p>
                        <p>
                            <el-button type="primary" plain >
                                增值服务
                            </el-button> 
                            <el-button type="primary" plain >
                                账号绑定记录
                            </el-button> 
                        </p>
                    </div>
                </li>
            </ul>
        
        </div>   

        
    </div>
</template>
<script>


export default {
    name: 'UserInfo',

    data () {
        return {
            loading: false,
            options: [
                {
                    value: 3,
                    label: '用户ID'
                },
                {
                    value: 2,
                    label: '手机号'
                },
                {
                    value: 1,
                    label: '邀请码'
                }
            ],
            searchType: 3,
            searchValue: '',
            info: [],
        }
    },
    watch:{
        searchType(){
            this.searchValue = ''
        }
    },
    filters: {
        textNull ( value ) {
            if ( value ) {
                return value
            }else {
                return '--'
            }
        },
        numberNull ( value ) {
            if ( value ) {
                return value
            }else {
                return 0
            }
        }
    },
    created () {
        
    },

    methods: {

       

        // 点击搜索
        query (){
            this.loading = true;
            this.queryInfo( this.searchType, this.searchValue);
        },

        // 请求数据
        queryInfo( type, value) {
            
            this.info = [];
            let postData = this.$qs.stringify({

                type: type,
                queryWord: value
            });
            this.$http({
                method: 'post',
                url: this.$path +'operatemanagement/user/userInfo',
                data:postData
            }).then( res => {

                //  结束loading图
                this.loading = false;
                this.info.push( res.data.data.data )
            }).catch( req => {
                console.log( req )

            })    
        },

        // 邀请明细
        toInvitDetail( userId ) {
            this.$router.push({
                path: '/invitdetail',
                query:{//通过query 传递参数
                    userId: userId //需要传递的参数,
                }
            });
        },
        // 增值服务
        // toInvitDetail ( ind ) {

        // },
        // 跟单配置记录
        // toInvitDetail ( ind ) {

        // },
        // 账号绑定记录
        // toInvitDetail ( ind ) {

        // }
    },
}
</script>
<style lang="scss" scoped>
    #user_info_box {
        width: 100%;
        height:100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 14px;
        position: relative;
        min-height: 81vh;
        // 头部
        #header{
            .he_le{
                width: 140px;
            }
            .he_cen{
                width: 240px;
            }
            .el-button {
                width: 70px;
                height: 28px;
                line-height: 4px;
            }
            
            .left{
                margin-right: 20px;
            }
        }
        // 列表
        #list_info{
            color: #5c5c5c;
            margin-top: 20px;
            .list_tit{
                color: #000;
                
            }
            .list-contant{
                height: 40px;
                .listinfo{
                    height: 60px;
                    margin-bottom: 10px;
                }
            }
            
            .num{
                width: 4%;
                line-height: 50px;
            }
            .id{
                width: 5%;
                line-height: 50px;
            }
            .invit{
                width: 6%;
                line-height: 50px;
            }
            .name{
                width: 9%;
                line-height: 50px;
            }
            .phone{
                width: 8%;
                line-height: 50px;
            }
            .follow-money{
                width: 13%;
                line-height: 50px;
            } 
            .accnum{
                width: 13%;
                line-height: 50px;
            }
            .mt{
                width: 8%;
                line-height: 50px;
            }
            .invitname{
                width: 9%;
                line-height: 50px;
            }
            .invitnum{
                width: 6%;
                line-height: 50px;
            }
            .operation{
                width: 19%;
                height: 60px;
                // line-height: 60px;
                p{
                    margin-bottom: 8px;
                }
                .el-button {
                    font-size: 10px;
                    padding: 0;
                    width: 100px;
                    height: 20px;
                    line-height: 4px;
                }
            }
           

                
        }
        

    }

</style>


