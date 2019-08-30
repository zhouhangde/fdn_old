<template>
  <div class="trade clr-part" style>
    <div class="title_box bdb ft14">
      <div class="tabtitle ft14 curPer">
        <!-- <span :class="{active:show == true}">限价交易</span>
        <span :class="{active:show == false}" @click="changeType">市价交易</span>-->
        <span
          v-for="(item,index) in tradetype"
          :class="{active:index==current}"
          @click="changeType(index)"
        >{{item.typetext}}</span>
      </div>
    </div>
    <div>
      <!-- 限价交易 -->
      <div class="content clear ft14" v-if="showItem != 3 && showItem != 2">
        <div class="w50 fl first brcolor bdr-part">
          <div class="ft14">
            <div class="available clear 1" v-if="address.length<=0">
              <span class="redColor curPer" @click="goNext('login')">{{$t('logins')}}</span>
              {{$t('center.or')}}
              <span
                class="redColor curPer"
                @click="goNext('register')"
              >{{$t('registers')}}</span>
              {{$t('center.start')}}
            </div>
            <div class="clear available bdr-part" v-else>
              <span class="fl 1">{{$t('center.available')}} {{user_legal}} {{legal_name}}</span>
              <!-- <span class="fr redColor curPer" @click="goNext('account')">充币</span> -->
            </div>
            <div class="mt40 input-item clear">
              <label>{{$t('center.buyprice')}}</label>
              <input
                class="clr-part bg-main bdr-part"
                type="number"
                v-model="buyPrice"
                min="0"
                @keydown.69.prevent
                :disabled="disabled"
                v-if="!disabled"
                @keyup="buyprice_fixed"
              >
              <input
                class="clr-part bg-main bdr-part"
                type="number"
                v-model="lastPrice02"
                @keydown.69.prevent
                :disabled="disabled"
                v-if="disabled"
              >
              <span>{{legal_name}}</span>
            </div>
            <div class="mt40 input-item clear">
              <label>{{$t('center.buynumber')}}</label>
              <input
                class="clr-part bg-main bdr-part"
                type="number"
                min="0"
                v-model="buyNum"
                @keydown.69.prevent
               
                :placeholder="inpTip"
                @keyup="buynum_fixed"
              >
              <span>{{currency_name}}</span>
            </div>
            <!-- <div class="mt40 input-item clear">
                        <label>交易密码</label>
                        <input class="clr-part bg-main bdr-part" v-model="buyPsw" type="password">
            </div>-->
            <!-- <div class="mt40 input-item clear">
                        <label>资金密码:</label>
                        <input type="password" v-model="buyInfo.pwd" @keydown.69.prevent>
            </div>-->
            <!-- <div class="attion tr 1">范围 (0.000001,20,精度: 0.000001)</div> -->
            <!-- <div class="mt40 input-item clear">
                        <label style="width:25%">交易密码：</label>
                        <input style="width:75%" class="clr-part bg-main bdr-part" type="text">
            </div>-->
            <el-slider
              v-model="value1"
              :min="0"
              :max="100"
              
              :show-tooltip="true"
              :format-tooltip="formatTooltip01"
              
              :disabled="address?current == 0?buyPrice=='':lastPrice02==0?true:false:true"
              @change="changeVal"
            ></el-slider>

            <div class="mt50 1 ft14">{{$t('center.tradetotal')}} {{buyTotal}} {{legal_name}}</div>
            <div
              class="sell_btn curPer mt40 tc greenBack 1 ft14"
              @click="buyCoin"
            >{{$t('center.buyin')}}{{currency_name}}</div>
          </div>
        </div>
        <div class="w50 fl second">
          <div class="ft14">
            <div class="available clear 1 bdr-part" v-if="address.length<=0">
              <span class="redColor curPer" @click="goNext('login')">{{$t('logins')}}</span>
              {{$t('center.or')}}
              <span
                class="redColor curPer"
                @click="goNext('register')"
              >{{$t('registers')}}</span>
              {{$t('center.start')}}
            </div>
            <div class="clear available bdr-part" v-else>
              <span class="fl 1">{{$t('center.available')}} {{user_currency}} {{currency_name}}</span>
              <!-- <span class="fr redColor curPer" @click="goNext('account')">充币</span> -->
            </div>
            <div class="mt40 input-item clear">
              <label>{{$t('center.sellprice')}}</label>
              <input
                class="clr-part bg-main bdr-part"
                type="number"
                @keydown.69.prevent
                v-model="sellPrice"
                @keyup="sellprice_fixed"
                v-if="!disabled"
                min="0"
              >
              <input
                class="clr-part bg-main bdr-part"
                type="number"
                @keydown.69.prevent
                v-model="lastPrice01"
                :disabled="disabled"
                v-if="disabled"
              >
              <span>{{legal_name}}</span>
            </div>
            <div class="mt40 input-item clear">
              <label>{{$t('center.sellnumber')}}</label>
              <input
                class="clr-part bg-main bdr-part"
                type="number"
                :placeholder="inpTip"
                @keydown.69.prevent
               
                v-model="sellNum"
                 @keyup="sellnum_fixed"
                min="0"
              >
              <span>{{currency_name}}</span>
            </div>
            <!-- <div class="mt40 input-item clear">
                        <label>交易密码</label>
                        <input class="clr-part bg-main bdr-part" v-model="sellPsw" type="password">
            </div>-->
            <!-- <div class="mt40 input-item clear">
                        <label>资金密码:</label>
                        <input type="password" v-model="sellInfo.pwd" @keydown.69.prevent>
            </div>-->
            <!-- <div class="attion tr 1">范围 (0.000001,20,精度: 0.000001)</div> -->
            <el-slider
              v-model="value2"
              :min="0"
              :max="100"
              :show-tooltip="true"
              
              
              :format-tooltip="formatTooltip02"
              :disabled="address?current == 0?sellPrice=='':lastPrice01==0?true:false:true"
              @change="changeVal2"
            ></el-slider>

            <div class="mt50 1 ft14">{{$t('center.tradetotal')}} {{sellTotal}} {{legal_name}}</div>
            <div
              class="sell_btn curPer mt40 tc redBack 1 ft14"
              @click="sellCoin"
            >{{$t('center.sellout')}}{{currency_name}}</div>
          </div>
        </div>
      </div>
      <div v-show="showItem == 2" class="moneychange">
        <div>
          <p>24小时资金变化 ({{currency_name}})</p>
          <!-- <el-progress type="circle" :percentage="100" status="text"></el-progress> -->
           <p class="mt20">主力流入：{{money_in}}</p>
           <!-- <el-progress type="circle" :percentage="100" status="text"></el-progress> -->
           <p class="mt20">主力流出：{{money_out}}</p>
        </div>
      </div>
      <div v-show="showItem == 3">
        <div id="container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import depth from "../components/depth.vue";
