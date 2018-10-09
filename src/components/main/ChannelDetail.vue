<template>
    <div id="box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%">

        <!-- 头部 -->
        <v-header :title='headerTitle' @exportData='exportData' ></v-header>

        <!-- 查询  -->
        <search :headTop='headTop' :headBot='headBot' @searchInfoChange='searchInfoChange'></search>

        <!-- 列表 -->
        <list :listTop='listTop' :listBot='info' ></list>

        <!-- 分页 -->
        <pageing @pageChang='pageChang'   :total='total'></pageing>
        
    </div>
</template>
<script>

    import Store from '@/store'
    import Header from "@/components/public/Header";
    import Search from "@/components/public/Search";
    import List from "@/components/public/NineList";
    import Pageing from "@/components/public/Pageing";

    export default {

        name: 'ChannelDetail',

        data () {
            return {
                headerTitle:"渠道详情",
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
                headBot: [ ],
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
                total: 0  
            }
        },

        components: {
            'v-header': Header,
            Search,
            List,
            Pageing
        },

        created () {
            Store.commit( 'initLocDate' )
            this.starTime = Store.state.initDate;
            this.endTime = Store.state.initDate;
            this.queryInfo()
        },

        methods: {

            // 导出数据
            exportData(){
                window.open( `${this.$path}web/emp/exportSummaryDataToCVS?channelName=${this.distributors}&userId=${this.user}&startTime=${this.starTime}&endTime=${this.endTime}`);    
                window.open( `${this.$path}web/emp/exportSummaryDataDetailsToCVS?channelName=${this.distributors}&userId=${this.user}&startTime=${this.starTime}&endTime=${this.endTime}`);
            },

            // 搜素
            searchInfoChange ( params ) {
                this.loading = true;
                this.distributors = params.distributors;
                this.user = params.user;
                this.starTime = params.starTime;
                this.endTime = params.endTime;
                this.loading = params.loading;
                this.queryInfo();
            },

            // 分页
            pageChang( params ) {
                this.loading = true;
                this.pageNum = params.pageNum;
                this.pageSize = params.pageSize;
                this.queryInfo();
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
        // min-height:600px;
        background-color: #fff;
        box-sizing: border-box;
        padding: 14px;
        position: relative;
    }
    //ele修改
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


