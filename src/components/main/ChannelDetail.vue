<template>
    <div id="box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%">

        <div  class="top">
            <el-button type="success" plain @click="exportData">
                数据导出
            </el-button> 
        </div>    
        <el-tabs type="border-card" id="channel_detail" >

            <el-tab-pane label="代理详情" >

                <!-- 查询  -->
                <search :headTop='headTop' :headBot='headBot' @searchInfoChange='searchInfoChange'></search> 

                <!-- 列表标题 -->
                <p class="list-title">
                    清单明细
                </p>

                <!-- 列表详情 -->
                <ul class="list-tit clearfix">
                    <li >
                        <span>
                            序号
                        </span>
                    </li>
                    <li>
                        <span>
                            日期
                        </span>
                        <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[0] === 0" @click="bigToSmallSort( 0, 'date' )">
                        <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[0] === 1" @click="toSort( 0, 'date' )">
                        <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[0] === 2" @click="toSort( 0, 'date' )">
                    </li>
                    <li >
                        <span>
                            渠道商名称
                        </span>
                    </li>
                    <li>
                        <span>
                            用户ID
                        </span>
                    </li>
                    <li>
                        <span>
                            注册时间
                        </span>
                        <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[1] === 0" @click="bigToSmallSort( 1, 'registeredDate' )">
                        <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[1] === 1" @click="toSort( 1, 'registeredDate' )">
                        <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[1] === 2" @click="toSort( 1, 'registeredDate' )">
                    </li>
                    <li>
                        <span>
                            绑定手机号码                           
                        </span>
                    </li>
                    <li>
                        <span>
                            累计模拟跟单数量
                        </span>
                        <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[2] === 0" @click="bigToSmallSort( 2, 'simulationDocumentary' )">
                        <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[2] === 1" @click="toSort( 2, 'simulationDocumentary' )">
                        <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[2] === 2" @click="toSort( 2, 'simulationDocumentary' )">
                    </li>
                    <li>
                        <span>
                            绑定MT4账号数量
                        </span>
                        <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[3] === 0" @click="bigToSmallSort( 3, 'bindMT4' )">
                        <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[3] === 1" @click="toSort( 3, 'bindMT4' )">
                        <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[3] === 2" @click="toSort( 3, 'bindMT4' )">
                    </li>
                    <li>
                        <span>
                            累计付费金额
                        </span>
                        <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[4] === 0" @click="bigToSmallSort( 4, 'sumMoney' )">
                        <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[4] === 1" @click="toSort( 4, 'sumMoney' )">
                        <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[4] === 2" @click="toSort( 4, 'sumMoney' )">
                    </li>
                </ul>
                <ul class="contant">
                    <li class="info-list clearfix" v-for="(item, index) in info" :key="index" >
                        <p> 
                            {{ index + 1 }}
                        </p>
                        <p>
                            {{ item.date }}
                        </p>
                        <p>
                            {{ item.channelName }}
                        </p>
                        <p>
                            {{ item.userId }}
                        </p>
                        <p>
                            {{ item.registeredDate }}
                        </p>
                        <p>
                            {{ item.phone }}
                        </p>
                        <p>
                            {{ item.simulationDocumentary }}
                        </p>
                        <p>
                            {{ item.bindMT4 }}
                        </p>
                        <p>
                            {{ item.sumMoney }}
                        </p>
                    </li>
                </ul>    
 
                <!-- 分页 -->
                <pageing @pageChang='pageChang'   :total='total'></pageing>


            </el-tab-pane>
            <el-tab-pane label="用户详情">
                用户详情
            </el-tab-pane> 
        </el-tabs>
       
    </div>
