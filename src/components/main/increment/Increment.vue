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
                        0
                    </p>
                    <p class="left">
                        0
                    </p>
                    <p class="left">
                        0
                    </p>
                    <p class="left">
                        0
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
                        0
                    </p>
                    <p class="left">
                        0
                    </p>
                    <p class="left">
                        0
                    </p>
                    <p class="left">
                        0
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
                        <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[0] === 0" @click="bigToSmallSort( 0, 'day' )">
                        <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[0] === 1" @click="toSort( 0, 'day' )">
                        <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[0] === 2" @click="toSort( 0, 'day' )">
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
                            {{  item.name }}
                        </span>
                    </p>
                    <p class="left">
                        <span>
                            {{  item.modate }}
                        </span>
                    </p>
                    <p class="left">
                        <span>
                            {{  item.jiedate }}
                        </span>
                    </p>
                    <p class="left">
                        <span>
                            {{  item.money }}
                        </span>
                    </p>
                    <p class="left">
                        <span>
                            {{  item.pay }}
                        </span>
                    </p>
                    <p class="left">
                        <el-button type="primary" plain @click="fiveStarVisible( index )">
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
                <el-table-column  property="num" label="序号" width="100"></el-table-column>
                <el-table-column  property="date" label="购买日期" width="140"></el-table-column>
                <el-table-column  property="time" label="购买时长" width="140"></el-table-column>
                <el-table-column  property="pay" label="购买金额" width="140"></el-table-column>
                <el-table-column  property="discount" label="折扣" width="140"></el-table-column>
                <el-table-column  property="price" label="原价" width="140"></el-table-column>
            </el-table>
        </el-dialog>

        <!-- v认证 -->
        <el-dialog title="V认证增值服务明细" :visible.sync="vDialogTableVisible">
            <el-table :data="vMsgDetail"
            center=true>
                <el-table-column  property="num" label="序号" width="100"></el-table-column>
                <el-table-column  property="date" label="购买日期" width="140"></el-table-column>
                <el-table-column  property="time" label="购买时长" width="140"></el-table-column>
                <el-table-column  property="pay" label="购买金额" width="140"></el-table-column>
                <el-table-column  property="discount" label="折扣" width="140"></el-table-column>
                <el-table-column  property="price" label="原价" width="140"></el-table-column>
            </el-table>
        </el-dialog>

        <!-- 五星信息 -->
        <el-dialog title="五星信号源增值服务明细" :visible.sync="fiveStarDialogTableVisible">
            <el-table :data="fiveStarMsgDetail"
            center=true>
                <el-table-column  property="num" label="序号" width="100"></el-table-column>
                <el-table-column  property="date" label="购买日期" width="140"></el-table-column>
                <el-table-column  property="time" label="购买时长" width="140"></el-table-column>
                <el-table-column  property="pay" label="购买金额" width="140"></el-table-column>
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
            defaultSort: require('../../../assets/def_sort.png'),
            bigToSmall: require('../../../assets/big_small.png'),
            smallToBig: require('../../../assets/small_big.png'),
            fiveStarInfo: [
                {
                    name: '五星001',
                    modate: '10/10',
                    jiedate: '11/11',
                    money: 0,
                    pay: 2
                },
                {
                    name: '五星001',
                    modate: '10/10',
                    jiedate: '11/11',
                    money: 0,
                    pay: 2
                },
                {
                    name: '五星001',
                    modate: '10/10',
                    jiedate: '11/11',
                    money: 0,
                    pay: 2
                },
            ],
            sortImgShow: [ 0 ],   
            pageNum: 1, 
            pageSize: 15,
            total: 15,
            // vip弹窗
            vipDialogTableVisible: false,
            vipMsgDetail: [
                {
                    num: 1,
                    date: '10/10/10',
                    time: '12/月',
                    pay: 1000,
                    discount: '8.5折',
                    price: 2000,
                }
            ],
            // v认证弹窗
            vDialogTableVisible: false,
            vMsgDetail: [
                {
                    num: 1,
                    date: '10/10/10',
                    time: '12/月',
                    pay: 1000,
                    discount: '8.5折',
                    price: 2000,
                } ,
                {
                    num: 1,
                    date: '10/10/10',
                    time: '12/月',
                    pay: 1000,
                    discount: '8.5折',
                    price: 2000,
                } ,
                {
                    num: 1,
                    date: '10/10/10',
                    time: '12/月',
                    pay: 1000,
                    discount: '8.5折',
                    price: 2000,
                } ,
                {
                    num: 1,
                    date: '10/10/10',
                    time: '12/月',
                    pay: 1000,
                    discount: '8.5折',
                    price: 2000,
                } ,
                {
                    num: 1,
                    date: '10/10/10',
                    time: '12/月',
                    pay: 1000,
                    discount: '8.5折',
                    price: 2000,
                } ,
                
            ],

            // v认证弹窗
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
        console.log(this.userId)
    },

    methods: {
        // 返回到用户信息
        returnHis ( ) {
            this.$router.push({
                path: '/user_info',
            });
        },

        // 默认反向排序
        bigToSmallSort ( ind, key) {

            this.sortImgShow = [ 0, 0, 0, 0, 0, 0, 0 ];
            this.$set( this.sortImgShow, ind, 1 );
            this.toSort(ind,key);
        },  

        // 逆向排序
        toSort ( ind, key ) {
            if ( this.sortImgShow[ ind ] === 1) {

                this.sortImgShow = [ 0, 0, 0, 0, 0, 0, 0 ];
                this.$set( this.sortImgShow, ind, 2);
                
                if( key == "day" ){
                    
                    this.isDate(key,1);
                
                }else{
                    this.info = this.ZtoAsort(this.info, key);
                }
            
            }else if ( this.sortImgShow[ ind ] === 2 ) {
                
                this.sortImgShow = [ 0, 0, 0, 0, 0, 0, 0 ];
                this.$set( this.sortImgShow, ind, 1 );

                // this.info = this.ZtoAsort(this.info, key);  
                if( key == "day" ){
                    this.isDate(key,2);
                    
                }else{
                    this.info = this.AtoZsort(this.info, key);
                }          
                
            }
        },

        // 日期排序
        isDate(key,val){
            let newArr = [];
            for( let i = 0; i < this.info.length; i ++){
  
                let obj ={
                    accumulatedPaymentAmount: this.info[i].accumulatedPaymentAmount,
                    channelName: this.info[i].channelName,
                    channelId: this.info[i].channelId,
                    day: new Date(this.info[i].day),
                    documentaryUserNumber: this.info[i].documentaryUserNumber,
                    id: this.info[i].id,
                    invitUrl: this.info[i].invitUrl,
                    numberOfBindOfMT4: this.info[i].numberOfBindOfMT4,
                    numberOfPaidUsers: this.info[i].numberOfPaidUsers,
                    numberOfRegisteredUsers: this.info[i].numberOfRegisteredUsers,
                    renewalUserNumber: this.info[i].renewalUserNumber,
                }
                newArr.push( obj );
            }
            if( val === 1){
                newArr = this.ZtoAsort(newArr, key);
            }else{
                newArr = this.AtoZsort(newArr, key);
            }

            for (let i = 0; i < newArr.length; i++ ) {
                let obj = {
                    accumulatedPaymentAmount: newArr[i].accumulatedPaymentAmount,
                    channelName: newArr[i].channelName,
                    channelId: newArr[i].channelId,
                    day: newArr[i].day.getFullYear() + '-' +(newArr[i].day.getMonth() > 8 ? newArr[i].day.getMonth()+1 : '0' +(newArr[i].day.getMonth()+1) ) + '-' +(newArr[i].day.getDate() > 9 ? newArr[i].day.getDate() : '0' + newArr[i].day.getDate()),
                    documentaryUserNumber: newArr[i].documentaryUserNumber,
                    id: newArr[i].id,
                    invitUrl: newArr[i].invitUrl,
                    numberOfBindOfMT4: newArr[i].numberOfBindOfMT4,
                    numberOfPaidUsers: newArr[i].numberOfPaidUsers,
                    numberOfRegisteredUsers: newArr[i].numberOfRegisteredUsers,
                    renewalUserNumber: newArr[i].renewalUserNumber,
                }
                this.info.push(obj);
            } 
        },

        // 正向排序
        AtoZsort( arr, key ) {
            // console.log(arr[key]);
            
            for(var i = 0; i < arr.length-1; i++ ) {
                for(var j = 0; j < arr.length - i -1 ; j ++){
                    
                    if ( arr[j][key] > arr[j+1][key] ){
                        let swap = arr[j];
                        arr[j] = arr[j +1]
                        arr[j +1] = swap
                    }  
                }
            }
    
            this.info = []
            return arr
        },

        // 反向排序
        ZtoAsort( arr,key ) {
            for(var i = 0; i < arr.length-1; i++ ) {
                for(var j = 0; j < arr.length - i -1 ; j ++){
                    
                    if ( arr[j][key] < arr[j+1][key] ){
                        let swap = arr[j];
                        arr[j] = arr[j +1]
                        arr[j +1] = swap
                    }  
                }
            }
            console.log(arr)
                this.info = []
            return arr
        },

        // 基础信息
        queryBasics( ){

        },

        // 五星信号源信息
        queryFiveStar( userName, operation, pageNum, pageSize ){

        },

        // 分页
        pageChang( params ) {
            this.loading = true;
            this.pageNum = params.pageNum;
            this.pageSize = params.pageSize;
            this.queryFiveStar()
        },
        // vip弹窗
        vipVisible() {
            this.vipDialogTableVisible = true;
        },
        // V认证弹窗
        vAuthenticationVisible() {
            this.vDialogTableVisible = true;
        },
        // 五星弹窗
        fiveStarVisible( ind ) {
           this.fiveStarMsgDetail= [
                {
                    num: 1,
                    date: '10/10/10',
                    time: '15/月',
                    pay: 1000,
                    discount: '8.5折',
                    price: 2000,
                } 
            ],
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


