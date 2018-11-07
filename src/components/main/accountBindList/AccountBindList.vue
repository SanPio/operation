<template>
    <!-- <div> -->
        <div id="box">
            <!-- 头部 -->
        <v-header :title='headerTitle' :btnInfo='btnInfo' style="padding:30px 30px 0 30px;"></v-header>
            <ul class="title">
                <li>
                    <span>序号</span>
                </li>
                <li>
                    <span>时间</span>
                    <img :src="defaultSort" alt="" class="pointer" @click="bigToSmallSort()">
                    <!-- <img :src="bigToSmall" alt="" class="pointer"  @click="toSort()">
                    <img :src="smallToBig" alt="" class="pointer"  @click="toSort()"> -->
                </li>
                <li>
                    <span>账号</span>
                </li>
                <li>
                    <span>绑定/解绑</span>
                </li>
                <li>
                    <span>状态</span>
                </li>
                <li>
                    <span>备注</span>
                </li>
            </ul>
            <ul class="content">
                <li>
                    <p>1</p>
                    <p>2018/08/08 08:08</p>
                    <p>12345678</p>
                    <p>绑定</p>
                    <p>
                        <span style="color: #307eff;">成功</span>
                        <span style="color: #ff8830;">失败</span>
                        <span style="color: #666666;">审核中</span>
                    </p>
                    <p>--</p>
                </li>
                <li>
                    <p>2</p>
                    <p>2018/08/08 08:08</p>
                    <p>12345678</p>
                    <p>绑定</p>
                    <p>
                        <span style="color: #307eff;">成功</span>
                        <span style="color: #ff8830;">失败</span>
                        <span style="color: #666666;">审核中</span>
                    </p>
                    <p>--</p>
                </li>
                <li>
                    <p>3</p>
                    <p>2018/08/08 08:08</p>
                    <p>12345678</p>
                    <p>绑定</p>
                    <p>
                        <span style="color: #307eff;">成功</span>
                        <span style="color: #ff8830;">失败</span>
                        <span style="color: #666666;">审核中</span>
                    </p>
                    <p>--</p>
                </li>
            </ul>
            <pageing @pageChang='pageChang'  :total='total'></pageing>
        </div>
        
    <!-- </div> -->
</template>

<script>
import Header from "@/components/public/Header";
import Pageing from "@/components/public/Pageing";
export default {
    name: 'AccountBindList',

    data(){
        return{
            defaultSort: require('../../../assets/def_sort.png'),
            bigToSmall: require('../../../assets/big_small.png'),
            smallToBig: require('../../../assets/small_big.png'),
            total : 0,
            pageNum: 1, 
            pageSize: 15,
            loading:false,
            btnInfo: '返回',
            headerTitle:'账号绑定，解绑记录',
            
        }
    },
    components:{
        'v-header': Header,
        Pageing
    },
    methods:{
        // 分页
        pageChang( ) {
            // this.loading = true;
            // this.pageNum = params.pageNum;
            // this.pageSize = params.pageSize;
            // this.queryInfo( this.channelName, this.starTime, this.endTime, this.pageNum, this.pageSize );
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
        .title{
            width: 1085px;
            margin: 30px auto 0;
            line-height: 50px;
            background-color: #26b95a;
            overflow: hidden;
            li{
                color: white;
                float: left;
                width: 180px;
                line-height: 50px;
                box-sizing: border-box;
                font-size: 14px;
                img{
                    vertical-align: middle;
                }
            }
        }
        .content{
            width: 1083px;
            margin: 0 auto;
            border: 1px solid #d7d7d7;
            border-bottom: none;
            li{
                overflow: hidden;
                border-bottom: 1px solid #d7d7d7;
                p{
                    float: left;
                    width: 180px;
                    line-height: 40px;
                    color: #666666;
                }
            }
        }

    }
    
</style>

