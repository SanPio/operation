<template>
    <div id="box"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%">
        <p>筛选</p>
        <div class="query">
            <p class="fl">信号源名称：</p>
            <el-input
                placeholder="请输入信号源名称"
                prefix-icon="el-icon-search"
                v-model="optionName"
                class="fl">
            </el-input>  
            <el-row class="fl">
                <el-button type="primary" plain size="mini" @click="searchInfoChange">查询</el-button>
            </el-row>
        </div>
        <p>信息展示</p>
        <ul class="title">
            <li>
                <span>序号</span>
            </li>
            <li>
                <span>用户ID</span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[0] === 0" @click="bigToSmallSort( 0, 'uid' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[0] === 1" @click="toSort( 0, 'uid' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[0] === 2" @click="toSort( 0, 'uid' )">               
            </li>
            <li>
                <span>用户昵称</span>
            </li>
            <li>
                <span>MT4账户</span>
            </li>
            <li>
                <span>跟随状态</span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[1] === 0" @click="bigToSmallSort( 1, 'nullity' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[1] === 1" @click="toSort( 1, 'nullity' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[1] === 2" @click="toSort( 1, 'nullity' )">
            </li>
            <li>
                <span>固定跟随</span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[2] === 0" @click="bigToSmallSort( 2,'shoushu')">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[2] === 1" @click="toSort( 2, 'shoushu' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[2] === 2" @click="toSort( 2, 'shoushu')">
            </li>
            <li>
                <span>比例跟随</span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[3] === 0" @click="bigToSmallSort( 3, 'beishu' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[3] === 1" @click="toSort( 3, 'beishu' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[3] === 2" @click="toSort( 3, 'beishu' )">
            </li>
            <li>
                <span>累计跟随时长</span>
            </li>
            <li>
                <span>账户余额</span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[4] === 0" @click="bigToSmallSort( 4, 'balance' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[4] === 1" @click="toSort( 4, 'balance' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[4] === 2" @click="toSort( 4, 'balance' )">
            </li>
            <li>
                <span>跟随累计收益</span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[5] === 0" @click="bigToSmallSort( 5, 'orderprofits' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[5] === 1" @click="toSort( 5, 'orderprofits' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[5] === 2" @click="toSort( 5, 'orderprofits' )">
            </li>
        </ul>
        <ul class="content">
            <li v-for="(item,index) in info" :key="index">
                <p><span>{{index+1}}</span></p>

                <p><span v-if="item.uid">{{item.uid}}</span><span v-if="!item.uid">--</span></p>

                <p><span v-if="item.wxNickname">{{item.wxNickname}}</span><span v-if="!item.wxNickname">--</span></p>

                <p><span>{{item.usertradeacts}}</span></p>
                <p>
                    <span v-if="item.nullity==0">开启</span>
                    <span v-if="item.nullity==1">关闭</span>
                    <span v-if="item.nullity!=1 && item.nullity!=0">--</span>
                </p>

                <!-- <p><span v-if="item.lotstype==1">{{item.lots}}手</span><span v-if="item.lotstype==0">--</span></p>
                <p><span v-if="item.lotstype==0">{{item.lots}}倍</span><span v-if="item.lotstype==1">--</span></p> -->
                <p><span>{{item.shoushu}}</span></p>
                <p><span>{{item.beishu}}</span></p>

                <p><span>{{item.days}}天</span></p>

                <p><span>${{item.balance | numPuls}}</span></p>

                <p><span>${{item.orderprofits | numPuls}}</span></p>
            </li>
        </ul>
        <pageing @pageChang='pageChang'  :total='total' :currentPage="currentPage"></pageing>
    </div>
</template>
<script>
import Store from '@/store'
import Pageing from "@/components/public/Pageing";
export default {
    name: 'followDetails',

    data () {
        return {
            loading:false,
            defaultSort: require('../../../assets/def_sort.png'),
            bigToSmall: require('../../../assets/big_small.png'),
            smallToBig: require('../../../assets/small_big.png'),
            sortImgShow: [ 0, 0, 0, 0, 0, 0],
            total : 15,
            pageNum: 1, 
            pageSize: 15,
            currentPage:1,
            optionName:'',
            info:[],
            lot:[],
            lote:[]
        }
    },
    
    created () {

    },
    filters: {
        numPuls(val){
            if ( parseFloat( val ) >=1000000 || parseFloat( val ) <= -1000000 ){
                return parseInt( val / 10000 ) / 100 + 'M'
            }else if ( parseFloat( val ) >=1000 || parseFloat( val ) <= -1000 ){
                return parseInt( val / 10 ) / 100 + 'K'
            }else{
                return val
            }    
        }
    },
    components:{
        Pageing
    },
    methods: {
        // 分页
        pageChang( params ) {
            this.loading = true;
            this.pageNum = params.pageNum;
            this.pageSize = params.pageSize;
            this.query( this.pageNum, this.pageSize );
        },
        searchInfoChange(params){
            this.loading = true;
            this.currentPage = params.currentPage;
            this.loading = this.loading;
            // sortImgShow: [ 0, 0, 0, 0, 0, 0, 0, 0];
            this.query( this.pageNum, this.pageSize);
        },

        // 请求数据
        query(optionName, pageNum, pageSize){
            let postData = this.$qs.stringify({
                optionName : this.optionName,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            });
            this.$http({
                method: 'post',
                url: this.$path +'web/emp/optionManagement/followingDataShow',
                data:postData
            }).then(res=>{
                this.loading = false
                console.log(res)
                this.info = res.data.data.data
                // console.log(this.info)
                this.total = res.data.data.num
                this.currentPage = 1;
                this.pageNum=1;

            }).catch(err=>{
                console.log(err)
            })
        },


        // 默认反向排序
        bigToSmallSort ( ind, key) {

            this.sortImgShow = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
            this.$set( this.sortImgShow, ind, 1 );
            this.toSort(ind,key);
        },  

        // 逆向排序
        toSort ( ind, key ) {
            if ( this.sortImgShow[ ind ] === 1) {

                this.sortImgShow = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
                this.$set( this.sortImgShow, ind, 2);
                
                this.info = this.ZtoAsort(this.info, key);
            
            }else if ( this.sortImgShow[ ind ] === 2 ) {
                
                this.sortImgShow = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
                this.$set( this.sortImgShow, ind, 1 );

                // this.info = this.ZtoAsort(this.info, key);  
                // if( key == "day" ){
                //     this.isDate(key,2);
                    
                // }else{
                    this.info = this.AtoZsort(this.info, key);
                // }          
                
            }
        },

        // 日期排序
        // isDate(key,val){
        //     let newArr = [];
        //     for( let i = 0; i < this.info.length; i ++){
                
        //         let obj ={
        //             uid: this.info[i].uid,
        //             accountsid: this.info[i].accountsid,
        //             nullity: this.info[i].nullity,
        //             lotstype: this.info[i].lotstype,
        //             lots: this.info[i].lots,
        //             days: this.info[i].days,
        //             balance: this.info[i].balance,
        //             orderprofits: this.info[i].orderprofits,
                    
        //         }
        //         newArr.push( obj );
        //     }
        //     if( val === 1){
        //         newArr = this.ZtoAsort(newArr, key);
        //     }else{
        //         newArr = this.AtoZsort(newArr, key);
        //     }

        //     for (let i = 0; i < newArr.length; i++ ) {
        //         let obj = {
        //             uid: this.info[i].uid,
        //             accountsid: newArr[i].accountsid,
        //             nullity: newArr[i].nullity,
        //             lotstype: newArr[i].lotstype,
        //             lots: newArr[i].lots,
        //             days: newArr[i].days,
        //             balance: newArr[i].balance,
        //             orderprofits: newArr[i].orderprofits,
        //         }
        //         this.info.push(obj);
        //     } 
        // },

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
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    .el-input__inner {
        height: 33px;
        font-size: 13px;
        box-shadow: none;
        border: 1px solid #e9e9e9;
    }
    #box{
        width: 100%;
        height:100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 14px;
        position: relative;
        min-height: 82vh;
        overflow: hidden;
        >p{
            text-align: left;
            font-size: 16px;
            color: #333333;
            margin: 20px 0 14px 14px;
        }
        .query{
            overflow: hidden;
            margin-left: 14px;
            p{
                font-size: 16px;
                color: #333333;
                margin-right: 10px;
                line-height: 28px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .el-input{
                width: 240px;
                outline: none;
                margin-right: 40px;
            }
        }
        .title{
            width: 90%;
            margin: 0 auto;
            overflow: hidden;
            li{
                float: left;
                width: 10%;
                text-align: center;
                line-height: 30px;
                color: #333333;
                font-size: 14px;
            }
        }
        .content{
            width: 90%;
            margin: 0 auto;
            li{
                overflow: hidden;
                text-align: center;
                p{
                    width: 10%;
                    float: left;
                    height: 26px;
                    text-align: center;
                    line-height: 26px;
                    font-size: 12px;
                    color: #666666;
                }
            }
        }
    }
</style>

