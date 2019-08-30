<template>
  <div class="box clr-part mt45">
    <indexHeader></indexHeader>
    <div class="account">
      <div class="topcontent ft16 txt_blue bgf8 bg-part flex between">
        <span>
          <span class>资产></span> 提币地址管理
        </span>
        <span @click="back" class="back">返回</span>
      </div>
      <div class="content">
        <div class="con_box bgf8 bg-part">
          <div class="contentBK 1 pdlr20 pdtb20 ft12">
            <div class="flex alcenter">
              <span class="w10 mr20">币种</span>
              <span class="flex1 mr20">提币地址</span>
              <span class="flex1 mr20" v-if="showTips">地址标签</span>
              <span class="flex1">备注</span>
            </div>
            <div class="mt10">
              <div class="flex alcenter">
                <select name id class="w10 mr20" v-model="addId" @change="setCoin">
                  <option value="币种">币种</option>
                  <option
                    :value="item.thisid"
                    v-for="(item,index) in coins"
                    :key="index"
                  >{{item.name}}</option>
                </select>
                <input type="text" class="flex1 mr20" placeholder="请输入提币地址" v-model="address">
                <input
                  type="text"
                  class="flex1 mr20"
                  placeholder="请输入地址标签"
                  v-model="tips"
                  v-if="showTips"
                >
                <input type="text" class="flex1" placeholder="请输入备注" v-model="notes">
              </div>
              <p class="ft14 ptb10">温馨提示：USDT请使用btc币种添加地址，ERC20代币请使用ETH地址添加</p>
              <div class="add">
                <div class="baseBtn redBg" @click="addAddress">添加</div>
              </div>
            </div>
          </div>
        </div>
        <div class="con_box mt15 bg-part">
          <div class="account_title ttBk flex bg-part">
            <div class="ml20">地址列表</div>
          </div>
          <div class="contentBK 1 pdlr20 pdtb20 ft12 bgf8 rec bg-part">
            <div class="flex alcenter">
              <span class="flex1">币种</span>
              <span class="flex1 tc">提币地址</span>
              <span class="flex1 tc" v-if="show_m">地址标签</span>
              <span class="flex1 tc">备注</span>
              <span class="flex1 tr">操作</span>
            </div>
            <div class="mt10" v-for="(item,index) in addressList" :key="index">
              <div class="flex alcenter">
                <span class="flex1">{{nowCoin}}</span>
                <span class="flex1 tc">{{item.address}}</span>
                <span class="flex1 tc" v-if="show_m">{{item.memo}}</span>
                <span class="flex1 tc">{{item.notes}}</span>
                <p class="flex1 tr">
                  <span class="flex1 cancel" @click="delAddress(item.thisid,index)">删除</span>
                  <span class="flex1 cancel" @click="modify(item.thisid,index)">修改</span>
                </p>
              </div>
            </div>
            <div class="none color1 tc" v-if="!addressList.length" style="padding: 40px 0">暂无记录</div>
          </div>
        </div>
      </div>
    </div>
    <!--修改提示框-->
    <div class="shadow flex alcenter center" v-if="isshow">
      <div class="mask">
        <div class="flex center alcenter mb30">
          <span class="w15">提币地址:</span>
          <input type="text" class="flex1 mr20 ml10" placeholder="请输入提币地址" v-model="modify_address">
        </div>
        <div class="flex center alcenter">
          <span class="w15">备注:</span>
          <input type="text" class="flex1 mr20 ml10" placeholder="请输入备注" v-model="modify_notes">
        </div>
        <p class="flex alcenter around btns">
          <button id="cancel" @click="isshow = false">取消</button>
          <button id="confirm" @click="confirmBtn">确认</button>
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
      addId: "币种",
      addressList: [],
      modify_address: "",
      modify_notes: "",
      isshow: false,
      modifyId: "",
      tips: "", //地址标签
      showTips: false,
      show_m:false
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
      var that = this;
      if (this.addId != "币种") {
        let index = e.target.selectedIndex;
        let opt = e.target.querySelectorAll("option")[index];
        this.nowCoin = opt.text;
        this.getList();
      }
      //console.log(this.coins, this.addId);
      $.each(this.coins, function(k, v) {
        //console.log(v.thisid, that.addId);
        if (that.addId == v.thisid) {
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
            if (v.thisid == that.addId) {
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
    },
    //确认修改
    confirmBtn() {
      if (this.modify_address == "") {
        layer.msg("请入提币地址");
        return;
      }
      if (this.modify_notes == "") {
        layer.msg("请输入备注信息");
        return;
      }
      if (this.showTips) {
        layer.msg("请输入地址标签");
        return;
      } else {
        var i = layer.load();
        var data = {
          id: this.modifyId,
          chaint_id: this.addId,
          address: this.modify_address,
          notes: this.modify_notes
        };
        //console.log(showTips)
        if (this.showTips) {
          //console.log('aaaa')
          data.memos = this.tips;
        }
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
          if (res.data.type == "ok") {
            this.getList();
          }
        });
      }
    },
    //添加地址
    addAddress() {
      if (this.addId == "币种") {
        layer.msg("请选择币种");
        return;
      }
      if (this.address == "") {
        //console.log(this.addId);

        layer.msg("请输入提币地址");
        return;
      }
      if (this.notes == "") {
        layer.msg("请输入备注信息");
        return;
      }
      if (this.showTips) {
        if(this.tips == ''){
           layer.msg("请输入地址标签");
          return;
        }
        
      } 
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
  padding: 0 100px;
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
</style>


