<template>
    <div>
        <span @click="al">
            {{ msg }}
        </span>
        
    </div>
</template>
<script>
export default {
    name: 'SignalInfo',
    
    data() {
        return {
            msg: '这是信号源基础信息页面'
        }
    },

    methods: {
        al(){
            alert('哈哈哈')
        }
    }
}
</script>
