<template>
    <div>
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
                        type="number"
                        prefix-icon="el-icon-search"
                        v-model="distributors">
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
                    return [0,0,0,0,0,0]                   
                }
            },
            headTop: {
                type: Array,
                
            },
        },

        data() {
            return {
                distributors: '',
                starTime: '',
                endTime: '',
            }
        },

        created () {
            Store.commit( 'initLocDate' )
            this.starTime = Store.state.initDate;
            this.endTime = Store.state.initDate;
        },
        
   

        methods: {
            // 开始日期
            starChoose ( val ) {
                this.starTime = val;
                let starDate = new Date( this.starTime );
                let endDate = new Date( this.endTime );

                if ( endDate < starDate && this.endTime ) {
                    // this.starTime = this.endTime;
                    // this.endTime = val;
                    this.endTime = this.starTime;
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
                    // this.endTime = this.starTime;
                    // this.starTime = val;
                    this.starTime = this.endTime;
                }else {
                     this.endTime = val;
                }
            },

            // 查询
            query () {
                this.$emit('searchInfoChange',{
                    'distributors': this.distributors,
                    'user': this.user,
                    'starTime': this.starTime,
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
                    width: 11%;
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
</style>
