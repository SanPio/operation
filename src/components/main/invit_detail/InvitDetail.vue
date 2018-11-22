<template>
    <div id="box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%">
       
       <!-- 头部 -->
        <v-header :title='headerTitle' :btnType='btnType' :btnInfo='btnInfo' @exportData='returnHis' ></v-header>

        <!-- 查询  -->
        <search :headTop='headTop' :headBot='headBot' @searchInfoChange='searchInfoChange'></search>

        <!-- 列表 -->
        <p class="list-top">
            清单明细
        </p>
        <ul class="list-tit clearfix">
            <li class="num">
                <span>
                    序号
                </span>
            </li>
            <li class="inviterName"> 
                <span>
                    引荐人
                </span>
            </li>
            <li class="registeredDate">
                <span>
                    注册时间
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow === 0" @click="bigToSmallSort">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow === 1" @click="toSort">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow === 2" @click="toSort">
            </li>
            <li class="wxNickName">
                <span>
                    用户昵称
                </span>
            </li>
            <li class="phone">
                <span>
                    绑定手机号码
                </span>
            </li>
             <li class="firstMoney">
                <span>
                    首冲金额
                </span>
            </li>
            <li class="renewalMoney">
                <span>
                    续费金额
                </span>
            </li>
             <li class="sumMoney">
                <span>
                    合计金额
                </span>
            </li>
            <li class="countFollowByTime">
                <span>
                    累计真实跟单数量（模拟）
                </span>
            </li>
             <li class="bindMT4">
                <span>
                    绑定MT4数量
                </span>
            </li>
        </ul>
        <ul class="contant">
            <li class="info-list clearfix" v-for="(item, index) in info" :key="index" >
                <p class="num"> 
                    {{ index + 1 }}
                </p>
                <p class="inviterName"> 
                    {{ item.inviterName | changeName  }}
                </p>
                <p class="registeredDate"> 
                    {{ item.registeredDate}}
                </p>
                <p class="wxNickName"> 
                    {{ item.wxNickName | changeName }}
                </p>
                <p class="phone"> 
                    {{ item.phone }}
                </p>
                <p class="firstMoney"> 
                    {{ item.firstMoney }}
                </p>
                <p class="renewalMoney"> 
                    {{ item.renewalMoney }}
                </p>
                <p class="sumMoney"> 
                    {{ item.sumMoney }}
                </p>
                <p class="countFollowByTime"> 
                    {{ item.countFollowByTime }}
                </p>
                <p class="bindMT4"> 
                    {{ item.bindMT4 }}
                </p>
            </li>
        </ul>
        
        <!-- 分页 -->
        <pageing @pageChang='pageChang'   :total='total'></pageing>


    </div>
</template>

