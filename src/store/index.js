import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        time: ''
    },
    mutations: {
       
        getTime ( state ) {
            var myDate = new Date();
            state.time = myDate.getFullYear() + '年' + (myDate.getMonth() + 1 ) + '月' + myDate.getDate() + '日' +  myDate.getHours() + '时' + myDate.getMinutes() + '分' + myDate.getSeconds() + '秒';
        }
    }
})