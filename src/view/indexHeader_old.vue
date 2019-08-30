<template>
  <div id="index-head" class="flex">
    <div class="header-l flex">
      <div class="logo flex alcenter mr20" @click="goHome">
        <img src="../assets/images/hxex_logo.svg" alt style="width:150px;">
      </div>
      <!-- <span class="mr60 titles" @click="goHome">一带一路</span> -->
      <router-link to="/" exact>{{$t('header.home')}}</router-link>
      <router-link to="/legalTrade">{{$t('header.c2c')}}</router-link>
      <!-- <div v-else>{{$t('header.c2c')}}</div> -->
      <!-- <router-link v-if="token" to="/c2c">{{$t('header.c2cTransfer')}}</router-link>
      <div v-else @click="goLogin()">{{$t('header.c2cTransfer')}}</div> -->
      <router-link to="/dealCenter">{{$t('header.currency')}}</router-link>
      <!-- <router-link to="/leverdealCenter" v-if="token">{{$t('lever.transaction')}}</router-link>-->
      <!-- <div @click="noopen">{{$t('lever.transaction')}}</div> -->
      <!--我的商铺-->
      <router-link to="/myLegalShops" v-if="isShow">{{$t('header.shop')}}</router-link>
      <!-- <router-link to="/finance" v-if="token">{{$t('header.assets')}}</router-link>
      <div v-else @click="goLogin()">{{$t('header.assets')}}</div> -->
     
      
       <!-- <router-link to="/helpcenter">{{$t('header.help')}}</router-link> -->
      <!-- <router-link v-if="token" to="/advice">{{$t('header.complaint')}}</router-link>
      <div v-else @click="goLogin()">{{$t('header.complaint')}}</div> -->
      <router-link to="/passCard">{{$t('header.pro')}}</router-link>
       <router-link to="/crowFinding">FDN PEAK</router-link>
       <!-- <div @click="noopen">存币宝</div>
       <div @click="noopen">投票上币</div> -->
       <router-link to="/depositCoin">{{$t('header.cun')}}</router-link>
       <router-link to="/vote">{{$t('header.vote')}}</router-link>
       <router-link to="/sgr">SGR返利</router-link>
      <!--------糖果------->
      <!-- <div @click="candy">{{$t('header.candy')}}</div>
       <div @click="candy">{{$t('header.coin')}}</div>
        <div @click="candy">{{$t('header.show')}}</div>
         <router-link to="/currencyExchange" v-if="token">{{$t('header.exchange')}}</router-link>
      <div v-else @click="goLogin()">{{$t('header.exchange')}}</div>
      <router-link to="/components/cfc">{{$t('header.cfc')}}</router-link> -->
      <!----------------->
      <!-- <div v-else @click="goLogin()">转至CFC</div> -->
      <!-- <router-link to="/components/noticeList">公告</router-link>
      <div class="coin-box">
        <router-link to="/currencyApply">上币申请</router-link>
        <router-link to="/currencyList" >币种列表</router-link>
      </div>-->
      <!-- <div>
        <div class="download">
          <div>app下载</div>
          <img src="../assets/images/ewm.png" alt="">
        </div>
      </div>-->
    </div>
    <div class="header-r flex">
      
      <div v-if="!account_number.length" class="flex">
        <router-link to="/components/login"><span class="login_btn">{{$t('header.in')}}</span></router-link>
        <router-link to="/components/register"><span class="login_btn">{{$t('header.up')}}</span></router-link>
      </div>
      <div v-if="account_number.length" class="flex">
        <!-- <div class="assets">
          <div>资产</div>
          <div class="links">
            <router-link to='/finance'>交易</router-link>
           
          </div>
        </div>-->
        <!-- <div class="order">
          <span>{{$t('header.orders')}}</span>
          <ul class="order_list blue_bg">
            <li class="now" @click="now">{{$t('header.current')}}</li>
            <li class="history" @click="history">{{$t('header.his')}}</li>
          </ul>
        </div> -->
        <div class="links-box">
          <div class="account_number"><span>UID:{{user_id}} </span><span class="ml5 mr5">|</span> hi, {{account_number}}<img class="ml5" :src="vip0"></div>
          <div class="links blue_bg">
            <router-link to="/userCenter">{{$t('header.center')}}</router-link>
            <!-- <router-link to="/userSetting" v-if="token">{{$t('header.setting')}}</router-link>   
            <div v-else @click="goLogin()">{{$t('header.setting')}}</div> -->
            <div @click="signOut">{{$t('header.out')}}</div>
          </div>
        </div>
        
      </div>
      <!-- <div class="flex notice" @mouseover="showNot = true" @mouseleave="showNot = false">
        <img src="../assets/images/not.png" @mouseover="getNotice();" alt="">
        <p :class="['scroll',{showNot:showNot}]">
          <span @click="$router.push({path:'/components/noticeDetail',query:{id:item.thisid}})" v-for="(item,index) in noticeList" :key="index">{{item.title}}</span>
        </p>
      </div> -->
      <div>
        <span></span>
      </div>
      <!---翻译-->
      <div class="ml20 lang_wrap"  @mouseover="over_lang" @mouseout="out_lang">
        <p class="flex alcenter">
          <img class="mr10" :src="lang_img">
          <span class="mr10">{{lang_text}}</span>
          <img src="../assets/images/arrow0.png">
        </p>
        <div class="plr5 lang_box">
          <p class="flex alcenter" v-for="(item,index) in langArr" :key="index" @click="set_lang(item.src,item.text,item.lang)">
            <img class="mr10" :src="item.src">{{item.text}}
          </p>
        </div>
      </div>
      <!---翻译-->
      <!-- <div class="flex lang-box">
          <span @click="setLang('zh')">中</span>
          <span @click="setLang('en')">En</span>
        </div> -->
      <!-- <div class=" theme flex">
          <img src="../assets/images/dark.png"  @click="$changeTheme('light')" alt="">
          <img src="../assets/images/light.png" @click="$changeTheme('dark')" alt="">
          
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account_number: "",
      extension_code: "",
      token: "",
      isShow: false,
      noticeList:[],
      showNot:false,
      user_id:'',
      vip0:'',
      vip1:require('../assets/images/VIP1.png'),
      vip2:require('../assets/images/VIP2.png'),
      vip3:require('../assets/images/VIP3.png'),
      langArr:[
        {
          src:require('../assets/images/zh.png'),
          text:this.$t('lang.zh'),
          lang:'zh'
        },
        {
          src:require('../assets/images/en.png'),
          text:this.$t('lang.en'),
          lang:'en'
        },
        {
          src:require('../assets/images/han.png'),
          text:this.$t('lang.han'),
          lang:'han'
        },
        {
          src:require('../assets/images/jp.png'),
          text:this.$t('lang.jp'),
          lang:'jp'
        }
      ],
      lang_img:require('../assets/images/zh.png'),
      lang_text:this.$t('lang.zh')
    };
  },
  created() {
    this.getNotice()
    this.token = window.localStorage.getItem("token") || "";
    this.account_number = window.localStorage.getItem("accountNum") || "";
    this.extension_code = window.localStorage.getItem("extension_code") || "";
    eventBus.$on("toHeader", msg => {
      if (msg.account) {
        this.account_number = msg.account;
        this.extension_code = msg.extension_code;
      }
    });
    if (this.token) {
      this.init();
    };
    var lang = localStorage.getItem('locale');
    if(lang == 'zh'){
      this.lang_img = require('../assets/images/zh.png');
      this.lang_text = this.$t('lang.zh')
    }else if(lang == 'en'){
      this.lang_img = require('../assets/images/en.png');
      this.lang_text = this.$t('lang.en')
    }else if(lang == 'han'){
      this.lang_img = require('../assets/images/han.png');
      this.lang_text = this.$t('lang.han')
    }else if(lang == 'jp'){
      this.lang_img = require('../assets/images/jp.png');
      this.lang_text = this.$t('lang.jp')
    }
  },
  mounted() {
    eventBus.$on("toHeader", msg => {
      if (msg.account) {
        this.extension_code = msg.extension_code;

        this.account_number = msg.account;
      }
    });
  },
  methods: {
    set_lang(img,text,lang){
      this.lang_img = img;
      this.lang_text = text; 
      $('.lang_box').css('display','none');
      var l = window.localStorage.getItem("locale") || "zh";
      if (l == lang) {
        return;
      } else {
        window.localStorage.setItem("locale", lang);
        this.$i18n.locale = lang;
        window.location.reload();
      }
    },
    over_lang(){
      $('.lang_box').css('display','block')  
    },
    out_lang(){
      $('.lang_box').css('display','none')
    },
    candy(){ 
       layer.msg(this.$t('lay.notopen'))   
    },
    noopen(){ 
       layer.msg(this.$t('lay.notopen'))   
    },
    getNotice(){
      this.$http({
        url:  '/api/news/list',
        method:'get',
        data:{language:this.$i18n.locale == 'zh'?1:2,c_id:21}
      }).then(res => {
        this.noticeList = res.data.message.list;
      })
    },
    setLang(lang) {
      var l = window.localStorage.getItem("locale") || "zh";
      if (l == lang) {
        return;
      } else {
        window.localStorage.setItem('locale',lang);
        this.$i18n.locale = lang;
        window.location.reload();
      }
    },
    goHome() {
      this.$router.push("/");
    },
    now() {
      this.$router.push("/entrust");
    },
    history() {
      this.$router.push("/hisentrust");
    },
    signOut() {
      this.account_number = "";
      var account = localStorage.getItem('accountNum');
      var password = localStorage.getItem('password');
      var tradeData = localStorage.getItem('tradeData');
      // window.localStorage.removeItem("token");
      // window.localStorage.removeItem("accountNum");
      // window.localStorage.removeItem("user_id");
      // window.localStorage.removeItem("extension_code");
      window.localStorage.clear();
      localStorage.setItem('tradeData',tradeData);
      // window.localStorage.setItem('accountNum',account);
      // window.localStorage.setItem('password',password)
      // this.$router.push("/components/login");
    },
    goLogin() {
      this.$router.push("/components/login");
    },
    init() {
      this.$http({
        url: "/api/user/info",
        method: "GET",
        data: {},
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok") {
          window.localStorage.setItem("status", res.data.message.review_status);
          window.localStorage.setItem("userId", res.data.message.thisid);
          this.user_id = res.data.message.thisid
          if (res.data.message.is_merchant == "1") {
            this.isShow = true;
          };
          if(res.data.message.level==1){
            this.vip0 = this.vip1
          };
          if(res.data.message.level==2){
            this.vip0 = this.vip2
          };
          if(res.data.message.level==3){
            this.vip0 = this.vip3
          }
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.login_btn{
  padding: 3px 15px;
  border: 1px solid #4A90E2;
  border-radius: 4px;
}
.notice{
  position: relative;
  margin: 0 10px 0 20px;
  padding: 12.5px 10px;
  height: 45px;
  cursor: pointer;
  img{
    width: 20px;
    height: 20px;
  }
  >.showNot{
    padding-top: 10px;
    height: 200px;
    transition: all .3s;
    overflow: scroll;
  }
  >p{
    position: absolute;
    
    width: 220px;
    border-radius: 4px;
    box-shadow: 0 2px 3px #ccc;
    top: 45px;
    left: -100px;
    background: #fff;
    z-index: 999;
    height: 200px;
    overflow: auto;
    transition: all .3s;
    height: 0;
    overflow: hidden;
    span{
      margin: 0 10px;
      display: block;
      font-size: 12px;
      line-height: 32px;
      color: #333;
      border-bottom: 1px dashed #eee;
      &:hover{
        color: #d45858;
      }
    }
  }
}
.lang-box{
  margin-left: 10px;
  span{
    margin-left: 20px;
    cursor: pointer;
  }
}
.titles {
  cursor: pointer;
}
.order {
  margin-right: 15px;
  position: relative;
  cursor: pointer;
  padding-right: 20px;
  background: url("../assets/images/arrow0.png") no-repeat right center;
}
.order_list {
  min-width: 80px;
  left: -10px;
  position: absolute;
  background: #2e1b85;
  color: #fff;
  padding: 0 10px;
  z-index: 999999;
}
.order_list {
  display: none;
}
.order:hover ul {
  display: block;
}
.order_list li {
  line-height: 30px;
}
.order_list li:hover {
  color: #d45858;
}
#index-head:hover{
    //  background:rgba(0, 0, 0, 0.11);
     cursor: pointer;
   }
#index-head {
  justify-content: space-between;
  padding: 0 20px;
  // min-width: 1200px;
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 12px;
  background: #111114!important;
  color: #A8ADCC;
    position: fixed;
    top: 0;
    z-index: 999;
  a:hover,
  .router-link-active {
    color: #fff;
    
  }
  .header-l .router-link-active {
    border-bottom: 2px solid #0FD5FF;
  }
  .header-r .router-link-active span{
    background: #4A90E2 ;
  }
  .currency-list,
  .lalala {
    display: none;
  }
  > .header-l {
    align-items: center;
    > .logo {
      // border-radius: 50%;
      width: 120px;
      // height: 30px;
      // background: #fff;
      > img {
        // width: 100%;
      }
    }
    > a,
    > div {
      margin-right: 25px;
      height: 45px;
      cursor: pointer;

      > a {
        display: block;
      }
    }
    > div:hover {
      color: #fff;
    }
    > .coin-box {
      position: relative;
      a:last-child {
        display: none;
        position: absolute;
        width: 130%;
        text-align: center;
        left: -15%;
      }
      &:hover {
        a:last-child {
          display: block;
          background: #181b2a;
          // text-align: center;
        }
      }
    }
    .download {
      position: relative;
      img {
        position: absolute;
        display: none;
        width: 100px;
        height: 100px;
        z-index: 999;
        left: -20px;
      }
      &:hover {
        img {
          display: block;
        }
      }
    }
  }
  .header-r {
    a {
      margin: 0 20px;
    }
    .assets {
      position: relative;
      margin-right: 25px;
      padding-left: 25px;
      background: url("../assets/images/assets.png") no-repeat left center;
      background-size: 20px 20px;
      cursor: pointer;
      > div:first-child {
        padding-right: 14px;
        background: url("../assets/images/arrow0.png") no-repeat right center;
      }
      > .links {
        position: absolute;
        right: 0;
        width: 80px;
        z-index: 999;
        text-align: center;
        background: #181b2a;
        display: none;
        a {
          margin: 0;
          display: block;
        }
      }
      &:hover {
        .links {
          display: block;
        }
      }
    }
    .links-box {
      position: relative;
      cursor: pointer;
      padding-right: 20px;
      background: url("../assets/images/arrow0.png") no-repeat right center;

      &:hover {
        .links {
          display: block;
        }
      }
      .account_number {
        padding-left: 20px;
        // background: url("../assets/images/icon_mine.png") no-repeat left center;
        background-size: 15px;
      }
      .links {
        position: absolute;
        right: 0;
        z-index: 999;
        background: #181b2a;
        display: none;
        a {
          border-bottom: 1px solid #383d54;
        }
        a,
        div {
          display: block;
          padding: 0 14px;
          margin: 0;
          text-align: center;
          &:hover {
            color: #d45858;
          }
        }
      }
    }
    .theme > img {
      cursor: pointer;
      margin-left: 15px;
      margin-top: 12.5px;
      width: 20px;
      height: 20px;
    }
  }
}
.lang_box {
  display: none;
  background: #0d1a6c;
  border-radius: 3px;
}
.lang_wrap {
   width: 120px;
  >p{
    padding: 0 5px;
  }
  &:hover {
    .lang_box {
      display: block;
    }
  }
}

.lang_box p {
  padding: 0 6px;
  width: 120px;
}
.lang_box p:hover {
  background: #2c3883;
}
</style>
