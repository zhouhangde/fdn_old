<template>
  <div class="home home-box bg-main">
    <div class="main flex">
      <div class="main-l fl flex" style="width:80%;">
        <div class="sidebar bg-part" style="width:30%;margin-right:6px;">
          <market></market>
        </div>
        <div class="chart_wrap flex column bgWhite" style="width:70%;">
            <!-- <chart></chart> -->
            <div style="min-width:67%" class="bg-part tv_wrap">
              <!--<kline></kline>-->
              <tv></tv>
            </div>
            <div class="trade-wrap part-l bg-part" style="padding-bottom:16px;">
              <trade></trade>
            </div>
          </div>
        <!-- <div class="notice_box bg-part" style="margin-top:8px;">
        <notice></notice>
        </div>-->
      </div>
      <div class="main-r bgWhite"  style="width:20%;">
        <div class="flex">
          
          <div class="deadl-wrap part-r" style="width:100%;margin:0">
            <exchange></exchange>
          </div>
        </div>
        <!-- <div class="parts  flex between" > -->

        <!-- <div class="deatil_box bg-part" style="width:33%;margin:0 8px">
          <complete></complete>
        </div>-->
        <!-- </div> -->

        <!-- <div class="entrust_box">
          <hisentrust></hisentrust>
        </div>-->
        <!-- <div class="deatil_box" style="background: #181b2a;">
            <detail></detail>
        </div>-->

        <!-- <div class="currency_box">
          <currency></currency>
        </div>-->
        <!-- <div class="depth-map flex btween" >
					<deal></deal>
        </div>-->
      </div>
    </div>
    <div class="entrust_box" style="margin:6px 0px 0px 6px">
      <entrust></entrust>
    </div>
  </div>
</template>

<script>
import indexHeader from "@/view/indexHeader";
import notice from "@/components/noticeList";
import deal from "@/view/deal";
import exchange from "@/view/exchange";
import market from "@/view/market";
import trade from "@/view/trade";
import chart from "@/view/chart";
import entrust from "@/view/entrust2";
import hisentrust from "@/view/hisentrust";
import detail from "@/view/detail";
import currency from "@/view/currency";
import complete from "@/view/complete";
import tv from "@/view/tv";
export default {
  name: "dealCenter",

  components: {
    indexHeader,
    load: 1,
    notice,
    deal,
    exchange,
    market,
    trade,
    chart,
    entrust,
    hisentrust,
    detail,
    currency,
    complete,
    tv
  },
  data() {
    return {};
  },
  created() {
    this.address = localStorage.getItem("address") || "";

    // //console.log(this.address)
  },
  mounted() {
    // //console.log('wejdewhbewjdbewjdhbcwj')
    // if(this.load==1){
    //   //console.log(1111)
    //   window.location.reload();
    //   this.load=2;
    // }
  }
};
</script>

<style scoped lang="scss">
.tv_wrap {
  border-bottom: 3px solid #e5ebf5;
}
.home-box {
  padding-top: 8px;
  margin-top: 45px;
  .main {
    overflow: hidden;
    .main-l {
      width: 350px;
      // height: 100%;
      // background: #fff;
      margin: 0 6px;
      overflow: hidden;
      > div {
        padding: 0 10px;
      }
    }
    .main-r {
      // margin-left: 348px;

      .parts {
        margin-top: 8px;
        max-height: 530px;

        > .part-l {
          // background: #181b2a;
          min-width: 67%;
        }
        > .part-r {
          width: 33%;
          > div {
            height: 100%;
            padding-bottom: 20px;
          }
        }
      }
      > div {
      }
      .depth-map {
        max-height: 500px;
        margin-top: 10px;
      }
    }
  }
}
</style>
