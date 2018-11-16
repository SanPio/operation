<template>
    <!-- <div> -->
        <div id="box"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%">
        <!-- 头部 -->
            <div class="header clearfix">
                <p class="left">
                    <span class="uesr-name">
                        {{ userName }}
                    </span>
                    <span>
                        的账号绑定、解绑记录
                    </span>
                </p>               
                <p class="right">
                    <el-button type="success" plain @click="toUserInfo">
                        返回
                    </el-button>
                </p>  
            </div>
            <div class="div">
                    <p class="list">筛选</p>
                    <search @searchInfoChange='searchInfoChange'></search>
                    <p class="list">记录清单</p>
                </div>
            <ul class="title">
                <li>
                    <span>序号</span>
                </li>
                <li>
                    <span>时间</span>
                    <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow === 0" @click="bigToSmallSort">
                    <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow === 1" @click="toSort">
                    <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow === 2" @click="toSort">
                </li>
                <li>
                    <span>账号</span>
                </li>
                <li>
                    <span>绑定/解绑</span>
                </li>
                <li>
                    <span>状态</span>
                </li>
                <li>
                    <span>备注</span>
                </li>
            </ul>
            <ul class="content">
                <li v-for="(item,index) in info" :key="index">
                    <p>{{ index + 1 }}</p>
                    <p>{{ item.addTime }}</p>
                    <p>{{ item.account }}</p>
                    <p v-if="item.type==2">解绑</p>
                    <p v-if="item.type==1">绑定</p>
                    <p>
                        <span v-if="item.status==2" style="color: #307eff;">成功</span>
                        <span v-if="item.status==3" style="color: #666666;">失败</span>
                        <span v-if="item.status==1" style="color: #ff8830;">审核中</span>
                        <!-- {{ item.status }} -->
                    </p>
                    <p v-if="item.remark">{{ item.remark }}</p>
                    <p v-if="!item.remark">--</p>
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
import Search from "@/components/main/accountBindList/Search";
export default {
    name: 'AccountBindList',

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
            btnInfo: '返回',
            headerTitle: '的账号绑定，解绑记录',
            starTime: '',
            endTime: '',
            userId : 0 ,
            info:[],
            userName:'',
            sortImgShow: 0,
            currentPage:1
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
        // console.log(this.userId)
        this.queryInfo( '', '', 1, 15, this.userId )
    },
    methods:{
        //数据请求
        queryInfo( starTime, endTime, pageNum, pageSize, userId){
            let postData = this.$qs.stringify({
                startTime: starTime,
                // startTime:new Date( this.starTime ),
                endTime : endTime,
                userId : this.userId,
                pageNum: pageNum,
                pageSize: pageSize
            });
            this.$http({
                method: 'post',
                url: this.$path +'web/emp/accountBindRecordData',
                data:postData
            }).then(res=>{
                console.log(res)
                this.loading = false
                // console.log(res.data.data.data.accountBindRecordList)
                this.info = res.data.data.data.accountBindRecordList;
                this.total = res.data.data.data.totalNum;
                this.currentPage = 1;
                this.pageNum=1;
                this.userName = res.data.data.data.userName
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
            this.currentPage = params.currentPage
            this.queryInfo(this.starTime, this.endTime, this.pageNum, this.pageSize, this.userId);
            
        },
        // 返回用户信息页
        toUserInfo(){
            this.$router.push({
                path:'/user_info'
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
            width: 1085px;
            margin: 10px auto 0;
            line-height: 28px;
            background-color: #26b95a;
            overflow: hidden;
            li{
                color: white;
                float: left;
                width: 180px;
                line-height: 28px;
                box-sizing: border-box;
                font-size: 14px;
                img{
                    vertical-align: middle;
                }
            }
        }
        .content{
            width: 1083px;
            margin: 0 auto;
            border: 1px solid #d7d7d7;
            border-bottom: none;
            li{
                overflow: hidden;
                border-bottom: 1px solid #d7d7d7;
                p{
                    float: left;
                    width: 180px;
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

