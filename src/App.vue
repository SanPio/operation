<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
    
  </div>
</template>

<script >
export default {
  name: 'App'
}
</script>

<style >
    body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend,button,input,textarea,th,td{margin:0;padding:0}
    html{color:#000;overflow-y:scroll;overflow:-moz-scrollbars-vertical}
    body,button,input,select,textarea{font-size:12px;font-family:arial,'Hiragino Sans GB','Microsoft Yahei','微软雅黑','宋体',\5b8b\4f53,Tahoma,Arial,Helvetica,STHeiti}
    h1,h2,h3,h4,h5,h6{font-size:100%}
    em{font-style:normal}
    small{font-size:12px}
    ul,ol{list-style:none}
    a{text-decoration:none}
    a:hover{text-decoration:underline}
    legend{color:#000}
    fieldset,img{border:0}
    button,input,select,textarea{font-size:100%}
    table{border-collapse:collapse;border-spacing:0}
    img{-ms-interpolation-mode:bicubic}
    textarea{resize:vertical}
    .left{float:left}
    .right{float:right}
    .overflow{overflow:hidden}
    .hide{display:none}
    .block{display:block}
    .inline{display:inline}
    .error{color:#F00;font-size:12px}
    .pointer{cursor: pointer;}
    label,button{cursor:pointer}
    .clearfix:after{content:'\20';display:block;height:0;clear:both}
    .clearfix{zoom:1}.clear{clear:both;height:0;line-height:0;font-size:0;visibility:hidden;overflow:hidden}
    .wordwrap{word-break:break-all;word-wrap:break-word}
    pre.wordwrap{white-space:pre-wrap}
    body{text-align:center}
    body,form{position:relative}
    td{text-align:left}
    img{border:0}
    label, button{
      cursor:none;
      outline: none;
    }
    html,body,#app{width: 100%;height:100%;background: #fff;}
        ::-webkit-scrollbar {
        width: 0;   /* 滚动条宽度为0 */
        height: 0; /* 滚动条高度为0 */
        display: none; /* 滚动条隐藏 */
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #999;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #b8b8b8;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #b8b8b8;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:    #b8b8b8;
    }
    .el-message-box__btns button:nth-child(2){
        margin-left:60px;
    }
    .el-message-box__header .el-message-box__title span{
        color:#307EFF;
        font-weight: bold;
    }
    .el-dialog{
        border-radius: 10px;

    }
   .el-dialog .el-dialog__body{
               padding-bottom: 0; 
    }
    .el-dialog .el-dialog__body .el-form-item__label{
        text-align: left;
    }
    .el-dialog__title{
            color: #307EFF;
            font-weight: bold;
        }
      .el-inpdiv .el-input__inner{
                border:none;
        }
      /*    渠道详情tab页样式修改 */
      #channel_detail .el-tabs__item{
          background-color: #fff;
          border:none;
          margin-right: 1px;
          border-radius: 11px 11px 0 0;
          overflow:hidden;
      }
     #channel_detail .is-active{
        background-color: #307EFF;
        color:#fff;
       }
       #channel_detail .el-tabs__header {
          background-color: #f2f2f2; 
       }
     #box .el-tabs{
         height:81vh;
     }
    #box .el-tabs .el-tabs__item{
         height: 34px;
         line-height: 34px;
     }
        #box .el-tabs__content{
            min-height: calc(100% - 64px);
        } 
      
</style>
