<template>
    <!-- <div> -->
        <div id="box"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%">
        <!-- 头部 -->
            <div class="div">
                    <p class="list">筛选</p>
                    <search @searchInfoChange='searchInfoChange'></search>
                    <p class="list">信息展示</p>
                </div>
            <ul class="title">
                <li style="width:7%;">
                    <span>序号</span>
                </li>
                <li>
                    <span>购买日期</span>
                    <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow === 0" @click="bigToSmallSort">
                    <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow === 1" @click="toSort">
                    <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow === 2" @click="toSort">
                </li>
                <li>
                    <span>信号源名称</span>
                </li>
                <li>
                    <span>用户名称</span>
                </li>
                <li>
                    <span>用户ID</span>
                    <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow === 0" @click="bigToSmallSort">
                    <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow === 1" @click="toSort">
                    <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow === 2" @click="toSort">
                </li>
                <li style="width:20%;">
                    <span>购买时长(预定时长+福利时长)</span>
                    <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow === 0" @click="bigToSmallSort">
                    <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow === 1" @click="toSort">
                    <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow === 2" @click="toSort">
                </li>
                <li>
                    <span>应付金额</span>
                    <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow === 0" @click="bigToSmallSort">
                    <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow === 1" @click="toSort">
                    <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow === 2" @click="toSort">
                </li>
                <li>
                    <span>折扣</span>
                </li>
                <li>
                    <span>实付金额</span>
                </li>
            </ul>
            <ul class="content">
                <li>
                    <p style="width:7%;">序号</p>
                    <p>购买日期</p>
                    <p>信号源名称</p>
                    <p>用户名称</p>
                    <p>用户ID</p>
                    <p style="width:20%;">购买时长(预定时长+福利时长)</p>
                    <p>应付金额</p>
                    <p >折扣</p>
                    <p>实付金额</p>
                </li>
            </ul>
            <!-- 分页 -->
            <pageing @pageChang='pageChang'  :total='total' :currentPage="currentPage"></pageing>
        </div>
        
    <!-- </div> -->
</template>

<script>
import Store from '@/store'
import Header from "@/components/public/Header";
import Pageing from "@/components/public/Pageing";
import Search from "@/components/main/signal_benefit/Search";
export default {
    name: 'signalBenefit',

    data(){
        return{
            loading: false,
            defaultSort: require('../../../assets/def_sort.png'),
            bigToSmall: require('../../../assets/big_small.png'),
            smallToBig: require('../../../assets/small_big.png'),
            total : 15,
            pageNum: 1, 
            pageSize: 15,
            loading:false,
            starTime: '',
            endTime: '',
            userId : 0 ,
            info:[],
            userName:'',
            sortImgShow: 0,
            currentPage:1,
            type:'',
            queryWord:'',
            distributors:''
        }
    },
    components:{
        'v-header': Header,
        Pageing,
        Search
    },
    created(){
        this.userId = this.$route.query.userId;
        this.userName = this.$route.query.userName;
        this.type = this.$route.query.type;
        this.queryWord = this.$route.query.queryWord;
        this.queryInfo( '', '', 1, 15, this.userId )
    },
    methods:{
        //数据请求
        queryInfo( starTime, endTime, pageNum, pageSize, userId,searchInfo){
            let postData = this.$qs.stringify({
                startTime: starTime,
                // startTime:new Date( this.starTime ),
                endTime : endTime,
                userId : this.userId,
                pageNum: pageNum,
                pageSize: pageSize,
                distributors:this.distributors
            });
            this.$http({
                method: 'post',
                url: this.$path +'web/emp/accountBindRecordData',
                data:postData
            }).then(res=>{
                console.log(res)
                
            }).catch(err=>{
                console.log(err)
            })
        },
        
        // 分页
        pageChang( params ) {
            this.loading = true;
            this.pageNum = params.pageNum;
            this.pageSize = params.pageSize;
            this.queryInfo( this.starTime, this.endTime, this.pageNum, this.pageSize );
        },
        searchInfoChange ( params ) {
            this.loading = true;
            this.starTime = params.starTime;
            this.endTime = params.endTime;
            this.loading = params.loading;
            this.distributors = params.distributors
            this.currentPage = params.currentPage
            this.queryInfo(this.starTime, this.endTime, this.pageNum, this.pageSize, this.userId);
            
        },
        // 返回用户信息页
        toUserInfo(params){
            this.$router.push({
                path:'/user_info',
                query:{//通过query 传递参数
                    type: this.type, //需要传递的参数,
                    queryWord: this.queryWord
                }
            })
        },
        // 默认反向排序
        bigToSmallSort ( ) {

            this.sortImgShow = 1;
            this.toSort();
        },  

        // 逆向排序
        toSort ( ind, key ) {
            if ( this.sortImgShow === 1) {

                this.sortImgShow = 2
                 this.isDate(1);

            }else if ( this.sortImgShow === 2 ) {
                
                this.sortImgShow = 1
                this.isDate(2);
  
            }
        },

        // 日期排序
        isDate(val){
            let newArr = [];
            for( let i = 0; i < this.info.length; i ++){
  
                let obj ={
                    "addTime": this.info[i].addTime,
                    "account": this.info[i].account,
                    "type": this.info[i].type,
                    "remark": this.info[i].remark,
                    "status": this.info[i].status,
                }
                newArr.push( obj );
            }
            if( val === 1){
                newArr = this.ZtoAsort(newArr, 'addTime');
            }else{
                newArr = this.AtoZsort(newArr, 'addTime');
            }

            for (let i = 0; i < newArr.length; i++ ) {
                let obj = {
                    "addTime": newArr[i].addTime,
                    "account": newArr[i].account,
                    "type": newArr[i].type,
                    "remark": newArr[i].remark,
                    "status": newArr[i].status,
                }
                this.info.push(obj);
            } 
        },
        // 正向排序
        AtoZsort( arr, key ) {

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
    #box{
        width: 100%;
        height:100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 14px;
        position: relative;
        min-height: 82vh;
        
        .title{
            width: 90%;
            margin: 10px auto 0;
            line-height: 28px;
            overflow: hidden;
            li{
                float: left;
                width: 10%;
                line-height: 28px;
                box-sizing: border-box;
                font-size: 14px;
            }
        }
        .content{
            width: 90%;
            margin: 0 auto;
            border-bottom: none;
            li{
                overflow: hidden;
                p{
                    float: left;
                    width: 10%;
                    line-height: 26px;
                    color: #666666;
                }
            }
        }
        .header{
            padding: 0 0 0 22px;
            span{
                font-size: 15px;
                font-weight: bold;
            }
            .uesr-name{
                color: #307eff;
            }
            .el-button { 
                font-size: 12px;
                padding: 8px 0;
                width: 80px;
            }
            
        }
        .list{
                text-align: left;
                padding: 0 0 0 22px;
                font-size: 14px;
                color: #333333;
            }
    }
    
</style>

