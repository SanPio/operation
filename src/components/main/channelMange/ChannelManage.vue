<template>
    <div id="box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%">

        <!-- 头部 -->
        <v-header :title='headerTitle' :btnType='btnType' :btnInfo='btnInfo' @exportData='addCHannel' ></v-header>

        <!-- 查询  -->
        <search :headTop='headTop' :headBot='headBot' @searchInfoChange='searchInfoChange'></search>

        <!-- 列表 -->
        <p class="list-top">
            清单明细
        </p>
        <ul class="list-tit clearfix">
            <li>
                <span>
                    序号
                </span>
            </li>
            <li>
                <span>
                    日期
                </span>
                <img :src="defaultSort" alt="" class="pointer">
            </li>
            <li>
                <span>
                    渠道名称
                </span>
            </li>
            <li>
                <span>
                    注册用户数
                </span>
                <img :src="defaultSort" alt="" class="pointer">
            </li>
            <li>
                <span>
                    跟单用户数
                </span>
                <img :src="defaultSort" alt="" class="pointer">
            </li>
             <li>
                <span>
                    绑定MT4用户数
                </span>
                <img :src="defaultSort" alt="" class="pointer">
            </li>
            <li>
                <span>
                    付费用户数
                </span>
                <img :src="defaultSort" alt="" class="pointer">
            </li>
             <li>
                <span>
                    续费用户数
                </span>
                <img :src="defaultSort" alt="" class="pointer">
            </li>
            <li>
                <span>
                    累计付费金额
                </span>
                <img :src="defaultSort" alt="" class="pointer">
            </li>
             <li>
                <span>
                    渠道链接
                </span>
                <img :src="defaultSort" alt="" class="pointer">
            </li>
            <li>
                <span>
                    操作
                </span>
            </li>
        </ul>

        <ul class="contant">
            <li class="info-list clearfix" v-for="(item, index) in info" :key="index" >
                <p> 
                    {{ index + 1 }}
                </p>
                <p> 
                    10/20
                </p>
                <p> 
                    名称
                </p>
                <p> 
                    1
                </p>
                <p> 
                    2
                </p>
                <p> 
                    3
                </p>
                <p> 
                    4
                </p>
                <p> 
                    5
                </p>
                <p> 
                    6
                </p>
                <p> 
                    www.github.com
                </p>
                <p class="operation"> 
                    <i class="el-icon-edit-outline pointer"  @click="openSet( index )"></i>
                    <i class="el-icon-delete pointer" @click="open( index )"></i>
                </p>
                
            </li>
        </ul>
        <!-- 分页 -->
        <pageing @pageChang='pageChang'   :total='total'></pageing>

        <!-- 新增渠道弹窗 -->
        <el-dialog title="新增渠道"
         :visible.sync="adddialogFormVisible"
         center 
         width="400px"
         height="300px">
        <el-form :model="addForm">
            <el-form-item label="名称：" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="链接：" :label-width="formLabelWidth" >
            <el-input v-model="addForm.link" style="width:200px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addFormCancel" style="margin-right:20px">取 消</el-button>
            <el-button type="primary" @click="addFormPreserver" style="margin-left:20px">保 存</el-button>
        </div>
        </el-dialog>

        <!-- 修改渠道弹窗 -->
        <el-dialog title="修改信息"
         :visible.sync="setdialogFormVisible"
         center 
         width="400px"
         height="300px">
        <el-form :model="setForm">
            <el-form-item label="记录ID ：" :label-width="formLabelWidth" style="text-align:left">
            <el-input v-model="setForm.recordID" style="width:200px; color:#000" class="el-inpdiv" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="渠道ID ：" :label-width="formLabelWidth" >
            <el-input v-model="setForm.channelID" style="width:200px" class="el-inpdiv" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="名称 ：" :label-width="formLabelWidth">
            <el-input v-model="setForm.name" style="width:200px" class="el-inpdiv" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="生成日期 :" :label-width="formLabelWidth">
            <el-input v-model="setForm.date" style="width:200px" class="el-inpdiv" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="链接 ：" :label-width="formLabelWidth" style="text-align:left">
            <el-input v-model="setForm.link" style="width:200px"></el-input>
            </el-form-item>
           
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="setFormCancel" style="margin-right:20px">取 消</el-button>
            <el-button type="primary" @click="setFormPreserver" style="margin-left:20px">保 存</el-button>
        </div>
        </el-dialog>
        
            
            
    </div>
</template>
<script>

