<template>
    <div>
        <div id="top">
            <ul id="top-head">
                <!-- <li v-for="item in headTop" :key="item" >
                    {{ item }}
                </li> -->
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
                <li v-for="(item, index) in headBot" :key="index" class="top-bot-num">
                    {{ item }}
                </li>
                <li>
                    <el-button type="primary" plain @click="query">
                        查询
                    </el-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

    import Store from '@/store'

    export default {
        name: 'Search',

        props: {
            headBot: {
                type: Array,
                default: function () {
                    return [0,0,0,0,0]                   
                }
            },
            headTop: {
                type: Array,
                
            },
        },

        data() {
            return {
                startTime: '',
                endTime: '',
            }
        },

        created () {
            Store.commit( 'initLocDate' )
            this.startTime = Store.state.initDate;
            this.endTime = Store.state.initDate;
        },
        
   

        methods: {
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

            // 查询
            query () {
                this.$emit('searchInfoChange',{
                    'user': this.user,
                    'startTime': this.startTime,
                    'endTime': this.endTime,
                    'loading': true
                })

            }
        }

    }
</script>
<style lang="scss" scoped>
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
                    span{
                        font-size: 20px;
                        color: #333333;
                        font-weight: bold;
                        line-height: 50px;
                    }
                }
            }
        }
</style>
