<template>
    <div id="box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%">
        <!-- 头部标题 -->
       <!-- 头部 -->
        <v-header :title='headerTitle' :btnType='btnType' :btnInfo='btnInfo' @exportData='returnHis' ></v-header>

        <!-- 查询  -->
        <search :headTop='headTop' :headBot='headBot' @searchInfoChange='searchInfoChange'></search>

        <!-- 列表 -->
        <p class="list-top">
            清单明细
        </p>
        <ul class="list-tit clearfix">
            <li>
                <span>
                    序号
                </span>
            </li>
            <li>
                <span>
                    引荐人
                </span>
            </li>
            <li>
                <span>
                    注册时间
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[0] === 0" @click="bigToSmallSort( 0, 'day' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[0] === 1" @click="toSort( 0, 'day' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[0] === 2" @click="toSort( 0, 'day' )">
            </li>
            <li>
                <span>
                    用户昵称
                </span>
            </li>
            <li>
                <span>
                    绑定手机号码
                </span>
            </li>
             <li>
                <span>
                    首冲金额
                </span>
            </li>
            <li>
                <span>
                    续费金额
                </span>
            </li>
             <li>
                <span>
                    合计金额
                </span>
            </li>
            <li>
                <span>
                    累计模拟跟单数量
                </span>
            </li>
             <li>
                <span>
                    绑定MT4数量
                </span>
            </li>
        </ul>
        <ul class="contant">
            <li class="info-list clearfix" v-for="(item, index) in info" :key="index" >
                <p> 
                    {{ index + 1 }}
                </p>
                <p> 
                    {{ item.day }}
                </p>
                <p> 
                    {{ item.channelName}}
                </p>
                <p> 
                    {{ item.numberOfRegisteredUsers }}
                </p>
                <p> 
                    {{ item.documentaryUserNumber }}
                </p>
                <p> 
                    {{ item.numberOfBindOfMT4 }}
                </p>
                <p> 
                    {{ item.renewalUserNumber }}
                </p>
                <p> 
                    {{ item.accumulatedPaymentAmount }}
                </p>
                <p> 
                    {{ item.numberOfPaidUsers }}
                </p>
                <p> 
                    {{ item.invitUrl }}
                </p>
                
                
            </li>
        </ul>
        
        <!-- 分页 -->
        <pageing @pageChang='pageChang'   :total='total'></pageing>


    </div>
</template>

<script>
import Header from "@/components/public/Header";
import Search from "@/components/main/invit_detail/Search";
import Pageing from "@/components/public/Pageing";
import Store from '@/store'
export default {

    name: 'InvitDetail',
    
    data () {
        return {
            loading: false,
            btnType: 'success',
            btnInfo: '返回',
            headerTitle: '邀请明细',
            defaultSort: require('../../../assets/def_sort.png'),
            bigToSmall: require('../../../assets/big_small.png'),
            smallToBig: require('../../../assets/small_big.png'),
            headTop:[
                '引荐人搜索',
                '起始日期',
                '截止日期',
                '新增（绑定手机数量）',
                '累计真实跟单数（模拟）',
                '绑定MT4账号数量',
                '累计付费人数',
                '累计付费金额',
                '操作'
            ],
            headBot:[0,'0/0',0,0,0],
            sortImgShow: [ 0 ],   
            userId: 0,
            info: [1],
            userName: '', 
            starTime: '', 
            endTime: '',
            pageNum: 1, 
            pageSize: 15,
            total: 15
        }
    },
    
    components: {
        'v-header': Header,
        Search,
        Pageing
    },
    
    created () {
        this.userId = this.$route.query.userId;
        console.log(this.userId)
    },

    methods: {

        // 搜素
        searchInfoChange ( params ) {
            this.loading = true;
            this.channelName = params.distributors;
            this.starTime = params.starTime;
            this.endTime = params.endTime;
            this.loading = params.loading;
            console.log(params)
            this.queryInfo( this.userName, this.starTime, this.endTime, this.pageNum, this.pageSize );
        },

        // 分页
        pageChang( params ) {
            this.loading = true;
            this.pageNum = params.pageNum;
            this.pageSize = params.pageSize;
            this.queryInfo( this.userName, this.starTime, this.endTime, this.pageNum, this.pageSize );
        },

        //
        queryInfo ( userName, starTime, endTime, pageNum, pageSize ) {
            console.log( userName )
            console.log( starTime )
            console.log( endTime )
            console.log( pageNum )
            console.log( pageSize )
        },

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
        header {
            text-align: left;
            font-size: 15px;
            font-weight: bold;
            line-height: 30px;
        }
        .list-top{
            text-align: left;
            margin-top: 20px;

        }

        .list-tit{
            margin-top: 10px;
            line-height: 20px;
            li {
                float: left;
                width: 10%;
                height: 30px;
                line-height: 30px;
                span{
                    vertical-align: middle;
                    color: #333;
                }
                img{
                    margin-left: 3px;
                    height: 16px;
                    vertical-align: middle;
                    
                }
            }
        }
        .info-list{
            color: #666;
            p {
                float: left;
                width: 9%;
                height: 24px;
                line-height: 24px;
            }
            .operation{
                i {
                    margin-right: 10%;
                    color: #307EFF;
                }
                i:nth-of-type(2){
                    margin-right: 0;
                }
            }
        }
    }
</style>


