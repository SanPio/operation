<template>
    <div>
        <!-- 占位 -->
        <div style="height:36px"></div>
        <div id="footer">
            <el-row>
                <el-col :span="12" :offset='5'> 
                    <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[15, 30, 50,100 ]"
                    :page-size="15"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Pageing',

        data() {
            return {
                pageNum: 1,
                pageSize: 15,
                currentPage: 1,// 分页
            
            }
        },

        props: {
            total: {
                type: Number,
                default: function () {
                    return 0               
                }
            }
            
        },

        methods: {
            // 当前页码
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.handlePage();
            },

            // 每页显示条数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.handlePage();
            },
            
            // 传值父组件
            handlePage(){
                this.$emit( 'pageChang',{
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize,
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #footer {
        width: 100%;
        position: absolute;
        bottom: 10px;
    }
</style>
