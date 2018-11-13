<template>
    <div id="box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%">

        <div class="header clearfix">
            <p class="left">
                <span class="uesr-name">
                    {{ nickName }}
                </span>
                <span>
                    的跟单配置记录
                </span>
            </p>
            <p class="right">
                <el-button type="success" plain @click="toUserInfo">
                    返回
                </el-button>
            </p>  
        </div>
        <p style="text-align:left;margin-top:10px;font-size:13px">
            筛选
        </p>
        <div class="clearfix" id="hahha">

                <div class="block left">
                            
                    <el-date-picker
                    v-model="starTime"
                    type="date"
                    @change="starChoose"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="left" style="line-height:46px">
                    一
                </div>
                <div class="block left">
                
                    <el-date-picker
                    v-model="endTime"
                    type="date"
                    @change="endChoose"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>
                    
               
        </div>
        




        
            <!-- 标题 -->
        <ul class="title clearfix">
            <li class="num left">
                <span>
                    序号
                </span>
            </li>
            <li class="date left">
                <span>
                    时间
                </span>
                
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[0] === 0" @click="bigToSmallSort( 0, 'date' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[0] === 1" @click="toSort( 0, 'date' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[0] === 2" @click="toSort( 0, 'date' )">
            </li>
            <li class="oper-type left">
                <span>
                    操作类别
                </span>
            </li>
            <li class="name left">
                <span>
                    信号源名称
                </span>
            </li>
            <li class="follow-type left">
                <span>
                    跟随方式
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[1] === 0" @click="bigToSmallSort( 1, 'date' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[1] === 1" @click="toSort( 1, 'date' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[1] === 2" @click="toSort( 1, 'date' )">
            </li>
            <li class="follow-switch left">
                <span>
                    跟随开关
                </span>
            </li>
            <li class="reverse-switch left">
                <span>
                    反向开关
                </span>
            </li>
            <li class="target-profit left">
                <span>
                    止盈
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[2] === 0" @click="bigToSmallSort( 2, 'date' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[2] === 1" @click="toSort( 2, 'date' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[2] === 2" @click="toSort( 2, 'date' )">
            </li>
            <li class="stop-loss left">
                <span>
                    止损
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[3] === 0" @click="bigToSmallSort( 3, 'date' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[3] === 1" @click="toSort( 3, 'date' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[3] === 2" @click="toSort( 3, 'date' )">
            </li>
            <li class="min-hands left">
                <span>
                    最小手数
                </span>
            </li>
            <li class="accuracy left">
                <span>
                    尾数精度
                </span>
            </li>
            <li class="operator left">
                <span>
                    操作人
                </span>
            </li>
            <li class="reason left">
                <span>
                    原因
                </span>
            </li>
        </ul>

            <!-- 列表 -->
        <ul class="contant">
            <li class="info-list clearfix" v-for="(item, index) in info" :key="index">
                <p class="num left">
                    {{ index + 1 }}
                </p>
                <p class="date left">
                    2018/08/08&nbsp;08:08
                </p>
                <p class="oper-type left">
                    取消跟随
                </p>
                <p class="name left">
                    小铭跟单001
                </p>
                <p class="follow-type left">
                    <span v-if="false">
                        0.5倍比例跟随  
                    </span>
                    <span>
                         固定0.5标准手  
                    </span>
                </p>
                <p class="follow-switch left">
                    开
                </p>
                <p class="reverse-switch left">
                    关
                </p>
                <p class="target-profit left">
                    500
                </p>
                <p class="stop-loss left">
                    400
                </p>
                <p class="min-hands left">
                    0.01标准手
                </p>
                <p class="accuracy left">
                    舍弃尾数
                </p>
                <p class="operator left">
                    原因
                </p>
                <p class="reason left">
                    VIP到期
                </p>
            </li>
        </ul> 

            <!-- 分页 -->
        <pageing @pageChang='pageChang'   :total='total'></pageing>

    </div>
</template>
<script>
import Pageing from "@/components/public/Pageing";
export default {

    name: 'Collocation',

    data() {
        return {
            defaultSort: require('../../../assets/def_sort.png'),
            bigToSmall: require('../../../assets/big_small.png'),
            smallToBig: require('../../../assets/small_big.png'),
            loading: false,
            nickName: '',
            sortImgShow: [ 0, 0, 0, 0 ],
            total: 15,
            userId: '', 
            pageNum: '', 
            pageSize: '',
            info: [  1, 2, 3, 5,  ],
            starTime: '',
            endTime: '',
        }
    },

    components: {
        Pageing
    },

    created () {
        this.userId = this.$route.query.userId;
        this.nickName = this.$route.query.userName;
        this.query( this.userId, 1, 15 )
    },

    methods: {

        // 返回到用户信息
        toUserInfo ( ) {
            this.$router.push({
                path: '/user_info',
            });
        },

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

        // 分页
        pageChang( params ) {
            this.loading = true;
            this.pageNum = params.pageNum;
            this.pageSize = params.pageSize;
            this.query( this.userId, this.pageNum, this.pageSize )
        },

        // 数据请求
        query( userId, pageNum, pageSize ) {
            // let postData = this.$qs.stringify({
            //     userId: userId,
            //     pageNum: pageNum,
            //     pageSize: pageSize
            // });

            // this.$http({

            //     method: 'post',
            //     url: this.$path +'web/emp/vipData',
            //     data:postData

            // }).then( res => {

            //     this.loading = false;
            //     console.log( res )

            // }).catch( req => {
            //     console.log( req )
            // })    
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
                    
                    if( key == "date" || key == "registeredDate" ){
                       
                        this.isDate(key,1);
                    
                    }else{
                        this.info = this.ZtoAsort(this.info, key);
                    }
                
                }else if ( this.sortImgShow[ ind ] === 2 ) {
                    
                    this.sortImgShow = [ 0, 0, 0, 0, 0, 0, 0 ];
                    this.$set( this.sortImgShow, ind, 1 );

                    // this.info = this.ZtoAsort(this.info, key);  
                    if( key == "date" || key == "registeredDate" ){
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
                        bindMT4: this.info[i].bindMT4,
                        channelName: this.info[i].channelName,
                        date: new Date(this.info[i].date),
                        inviterUser: this.info[i].inviterUser,
                        phone: this.info[i].phone,
                        registeredDate: new Date(this.info[i].registeredDate),
                        simulationDocumentary: this.info[i].simulationDocumentary,
                        sumMoney: this.info[i].sumMoney,
                        userId: this.info[i].userId,
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
                        bindMT4: newArr[i].bindMT4,
                        channelName: newArr[i].channelName,
                        date: newArr[i].date.getFullYear() + '-' +(newArr[i].date.getMonth() > 8 ?  newArr[i].date.getMonth()+1 : '0' + (newArr[i].date.getMonth()+1) )+ '-' + (newArr[i].date.getDate() > 9 ?newArr[i].date.getDate() : '0' + newArr[i].date.getDate() ),
                        inviterUser: newArr[i].inviterUser,
                        phone: newArr[i].phone,
                        registeredDate: newArr[i].registeredDate.getFullYear() + '-' +( newArr[i].registeredDate.getMonth() > 8 ? newArr[i].registeredDate.getMonth()+1 : '0' + (newArr[i].registeredDate.getMonth()+1) ) + '-' + ( newArr[i].registeredDate.getDate() > 9 ? newArr[i].registeredDate.getDate() : '0'+ newArr[i].registeredDate.getDate() ),
                        simulationDocumentary: newArr[i].simulationDocumentary,
                        sumMoney: newArr[i].sumMoney,
                        userId: newArr[i].userId,
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
                // this.arr = [];
                // this.arr = newarr
                // console.log(this.arr)
                console.log(arr)
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
        .header{
            span{
                font-size: 15px;
                font-weight: bold;
            }
            .uesr-name{
                color: #307eff;
            }
            .el-button { 
                font-size: 12px;
                padding: 8px 0;
                width: 80px;
            }
        }
        .block{
            width: 140px;
            height: 50px;
            .el-input{
                    width: 90%;
                    height: 30px;
                    font-size: 12px;
                    margin-top: 10px;
                } 

                .el-input__prefix{
                    top:-10px;
                }

        }
        // #top-bot {
        //         height: 50px;
        //         .top-bot-num {
        //             line-height: 50px;
        //             font-weight: bold;
        //         }

        //         .el-input{
        //             width: 90%;
        //             height: 30px;
        //             font-size: 12px;
        //             margin-top: 10px;
        //         } 

        //         .el-input__prefix{
        //             top:-10px;
        //         }
        //     }
        .title{
            
            margin-top: 14px;
            span{
                vertical-align: middle;
                
            }
            img{
                margin-left: 3px;
                height: 16px;
                vertical-align: middle;
                
            }
        }
        .contant{
            margin-top: 12px;
            font-size: 12px;
            color: #666;
            li{
                p{
                    height: 32px;
                    line-height: 32px;
                }
            }
        }
        .num {
            width: 4%;
        }
        .date {
            width: 10%;
        }
        .oper-type {
            width: 8%;
        }
        .name {
            width: 8%;
        }
        .follow-type {
            width: 8%;
        }
        .follow-switch {
            width: 8%;
        }
        .reverse-switch {
            width: 8%;
        }
        .target-profit {
            width: 7%;
        }
        .stop-loss {
            width: 7%;
        }
        .min-hands {
            width: 8%;
        }
        .accuracy {
            width: 8%;
        }
        .operator {
            width: 8%;
        }
        .reason {
            width: 8%;
        }
        
    }    
</style>