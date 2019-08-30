<template>
    <div class="mt45 ptb20">
       <div class="w50 box plr10 bgWhite radius5">
           <p class="ptb10 ft16">申购历史</p>
           <ul>
               <li class="flex ptb10 bdb ft14">
                   <span class="flex1 tl">申购币种</span>
                   <span class="flex1 tc">申购日期</span>
                   <span class="flex1 tc">申购数量</span>
                    <span class="flex1 tr">申购金额</span>
               </li>
               <li class="flex ptb10 ft14" v-for="(item,index) in list" :key="index">
                    <span class="flex1 tl">{{item.purchase_currency_name}}</span>
                   <span class="flex1 tc">{{item.purchase_date}}</span>
                    <span class="flex1 tc">{{item.purchase_number}}</span>
                   <span class="flex1 tr">{{item.pay_number}}{{item.pay_currency_name}}</span>
               </li>
               <li  class="mt10 ft14 tc gray curPer" @click="getmore">{{more}}</li>
           </ul>
       </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[],
            page:0,
            more:'加载更多',
            token:''
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(){
            var i = layer.load();
            this.$http({
                url:'/api/crowdfunding/userList',
                method:'get',
                params:{
                    userId:localStorage.getItem('userId'),
                    page:this.page
                },
                headers: { Authorization: localStorage.getItem('token')}
            }).then(res=>{
                layer.close(i);
               if(res.data.type == 'ok'){
                   if(res.data.message.data.length>0){
                       this.list = this.list.concat(res.data.message.data);
                   }else{
                       this.more = '没有更多了'
                   }
               }
            })
        },
        getmore(){
            this.page++;
            this.getList();
        }
    }
}
</script>
<style scoped>
    .box{
        width: 60%;
        margin: 0 auto;
        min-height: 700px;
    }
    

</style>
