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
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[0] === 0" @click="bigToSmallSort( 0, 'day' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[0] === 1" @click="toSort( 0, 'day' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[0] === 2" @click="toSort( 0, 'day' )">
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
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[1] === 0" @click="bigToSmallSort( 1, 'numberOfRegisteredUsers' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[1] === 1" @click="toSort( 1, 'numberOfRegisteredUsers' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[1] === 2" @click="toSort( 1, 'numberOfRegisteredUsers' )">
            </li>
            <li>
                <span>
                    跟单用户数
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[2] === 0" @click="bigToSmallSort( 2, 'documentaryUserNumber' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[2] === 1" @click="toSort( 2, 'documentaryUserNumber' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[2] === 2" @click="toSort( 2, 'documentaryUserNumber' )">
            </li>
             <li>
                <span>
                    绑定MT4用户数
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[3] === 0" @click="bigToSmallSort( 3, 'numberOfBindOfMT4' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[3] === 1" @click="toSort( 3, 'numberOfBindOfMT4' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[3] === 2" @click="toSort( 3, 'numberOfBindOfMT4' )">
            </li>
            <li>
                <span>
                    付费用户数
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[4] === 0" @click="bigToSmallSort( 4, 'renewalUserNumber' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[4] === 1" @click="toSort( 4, 'renewalUserNumber' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[4] === 2" @click="toSort( 4, 'renewalUserNumber' )">
            </li>
             <li>
                <span>
                    续费用户数
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[5] === 0" @click="bigToSmallSort( 5, 'accumulatedPaymentAmount' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[5] === 1" @click="toSort( 5, 'accumulatedPaymentAmount' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[5] === 2" @click="toSort( 5, 'accumulatedPaymentAmount' )">
            </li>
            <li>
                <span>
                    累计付费金额
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[6] === 0" @click="bigToSmallSort( 6, 'numberOfPaidUsers' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[6] === 1" @click="toSort( 6, 'numberOfPaidUsers' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[6] === 2" @click="toSort( 6, 'numberOfPaidUsers' )">
            </li>
             <li>
                <span>
                    渠道链接
                </span>
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
                    {{ item.day }}
                </p>
                <p> 
                    {{ item.channelName}}
                </p>
                <p> 
                    {{ item.numberOfRegisteredUsers }}
                </p>
                <p> 
                    {{ item.documentaryUserNumber }}
                </p>
                <p> 
                    {{ item.numberOfBindOfMT4 }}
                </p>
                <p> 
                    {{ item.renewalUserNumber }}
                </p>
                <p> 
                    {{ item.accumulatedPaymentAmount }}
                </p>
                <p> 
                    {{ item.numberOfPaidUsers }}
                </p>
                <p> 
                    {{ item.invitUrl }}
                </p>
                <p class="operation"> 
                    <i class="el-icon-edit-outline pointer"  @click="openSet( index )"></i>
                    <i class="el-icon-delete pointer" @click="openDel( index )"></i>
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
            <el-input v-model="myTime" style="width:200px" class="el-inpdiv" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="链接 ：" :label-width="formLabelWidth" style="text-align:left">
            <el-input v-model="setFormLink" style="width:200px"></el-input>
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

import Store from '@/store'
import Header from "@/components/public/Header";
import Search from "@/components/main/channelMange/Search";
import Pageing from "@/components/public/Pageing";
export default {
    name: 'ChannelManage',

    data () {
        return {
            userId: '',
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
            headBot: [ 0, 0, 0, 0, 0, 0 ],
            channelName: '',
            starTime: '',    
            endTime: '',
            defaultSort: require('../../../assets/def_sort.png'),
            bigToSmall: require('../../../assets/big_small.png'),
            smallToBig: require('../../../assets/small_big.png'),
            sortImgShow: [ 0, 0, 0, 0, 0, 0, 0 ],   
            info: [ ],
            total: 0,
            delChannelName: '',
            adddialogFormVisible: false,
            setdialogFormVisible: false,
            addForm: {
                name: '',
                link: '',
            },
            setForm: { },
            setFormLink: 'wwddddd',
            formLabelWidth: '80px',
            pageNum: 1,
            pageSize: 15


        }
    },
    components: {
        'v-header': Header,
        Search,
        Pageing
    },
    computed: {
        //获取本地时间
        myTime () {
            return Store.state.initDate;
        }
    },
    created () {
        
        this.userId = sessionStorage.uesrId;
        this.queryInfo( this.channelName, this.starTime, this.endTime, this.pageNum, this.pageSize );

    },
    methods: {

        // 搜素
        searchInfoChange ( params ) {
            this.loading = true;
            this.channelName = params.distributors;
            this.starTime = params.starTime;
            this.endTime = params.endTime;
            this.loading = params.loading;
            this.sortImgShow = [ 0, 0, 0, 0, 0, 0, 0 ];
            this.queryInfo( this.channelName, this.starTime, this.endTime, this.pageNum, this.pageSize );
        },

        // 分页
        pageChang( params ) {
            this.loading = true;
            this.pageNum = params.pageNum;
            this.pageSize = params.pageSize;
            this.queryInfo( this.channelName, this.starTime, this.endTime, this.pageNum, this.pageSize );
        },

        // 信息搜索
        queryInfo ( channelName, startTime, endTime, pageNum, pageSize) {
            this.info = [];
            let postData = this.$qs.stringify({
                channelName: channelName,
                startTime: startTime,
                startTime: this.starTime, 
                endTime: endTime,
                pageNum: pageNum,
                pageSize: pageSize
            });
            this.$http({
                method: 'post',
                url: this.$path +'web/emp/channelManagement',
                data:postData
            }).then( res => {
                
                console.log( res.data.data.data)
                //  结束loading图
                this.loading = false;
                let data = res.data.data.data;
                
                //  顶部汇总条
                this.headBot = [     
                    data.sumNumberOfRegisteredUsers,
                    data.sumDocumentaryUserNumber,
                    data.sumNumberOfBindOfMT4,
                    data.sumRenewalUserNumber,
                    data.sumAccumulatedPaymentAmount,
                    data.sumNumberOfPaidUsers.toFixed(2)
                ];
                
                //  总条数
                this.total = data.total;

                //  明细列表
                this.info = data.channelManagementDetails;

                
            }).catch( req => {
                console.log( req )
            })
        },

        // 新增渠道
        addCHannel(){
            this.adddialogFormVisible = true;
        },

        // 保存新增表单
        addFormPreserver () {
            this.adddialogFormVisible = false;
            console.log(this.addForm)

            let postData = this.$qs.stringify({
                userId: this.userId,
                invitUrl: this.addForm.link,
                channelName: this.addForm.name
            });

            this.$http({
                method: 'post',
                url: this.$path +'web/emp/addChannel',
                data:postData
            }).then( res => {
                console.log(res)
                if( res.data.data.str === "添加成功" ){

                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    this.addForm = {
                        name: '',
                        link: ''
                    }; 
                
                }else{

                    this.$message.error(`错了哦，${res.data.data.str}。  请重试！`);   
  
                }
            }).catch( req => {

                console.log( req );

            })
   
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

        

        // 修改
        openSet( ind ) {

            this.setForm = {
                name: this.info[ind].channelName,
                recordID: this.info[ind].id,
                channelID: this.info[ind].channelId,
            };
            this.setFormLink = this.info[ind].invitUrl;
            this.setdialogFormVisible = true

        },

         // 保存修改表单
        setFormPreserver () {

            this.setdialogFormVisible = false;

            let postData = this.$qs.stringify({
                userId: this.userId,
                invitUrl: this.setFormLink,
                channelName: this.setForm.name
            });

            this.$http({
                method: 'post',
                url: this.$path +'web/emp/modifyChannelLinks',
                data:postData
            }).then( res => {
                if( res.data.data.str === '修改成功' ){
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    this.queryInfo( this.channelName, this.starTime, this.endTime, this.pageNum, this.pageSize );
                }else{
                    this.$message.error(`错了哦，${res.data.data.str}。  请重试！`);    
                }
            }).catch( req => {
                console.log( req )
            })

        },

        // 取消修改表单
        setFormCancel () {
            this.setdialogFormVisible = false;
            
            this.$message({
                type: 'info',
                message: '已取消保存'
            });
        },


        //删除  // 此功能暂不开放
        // openDel ( ind ) {
        //     this.$confirm(`<p style="text-align:center;font-weight:bold;">您确定删除<span style="color:red"> ${this.info[ind].channelName} </span>渠道商信息？</p><p style="text-align:center;font-size:12px;">为了您的数据安全，再次向您确认信息</p>`, '提示', {
        //         type: 'warning',
        //         dangerouslyUseHTMLString: true,
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         center: true
        //     }).then(() => {

        //         let postData = this.$qs.stringify({
        //             id: this.info[ind].id
        //         });
        //         // console.log(postData)

        //         this.$http({
        //             method: 'post',
        //             url: this.$path +'web/emp/deleteChannelRecords',
        //             data:postData
        //         }).then( res => {
        //             console.log(res)
        //             if( res.data.data.str === "删除成功" ){
        //                 this.$message({
        //                     type: 'success',
        //                     message: '删除成功!'
        //                 });
        //                 this.queryInfo( this.channelName, this.starTime, this.endTime, this.pageNum, this.pageSize );
        //             }else{
        //                 this.$message.error(`错了哦，${res.data.data.str}。  请重试！`);    
        //             }
        //         }).catch( req => {
        //             console.log( req )
        //         })

        //     }).catch(() => {
        //         this.$message({
        //             type: 'info',
        //             message: '已取消删除'
        //         });
        //     });
            
        // },

        // 删除 
        openDel( ind ) {
            this.$alert('您暂无此权限，请联系管理员！', '提示', {
                type: 'warning',
                confirmButtonText: '确定',
                center: true
            })   
        },

        // 默认反向排序
        bigToSmallSort ( ind, key) {

            this.sortImgShow = [ 0, 0, 0, 0, 0, 0, 0 ];
            this.$set( this.sortImgShow, ind, 1 );
            this.toSort(ind,key);
        },  

        // 逆向排序
        toSort ( ind, key ) {
            if ( this.sortImgShow[ ind ] === 1) {

                this.sortImgShow = [ 0, 0, 0, 0, 0, 0, 0 ];
                this.$set( this.sortImgShow, ind, 2);
                
                if( key == "day" ){
                    
                    this.isDate(key,1);
                
                }else{
                    this.info = this.ZtoAsort(this.info, key);
                }
            
            }else if ( this.sortImgShow[ ind ] === 2 ) {
                
                this.sortImgShow = [ 0, 0, 0, 0, 0, 0, 0 ];
                this.$set( this.sortImgShow, ind, 1 );

                // this.info = this.ZtoAsort(this.info, key);  
                if( key == "day" ){
                    this.isDate(key,2);
                    
                }else{
                    this.info = this.AtoZsort(this.info, key);
                }          
                
            }
        },

        // 日期排序
        isDate(key,val){
            let newArr = [];
            for( let i = 0; i < this.info.length; i ++){
  
                let obj ={
                    accumulatedPaymentAmount: this.info[i].accumulatedPaymentAmount,
                    channelName: this.info[i].channelName,
                    channelId: this.info[i].channelId,
                    day: new Date(this.info[i].day),
                    documentaryUserNumber: this.info[i].documentaryUserNumber,
                    id: this.info[i].id,
                    invitUrl: this.info[i].invitUrl,
                    numberOfBindOfMT4: this.info[i].numberOfBindOfMT4,
                    numberOfPaidUsers: this.info[i].numberOfPaidUsers,
                    numberOfRegisteredUsers: this.info[i].numberOfRegisteredUsers,
                    renewalUserNumber: this.info[i].renewalUserNumber,
                }
                newArr.push( obj );
            }
            if( val === 1){
                newArr = this.ZtoAsort(newArr, key);
            }else{
                newArr = this.AtoZsort(newArr, key);
            }

            for (let i = 0; i < newArr.length; i++ ) {
                let obj = {
                    accumulatedPaymentAmount: newArr[i].accumulatedPaymentAmount,
                    channelName: newArr[i].channelName,
                    channelId: newArr[i].channelId,
                    day: newArr[i].day.getFullYear() + '-' +(newArr[i].day.getMonth() > 8 ? newArr[i].day.getMonth()+1 : '0' +(newArr[i].day.getMonth()+1) ) + '-' +(newArr[i].day.getDate() > 9 ? newArr[i].day.getDate() : '0' + newArr[i].day.getDate()),
                    documentaryUserNumber: newArr[i].documentaryUserNumber,
                    id: newArr[i].id,
                    invitUrl: newArr[i].invitUrl,
                    numberOfBindOfMT4: newArr[i].numberOfBindOfMT4,
                    numberOfPaidUsers: newArr[i].numberOfPaidUsers,
                    numberOfRegisteredUsers: newArr[i].numberOfRegisteredUsers,
                    renewalUserNumber: newArr[i].renewalUserNumber,
                }
                this.info.push(obj);
            } 
        },

        // 正向排序
        AtoZsort( arr, key ) {
            // console.log(arr[key]);
            
            for(var i = 0; i < arr.length-1; i++ ) {
                for(var j = 0; j < arr.length - i -1 ; j ++){
                    
                    if ( arr[j][key] > arr[j+1][key] ){
                        let swap = arr[j];
                        arr[j] = arr[j +1]
                        arr[j +1] = swap
                    }  
                }
            }
    
            this.info = []
            return arr
        },

        // 反向排序
        ZtoAsort( arr,key ) {
            for(var i = 0; i < arr.length-1; i++ ) {
                for(var j = 0; j < arr.length - i -1 ; j ++){
                    
                    if ( arr[j][key] < arr[j+1][key] ){
                        let swap = arr[j];
                        arr[j] = arr[j +1]
                        arr[j +1] = swap
                    }  
                }
            }
            console.log(arr)
                this.info = []
            return arr
        },

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