</template>
<script>

    import Store from '@/store'
    import Header from "@/components/public/Header";
    import Search from "@/components/public/Search";
    import Pageing from "@/components/public/Pageing";

    export default {

        name: 'ChannelDetail',

        data () {
            return {
                defaultSort: require('../../assets/def_sort.png'),
                bigToSmall: require('../../assets/big_small.png'),
                smallToBig: require('../../assets/small_big.png'),
                tabPosition: 'top',
                headTop: [ 
                    '渠道商搜索',
                    '用户搜索',
                    '起始日期',
                    '截止日期',
                    '新增绑定手机人数',
                    '模拟跟单数量',
                    '绑定MT4账号数量',
                    '累计付费人数',
                    '累计付费金额',
                    '搜索'
                ],
                distributors: '',
                user: '',
                starTime: '',
                endTime: '',
                pageNum: 1, 
                pageSize: 15,
                loading: false, 
                headBot: [ 0, 0, 0, 0, 0 ],
                listTop: [
                    '日期',
                    '渠道商名称',
                    '用户ID',
                    '注册时间',
                    '绑定手机号码',
                    '累计模拟跟单数量',
                    '绑定MT4账号数量',
                    '累计付费金额'
                ],
                info: [ ],
                total: 0,
                sortImgShow: [ 0, 0, 0, 0, 0, 0, 0 ],  
            }
        },

        components: {
            'v-header': Header,
            Search,
            Pageing
        },

        created () {
            Store.commit( 'initLocDate' )
            this.starTime = Store.state.initDate;
            this.endTime = Store.state.initDate;
            this.queryInfo()
        },

        methods: {
            formatter(row, column) {
                return row.address;
            },
            // 导出数据
            exportData(){
                window.open( `${this.$path}web/emp/exportSummaryDataToCVS?channelName=${this.distributors}&userId=${this.user}&startTime=${this.starTime}&endTime=${this.endTime}`);    
                window.open( `${this.$path}web/emp/exportSummaryDataDetailsToCVS?channelName=${this.distributors}&userId=${this.user}&startTime=${this.starTime}&endTime=${this.endTime}`);
            },

            // 搜素
            searchInfoChange ( params ) {
                this.info= [];
                this.loading = true;
                this.distributors = params.distributors;
                this.user = params.user;
                this.starTime = params.starTime;
                this.endTime = params.endTime;
                this.loading = params.loading;
                this.sortImgShow = [ 0, 0, 0, 0, 0, 0, 0 ];
                this.queryInfo();
            },

            // 分页
            pageChang( params ) {
                this.loading = true;
                this.pageNum = params.pageNum;
                this.pageSize = params.pageSize;
                this.queryInfo();
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
                    
                    if( key == "date" || key == "registeredDate" ){
                       
                        this.isDate(key,1);
                    
                    }else{
                        this.info = this.ZtoAsort(this.info, key);
                    }
                
                }else if ( this.sortImgShow[ ind ] === 2 ) {
                    
                    this.sortImgShow = [ 0, 0, 0, 0, 0, 0, 0 ];
                    this.$set( this.sortImgShow, ind, 1 );

                    // this.info = this.ZtoAsort(this.info, key);  
                    if( key == "date" || key == "registeredDate" ){
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
                        bindMT4: this.info[i].bindMT4,
                        channelName: this.info[i].channelName,
                        date: new Date(this.info[i].date),
                        inviterUser: this.info[i].inviterUser,
                        phone: this.info[i].phone,
                        registeredDate: new Date(this.info[i].registeredDate),
                        simulationDocumentary: this.info[i].simulationDocumentary,
                        sumMoney: this.info[i].sumMoney,
                        userId: this.info[i].userId,
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
                        bindMT4: newArr[i].bindMT4,
                        channelName: newArr[i].channelName,
                        date: newArr[i].date.getFullYear() + '-' +(newArr[i].date.getMonth() > 8 ?  newArr[i].date.getMonth()+1 : '0' + (newArr[i].date.getMonth()+1) )+ '-' + (newArr[i].date.getDate() > 9 ?newArr[i].date.getDate() : '0' + newArr[i].date.getDate() ),
                        inviterUser: newArr[i].inviterUser,
                        phone: newArr[i].phone,
                        registeredDate: newArr[i].registeredDate.getFullYear() + '-' +( newArr[i].registeredDate.getMonth() > 8 ? newArr[i].registeredDate.getMonth()+1 : '0' + (newArr[i].registeredDate.getMonth()+1) ) + '-' + ( newArr[i].registeredDate.getDate() > 9 ? newArr[i].registeredDate.getDate() : '0'+ newArr[i].registeredDate.getDate() ),
                        simulationDocumentary: newArr[i].simulationDocumentary,
                        sumMoney: newArr[i].sumMoney,
                        userId: newArr[i].userId,
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
                // this.arr = [];
                // this.arr = newarr
                // console.log(this.arr)
                console.log(arr)
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

            // 查询
            queryInfo () {
                let postData = this.$qs.stringify({
                    channelName: this.distributors,
                    userId: this.user,
                    startTime: this.starTime, 
                    endTime: this.endTime,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                });
                this.$http({
                    method: 'post',
                    url: this.$path +'web/emp/summaryData',
                    data:postData
                }).then( res =>{
                    
                    this.loading = false;
                    this.info = [];
                    this.headBot = [];
                    this.total = res.data.data.data.total;
                    if ( res.data.data.data.countPhoneByTime ) {
                        this.headBot.push( res.data.data.data.countPhoneByTime )
                    }else {
                        this.headBot.push( 0 )
                    }
                    if ( res.data.data.data.countSimulationByTime ) {
                        this.headBot.push( res.data.data.data.countSimulationByTime )
                    }else {
                        this.headBot.push( 0 )
                    }
                    if ( res.data.data.data.countMT4ByTime ) {
                        this.headBot.push( res.data.data.data.countMT4ByTime )
                    }else {
                        this.headBot.push( 0 )
                    }
                    if ( res.data.data.data.countPaySuccess ) {
                        this.headBot.push( res.data.data.data.countPaySuccess )
                    }else {
                        this.headBot.push( 0 )
                    }
                    if ( res.data.data.data.selectSumPaySuccessMoney ) {
                        this.headBot.push( res.data.data.data.selectSumPaySuccessMoney )
                    }else {
                        this.headBot.push( 0 )
                    }

                    if( res.data.data.data.list ) {
                            // this.info = res.data.data.data.list;
                        for (let i= 0; i < res.data.data.data.list.length; i ++) {
                            let obj = {};
                            if( res.data.data.data.list[i].date ){
                                obj.date = res.data.data.data.list[i].date;
                            }else{
                                obj.date = '---'
                            }
                            if( res.data.data.data.list[i].channelName ){
                                obj.channelName = res.data.data.data.list[i].channelName;
                            }else{
                                obj.channelName = '---'
                            }
                            if( res.data.data.data.list[i].userId ){
                                obj.userId = res.data.data.data.list[i].userId;
                            }else{
                                obj.userId = '---'
                            }
                            if( res.data.data.data.list[i].registeredDate ){
                                obj.registeredDate = res.data.data.data.list[i].registeredDate;
                            }else{
                                obj.registeredDate = '---'
                            }
                            if( res.data.data.data.list[i].phone ){
                                obj.phone = res.data.data.data.list[i].phone;
                            }else{
                                obj.phone = '---'
                            }
                            if( res.data.data.data.list[i].simulationDocumentary ){
                                obj.simulationDocumentary = res.data.data.data.list[i].simulationDocumentary;
                            }else{
                                obj.simulationDocumentary = '0'
                            }

                            if( res.data.data.data.list[i].bindMT4 ){
                                obj.bindMT4 = res.data.data.data.list[i].bindMT4;
                            }else{
                                obj.bindMT4 = '0'
                            }
                            if( res.data.data.data.list[i].sumMoney ){
                                obj.sumMoney = res.data.data.data.list[i].sumMoney;
                            }else{
                                obj.sumMoney = '0'
                            }
                            this.info.push( obj )
                        }   
                    }

                }).catch( err => {
                    console.log( err )
                })
            }   
        }
    }
</script>
<style lang="scss" scoped>
    #box {
        width: 100%;
        height:100%;
        min-height:100%;
        background-color: #fff;
        box-sizing: border-box;
        position: relative;
       
        #channel_detail .list-title{
            text-align: left;
            height: 40px;
            line-height: 50px;
            font-weight: bold;
            
        }
        .top{
            position:absolute;
            top: -8px;
            right: 1vw;
            z-index: 10;
            .el-button {
                font-size: 12px;
                text-align: center;
                height: 30px;
                line-height: 6px;
                margin-top: 8px;
                padding: 0 8px;
            }
        }
        

        .list-tit{
            line-height: 20px;
            li {
                float: left;
                width: 11%;
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
                width: 11%;
                height: 24px;
                line-height: 24px;
            }
        }

    }
    //ele修改
    .el-tabs{
        border:none;
        box-shadow:none;
        -webkit-box-shadow:none;
    
    }
    #channel_detail{
        .is-active{
           color: red;
       }
    }
    .el-row {
        &:last-child {
        margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>


