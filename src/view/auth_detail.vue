<template>
  <div id="pay-opts" class="ptb20 w80 relative">
    <div class="bd_d1 ptb20 plr40 mb20" v-for="(item,i) in list" v-if="list.length>0">
      <div class="flex alcenter mb20">
        <span>{{$t('authDetail.payType')}}：</span>
        <span>{{item.type}}</span>
      </div>
      <div class="flex alcenter mb20">
        <span>{{$t('auth.name')}}：</span>
        <span>{{item.name}}</span>
      </div>
      <div class="flex alcenter mb20" v-if="item.type == '银行卡'">
        <span>{{$t('legal.bankName')}}：</span>
        <span>{{item.bank_name}}</span>
      </div>
      <div class="flex alcenter mb20" v-if="item.type == '银行卡'">
        <span>{{$t('legaltrade.zhihang')}}：</span>
        <span>{{item.address}}</span>
      </div>
      <div class="flex alcenter mb20">
        <span>{{$t('accounts')}}：</span>
        <span>{{item.account}}</span>
      </div>
      <div class="flex alcenter mb20"  v-if="item.type != '银行卡'">
        <span>{{$t('legaltrade.money_code')}}：</span>
        <img class="codeImg" :src="item.pic" alt>
      </div>
      <div class="flex alcenter between mb20">
        <span>
          <span>{{$t('set.remarks')}}：</span>
          <span>{{item.info}}</span>
        </span>
        <span type="text" class="ft14 ptb5 plr10 white blue_bg radius3 del" @click="del(item.thisid)">{{$t('wAddress.del')}}</span>
      </div>
    </div>
    <div class="tc ptb50 ft18" v-if="list.length==0">{{$t('authDetail.noreceiveType')}}</div>
    <span class="ft18 back" @click="back">{{$t('back')}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",

      list: []
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    if (this.token == "") {
      this.$router.push("/components/login");
    }
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http({
        url: "/api/user/cashier_info",
        method: "get",
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok") {
          if (res.data.message != null) {
            this.list = res.data.message;
          }
        }
      });
    },
    //删除收款信息
    del(id) {
      this.$http({
        url: "/api/user/delete_cashier",
        method: "post",
        data: { id: id },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          this.getInfo();
        }
      });
    },
    //返回上一步
    back() {
      this.$router.back(-1);
    }
  }
};
</script>
<style scoped>
.codeImg {
  width: 150px;
  height: 150px;
}
.back{
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
.del{
    cursor: pointer;
}
</style>
