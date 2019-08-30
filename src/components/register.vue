<template>
    <div id="register-box" class="bg-main clr-part">
        <indexHeader></indexHeader>
        <div class="reg-content">
            <div id="register-title" class="title cor2">{{$t('regidters')}}</div>
            <div class="tab">
                <span :class='{active:isMb}' @click="setIsMb(true)" style="font-size: 14px;">{{$t('register.phone')}}</span>
                <span :class="{active:!isMb}" @click="setIsMb(false)" style="font-size: 14px;">{{$t('register.email')}}</span>
            </div>
            <div class="step-one" v-show="!codeTrue">
                <div class="" v-if="isMb">
                    <div class="tip" >{{$t('register01.country')}}</div>
                   <div class="flex alcenter">
                      <select name=""  class="chooseTel" v-model="areaCode" ref="select" style="width:400px;">
                        <option :value="index" v-for="(item,index) in country" :key="index">{{item.area_code}} {{item.name_cn}}</option>
                      </select>

                   </div>
					<div class="ml20 grayc ft12 select_country">{{$t('register01.selectCountry')}}</div>
                </div>
                <div class="" v-if="!isMb">
                    <div class="tip" >{{$t('register01.country')}}</div>
                   <div class="flex alcenter">
                      <select name=""  class="chooseTel" v-model="areaCode" ref="select" style="width:400px;">
                        <option :value="index" v-for="(item,index) in country" :key="index">{{item.name_cn}}</option>
                      </select>
                   </div>
					<div class="ml20 grayc ft12 select_country">{{$t('register01.selectCountry')}}</div>
                </div>
                <div class="account-box">
                    <div class="tip" v-if="isMb">{{$t('register.phonenum')}}</div>
                    <div class="tip" v-if="!isMb">{{$t('register.emailnum')}}</div>
                    <div class="flex">
                    <input type="text" v-if="isMb" v-model="account" class="phone" style="width:400px;">
                    <input type="text" v-if="!isMb" v-model="account" class="" style="width:400px;">
                    </div>
                </div>
                    <div class="tip" style="margin-bottom:10px;">{{$t('register.codenum')}}<br> <span class="red">({{$t('register.notice')}})</span></div>
                <div class="code-box bdr-part">
                    <input type="text" v-model="code" class="code flex1">
                    <button type='button' class="code-btn redBg " :disabled="isCheck?false:true"  :class="[isCheck?'':'pointer']"  @click="sendCode">{{$t('register.sendcode')}}</button>
                </div>
                <!-- <button class="confirm-btn redBg" @click="checkCode" type="button">确认</button> -->
            </div>
            <div class="setpass">
                <div class="pwd-box pass-box1">
                    <div class="tip">{{$t('register.logpwd')}}</div>
                    <input :type="showpass?'text':'password'" class="pwd-input" style="width: 400px;" maxlength="16" v-model="pwd" id="pwd" :placeholder="$t('register.pwd')">
                        <img src="../assets/images/showpass.png" alt="" v-if="showpass" @click="showpass = false">
                        <img src="../assets/images/hidepass.png" alt="" v-if="!showpass" @click="showpass = true">
                </div>
                <div class="repwd-box pass-box1">
                    <div class="tip">{{$t('register.repwd')}}</div>
                    <input :type="showrepass?'text':'password'" class="repwd-input" style="width: 400px;" maxlength="16" v-model="repwd" >
                        <img src="../assets/images/showpass.png" alt="" v-if="showrepass" @click="showrepass = false">
                        <img src="../assets/images/hidepass.png" alt="" v-if="!showrepass" @click="showrepass = true">
                </div>
                <div class="invite-box">
                    <div class="tip">{{$t('register.invitecode')}}</div>
                    <input type="text" :placeholder="$t('register.bi')" v-model="invite" class="invite-input" style="width:400px;">
                </div>
                <p class="flex alcenter ft12">
                  <input id="agree" class="aggre" v-model="isCheck" @click="check" type="checkbox" /><label for="agree">{{$t('register.agree')}} <router-link to="/aggrement" class="link_text">{{$t('register.mian')}}</router-link></label>
                </p>
                <button type="button" @click="register" :disabled="isCheck?false:true" :class="[isCheck?'':'pointer']" class="btn1 ft16">{{$t('registers')}}</button>
            </div>
          <!--<div class="rg_ctbox">
            <img src="../assets/images/chatu.png" alt="">
          </div>-->
        </div>
    </div>
