<template>
    <div id="box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%">

        <!-- 头部 -->
        <v-header :title='headerTitle' @exportData='exportData' v-if="!loading"></v-header>

        <!-- 查询  -->
        <search :headTop='headTop'  @searchInfoChange='searchInfoChange' v-if="!loading"></search>

        <!-- 列表 -->
        <list :listTop='listTop' :listBot='info' v-if="!loading"></list>

        <!-- 分页 -->
        <pageing @pageChang='pageChang' v-if="!loading"></pageing>
        
        
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
                headBot: [ 20,40,60,80,100 ],
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
                info: [ ]  
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
        },

        methods: {

            // 导出数据
            exportData(){
                console.log( '导出数据' )
            },

            // 搜素
            searchInfoChange ( params ) {
                this.distributors = params.distributors;
                this.user = params.user;
                this.starTime = params.starTime;
                this.endTime = params.endTime;
                this.loading = params.loading;
                this.queryInfo();
            },

            // 分页
            pageChang( params ) {
                console.log( params )
                this.pageNum = params.pageNum;
                this.pageSize = params.pageSize;
                this.queryInfo();
            },

            // 查询
            queryInfo () {
                console.log( this.distributors )
                console.log( this.user )
                console.log( this.starTime )
                console.log( this.endTime )
                console.log( this.loading )
                console.log( this.pageNum )
                console.log( this.pageSize )
            }   
        }
    }
</script>
<style lang="scss" scoped>
    #box {
        width: 100%;
        height: 100vh;
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


