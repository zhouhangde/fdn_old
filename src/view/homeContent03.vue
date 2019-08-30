<template>
  <div class="indexBlackes">
    <!-- <div class="banneres">
            <div class="content ">
                <h1>区块链数字资产交易平台</h1>
                <p class="introduce">安全&nbsp;&nbsp;&nbsp;公正&nbsp;&nbsp;&nbsp;高效&nbsp;&nbsp;&nbsp;不可篡改</p>
                <div class="QRCode"><img src="@/assets/images/code.png"></div>
                <p class="kefu">手机下载二维码</p>
            </div>
    </div>-->
    <!-- <home-login></home-login> -->
    <!-- <home-login></home-login> -->
    <div class="swiper-container banner_wrap flex alcenter swiper-container-horizontal">
      <!-- <div class="swiper-wrapper">
        <div class="swiper-slide sliders" v-for="(item,index) in pics" :key="index">
          <img :src="item.pic" alt>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination02"></div> -->
      <el-carousel :interval="3000" type="card" height="300px">
        <el-carousel-item v-for="(item,index) in pics" :key="index" class="radius8 hidden">
          <span class="block radius8" :style="{backgroundImage: 'url(' + item.pic + ')', backgroundSize:'100% 100%',height:'300px',width:'100%'}"></span>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- <div class="carousel">
            <div class="swiper-container swiper-container01 swiper-container-horizontal">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" :class="{active:index==curSwiper}" v-for="(item ,index) in swiperList" style="width: 232px; margin-right: 10px;" @mouseover="mouseEnter(index)">
                        <p class="name">{{item.symbol}}</p>
                        <p class="last">{{item.quotes.USD.price}}</p>
                        <p class="range" :class="{red:item.quotes.USD.percent_change_24h>=0}">
                            <i class="iconfont icon-u-arrow3-loss" v-if="item.quotes.USD.percent_change_24h<0"></i>
                            <i class="iconfont icon-u-arrow3-right" v-else></i>
                            {{item.quotes.USD.percent_change_24h}}%
                        </p>
                    </div>
                </div>   
                <div class="swiper-pagination01"></div>
            </div>
            <div slot="button-prev" class="swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide"></div>
            <div slot="button-next" class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide"></div>
    </div>-->
    <div style="color:#333!important">
      <!--行情-->
      <ul class="flex alcenter market_list">
        <li class="flex market_li around curPer" @click="goTrade(item.legal_id,item.currency_id,item.legal_name,item.currency_name,item.now_price,item.change,item.volume,item.cny_price)" v-for="(item,index) in sortList" :key="index" v-if="index<6">
          <div class="flex column">
            <span class="symbol blue ft12">{{item.currency_name}}/{{item.legal_name}}</span>
            <span class="nowPrice greens ft20" :style="{color:parseFloat(item.change)<0?'#FF4F00':''}" >{{item.now_price}}</span>
            <span class="blue ft12">≈{{item.cny_price}}CNY</span>
          </div>
          <p class="greens ft16" :style="{color:parseFloat(item.change)<0?'#FF4F00':''}">{{parseFloat(item.change)>=0?'+'+(item.change-0).toFixed(2):(item.change-0).toFixed(2)}}%</p>
        </li>
      </ul>
      <!--公告-->
      <div class="notice">
        <ul class="flex alcenter center notice_ul">
          <img src="../assets/images/notice_mark.png">
          <li
            v-for="(item,index) in newsList"
            v-if="index<3"
            :key="item.id"
            class="fl notice_li"
            @click="$router.push({path:'components/noticeDetail',query:{id:item.thisid}})"
          >
            <a class="notice_a ft14" :data-id="item.id">{{item.title}}</a>
          </li>
        </ul>
      </div>

      <div class="coin-tab">
            <ul class="coins">
              <li v-for="(coin,index) in quotation" :key="index" @click="nowCoin = coin.name" :class="{activeCoin:nowCoin == coin.name}">{{$t('home.with')}}{{coin.name}}  {{$t('home.markets')}}<span class='' v-if="nowCoin == coin.name"></span></li>
              <li :class="{activeCoin:nowCoin == '自选'}" @click="nowCoin ='自选'">{{$t('home.myMarkets')}}</li>
            </ul>
          </div>
        <div class="coins-list">
          <div class="list-title">
            <span>{{$t('home.pair')}}</span>
            <span>{{$t('home.price')}}({{nowCoin}})</span>
             <span>{{$t('home.change')}}</span>
              <span>{{$t('home.high')}}</span>
               <span>{{$t('home.min')}}</span>
            <span>{{$t('home.volume')}}</span>
            
            <span>{{$t('home.trade')}}</span>
          </div>
          
          <ul class="list-con scroll" v-for="(item,index) in quotation" :key="index">
            <li v-for="(li,inde) in item.array" :key="inde" :data-name='li.currency_id+"/"+li.legal_id' v-if="(li.added&&nowCoin == $t('home.myMarkets')) ||li.legal_name == nowCoin">
              <div class="two-coin">
                <img :src="li.logo" alt="" style="width:30px;">
                <span style="font-weight:bold"><span class="">{{li.currency_name}}</span><span class="gray">/{{li.legal_name}}</span></span>
              </div>
              <div class="yester">
                <!-- <span :class="setColor(li.change)">{{li.now_price==null?'0':li.now_price}}</span>/ -->
                <span class=" bold">{{li.now_price==null?'0':li.now_price}}</span>
              </div>
              <div class="yes-toa">
                <!-- <span :class="setColor(li.last_price,li.yesterday_last_price)">{{li.change == null?'+0.000':li.change}}%</span> -->
                <span :class="setColor(li.change)" class="bold change">{{(li.change>0?'+':'')+(li.change-0).toFixed(2)}}%</span>
              </div>
              <div>
                <span class=" bold high_price">{{li.high_price}}</span>
              </div>
              <div>
                <span class=" bold low_price">{{li.low_price}}</span>
              </div>
              <div class="count  bold volume">{{li.volume == null?'0':li.volume}}</div>
              <div class=""  style="color:#194B64;">
                <span class=" fr el-icon-star-on" v-if="li.added" @click="addDelete('user_delete',li.currency_id)" style="line-height:30px;margin-left:20px"></span>
                <span class=" fr el-icon-star-off" v-if="!li.added" style="line-height:30px;margin-left:20px" @click="addDelete('user_add',li.currency_id)"></span>
                <span class="fr" @click="setCurrent(index,inde)">{{$t('home.toTrade')}}</span>
                <!-- <span :hah='testMy(li.currency_id,li.legal_id)'>{{li.currency_id +''+li.legal_id}}</span> -->
              </div>
              <!-- <div>
                <span @click="setData({currency_id:item.id,legal_id:li.currency_id,currency_name:item.name,leg_name:li.name,isShow:index})">交易 </span>
              </div> -->
            </li>
          </ul>
        </div>
      <!--图文内容-->
        <div id="content01" class="content01 flex alcenter   center" style="background:#f3f3f3;padding:50px 0;">
            <div class="text01 mr100 left01 animated">
              <h1 class="ft26 bold mb30">{{$t('home.c1')}}</h1>
              <p class="ft16 bold mb10">{{$t('home.c2')}}</p>
               <p class="ft16 bold mb10">{{$t('home.c3')}}</p>
                <p class="ft16 bold mb10">{{$t('home.c4')}}</p>
            </div>
            <img class="imgs01" src="../assets/images/imgs01.png" />
        </div>
        <div class="content01 flex alcenter center ">
          <img class="imgs02" src="../assets/images/imgs02.png" />
            <div class="text01 ml100">
              <h1 class="ft26 bold mb30">{{$t('home.c5')}}</h1>
              <p class="ft16 bold mb10">{{$t('home.c6')}}</p>
               <p class="ft16 bold mb10">{{$t('home.c7')}}</p>
                <p class="ft16 bold mb10">{{$t('home.c8')}}</p>
            </div>
            
        </div>
        <div class="content01 flex alcenter grayBg center" style="background:#f3f3f3;">
            <div class="text01 mr100">
              <h1 class="ft26 bold mb30">{{$t('home.c9')}}</h1>
              <p class="ft16 bold mb10">{{$t('home.c10')}}</p>
               <p class="ft16 bold mb10">{{$t('home.c11')}}</p>
                <p class="ft16 bold mb10">{{$t('home.c12')}}</p>
                 <p class="ft16 bold mb10">{{$t('home.c13')}}</p>
            </div>
            <img class="imgs03" src="../assets/images/imgs03.png" />
        </div>
        <div class="content01 flex alcenter center bg01   ">
          <img class="imgs04" src="../assets/images/imgs04.png" />
            <div class="text01 ml100">
              <h1 class="ft26 bold gray9 mb30">{{$t('home.c14')}}</h1>
              <p class="ft16 bold mb10 tr">{{$t('home.c15')}}</p>
            </div>
            
        </div>
        <div class="content01 flex alcenter grayBg center bg02">
            <div class="text01 mr100">
              <h1 class="ft26 bold mb30">{{$t('home.access')}}</h1>
              <p class="ft16 bold mb10">{{$t('home.cover')}}</p>
            </div>
            <img class="imgs05" src="../assets/images/imgs06.png" />
        </div>
        <!--马上交易-->
        <div class="go_transfer">
           <h1 class="bold ft24 mb30 tc">{{$t('home.c16')}}</h1>
           <p class="ft14 mb30 tc">{{$t('home.c17')}}</p>
           <div class="login_register flex alcenter center" v-if="!account_number.length">
             <div class="login_btn mr60 bdr-part" @click="go_login">{{$t('logins')}}</div>
             <div class="register_btn white blue_bg" @click="go_register">{{$t('registers')}}</div>
           </div>
        </div>
      <!---新闻-->
      <!-- <ul class="ptb20 plr20 bgWhite w90 news_content">
        <li class="pb10 mb10 news_li"  v-for="(item,index) in noticeList"  :key="item.id">
          <div class="flex alcenter bdb pb10 mb10" v-if="index == 0">
            <div class="flex alcenter">
               <img src="../assets/images/news_mark.png">
            </div>
            <span class="bold ft16 ptb10 ml5">百家争鸣</span>
          </div>
          <div class="flex ">
            <div class=""  @click="goNewsDetail(item.thisid)">
            <img class="mews_img radius5" :src="item.pic">
          </div>
          <div class="flex column  bdb center ml10 w100">
          <div class="bold ft16 mb10 curPer"  @click="goNewsDetail(item.thisid)">{{item.title}}</div>
          <div class="mb20 ft12 gray6">
            {{item.abstracts}}
          </div>
          <div class="flex alcenter news_msg ft12">
            <span class="pr10 bdr">{{item.timer}}</span>
            <span class="pr10 bdr pl10">{{item.author}}</span>
            <span class="pr10 pl10">{{item.views}}次浏览</span>
            <span class="ml20 zan" @click="zan(item.thisid)"><img src="../assets/images/zan.png"><span>{{item.like}}</span></span>
          </div>
          </div>
          </div>
        </li>
        
      </ul>
      <div class="flex center ptb20" v-if="total>0">
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="15" @current-change="current" :prev-click="prev" :next-click="next"></el-pagination>
        </div>
        <p class="tc gray_blue ft12 ptb20" v-if="total==0">暂无数据</p> -->


      <div class="coin-tab hide">
        <ul class="coins">
          <li
            v-for="(coin,index) in quotation"
            :key="index"
            @click="nowCoin = coin.name"
            :class="{activeCoin:nowCoin == coin.name}"
          >
            {{$t('home.with')}}{{coin.name}} {{$t('home.markets')}}
            <span class v-if="nowCoin == coin.name"></span>
          </li>
          <li :class="{activeCoin:nowCoin == '自选'}" @click="nowCoin ='自选'">{{$t('home.myMarkets')}}</li>
        </ul>
      </div>
      <div class="coins-list hide">
        <div class="list-title">
          <span>{{$t('home.pair')}}</span>
          <span>{{$t('home.price')}}({{nowCoin}})</span>
          <span>{{$t('home.change')}}</span>
          <span>{{$t('home.high')}}</span>
          <span>{{$t('home.min')}}</span>
          <span>{{$t('home.volume')}}</span>

          <span>{{$t('home.trade')}}</span>
        </div>

        <ul class="list-con scroll" v-for="(item,index) in quotation" :key="index">
          <li
            v-for="(li,inde) in item.array"
            :key="inde"
            :data-name="li.currency_id+'/'+li.legal_id"
            v-if="(li.added&&nowCoin == $t('home.myMarkets')) || li.legal_name == nowCoin"
          >
            <div class="two-coin">
              <img :src="li.logo" alt style="width:30px;">
              <span style="font-weight:bold">
                <span class>{{li.currency_name}}</span>
                <span class="gray">/{{li.legal_name}}</span>
              </span>
            </div>
            <div class="yester">
              <!-- <span :class="setColor(li.change)">{{li.now_price==null?'0':li.now_price}}</span>/ -->
              <span class="bold">{{li.now_price==null?'0':li.now_price}}</span>
            </div>
            <div class="yes-toa">
              <!-- <span :class="setColor(li.last_price,li.yesterday_last_price)">{{li.change == null?'+0.000':li.change}}%</span> -->
              <span
                :class="setColor(li.change)"
                class="bold change"
              >{{(li.change>0?'+':'')+(li.change-0).toFixed(2)}}%</span>
            </div>
            <div>
              <span class="bold high_price">{{li.high_price}}</span>
            </div>
            <div>
              <span class="bold low_price">{{li.low_price}}</span>
            </div>
            <div class="count bold volume">{{li.volume == null?'0':li.volume}}</div>
            <div class style="color:#194B64;">
              <span
                class="fr el-icon-star-on"
                v-if="li.added"
                @click="addDelete('user_delete',li.thisid)"
                style="line-height:30px;margin-left:20px"
              ></span>
              <span
                class="fr el-icon-star-off"
                v-if="!li.added"
                style="line-height:30px;margin-left:20px"
                @click="addDelete('user_add',li.thisid)"
              ></span>
              <span class="fr" @click="setCurrent(index,inde)">{{$t('home.toTrade')}}</span>
              <!-- <span :hah='testMy(li.currency_id,li.legal_id)'>{{li.currency_id +''+li.legal_id}}</span> -->
            </div>
            <!-- <div>
                <span @click="setData({currency_id:item.id,legal_id:li.currency_id,currency_name:item.name,leg_name:li.name,isShow:index})">交易 </span>
            </div>-->
          </li>
        </ul>
        
      </div>
    </div>
    <div class="shadows" v-if="show_alert">
      <div class="masks ptb20 plr20 radius5">
        <span class="close ft16" @click="show_alert = false">X</span>
        <p class="tc ft16 mt10">{{title}}</p>
        <div class="mt20 ft14" v-html="content"></div>
      </div>
    </div>
  </div>
