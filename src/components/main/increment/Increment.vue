<template>
    <div id="box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%">
        
        <!-- 头部 -->
        <v-header :title='headerTitle' :btnType='btnType' :btnInfo='btnInfo' @exportData='returnHis' ></v-header>
        
        <div class="basics-info">
            <p class="tab-tltle">
                基础信息
            </p>
            <ul>
                <li class="clearfix " id="tabtop1">
                    <p class="left">
                        增值服务
                    </p>
                    <p class="left">
                        末次购买日期
                    </p>
                    <p class="left">
                        截止日期
                    </p>
                    <p class="left">
                        累计购买金额
                    </p>
                    <p class="left">
                        基础消费总计
                    </p>
                    <p class="left">
                        操作
                    </p>
                </li>
                <li class="clearfix">
                    <p class="left">
                        VIP
                    </p>
                     <p class="left">
                        {{ vipInfo.lastupdatetime }}
                    </p>
                    <p class="left">
                        {{ vipInfo.memberovertime }}
                    </p>
                    <p class="left">
                        {{ vipInfo.totalMoneyByVipName }}
                    </p>
                    <p class="left">
                        {{ vipInfo.totalMoney }}
                    </p>
                    <p class="left">
                        <el-button type="primary" plain @click="vipVisible">
                            明细
                        </el-button> 
                    </p>
                </li>
                <li class="clearfix">
                    <p class="left">
                        V认证   
                    </p>
                     <p class="left">
                        {{ vAuthInfo.lastupdatetime }}
                    </p>
                    <p class="left">
                        {{ vAuthInfo.memberovertime }}
                    </p>
                    <p class="left">
                        {{ vAuthInfo.totalMoneyByVipName }}
                    </p>
                    <p class="left">
                        {{ vAuthInfo.totalMoney }}
                    </p>
                    <p class="left">
                        <el-button type="primary" plain @click="vAuthenticationVisible">
                            明细
                        </el-button> 
                    </p>
                </li>
            </ul>
        </div>
        <div class="fivestar">
            <p class="tab-tltle">
                五星信息
            </p>
            <ul>
                <li class="clearfix " id="tabtop2">
                    <p class="left">
                        <span>
                            序号
                        </span>
                    </p>
                    <p class="left">
                        <span>
                            信号源名称
                        </span>
                        <!-- <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[0] === 0" @click="bigToSmallSort( 0, 'day' )">
                        <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[0] === 1" @click="toSort( 0, 'day' )">
                        <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[0] === 2" @click="toSort( 0, 'day' )"> -->
                    </p>
                    <p class="left">
                        <span>
                            末次购买日期
                        </span>
                    </p>
                    <p class="left">
                        <span>
                            截止日期
                        </span>
                    </p>
                    <p class="left">
                        <span>
                            累计购买金额
                        </span>
                    </p>
                    <p class="left">
                        <span>
                            五星消费总计
                        </span>
                    </p>
                    <p class="left">
                        <span>
                            操作
                        </span>
                    </p>
                </li>
                <li v-if="fiveStarInfo.length" v-for="(item, index) in fiveStarInfo" :key="index" class="clearfix">
                    <p class="left">
                        <span>
                            {{ index + 1 }}
                        </span>
                    </p>
                    <p class="left">
                        <span>
                            {{  item.vipName }}
                        </span>
                    </p>
                    <p class="left">
                        <span>
                            {{  item.lastupdatetime }}
                        </span>
                    </p>
                    <p class="left">
                        <span>
                            {{  item.memberovertime }}
                        </span>
                    </p>
                    <p class="left">
                        <span>
                            {{  item.totalMoneyByVipName }}
                        </span>
                    </p>
                    <p class="left">
                        <span>
                            {{  item.totalMoney }}
                        </span>
                    </p>
                    <p class="left">
                        <el-button type="primary" plain @click="fiveStarVisible( item.optionId )">
                            明细
                        </el-button> 
                    </p>
                </li>
            </ul>
        </div>


        <!-- 分页 -->
        <pageing @pageChang='pageChang'   :total='total'></pageing>

        <!-- vip弹窗 -->
        <el-dialog title="VIP增值服务明细" :visible.sync="vipDialogTableVisible">
            <el-table :data="vipMsgDetail"
            center=true>
                <el-table-column  property="rowNum" label="序号" width="100"></el-table-column>
                <el-table-column  property="dateTime" label="购买日期" width="140"></el-table-column>
                <el-table-column  property="time" label="购买时长" width="140"></el-table-column>
                <el-table-column  property="value" label="购买金额" width="140"></el-table-column>
                <el-table-column  property="discount" label="折扣" width="140"></el-table-column>
                <el-table-column  property="price" label="原价" width="140"></el-table-column>
            </el-table>
        </el-dialog>

        <!-- v认证 -->
        <el-dialog title="V认证增值服务明细" :visible.sync="vDialogTableVisible">
            <el-table :data="vMsgDetail"
            center=true>
                <el-table-column  property="rowNum" label="序号" width="100"></el-table-column>
                <el-table-column  property="dateTime" label="购买日期" width="140"></el-table-column>
                <el-table-column  property="time" label="购买时长" width="140"></el-table-column>
                <el-table-column  property="value" label="购买金额" width="140"></el-table-column>
                <el-table-column  property="discount" label="折扣" width="140"></el-table-column>
                <el-table-column  property="price" label="原价" width="140"></el-table-column>
            </el-table>
        </el-dialog>

        <!-- 五星信息 -->
        <el-dialog title="五星信号源增值服务明细" :visible.sync="fiveStarDialogTableVisible">
            <el-table :data="fiveStarMsgDetail"
            center=true>
                <el-table-column  property="rowNum" label="序号" width="100"></el-table-column>
                <el-table-column  property="dateTime" label="购买日期" width="140"></el-table-column>
                <el-table-column  property="time" label="购买时长" width="140"></el-table-column>
                <el-table-column  property="value" label="购买金额" width="140"></el-table-column>
                <el-table-column  property="discount" label="折扣" width="140"></el-table-column>
                <el-table-column  property="price" label="原价" width="140"></el-table-column>
            </el-table>
        </el-dialog>


    </div>