import HighCharts from "highcharts";
export default {
  name: "trade",
  components: {
    depth
  },
  data() {
    return {
      timer: "",
      timer2: "",
      timer3: "",
      address: "",
      currency_name: "",
      legal_name: "",
      user_currency: "",
      user_legal: "",
      show: true,
      showNone: false,
      current: 0,
      allBalance: 0,
      disabled: false,
      lastPrice: "",
      lastPrice01: "",
      lastPrice02: "",
      pwd: "",
      buyPrice: "",
      buyNum: "",
      sellNum: "",
      sellPrice: "",
      buyInfo: {
        buyPrice: 0,
        buyNum: 0,
        pwd: "",
        url: "transaction/order",
        type: "buy"
      },
      sellInfo: {
        sellPrice: 0,
        sellNum: 0,
        pwd: "",
        url: "transaction/order",
        type: "sell"
      },
      tradetype: [
        { typetext: this.$t("center.xian") },
        { typetext: this.$t("center.shi") },
        { typetext: "资金变化" },
        { typetext: "深度图" }
      ],
      value1: 0,
      value2: 0,
      disable: false,
      disable02: false,
      buyPsw: "",
      sellPsw: "",
      showItem: "",
      data: {
        buy: [],
        sell: []
      },
      price_scale:'',
      number_scale:'',
      money_in:'',
      money_out:''
    };
  },
  watch: {
    buyPrice: function(newVal) {
      if (newVal < 0) {
        this.buyPrice = "";
      };
    },
    sellPrice: function(val) {
      if (val < 0) {
        this.sellPrice = "";
      }
    },
    buyNum: function(val) {
      if (val < 0) {
        this.buyNum = "";
      }
    },
    sellNum: function(val) {
      if (val < 0) {
        this.sellNum = "";
      }
    }
  },
  created() {
    this.address = localStorage.getItem("token") || "";
    if (this.address == "") {
      this.disable = true;
      this.disable02 = true;
    }
  },
  mounted() {
    var that = this;
    that.address = localStorage.getItem("token") || "";
    eventBus.$on("toPrice", function(data) {
      //console.log("-------------------------------------");
      //console.log(data);
      if (data) {
        that.buyPrice = data;
        that.sellPrice = data;
      }
    });
    eventBus.$on("toTrade", function(data) {
      //console.log(data, "6666666666666666666666");
      that.currency_id = data.currency_id;
      that.legal_id = data.legal_id;
      that.currency_name = data.currency_name;
      that.legal_name = data.legal_name;
      that.buyPrice = "";
      that.sellPrice = "";
      //console.log(this.address);
      // that.buy_sell(that.legal_id, that.currency_id);
      that.currency_val(that.legal_id, that.currency_id);
      that.getData();
      that.getFixed();
      that.money_change();
    });
    eventBus.$on("toTrade0", function(data0) {
      //console.log(data0);
      (that.currency_id = data0.currency_id), (that.legal_id = data0.legal_id);
      that.currency_name = data0.currency_name;
      that.legal_name = data0.legal_name;
      // that.buy_sell(that.legal_id, that.currency_id);
      //console.log(that.address);
      that.currency_val(that.legal_id, that.currency_id);
      that.getData();
      that.getFixed();
      that.money_change();
    });
    eventBus.$on("tocel", function(datas) {
      // //console.log(datas);
      if (datas) {
        // that.buy_sell(that.legal_id, that.currency_id);
        //console.log(that.address);
        that.currency_val(that.legal_id, that.currency_id);
      }
    });
    // 从exchange传过来的买一卖一价
    eventBus.$on("totradePrice", function(data) {
      //console.log(data);
      that.lastPrice01 = data.buyPrice;
      that.lastPrice02 = data.sellPrice;
      // that.lastPrice = data;
    });
    // 从exchange传过来的最新价
    eventBus.$on("priceToTrade", function(data) {
      //console.log(data);
      that.lastPrice01 = data.buyPrice;
      that.lastPrice02 = data.sellPrice;
      // that.lastPrice = data;
    });
  },
  methods: {
    //获取小数位
    getFixed(){
       this.$http({
         url:'/api/currency/match_info',
         params:{
           currency_id:this.currency_id,
           legal_id:this.legal_id
         }
       }).then(res=>{
           if(res.data.type == 'ok'){
             this.price_scale = res.data.message.price_scale;
              this.number_scale = res.data.message.number_scale
           }
       })
    },
    buyprice_fixed(){
      var n =  this.buyPrice.split('.');
       var m = n[1];
       if(m.length>this.price_scale){
         var s = m.substr(0,this.price_scale);
         this.buyPrice = n[0]+'.'+s;
       }
      //  this.buyPrice = Number(parseFloat(this.buyPrice).toFixed(this.price_scale+1).slice(0,-1))
    },
    sellprice_fixed(){
       var n =  this.sellPrice.split('.');
       var m = n[1];
       if(m.length>this.price_scale){
         var s = m.substr(0,this.price_scale);
         this.sellPrice = n[0]+'.'+s;
       }
    },
    buynum_fixed(){
        var n =  this.buyNum.split('.');
       var m = n[1];
       if(m.length>this.number_scale){
         var s = m.substr(0,this.number_scale);
         this.buyNum = n[0]+'.'+s;
       }
    },
    sellnum_fixed(){
        var n =  this.sellNum.split('.');
       var m = n[1];
       if(m.length>this.number_scale){
         var s = m.substr(0,this.number_scale);
         this.sellNum = n[0]+'.'+s;
       }
    },
    //资金流水
    money_change(){
        this.$http({
        url: "/api/transaction/tf_in_out",
        method: "GET",
        params: {
          legal_id: this.legal_id,
          currency_id: this.currency_id
        },
        headers: { Authorization: localStorage.getItem("token") }
      }).then(res => {
        if(res.data.type == 'ok'){
          this.money_in = res.data.message.in;
          this.money_out = res.data.message.out
        }
      })
    },
    //获取可用余额
    //币币余额

    currency_val(legal_id, currency_id) {
      var that = this;
      //console.log(this.address);
      if (!this.address) {
        return;
      }
      this.$http({
        url: "/api/" + "wallet/get_change_balance",
        method: "GET",
        params: {
          legal_id: legal_id,
          currency_id: currency_id
        },
        headers: { Authorization: localStorage.getItem("token") }
      }).then(res => {
        //console.log(res);
        if (res.status == 200) {
          this.user_currency = res.data.message.change_price;
          this.user_legal = res.data.message.legal_price;
        } else {
          clearInterval(this.timer);
          clearInterval(this.timer2);
        }
      });
    },
    //法币余额
    // currency_val02(legal_id) {
    //   if(!this.address){
    //     return;
    //   }
    //   this.$http({
    //     url: "/api/" + "wallet/get_currency_balance",
    //     method: "GET",
    //     params: {
    //       currency_id: legal_id
    //     },
    //     headers: { Authorization: this.address }
    //   }).then(res => {
    //     if (res.data.type == "ok") {
    //       this.user_legal = res.data.message;
    //     } else {
    //       clearInterval(this.timer);
    //       clearInterval(this.timer2);
    //     }
    //   });
    // },
    //格式化Tolltip
    formatTooltip01(val01) {
      return val01 + "%";
    },
    formatTooltip02(val02) {
      return val02 + "%";
    },
    changeVal() {
      if (this.current == 0) {
        this.buyNum = (
          (this.user_legal / this.buyPrice) *
          (this.value1 / 100)
        ).toFixed(5);
      }
      if (this.current == 1) {
        this.buyNum = (
          (this.user_legal / this.lastPrice02) *
          (this.value1 / 100)
        ).toFixed(5);
      }
    },
    changeVal2() {
      if (this.current == 0) {
        this.sellNum = (this.user_currency * (this.value2 / 100)).toFixed(5);
      }
      if (this.current == 1) {
        this.sellNum = (this.user_currency * (this.value2 / 100)).toFixed(5);
      }
    },
    numFilter(ev) {
      //48-57 96-105 108
      // //console.log(ev.keyCode)
    },
    changeType(index) {
      this.value1 = 0;
      this.value2 = 0;
      this.current = index;

      if (index == 1) {
        this.showItem = index;
        this.buyPrice = "";
        this.sellPrice = "";
        this.buyNum = "";
        this.sellNum = "";
        this.disabled = true;
      } else if (index == 0) {
        this.showItem = index;
        this.disabled = false;
        this.buyPrice = "";
        this.sellPrice = "";
        this.buyNum = "";
        this.sellNum = "";
      } else if (index == 3) {
        this.showItem = 3;
      } else if (index == 2) {
        this.showItem = 2;
      }
    },
    goNext(url) {
      this.$router.push({ name: url });
    },
    // init() {
    //   this.$http({
    //     url: "/api/" + "transaction/deal",
    //     method: "post",
    //     data: {
    //       address: this.address
    //     }
    //   }).then(res => {
    //     // //console.log(res)
    //     this.allBalance = res.data.message.user_cny;
    //     // //console.log(this.allBalance)
    //   });
    // },
    buyCoin() {
      var that = this;
      if (!this.disabled) {
        if (!this.buyPrice || this.buyPrice <= 0) {
          layer.msg(that.$t("lay.inprice"));
          return;
        }
      } else {
        if (this.lastPrice02 <= 0) {
          layer.msg(that.$t("lay.noinprice"));
          return;
        }
      }

      if (!this.buyNum || this.buyNum <= 0) {
        layer.msg(that.$t("lay.innumber"));
        return;
      }
      if (this.currency_name == "JNB" || this.currency_name == "BHC") {
        if (this.buyNum - 0 < 100 || (this.buyNum - 0) % 100 != 0) {
          layer.msg(this.$t("account.mult100"));
          return;
        }
      }
      // if(this.buyPsw == ''){
      //   layer.msg('请输入交易密码');
      //   return;
      // }
      if (this.address == "") {
        layer.msg(that.$t("lay.plogin"));
        setTimeout(function() {
          that.$router.push("/components/login");
        }, 1000);
        return;
      }
      // if(!this.buyInfo.pwd || this.buyInfo.pwd.length< 6){
      //   layer.msg("请输入资金密码");
      //   return;
      // }
      var i = layer.load();
      this.$http({
        url: "/api/" + this.buyInfo.url,
        method: "post",
        data: {
          legal_id: this.legal_id,
          currency_id: this.currency_id,
          price: this.disabled ? this.lastPrice02 : this.buyPrice,
          num: this.buyNum,
          // pay_password:this.buyPsw,
          type: this.buyInfo.type
          // pay_password:this.buyInfo.pwd
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          layer.close(i);

          if (res.data.type == "ok") {
            eventBus.$emit("tradeOk", { status: "ok" });
            layer.msg(res.data.message);
            //console.log(this.current);
            if (this.current == 0) {
              // this.buyPrice = '';
              this.buyNum = "";
              this.buyInfo.pwd = "";
            } else {
              this.buyNum = "";
              this.buyInfo.pwd = "";
            }
            that.currency_val(that.legal_id, that.currency_id);
            // that.buy_sell(that.legal_id, that.currency_id);
            that.get;
            eventBus.$emit("buyTrade", "tradebuy");
            eventBus.$emit("tocel", "updata");
            //console.log(res.data.message);
          } else {
            this.buyNum = "";
            layer.msg(res.data.message);
          }
        })
        .catch(error => {
          //console.log(error);
        });
    },
    sellCoin() {
      //console.log(localStorage.getItem("token"));

      var that = this;
      if (!this.disabled) {
        if (!this.sellPrice || this.sellPrice <= 0) {
          layer.msg(that.$t("lay.outprice"));
          return;
        }
      } else {
        if (this.lastPrice01 <= 0) {
          layer.msg(that.$t("lay.outinprice"));
          return;
        }
      }
      if (!this.sellNum || this.sellNum <= 0) {
        layer.msg(that.$t("lay.outnumber"));
        return;
      }
      if (this.currency_name == "JNB" || this.currency_name == "BHC") {
        if (this.sellNum - 0 < 100 || (this.sellNum - 0) % 100 != 0) {
          layer.msg(this.$t("account.mult100"));
          return;
        }
      }
      // if(this.sellPsw == ''){
      //   layer.msg('请输入交易密码');
      //   return;
      // }
      if (this.address == "") {
        layer.msg(that.$t("lay.plogin"));
        setTimeout(function() {
          that.$router.push("/components/login");
        }, 1000);
        return;
      }
      // if(!this.sellInfo.pwd || this.sellInfo.pwd.length< 6){
      //   layer.msg("请输入资金密码");
      //   return;
      // }
      var i = layer.load();
      this.$http({
        url: "/api/" + this.sellInfo.url,
        method: "post",
        data: {
          legal_id: this.legal_id,
          currency_id: this.currency_id,
          price: this.disabled ? this.lastPrice01 : this.sellPrice,
          num: this.sellNum,
          // pay_password:this.sellPsw,
          type: this.sellInfo.type
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          //console.log(
            res,
            "99999999999999999999999999999999999999999999999999"
          );
          layer.close(i);
          // layer.msg(res.data.message)
          if (res.data.type == "ok") {
            setTimeout(function() {
              that.buy_sell(that.legal_id, that.currency_id);
            }, 3000);
            that.currency_val(that.legal_id, that.currency_id);

            eventBus.$emit("tradeOk", { status: "ok" });
            if (this.current == 0) {
              // this.sellPrice = '';
              this.sellNum = "";
              this.sellInfo.pwd = "";
            } else {
              this.sellNum = "";
              this.sellInfo.pwd = "";
            }
            eventBus.$emit("buyTrade", "tradebuy");
            eventBus.$emit("tocel", "updata");
            layer.msg(res.data.message);
          } else {
            this.sellNum = "";
            layer.msg(res.data.message);
          }
        })
        .catch(error => {
          //console.log(error);
        });
    },
    //买入、卖出记录
    buy_sell(legals_id, currencys_id) {
      // //console.log("啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊");
      var i = layer.load();
      this.$http({
        url: "/api/" + "transaction/deal",
        method: "post",
        data: {
          legal_id: legals_id,
          currency_id: currencys_id
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          layer.close(i);
          // //console.log(res ,222)
          // layer.close(i);
          if (res.data.type == "ok") {
            this.lastPrice = res.data.message.last_price;
            // this.user_currency = res.data.message.user_currency;
            // this.user_legal = res.data.message.user_legal;
            //console.log("console------" + this.user_currency, this.user_legal);
            // //console.log(res.data)
            // this.buyPrice = 0;
            // this.buyNum = 0;
          } else {
            layer.msg(res.data.message);
          }
        })
        .catch(error => {
          layer.close(i);
          // //console.log(error)
        });
    },
    //深度图数据
    getData() {
      this.$http({
        url: "/api/transaction/depth",
        params: {
          currency_id: this.currency_id,
          legal_id: this.legal_id
        },
        headers: { Authorization: localStorage.getItem("token") },
        method: "get"
      }).then(res => {
        //console.log(res.data.message);
        if (res.data.type == "ok") {
          this.$nextTick(() => {
            this.data.buy = res.data.message.in.reverse();
            this.data.sell = res.data.message.out;
            //console.log(this.data);
            this.init();
          });
        }
      });
    },
    //深度图渲染
    init() {
      let buy = this.data.buy;
      let sell = this.data.sell;
      let chart = HighCharts.chart("container", {
        chart: {
          type: "area",
          zoomType: "xy"
        },
        title: {
          text: ""
        },
        xAxis: {
          minPadding: 0,
          maxPadding: 0,
          plotLines: [
            {
              color: "#888",
              value: 0.1523,
              width: 1,
              label: {
                text: "实际价格",
                rotation: 90
              }
            }
          ],
          title: {
            text: ""
          }
          // tickWidth:0,//去掉刻度
          // labels:{
          // 	enabled: false, //去掉数字
          // 	},
        },
        yAxis: [
          {
            lineWidth: 1,
            gridLineWidth: 1,
            title: null,
            tickWidth: 1,
            tickLength: 5,
            tickPosition: "inside",
            labels: {
              align: "left",
              x: 8
            }
          },
          {
            opposite: true,
            linkedTo: 0,
            lineWidth: 1,
            gridLineWidth: 0,
            title: null,
            tickWidth: 1,
            tickLength: 5,
            tickPosition: "inside",
            labels: {
              align: "right",
              x: -8
            }
          }
        ],
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillOpacity: 0.2,
            lineWidth: 1,
            step: "center"
          }
        },
        tooltip: {
          headerFormat:
            '<span style="font-size=10px;">Price: {point.key}</span><br/>',
          valueDecimals: 2
        },
        series: [
          {
            name: "Bids",
            data: buy,
            color: "#03a7a8"
          },
          {
            name: "Asks",
            data: sell,
            color: "#fc5857"
          }
        ]
      });
    }
  },
  computed: {
    buyTotal() {
      return (
        ((this.buyPrice || this.lastPrice02) * this.buyNum).toFixed(5) || 0
      );
    },
    sellTotal() {
      return (
        ((this.sellPrice || this.lastPrice01) * this.sellNum).toFixed(5) || 0
      );
    },
    inpTip() {
      if (this.currency_name == "JNB" || this.currency_name == "BHC") {
        return this.$t("account.mult100");
      } else {
        return "";
      }
    }
  },
  destroyed() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
  }
};
</script>

