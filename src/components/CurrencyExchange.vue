<template>
    <div class="main currency-exchange  clr-part">
      
        <!-- <p class="legal_name">{{legal_name}}</p> -->
        <div class="legalAccount_msg flex between bg-part" style="padding:20px 30px">
          <div>
              <p class="ft12 msg_title">{{$t('center.available')}}（JNB）</p>
              <p style="color:#EF5E41">{{jnb}}</p>
          </div>
          <div>
              <p class="ft12 msg_title">{{$t('center.available')}}（BHC）</p>
              <p style="color:#EF5E41">{{bhc}}</p>
          </div>
          
        </div>
        <div class="transfer bg-part" style="margin-top:20px;padding:20px 30px">
            <div class="direction flex">
                <!-- <div>{{transferPms.type == 1?$t('account.legal'):$t('account.trade')}}</div> -->
                <!-- <img src="../../assets/images/transfer.png" alt="" @click="transferPms.type == 1?transferPms.type =2:transferPms.type =1"> -->
                <!-- <div>{{transferPms.type == 1?$t('account.trade'):$t('account.legal')}}</div> -->
                <div>JNB</div>
                <img src="../assets/images/arrowr.png" alt="" width="70" height="40">
                <div>BHC</div>
            </div>
            <!-- <div class="flex">
                <span>{{$t('account.choosecoin')}}：</span>
                <select name="" id="" style="padding:3px 16px" ref="select" @change="selectChange">
                    <option v-for="(item,index) in coins" :key="index" :value="item.currency">{{item.currency_name}}</option>
                </select>
            </div> -->
            <div class="flex">
                <span>{{$t('account.exchangeNum')}}：</span>
                <input type="number" v-model="number" :placeholder="$t('account.mult100')">
            </div>
            <button class="blue_bg" type="button" @click="exchange" :disabled="number == ''|| (number-0<=0) ">{{$t('account.exchange')}}</button>
        </div>
        <div class="rec_wrap">
           <p class="rec_title flex between bg-part" style="padding:20px 30px">
               <span>{{$t('account.mrecord')}}</span>
               <!-- <span class="all">全部</span> -->
           </p>
           <p class="list_title flex around " style="padding:15px 30px;background:rgba(252,252,252,1);">
               <span class="ft14 flex1">JNB{{$t('number')}}</span>
               <span class="ft14 flex1">BHC{{$t('number')}}</span>
               <span class="ft14 flex1 tc">{{$t('account.record')}}</span>
               <span class="ft14 flex1 tr">{{$t('exchangeRate')}}</span>
               <span class="ft14 flex1 tr">{{$t('time')}}</span>
           </p>
           <div class="log_wrap">
           <ul class="bg-part" style="padding:20px 30px">
              <li class="flex around ft12" v-for="(item,index) in recData" :key="index">
                  <span class="flex1 ft12 ptb ">{{item.jnb_number}}</span>
                  <span class="flex1 ft12 ptb">{{item.bhc_number}}</span>
                  <span class="flex1 ft12 ptb tc">{{item.memo}}</span>
                  <span class="flex1 ft12 ptb tr">{{item.rate}}</span>
                  <span class="flex1 ft12 ptb tr">{{item.time}}</span>
              </li>
           </ul>
           <p class="ft12 light_blue no_rec bg-part" style="text-align:center;padding:20px 30px" v-show="recData.length == 0" >{{$t('nodata')}}</p>
           <p class="ft12 light_blue no_rec bg-part" style="text-align:center;padding:20px 30px" v-show="recData.length != 0" @click="getLog(page)">{{moreLog}}</p>
           </div>
        </div>
        <!-- <router-link tag="p" class="huazhuan redBg" to='/transferLegal'>划转</router-link> -->
    </div>
</template>
<script>
export default {
  data() {
    return {
      jnb:'0.00',
      bhc:'0.00',
      number:'',
      legalPrice:'',
      legal_name: "",
      legal_balance: "",
      lock_legal_balance: "",
      legal_price: "",
      recData: [
       
      ],
      moreLog: this.$t('more'),
      page: 1,
      currencyId: "",
      coins: [],
      transferPms: { number: '', type: 2 }
    };
  },
  created() {
    this.token = localStorage.getItem("token") || "";
    if(this.token){
      this.getJnbbhc();
      this.getLog(1);
    }
  },
  mounted() {
    
  },
  methods: {
    getJnbbhc(){
      var i = layer.load();
      this.$http({
        url:"/api/wallet/jnb_bhc_balance",
        headers:{Authorization:this.token}
      }).then(res => {
        layer.close(i);
        if(res.data.type == 'ok'){
          this.jnb =  res.data.message.jnb;
          this.bhc = res.data.message.bhc;
        }
      })
    },
    exchange(){
      if((this.number-0)%100 != 0){
        layer.msg(this.$t('account.mult100'));return;
      }
      var i = layer.load();
      this.$http({
        url: "/api/currency/jnb_to_bhc",
        method: "post",
        data:{number:this.number},
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          this.getJnbbhc();
          this.number = '';
          this.getLog(1);
        }
      });
    },
    getLog(page){
      var i = layer.load();
      this.$http({
        url:'/api/exchange/log',
        params:{page:page},
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        if(res.data.type == 'ok'){
          var list = res.data.message;
         this.page=  list.length?page+1:page;
          if(page== 1){
            this.recData= list;
          } else {
            this.recData = this.recData.concat(list);
          }
          if(list.length){
            this.page = page+1;
          } else {
            this.page = page;
            layer.msg(this.$t('nomore'))
          }
        }
      })
    },
    
  }
};
</script>
<style scoped lang='scss'>
.currency-exchange{
  margin: 30px  auto 0;
  width: 1200px;
}
.legal_name {
  /* background: #1b1e2e; */
  padding: 5px 0;
}
.msg_title {
  /* color: #61688a; */
}
.main {
}
.transfer .flex {
  margin: 16px 0;
  line-height: 40px;
  span {
    // width: 100px;
  }
  select {
    border-radius: 2px;
  }
  input {
    padding: 0 14px;
    border-radius: 2px;
    line-height: 39px;
    border: 1px solid #ccc;
  }
}
.transfer button {
  padding: 10px 60px;
  background: #563bd1;
  color: #fff;
  border-radius: 2px;
  margin-top: 20px;
}
.direction {
  padding: 0 20px;
  line-height: 44px;
  background: #fff5dc;
  margin-top: 10px !important;
  img {
    margin: 0 44px;
    cursor: pointer;
  }
}
.legalAccount_msg {
  /* background: #1b1e2e; */
  padding: 6px 0;
}
.legalAccount_msg div p:first-child {
  margin-bottom: 10px;
  font-size: 18px;
}
.legalAccount_msg div p:last-child {
  font-size: 24px;
}
.rec_wrap {
  margin-top: 20px;
  margin-bottom: 30px;
}

.all {
  /* color: #61688a; */
}
.list_title {
  padding: 10px 0;
  /* background: #1b1e2e; */
}
.huazhuan {
  text-align: center;
  margin-top: 60px;
  background: #d45858;
  padding: 8px;
}
.huazhuan:hover {
  cursor: pointer;
}
.ptb {
  padding: 8px 0;
}
.no_rec {
  cursor: pointer;
}
.log_wrap {
  height: 480px;
  overflow: auto;
  border: 1px solid #ededed;
}
.log_wrap::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}
.log_wrap::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #9e9898;
}
.log_wrap::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>
