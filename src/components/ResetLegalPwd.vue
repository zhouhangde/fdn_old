<template>
<div id="reset-pwd" class="bg-main clr-part">
    <div class="contentBK">
        <div class="content-wrap">
            <div class="account">
                <div class="main">
                    <p class="main_title">{{paypassword==0?$t('lpwd.setpwd'):$t('lpwd.resetpwd')}} </p>
                    <div class="register-input pass-box" v-if="paypassword==1">
                        <span class="register-item">{{$t('lpwd.oldpwd')}}</span>
                        <input :type="showold?'text':'password'" class="input-main input-content" maxlength="6" v-model="oldPwd" id="account">
                        <img src="../assets/images/showpass.png" alt="" v-if="showold" @click="showold = false">
                        <img src="../assets/images/hidepass.png" alt="" v-if="!showold" @click="showold = true">
                    </div>
                    <div class="register-input pass-box" v-if="paypassword==0">
                        <span class="register-item">{{$t('register.logpwd')}}</span>
                        <input :type="showold?'text':'password'" class="input-main input-content" maxlength="16" v-model="login_password" id="account">
                        <img src="../assets/images/showpass.png" alt="" v-if="showold" @click="showold = false">
                        <img src="../assets/images/hidepass.png" alt="" v-if="!showold" @click="showold = true">
                    </div>
                     <div class="register-input pass-box">
                        <span v-if="paypassword==0" class="register-item">{{$t('lpwd.pwd')}}</span>
                        <span v-if="paypassword==1" class="register-item">{{$t('lpwd.newpwd')}}</span>
                        <input :type="showpass?'text':'password'" class="input-main input-content" maxlength="6" v-model="pwd" id="pwd">
                        <img src="../assets/images/showpass.png" alt="" v-if="showpass" @click="showpass = false">
                        <img src="../assets/images/hidepass.png" alt="" v-if="!showpass" @click="showpass = true">
                    </div>
                     <div class="register-input pass-box">
                        <span class="register-item">{{$t('lpwd.repwd')}}</span>
                        <input :type="showrepass?'text':'password'" class="input-main input-content" maxlength="6" v-model="rePwd">
                        <img src="../assets/images/showpass.png" alt="" v-if="showrepass" @click="showrepass = false">
                        <img src="../assets/images/hidepass.png" alt="" v-if="!showrepass" @click="showrepass = true">
                    </div>
                     
                    <div style="margin-top: 10px;">
                        <span class="register-item"></span>
                        <button type="button" class="register-button curPer redBg" @click="reset" >{{paypassword==0?$t('lpwd.spwd'):$t('lpwd.rpwd')}}</button>
                        <span class="ft14 redColor ml30 forgetLegalPwd" v-if="paypassword==1" @click="forgetLegalPwd">{{$t('forLegalPsw.fpwd')}}？</span>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <!-- <indexFooter></indexFooter> -->
</div>

</template>

<script>
export default {
  data() {
    return {
      oldPwd: "",
      showold:false,
      pwd: "",
      login_password:'',
      showpass:false,
      showrepass:false,
      rePwd: "",
      paypassword:0,
    };
  },
  created(){
    this.$http({
      url: "/api/" + "user/info",
      method: "get",
      data: {},
      headers: { Authorization: localStorage.getItem("token") }
    }).then(res => {
      //console.log(res.data.message.paypassword);
      this.paypassword=res.data.message.paypassword;
    });
  },
  methods: {
    
    reset() {
      var reg = /^\d{6}$/;
      let oldpassword = this.oldPwd;
      let password = this.pwd;
      let re_password = this.rePwd;
      if(this.paypassword==1&&oldpassword==''){
        return layer.msg(this.$t('lpwd.oldpwd'))
      }
      if(this.paypassword==1&&password ==''){
        return layer.msg('请输入新密码')
      }
      if(this.paypassword==1&&!reg.test(password)){
        return layer.msg('新密码须为6位纯数字')
      }
      if(this.paypassword==1&&re_password ==''){
         return layer.msg('请再次输入新密码');
      }
      
      if(this.paypassword==0&&this.login_password == ''){
        return layer.msg('请输入登录密码')
      }
      if(this.paypassword==0&&password == ''){
         return layer.msg('请输入密码');
      }
      if(this.paypassword==0&&!reg.test(password)){
         return layer.msg('密码须为6位纯数字');
      }
      if(this.paypassword==0&&re_password == ''){
         return layer.msg('请再次输入密码');
      }
      // if(password.length>20||password.length<6||re_password.length>20||re_password.length<6){
      //   return layer.msg(this.$t('lay.pwdlength'));
      // } 
      if (password != re_password) {
        return layer.msg(this.$t('lay.twopwd'));
      }
      if(this.paypassword==0){ //设置密码
        this.$http({
          url: "/api/password/setpay",
          method: "post",
          data: {
            login_password:this.login_password,
            password: password,
            repassword: re_password
          },
            headers: { Authorization: localStorage.getItem("token") }
          }).then(res => {
            //console.log(res);
            layer.msg(res.data.message);
            if (res.data.type == "ok") {
              this.$router.go(-1)
            }
        });
      }else{
        this.$http({        //修改密码
            url: "/api/password/update_pay",
            method: "post",
            data: {
              old_password: oldpassword,
              password: password,
              repassword: re_password
            },
            headers: { Authorization: localStorage.getItem("token") }
          }).then(res => {
            //console.log(res);
            layer.msg(res.data.message);
            if (res.data.type == "ok") {
              this.$router.go(-1)
            }
        });
      }
        
    },
    forgetLegalPwd(){
      this.$router.push('/forgetLegalPwd')
    }
  }
};
</script>

<style scoped>
.forgetLegalPwd{
   cursor: pointer;
}
#reset-pwd {
  min-height: 1050px;
}
/* .content-wrap{background: #fff center bottom 316px repeat-x,-webkit-linear-gradient(top,#21263f,#262a42);} */
.account {
  width: 1200px;
  margin: 0 auto;
  padding-top: 93px;
  overflow: hidden;
  min-height: 880px;
}
.main {
  position: relative;
  padding: 0 0 60px 30px;
}
.main_title {
  font-size: 36px;
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
  width: 520px;
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
  width: 200px;
  display: inline-block;
  line-height: 46px;
  border-radius: 4px;
  color: #fff;
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
}
.code-box {
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 520px;
  background: #fff;

}
.code-box input {
  width: 406px;
  border: none;
}
.code-box button {
  padding: 0 20px;
  line-height: 47px;
  width: 107px;
}
</style>
