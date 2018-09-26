<template>
    <div id="center"
   
    style="width: 100%">
        <el-row class="cen-top">
            <el-col :span="1" >
                <span style="line-height:30px">
                    {{ listTitle }}  
                </span>  
            </el-col>
        </el-row>
        <el-row class="cen-bot">
            <el-col :span="1" :offset='1'>
                序号
            </el-col>
            <el-col :span="21">
                <el-row>
                    <el-col :span="3" v-for="item in listTop" :key="item">
                        {{ item }}
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="cen-list" v-for="(item, index) in listBot" :key="index">
            <el-col :span="1" :offset='1'>
                {{ index + 1 }}
            </el-col>
            <el-col :span="21">
                <el-row>
                    <el-col :span="3" v-for="(itemKey,ind) in item" :key="ind">
                        {{ itemKey }}
                    </el-col> 
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {

        name: 'NineList',
       
        props: {
            listTitle: {
                type: String,
                default: '清单明细',
            },

            listTop: {
                type: Array,
            },

            listBot: {
                type: Array,   
            }
        } 
    }
</script>
<style lang="scss" scoped>
    #center {
        min-height: 380px;

        .cen-top{
            margin-top: 8px;
        }

        .cen-bot{
            height: 28px;
            line-height: 28px;
        }

        .cen-list{
            color: #666;
            height: 24px;
            line-height: 24px;
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


