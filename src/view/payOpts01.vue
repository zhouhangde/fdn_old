<template>
    <div id="pay-opts">
      <p>{{$t('set.msgcer')}}</p>
      <div class="tips">
        <p>{{$t('account.notice')}}：</p>
        <p class="ft14 msg">{{$t('set.turemsg')}}</p>
      </div>
        <div class="inp-item">
            <div>{{$t('set.tname')}}</div>
            <input type="text" class="请输入真实姓名" v-model="name">
        </div>
        <div class="inp-item">
            <div>{{$t('set.kname')}}</div>
            <!-- <input type="text" class="请输入开户行名称" v-model="bankName"> -->
            <select class="select_bank" v-model="bank_id">
              <option value="" disabled>请选择</option>
              <option :value="item.bank_id" v-for="(item, index) in bankList" :key="index">{{item.bank_name}}</option>
            </select>
        </div>
         <div class="inp-item">
            <div>{{$t('set.bank_address')}}</div>
            <input type="text" class="请输入开户行地址" v-model="bank_address">
        </div>
        <div class="inp-item">
            <div>{{$t('set.cnum')}}</div>
            <input type="number" class="请输入银行卡号" v-model="bankNum">
        </div>
        <div class="inp-item">
            <div>{{$t('set.ailipay_nickname')}}</div>
            <input type="text" class="请输入支付宝昵称" v-model="ali_nickname">
        </div>
        <div class="inp-item">
            <div>{{$t('set.ailipay')}}</div>
            <input type="text" class="请输入支付宝账号" v-model="ali">
        </div>
        <div class="inp-item">
            <div>{{$t('set.wename')}}</div>
            <input type="text" class="请输入微信昵称" v-model="weChatName">
        </div>
        <div class="inp-item">
            <div>{{$t('set.wenum')}}</div>
            <input type="text" class="微信账号" v-model="weChatAccount">
        </div>
        <div class="btn bgRed blue_bg" @click="add">
            {{$t('confirm')}}
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      name: "",
      bankName: "",
      bank_id:'',
      bankNum: "",
      ali: "",
      weChatAccount: "",
      weChatName: "",
      bankList:[],
      bank_address:'',
      ali_nickname:''
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    if(this.token == ''){
      this.$router.push('/components/login');
    }
    this.getInfo();
    this.getbankList();
  },
  methods: {
    //获取银行列表
    getbankList(){
       this.$http({
         url:'/api/bank/list'
       }).then(res=>{
          if(res.data.type == 'ok'){
            this.bankList = res.data.message;
          }
       })
    },
    getInfo() {
      this.$http({
        url: "/api/user/cashier_info",
        method: "get",
        headers: { 'Authorization': this.token},
        
      }).then(res => {
        if ((res.data.type == "ok")) {
            if(res.data.message != null){
                let data = res.data.message;
                this.name = data.real_name;
                this.bankName = data.bank_name;
                this.bankNum = data.bank_account;
                this.ali = data.alipay_account;
                this.weChatAccount = data.wechat_account;
                this.weChatName = data.wechat_nickname;
                this.ali_nickname = data.alipay_nickname;
                this.bank_address = data.bank_address;
                this.bank_id = data.bank_id;
            }

        }
      });
    },
    add() {
        if(this.name == ''){
            layer.mag(this.$t('lay.truename'));return;
        }
      this.$http({
        url: "/api/user/cashier",
        method: "post",
        data: {
          real_name: this.name,
          bank_id: this.bank_id,
          bank_account: this.bankNum,
          alipay_account: this.ali,
          wechat_nickname: this.weChatName,
          wechat_account: this.weChatAccount,
          bank_address:this.bank_address,
          alipay_nickname:this.ali_nickname
        },
        headers: { 'Authorization': this.token,'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', }
      }).then(res => {
          layer.msg(res.data.message)
      })
    }
  }
};
</script>

<style lang='scss'>

#pay-opts {
  .select_bank{
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
  width: 620px;
  margin: 0 auto;
  > .inp-item {
    position: relative;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    padding-left: 160px;
    height: 42px;
    > div {
      position: absolute;
      top: 0;
      left: 0;
      border-right: 1px solid #ddd;
      width: 160px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #f8f8f8;
    }
    > input {
      display: block;
      padding: 0 20px;
      width: 100%;
      line-height: 40px;
    }
  }
  .btn {
    margin: 30px auto;
    width: 200px;
    line-height: 40px;
    text-align: center;
    background: #563BD1;
    color: #fff;
    cursor: pointer;
  }
  .tips{
    padding: 18px 15px;
    margin: 20px 0;
    border: 1px solid #eee;
    background: #F9FCFF;
  }
  .msg{
    line-height: 45px;
  }
}
</style>
