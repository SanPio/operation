<template>
    <div>
        <div id="top">

            <ul id="top-bot">
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
                <li><P>—</P></li>
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
                <li>
                    <el-input
                        placeholder="请输入信号源名称"
                        prefix-icon="el-icon-search"
                        v-model="distributors">
                    </el-input> 
                </li>
                <li style="margin-left: 10px;">
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
        data() {
            return {
                starTime: '',
                endTime: '',
                distributors:''
                
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
                this.$router.push({
                    query:{
                        starTime : this.starTime
                    }
                })
               
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
                    'loading': true,
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
                margin-left: 10px;
                .top-bot-num {
                    line-height: 50px;
                    font-weight: bold;
                }

                .el-input{
                    width: 100%;
                    height: 30px;
                    font-size: 12px;
                    margin-top: 10px;
                } 

                .el-input__prefix{
                    top:-10px;
                }

                .el-button {
                    width: 100%;
                    height: 28px;
                    line-height: 5px;
                    margin-top: 10px;
                }
                p{
                    margin-top: 16px;
                }
            }
            .block{
                width: 130px;
                padding: 0 10px 0 10px;
            }
        }
</style>