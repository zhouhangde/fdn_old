<template>
    <div class="cfc_wrap">
        <div class="flex balance-lock" style="justify-content:space-between">
            <div>BHC{{$t('cfc.balance')}}： {{balance}}</div>
            <div>BHC{{$t('account.freezes')}}： {{lock}}</div>
        </div>
        <div class="inp-item">
            <div>{{$t('cfc.account')}}</div>
            <input type="text" :placeholder="$t('cfc.pla_account')" v-model="account">
        </div>
        <div class="inp-item">
            <div>{{$t('cfc.num')}}</div>
            <input type="number" :placeholder="$t('cfc.pla_num')" v-model="num">
        </div>
        <div class="btn bgRed blue_bg" @click="confirm">
            {{$t('confirm')}}
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            account:'',
            num:'',
            balance:'--',
            lock:'--'
        }
    },
    created() {
    this.token = window.localStorage.getItem("token") || "";
    if(this.token == ''){
      this.$router.push('/components/login');
    } else {
        this.getMoney();
    }
  },
    methods:{
        getMoney(){
            this.$http({
                url:"/api/wallet/bhc_balance",
                headers:{Authorization:this.token}
            }).then(res => {
                if(res.data.type == 'ok'){
                    let msg = res.data.message;
                    this.balance = msg.balance;
                    this.lock = msg.lock;
                }
            })
        },
        confirm(){
            if(this.account == ''){
                layer.msg(this.$t('cfc.pla_account'));
                return;
            }
            if(this.num == ''){
                layer.msg(this.$t('cfc.pla_num'));
                return;
            }
            let  i = layer.load();
            this.$http({
                url:'api/wallet/to_cfc',
                method:'POST',
                data:{
                   account:this.account,
                   number:this.num
                },
                headers: { 'Authorization': this.token}, 
            }).then(res=>{
                   layer.close(i);
                    layer.msg(res.data.message);
                    if(res.data.type == 'ok'){
                        this.getMoney();
                        this.account = '';
                        this.num = ''
                    }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.balance-lock{
    justify-content: space-between;
    padding-bottom: 15px;
}
.cfc_wrap{
    width: 80%;
    margin: 50px auto;
    background: #fff;
    padding: 50px 20%;
    min-height: 700px;
}
  .inp-item {
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
    margin: 50px auto;
    width: 200px;
    line-height: 40px;
    text-align: center;
    background: #563BD1;
    color: #fff;
    cursor: pointer;
  }
</style>

