<template>
  <div id="legal-pay" class="bg-main clr-part">
    
    <div class="title bg-part ft16 flex between alcenter">
      <span v-if="msg.status == 1&&type =='buy'">{{$t('legal.payplease')}}</span>
      <div v-if="msg.status == 3">{{$t('legal.ordercomplete')}}</div>
      <div v-if="msg.status == 4">{{$t('legal.orderceiled')}}</div>
      <div v-if="msg.status == 2&&type =='buy'">{{$t('legal.payedwait')}}</div>
      
      <span v-if="msg.status == 1 && type =='buy'">{{msg.total_price}} {{msg.money_short}}</span>
      <!-- <span class="ft14 curPer" @click="connect">联系对方</span> -->
    </div>
    <div class="info bg-part ft14">
      <div class="flex">
        <span>{{$t('legal.tprice')}}：</span>
        <span>{{msg.price}} {{msg.money_short}}</span>
      </div>
      <div class="flex">
        <span>{{$t('legal.tnumber')}}：</span>
        <span>{{msg.number}}{{msg.currency_name}}</span>
      </div>
      <div class="flex">
        <span>{{$t('legal.ordertime')}}：</span>
        <span>{{msg.create_time}}</span>
      </div>
      <!--收款方式--->
      <!-- <div class="flex" v-if="msg.status == 1||msg.status == 2&&type =='buy'">
        <span>{{$t('legal.cardnum')}}：</span>
        <span>{{msg.bank_name}}:{{msg.bank_account}}</span>
      </div>
      <div class="flex" v-if="msg.status == 1||msg.status == 2&&type =='buy'">
        <span>{{$t('legal.bankName')}}：</span>
        <span>{{msg.bank_address}}</span>
      </div>
      <div class="flex" v-if="msg.status == 1||msg.status == 2&&type =='buy'">
        <span>{{$t('legal.wechat')}}：</span>
        <span>{{msg.wechat_account}}</span>
      </div>
      <div class="flex" v-if="msg.status == 1||msg.status == 2&&type =='buy'">
        <span>{{$t('legal.alipay')}}：</span>
        <span>{{msg.alipay_account}}</span>
      </div> -->
      <div v-for="(itm,idx) in msg.user_cashier" :key="idx" style="display:block">
        <div class="flex">
          <span>{{$t('legaltrade.paytype')}}：</span>
           <span>{{itm.cashier_type}}</span>
        </div>
        <div class="flex" v-if="itm.bank_name">
          <span>{{$t('legal.bankName')}}：</span>
           <span>{{itm.bank_name}}</span>
        </div>
        <div class="flex" v-if="itm.bank_name">
          <span>{{$t('legaltrade.zhihang')}}：</span>
           <span>{{itm.address}}</span>
        </div>
        <div class="flex">
          <span>{{$t('auth.name')}}：</span>
           <span>{{itm.name}}</span>
        </div>
        <div class="flex">
          <span>{{$t('accounts')}}：</span>
           <span>{{itm.account}}</span>
        </div>
        <div class="flex">
           <span>{{$t('legaltrade.money_code')}}：</span>
           <img class="pic" :src="itm.pic" @click="show_pic(itm.pic)">
        </div>
        
      </div>
      <!-- <div class="flex">
        <span>{{type == 'buy'?$t('legal.shoper'):$t('legal.buyer')}} {{$t('legal.account')}}：</span>
        <span v-if="msg.type == 'buy'">{{msg.user_cash_info.real_name || '无'}}</span>
      <router-link v-if="msg.type=='buy'" :to="{path:'/legalSeller',query:{sellerId:msg.seller_id}}" tag="span">{{msg.seller_name}}</router-link>
      </div> -->
      <div class="flex">
        <span>{{type == 'buy'?$t('legal.shoper'):$t('legal.buyer')}} {{$t('legal.phone')}}：</span>
        <!-- <span v-if="msg.user_cash_info">{{msg.user_cash_info.account_number}}</span> -->
        <span >{{msg.phone}}</span>
      </div>
      <div class="flex">
          <span>{{$t('legal.reference')}}：</span>
           <span>{{msg.thisid}}</span>
        </div>
      
      
      <div class="btns flex" v-show="msg.status==1&&type=='buy'">
        <div class="btn" @click="showCancel = true">{{$t('legal.orderceil')}}</div>
        <div class="btn blue_bg" @click="showConfirm = true">{{$t('legal.mypayed')}}</div> <span>(请您尽快在15分钟内确认操作)</span>
      </div>
      <!-- <div class="btns flex" v-show="msg.status==3&&msg.type=='sell'">
        <div class="btn" @click="">确认收款</div>
      </div> -->
    </div>
    <div class="cancel-box" v-if="showCancel">
      <div class="content">
        <div>{{$t('legal.ceilorder')}}</div>
        <div>{{$t('legal.notceil')}}</div>
        <!-- <div>
          <input type="checkbox" v-model="hasPay" id="haspay">
          <label for="haspay">我还没有付款给对方</label>
        </div> -->
        <div class="yes-no flex">
          <div @click="showCancel = false">{{$t('legal.ceil')}}</div>
          <div @click="cancel">{{$t('legal.confirm')}}</div>
        </div>
      </div>
    </div>
    <div class="confirm-box" v-if="showConfirm">
      <div class="content">
        <div>{{$t('legal.paysure')}}</div>
        <div>{{$t('legal.youpayed')}}</div>
        <div>{{$t('legal.freeze')}}</div>
        <div class="yes-no flex">
          <div @click="showConfirm = false">{{$t('legal.ceil')}}</div>
          <div @click="confirm">{{$t('legal.confirm')}}</div>
        </div>
      </div>
    </div>
    <!--预览图片--->
    <div class="fixed w100 flex alcenter center shadow" v-if="showPic" @click="showPic = false">
       <img class="previewImg" :src="previewImg">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: {type:'buy'},
      token: "",
      showConfirm: false,
      showCancel: false,
      hasPay: false,
      id: "",
      type: "",
      // status: -1
      previewImg:'',
      showPic:false
    };
  },
  created() {
    var token = window.localStorage.getItem("token") || "";
    if (token) {
      this.token = token;
      this.id = this.$route.query.id;
      this.type = this.$route.query.type;
      //console.log(this.$route.query.id, this.id);
      this.getData();
    }
  },
  methods: {
    getData() {
      var i = layer.load();
      this.$http({
        url: "/api/legal/order_info",
        params: {
          id: this.id
        },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        //console.log(res);
        if (res.data.type == "ok") {
          this.msg = res.data.message;
          this.status = res.data.message.status;
        }
      });
    },
    connect(){
       this.$router.push({path:'/chat',query:{id:this.msg.thisid}})
    },
    cancel() {
      var i = layer.load();
      this.$http({
        url: "/api/legal/cancel",
        method: "post",
        data: { id: this.id },
        headers: { Authorization: this.token }
      })
        .then(res => {
          layer.close(i);
          // //console.log(res);
          layer.msg(res.data.message);
          if (res.data.type == "ok") {
            setTimeout(() => {
              location.reload();
              // this.$router.push('/legalRecord')
            }, 1000);
          }
        })
        .then(() => {
          this.showCancel = false;
        });
    },
    confirm() {
      var i = layer.load();
      this.$http({
        url: "/api/legal/pay",
        method: "post",
        data: { id: this.id },
        headers: { Authorization: this.token }
      })
        .then(res => {
          layer.close(i)
          // //console.log(res);
          layer.msg(res.data.message);
          if (res.data.type == "ok") {
            setTimeout(() => {
              location.reload();
              // this.$router.push('/legalRecord')
            }, 1000);
          }
        })
        .then(() => {
          this.showConfirm = false;
        });
    },
    //预览图片
    show_pic(pic){
        this.previewImg = pic;
        this.showPic = true;
    }
  }
};
</script>

