<template>
    <div id="box">
        <el-container>
            <el-aside>Aside</el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>
                    <div>

                    </div>
                </el-main>
            </el-container>
        </el-container>
       
        
    </div>
</template>
<script>
import Store from '@/store'
export default {
    name: 'Home',
    data(){
        return {
           
        }
    },
    computed: {
        msg(){
            return Store.state.count
        }
    },
    methods: {
        jia () {
            Store.commit('increment')
        },

        jian () {
            Store.commit('reduce')
        }
    }
}
</script>
<style lang="scss" scoped>   
    .el-header {
        background-color: #fff;
        color: #333;
        height: 8vh;
    }
    .el-aside {
        background-color: #11183f;
        color: #fff;
        width: 300px;

    }
    
    .el-main {
        background-color: #f2f2f2;
        height: 92vh;
        padding: 0 2%;
        div{
            width: 100%;
            height: 100%;
            background-color: red;
        }
    }
    
    
    
   
</style>