import Header from "@/components/public/Header";
import Search from "@/components/main/channelMange/Search";
import Pageing from "@/components/public/Pageing";
export default {
    name: 'ChannelManage',

    data () {
        return {
            btnType: 'warning',
            btnInfo: '新增渠道',
            headerTitle: '渠道管理',
            loading: false,
            headTop: [ 
                '渠道名称',
                '起始日期',
                '截止日期',
                '注册用户数',
                '跟单用户数',
                '绑定MT4用户数',
                '付费用户数',
                '续费用户数',
                '累计购买会额',
                '操作'
            ],
            headBot: [ 20,30,40,50,60,70],
            channelName: '',
            starTime: '',    
            endTime: '',
            defaultSort: require('../../../assets/def_sort.png'),
            info: [ 'a','b','ac','c','d','e','ad','asd','asd','fasw'],
            total: 0,
            delChannelName: '' ,

            adddialogFormVisible: false,
            setdialogFormVisible: false,
            addForm: {
                name: '',
                link: '',
            },
            setForm: {
                name: '名称',
                link: 'www.baidu.com',
                date: '2012/12/12',
                recordID: '123',
                channelID: '456'
            },
            formLabelWidth: '80px'

        }
    },
    components: {
        'v-header': Header,
        Search,
        Pageing
    },

    methods: {
        addCHannel(){
            this.adddialogFormVisible = true;
        },

        // 搜素
        searchInfoChange ( params ) {
            this.loading = true;
            this.channelName = params.distributors;
            this.starTime = params.starTime;
            this.endTime = params.endTime;
            this.loading = params.loading;
            this.queryInfo();
        },

        // 分页
        pageChang( params ) {
            this.loading = true;
            this.pageNum = params.pageNum;
            this.pageSize = params.pageSize;
            this.queryInfo();
        },

        // 信息搜索
        queryInfo () {
            console.log('请求')
        },

        // 删除
        open ( ind ) {
            this.$confirm(`<p style="text-align:center;font-weight:bold;">您确定删除<span style="color:red">${this.info[ind]}</span>渠道商信息？</p><p style="text-align:center;font-size:12px;">为了您的数据安全，再次向您确认信息</p>`, '提示', {
                type: 'warning',
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            
        },
        // 修改
        openSet( ind ) {
            console.log(ind);
            this.setdialogFormVisible = true

        },
        // 取消新增表单
        addFormCancel () {
            this.adddialogFormVisible = false;
            this.addForm = {
                name: '',
                link: ''
            }; 
            this.$message({
                type: 'info',
                message: '已取消保存'
            });
        },

        // 保存新增表单
        addFormPreserver () {
            this.adddialogFormVisible = false;
            //掉接口执行保存
                // 保存成功执行
                // this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // });
                // 保存失败执行
                // this.$message.error('错了哦，保存失败请重试！');     
        },

        // 取消修改表单
        setFormCancel () {
            this.setdialogFormVisible = false;
            
            this.$message({
                type: 'info',
                message: '已取消保存'
            });
        },

        // 保存修改表单
        setFormPreserver () {
            this.setdialogFormVisible = false;
            //掉接口执行保存
                // 保存成功执行
                // this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // });
                // 保存失败执行
                // this.$message.error('错了哦，保存失败请重试！');     
        }
    },
}
</script>
<style lang="scss" scoped>
    #box {
        width: 100%;
        height:100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 14px;
        position: relative;
        min-height: 81vh;
        .list-top{
            text-align: left;
            margin-top: 20px;

        }

        .list-tit{
            margin-top: 10px;
            line-height: 20px;
            li {
                float: left;
                width: 9%;
                height: 30px;
                line-height: 30px;
                span{
                    vertical-align: middle;
                    color: #333;
                }
                img{
                    margin-left: 3px;
                    height: 16px;
                    vertical-align: middle;
                    
                }
            }
        }
        .info-list{
            color: #666;
            p {
                float: left;
                width: 9%;
                height: 24px;
                line-height: 24px;
            }
            .operation{
                i {
                    margin-right: 10%;
                    color: #307EFF;
                }
                i:nth-of-type(2){
                    margin-right: 0;
                }
            }
        }
        // .el-dialog{
        //     .el-dialog__header .el-dialog__title{
        //         color: #307EFF;
        //     }
            
        // }
        .el-dialog__title{
            color: #307EFF;
        }
        .el-inpdiv{
           .el-input__inner{
                border:none;
            }
        }
    }
</style>
