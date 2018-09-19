import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        // 显示本地时间
        time: '',
        // 初始化开始截止日期
        initDate: '',
       
    },
    mutations: {
       
        // 显示本地时间
        getTime ( state ) {
            let myDate = new Date();
            state.time = myDate.getFullYear() + '年' + (myDate.getMonth() + 1 ) + '月' + myDate.getDate() + '日' +  myDate.getHours() + '时' + myDate.getMinutes() + '分' + myDate.getSeconds() + '秒';
        },

        // 开始日期截止日期 初始化
        initLocDate ( state ) {
            let myDate = new Date();
            let myMonth = myDate.getMonth() + 1;
            let myDay = myDate.getDate()
            if ( myMonth < 10 ) {
                myMonth = '0' + myMonth
            }
            if( myDay < 10) {
                myDay = '0' + myDay
            }
            state.initDate =''+ myDate.getFullYear() + '-' + myMonth + '-' +  myDay
        }
        

        
    }
})