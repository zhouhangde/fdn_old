<template>
    <div class="mt45">
       <div>
           <img class="bg_banners" src="../assets/images/fdncrow_banner.jpg">
       </div>
       <!--列表-->
       <ul class="w90 ul01 flex">
           <li class="li01 w23 bor_e mb20" v-for="(item,index) in list" :key="index" @click="goDetail(item.thisid)">
               <div>
                   <!-- <img class="w100" src="../assets/images/list_img.png"> -->
                   <img class="w100" :src="item.logo">
               </div>
               <div class="flex column between plr10 ptb10">
                   <p class="ft16 bold mb5">{{item.purchase_currency_name}} {{$t('crowd.mujiNum')}}：{{item.total_number}}</p>
                   <p class="ft14 gray9 mb5">{{$t('crowd.cur')}}：{{item.pay_currency_name}}</p>
                   <p class="ft14 gray9 mb5">{{$t('crowd.endTime')}}：{{item.end_date}}</p>
                   <p class="ft14 flex between ptb5 bdt_eb" style="padding-bottom:0;">
                       <span class="redColor">{{item.status}}</span>
                       <span class="ft16 arrow">→</span>
                   </p>
               </div>
           </li>
       </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[],
            token:''
        }
    },
    created(){
        this.token = window.localStorage.getItem('token');
        this.getData();
    },
    methods:{
        goDetail(id){
            this.$router.push({path:'/crowDetail',query:{id:id}})
        },
        getData(){
            this.$http({
                url:'/api/crowdfunding/list',
                headers: { Authorization: this.token }
            }).then(res=>{
                if(res.data.type == 'ok'){
                    this.list = res.data.message;
                }
            })
        }
    }
}
</script>
<style scoped>
   .bg_banners{
       width: 100%;
   }
   .ul01{
       margin: 40px auto;
       flex-wrap: wrap;
   }
   .li01{
       margin: 20px 1%;
       cursor: pointer;
   }
   .arrow{
       color: #05a2ee;
   }
</style>