</template>

<script>
import Header from "@/components/public/Header";
import Pageing from "@/components/public/Pageing";
export default {

    name: 'Increment',
    
    data () {
        return {
            loading: false,
            headerTitle: 'VIP增值页面',
            btnType: 'success',
            btnInfo: '返回',
            userId: '',
            defaultSort: require('../../../assets/def_sort.png'),
            bigToSmall: require('../../../assets/big_small.png'),
            smallToBig: require('../../../assets/small_big.png'),
            vAuthInfo: { },
            vipInfo: { },
            fiveStarInfo: [ ],
            sortImgShow: [ 0 ],   
            pageNum: 1, 
            pageSize: 15,
            total: 15,
            // vip弹窗
            vipDialogTableVisible: false,
            vipMsgDetail: [
               
            ],
            // v认证弹窗
            vDialogTableVisible: false,
            vMsgDetail: [
               
            ],

            // 五星弹窗
            fiveStarDialogTableVisible: false,
            fiveStarMsgDetail: [
              
            ],
        }
    },

    components: {
        'v-header': Header,
        Pageing
    },
    created () {
        this.userId = this.$route.query.userId;
        this.queryBasics( this.userId, 1, 15 )
    },

    methods: {
        // 返回到用户信息
        returnHis ( ) {
            this.$router.push({
                path: '/user_info',
                query:{//通过query 传递参数
                    type: sessionStorage.type, //需要传递的参数,
                    queryWord: sessionStorage.queryWord
                }
            });
        },

  
        // 基础信息
        queryBasics( userId, pageNum, pageSize ){
            let postData = this.$qs.stringify({
                userId: userId,
                pageNum: pageNum,
                pageSize: pageSize
            });

            this.$http({
                method: 'post',
                url: this.$path +'web/emp/vipData',
                data:postData
            }).then( res => {

                this.loading = false;
                let data = res.data.data.data ;
                
                    // vip 
                if ( data.vipAndV.vip) {
                    this.vipInfo = data.vipAndV.vip 
                }else{
                    this.vipInfo = {
                        "lastupdatetime":"",
                        "memberovertime":"",
                        "totalMoney":'0.00',
                        "totalMoneyByVipName":'0.00',
                    }
                }
                    // V认证
                if ( data.vipAndV.vAuth) {
                    this.vAuthInfo = data.vipAndV.vAuth 
                }else{
                    this.vAuthInfo = {
                        "lastupdatetime":"",
                        "memberovertime":"",
                        "totalMoney":'0.00',
                        "totalMoneyByVipName":'0.00',
                    }
                }
                    // 五星信号源
                this.fiveStarInfo = data.fiveStarDetailsList
                    // 总数
                this.total = data.num
            }).catch( req => {
                console.log( req  )
            })
        },

        // 详细信息
        queryDetails( userId, type, optionId ){
            let postData = this.$qs.stringify({
                userId: userId,
                type: type,
                optionId: optionId
            });

            this.$http({
                method: 'post',
                url: this.$path +'web/emp/vipDetailData',
                data:postData
            }).then( res => {
                let data = res.data.data.data;
                if( type == 2 ){ // vip 
                    this.vipMsgDetail = data
                }else if( type == 1 ) {
                    this.vMsgDetail = data
                }else if ( type == 3 ){
                    this.fiveStarMsgDetail = data
                }

            }).catch( req => {
                console.log( req )
            })
        },

        // 分页
        pageChang( params ) {
            this.loading = true;
            this.pageNum = params.pageNum;
            this.pageSize = params.pageSize;
            this.queryBasics( this.userId, this.pageNum, this.pageSize )
        },
        // vip弹窗
        vipVisible() {
            this.queryDetails( this.userId, 2, 0 )
            this.vipDialogTableVisible = true;
            

        },
        // V认证弹窗
        vAuthenticationVisible() {
            this.queryDetails( this.userId, 1, 0 )
            this.vDialogTableVisible = true;
            
        },
        // 五星弹窗
        fiveStarVisible( optionId ) {
            this.queryDetails( this.userId, 3, optionId )
            this.fiveStarDialogTableVisible = true;
        }
    }
}
</script>

<style lang="scss" scoped>
    #box {
        width: 100%;
        height:100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 14px;
        position: relative;
        min-height: 82vh;
        .el-table-column{
            text-align: center;
        }
        .tab-tltle{
            text-align: left;
            margin-top: 20px;
        }
        #tabtop1,#tabtop2{
                    p{
                        height: 30px;
                        line-height: 30px;
                        span{
                            vertical-align: middle;
                            
                        }
                        img{
                            margin-left: 3px;
                            height: 16px;
                            vertical-align: middle;
                            
                        }
                    }
                }
        // 基础信息
        .basics-info{
            ul {
                li {
                    p{
                        width: 16.3%;
                        height: 24px;
                        line-height: 24px;
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
        }
        // 五星信息
        .fivestar{
            ul {
                li {
                    p{
                        width: 14.2%;
                        height: 24px;
                        line-height: 24px;
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

        }
    }
</style>


