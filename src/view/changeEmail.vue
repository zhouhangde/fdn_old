<template>
<div id="bind-email" class="bg-main clr-part">
    <!-- <indexHeader></indexHeader> -->
    <div class="contentBK">
        <div class="content-wrap">
            <div class="account">
               <p class="main_title ml30">{{$t('transfer.changeEmail')}}</p>
                <div class="main" v-if="isshow">
                   
                    <div class="register-input">
                        <span class="register-item">{{$t('bdphone.phone')}}</span>
                        <input type="text" class="input-main input-content"  v-model="account_number" id="account">
                    </div>
                     <div class="register-input code-input" >
                        <span class="register-item">{{$t('code')}}</span>
                        <div class="code-box flex">
                            <input type="text" class="input-main input-content"  v-model="phoneCode" id="pwd" >
                        <button type="button" @click="setTime" class="redBg" :disabled="issend">{{sendcode}}</button>
                        </div>
                    </div>
                    <div style="margin-top: 10px;">
                        <span class="register-item"></span>
                        <button class="register-button curPer redBg" type="button" @click="check">{{$t('lay.sure')}}</button>
                        
                    </div>
                   
                </div>
                <div class="main" v-if="!isshow">
                    <div class="register-input">
                        <span class="register-item">{{$t('bdemail.emailbox')}}</span>
                        <input type="text" class="input-main input-content"  v-model="account_number01" id="account01" :placeholder="$t('transfer.newEmail')">
                    </div>
                     <div class="register-input code-input" >
                        <span class="register-item">{{$t('code')}}</span>
                        <div class="code-box flex">
                            <input type="text" class="input-main input-content"  v-model="phoneCode01" id="pwd01" >
                        <button type="button" @click="setTime01" class="redBg t" :disabled="disable">{{send}}</button>
                        </div>
                    </div>
                    <div style="margin-top: 10px;">
                        <span class="register-item"></span>
                        <button class="register-button curPer redBg" type="button" @click="bind">{{$t('bdemail.surebind')}}</button>
                        
                    </div>
                   
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
export default {
  components: { indexHeader, indexFooter },
  data() {
    return {
      account_number: "",
      phoneCode: "",
      account_number01: "",
      phoneCode01: "",
      showReset: false,
      token:'',
      phone:'',
      email:'',
      isshow:true,
      disable:false,
      send:this.$t('forget.getcode'),
      sendcode:this.$t('forget.getcode'),
      issend:false
    };
  },
  created() {
          this.token = localStorage.getItem("token");
          this.userInfo();
  },
  methods: {
    //用户信息
    userInfo() {
      this.$http({
        url: "/api/user/info",
        method: "GET",
        data: {},
        headers: { Authorization: this.token }
      }).then(res => {
        //console.log(res);
        if (res.data.type == "ok") {
          this.phone = res.data.message.phone;
          this.email = res.data.message.email;
        }
      })
    },
    sendCode() {
      this.$http({
        url: "/api/send/phone",
        method: "post",
        data: {
          number: this.account_number,
          // type :'binding'
        }
      }).then(res => {
        //console.log(res);
        layer.msg(res.data.message);
      });
    },
    setTime(e) {
      //console.log(e)
      var that = this;
      if (that.issend) {
        return;
      } else {
        // var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (this.account_number == "") {
          layer.tips(that.$t('lay.nophone'), "#account");
          return;
        }
        //  else if (!emreg.test(this.account_number)) {
        //   layer.tips(that.$t('lay.noemail'), "#account");
        //   return;
        // }

        this.sendCode();
        var time = 60;
        var timer = null;
        timer = setInterval(function() {
         that.sendcode = time + "S";
          that.issend = true;
          if (time == 0) {
            clearInterval(timer);
            that.sendcode = that.$t('code');
            that.issend = false;
            return;
          }
          time--;
        }, 1000);
      }
    },
    //发送新手机号验证码
    setTime01(e){
        //console.log(e)
      var that = this;
      if (that.disable) {
        return;
      } else {
        // var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (this.account_number01 == "") {
          layer.tips(that.$t('lay.nemail'), "#account");
          return;
        }
        //  else if (!emreg.test(this.account_number)) {
        //   layer.tips(that.$t('lay.noemail'), "#account");
        //   return;
        // }

        this.sendCode01();
        var time01 = 60;
        var timer01 = null;
        timer01 = setInterval(function() {
          that.send = time01 + "S";
          that.disable = true;
          if (time01 == 0) {
            clearInterval(timer01);
            that.send = that.$t('code');
            that.disable = false;
            return;
          }
          time01--;
        }, 1000);
      }
    },
    //发送新手机号验证码
    sendCode01() {
      this.$http({
        url: "/api/send/email",
        method: "post",
        data: {
          number: this.account_number01,
          // type :'binding'
        }
      }).then(res => {
        //console.log(res);
        layer.msg(res.data.message);
      });
    },
    //校验验证码
    check() {
      var that = this;
      var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      let user_string = this.account_number;
      var isEmail = emreg.test(user_string);

      var data = {};

      if (user_string == "") {
        layer.tips(that.$t('lay.nophone'), "#account");
        return;
      } else if (this.phoneCode == "") {
        // //console.log('请输入验证码');

        layer.tips(that.$t('register.codenum'), "#pwd");
        return;
      } 
      //console.log(data);
      data.code = this.phoneCode;
      data.account = user_string;
      
      this.$http({
        url: "/api/user/check_code",
        method: "post",
        data: data,
        headers:{Authorization:window.localStorage.getItem('token')}
      }).then(res => {
        //console.log(res);
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          this.isshow =false;
          // window.location.href = "resetpass.html?user_string=" + names + "&" + "code=" + verify;
          // this.$router.push({path:'/resetPwd',params:{user_string:user_string,code:this.phoneCode}})
        }
      });
    },
    //绑定
    bind(){
      if(this.phoneCode01 == ''){
        layer.msg(this.$t('transfer.emailCode'))
      }
      this.$http({
        url:'/api/user/amend_email',
        method:'post',
        data:{
          // phone_code:this.phoneCode,
          new_email:this.account_number01,
         email_code:this.phoneCode01
        }
      }).then(res=>{
          layer.msg(res.data.message);
          if(res.data.type == 'ok'){
            this.$router.back(-1);
          }else{
            this.account_number01 = '';
            this.phoneCode01 = '';
          }
      })
    }
    
  }
};
</script>

<style scoped>
.content-wrap {
  
}
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
  padding: 0 20px;
  font-size: 14px;
  border-radius: 3px;
  border: 1px solid #ccc;
}
.icon {
  width: 48px;
  height: 48px;
  line-height: 48px;
  position: absolute;
  top: 0;
}
.login-btn {
  width: 420px;
  margin-top: 40px;
  font-size: 16px;
  border-radius: 4px;
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
  width: 520px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
}
.code-box .input-main {
  width: 419px;
  border: none;
}
.code-box button {
  border: none;
  line-height: 47px;
  
  width: 101px;
}
</style>
