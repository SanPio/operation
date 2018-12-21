<template>
    <div id="box"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%">
        <!-- 头部 -->
        <!-- <v-header :title='headerTitle' :btnType='btnType'></v-header> -->
        <div  class="top">
            <p>数据信息</p>
            <el-button type="success" plain @click="exportData">
                数据导出
            </el-button> 
        </div>   
        <!-- 查询 -->
        <!-- <search :headTop='headTop' :headBot='headBot' @searchInfoChange='searchInfoChange'></search> -->
        <div id="top">
            <ul id="top-head">
                <li>
                    起始日期
                </li>
                <li>
                    截止日期
                </li>
                <li>
                    新增用户数
                </li>
                <li style="line-height: 20px;padding: 5px 0 0 0;">
                    当前跟单人数<br/>(模拟/真实)
                </li>
                <li style="line-height: 20px;padding: 5px 0 0 0;">
                    绑定MT4账号数量<br/>(总数/<span>增长</span>/<small>下调</small>)
                </li>
                <li style="line-height: 20px;padding: 5px 0 0 0;">
                    付费人数<br/>(<span>首充</span>+<small>续费</small>=合计)
                </li>
                <li style="line-height: 20px;padding: 5px 0 0 0;">
                    付费金额<br/>(<span>首充</span>+<small>续费</small>=合计)
                </li>
                <li>
                    操作
                </li>
            </ul>
            <ul id="top-bot">
                <li>
                    <div class="block">
                        
                        <el-date-picker
                        v-model="startTime"
                        type="date"
                        @change="starChoose"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </li>
                <li>
                    <div class="block">
                      
                        <el-date-picker
                        v-model="endTime"
                        type="date"
                        @change="endChoose"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </li>
                <!-- <li v-for="(item, index) in headBot" :key="index" class="top-bot-num">
                    {{ item }}
                </li> -->
                <li><span>{{ headBot.newUserNum }}</span></li>
                <li><span>{{ headBot.countFollowByTime }} ( {{ headBot.countSimulationByTime }} ) </span></li>
                <li><span>{{ headBot.bindMT4TotalNum }}</span> / <a>{{ headBot.bindMT4UpNum }}</a> / <b>{{ headBot.bindMT4DownNum }}</b></li>
                <li><a>{{ headBot.firstPayPeopleNum }}</a>+<b>{{ headBot.renewalPeopleNum }}</b>=<span>{{ headBot.totalPeopleNum }}</span></li>
                <li><a>￥{{ headBot.firstPayMoneyNum |plus }}</a>+<b>￥{{ headBot.renewalMoneyNum | plus }}</b>=<span>￥{{ headBot.totalMoneyNum | plus}}</span></li>
                <li>
                    <el-button type="primary" plain @click="searchInfoChange">
                        查询
                    </el-button>
                </li>
            </ul>
        </div>
        <!-- 列表 -->
        <p class="list-top">清单明细</p>
        <ul class="list-tit clearfix">
            <li style="width:5%;"><span>序号</span></li>
            <li style="width:6%;">
                <span>
                    日期
                </span>
                <!-- <img :src="defaultSort" alt="" class="pointer" > -->
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[0] === 0" @click="bigToSmallSort( 0, 'date' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[0] === 1" @click="toSort( 0, 'date' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[0] === 2" @click="toSort( 0, 'date' )">
            </li>
            <li style="width:7%;">
                <span>
                    新增用户数
                </span>
                <!-- <img :src="defaultSort" alt="" class="pointer" > -->
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[1] === 0" @click="bigToSmallSort( 1, 'newUserNum' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[1] === 1" @click="toSort( 1, 'newUserNum' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[1] === 2" @click="toSort( 1, 'newUserNum' )">
            </li>
            <li style="width:10%;">
                <span>
                    跟单人数(模拟/真实)
                </span>
            </li>
            <li style="width:11%;">
                <span>
                    绑定MT4账号总数
                </span>
                <!-- <img :src="defaultSort" alt="" class="pointer" > -->
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[2] === 0" @click="bigToSmallSort( 2, 'bindMT4TotalNum' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[2] === 1" @click="toSort( 2, 'bindMT4TotalNum' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[2] === 2" @click="toSort( 2, 'bindMT4TotalNum' )">
            </li>
            <li style="width:11%;">
                <span>
                    新增/解绑MT4账号数
                </span>
                <!-- <img :src="defaultSort" alt="" class="pointer" > -->
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[3] === 0" @click="bigToSmallSort( 3, 'bindMT4UpNum' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[3] === 1" @click="toSort( 3, 'bindMT4UpNum' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[3] === 2" @click="toSort( 3, 'bindMT4UpNum' )">
            </li>
            <li>
                <span>
                    首充人数
                </span>
                <!-- <img :src="defaultSort" alt="" class="pointer" > -->
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[4] === 0" @click="bigToSmallSort( 4, 'firstPayPeopleNum' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[4] === 1" @click="toSort( 4, 'firstPayPeopleNum' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[4] === 2" @click="toSort( 4, 'firstPayPeopleNum' )">
            </li>
            <li>
                <span>
                    续费人数
                </span>
                <!-- <img :src="defaultSort" alt="" class="pointer" > -->
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[5] === 0" @click="bigToSmallSort( 5, 'renewalPeopleNum' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[5] === 1" @click="toSort( 5, 'renewalPeopleNum' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[5] === 2" @click="toSort( 5, 'renewalPeopleNum' )">
            </li>
            <li>
                <span>
                    付费人总数
                </span>
                <!-- <img :src="defaultSort" alt="" class="pointer" > -->
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[6] === 0" @click="bigToSmallSort( 6, 'totalPeopleNum' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[6] === 1" @click="toSort( 6, 'totalPeopleNum' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[6] === 2" @click="toSort( 6, 'totalPeopleNum' )">
            </li>
            <li>
                <span>
                    首充金额
                </span>
            </li>
            <li>
                <span>
                    续费金额
                </span>
            </li>
            <li>
                <span>
                    总金额
                </span>
                <!-- <img :src="defaultSort" alt="" class="pointer" > -->
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[7] === 0" @click="bigToSmallSort( 7, 'totalMoneyNum' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[7] === 1" @click="toSort( 7, 'totalMoneyNum' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[7] === 2" @click="toSort( 7, 'totalMoneyNum' )">
            </li>
        </ul>
        <ul class="contant">
            <li class="info-list clearfix" v-for="(item,index) in info" :key="index">
                <p style="width:5%;">{{index+1}}</p>
                <p style="width:6%;">{{ item.date }}</p>
                <p style="width:7%;">{{ item.newUserNum }}</p>
                <p style="width:10%;">{{ item.countSimulationByTime }}/{{ item.countFollowByTime }}</p>
                <p style="width:11%;">{{ item.bindMT4TotalNum }}</p>
                <p style="width:11%;">{{ item.bindMT4UpNum }}/{{ item.bindMT4DownNum }}</p>
                <p>{{ item.firstPayPeopleNum }}</p>
                <p>{{ item.renewalPeopleNum }}</p>
                <p>{{ item.totalPeopleNum }}</p>
                <p>￥{{ item.firstPayMoneyNum }}</p>
                <p>￥{{ item.renewalMoneyNum }}</p>
                <p>￥{{ item.totalMoneyNum }}</p>
            </li>
            
        </ul>
        <pageing @pageChang='pageChang'  :total='total' :currentPage="currentPage"></pageing>
    </div>
</template>
<script>
import Header from "@/components/public/Header";
import Pageing from "@/components/public/Pageing";
// import Search from "@/components/main/dataInformation/Search";
import Store from '@/store'
export default {
    name:'DataInformation',
    data(){
        return{
            loading: false,
            btnType: 'success',
            headerTitle: '数据信息',
            defaultSort: require('../../../assets/def_sort.png'),
            bigToSmall: require('../../../assets/big_small.png'),
            smallToBig: require('../../../assets/small_big.png'),
            sortImgShow: [ 0, 0, 0, 0, 0, 0, 0, 0],
            headTop:[
                '起始日期',
                '截止日期',
                '新增用户数',
                '当前跟单人数(模拟/真实)',
                '绑定MT4账号数量(总数/增长/下调)',
                '付费人数(首充+续费=合计)',
                '付费金额(首充+续费=合计)',
                '操作'
            ],
            headBot: [ '0', '0', '0', '0', '0' ],
            startTime: '',
            endTime: '',
            total : 15,
            pageNum: 1, 
            pageSize: 15,
            currentPage:1,
            info:[]
        }
        
    },
    components:{
        'v-header': Header,
        // Search,
        Pageing
    },
    created(){
        this.queryInfo('', '', 1, 15);
        Store.commit( 'initLocDate' )
        this.startTime = Store.state.initDate;
        this.endTime = Store.state.initDate;
    },
    filters:{
        tonum(val){
          return parseInt(  Number(val) *100)/100
        },
        plus(val){
           if(val >= 1000 || val <= -1000){
             return parseInt(val/10)/100 + "K"
           }else{
             return parseInt(val * 100 )/100
           }
        }
        
    },
    methods:{
        // 导出数据
        exportData(){
            window.open( `${this.$path}web/emp/exportDataShowToCVS?startTime=${this.startTime}&endTime=${this.endTime}`);    
            window.open( `${this.$path}web/emp/exportDataShowToCVS?startTime=${this.startTime}&endTime=${this.endTime}`);
        },
        // 开始日期
        starChoose ( val ) {
            this.startTime = val;
            let starDate = new Date( this.startTime );
            let endDate = new Date( this.endTime );

            if ( endDate < starDate && this.endTime ) {
                // this.startTime = this.endTime;
                // this.endTime = val;
                this.endTime = this.startTime;
            }else {
                this.startTime = val;
            }
            
            
        },

        // 结束日期
        endChoose ( val ) {
            this.endTime = val;
            let starDate = new Date( this.startTime );
            let endDate = new Date( this.endTime );
            if ( endDate < starDate ) {
                // this.endTime = this.startTime;
                // this.startTime = val;
                this.startTime = this.endTime;
            }else {
                    this.endTime = val;
            }
        },
        // 数据请求
        queryInfo( startTime, endTime, pageNum, pageSize){
            let postData = this.$qs.stringify({
                startTime: startTime,
                endTime : endTime,
                pageNum: pageNum,
                pageSize: pageSize
            });
            this.$http({
                method: 'post',
                url: this.$path +'web/emp/dataShow',
                data:postData
            }).then(res=>{
                console.log(res)
                this.loading = false
                this.currentPage = 1;
                this.pageNum=1;
                this.info = res.data.data.data.dataShowReponseList
                this.headBot = res.data.data.data
                console.log(this.info)
                this.total = res.data.data.data.totalListNum
            }).catch(err=>{
                console.log(err)
            })
        },
        searchInfoChange(params){
            this.loading = true;
            this.startTime = this.startTime;
            this.endTime = this.endTime;
            this.loading = this.loading;
            this.currentPage = params.currentPage;
            // sortImgShow: [ 0, 0, 0, 0, 0, 0, 0, 0];
            this.queryInfo(this.startTime, this.endTime, this.pageNum, this.pageSize);
        },
        // 分页
        pageChang( params ) {
            this.loading = true;
            this.pageNum = params.pageNum;
            this.pageSize = params.pageSize;
            this.queryInfo( this.startTime, this.endTime, this.pageNum, this.pageSize );
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
                
                if( key == "day" ){
                    
                    this.isDate(key,1);
                
                }else{
                    this.info = this.ZtoAsort(this.info, key);
                }
            
            }else if ( this.sortImgShow[ ind ] === 2 ) {
                
                this.sortImgShow = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
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
                    date: this.info[i].date,
                    newUserNum: this.info[i].newUserNum,
                    countSimulationByTime: this.info[i].countSimulationByTime,
                    dabindMT4TotalNumte: this.info[i].bindMT4TotalNum,
                    bindMT4UpNum: this.info[i].bindMT4UpNum,
                    firstPayPeopleNum: this.info[i].firstPayPeopleNum,
                    renewalPeopleNum: this.info[i].renewalPeopleNum,
                    totalPeopleNum: this.info[i].totalPeopleNum,
                    firstPayMoneyNum: this.info[i].firstPayMoneyNum,
                    renewalMoneyNum: this.info[i].renewalMoneyNum,
                    totalMoneyNum: this.info[i].totalMoneyNum,
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
                    date: newArr[i].date,
                    newUserNum: newArr[i].newUserNum,
                    countSimulationByTime: newArr[i].countSimulationByTime,
                    dabindMT4TotalNumte: newArr[i].bindMT4TotalNum,
                    bindMT4UpNum: newArr[i].bindMT4UpNum,
                    firstPayPeopleNum: newArr[i].firstPayPeopleNum,
                    renewalPeopleNum: newArr[i].renewalPeopleNum,
                    totalPeopleNum: newArr[i].totalPeopleNum,
                    firstPayMoneyNum: newArr[i].firstPayMoneyNum,
                    renewalMoneyNum: newArr[i].renewalMoneyNum,
                    totalMoneyNum: newArr[i].totalMoneyNum,
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
    #box{
        width: 100%;
        height:100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 14px;
        position: relative;
        min-height: 82vh;
        .list-top{
            text-align: left;
            margin-top: 20px;
            font-size: 14px;
            // font-weight: bold;
        }
        .top{
            overflow: hidden;
            margin-bottom: 6px;
            p{
                float: left;
                font-size: 16px;
                color: #333333;
                font-weight: bold;
            }
            .el-button{
                float: right;
                line-height: 6px;
                text-align: center;
                height: 30px;
                font-size: 12px;
                padding: 0 8px;
            }
        }
        .list-tit{
            line-height: 20px;
            li {
                float: left;
                width: 8.3%;
                height: 30px;
                line-height: 30px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
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
                width: 8.3%;
                height: 24px;
                line-height: 24px;
            }
        }
    }
    #top {
            width: 100%;

            ul {
                display: flex;
                box-sizing: border-box;

                li {
                    width: 14%;
                    border: 1px solid #d7d7d7;
                    border-right: none;
                    border-top: none;
                }

                li:nth-last-child(1){
                    border-right: 1px solid #d7d7d7;
                }
            }
            #top-head {
                height: 50px;
                line-height: 50px;
                font-size: 12px;

                li{
                    border-top: 1px solid #d7d7d7;
                    span{
                        color: #307eff;
                    }
                    small{
                        color: #ff8830;
                    }
                }
            }

            #top-bot {
                height: 50px;

                .top-bot-num {
                    line-height: 50px;
                    font-weight: bold;
                }

                .el-input{
                    width: 90%;
                    height: 30px;
                    font-size: 12px;
                    margin-top: 10px;
                } 

                .el-input__prefix{
                    top:-10px;
                }

                .el-button {
                    width: 70%;
                    height: 30px;
                    line-height: 6px;
                    margin-top: 10px;
                }
                li{
                    font-size: 12px;
                    font-weight: bold;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    span{
                        color: #333333;
                        line-height: 50px;
                    }
                    b{
                        color: #ff8830;
                        line-height: 50px;
                        // font-weight: normal;
                    }
                    a{
                        color: #307eff;
                        line-height: 50px; 
                        text-decoration: none;
                    }
                }
            }
        }
</style>


