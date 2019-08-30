<template>
    <div class="mt50 w80 wrap">
       <div class="plr20 ptb20">
      <p class="cor ft18 bold mb10 tc">{{msg.title}}</p>
      <p class="mb10 ft14 gray6 ptb10" v-html="msg.content"></p>
      <p class="flex between gray_blue ft12 ptb10"><span><span  class="mr10">作者：{{msg.author}}</span>浏览量：{{msg.views}}</span><span>{{msg.uodate_time}}</span></p>
      </div>   
    </div>
</template>
<script>
export default {
    data(){
        return{
           id:'',
           msg:''
        }
    },
    created(){
        this.id = this.$route.query.id;
       this.detail()
    },
    methods:{
        detail(){
            this.$http({
                url:'/api/currency_token/report_detail',
                method:'get',
                params:{
                    id:this.id
                }
            }).then(res=>{
                 if(res.data.type == 'ok'){
                     this.msg = res.data.message;
                 }
            })
        }
    }
}
</script>
<style scoped>
      .wrap{
          margin: 50px auto;
          min-height: 600px;
      }

</style>
