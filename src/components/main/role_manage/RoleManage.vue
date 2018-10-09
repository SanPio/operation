<template>
    <div id="box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%">
        <header class="clearfix">
            <el-input
                placeholder="请输入名称"
                prefix-icon="el-icon-search"
                v-model="name"
                class="left">
            </el-input>
            <el-button type="primary" class="left" @click="search">查询</el-button>
            <el-button type="warning" class="left">新增角色</el-button>
        </header>
        <div class="info">
            <div class="title clearfix">
                <p class="left" v-for="item in title" :key="item">
                    {{item}}
                </p>
            </div>
            <ul>
                <li v-for="(item, index) in listInfo" :key="index" class="clearfix">
                    <p class="left">
                       {{ index + 1 }}
                    </p>
                    <P class="left">
                        {{ item.name }}
                    </P>
                    <p class="left">
                        {{ item.operator }}
                    </p>
                    <p class="left operation ">
                        <i class="el-icon-view" @click="see(index)"></i>
                        <i class="el-icon-edit-outline" @click="modify(index)"></i>
                        <i class="el-icon-delete" @click="del(index)"></i>
                    </p>
                </li>
            </ul>
        </div>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="20%"
        center>
       
        <span>您确定删除此用户？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="delThisList">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 分页 -->
        <pageing @pageChang='pageChang'   :total='total'></pageing>
    </div>
</template>
<script>

import Pageing from "@/components/public/Pageing";

export default {
    name: 'RoleManage',
    
    data () {
        return {
            pageNum: 1, 
            pageSize: 15,
            total: 0,  
            loading: false, 
            name: '',
            dialogVisible: false,
            delThisListInd:'',
            title: [
                '序号',
                '名称',
                '操作员',
                '操作'
            ],
            listInfo: [
                {
                    name: '超级管理员',
                    operator: '张三'
                },
                {
                    name: '超级管理员',
                    operator: '张三'
                },
                {
                    name: '超级管理员',
                    operator: '张三'
                },
                {
                    name: '超级管理员',
                    operator: '张三'
                },
                {
                    name: '超级管理员',
                    operator: '张三'
                } ,
                {
                    name: '超级管理员',
                    operator: '张三'
                },
               
            ]
        }
    },

    components:{
        Pageing
    },
    
    methods: {
        // 查看
        see ( ind ) {
            alert(ind)
        },

        //修改
        modify ( ind ) {
            alert( ind )
        },
         
        // 删除
        del ( ind ) {
            this.dialogVisible = true;
            this.delThisListInd = ind
        },

        //删除操作
        delThisList(){
            this.dialogVisible = false;
            console.log(this.delThisListInd)
        },
        // 搜索
        search ( ) {
            alert(this.name)
            this.loading = true;
        },

        

        // 分页
        pageChang( params ) {
            this.loading = true;
            this.pageNum = params.pageNum;
            this.pageSize = params.pageSize;
            // this.queryInfo();
        },
    }
}
</script>
<style lang="scss" scoped>
    #box {
        padding: 10px;
        font-size: 12px;
        position: relative;
        min-height: 79vh;
        header {
            .el-input{
                width: 200px;
                height: 30px;
                margin-right: 10px;
            }
            .el-button {
                padding: 0 12px;
                height: 28px;
            }
        }
        
        .info {
            margin-top: 20px;
            color: #666;
            .title {
                p {
                    width: 25%;
                    height: 30px;
                    line-height: 30px;
                    color: #333;   
                }
                
            }
            ul {
                li {
                    line-height: 28px;
                    line-height: 28px;

                    p{
                        width: 25%;
                    }
                    .operation{
                        i{
                            margin-right: 5%;
                            color: #4fa2fe;
                            font-size: 16px;
                        }
                        .el-icon-delete{
                            margin-right: 0;
                        }
                    }
                }
            }
        }

    }

</style>