<style lang='scss'>
#legal-pay {
  width: 1200px;
  margin: 50px auto;
  .pic{
    width: 180px;
    height: 180px;
    cursor: pointer;
  }
  > .title {
    background: #f8f8f8;
    margin-bottom: 20px;
    padding: 20px 0;
    // font-size: 20px;
    // line-height: 60px;
    > span {
      padding: 0 30px;
    }
    > div {
      padding: 0 30px 0;
    }
    > span:last-child {
      font-weight: 600;
    }
  }
  > .info {
    background: #f8f8f8;
    padding: 0 30px;
    line-height: 40px;
    
    span:first-child {
      width: 140px;
    }
    > .btns {
      padding: 20px 0;
     
      > div {
         cursor: pointer;
        color: #fff;
        border-radius: 2px;
        padding: 0 16px;
        background: #2e1b85;
        margin-right: 30px;
        font-size: 14px;
      }
      > div:first-child {
        background: #ccc;
        color: #333;
      }
    }
  }
  > .cancel-box,
  > .confirm-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    > .content {
      margin: 200px auto 0;
      border-radius: 2px;
      width: 360px;
      background: #fff!important;
      line-height: 40px;
      text-align: center;
      > div:first-child {
        font-weight: 600;
      }
      > .flex {
        margin-top: 10px;
        border-top: 1px solid #ccc;
        cursor: pointer;
        div {
          width: 50%;
        }
        > div:first-child {
          border-right: 1px solid #ccc;
        }
      }
    }
  }
}
.shadow{
  height: 100%;
  top: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  position: fixed;
}
.shadow img{
  width: 50%;
  max-height: 80%;
}
</style>
