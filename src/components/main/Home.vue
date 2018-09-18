<template>
    <div id="box">
        <div>
            <img :src="imgSrc" alt="背景">
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'Home',

    data () {
        return {
            imgSrc: require('../../assets/bg.png')
        }
    },
    
    created () {

    },

    methods: {

    }
}
</script>
<style lang="scss" scoped>
    #box{
        background-color: #f2f2f2;
        width: 100%;
        height: 100vh;
        div{
            width: 100%;
            height: 100%;
            
            img{
                height: 100%;
            }  
        }  
    }
    
</style>

