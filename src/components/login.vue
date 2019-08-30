<template>
<div id="login" class="login clr-part">
    <indexHeader></indexHeader>
    <div class="contentBK">
        <div class="content-wrap">
            <div class="account">
                <div class="main flex">
                    <div style="margin: 0 auto;">
                      <p class="main_title">{{$t('login.welcome')}}</p>
                      <div v-if="show">
                      <div class="register-input">
                        <input type="text" class="input-main input-content phone" :placeholder="$t('accounts')" v-model="account_number" id="account" :style='{width:isMb?"400px !important":"400px !important"}'>
                      </div>
                      <div class="register-input pass-box" style="width:400px;">
                          <input :type="showpass?'text':'password'" :placeholder="$t('pwd')" style="width: 400px;" class="input-main input-content" maxlength="16" @keyup.enter="login" v-model="password" id="pwd">
                          <img src="../assets/images/showpass.png" alt="" style="top: 13px" v-if="showpass" @click="showpass = false">
                          <img src="../assets/images/hidepass.png" alt="" style="top: 13px;" v-if="!showpass" @click="showpass = true">
                      </div>
                      <div class="have-account">
                        <router-link tag="span" class=" forget" to="/forgetPwd" style="cursor:pointer">{{$t('login.forget')}}?</router-link>
                      </div>
                      </div>
                      <!--验证码-->
                    
                      <div class="register-input bdr-part" v-if="codeType == 1 || codeType == 2">
                          <span class="register-item">{{$t('code')}}</span>
                          <div class="flex">
                      <input type="text" v-model="code" class="codes" id="code" style="border-right:none">
                      
                      <button type='button' class="code-btn redBg curPer" @click="sendCode">{{$t('code')}}</button>
                      </div>
                  </div>
                  <div class="register-input bdr-part" v-if="codeType == 3">
                          <span class="register-item">谷歌验证码</span>
                          <div class="flex">
                          <input type="text" v-model="code" class="codes" id="code" style="width:300px;border-radius:3px;">
                      </div>
                  </div>
                  <div style="margin-top: 10px;">
                      <span class="register-item"></span>
                      <!-- 登陆 -->
                      <button v-if="show" class="register-button curPer redBg " @click="login">{{$t('header.in')}}</button>
                      <button v-if="!show" class="register-button curPer redBg " @click="login02">{{$t('header.in')}}</button>
                  </div>
                  <p v-if="show" class="mt10 ft14 go_register">{{$t('register01.noAccount')}}<router-link :to="{ name: 'register'}" class="zhuce">{{$t('registers')}}</router-link></p>
                  
                  </div>
                    
                </div>
                <div class="global-ad">
                  <div class="qrcode">
                    <img src="../assets/images/appImg.png" alt="">
                    <!--<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29">
                      <path
                        d="M0 0h7v7h-7zM10 0h1v2h-1zM12 0h4v1h2v-1h3v3h-1v-2h-1v1h-3v2h1v-1h1v1h1v-1h1v2h-2v1h-1v-1h-2v-1h-1v-1h1v-1h-1v1h-1v1h-1v-2h1v-1h-1zM22 0h7v7h-7zM1 1v5h5v-5zM8 1h1v1h-1zM23 1v5h5v-5zM2 2h3v3h-3zM24 2h3v3h-3zM8 3h3v1h-1v2h-1v1h-1v-2h1v-1h-1zM11 5h2v2h-1v-1h-1zM10 6h1v1h1v2h-1v-1h-1v1h-2v1h-1v-1h-1v-1h3v-1h1zM14 6h1v2h-1zM16 6h1v2h-1zM18 6h1v2h1v1h1v-1h1v1h1v-1h1v1h1v2h1v1h1v1h-2v-1h-1v1h1v1h2v1h-3v-1h-2v1h1v1h-3v2h-2v1h-2v2h-2v-1h1v-1h-1v1h-1v1h-1v-2h1v-1h-1v-1h3v1h1v-1h1v-1h1v1h1v-1h-1v-1h2v-1h-2v-1h1v-2h1v1h1v1h2v-1h-1v-2h-4v1h-1v1h-1v-1h-2v1h-1v1h-1v-2h1v-1h-1v-1h4v1h1v-2h1zM20 6h1v1h-1zM0 8h5v1h-3v1h-2zM25 8h1v1h-1zM27 8h1v1h-1zM5 9h1v1h1v1h-2zM10 9h1v2h-1zM28 9h1v1h-1zM8 10h1v2h2v1h-2v1h-1zM0 11h4v1h-1v1h1v1h-1v2h1v-1h1v1h2v1h-2v1h-1v-1h-1v1h-2v3h-1v-4h2v-1h-2v-1h1v-1h1v-1h-1v-1h-1zM27 11h1v1h-1zM4 12h3v1h-3zM14 12h1v1h-1zM17 12h1v1h-1zM0 13h1v1h-1zM28 13h1v1h-1zM6 14h2v1h1v-1h4v1h-1v2h-1v1h-1v-1h-1v-1h-2v-1h-1zM15 14h1v1h1v1h-1v1h-1v-1h-1v-1h1zM27 15h1v1h-1zM25 16h2v3h-1v-2h-1zM7 17h2v1h-1v1h1v1h-1v1h-2v-1h1v-1h-2v-1h2zM21 17h4v1h-2v1h-2v1h2v-1h1v1h1v1h1v-1h1v-1h1v1h1v2h-2v1h-2v2h-3v1h1v1h1v-1h1v-1h1v-1h1v-1h2v1h-1v1h1v1h-1v2h-1v-1h-1v1h-2v1h-3v-1h1v-1h-1v-1h-3v1h-1v-1h-1v-1h1v-1h1v1h2v-1h-1v-2h1v-1h-1v-2h1v-1h1zM28 17h1v1h-1zM3 18h1v2h-1v1h-1v-2h1zM4 20h1v1h-1zM17 20h1v1h-1zM8 21h2v1h-1v1h-1zM16 21h1v1h1v1h-1v1h-1v-1h-1v-1h1zM21 21v3h3v-3zM0 22h7v7h-7zM11 22h2v1h-1v2h-1v-1h-1v-1h1zM22 22h1v1h-1zM1 23v5h5v-5zM14 23h1v1h-1zM2 24h3v3h-3zM8 24h2v1h-1v1h2v1h-1v1h-1v1h-1zM12 25h3v1h1v1h1v1h-2v-1h-1v1h-1v1h-1v-2h1v-1h-1zM18 27h1v1h-1zM20 27h1v1h-1zM10 28h1v1h-1zM14 28h1v1h-1zM17 28h1v1h-1zM19 28h1v1h-1zM26 28h1v1h-1z"></path>
                    </svg>-->
                  </div>
                  <div class="cell-content">
                    <p data-v-9f594e28="" class="text">FDN App</p>
                    <p class="text">随时随地 便捷交易</p>
                    <p class="other">扫描二维码下载TREX App</p></div>
                </div>
            </div>
        </div>
    </div>
    <!-- <indexFooter></indexFooter> -->
