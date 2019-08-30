<template>
    <div class="indexBlackes bg-main">
        <indexHeader></indexHeader>
        <router-view></router-view>
        <!-- <indexFooter></indexFooter>       -->
    </div>  
</template>
<script>
import indexHeader from '@/view/indexHeader'
import homeContent from '@/view/homeContent'
import indexFooter from '@/view/indexFooter'
export default {
    name:'home', 
    data(){
       return{
           msg:''
       } 
    }, 
    watch:{
        $route(to,from){
            if(to.name=="homeContent"){
                $('#index-head').css('background','#110a5d')
            }else{
                $('#index-head').css('background','#110a5d')
            }
        }
    },
    methods:{
       },
    components:{indexHeader,homeContent,indexFooter},
    created(){
        this.msg = this.$route.query.msg;
        eventBus.$emit('alert',this.msg)
        // this.$router.push({name:'homeContent'})
        // this.$http({
        //     method:'get',
        //     url:'https://api.HQ.pro/market/tickers?AccessKeyId=c96392eb-b7c57373-f646c2ef-25a14&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp='+new Date().toUTCString()
        //     ,headers:{
        //         'Content-Type':'application/x-www-form-urlencoded'
        //     }
        // }).then(res=>{
        //     //console.log(res)
        // })
    }
}
</script>
<style>
#index-head{
    background: #110a5d;
}
.indexBlackes{
    min-height: 1080px;
}
</style>





