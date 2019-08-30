<template>
  <div class="mt45 flex ptb20 w90 wrap">
    <div class="left w70">
      <!-- <div class="flex alcenter ptb10 plr30 ft14 bgWhite between grays mb10">
        <span>HOTBIT POLARIS</span>
        <span class="grays">/</span>
        <span>HOTBIT POLARIS</span>
        <span class="grays">/</span>
        <span>HOTBIT POLARIS</span>
        <span class="grays">/</span>
        <span>HOTBIT POLARIS</span>
      </div>-->
      <div class="bgWhite flex">
        <div class="w60 flex column">
          <img class="w100" :src="msg.logo">
          <p
            class="tc ptb10 ft16 status"
            :class="{'gray_cor':(msg.status == '募集失败'||msg.status == '预热中'),'blue_cor':(msg.status == '正在募集'||msg.status == '募集成功')}"
          >{{msg.status}}</p>
        </div>
        <div class="w40 plr20 ptb20 flex column between">
          <div class="flex between">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp"
              >{{activity.content}}</el-timeline-item>
            </el-timeline>
            <div class="tr">
              <el-button type="primary" @click="look">{{$t('crowd.intro')}}</el-button>
            </div>
          </div>
          <!--额外赠送-->
          <!-- <div class="flex alcenter w100 mt30">
            <div class="flex1 mr5" style="border-right:1px solid #eee;padding-right:5px;">
              <p class="ft16 grays tc">额外送10%</p>
              <p class="tc ft12 mb10">05/08 20:22:11-20:55:00</p>
              <el-progress :percentage="70" :show-text="false"></el-progress>
            </div>
            <div class="flex1">
              <p class="ft16 grays tc">额外0%</p>
              <p class="tc ft12 mb10">05/08 20:22:11-20:55:00</p>
              <el-progress :percentage="70" :show-text="false"></el-progress>
            </div>
          </div>-->
          <!---支持国家协议-->
          <!-- <div class="ptb10 flex between grays" style="border-top:1px solid #eee;">
            <el-popover
              placement="top-start"
              title
              width="200"
              trigger="hover"
              content="无法参加申购的国家：美国"
            >
              <span slot="reference" class="ft14 curPer">支持国家、地区</span>
            </el-popover>
            <span class="curPer ft14">用户协议>></span>
          </div>-->
        </div>
      </div>
      <div class="mt20">
        <img :src="msg.describe" class="w100">
      </div>
    </div>
    <div class="right w26">
      <!--申购-->
      <div class="plr20 ptb20 bgWhite">
        <p class="flex between bde mb10">
          <span>{{$t('crowd.can_edu')}}</span>
          <span>{{msg.limt_number}} {{msg.pay_currency_name}}</span>
        </p>
        <p class="flex between bdb pb10">
          <span>{{$t('crowd.now_edu')}}</span>
          <span>{{msg.purchase_amount}} {{msg.pay_currency_name}}</span>
        </p>
        <div class="flex between ptb20 bdb">
          <div>
            <p>{{$t('crowd.my_edu')}}</p>
            <p>{{msg.my_purchase_amount}} {{msg.pay_currency_name}}</p>
          </div>
          <div>
            <el-button @click="goRec">{{$t('crowd.his')}}</el-button>
          </div>
        </div>
        <div class="ptb20 ft14 grays hide">
          <!-- <p class="flex between mb20">
            <span>
              <el-popover
                placement="left-start"
                title
                width="200"
                trigger="hover"
                content="无法参加申购的国家：美国"
              >
                <i class="el-icon-question curPer grays" slot="reference"></i>
              </el-popover>
              <span class="ml10">中签率</span>
            </span>
            <span>{{msg.win_rate}}%</span>
          </p>-->
          <!-- <p class="flex between mb20">
            <span>
              <el-popover
                placement="left-start"
                title
                width="200"
                trigger="hover"
                content="无法参加申购的国家：美国"
              >
                <i class="el-icon-question curPer grays" slot="reference"></i>
              </el-popover>
              <span class="ml10">我的中签金额</span>
            </span>
            <span>{{msg.my_win_amount}} {{msg.pay_currency_name}}</span>
          </p>
          <p class="flex between mb20">
            <span>
              <el-popover
                placement="left-start"
                title
                width="200"
                trigger="hover"
                content="无法参加申购的国家：美国"
              >
                <i class="el-icon-question curPer grays" slot="reference"></i>
              </el-popover>
              <span class="ml10">我的中签数量</span>
            </span>
            <span>{{msg.my_win_num}} {{msg.purchase_currency_name}}</span>
          </p> -->
          <!-- <p class="flex between">
            <span>
              <el-popover
                placement="left-start"
                title
                width="200"
                trigger="hover"
                content="无法参加申购的国家：美国"
              >
                <i class="el-icon-question curPer grays" slot="reference"></i>
              </el-popover>
              <span class="ml10">可额外赠送</span>
            </span>
            <span>-- QOB</span>
          </p>-->
        </div>
      </div>
      <!--账户-->
      <div class="plr20 ptb20 bgWhite mt20">
        <div class="flex between bdb" style="padding-bottom:20px;">
          <div>
            <p class="grays ft14 mb10">{{$t('crowd.yue')}}</p>
            <p>{{msg.balance}} {{msg.pay_currency_name}}</p>
          </div>
          <!-- <div>
            <span class="grays ft14 curPer">充值</span>
          </div> -->
        </div>
        <p class="mt20 flex between ft14">
          <span>{{$t('crowd.price')}}：</span>
          <span>1{{msg.purchase_currency_name}} = {{msg.rate}} {{msg.pay_currency_name}}</span>
        </p>
        <div class="mt20 flex between ft14">
          <span>{{$t('crowd.money')}}：</span>
          <div>
            <el-input :placeholder="$t('crowd.enterMoney')" size="small" v-model="money">
              <template slot="append">{{msg.pay_currency_name}}</template>
            </el-input>
            <p class="flex grayBg">
              <span class="flex1 tc ptb5 ft12 bdr_d1 curPer curPer" @click="per(0.25)">25%</span>
              <span class="flex1 tc ptb5 ft12 bdr_d1 curPer curPer" @click="per(0.5)">50%</span>
              <span class="flex1 tc ptb5 ft12 bdr_d1 curPer curPer" @click="per(0.75)">75%</span>
              <span class="flex1 tc ptb5 ft12 curPer curPer" @click="per(1)">100%</span>
            </p>
          </div>
        </div>
        <p class="mt20 flex between ft14">
          <span>{{$t('crowd.total')}}：</span>
          <span>{{total_money}} {{msg.purchase_currency_name}}</span>
        </p>
        <div v-if="msg.status == '募集失败'||msg.status == '预热中'||msg.status == '募集成功'" class="tc ft16 bg_a mt20 white ptb10 curPer">{{msg.status}}</div>
        <el-button class="w100 mt20" type="primary" v-else @click="applyBuy">申购</el-button>
      </div>
      <!--申购细则-->
      <div class="ptb20 plr20 bgWhite mt20">
        <p class="pb10 bdb mb20">{{$t('crowd.rule')}}</p>
        <!-- <p class="ft14 gray_a mb20">1、 本次申购分QOB/HTB，QOB/USDT两场。申购时间为2019年5月8日20:00:00 ~ 2019年5月9日23:59:59，第一阶段申购时间为2019年5月8日20:00:00 ~ 2019年5月8日20:59:59，第二阶段申购时间为2019年5月8日21:00:00 ~ 2019年5月9日23:59:59；</p>
        <p class="ft14 gray_a mb20">1、 本次申购分QOB/HTB，QOB/USDT两场。申购时间为2019年5月8日20:00:00 ~ 2019年5月9日23:59:59，第一阶段申购时间为2019年5月8日20:00:00 ~ 2019年5月8日20:59:59，第二阶段申购时间为2019年5月8日21:00:00 ~ 2019年5月9日23:59:59；</p>
        <p class="ft14 gray_a mb20">1、 本次申购分QOB/HTB，QOB/USDT两场。申购时间为2019年5月8日20:00:00 ~ 2019年5月9日23:59:59，第一阶段申购时间为2019年5月8日20:00:00 ~ 2019年5月8日20:59:59，第二阶段申购时间为2019年5月8日21:00:00 ~ 2019年5月9日23:59:59；</p>
        <p class="ft14 gray_a mb20">1、 本次申购分QOB/HTB，QOB/USDT两场。申购时间为2019年5月8日20:00:00 ~ 2019年5月9日23:59:59，第一阶段申购时间为2019年5月8日20:00:00 ~ 2019年5月8日20:59:59，第二阶段申购时间为2019年5月8日21:00:00 ~ 2019年5月9日23:59:59；</p>-->
        <p class="ft14 cont" v-html="msg.content"></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      money: "",
      id: "",
      msg: "",
      status: 0, //申购状态 0 结束 1 进行中
      activities: [
        {
          content: this.$t('crowd.startBuyTime'),
          timestamp: "--",
          size: "normal",
          type: "primary",
          color: "#ffa200"
        },
        {
          content: this.$t('crowd.endBuyTime'),
          timestamp: "--",
          color: "#0bbd87"
        }
      ]
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getDetail();
  },
  computed: {
    total_money() {
      var countDecimals = function(num) {
    var len = 0;
    try {
        num = Number(num);
        var str = num.toString().toUpperCase();
        if (str.split('E').length === 2) { // scientific notation
            var isDecimal = false;
            if (str.split('.').length === 2) {
                str = str.split('.')[1];
                if (parseInt(str.split('E')[0]) !== 0) {
                    isDecimal = true;
                }
            }
            let x = str.split('E');
            if (isDecimal) {
                len = x[0].length;
            }
            len -= parseInt(x[1]);
        } else if (str.split('.').length === 2) { // decimal
            if (parseInt(str.split('.')[1]) !== 0) {
                len = str.split('.')[1].length;
            }
        }
    } catch(e) {
        throw e;
    } finally {
        if (isNaN(len) || len < 0) {
            len = 0;
        }
        return len;
    }
};
var accMul = function(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var times = 0, s1 = num1.toString(), s2 = num2.toString();
    try { times += countDecimals(s1); } catch (e) { }
    try { times += countDecimals(s2); } catch (e) { }
    var result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times);
    return getCorrectResult("mul", num1, num2, result);
    // return result;
};
      function convertToInt(num) {
        num = Number(num);
        var newNum = num;
        var times = countDecimals(num);
        var temp_num = num.toString().toUpperCase();
        if (temp_num.split("E").length === 2) {
          newNum = Math.round(num * Math.pow(10, times));
        } else {
          newNum = Number(temp_num.replace(".", ""));
        }
        return newNum;
      };

      function getCorrectResult(type, num1, num2, result) {
        var temp_result = 0;
        switch (type) {
          case "add":
            temp_result = num1 + num2;
            break;
          case "sub":
            temp_result = num1 - num2;
            break;
          case "div":
            temp_result = num1 / num2;
            break;
          case "mul":
            temp_result = num1 * num2;
            break;
        }
        if (Math.abs(result - temp_result) > 1) {
          return temp_result;
        }
        return result;
      };
      function accDiv(num1, num2) {
        num1 = Number(num1);
        num2 = Number(num2);
        var t1 = 0,
          t2 = 0,
          dec1,
          dec2;
        try {
          t1 = countDecimals(num1);
        } catch (e) {}
        try {
          t2 = countDecimals(num2);
        } catch (e) {}
        dec1 = convertToInt(num1);
        dec2 = convertToInt(num2);
        var result = accMul(dec1 / dec2, Math.pow(10, t2 - t1));
        return getCorrectResult("div", num1, num2, result);
        // return result;
      };
      return accDiv(this.money, this.msg.rate);
    }
  },
  methods: {
    per(num) {
      if (this.msg.max_number) {
        this.money = this.msg.max_number * num;
      }
    },
    look() {
      document.documentElement.scrollTop = 350;
    },
    getDetail() {
      this.$http({
        url: "/api/crowdfunding/info",
        params: { id: this.id },
        headers: { Authorization: localStorage.getItem("token") }
      }).then(res => {
        if (res.data.type == "ok") {
          this.msg = res.data.message;
          this.activities[0].timestamp = res.data.message.start_time;
          this.activities[1].timestamp = res.data.message.end_time;
          var now_time = new Date().getTime();
          var start_time = new Date(res.data.message.start_time).getTime();
          var end_time = new Date(res.data.message.end_time).getTime();
          if (now_time > start_time && now_time < end_time) {
            this.status = 1;
          } else {
            this.status = 0;
          }
        }
      });
    },
    //申购
    applyBuy() {
      if (this.money == "") {
        layer.msg(this.$t('crowd.enterMoney'));
        return;
      };
      if(parseFloat(this.money) > parseFloat(this.msg.balance)){
         layer.nsg('余额不足');
         return;
      }
      var i = layer.load();
      this.$http({
        url: "/api/crowdfunding/order",
        method: "post",
        data: {
          id: this.id,
          number: this.money
        },
        headers: { Authorization: localStorage.getItem("token") }
      }).then(res => {
        layer.close(i);
        layer.msg(res.data.message);
      });
    },
    //申购历史
    goRec() {
      this.$router.push({ path: "/crowdRec", query: { id: this.id } });
    }
  }
};
</script>
<style scoped>
.wrap {
  margin: 60px auto;
}
.left,
.right {
  margin: 0 1%;
}
.status {
  color: #eee;
}
.gray_cor {
  background: #78737f;
}
.blue_cor {
  background: #409eff;
}
.cont {
  line-height: 1.6;
}
</style>