<style scoped>
.title_box {
  height: 48px;
  line-height: 48px;
  padding: 0 25px;
}
.tabtitle span {
  cursor: pointer;
  padding-bottom: 10px;
}
.tabtitle span:not(:last-child) {
  margin-right: 40px;
}
.content .first {
  padding: 0 15px 0 25px;
}
.content .second {
  padding: 0 25px 0 15px;
}
.available {
  height: 48px;
  border-bottom: 1px solid #ccc;
  line-height: 48px;
}
.input-item {
  position: relative;
  line-height: 40px;
}
.input-item label {
  width: 20%;
  float: left;
  font-size: 14px;
}
.input-item input {
  width: 80%;
  float: left;
  border: 1px solid #ccc;
  border-radius: 25px;
  height: 35px;
  text-indent: 15px;
  font-size: 16px;
  line-height: 35px;
}
.input-item span {
  position: absolute;
  right: 15px;
}
.attion {
  height: 20px;
  line-height: 30px;
  font-size: 12px;
}
.sell_btn {
  width: 100%;
  height: 35px;
  border-radius: 18px;
  line-height: 35px;
}
.greenBack {
  background-color: #55a067;
  color: #fff;
}
.redBack {
  background-color: #cc4951;
  color: #fff;
}
input:disabled {
  color: #627085;
  cursor: not-allowed;
}
.moneychange{
  margin: 80px 0;
  text-align: center;
}
</style>