</template>


<script>
import "@/assets/style/iconfont2.css";
import "@/assets/style/iconfont.css";
import "@/assets/style/index.css";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
// import "@/assets/style/swiper4.min.css";
import indexHeader from "@/view/indexHeader";
import homeLogin from "@/view/homeLogin";
// var echarts = require("echarts");
export default {
  name: "homeContent",
  components: { indexHeader, homeLogin },
  data() {
    return {
      pics: [],
      quotation: [],
      nowCoin: "",
      //   banner_imgs:[
      //       {href:'',img:'../assets/images/bg2.png'},
      //       {href:'',img:'../assets/images/bg2.png'},
      //       {href:'',img:'../assets/images/bg2.png'}
      //   ],
      noticeList:[],
      newsList:[], //滚动新闻
      curSwiper: 0,
      curCoinTab: 0,
      coinTabList: [{ title: "USDT行情" }, { title: "BTC行情" }],
      coinKlineList: [],
      coinKline: {},
      swiperList: [],
      coinList: [],
      coin_list: [],
      account_number: "",
      token: "",
      myAdd: [],
      sortList:[],
      page:0,
      total:'',
      show_alert:false,
      title:'',
      content:''
    };
  },
  watch:{
    
  },
  created() {
    // var msg = this.$route.params.msg;
    var msg = localStorage.getItem('alert')
    //console.log(msg)
    if(msg){
      this.show_alert = true;
      localStorage.setItem('alert','')
    }else{
       this.show_alert = false;
    }
    this.getSort();
    this.getNewsLunbo();
    // this.alertNotice();
    setTimeout(() => {
              this.WebSocket();
            }, 1000);
    // this.getMyAdd();
    // this.init(this.initKline);
    this.token = window.localStorage.getItem("token") || "";
    this.getNoticeList(this.page);
    if (this.token) {
      // this.getQuotation()
      this.getMyAdd();
    } else {
      // this.getQuotation();
    }
    this.account_number = window.localStorage.getItem("accountNum") || "";

    eventBus.$on("loginSuccess", function() {
      location.reload();
    });
  },
  mounted() {
    this.getSwiper();

    var mySwiper = new Swiper(".swiper-container01", {
      // 如果需要分页器
      pagination: ".swiper-pagination01",
      paginationClickable: true,
      // 如果需要前进后退按钮
      slidesPerView: 5,
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    });

    // this.setChart();
    

    //  eventBus.$on('toNew', function (data) {
    //   //console.log(data);
    //   if(data){
    //         var newprice=data.newprice;
    //         var cname=data.istoken
    //         //console.log(that.currency_name)
    //         //console.log(newprice)
    //         $("span[data-name='"+cname+"']").html('$'+newprice);
    //     }
    // });
    // this.connect();
  },
  methods: {
    //弹出公告
    alertNotice(){
       this.$http({
         url:'api/news/alert',
       }).then(res=>{
         if(res.data.type == 'ok'){
             this.content = res.data.message.content;
             this.title = res.data.message.title;
         }
       })
    },
    //去币币交易页
    goTrade(l_id,c_id,l_name,c_name,now_price,change,volume,cny_price){
      var tradeDatas = {
            currency_id: c_id,
            legal_id: l_id,
            currency_name: c_name,
            legal_name: l_name,
            now_price:now_price,
            change:change,
            volume:volume,
            now_cny_price:cny_price
          };
          window.localStorage.setItem('tradeData',JSON.stringify(tradeDatas))
       this.$router.push('/dealCenter')
    },
    //获取新闻列表
    getNoticeList(page){
      var that = this;
      var language;
      if(this.$i18n.locale == 'zh'){
         language = 1 
      }
      if(this.$i18n.locale == 'en'){
         language = 2 
      }
      if(this.$i18n.locale == 'han'){
         language = 3 
      }
      if(this.$i18n.locale == 'jp'){
         language = 4
      }
        this.$http({
      url: "/api/" + "news/baijia",
      method: "get",
      params: {
        language: language ,
        page:page,
        limit:15
      }
    }).then(res => {
      //console.log(res);
      if (res.data.type == "ok") {
        var list = res.data.message.data;
        this.total = res.data.message.count;
        $.each(list,function(k,v){
          v.timer = that.timestampToTime(v.time)
        })
        this.noticeList = list;
      }
    });
    },
    current(val){
      //console.log(val)
      this.getNoticeList(val-1)
    },
    prev(val){
      this.getNoticeList(val-1)
    },
    next(val){
      this.getNoticeList(val-1) 
    },
    //进入新闻详情
    goNewsDetail(id){
       this.$router.push({path:'components/noticeDetail',query:{id:id}})
    },
    //轮播新闻
    getNewsLunbo(){
      var language;
      if(this.$i18n.locale == 'zh'){
         language = 1 
      }
      if(this.$i18n.locale == 'en'){
         language = 2 
      }
      if(this.$i18n.locale == 'han'){
         language = 3 
      }
      if(this.$i18n.locale == 'jp'){
         language = 4
      }
        this.$http({
      url: "/api/" + "news/lunbo",
      method: "get",
      params: {
        language: language ,
        // c_id: 21
      }
    }).then(res => {
      //console.log(res);
      if (res.data.type == "ok") {
        var list = res.data.message;
        this.newsList = list;
      }
    });
    },
    //点赞
    zan(id){
       this.$http({
         url:'/api/news/add_like',
         data:{id:id},
         method:'post',
         headers: { Authorization: this.token }
       }).then(res=>{
         layer.msg(res.data.message);
         if(res.data.type == 'ok'){
           $.each(this.noticeList,function(k,v){
             if(id == v.thisid){
               v.like++;
             }
           })
         }
       })
    },
    //websocket
    WebSocket(){
      var that = this;
       // 打开一个 web socket
        var ws = new WebSocket("wss://ws.bitfdn.com/ws");
        
        ws.onopen = function()
        {
          // Web Socket 已连接上，使用 send() 方法发送数据
          var sendData={socket_type:'daymarket',subscribed:1}
          sendData = JSON.stringify(sendData);
          //console.log(sendData)
          ws.send(sendData);
        };
        
        ws.onmessage = function (evt) 
        { 
          var msg = JSON.parse(evt.data);
          //console.log(msg)
          if(msg.type == 'daymarket'){
            //console.log(that.sortList)
             $.each(that.sortList,function(k,v){
               if(v.currency_id == msg.currency_id && v.legal_id == msg.legal_id){
                   v.change = msg.change;
                   v.volume = msg.volume;
                   v.now_price = msg.now_price;
                   v.cny_price = msg.now_cny_price;
               }
             })
          }
        };
        
        ws.onclose = function()
        { 
          // 关闭 websocket
        };
    },
    //涨幅榜
    getSort(){
       this.$http({
          url: "/api/quotation/sort",
          params: { is_show:1 },
          headers: { Authorization: this.token }
       }).then(res=>{
          if(res.data.type == 'ok'){
            this.sortList = res.data.message;
          }
       })
    },
    getMyAdd() {
      if (this.token) {
        this.$http({
          url: "/api/match/my_match",
          params: { type: "change" },
          headers: { Authorization: this.token }
        }).then(res => {
          if (res.data.type == "ok") {
            var list = res.data.message;
            this.myAdd = list;

            this.getQuotation();
          }
        });
      } else {
        if (this.$i18n.locale == "zh") {
          layer.msg("请先登录");
        } else {
          layer.msg("Please sign in");
        }
      }
    },
    testMy(c, l) {
      if (this.myAdd.length) {
        var cid = c;
        var lid = l;
        var s = this.myAdd.filter(function(item) {
          return item.currencyId == cid && item.legalId == lid;
        });
        if (s.length) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    addDelete(url, id) {
      if (this.token) {
        this.$http({
          url: "/api/match/" + url,
          method: "post",
          data: { id: id },
          headers: { Authorization: this.token }
        }).then(res => {
          layer.msg(res.data.message);
          this.getMyAdd();
        });
      } else {
        layer.msg("请先登录");
      }
    },
    getSwiper() {
      var type;
      if(this.$i18n.locale == "zh"){
          type = 1
      }
      if(this.$i18n.locale == "en"){
          type = 3
      }
      if(this.$i18n.locale == "han"){
          type = 5
      }
      if(this.$i18n.locale == "jp"){
          type = 7
      }
      this.$http({
        url: '/api/slide_show/list',
        params:{type}
      }).then(res => {
        //console.log(res);
        this.pics = res.data.message;
      });
    },
    setData(obj) {
      window.localStorage.setItem("tradeData", JSON.stringify(obj));
      this.$router.push("/dealCenter");
    },
    //登录
    go_login() {
      this.$router.push("/components/login");
    },
    //注册
    go_register() {
      this.$router.push("/components/register");
    },
    connect() {
      var that = this;
      //console.log("socket");
      that.$socket.emit("login", this.$makeSocketId());
      that.$socket.on("daymarket", msg => {
        //console.log(msg);
        var cname = msg.currency_id + "/" + msg.legal_id;
        var now_price = msg.now_price;
        var change = (msg.change - 0).toFixed(2);
        if (change < 0) {
          $("li[data-name='" + cname + "']")
            .find(".yes-toa span")
            .css("color", "#ff6e42")
            .html(change + "%");
        } else {
          $("li[data-name='" + cname + "']")
            .find(".yes-toa span")
            .css("color", "#459e80")
            .html("+" + change + "%");
        }
        //console.log(cname);
        // var zf = 0;
        // if (toprice - yesprice == 0) {
        //   zf = "0%";
        // } else if (toprice == 0) {
        //   zf = "-100";
        // } else if (yesprice) {
        //   zf = "+100%";
        // } else {
        //   zf = ((toprice - yesprice) / yesprice / 100).toFixed(2);
        //   if (zf > 0) {
        //     zf = "+" + zf + "%";
        //   } else {
        //     zf = zf + "%";
        //   }
        // }
        // var zf = toprice - yesprice;
        $("li[data-name='" + cname + "']")
          .find(".yester span")
          .html((now_price - 0).toFixed(8));
        // $("li[data-name='" + cname + "']")
        //   .find(".today span")
        //   .html(toprice);

        $("li[data-name='" + cname + "']")
          .find(".high_price")
          .html((msg.high_price - 0).toFixed(8));
        $("li[data-name='" + cname + "']")
          .find(".low_price")
          .html((msg.low_price - 0).toFixed(8));
        $("li[data-name='" + cname + "']")
          .find(".volume")
          .html((msg.volume - 0).toFixed(5));
      });
    },
    setColor(c) {
      if (c >= 0) {
        return "ceilColor";
      } else if (c < 0) {
        return "redColor";
      } else {
        return "";
      }
    },
    setCurrent(index, inde) {
      let msg = this.quotation[index];
      let quo = msg.array[inde];
      var tradeData = {
        currency_id: quo.currency_id,
        legal_id: quo.legal_id,
        currency_name: quo.currency_name,
        legal_name: quo.legal_name,
        isShow: index,
        change: quo.change,
        volume: quo.volume
      };
      window.localStorage.setItem("tradeData", JSON.stringify(tradeData));
      this.$router.push("/dealCenter");
    },
    getQuotation() {
      var i = layer.load();
      this.$http({
        url: "/api/currency/change_match",
        method: "get"
      }).then(res => {
        layer.close(i);
        //console.log(res.data);
        if (res.data.type == "ok" && res.data.message.length != 0) {
          var msg = res.data.message;
          if (this.myAdd.length) {
            //console.log(this.myAdd);
            msg.forEach((item, index) => {
              this.myAdd.forEach((ite, ind) => {
                if (item.legal_id == ite.legal_id) {
                  item.array.find(c => {
                    return c.currency_id == ite.currency_id;
                  }).added = true;
                }
              });
            });
            //console.log(msg);
          }

          this.quotation = res.data.message;
          //console.log(this.quotation);
          this.nowCoin = this.quotation[0].name;
          let msg = res.data.message[0];
          let quo = msg.data[0].array[0];
          var tradeData = {
            currency_id: quo.currency_id,
            legal_id: quo.legal_id,
            currency_name: quo.currency_name,
            legal_name: quo.legal_name,
            isShow: 0,
            change: quo.change,
            volume: quo.volume
          };
          if (!window.localStorage.getItem("tradeData")) {
            window.localStorage.setItem("tradeData", JSON.stringify(tradeData));
          }
        }
      });
    },
    getCurrent(index) {
      this.curCoinTab = index;
    },
    mouseEnter(index) {
      this.curSwiper = index;
    },
    init(callback) {
      this.$http.post("/api/" + "quotation").then(res => {
        if (res.data.type == "ok") {
          this.coinList = res.data.message.coin_list;
          this.swiperList = res.data.message.coin_list;
          callback && callback();
        } else {
          // layer.msg(res.message);
        }
      });
    },
    initKline() {
      this.$http.post("/api/" + "historical_data").then(res => {
        if (res.data.type == "ok") {
          if (res.data.message.day.length > 0) {
            this.coinKline = res.data.message.day[0].data;
            this.coinKlineList = res.data.message.day;
          }
          //console.log(res.data.message.day[0].data);
          //console.log(res.data.message.day);
        }
      });
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      return Y + M + D;
    },

    setChart() {
      var myChart = echarts.init(document.getElementById("chart"));
      var that = this;
      // 指定图表的配置项和数据
      var base = 2;
      var date = [];
      var data = [1, 2, 4, 5, 6, 7, 8];
      var now = new Date();
      //console.log(that.coinKlineList);
      for (var i in that.coinKlineList) {
        let temp = that.timestampToTime(that.coinKlineList[i].timestamp);
        //console.log(temp);
        date.push(temp);
      }
      //console.log(date);
      var option = {
        textStyle: {
          color: "#d45858"
        },
        backgroundColor: "#fff",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#fff"
            }
          }
        },
        title: {
          left: "center",
          text: "24小时数据图"
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "5%",
          containLabel: true
        },
        toolbox: {
          feature: {
            // dataZoom: {
            //     yAxisIndex: 'none'
            // },
            // restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
          color: ["#ff9232"]
        },

        yAxis: {
          type: "value",
          yaxisLabel: {
            backgroundColor: "#fff"
          }
        },
        series: [
          {
            name: "当前价格",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              normal: {
                // 6e446e
                color: "#6e446e"
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#6e446e"
                  },
                  {
                    offset: 1,
                    color: "#1e1e2a"
                  }
                ])
              }
            },

            data: data
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
    // go_detail(index,inde){
    //   this.$router.push({
    //     path:'/dealCenter',
    //     name:'dealCenter',
    //     params:{
    //       legal_index:index,
    //       currency_index:inde
    //     }
    //   })
    // }
  }
};
</script>
<style lang='scss' scoped>

