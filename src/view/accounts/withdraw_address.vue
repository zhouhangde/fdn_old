<template>
  <div class="box clr-part mt45">
    <indexHeader></indexHeader>
    <div class="account">
      <div class="topcontent ft16 txt_blue bgf8 bg-part flex between">
        <span>
          <span class>{{$t('account.assets')}}></span> {{$t('account.upaddress')}}
        </span>
        <span @click="back" class="back">{{$t('back')}}</span>
      </div>
      <div class="content">
        <div class="con_box bgf8 bg-part">
          <div class="contentBK 1 pdlr20 pdtb20 ft12">
            <div class="flex alcenter">
              <span class="w10 mr20">{{$t('market.currency')}}</span>
              <span class="flex1 mr20">{{$t('account.whaddress')}}</span>
              <span class="flex1 mr20" v-if="showTips">{{$t('account2.address')}} ({{$t('register.xuan')}})</span>
              <span class="flex1">{{$t('set.remarks')}}</span>
            </div>
            <div class="mt10">
              <div class="flex alcenter">
                <el-select v-model="addName" placeholder="请选择" @change="setCoin">
                <el-option
                  v-for="item in coins"
                  :key="item.name"

                  :value="item">{{item.name}}
                </el-option>
              </el-select>
                <!-- <select name id class="w10 mr20" v-model="addId" @change="setCoin">
                  <option :value="$t('market.currency')">{{$t('market.currency')}}</option>
                  <option
                    :value="item.thisid"
                    v-for="(item,index) in coins"
                    :key="index"
                  >{{item.name}}</option>
                </select> -->
                <input type="text" class="flex1 mr20" :placeholder="$t('wAddress.enterAddress')" v-model="address">
                <input
                  type="text"
                  class="flex1 mr20"
                  :placeholder="$t('wAddress.enterMemo')"
                  v-model="tips"
                  v-if="showTips"
                >
                <input type="text" class="flex1" :placeholder="$t('wAddress.enterMark')" v-model="notes">
              </div>
              <!-- <p class="mt10 ft14">{{$t('wAddress.tips')}}</p> -->
              <div class="add">
                <div class="baseBtn redBg" @click="addAddress">{{$t('set.add')}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="con_box mt15 bg-part">
          <div class="account_title ttBk flex bg-part">
            <div class="ml20">{{$t('wAddress.addressList')}}</div>
          </div>
          <div class="contentBK 1 pdlr20 pdtb20 ft12 bgf8 rec bg-part">
            <div class="flex alcenter">
              <span class="flex1">{{$t('market.currency')}}</span>
              <span class="flex1 tc">{{$t('account.whaddress')}}</span>
              <span class="flex1 tc" v-if="show_m">{{$t('wAddress.memo')}}</span>
              <span class="flex1 tc">{{$t('set.remarks')}}</span>
              <span class="flex1 tr">{{$t('do')}}</span>
            </div>
            <div class="mt10" v-for="(item,index) in addressList" :key="index">
              <div class="flex alcenter">
                <span class="flex1">{{listCoin}}</span>
                <span class="flex1 tc">{{item.address}}</span>
                <span class="flex1 tc" v-if="show_m">{{item.memo}}</span>
                <span class="flex1 tc">{{item.notes}}</span>
                <p class="flex1 tr">
                  <span class="flex1 cancel" @click="delAddress(item.thisid,index)">{{$t('wAddress.del')}}</span>
                  <span class="flex1 cancel" @click="modify(item.thisid,index)">{{$t('security.set')}}</span>
                </p>
              </div>
            </div>
            <div class="none color1 tc" v-if="!addressList.length" style="padding: 40px 0">{{$t('tpc.nodata')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--修改提示框-->
    <div class="shadow flex alcenter center" v-if="isshow">
      <div class="mask">
        <div class="flex center alcenter mb30">
          <span class="w20 ft14">{{$t('account.whaddress')}}:</span>
          <input type="text" class="flex1 mr20 ml10" :placeholder="$t('wAddress.enterAddress')" v-model="modify_address">
        </div>
        <div class="flex center alcenter">
          <span class="w20 ft14">{{$t('set.remarks')}}:</span>
          <input type="text" class="flex1 mr20 ml10" :placeholder="$t('wAddress.enterMark')" v-model="modify_notes">
        </div>
        <div class="flex center alcenter mt20"  v-if="showTips">
          <span class="w20 ft14">{{$t('wAddress.memo')}} ({{$t('register.xuan')}}):</span>
          <input type="text" class="flex1 mr20 ml10" :placeholder="$t('wAddress.enterMemo')" v-model="modify_memo">
        </div>
        <p class="flex alcenter around btns">
          <button id="cancel" @click="isshow = false">{{$t('legal.ceil')}}</button>
          <button id="confirm" @click="confirmBtn">{{$t('confirm')}}</button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import indexHeader from "@/view/indexHeader";
export default {
  name: "finanrec",
  data() {
    return {
      token: "",
      lang: "",
      coins: [],
      nowCoin: "",
      list: [],
      address: "",
      notes: "",
      addName:"",
      addId: this.$t('market.currency'),
      addressList: [],
      modify_address: "",
      modify_notes: "",
      isshow: false,
      modifyId: "",
      tips: "", //地址标签
      showTips: false,
      show_m:false,
      modify_memo:'',
      listCoin:''
    };
  },
  components: {
    indexHeader
  },
  created() {
    this.getCoins();
  },
  methods: {
    //返回
    back() {
      this.$router.back(-1);
    },
    getCoins() {
      this.token = localStorage.getItem("token") || "";
      //console.log(this.token);
      var i = layer.load();
      this.$http({
        url: "/api/take/list",
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        //console.log(res);
        if (res.data.type == "ok" && res.data.message.length != 0) {
          this.coins = res.data.message;
        }
      });
    },
    setCoin(e) {
      //console.log(e)
      var that = this;
      that.addName=e.name;
      that.addId=e.thisid;
      if (this.addId != this.$t('market.currency')) {
        // let index = e.target.selectedIndex;
        // let opt = e.target.querySelectorAll("option")[index];
        this.nowCoin = that.addName;
        // //console.log(opt.text)
        this.getList();
      }
      //console.log(this.coins, this.addId);
      $.each(this.coins, function(k, v) {
        // //console.log(v.thisid, that.addId);
        if (that.addName == v.name) {
          // //console.log("ccc");
          if (v.memo_show == "1") {
            // //console.log("aaa");
            that.showTips = true;
          }else{
            that.showTips = false;
          }
        }
      });
    },
    getList() {
      var that = this;
      this.token = localStorage.getItem("token") || "";
      var i = layer.load();
      this.$http({
        url: "/api/take/list",
        // method:'post',
        // data:{currency:this.addId},
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        if (res.data.type == "ok") {
          this.list = res.data.message;
          $.each(this.list, function(k, v) {
            if (v.name == that.addName) {
              that.listCoin = v.chaint_name;
              that.nowCoin = v.name;
              if(v.memo_show == '1'){
                that.show_m = true;
              }else{
                 that.show_m = false;
              }
              that.addressList = v.address;
            }
          });
        } else {
          this.list = [];
        }
      });
    },
    //删除地址
    delAddress(id, index) {
      var i = layer.load();
      this.$http({
        url: "/api/take/delete_address",
        method: "post",
        data: { id: id },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        // //console.log(res);
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          this.addressList.splice(index, 1);
        }
      });
    },
    //修改地址
    modify(id, index) {
      this.modifyId = id;
      this.isshow = true;
      $.each(this.coins, function(k, v) {
        //console.log(v.thisid, id);
        if (id == v.thisid) {
          //console.log("ccc");
          if (v.memo_show == "1") {
            //console.log("aaa");
            that.showTips = true;
          }else{
            that.showTips = false;
          }
        }
      });
    },
    //确认修改
    confirmBtn() {
      var that = this;
      if (this.modify_address == "") {
        layer.msg(this.$t('wAddress.enterAddress'));
        return;
      }
      var reg_kong = /\s/; //空格正则
      if(reg_kong.test(this.modify_address)){
        layer.msg(this.$t('wAddress.nospace'));
        return;
      }
      if (this.modify_notes == "") {
        layer.msg(this.$t('set.premarks'));
        return;
      }else {
        var data = {
          id: this.modifyId,
          chaint_id: this.addId,
          address: this.modify_address,
          notes: this.modify_notes
        };
        //正则
      var num_reg = /^[0-9]*$/; //数字
      var let_reg = /^[A-Za-z]+$/  //字母
      var reg = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/; //字母加数字
      var isNext = true;
        //console.log(this.showTips)
        if (this.showTips&&this.modify_memo) {    //正则验证eos和bts地址标签 
          // if (this.modify_memo == '') {
          //   layer.msg(this.$t('wAddress.enterMemo'));
          //   return;
          // } 
          var reg_kong = /\s/; //空格正则
          if(reg_kong.test(this.modify_memo)){
            layer.msg(this.$t('wAddress.nospace02'));
            return;
          }
          if(that.modify_memo){
            $.each(this.coins,function(k,v){
              if(v.thisid == that.addId){
                if(v.name == 'eos'|| v.name == 'bts'){
                if(!reg.test(that.modify_memo)&&!num_reg.test(that.modify_memo)&&!let_reg.test(that.modify_memo)){
                layer.msg(that.$t('wAddress.nospace03'));
                isNext = false;
              }else{
                isNext = true;
              }
                }
              }
            })
            }
            if(that.modify_memo){
              $.each(that.coins,function(k,v){
              if(v.thisid == that.addId){
                if(v.name == 'xrp'){  //正则验证码xrp地址标签
                  if(!num_reg.test(that.modify_memo)){
                    layer.msg(that.$t('wAddress.allNum'));
                    isNext = false;
                  }else{
                    isNext = true;
                  }
                }  
              }
            })
            }
            if(!isNext){
              return;
            }
          
        }
        data.memo = this.modify_memo||'';   //需要传标签的传入地址标签
        var i = layer.load();
        this.$http({
          url: "/api/take/update_address",
          method: "post",
          headers: {
            Authorization: this.token,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          data:data
        }).then(res => {
          layer.close(i);
          //console.log(res);
          this.isshow = false;
          layer.msg(res.data.message);
          this.modify_address = "";
          this.modify_notes = "";
          this.modify_memo = "";
          if (res.data.type == "ok") {
            this.getList();
          }
        });
      }
    },
    //添加地址
    addAddress() {
      var isNext = true;
      if (this.addId == this.$t('market.currency')) {
        layer.msg(this.$t('caiwu.selCu'));
        return;
      }
      if (this.address == "") {
        //console.log(this.addId);

        layer.msg(this.$t('wAddress.enterAddress'));
        return;
      }
      var reg_kong = /\s/; //空格正则
      if(reg_kong.test(this.address)){
        layer.msg(this.$t('wAddress.nospace'));
        return;
      }
      //正则
      var num_reg = /^[0-9]*$/; //数字
      var let_reg = /^[A-Za-z]+$/  //字母
      var reg = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/; //字母加数字
      var that = this;
      if(that.tips){
      $.each(this.coins,function(k,v){
        if(v.thisid == that.addId){
          if(v.name == 'eos'|| v.name == 'bts'){
          if(!reg.test(that.tips)&&!num_reg.test(that.tips)&&!let_reg.test(that.tips)){
          layer.msg(that.$t('wAddress.nospace03'));
          isNext = false;
        }else{
          isNext = true;
        }
          }
        }
      })
      }
      if(that.tips){
         $.each(that.coins,function(k,v){
        if(v.thisid == that.addId){
          if(v.name == 'xrp'){
            if(!num_reg.test(that.tips)){
              layer.msg(that.$t('wAddress.allNum'));
              isNext = false;
            }else{
              isNext = true;
            }
          }  
        }
      })
      }
      
      //console.log(isNext)
      if(!isNext){
        return;
      }
      if (this.notes == "") {
        layer.msg(this.$t('set.premarks'));
        return;
      }
      // if (this.showTips) {
      //   if(this.tips == ''){
      //      layer.msg("请输入地址标签");
      //     return;
      //   }
        
      // } 
         var data = {
            chaint_id: this.addId,
            address: this.address,
            notes: this.notes
          }
          if (this.showTips) {
          //console.log('aaaa')
          data.memo = this.tips;
        }

        var i = layer.load();
        this.$http({
          url: "/api/take/add_address",
          method: "post",
          headers: {
            Authorization: this.token,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          data: data
        }).then(res => {
          layer.close(i);
          //console.log(res);
          layer.msg(res.data.message);
          if (res.data.type == "ok") {
            this.address = "";
            this.notes = "";
            this.getList();
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.shadow {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.mask {
  width: 60%;
  padding: 50px 0;
  background: #fff;
  margin-top: -200px;
  border-radius: 5px;
}
.mask > div {
  padding: 0 70px;
}
.btns {
  padding: 30px 300px 0;
}
.btns button {
  padding: 10px 20px;
  background: none;
  color: #fff;
  border-radius: 2px;
  cursor: pointer;
}
#cancel {
  background: #989999;
}
#confirm {
  background: #d45858;
}
.cancel {
  cursor: pointer;
  color: #d45858;
}
.box .account {
  width: 1200px;
  margin: 0 auto 82px;
  margin-top: 30px;
}
.topcontent {
  padding: 22px 30px;
  margin-bottom: 20px;
  //background-color: #1a2330;
  border-radius: 5px;
}
.account_title {
  padding: 15px 0px;
}
select {
  //background-color: transparent;
  padding: 10px;
  //   color: #c7cce6;
  font-size: 14px;
  border-radius: 3px;
  border: 1px solid #ccc;
}
select.ft14 {
  font-size: 14px;
}
select > option {
  padding: 10px 0;
  //background-color: transparent;
}
input {
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  //   color: #c7cce6;
  border-radius: 3px;
  //background-color: transparent;
  outline: none;
  color: #333 !important;
}
.add {
  text-align: right;
  margin-top: 20px;
}
.add .baseBtn {
  width: 200px;
}
.rec {
  min-height: 400px;
}
.back {
  cursor: pointer;
}
.el-select{
    width: 10%!important;
    margin-right: 20px!important;
}
</style>


