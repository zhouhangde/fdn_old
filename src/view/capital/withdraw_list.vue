<template>
  <div class="wrap clr-part">
    <ul>
      <li class="flex alcenter ptb10 ft14 bdb">
        <span class="flex1 tl">{{$t('status')}}</span>
        <span class="flex1 tc">{{$t('withdrawList.submitTime')}}</span>
        <span class="flex1 tc">{{$t('withdrawList.checkTime')}}</span>
        <span class="flex1 tc">{{$t('withdrawList.tibiNum')}}</span>
        <span class="flex1 tc">{{$t('account2.explain')}}</span>
        <span class="flex1 tc">{{$t('withdrawList.hash')}}</span>
        <span class="flex1 tr">{{$t('do')}}</span>
      </li>
      <li class="flex alcenter ptb10 ft14 list" v-for="item in list" :key="item.thisid">
        <span class="flex1 tl" v-if="item.status == 0">{{$t('withdrawList.applying')}}</span>
        <span class="flex1 tl" v-if="item.status == 1">{{$t('withdrawList.agreeWait')}}</span>
        <span class="flex1 tl" v-if="item.status == 2">{{$t('withdrawList.lianSucc')}}</span>
        <span class="flex1 tl" v-if="item.status == 3">{{$t('withdrawList.lianFail')}}</span>
        <span class="flex1 tl" v-if="item.status == 4">{{$t('withdrawList.bohui')}}</span>
        <span class="flex1 tl" v-if="item.status == 5">{{$t('legal.ceil')}}</span>
        <span class="flex1 tl" v-if="item.status == 6">{{$t('withdrawList.zhanSucc')}}</span>
        <span class="flex1 tc">{{item.create_time || '--'}}</span>
        <span class="flex1 tc">{{item.confirm_time || '--'}}</span>
        <span class="flex1 tc">{{item.number || '--'}} {{item.currency_name}}</span>
        <span class="flex1 tc">{{item.notes || '--'}}</span>
        <span class="flex1 tc hash">{{item.hash || '--'}}</span> 
        <span v-if="item.status == 0" class="flex1 tr redColor curPer" @click="cancel(item.thisId)">{{$t('revoke')}}</span>
        <span v-else class="flex1 tr redColor curPer">--</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http({
        url: "/api/take/take_list",
        headers: { Authorization: localStorage.getItem("token") }
      }).then(res => {
        if (res.data.type == "ok") {
          this.list = res.data.message;
        }
      });
    },
    cancel(id){
        var i = layer.load();
        this.$http({
        url: "/api/take/cancel_take",
        method:'get',
        params:{
          id:id
        },
        headers: { Authorization: localStorage.getItem("token") }
      }).then(res => {
          layer.close(i)
        layer.msg(res.data.message);
        if(res.data.type == 'ok'){
            location.reload();
        }
      });
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 90%;
  margin: 50px auto;
  padding: 30px 20px;
  background: #fff;
  min-height: 800px;
}
.list:nth-child(even){
    background: #fafafa;
}
.hash{
  word-break: break-all;
}
</style>
