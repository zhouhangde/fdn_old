<template>
<div class="forget-box bg-main clr-part">
    <indexHeader></indexHeader>
    <div class="contentBK mt45">
        <div class="content-wrap">
            <div class="account bgWhite flex alcenter">
                <div class="main" v-if="!showReset">
                    <p class="main_title">{{$t('forget.fpwd')}}</p>
                    <div class="register-input">
                        <span class="register-item">{{$t('accounts')}}</span>
                         <!-- <select name="" v-if="isMb" class="chooseTel" v-model="areaCode" ref="select">
                        <option :value="index" v-for="(item,index) in country" :key="index">{{item.area_code}} {{item.name_cn}}</option>
                      </select> -->
                        <input type="text" class="input-main input-content" maxlength="20" v-model="account_number" id="account">
                    </div>
                     <div class="register-input code-input" >
                        <span class="register-item">{{$t('code')}}</span>
                        <div class="code-box">
                            <input type="text" class="input-main input-content" maxlength="16" v-model="phoneCode" id="pwd" >
                        <button type="button" @click="setTime" class="redBg">{{$t('forget.getcode')}}</button>
                        </div>
                    </div>
                    <div style="margin-top: 10px;">
                        <span class="register-item"></span>
                        <button class="register-button curPer redBg" type="button" @click="check">{{$t('confirm')}}</button>
                        
                    </div>
                   
                </div>
                <div class="main" v-if="showReset">
                    <div class="main_title">{{$t('forget.setpwd')}}</div>
                    <div class="register-input pass-box">
                        <span class="register-item">{{$t('forget.inpwd')}}</span>
                        <input :type="showpass?'text':'password'" class="input-main input-content" maxlength="16" v-model="password" id="pwd">
                        <img src="../assets/images/showpass.png" alt="" v-if="showpass" @click="showpass = false">
                        <img src="../assets/images/hidepass.png" alt="" v-if="!showpass" @click="showpass = true">
                    </div>
                    <div class="register-input pass-box">
                        <span class="register-item">{{$t('forget.repwd')}}</span>
                        <input :type="showrepass?'text':'password'" class="input-main input-content" maxlength="16" v-model="re_password" id="repwd">
                        <img src="../assets/images/showpass.png" alt="" v-if="showrepass" @click="showrepass = false">
                        <img src="../assets/images/hidepass.png" alt="" v-if="!showrepass" @click="showrepass = true">
                    </div>
                    <button class="register-button curPer redBg" type="button" @click="resetPass" style="margin-top:20px">{{$t('confirm')}}</button>
                </div>
                <div class="rg_ctbox">
                      <img src="../assets/images/chatu.png" alt="">
                      <!-- <div class="ewm_box flex alcenter pl30">
                        <img src="../assets/images/qrcode.png" alt="" class="ewm">
                        <div class="ft12 ml10 ">
                          <p class="bd_dashed pdtb10">扫码下载Dynasty App</p>
                          <p class="mt10">随时随地 便捷交易</p>
                        </div>
                      </div> -->
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
  components: { indexHeader, indexFooter },
  data() {
    return {
      showpass:false,
      showrepass:false,
      isMb: true,
      account_number: "",
      phoneCode: "",
      showReset: false,
      password: "",
      re_password: "",
      country:country,
      areaCode:0,
      isMb: true,                  //是否为手机注册
      account: "",                //用户名
      flag:false,
      token:''
    };
  },
  created() {
     this.token = window.localStorage.getItem("token") || "";
  },
  methods: {
    sendCode(url) {
    var i = layer.load();
      this.$http({
        url: "/api/" + url,
        method: "post",
        data: {
          number: this.account_number,
          // type: "forget",
          front:country[this.areaCode].area_code,
          type:'forget'
        }
      }).then(res => {
        layer.close(i);
        //console.log(res);
        layer.msg(res.data.message);
        if(res.data.type == 'ok'){
          this.flag = true
        }
      });
    },
    setTime(e) {
      var that = this;
      if (e.target.disabled) {
        return;
      } else {
        // var reg = /^1[345678]\d{9}$/;
        var url = "send/phone";
        var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (this.account_number == "") {
          layer.tips(that.$t('lay.paccount'), "#account");
          return;
        } 
        // else if (reg.test(this.account_number)) {
        // } 
        else if (emreg.test(this.account_number)) {
          url = "send/email";
          this.isMb = false;
        }
        //  else {
        //   layer.tips("您输入的手机或邮箱账号不符合规则!", "#account");
        //   return;
        // }

        this.sendCode(url);
        var time = 60;
        var timer = null;
        timer = setInterval(function() {
          e.target.innerHTML = time + "S";
          e.target.disabled = true;
          if (time == 0) {
            clearInterval(timer);
            e.target.innerHTML = that.$t('code');
            e.target.disabled = false;
            return;
          }
          time--;
        }, 1000);
      }
    },
    check() {
      var that = this;
      // var reg = /^1[345678]\d{9}$/;
      var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      let user_string = this.account_number;
      // var isMobile = reg.test(user_string);
      var isEmail = emreg.test(user_string);
      var url = "user/check_mobile";
      var data = {};

      if (user_string == "") {

        layer.tips(that.$t('lay.paccount'), "#account");
        return;
      } else if (this.phoneCode == "") {
        // //console.log('请输入验证码');

        layer.tips(that.$t('lay.notcode'), "#pwd");
        return;
      }
      //  else if (isEmail) {
      //   url = "user/check_code";
      //   data.email_code = this.phoneCode;
      // }else{
      //   data.mobile_code = this.phoneCode;
      // }
      // if(this.flag){
      //   this.showReset = true;
      // }else{
      //   layer.msg('验证码不正确')
      // }
      
      //  else if (isMobile) {
      //   url = "user/check_mobile";
      //   data.mobile_code = this.phoneCode;
      // } else {
      //   layer.tips("您输入的邮箱或手机号不符合规则!", "#account");
      //   return;
      // }
      //console.log(data);
       var i = layer.load();
      this.$http({
        url: "/api/" + 'user/check_code',
        method: "post",
        data: {
          account:this.account_number,
          code:this.phoneCode
        }
      }).then(res => {
        layer.close(i);
        //console.log(res);
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          this.showReset = true;
          // window.location.href = "resetpass.html?user_string=" + names + "&" + "code=" + verify;
          // this.$router.push({path:'/resetPwd',params:{user_string:user_string,code:this.phoneCode}})
        }
      });
    },
    resetPass() {
      var that = this;
      var regPsws = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
      if (this.password == "") {
        layer.msg(that.$t('lay.inpwd'));
        return;
      }else if(this.password.length<6||this.password.length>16){
        layer.msg(that.$t('lay.pwdlength'));
        return;
      } else if(!regPsws.test(this.password)){
        layer.msg(that.$t('lay.pwdcom'));
        return;
      }
      else if (this.re_password == "") {
        layer.msg(that.$t('lay.repwd'));
        return;
      } else if (this.password !== this.re_password) {
        layer.msg(that.$t('lay.twopwd'));
        return;
      } else {
        let data = {
          account: this.account_number,
          password: this.password,
          repassword: this.re_password,
          code: this.phoneCode,
        };
        var i = layer.load();
        this.$http({
          url: "/api/password/reset",
          method: "post",
          data: data,
          headers: { Authorization: that.token }
        }).then(res => {
          layer.close(i);
          //   //console.log(res);
          layer.msg(res.data.message);
          if (res.data.type == "ok") {
            this.$router.push("/components/login");
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.contentBK{
  min-height: 1050px;
  /*background: url('../assets/images/register_bg.png') top center no-repeat;*/
  background-color: #242e48;
  background-size: 100% 100%;
}
#account{
  width: 355px;
}
.chooseTel{
    height: 45px;
    width: 160px;
    border-color: #ccc;
    padding: 0 10px;
    font-size: 14px;
}
.forget-box{
  min-height: 1050px;
}
.content-wrap{
  padding-top: 100px;
}
/* .content-wrap {
  background: url(../assets/images/bg_login.png) center bottom 316px repeat-x,
    -webkit-linear-gradient(top, #21263f, #262a42);
} */
.account {
  width: 680px;
  margin: 0 auto;
  padding-top: 50px;
  overflow: hidden;
  border-radius: 12px;
  /* min-height: 880px; */
}
.main {
  position: relative;
  padding: 0 0 60px 30px;
}
.main_title {
  font-size: 36px;
  /* color: #c7cce6; */
}
.register-item {
  display: block;
  height: 22px;
  /* color: #61688a; */
  font-size: 12px;
}
.register-input {
  position: relative;
  margin-top: 20px;
  width: 355px;
}
.input-box {
  position: relative;
  margin-top: 40px;
}
.input-main {
  width: 350px;
  min-height: 46px;
  border: 1px solid #ccc;
  padding: 0 20px;
  /* color: #c7cce6; */
  font-size: 14px;
  border-radius: 3px;
  /* background-color: #1e2235; */
}
.icon {
  width: 48px;
  height: 48px;
  line-height: 48px;
  border-right: 1px solid #ccc;
  position: absolute;
  top: 0;
}
.login-btn {
  width: 420px;
  margin-top: 40px;
  /* background: #5697f4; */
  font-size: 16px;
  border-radius: 4px;
  color: #fff;
  line-height: 48px;
  cursor: pointer;
}
.noaccount {
  /* color: #fff; */
}
.register-button {
  width: 200px;
  display: inline-block;
  line-height: 46px;
  /* background-color: #7a98f7; */
  border-radius: 4px;
  /* color: #fff; */
  border: none;
}
.have-account {
  font-size: 14px;
  display: inline-block;
  margin-left: 30px;
}
.right-tip {
  position: absolute;
  left: 620px;
  top: 70px;
  line-height: 24px;
  padding-right: 50px;
  margin-top: 10px;
  font-size: 14px;
  /* color: #61688a; */
}
.code-box {
  /* width: 520px; */
  border: 1px solid #ccc;
  /* background: #1e2235; */
  background: #fff;
  border-radius: 4px;
}
.code-box .input-main {
  width: 260px;
  border: none;
}
.code-box button {
  border: none;
  /* border-left: 1px solid #ccc; */
  line-height: 48px;
  /* color: #7a98f7; */
  /* background: #1e2235; */
  width: 94px;
  position: absolute;
  right: 0;
  bottom: 0;
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