</div>

</template>

<script>
import indexHeader from "@/view/indexHeader";
import indexFooter from "@/view/indexFooter";
import country from '../lib/country.js'
export default {
  name: "login",
  components: { indexHeader, indexFooter },
  data() {
    return {
      account_number: "",
      password: "",
      code:'',
      areaCode:0,
      country:country,
      isMb: true,                  //是否为手机注册
      account: "",                //用户名
      showpass:false,
      codeImg:'',
      g_code:'',
      radio:'1',
      codeType:'', //验证方式
      show:true
    };
  },
  // beforeRouteEnter(to,from,next){
  //   if(from.path == '/dealCenter'){
  //     window.location.reload();
  //   }
  //   next()
  // },
  created() {
    //console.log(this.$utils);
    // this.getCodeImg();
    this.account_number = this.$route.query.account_number || "";
    if(!localStorage.getItem('token')){
        this.account_number = localStorage.getItem('accountNum');
        //console.log(this.account_number)
        if(this.account_number){
           this.password = localStorage.getItem('password');
        }  
    }
  },
  methods: {
    getCodeImg(){
      this.$http({
          url: 'http://www.onetime.net.cn/pic_code/code',
          responseType: "arraybuffer",
      }).then( response => {
        return 'data:image/png;base64,' + btoa(
            new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );


      }).then(data => {
       this.codeImg = data;
        
      })
    },
    userInfo(){
      this.$http({
          url: '/api/'+'user/info',
          method:'get',
          data:{},  
          headers: {'Authorization':  localStorage.getItem('token')},    
      }).then(res=>{
          // //console.log(res);
          if(res.data.type == 'ok'){
          //console.log(res)
          localStorage.setItem('user_id',res.data.message.id)
          localStorage.setItem('extension_code',res.data.message.invite_code);
          }
      }).catch(error=>{
          
      })                       
    },
    //发送验证码
    sendCode(e){
      var that = this;
      // //console.log(this.country[this.areaCode].area_code)
      var url;
      var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      var i = layer.load();
       let account_number = this.$utils.trim(this.account_number);
      if(this.codeType == 2){
          url = 'send/email'
      }else if(this.codeType == 1){
         url = 'send/phone'
      }
      //发送验证码的参数
      var data = {};
      data.number = account_number;
      data.type = 'login';
      if(this.codeType == 1){
        data.front = this.country[this.areaCode].area_code;
      }
    this.$http({
        url: '/api/' + url,
        method: "post",
        data: data
      }).then(res=>{
        //console.log(res)
        layer.close(i);
         layer.msg(res.data.message);
         if(res.data.type == 'ok'){
           //验证码倒计时
           var time = 60;
      var timer = null;
      timer = setInterval(function() {
        e.target.innerHTML = time + "s";
        e.target.disabled = true;
        if (time == 0) {
          e.target.innerHTML = that.$t('code');
          e.target.disabled = false;
          clearInterval(timer);
          return;
        }
        time--;
      }, 1000);
         }
      })
    },
    login() {
      
      let account_number = this.$utils.trim(this.account_number);
      let password = this.$utils.trim(this.password);
      if (this.account_number.length == "") {
        layer.tips(this.$t('lay.paccount'), "#account");
        return;
      }
      if (this.password.length < 6) {
        layer.tips(this.$t('lay.pwdliu'), "#pwd");
        return;
      }
      // if (this.code == '') {
      //   layer.tips(this.$t('lay.notcode'), "#code");
      //   return;
      // }
      var i = layer.load();
      this.$http({
        url: '/api/' + "user/login",
        method: "post",
        data: {
          number: account_number,
          password: password,
          // code:this.code,
          type: 'pc'
        }
      })
        .then(res => {
          //console.log(res);
           layer.close(i);
          res = res.data;
          if (res.type === "ok") {
            layer.msg(this.$t('lay.slogin'));
            //  localStorage.setItem("token", 123);
            localStorage.setItem("token", res.message);
            localStorage.setItem("accountNum", account_number);
             localStorage.setItem("password", password);
            this.$store.commit("setAccountNum");
            this.userInfo();
             window.localStorage.setItem('alert','alert')
            setTimeout(() => {
               this.$router.push("/");
            }, 1000);
           
          } else if(res.type == '888') {
              this.show = false;
             if(res.message == '1'){
                this.codeType = 1  //短信验证
             }else if(res.message == '2'){
                this.codeType = 2  //邮箱验证
             }else  if(res.message == '3'){
               this.codeType = 3  //谷歌验证
             }else{
                layer.msg(this.$t('lay.slogin'))
             this.$http({
                url: "/api/user/info",
                method: "GET",
                data: {},
                headers: { Authorization: res.message }
              }).then(res => {
                //console.log(res);
                if (res.data.type == "ok") {
                  var msg = res.data.message;
                  if(msg.is_auth ==0){
                    setTimeout(() => {
                        this.$router.push("/userCenter/auth");
                      }, 1000); 
                  }else{
                    window.localStorage.setItem('alert','alert')
                    setTimeout(() => {
                        this.$router.push({name:"homeContent",params:{msg:'alert'}});
                      }, 1000);
                    
                  }
                }
              })
             }
          }else{
            layer.msg(res.message)
          }
        })
        .catch(error => {
          //console.log(error);
        });
    },
    //第二次提交登录
    login02(){
      let account_number = this.$utils.trim(this.account_number);
      let password = this.$utils.trim(this.password);
      if (this.code == '') {
        layer.tips(this.$t('lay.notcode'), "#code");
        return;
      }
      var i = layer.load();
      this.$http({
        url: '/api/' + "user/login",
        method: "post",
        data: {
          number: account_number,
          password: password,
          code:this.code,
          type: 'pc'
        }
      })
        .then(res => {
           layer.close(i);
          res = res.data;
          if (res.type === "ok") {
            layer.msg(this.$t('lay.slogin'));
            localStorage.setItem("token", res.message);
            localStorage.setItem("accountNum", account_number);
             localStorage.setItem("password", password);
            this.$store.commit("setAccountNum");
            // this.userInfo();
             layer.msg(this.$t('lay.slogin'))
             this.$http({
                url: "/api/user/info",
                method: "GET",
                data: {},
                headers: { Authorization: res.message }
              }).then(res => {
                //console.log(res);
                if (res.data.type == "ok") {
                  var msg = res.data.message;
                  if(msg.is_auth ==0){
                    setTimeout(() => {
                        this.$router.push("/userCenter/auth");
                      }, 1000); 
                  }else{
                    window.localStorage.setItem('alert','alert')
                    setTimeout(() => {
                        this.$router.push({name:"homeContent",params:{msg:'alert'}});
                      }, 1000);
                  }
                }
              })

            
          }else{
            layer.msg(res.message)
          }
        })
        .catch(error => {
          //console.log(error);
        });
    }
  }
};
</script>

