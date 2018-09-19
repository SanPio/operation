<template>
    <div id="box">
        <header> 
                <span>
                    渠道详情
                </span>
                <el-button type="success" plain>
                    数据导出
                </el-button>
        </header>
        <div id="top">
            <ul id="top-head">
                <li v-for="item in headTop" :key="item" >
                    {{ item }}
                </li>
            </ul>
            <ul id="top-bot">
                <li>
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="distributors">
                    </el-input> 
                </li>
                <li>
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="user">
                    </el-input> 
                </li>

                <li>
                    <div class="block">
                        
                        <el-date-picker
                        v-model="starTime"
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
                <li v-for="(item, index) in headBot" :key="index" class="top-bot-num">
                    {{ item }}
                </li>
                <li>
                    <el-button type="primary" plain>
                        查询
                    </el-button>
                </li>
            </ul>
        </div>
        <div id="center">
            <el-row class="cen-top">
                <el-col :span="1" >
                    <span style="line-height:30px">
                        清单明细  
                    </span>  
                </el-col>
            </el-row>
            <el-row class="cen-bot">
                <el-col :span="1" :offset='1'>
                    序号
                </el-col>
                <el-col :span="21">
                    <el-row>
                        <el-col :span="3" v-for="item in centerTit" :key="item">
                            {{ item }}
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="cen-list" v-for="(item, index) in info" :key="index">
                <el-col :span="1" :offset='1'>
                    {{ index + 1 }}
                </el-col>
                <el-col :span="21">
                    <el-row>
                   
                        <el-col :span="3" >
                            {{ item.date }}
                        </el-col>
                        <el-col :span="3" >
                            {{ item.qudao }}
                        </el-col>
                        <el-col :span="3" >
                            {{ item.yonghu }}
                        </el-col>
                        <el-col :span="3" >
                            {{ item.zhuce }}
                        </el-col>
                        <el-col :span="3" >
                            {{ item.phone }}
                        </el-col>
                        <el-col :span="3" >
                            {{ item.moni }}
                        </el-col>
                        <el-col :span="3" >
                            {{ item.mt4 }}
                        </el-col>
                        <el-col :span="3" >
                            {{ item.money }}
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <div id="footer">
            <el-row>
                <el-col :span="12" :offset='6'>
                    <el-pagination
                    background
                    layout="prev, pager, next"
                    prev-text="上一页"
                    next-text="下一页"
                    @current-change="handleCurrentChange"
                    :page-size="12"
                    :total="152">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
        
        
    </div>
</template>
<script>

    import Store from '@/store'

    export default {

        name: 'ChannelDetail',

        data () {
            return {
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
                headBot: [
                    20,
                    30,
                    40,
                    50,
                    60
                ],
                centerTit: [
                    '日期',
                    '渠道商名称',
                    '用户ID',
                    '注册时间',
                    '绑定手机号码',
                    '累计模拟跟单数量',
                    '绑定MT4账号数量',
                    '累计付费金额'
                ],
                info: [
                    {
                        date: '111',
                        qudao: '张三',
                        yonghu: '56456',
                        zhuce: '98年',
                        phone: '13333333333',
                        moni: '564456',
                        mt4: '456465',
                        money: '￥56464'
                    },
                    {
                        date: '111',
                        qudao: '张三',
                        yonghu: '56456',
                        zhuce: '98年',
                        phone: '13333333333',
                        moni: '564456',
                        mt4: '456465',
                        money: '￥56464'
                    },
                    {
                        date: '111',
                        qudao: '张三',
                        yonghu: '56456',
                        zhuce: '98年',
                        phone: '13333333333',
                        moni: '564456',
                        mt4: '456465',
                        money: '￥56464'
                    },
                    {
                        date: '111',
                        qudao: '张三',
                        yonghu: '56456',
                        zhuce: '98年',
                        phone: '13333333333',
                        moni: '564456',
                        mt4: '456465',
                        money: '￥56464'
                    },
                    {
                        date: '111',
                        qudao: '张三',
                        yonghu: '56456',
                        zhuce: '98年',
                        phone: '13333333333',
                        moni: '564456',
                        mt4: '456465',
                        money: '￥56464'
                    },
                    {
                        date: '111',
                        qudao: '张三',
                        yonghu: '56456',
                        zhuce: '98年',
                        phone: '13333333333',
                        moni: '564456',
                        mt4: '456465',
                        money: '￥56464'
                    },
                    {
                        date: '111',
                        qudao: '张三',
                        yonghu: '56456',
                        zhuce: '98年',
                        phone: '13333333333',
                        moni: '564456',
                        mt4: '456465',
                        money: '￥56464'
                    },
                    {
                        date: '111',
                        qudao: '张三',
                        yonghu: '56456',
                        zhuce: '98年',
                        phone: '13333333333',
                        moni: '564456',
                        mt4: '456465',
                        money: '￥56464'
                    },
                    {
                        date: '111',
                        qudao: '张三',
                        yonghu: '56456',
                        zhuce: '98年',
                        phone: '13333333333',
                        moni: '564456',
                        mt4: '456465',
                        money: '￥56464'
                    },
                    {
                        date: '111',
                        qudao: '张三',
                        yonghu: '56456',
                        zhuce: '98年',
                        phone: '13333333333',
                        moni: '564456',
                        mt4: '456465',
                        money: '￥56464'
                    },
                    {
                        date: '111',
                        qudao: '张三',
                        yonghu: '56456',
                        zhuce: '98年',
                        phone: '13333333333',
                        moni: '564456',
                        mt4: '456465',
                        money: '￥56464'
                    }

                ]
            }
        },

        created () {
            Store.commit( 'initLocDate' )
            this.starTime = Store.state.initDate;
            this.endTime = Store.state.initDate;
        },

        methods: {
            // 分页选择
            handleCurrentChange ( val ) {
                // console.log( val )
            },

            // 开始日期
            starChoose ( val ) {
                this.starTime = val;
                let starDate = new Date( this.starTime );
                let endDate = new Date( this.endTime );
                if ( endDate < starDate ) {
                    this.starTime = this.endTime;
                    this.endTime = val;
                }else {
                     this.starTime = val;
                }
               
            },

            // 结束日期
            endChoose ( val ) {
                this.endTime = val;
                let starDate = new Date( this.starTime );
                let endDate = new Date( this.endTime );
                if ( endDate < starDate ) {
                    this.endTime = this.starTime;
                    this.starTime = val;
                }else {
                     this.endTime = val;
                }
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
        padding: 16px;
        position: relative;

        header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 16px;

            span {
                font-size: 15px;
                font-weight: bold;
                line-height: 30px;
            }

            .el-button { 
                font-size: 12px;
                padding: 8px;
            }
        }

        #top {
            width: 100%;

            ul {
                display: flex;
                box-sizing: border-box;

                li {
                    width: 10%;
                    border: 1px solid #d7d7d7;
                    border-right: none;
                    border-top: none;
                }

                li:nth-last-child(1){
                    border-right: 1px solid #d7d7d7;
                }
            }
            #top-head {
                height: 40px;
                line-height: 40px;
                font-size: 12px;

                li{
                    border-top: 1px solid #d7d7d7;
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
            }
        }

        #center {

            .cen-top{
                margin: 14px 0 4px 0 ;
            }

            .cen-bot{
                height: 34px;
                line-height: 34px;
            }

            .cen-list{
                color: #666;
                height: 24px;
                line-height: 24px;
            }
        }

        #footer {
            width: 100%;
            position: absolute;
            bottom: 10px;
            // left: 20%;
        }
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


