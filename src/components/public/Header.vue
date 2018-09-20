<template>
    <header> 
        <span>
            {{ title }}
        </span>
        <el-button type="success" plain @click="exportData">
            数据导出
        </el-button>
    </header>

</template>
<script>
export default {
    name: 'Header',
     props: {
        title: {
            type: String,
            default: '渠道详情',
        },

        
    },

    methods: {
        exportData(){
            this.$emit('exportData');
        }
    }
}
</script>
<style lang="scss" scoped>
    header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

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
</style>