<script>
import Header from "@/components/public/Header";
import Search from "@/components/main/invit_detail/Search";
import Pageing from "@/components/public/Pageing";
import Store from '@/store'
export default {

    name: 'InvitDetail',
    
    data () {
        return {
            loading: false,
            btnType: 'success',
            btnInfo: '返回',
            headerTitle: '邀请明细',
            defaultSort: require('../../../assets/def_sort.png'),
            bigToSmall: require('../../../assets/big_small.png'),
            smallToBig: require('../../../assets/small_big.png'),
            headTop:[
                '引荐人昵称搜索',
                '起始日期',
                '截止日期',
                '新增（绑定手机数量）',
                '累计真实跟单数（模拟）',
                '绑定MT4账号数量',
                '累计付费人数',
                '累计付费金额',
                '操作'
            ],
            headBot: [ '', '', '', '', '' ],
            sortImgShow: 0,   
            userId: 0,
            info: [ ],
            userName: '', 
            starTime: '', 
            endTime: '',
            pageNum: 1, 
            pageSize: 15,
            total: 15,
            type:'',
            queryWord:''
        }
    },
    
    components: {
        'v-header': Header,
        Search,
        Pageing
    },
    
    created () {
        this.userId = this.$route.query.userId;
        this.type = this.$route.query.type;
        this.queryWord = this.$route.query.queryWord;
        // console.log(this.userId)
        this.queryInfo( '', '', 1, 15, '', this.userId )
    },
    filters: {
        changeName( val ) {
            if ( val ){
                 if( val.length >12){
                    return val.substring(0, 12) + '...' 
                }else{
                    return val
                }
            }else{
                return ''
            }
           
        }
    },
    methods: {

        // 搜素
        searchInfoChange ( params ) {
            this.loading = true;
            this.userName = params.distributors;
            this.starTime = params.starTime;
            this.endTime = params.endTime;
            this.loading = params.loading;
            console.log(params)
            this.queryInfo(  this.starTime, this.endTime, this.pageNum, this.pageSize, this.userName );
        },

        // 分页
        pageChang( params ) {
            this.loading = true;
            this.pageNum = params.pageNum;
            this.pageSize = params.pageSize;
            this.queryInfo(  this.starTime, this.endTime, this.pageNum, this.pageSize, this.userName );
        },

        //数据请求
        queryInfo (  starTime, endTime, pageNum, pageSize, userName, userId  ) {
            
            let postData = this.$qs.stringify({
                    startTime: starTime,
                    endTime: endTime,
                    inviterName: userName, 
                    inviterId: userId,
                    pageNum: pageNum,
                    pageSize: pageSize
                });
                console.log(postData)
                this.$http({
                    method: 'post',
                    url: this.$path +'web/emp/inviterData',
                    data:postData
                }).then( res => {

                    console.log( res )
                    this.loading = false;
                    this.sortImgShow = 0;
                    this.headBot = [ ];
                    // 汇总表
                    let data = res.data.data.data
                        // 头部列表
                        if( data.countPhoneByTime ){// 新增绑定数量
                            this.headBot.push( data.countPhoneByTime ); 
                        }else{
                            this.headBot.push( 0 );
                        }
                        if( data.countFollowByTime ){// 累计跟单
                            this.headBot.push( data.countFollowByTime ); 
                        }else{
                            this.headBot.push( '0(0)' );
                        }
                        if( data.countMT4ByTime ){// MT4
                            this.headBot.push( data.countMT4ByTime ); 
                        }else{
                            this.headBot.push( 0 );
                        }
                        if( data.countPaySuccess ){// 累计付费人数
                            this.headBot.push( data.countPaySuccess ); 
                        }else{
                            this.headBot.push( 0 );
                        }
                        if( data.selectSumPaySuccessMoney ){// 累计付费金额
                            this.headBot.push( data.selectSumPaySuccessMoney ); 
                        }else{
                            this.headBot.push( 0 );
                        }
                       
                        // 数据总数
                        this.total = data.total;
                        
                        // 列表内容
                        this.info = data.inviterList;
                    
                }).catch( req => {
                    console.log( req )
                })
        },

        // 返回到用户信息
        returnHis ( ) {
            this.$router.push({
                path: '/user_info',
                query:{//通过query 传递参数
                    type: this.type, //需要传递的参数,
                    queryWord: this.queryWord
                }
            });
        },

        // 默认反向排序
        bigToSmallSort ( ) {

            this.sortImgShow = 1;
            this.toSort();
        },  

        // 逆向排序
        toSort ( ind, key ) {
            if ( this.sortImgShow === 1) {

                this.sortImgShow = 2
                 this.isDate(1);

            }else if ( this.sortImgShow === 2 ) {
                
                this.sortImgShow = 1
                this.isDate(2);
  
            }
        },

        // 日期排序
        isDate(val){
            let newArr = [];
            for( let i = 0; i < this.info.length; i ++){
  
                let obj ={
                    "bindMT4": this.info[i].bindMT4,
					"countFollowByTime": this.info[i].countFollowByTime,
					"firstMoney": this.info[i].firstMoney,
					"invitationCode": this.info[i].invitationCode,
					"inviterName": this.info[i].inviterName,
					"phone": this.info[i].phone,
					"registeredDate": new Date(this.info[i].registeredDate),
					"renewalMoney": this.info[i].renewalMoney,
					"sumDocumentary": this.info[i].sumDocumentary,
					"sumMoney": this.info[i].sumMoney,
					"wxNickName": this.info[i].wxNickName
                    
                }
                newArr.push( obj );
            }
            if( val === 1){
                newArr = this.ZtoAsort(newArr, 'registeredDate');
            }else{
                newArr = this.AtoZsort(newArr, 'registeredDate');
            }

            for (let i = 0; i < newArr.length; i++ ) {
                let obj = {
                    "bindMT4": newArr[i].bindMT4,
					"countFollowByTime": newArr[i].countFollowByTime,
					"firstMoney": newArr[i].firstMoney,
					"invitationCode": newArr[i].invitationCode,
					"inviterName": newArr[i].inviterName,
					"phone": newArr[i].phone,
					"registeredDate": newArr[i].registeredDate.getFullYear() + '-' +(newArr[i].registeredDate.getMonth() > 8 ? newArr[i].registeredDate.getMonth()+1 : '0' +(newArr[i].registeredDate.getMonth()+1) ) + '-' +(newArr[i].registeredDate.getDate() > 9 ? newArr[i].registeredDate.getDate() : '0' + newArr[i].registeredDate.getDate()),
					"renewalMoney": newArr[i].renewalMoney,
					"sumDocumentary": newArr[i].sumDocumentary,
					"sumMoney": newArr[i].sumMoney,
					"wxNickName": newArr[i].wxNickName
                }
                this.info.push(obj);
            } 
        },

        // 正向排序
        AtoZsort( arr, key ) {

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
        
    }
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
        min-height: 82vh;
       
        .list-top{
            text-align: left;
            margin-top: 20px;
        }

        .list-tit{
            margin-top: 10px;
            line-height: 20px;
            li {
                float: left;
              
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
        .num{
            width: 5%;
        } 
        .inviterName{
            width: 10%;
        }
        .registeredDate{
            width: 10%;
        }
        .wxNickName{
            width: 10%;
        }
        .phone{
            width: 10%;
        }
        .firstMoney{
            width: 10%;
        }
        .renewalMoney{
            width: 10%;
        }
         .sumMoney{
            width: 10%;
        }
        .countFollowByTime{
            width: 15%;
        }
        .bindMT4{
            width: 10%;
        }
    }
</style>