<style scoped>
input:focus {
	border-color: #357ce1;
}

.global-ad {
	margin-top: 16px;
	overflow: hidden;
	border-radius: 3px;
	padding: 18px 24px;
	background-color: #334164;
	background-repeat: no-repeat;
	background-position: bottom right 24px;
	background-image: url(https://file.huobiasia.vip/global/zh-cn/static/img/e46bbe8.svg);
}

.qrcode {
	width: 80px;
	height: 94px;
	float: left;
	/*padding: 2px;*/
	background: #fff;
}

.qrcode>img {
	width: 80px;
	padding: 2px;
}

.cell-content {
	margin-left: 96px;
}

p.text {
	color: #fff;
	font-size: 14px;
	margin-bottom: 7px;
}

p.other {
	color: #8199c3;
	font-size: 12px;
	margin-top: 15px;
}

.imgcode{
  width: 90px;
  height: 46px;
  border:1px solid #ddd;
}
.imgcode img{
  width: 100%;
  height: 100%;
}
.tab{
  margin-top: 20px;
  width: 230px;
}
.tab span{
  padding-bottom: 5px;
  margin-right: 40px;
  cursor: pointer;
}
.tab .now{
  color: #332C58;
  font-weight: 600;
  border-bottom: 2px solid #332C58;
}
.chooseTel{
    height: 46px;
    width: 160px;
    border-color: #ccc;
    padding: 0 10px;
    font-size: 14px;
}
.phone{
  /* width: 360px!important; */
  border-left: none;
  width: 400px !important;
}
.code-btn{
  cursor: pointer;
  background: #357ce1;
}
.codes{
  width: 210px;
  padding: 0 20px;
  min-height: 46px;
  border:1px solid #ccc;
}
.code-btn{
  width: 90px;
  min-height: 46px;
}

/*scroll位于最外层*/
.login{
  /*min-height: 600px;*/
  min-height: 100vh;
  overflow-y: hidden;
  /*background: url('../assets/images/register_bg.png') top center no-repeat;*/
  background-color: #242e48;
  background-size: 100% 100%;
}
/* .content-wrap{background: #fff center bottom 316px repeat-x,-webkit-linear-gradient(top,#21263f,#262a42);} */
.account {
  width: 496px;
  margin: 0 auto;
  padding-top: 93px;
  overflow: hidden;
  /*min-height: 880px;*/
  min-height: 680px;
}
.main {
  position: relative;
  padding: 0 48px 48px;
  background: #fff;
  /*border-radius: 12px;*/
  align-items: flex-end;
}
.main_title {
	font-size: 20px;
	height: 88px;
	line-height: 88px;
	text-align: center;
}
.register-item {
  display: block;
  height: 22px;
  font-size: 12px;
}
.register-input {
  position: relative;
  margin-top: 20px;
}
.input-box {
  position: relative;
  margin-top: 40px;
}
.input-main {
  width: 300px;
  min-height: 46px;
  border: 1px solid #ccc;
  padding: 0 20px;
  font-size: 14px;
  border-radius: 3px;
}
.icon {
  width: 48px;
  height: 48px;
  line-height: 48px;
  border-right: 1px solid #52688c;
  position: absolute;
  top: 0;
}
.login-btn {
  width: 420px;
  margin-top: 40px;
  font-size: 16px;
  border-radius: 4px;
  color: #fff;
  line-height: 48px;
  cursor: pointer;
}
.noaccount {
  color: #fff;
}
.register-button {
  width: 400px;
  display: inline-block;
  line-height: 46px;
  /*border-radius: 23px;*/
  color: #fff;
  border: none;
  background: #357ce1;
}
.have-account {
  font-size: 14px;
  display: inline-block;
  margin-left: 335px;
}
.right-tip {
  position: absolute;
  left: 620px;
  top: 70px;
  line-height: 24px;
  padding-right: 50px;
  margin-top: 10px;
  font-size: 14px;
}
.go_register{
  color: #7E90BE;
  margin-left: 260px;
}
.forget{
  color: #7E90BE;
}
.ewm{
  width: 100px;
  border: 6px solid rgba(204,212,255,0.40);
  border-radius: 5px;
}
.bd_dashed{
    border-bottom: 1px dashed #A8ADCC;
  }
  .zhuce{
    border-bottom: 1px solid #A8ADCC;
  }
</style>
