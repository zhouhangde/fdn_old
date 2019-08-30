<template>
  <div class="wrap">
      <ul class="flex list_top ft12">
          <li  class="w12 t">开始交易时间</li>
          <li class="w5 tc">类型</li>
          <li class="w5 tc">状态</li>
          <li class="w8 tc">保证金</li>
           <li  class="w5 tc">倍数</li>
           <li  class="w8 tc">数量</li>
           <li  class="w5 tc">手数</li>
           <li class="w5 tc">盈亏</li>
           <li class="w8 tc">原始价格</li>
           <li class="w8 tc">点差价格</li>
           <li class="w8 tc">当前价格</li>
           <li class="w5 tc">隔夜费率</li>
           <li class="w8 tc">隔夜费总额</li>
           <li class="w5 tr">是否结算</li>
      </ul>
      <ul>
          <li class="flex alcenter ft12 list" v-for="(item,index) in list" :key="index">
                <span  class="w12 t">{{item.deal_time}}</span>
                <span class="w5 tc">{{item.type==0?'未结算':'已结算'}}</span>
                <span class="w5 tc" v-if="item.status == 0">挂单中</span>
                <span class="w5 tc" v-if="item.status == 1">交易中</span>
                <span class="w5 tc" v-if="item.status == 2">平仓中</span>
                <span class="w5 tc" v-if="item.status == 3">已平仓</span>
                <span class="w5 tc" v-if="item.status == 4">已撤单</span>
                <span class="w8 tc">{{item.caution_money}}</span>
                <span  class="w5 tc">{{item.multiple}}</span>
                <span  class="w8 tc">{{item.number}}</span>
                <span  class="w5 tc">{{item.share}}</span>
                <span class="w5 tc">{{item.fact_profits}}</span>
                <span class="w8 tc">{{item.origin_price}}</span>
                <span class="w8 tc">{{item.price}}</span>
                <span class="w8 tc">{{item.now_price}}</span>
                <span class="w5 tc">{{item.overnight}}</span>
                <span class="w8 tc">{{item.overnight_money}}</span>
                <span class="w5 tr">{{item.settled == 0?'否':'是'}}</span>
          </li>
          <!-- <Page :total="100" show-total></Page> -->
      </ul>
  </div>
</template>
<script>
// import 'iview/dist/styles/iview.css';
export default {
   data(){
       return{
          page:1,
          list:[]
       }
   },
   created(){
       this.init();
   },
   methods:{
       init(){
           this.$http({
            url: "/api/" + "lever/list",
            method: "post",
            data: {
               page: this.page,
               status:0
            },
            headers: { Authorization: localStorage.getItem("token") }
        })
            .then(res => {
                if(res.data.type == 'ok'){
                    this.list = res.data.message.data;
                }
        })
       }
   }
};
</script>
<style scoped>
.wrap {
  min-height: 500px;
  width: 97%;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
}
.list_top{
    padding: 5px 0;
    border-bottom: 1px solid #eee;
}
.list{
    padding: 11px 0;
}
.list:hover{
    background: #eee;
}
</style>

