<template>
    <div class="main   clr-part">
        <!-- <p class="legal_name">{{legal_name}}</p> -->
        <div class="legalAccount_msg flex between bg-part" style="padding:20px 30px">
          <div>
              <p class="ft12 msg_title">{{$t('center.available')}}（{{legal_name}}）</p>
              <p style="color:#EF5E41">{{legal_balance}}</p>
          </div>
          <div>
              <p class="ft12 msg_title">{{$t('account.freezes')}}（{{legal_name}}）</p>
              <p style="color:#4A95F1">{{lock_legal_balance}}</p>
          </div>
          <div>
              <!-- <p class="ft12 msg_title">折合（CNY）</p> -->
              <p class="ft12 msg_title">{{$t('account.conversion')}}（CNY）</p>
              <p style="color:#2EDB99">{{legalPrice}}</p>
              <!-- <p style="color:#2EDB99">{{legal_cny_price}}</p> -->
          </div>
        </div>
        <div class="transfer bg-part" style="margin-top:20px;padding:20px 30px">
            <div class="direction flex">
                <div>{{transferPms.type == 1?$t('account.legal'):$t('account.trade')}}</div>
                <img src="../../assets/images/transfer.png" alt="" @click="transferPms.type == 1?transferPms.type =2:transferPms.type =1">
                <div>{{transferPms.type == 1?$t('account.trade'):$t('account.legal')}}</div>
            </div>
            <div class="flex">
                <span>{{$t('account.choosecoin')}}：</span>
                <select name="" id="" style="padding:3px 16px" ref="select" v-model="currencyId" @change="selectChange">
                    <option v-for="(item,index) in coins" :key="index" :value="item.currency_id">{{item.currency_name}}</option>
                </select>
            </div>
            <div class="flex">
                <span>{{$t('account.huanum')}}：</span>
                <input type="numer" v-model="transferPms.number">
            </div>
            <button class="blue_bg" type="button" @click="transfer">{{$t('account.transfer')}}</button>
        </div>
        <div class="rec_wrap">
           <p class="rec_title flex between bg-part" style="padding:20px 30px">
               <span>{{$t('account.mrecord')}}</span>
               <!-- <span class="all">全部</span> -->
           </p>
           <ul class="flex alcenter ft14 plr30">
             <li class="curPer lock" :class="{'actives':is_lock == 1}" @click="lock(1)">{{$t('caiwu.lock')}}</li>
             <li class="ml20 curPer lock" :class="{'actives':is_lock == 0}" @click="lock(0)">{{$t('caiwu.nolock')}}</li>
           </ul>
           <p class="list_title flex around " style="padding:15px 30px;background:rgba(252,252,252,1);">
               <span class="ft14 flex1">{{$t('number')}}</span>
               <span class="ft14 flex1 tc">{{$t('account.record')}}</span>
               <span class="ft14 flex1 tr">{{$t('time')}}</span>
           </p>
           <div class="log_wrap">
           <ul class="bg-part" style="padding:20px 30px">
              <li class="flex around ft12" v-for="(item,index) in recData" :key="index">
                  <span class="flex1 ft12 ptb ">{{item.change}}</span>
                  <span class="flex1 ft12 ptb tc">{{item.memo}}</span>
                  <span class="flex1 ft12 ptb tr">{{item.create_time}}</span>
              </li>
           </ul>
           <p class="ft12 light_blue no_rec bg-part" style="text-align:center;padding:20px 30px" v-show="recData.length == 0" >{{$t('nodata')}}</p>
           <p class="ft12 light_blue no_rec bg-part" style="text-align:center;padding:20px 30px" v-show="recData.length != 0" @click="more">{{moreLog}}</p>
           </div>
        </div>
        <!-- <router-link tag="p" class="huazhuan redBg" to='/transferLegal'>划转</router-link> -->
    </div>
</template>
<script>
export default {
  data() {
    return {
      legalPrice:'',
      legal_name: "",
      legal_balance: "",
      lock_legal_balance: "",
      legal_price: "",
      recData: [],
      moreLog: this.$t('more'),
      page: 0,
      currencyId: "",
      coins: [],
      transferPms: { number: '', type: 2 },
      is_lock:1
    };
  },
  created() {
    this.token = localStorage.getItem("token") || "";
    if(this.token){
      this.currencyId = this.$route.params.currency_id;

      this.init();
      this.getLog('',this.is_lock);
      this.getCoins();
    }
  },
  mounted() {
    
  },
  methods: {
    lock(id){
       this.is_lock = id;
       this.getLog(true,this.is_lock);
    },
    selectChange(){
      this.currencyId = this.$refs.select.value;
      this.init();
      this.page = 0;
      this.getLog(true,this.is_lock)
    },
    getCoins() {
      var load = layer.load();
      this.token = window.localStorage.getItem("token") || "";
      this.$http({
        url: "/api/wallet/info",
        method: "get",
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(load);
        if (res.data.type == "ok") {
          this.coins = res.data.message.legal.balance;
        }
      });
    },
    init() {
      var load = layer.load();
      var that = this;
      this.$http({
        url: "/api/" + "wallet/detail",
        method: "get",
        params: {
          currency_id: this.currencyId,
          // type: "legal"
        },
        headers: { Authorization: that.token }
      })
        .then(res => {
          layer.close(load);
          if (res.data.type == "ok") {
            var msg = res.data.message;
            that.legal_name = msg.currency_name;
            that.legal_balance = msg.legal_balance;
            that.lock_legal_balance = msg.lock_legal_balance;
            that.legalPrice = msg['rate_balance'];
          } else {
            layer.msg(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取记录
    getLog(refresh,is_lock) {
      var load = layer.load();
      if(refresh){
        this.page = 0;
      }
      this.$http({
        url: "/api/log/user_info",
        method: "post",
        data: {
          type: "lever",
          currency_id: this.currencyId,
          page: this.page,
          is_lock:is_lock
        },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(load);
        if (res.data.type == "ok") {
          if(refresh){
            this.recData = res.data.message.list;
          } else {

            this.recData = this.recData.concat(res.data.message.list);
          }
          if (res.data.message.list.length != 0) {
            this.page+=1;
            this.moreLog = this.$t('more');
          } else {
            this.moreLog = this.$t('nomore')
          }
        }
      });
    },
    transfer(){
        if(this.transferPms.number == ''){
            layer.msg(this.$t('lay.huanum'));return;
        }else if(this.transferPms.number<= 0){
            layer.msg('划转数量必须大于0');return;
        }
         else {
            let data = {};
            data.number = this.transferPms.number;
            
            data.currency_id = this.$refs.select.value;
            // data.type = this.transferPms.type;
            if(this.transferPms.type == 2){
                data.from = 'change';
                data.to = 'legal';
            }else{
                data.from = 'legal';
                data.to = 'change';
            }
            
            // console.log(data);return;
            var load = layer.load();
            this.$http({
                url:'/api/wallet/transfer',
                method:'post',
                data:data,
                headers: { 'Authorization': this.token }
            }).then(res => {
                layer.close(load);
                this.transferPms.number = '';
                layer.msg(res.data.message)
                if(res.data.type == 'ok'){
                    this.init();
                    this.getLog(true,this.is_lock);
                }
            })
        }
    },
    //加载更多
    more() {
      this.page++;
      this.moreLog = this.$t('loading');
      this.getLog('',this.is_lock);
    }
  }
};
</script>
<style scoped lang='scss'>
.lock{
  padding-bottom: 5px;
}
.actives{
  border-bottom: 2px solid #d45858;
  color: #d45858;
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
