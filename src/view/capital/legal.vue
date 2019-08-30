<template>
    <div class="bgf8 bg-part clr-part main-wrap scroll">
        <div class="top">
            <p>{{$t('account.laccount')}}, {{$t('account.totalassets')}}：{{total}}USDT<span class='ft12 all_account'><span class=""></span>≈ <span>{{totalCNY}}</span> CNY</span></p>
        </div>
        <ul class="list ft12">
            <li class="bdr-part curPer" v-for="(item,index) in list" :key="index" @click="go_legalAccount(item.currency_id)">
                <p class="legal_name">{{item.currency_name}}</p>
                <div class="balance_detail">
                    <div class="use_balance flex1">
                       <p class="ft12 mincny">{{$t('center.available')}}</p>
                       <p class="use_balance_num black_cor">{{item.balance}}</p>
                    </div>
                    <div class="flex1">
                       <p class="ft12 mincny tc">{{$t('account.freezes')}}</p>
                       <p class="lock_balance_num tc black_cor">{{item.lock_balance}}</p>
                    </div>
                    <div class="convert flex1">
                       <p class="ft12 mincny tr">{{$t('account.conversion')}}(CNY)</p>
                       <p class="lock_balance_num tr black_cor">{{item.rate_balance}}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
          totle:'',
          list:[],
          total:'',
          totalCNY:''
        }
    },
    created(){
       this.token = localStorage.getItem('token') || '';
    },
    mounted(){
       this.legal();
    },
    methods:{
        //刷新页面
        refresh(){
                    this.$http({
                        url: '/api/wallet/refresh',
                        method:'get',
                        data:{},
                        headers:{'Authorization':this.token}
                    }).then( res => {
                        if(res.data.type == 'ok'){
                            
                        }
                    })
        },
         //法币账户
         legal(){
             var load = layer.load();
             var that = this
                 this.$http({
                    url: '/api/' + 'wallet/info',
                    method:'get',
                    data:{},
                    headers: {'Authorization':  that.token}
                    }).then(res=>{
                        layer.close(load);
                    //console.log(res)
                        
                        if(res.data.type  =='ok'){
                            that.list = res.data.message.legal.balance;
                            this.total = res.data.message.legal.total;
                            this.totalCNY = res.data.message.legal.total_rate;
                            this.refresh();
                        }else{
                            layer.msg(res.message);
                        }
                    }).catch(error=>{
                        //console.log(error)
                    })
        },
        go_legalAccount(currency_id){
             this.$router.push({
                // path:'/legalAccount',
                name:'legalAccounts',
                params:{
                  currency_id:currency_id
                }
            })
        }
    }
}
</script>
<style scoped>
    .flex1{
        flex: 1;
    }
   .top{
       
       padding: 15px 30px;
   }
   .all_account{
       /* color: #61688a; */
   }
   .list{
       padding: 15px 30px;
   }
   .balance_detail{
       display: flex;
       justify-content: space-between;
       align-items: center;
       /* color: #61688a; */
   }
   .legal_name{
       /* color: #61688a; */
       padding: 10px 0;
   }
   .use_balance_num,.lock_balance_num,.lock_balance_num{
       /* color: #fff; */
       padding: 5px 0;
   }
   .list li{
       border-bottom: 1px solid #ccc;
   }
   .convert{
       padding: 10px 0;
   }
   .main-wrap{
       /* height: 820px; */
       overflow: auto;
   }
  .black_cor{
      color: #4A4A4A;
  }
</style>


