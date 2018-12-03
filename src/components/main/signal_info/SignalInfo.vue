<template>
    <div id="box">
        <p style="text-align:left;margin-top:20px;font-size:13px;width:100%">
            <span style="margin-left:18px">
                筛选
            </span>
            
        </p>
        <div class="clearfix" id="signal" style="margin-left:10px">
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
            <div class="left clearfix he-right" style="margin-left:30px">
                <p class="left">
                    星级范围：
                </p>
                <div class="right block">
                    <el-select v-model="star" multiple placeholder="全部" size="mini">
                        <el-option
                        v-for="item in starOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                        </el-option>
                    </el-select> 
                </div>
                
            </div>
            <div class="left clearfix he-right">
                <p class="left">
                    状态：
                </p>
                <div class="right block">
                     <el-select v-model="status" multiple placeholder="全部" size="mini">
                        <el-option
                        v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                        </el-option>
                    </el-select> 
                    
                </div>
                
            </div>
            <div class="left he-right">
                <el-input
                    placeholder="请输入信号源名称"
                    prefix-icon="el-icon-search"
                    v-model="searchValue">
                </el-input> 
            </div>
            <div class="left he-right">
                <el-button type="primary" plain @click="query">
                    查询
                </el-button>
            </div>
        </div>
        <p style="text-align:left;font-size:13px;width:100%">
            <span style="margin-left:18px">
                信息展示
            </span>
            
        </p>

            <!-- 标题 -->
        <ul class="title clearfix">
            <li class="num left">
                <span>
                    序号
                </span>
            </li>
            <li class=" left">
                <span>
                    信号源名称
                </span>
            </li>
            <li class="star left">
                <span>
                    星级
                </span>
            </li>
            <li class="name left">
                <span>
                    收益率
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[0] === 0" @click="bigToSmallSort( 0, 'addTime' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[0] === 1" @click="toSort( 0, 'addTime' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[0] === 2" @click="toSort( 0, 'addTime' )">
            </li>
            <li class="profit left">
                <span>
                    跟随获利（当前/历史）
                </span>
                
            </li>
            <li class=" left">
                <span>
                    当前状态
                </span>
            </li>
            <li class="left">
                <span>
                    当前跟随人数
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[1] === 0" @click="bigToSmallSort( 1, 'lotsType' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[1] === 1" @click="toSort( 1, 'lotsType' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[1] === 2" @click="toSort( 1, 'lotsType' )">
            </li>
            <li class="left">
                <span>
                    历史跟随人数
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[3] === 0" @click="bigToSmallSort( 2, 'stopLoss' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[3] === 1" @click="toSort( 2, 'stopLoss' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[3] === 2" @click="toSort( 2, 'stopLoss' )">
            </li>
            <li class="left">
                <span>
                    付费人数
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[2] === 0" @click="bigToSmallSort( 3, 'takeProfits' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[2] === 1" @click="toSort( 3, 'takeProfits' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[2] === 2" @click="toSort( 3, 'takeProfits' )">
            </li>
            <li class="left">
                <span>
                    付费金额
                </span>
                <img :src="defaultSort" alt="" class="pointer" v-if="sortImgShow[3] === 0" @click="bigToSmallSort( 4, 'stopLoss' )">
                <img :src="bigToSmall" alt="" class="pointer" v-if="sortImgShow[3] === 1" @click="toSort( 4, 'stopLoss' )">
                <img :src="smallToBig" alt="" class="pointer" v-if="sortImgShow[3] === 2" @click="toSort( 4, 'stopLoss' )">
            </li>
            
        </ul>

           <!-- 列表 -->
        <ul class="contant">
            <li class="info-list clearfix" v-for="(item, index) in info" :key="index">
                <p class="num left">
                    {{ index + 1 }}
                <p class="left">
                    小铭跟单001
                </p>
                <p class="star left">
                    三星
                </p>
                <p class="profit left">
                   36%
                </p>
                <p class="left">
                   $222/$2131
                </p>
                <p class="left">
                   正常
                </p>
                <p class="left">
                    10
                </p>
                <p class="left">
                    20
                </p>
                <p class="left">
                    30
                </p>
                <p class="left">
                        40
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
    name: 'SignalInfo',
    
    data() {
        return {
            defaultSort: require('../../../assets/def_sort.png'),
            bigToSmall: require('../../../assets/big_small.png'),
            smallToBig: require('../../../assets/small_big.png'),
            starTime: '',
            endTime: '',
            starOptions: [{
                    value: '3',
                    label: '三星'
                }, {
                    value: '4',
                    label: '四星'
                }, {
                    value: '5',
                    label: '五星'
                }],
            statusOptions: [{
                    value: '0',
                    label: '正常'
                }, {
                    value: '1',
                    label: '警告'
                }, {
                    value: '2',
                    label: '收尾'
                }, {
                    value: '3',
                    label: '下架'
                }],
            star: '',
            status: '',
            searchValue: '',
            sortImgShow: [ 0, 0, 0, 0, 0 ],
            info: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            pageNum: '', 
            pageSize: '',
            total:0
        }
    }, 

    components: {
        Pageing
    },

    created() {
        Store.commit( 'initLocDate' )
        this.starTime = Store.state.initDate;
        this.endTime = Store.state.initDate;
    },

    methods: {
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

        query(){

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
    #box{
        width: 100%;
        height:100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 14px;
        position: relative;
        min-height: 82vh;
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
        .he-right{
            margin-top: 10px;
            margin-right: 20px;
            .left{
                line-height: 28px;
            }
            .el-button{
                font-size: 12px;
                padding: 8px 0;
                width: 80px;
            }
        } 
        .title,.contant{

            .num{
                width: 8%;
            }

            .star{
                width: 8%;
            }

            .profit{
                width: 14%;
            }
        }
        .title li,.contant p{
            width: 10%;
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
                    height: 26px;
                    line-height: 26px;
                }
            }
        }
      

    }
    
</style>