.banner_wrap {
  background: url("../assets/images/bg-banner.png") top center no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 500px;
  padding: 0 150px;
}
.el-carousel--card{
  width: 100%;
}
.market_list {
  width: 100%;
  padding: 30px 0;
  background: #1c1066;
}
.market_list li{
  border-right: 1px solid #2d2a83;
}
.blue {
  color: #a8adcc;
}
.greens {
  color: #27b054;
}
.news_msg{
  color: #7E90BE;
}
.bdr{
  border-right: 1px solid #7E90BE;
}
.swiper-container {
  // height: 310px;
}
.swiper-slide > img {
  width: 100%;
  height: 590px;
}
.swiper-container a {
  display: block;
  // height: 310px;
}
.swiper-container img {
  display: block;
  // margin-top: -50px;
  // height: 310px;
}
.market_li {
  width: 16.6%;
  padding: 0 20px;
}
.mews_img{
  width: 150px;
  height: 120px;
  cursor: pointer;
}
.news_content{
  margin: 15px auto;
  border-radius: 8px;
  min-height:800px;
}
.coin-tab {
  max-width: 90%;
  margin: 0 auto;
  line-height: 52px;
  height: 52px;
  background: #194b64;
  // color: #c7cce6;
  display: flex;
  > ul {
    max-width: 90%;
    display: flex;
    li {
      padding: 0 40px;
      color: #ddd;
      border-bottom: 1px solid #fff;
      border-right: 1px solid #fff;
      // box-shadow: 0 0 1px hsla(231, 9%, 54%, 0.2);
    }
    .activeCoin {
      border-bottom: none;
      // color: #d45858;
    }
  }
}
/* 币种列表 */
.coins-list {
  margin: 10px auto;
  max-width: 90%;
  line-height: 51px;
  text-align: center;
  margin-top: 0;
  border: 1px solid #194b64;
  .list-title {
    display: flex;
    padding: 0 30px;
    background: #194b64;
    > span {
      flex: 1;

      text-align: center;
      // color: #c7cce6;
      font-size: 14px;
      color: #fff;
    }
    > span:first-child {
      text-align: left;
    }
    > span:last-child {
      text-align: right;
    }
  }
  .list-con {
    background: #f0f0f0;
    max-height: 400px;
    overflow-y: scroll;
    // border: 1px solid #563bd1;
    border-top: none;

    li {
      cursor: pointer;
      display: flex;
      // border-top: 1px solid #ddd;
      padding: 10px 30px;
      line-height: 30px;
      // color: #c7cce6;
      &:hover {
        background: #fff;
      }
      .high_blue {
        color: #563bd1;
      }
      .low_blue {
        color: #8d75f7;
      }
      img {
        vertical-align: bottom;
      }
      > div {
        flex: 1;
        text-align: center;
      }
      > div:first-child {
        text-align: left;
      }
      > div:last-child {
        text-align: right;
      }
    }
    li:last-child {
      // border-bottom: 1px solid #ddd;
    }
  }
}
.carousel .swiper-slide:hover {
  background-color: #327add;
}
.nav_left,
.con_left {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.withdraw {
  margin: 0 4px;
}
.carousel .last a:hover {
  cursor: pointer;
}
.sliders {
  width: 100%;
}
.sliders img {
  width: 100%;
  // height: 500px;
}
.notice_ul {
  padding: 25px 0;
  // background: #161923;
  margin-bottom: 5px;
  background: #e8eaf4;
}
.notice_li {
  // flex: 1;

  text-align: center;
}
.notice_li a {
  padding: 0 25px;
  // letter-spacing: 5px;
  color: #020241;
}
.notice_li::after {
  content: "/";
  float: right;
}
.notice_li:last-child:after {
  content: "";
  color: #6b80ae;
}
.notice_a:hover {
  color: #194b64;
  cursor: pointer;
}
.coins li {
  position: relative;
}
.arrow {
  border-width: 16px;
  border-right: 8px solid transparent;
  border-left: 8px solid transparent;
  border-top: none;
  border-bottom: 8px dashed;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -4px;
}
.coins li:hover {
  cursor: pointer;
  // background: #303e4c;
}
.content01 {
  padding: 40px 0;
  background: #fff;
  .imgs01 {
    width: 300px;
  }
  .imgs02 {
    width: 400px;
  }
  .imgs03 {
    width: 450px;
  }
  .imgs04 {
    width: 450px;
  }
  .imgs05 {
    width: 450px;
  }
}
.bg01 {
  background: url("../assets/images/content_bg01.png") center no-repeat;
  width: 100%;
  // height: 300px;
  background-size: cover;
  padding: 50px 0;
}
.bg02 {
  background: url("../assets/images/content_bg02.png") center no-repeat;
  width: 100%;
  background-size: cover;
  // padding: 0!important;
  padding: 50px 0;
}
.login_btn {
  padding: 15px 80px;
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 5px;
  cursor: pointer;
}
.register_btn {
  padding: 15px 80px;
  background: #563bd1;
  border-radius: 5px;
  cursor: pointer;
}
.go_transfer {
  padding: 50px 0;
}
.foot {
  padding: 50px 0;
}
.zan{
  cursor: pointer;
}
.news_msg{
  cursor: pointer;
}
.shadows{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}
.masks{
  width: 60%;
  height: 70%;
  background: #fff;
  position: relative;
}
.close{
  position: absolute;
  top: 10px;
  right: 12px;
  cursor: pointer;
}
</style>