</template>

<script>
import country from '../lib/country.js'
import indexHeader from "@/view/indexHeader";
export default {
  components: {
    indexHeader
  },
  data() {
    return {
      showpass:false,
      showrepass:false,
      codeTrue: false,             //验证码是否正确
      isMb: true,                  //是否为手机注册
      account: "",                //用户名
      pwd: "",                    //密码
      repwd: "",                  //重复密码
      code: "",                   //验证码
      invite: "",                  //邀请码
      timer: "",                  //倒计时timer
      showList: false,            //是否显示地址列表
      country:country,
      areaCode:0,
      disable:true,
      isCheck:false,
      real_name:'',
      card_type:'身份证',
      card_id:''
    };
  },
  // beforeRouteEnter是每次进入都会执行
  // beforeRouteEnter(to, from, next) {
  //   function browserRedirect() {
  //       var sUserAgent = navigator.userAgent.toLowerCase();
  //       if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
  //           //跳转移动端页面
  //           window.location.href="https://www.hxex.com/register.html?code=cGnpHuLo";
  //           next();
  //       } else {
  //           //跳转pc端页面
  //           // window.location.href="http://f.jcngame.com/fanfan20171208//fanmai/index.html";
  //           next();
  //       }
  //   }

  // },
  created() {
    //获取所有省份
    //console.log(this.country);
    this.checkPt()
    var invite_code = this.$route.query.code
    //console.log(invite_code);
    this.invite = invite_code ||'';
  },
  methods: {
    check:function(val){
        if(this.isCheck == false){
          //console.log('pppp')
          this.disable = true;
        }else{
           this.disable = false;
        }
    },
    checkPt(){
      let sUserAgent = navigator.userAgent.toLowerCase();
      if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
        console.log("移动端登陆")
          //跳转移动端页面

          if(window.location.href.indexOf("?") != -1){
            var can = this.getCaption(window.location.href,1)
            window.location.href="https://www.bitfdn.com/register.html" + '?'+can;
          }else{
            window.location.href="https://www.bitfdn.com/register.html" ;
          }

      } else {
        console.log("电脑登陆")
          //跳转pc端页面
          // window.location.href="http://f.jcngame.com/fanfan20171208//fanmai/index.html";
      }
    },
    getCaption(obj,state) {
        let index=obj.lastIndexOf("\?");
        if(state==0){
            obj=obj.substring(0,index);
        }else {
            obj=obj.substring(index+1,obj.length);
        }
        return obj;
    },
    // 获取地区列表
    // getRegion(id, type, name) {
    //   if (type == "") {
    //     this.showList = false;
    //     this.district = { id: id, name: name };
    //     return;
    //   } else if (type == "cities") {
    //     if (name == this.province.name) {
    //       this.showList = "cities";
    //       return;
    //     }
    //   } else if (type == "districts") {
    //     if (name == this.city.name) {
    //       this.showList = "districts";
    //       return;
    //     }
    //   }
    //   var pId = '';
    //   //  if(id != ''){
    //   //    data.parent_id = id;
    //   //  }
    //   if (id !== "") {
    //     pId = "?parent_id=" + id;
    //   }


    //   this.$http({
    //     url: "/api/region" + pId,
    //     method: "get"
    //   }).then(res => {
    //     ////console.log(res.data);
    //     if(res.data.type == 'ok'&&res.data.message.length != 0){

    //       if (type == "provinces") {
    //         this.provinces = res.data.message;
    //       } else if (type == "cities") {
    //         this.province = { name: name, id: id };
    //         this.city = { id: "", name: "请选择市" };
    //         this.district = { id: "", name: "请选择区" };
    //         this.showList = "cities";
    //         this.cities = res.data.message;
    //       } else {
    //         this.district = { id: "", name: "请选择区" };
    //         this.showList = "districts";
    //         this.city = { name: name, id: id };
    //         this.showCities = false;
    //         this.districts = res.data.message;
    //       }
    //     }
    //   });
    // },
    // 切换注册方式
    setIsMb(boo) {
      var that = this;
      this.account = "";
      this.pwd = "";
      this.repwd = "";
      this.code = "";
      this.invite = "";
      this.isMb = boo;
      this.codeTrue = false;
      this.showList = false;
      // this.provinces = [];this.cities = [];this.districts = [];
      // this.province = { id: "", name: "请选择省" };
      // this.city = { id: "", name: "请选择市" };
      // this.district = { id: "", name: "请选择区" };

      clearInterval(this.timer);
      var codeBtn = document.querySelector(".code-btn");
      codeBtn.disabled = true;
      this.isCheck = false;
      codeBtn.innerHTML = that.$t('code');
      ////console.log(codeBtn);
    },
    // 发送验证码
    sendCode(e) {
      var that = this;
      let isMb = this.isMb;
      let url = "send/phone";
      if (this.account == "") {
        layer.msg(that.$t('lay.paccount'));
        return;
      } else if (e.target.disabled) {
        return;
      } else if (isMb) {
        // var reg = /^1[345678]\d{9}$/;
        // if (!reg.test(this.account)) {
        //   layer.msg("您输入的手机号不符合规则");
        //   return;
        // }
      } else if (!isMb) {
        // var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (this.account == '') {
          layer.msg(this.$t('register.emailnum'));
          return;
        } else {
          url = "send/email";
        }
      } else {
      }
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

      let data = { number: this.account,type:'regist' };
      if(url == 'send/phone'){
         data.front = country[this.areaCode].area_code
      }
      var loa = layer.load();
      this.$http({
        url: "/api/" + url,
        method: "post",
        data: data
      }).then(res => {
        layer.close(loa);
        ////console.log(res);
        layer.msg(res.data.message);
      });
    },
    // 验证验证码
    checkCode() {
      let code = this.code;
      if(this.account == ''){
        layer.msg(this.$t('lay.paccount'));return;
      }
      else if (this.code == "") {
        layer.msg(this.$t('lay.notcode'));
        return;
      } else {
        let data = {};
        let url = "user/check_email";
        if (this.isMb) {
          data = { mobile_code: this.code };
          url = "user/check_mobile";
        } else {
          data = { email_code: this.code };
        }
       var loa = layer.load();
        this.$http({
          url: "/api/" + url,
          method: "post",
          data: data
        }).then(res => {
          layer.close(loa);
          layer.msg(res.data.message);

          if (res.data.type == "ok") {
            this.codeTrue = true;
            // this.getRegion("", "provinces");
          } else {
          }
        });
      }
    },
    // 注册
    register() {
      //console.log(this.code)
      var that = this;
      if(this.isMb){
        if(this.account == ''){
          layer.msg(that.$t('lay.nophone'));
          return;
        }else if(this.code == ''){
           layer.msg(this.$t('lay.notcode'));
           return;
        }
      }
      if(!this.isMb){
        if(this.account == ''){
          layer.msg(that.$t('lay.nemail'));
          return;
        }
        // var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (this.account=='') {
          layer.msg(this.$t('register.emailnum'));
          return;
        }
         if(this.code == ''){
           layer.msg(this.$t('lay.notcode'));
           return;
        }
      }
      var regPsws = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
      if (this.pwd == "") {
        layer.msg(that.$t('lay.inpwd'));
        return;
      }else if(this.pwd.length <6 || this.pwd.length >16){
        layer.msg(that.$t('lay.pwdlength'));return;
      }else if(!regPsws.test(this.pwd)){
         layer.msg(that.$t('lay.pwdcom'));return;
      }
       else if (this.repwd == "") {
        layer.msg(that.$t('lay.repwd'));
        return;
      } else if (this.pwd !== this.repwd) {
        layer.msg(that.$t('lay.twopwd'));
        return;
      } else if(this.invite == ""){
		  layer.msg(that.$t('lay.invitation'));
		  return;
	  }

      var data = {};
      // data.province_id = this.province.id;
      // data.city_id = this.city.id;
      // data.district_id = this.district.id;
      var isMb = this.isMb;
      // data.type = isMb ? "mobile" : "email";
      data.number = this.account;
      data.code = this.code;
      data.password = this.pwd;
      data.re_password = this.repwd;
      data.extension_code = this.invite;
      // data.real_name = this.real_name;
      // data.card_type = this.card_type;
      // data.card_id = this.card_id;
      if(!isMb){
        var index = this.$refs.select.selectedIndex;
        data.nationality = this.country[index].name_cn;
      }
      if(isMb){
        var index = this.$refs.select.selectedIndex;
        data.nationality = this.country[index].name_cn;
        data.itc = this.country[index].area_code;
        //console.log(this.country[index].name_cn)
      }
      ////console.log(data);return;
      var loa = layer.load();
      this.$http({
        url: "/api/" + "user/register",
        data: data,
        method: "post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
      }).then(res => {
        layer.close(loa);
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          this.$router.push("/components/login");
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
#register-title {
	color: #263241;
	font-size: 20px !important;
	text-align: center;
	height: 24px;
	line-height: 24px;
	padding-top: 12px;
}

.select_country {
	margin-left: 0px;
	margin-top: 2px;
	margin-bottom: 4px;
}

.btn1{
  color: #FBFCFD;
  background: #357ce1;
  width: 400px;
  border-radius: 0px;
  margin-bottom: 25px;
}
.rg_ctbox{
  width: 310px;
  right: 10px;
  position: absolute;
  top: 36%;
  .ewm{
    margin-top: 10%;
    width: 68px;
    height: 68px;
    box-shadow: 0 0 10px #332C58;
  }
  .bd_dashed{
    border-bottom: 1px dashed #332c58;
  }
}
.card_type{
    width: 300px;
    height: 46px;
    line-height: 46px;
    border-color: #ccc;
    padding: 0 10px;
}
.pass-box1{
  width: 301px;
	height: 80px;
}
.pass-box1 img{
	cursor: pointer;
	width: 25px;
	right: 10px;
	position: relative;
	left: 370px;
	bottom: 35px;
}

.aggre{
  width: 16px!important;
  margin-right: 5px;
}
.link_text{
  color: #332C58;
}
.pointer{
  cursor: not-allowed!important;
  opacity: 0.6;
}
.chooseCountry{
      width: 300px;
    min-height: 46px;
    border-radius: 3px;
    padding: 0 15px;
    border-color: #ccc;
}
.chooseTel{
    height: 46px;
    width: 160px;
    border-color: #ccc;
    padding: 0 10px;
    font-size: 14px;
    border-radius: 3px;
}
// .phone{
//   width: 360px!important;
//   border-left: none;
// }
.code-btn{
  cursor: pointer;
  background: #357ce1;
}
#register-box {
  // min-height: 1050px;
  padding-top: 43px;
  padding-bottom: 48px;
  /*background: url('../assets/images/register_bg.png') no-repeat left top /100% 100% !important;*/
  background-color: #242e48 !important;
  .tip {
    margin: 10px 0;
    // color: #61688a;
    font-size: 12px;
  }
  .reg-content {
    width: 510px;
    background: #fff;
    /*border-radius: 12px;*/
    margin: 0 auto 0;
    padding: 32px 45px;
    position: relative;
    > div > div {
      margin: 10px 0px 0px;
    }

    // color: #c7cce6;
    input {
      width: 300px;
      min-height: 46px;
      border: 1px solid #ccc;
      padding: 0 20px;
      // color: #c7cce6;
      font-size: 14px;
      border-radius: 3px;
      //background-color: #1e2235;
    }
    > .title {
      font-size: 36px;
      // color: #7E90BE ;
    }
    > .tab {
      margin: 20px 0;
      cursor: pointer;
      span {
        margin-right:  20px;
        padding-bottom: 3px;
      }
      .active{
          font-weight: bold;
		  color: #357ce1;
		  border-bottom: 2px solid #357ce1;
	  }
    }
    .code-box {
      display: flex;
      justify-content: space-between;
      width: 400px;
      height: 46px;
      //background-color: #1e2235;
      background: #fff;
      border: 1px solid #ccc;
      input {
        border: none;
        height: 44px;
        min-height: 44px;
        width: 420px;
      }
      button {
        border: none;
        line-height: 45px;
        width: 93px;
        color: #fff;
        // color: #c7cce6;
        // border-left: 1px solid #c7cce6;
        // //background: #1e2235;
      }
    }
  }
  .reg-btn,
  .confirm-btn {
    line-height: 46px;
    width: 200px;
    margin: 20px 0 0;
    border: none;
    //background: #7a98f7;
    color: #fff;
    cursor: pointer;
  }
  .area-box {
    position: relative;
    width: 300px;
    line-height: 44px;
    // //background-color: #1e2235;
    // color: #c7cce6;
    text-align: center;
    height: 46px;
    .light {
      color: #332C58;
    }
    // overflow: hidden;
    .area {
      display: flex;
      border: 1px solid #ccc;
      > div {
        flex: 1;
      }
      .city {
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
    }
    .area-list {
      position: absolute;
      width: 300px;
      top: 46px;
      left: 0;
      display: flex;
      z-index: 999;

      > ul {
        flex: 1;
        //background-color: #1e2235;
        height: 265px;
        overflow: scroll;
      }
      > ul::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>



