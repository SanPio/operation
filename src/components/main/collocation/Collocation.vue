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
        <p style="text-align:left;margin-top:10px;font-size:13px;width:100%">
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
                <div class="left" style="margin-left:20px;width:200px;height:20px;border:1px solid #dcdfe6;margin-top:10px;border-radius:4px;padding-top:6px;"> 
                    <el-radio v-model="radio" label="0">全选</el-radio>
                    <el-radio v-model="radio" label="1">自定义</el-radio>
                </div>
                <div class="block left" id="select" style="padding-top:10px;width:500px;height:40px;text-align:left" v-if="radio == 1">
                   <el-select
                        v-model="customValue"
                        multiple
                        collapse-tags
                        style="margin-left: 20px;width:200px"
                        @visible-change="isSelctShow"
                        placeholder="请选择">
                        <el-option
                        v-for="item in customOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div> 
                <div class="right">
                    <el-button type="primary" plain @click="queryInfo">
                        查询
                    </el-button>
                </div>
        </div>
        
        <ul class="clearfix show" v-if="radio == 1">
            <li v-for="(item, index) in customValue.slice(0,9)" :key="index" class="left">
                <p class="sel-show">
                    {{ item }}
                    <img :src="delBtnImg" class="pointer" @click="delOption( index )">
                </p>
            </li>
            <li v-if="customValue.length>9">...</li>
        </ul>




        
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
                
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[0] === 0" @click="bigToSmallSort( 0, 'addTime' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[0] === 1" @click="toSort( 0, 'addTime' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[0] === 2" @click="toSort( 0, 'addTime' )">
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
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[1] === 0" @click="bigToSmallSort( 1, 'lotsType' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[1] === 1" @click="toSort( 1, 'lotsType' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[1] === 2" @click="toSort( 1, 'lotsType' )">
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
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[2] === 0" @click="bigToSmallSort( 2, 'takeProfits' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[2] === 1" @click="toSort( 2, 'takeProfits' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[2] === 2" @click="toSort( 2, 'takeProfits' )">
            </li>
            <li class="stop-loss left">
                <span>
                    止损
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[3] === 0" @click="bigToSmallSort( 3, 'stopLoss' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[3] === 1" @click="toSort( 3, 'stopLoss' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[3] === 2" @click="toSort( 3, 'stopLoss' )">
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
                <p class="date left">
                    {{ item.addTime }}
                </p>
                <p class="oper-type left">
                    <span v-if="item.type == 1">
                        修改
                    </span>
                    <span v-if="item.type == 2">
                        跟随
                    </span>
                    <span v-if="item.type == 3">
                        取消跟随
                    </span>
                </p>
                <p class="name left">
                    {{ item.signalName | changeName }}
                </p>
                <p class="follow-type left">
                    <span v-if="item.lotsType == 1">
                        {{ item.lots }}倍比例跟随  
                    </span>
                    <span v-if="item.lotsType == 0">
                        固定{{ item.lots }}标准手  
                    </span>
                </p>
                <p class="follow-switch left">
                    
                    <span v-if="item.nullity == 0">
                        开 
                    </span>
                    <span v-if="item.nullity == 1">
                        关
                    </span>
                </p>
                <p class="reverse-switch left">
                    <span v-if="item.opposited == 0">
                        关
                    </span>
                    <span v-if="item.opposited == 1">
                        开
                    </span>
                </p>
                <p class="target-profit left">
                    {{ item.takeProfits }}
                </p>
                <p class="stop-loss left">
                    {{ item.stopLoss }}
                </p>
                <p class="min-hands left">
                    {{ item.minLotsCount}}标准手
                </p>
                <p class="accuracy left">
                    <span v-if="item.broundoff == 0">
                        舍弃尾数
                    </span>
                    <span v-if="item.broundoff == 1">
                        四舍五入
                    </span>
                    
                </p>
                <p class="operator left">
                    {{ item.wxNickname | changeName }}
                </p>
                <p class="reason left">
                    {{ item.remark }}
                </p>
            </li>
        </ul> 

            <!-- 分页 -->
        <pageing @pageChang='pageChang'   :total='total'></pageing>

    </div>
</template>
<script>
import Store from '@/store'
import Pageing from "@/components/public/Pageing";
export default {

    name: 'Collocation',

    data() {
        return {
            defaultSort: require('../../../assets/def_sort.png'),
            bigToSmall: require('../../../assets/big_small.png'),
            smallToBig: require('../../../assets/small_big.png'),
            loading: false,
            delBtnImg: require('../../../assets/delbtn.png'),
            nickName: '',
            sortImgShow: [ 0, 0, 0, 0 ],
            total: 0,
            userId: '', 
            pageNum: '', 
            pageSize: '',
            info: [  ],
            infoStandby: [ ],
            fixedList: [ ],
            proportList: [ ],
            starTime: '',
            endTime: '',
            customOptions: [],
            radio: '',
            customValue: '',
            optionNameList: '',
            type:'',
            queryWord:''
        }
    },

    components: {
        Pageing
    },

    created () {
            //  获取id和昵称
        this.userId = this.$route.query.userId;
        this.nickName = this.$route.query.userName;
        Store.commit( 'initLocDate' )
        this.starTime = Store.state.initDate;
        this.endTime = Store.state.initDate;

            // 初始化信号源
        this.queryOption();

            // 初始化数据
        this.query( this.userId, 1, 15 );
        this.type = this.$route.query.type;
        this.queryWord = this.$route.query.queryWord;
    },

    watch: {
        starTime(val) {
            this.radio = ''
        },
        endTime(val) {
            this.radio = ''
        },
        customValue( val ) {

            this.optionNameList = ''

            for( let i = 0; i < val.length; i ++ ) {
                this.optionNameList = this.optionNameList + val[i] + '-'
            }

            this.optionNameList.substr( 0, this.optionNameList.Length - 1)
           
        },
       
    },
    filters: {
        changeName( val ) {
            if(val ){
                if( val.length >7 ){
                    return val.substring(0, 7) + '...' 
                }else{
                    return val
                } 
            }else{
                return ''
            }
            
        }
    },
    methods: {

        // 返回到用户信息
        toUserInfo ( ) {
            this.$router.push({
                path: '/user_info',
                query:{//通过query 传递参数
                    type: this.type, //需要传递的参数,
                    queryWord: this.queryWord,

                }
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
            if( this.radio == 0 ) {
                this.query( this.userId, this.starTime, this.endTime, 0, '', this.pageNum, this.pageSize ); 
            }else if ( this.radio == 1 ) {
                this.query( this.userId, this.starTime, this.endTime, 1, this.pageNum, this.pageSize ); 
            }
        },

        // 删除信号源
        delOption( index ) {
            this.customValue.splice( index, 1 )
        },

        // 判断下拉框是否出现
        isSelctShow( val ) {
            // if ( val === false ) {
            //     this.query( this.userId, this.starTime, this.endTime, 1, this.optionNameList, 1, 15 ); 
            // }
        },
            // 加载信号源
        queryOption() {

            let postData = this.$qs.stringify({ });

            this.$http({

                method: 'post',
                url: this.$path +'web/emp/optionListName',
                data:postData

            }).then( res => {

                let data = res.data.data.data;

                for (let i = 0; i < data.length; i ++ ) {
                    let obj = {
                        value: data[ i ],
                        label: data[ i ]
                    };
                    this.customOptions.push( obj );
                } 

            }).catch( req => {
                console.log( req )
            }) 
        },

        queryInfo(){
            if( this.radio == 0){
                this.query( this.userId, this.starTime, this.endTime, 0, '', 1, 15 );
            }else if( this.radio == 1 ){
                this.query( this.userId, this.starTime, this.endTime, 1, this.optionNameList, 1, 15 ); 
            }   
        },
        // 数据请求
        query( userId, startTime, endTime, isAllSelect, optionNameList, pageNum, pageSize ) {
            let postData = this.$qs.stringify({

                userId: userId,
                startTime: startTime,
                endTime: endTime,
                isAllSelect: isAllSelect,
                optionNameList: optionNameList,
                pageNum: pageNum,
                pageSize: pageSize,

            });
           
            this.$http({

                method: 'post',
                url: this.$path +'web/emp/userOptionRecordData',
                data:postData

            }).then( res => {
                console.log(res.data.data.data)
                this.loading = false;
                this.info = [];
                this.infoStandby = [];
                let data = res.data.data.data
                this.info = data.documentaryConfigurationRecordList;
                this.infoStandby = data.documentaryConfigurationRecordList;
                this.total = data.totalNum;
                for(let i = 0; i < data.documentaryConfigurationRecordList.length; i ++ ){
                    if( data.documentaryConfigurationRecordList[i].lotsType == 0){
                        this.fixedList.push( data.documentaryConfigurationRecordList[i] ) // 固定
                    }else{
                        this.proportList.push( data.documentaryConfigurationRecordList[i] ) // 比例
                    }
                }

            }).catch( req => {
                console.log( req )
            })    
        },
        // 默认反向排序
            bigToSmallSort ( ind, key) {

                this.sortImgShow = [ 0, 0, 0, 0 ];
                this.$set( this.sortImgShow, ind, 1 );
                this.toSort(ind,key);
            },

            

            // 逆向排序
            toSort ( ind, key ) {
                if ( this.sortImgShow[ ind ] === 1) {

                    this.sortImgShow = [ 0, 0, 0, 0 ];
                    this.$set( this.sortImgShow, ind, 2);
                    
                    if( key == "addTime" ){
                       
                        this.isDate(key,1);
                    }else if(key == "lotsType" ){
                        this.info = []
                        
                        this.info = this.fixedList.concat(this.proportList) 
                
                    }else{
                        this.info = this.ZtoAsort(this.info, key);
                    }
                
                }else if ( this.sortImgShow[ ind ] === 2 ) {
                    
                    this.sortImgShow = [ 0, 0, 0, 0 ];
                    this.$set( this.sortImgShow, ind, 1 );

                    if( key == "addTime" ){
                        this.isDate(key,2);
                        
                    }else if(key == "lotsType" ){
                        this.info = []
                        
                        this.info = this.proportList.concat(this.fixedList) 
                  fixedList
                    }else{
                        this.info = this.AtoZsort(this.info, key);
                    }          
                    
                }
            },

            // 日期排序
            isDate(key,val){
                
                if( val === 1){
                    this.info = this.infoStandby
                }else{
                    this.info = []
                    for( let i = 0; i < this.infoStandby.length; i ++) {
                        this.info.unshift( this.infoStandby[i] )
                    }
                    
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
        #hahha .el-button { 
            font-size: 12px;
            padding: 8px 0;
            width: 80px;
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
        .show{
            .sel-show{
                background-color: #f2f2f2;
                width: 70px;
                margin-right: 20px;
                padding: 4px 6px;
                padding-right: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                position: relative;
                img{
                    position: absolute;
                    right: 4px;
                    top: 5px;
                    width:14px;
                    height:14px;
                }
            }
            p:nth-of-type(1){
                margin-left: 8px;
            }
        }
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
                    height: 28px;
                    line-height: 28px;
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