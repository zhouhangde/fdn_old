<template>
     <div class="wrap w80">
         <div class="ptb20 plr20 mb20 ft16 radius5 bgWhite">{{$t('identity.anquan')}}</div>
         <div class="bgWhite">
             <p class="ptb10 plr20 yinying flex between alcenter">
                 <span>{{$t('identity.verify')}}</span>
                    <el-switch
                    v-model="kai"
                    @change = 'change'
                    :active-text="$t('identity.openVerify')"
                    :inactive-text="$t('identity.closeVerify')">
                    </el-switch>
                 </p>
             <ul class="plr20 ft14">
                 <li class="flex alcenter between ptb20 bdb">
                     <span>
                     <el-radio v-model="radio" label='1' :disabled="!kai">{{$t('shop.phone')}}</el-radio>
                    </span>
                    <span class="bind gray_a" v-if="bindPhone"><router-link to="/components/bindPhone">{{$t('security.bind')}}</router-link></span>
                    <span class="bind gray_a" v-if="!bindPhone">{{$t('security.havebind')}}</span>
                 </li>
                 <li class="flex alcenter between ptb20 bdb">
                     <span>
                     <el-radio v-model="radio" label='2'   :disabled="!kai">{{$t('bdemail.emailbox')}}</el-radio>
                    </span>
                    <span class="bind gray_a" v-if="bindEmail"><router-link to="/components/bindEmail">{{$t('security.bind')}}</router-link></span>
                    <span class="bind gray_a" v-if="!bindEmail">{{$t('security.havebind')}}</span>
                 </li>
                 <li class="flex alcenter between ptb20 bdb">
                     <span>
                     <el-radio v-model="radio" label='3' :disabled="!kai">{{$t('security.google')}}</el-radio>
                    </span>
                    <!-- <span class="bind gray_a">绑定</span> -->
                 </li>
             </ul>
         </div>
         <div class="mt10 bgWhite plr20 ptb20">{{$t('security.bindGoogle')}}</div>
         <div class=" bgWhite plr20 ptb20 flex alcenter ">
            <!-- <div class="codeImg"></div> -->
            <span class="ml20 ft14">{{$t('security.googleKey')}}：{{goole_token}} <span class="ml20 copy" @click="copy">{{$t('account.copy')}}</span></span>
         </div>
         <div class="flex alcenter center mt50">
             <el-button type="primary" size="medium" @click="submit" :disabled="!kai">{{$t('auth.up')}}</el-button>
         </div>
         <div class="shad flex alcenter center" v-if="isshow">
             <div class="mask05">
                 <p><span>{{$t('security.logpwd')}}：</span><input type="password" v-model="psw" :placeholder="$t('security.logpwd')"></p>
                 <p class="flex mt20 alcenter around">
                     <span class="btn ft14 bg-sel" style="color:#ccc;" @click="isshow = false">{{$t('legal.ceil')}}</span>
                     <span class="btn ft14 blue_bg" @click="confirm">{{$t('legal.confirm')}}</span>
                 </p>
             </div>
         </div>
         <div class="shad flex alcenter center" v-if="isshow01">
             <div class="mask05">
                 <p><span>{{$t('security.logpwd')}}：</span><input type="password" v-model="psw01" :placeholder="$t('register.logpwd')"></p>
                 <p class="flex mt20 alcenter around">
                     <span class="btn ft14 bg-sel" style="color:#ccc;" @click="cancel">{{$t('legal.ceil')}}</span>
                     <span class="btn ft14 blue_bg" @click="confirm01">{{$t('legal.confirm')}}</span>
                 </p>
             </div>
         </div>
         <!--谷歌验证弹框-->
         <div class="shad flex alcenter center" v-if="show_goole">
             <div class="mask05">
                 <p><span>{{$t('security.google')}}：</span><input type="password" v-model="goole" :placeholder="$t('google.entergoogle')"></p>
                 <p class="flex mt20 alcenter around">
                     <span class="btn ft14 bg-sel" style="color:#ccc;" @click="show_goole = false">{{$t('legal.ceil')}}</span>
                     <span class="btn ft14 blue_bg" @click="confirm_goole">{{$t('legal.confirm')}}</span>
                 </p>
             </div>
         </div>
     </div>
</template>
<script>
import "@/lib/jquery.qrcode.min.js";
import "@/lib/clipboard.min.js";
export default {
    data(){
        return{
            token:'',
            radio:'',
            bindEmail:false,
            bindPhone:false,
            isshow:false,
            isshow01:false,
            psw:'',
            psw01:'',
            goole_token:'',
            kai:false,
            validate_type:'',
            show_goole:false,
            goole:''
        }
    },
    created(){
        this.token = localStorage.getItem("token") || '';
        this.init();
    },
    mounted(){
        //console.log(this.goole_token)
        setTimeout(() => {
            $(".codeImg").qrcode({
              width: 100, //宽度
              height: 100, //高度
              text: 'otpauth:dynasty?secret='+this.goole_token
            });
        }, 800);
       
    },
    methods:{
        init() {
      this.$http({
        url: "/api/user/info",
        method: "GET",
        data: {},
        headers: { Authorization: this.token }
      }).then(res => {
        //console.log(res);
        if (res.data.type == "ok") {
          var msg = res.data.message;
          this.account = msg.account_number
          this.goole_token = msg.google_token;
          if(msg.is_validate == 1){
              this.kai = true
          }else{
              this.kai = false
          }
          if(msg.email == ''){
              this.bindEmail = true;
          };
          if(msg.phone == ''){
              this.bindPhone = true;
          };
         if(msg.validate_type == 1){
             this.radio = '1'
         }else if(msg.validate_type == 2){
             this.radio = '2'
         }else{
              this.radio = '3'
         } ;
        }
      });
    },
    //开关
    change(val){
        this.isshow01 = true;
      //console.log(val);
      if(val){
          this.type01 = 1
      }else{
           this.type01 = 0
      }
    },
    cancel(){
       this.isshow01 = false;
       location.reload();
    },
    confirm_goole(){
        if(this.goole == ''){
            layer.msg(this.$t('identity.enterGooole'));
            return;
        }
        var i = layer.load()
        this.$http({
            url:'/api/user/check_code',
            method:'post',
            data:{
              account:this.account,
              type:'google',
              code:this.goole
            }
        }).then(res=>{
            layer.close(i)
            this.show_goole = false;  
            this.goole = '';
            layer.msg(res.data.message)
            if(res.data.type == 'ok'){
                this.show_goole = false;  
                this.isshow = true;        
            }
        })
    },
    confirm01(){
        if(this.psw01 == ''){
            layer.msg(this.$t('register.logpwd'));
            return;
        }
       var i = layer.load();
       this.$http({
           url:'/api/user/open_validate',
           data:{
                password:this.psw01,
                type:this.type01
           },
           method:'post',
           headers: { Authorization: this.token }  
       }).then(res=>{
           this.isshow01 = false;
           this.psw01 = '';
           layer.close(i);
           layer.msg(res.data.message);
           setTimeout(()=>{
              ;location.reload();
           },1000)
        //    if(res.data.type == 'ok'){
        //        setTimeout(()=>{
        //          this.$router.back(-1);
        //        },1000)             
        //    }
       })
    },
    //复制
    copy() {
      var that = this;
      var clipboard = new Clipboard(".copy", {
        text: function() {
          return that.goole_token;
        }
      });
      clipboard.on("success", function(e) {
        that.flags = true;
        layer.msg(that.$t("lay.copys"));
      });
      clipboard.on("error", function(e) {
        that.flags = false;
        layer.msg(that.$t("lay.fcopy"));
      });
    },
    //提交
    submit(){
       if(this.radio == ''){
           layer.msg(this.$t('identity.verityType'));
           return;
       };
       if(this.radio == 3){
           this.show_goole = true;
       }else{
          this.isshow = true;
       } 
       
    },
    confirm(){
        if(this.psw == ''){
            layer.msg(this.$t('register.logpwd'));
            return
        }
       var data={password:this.psw};
       if(this.radio == '1'){
           data.type = 1;
       }
       if(this.radio == '2'){
           data.type = 2;
       }
       if(this.radio == '3'){
           data.type = 3;
       }
       if(this.radio == '0'){
           data.type = 0;
       }
       var i = layer.load();
       this.$http({
           url:'/api/user/validate_type',
           data:data,
           method:'post',
           headers: { Authorization: this.token }  
       }).then(res=>{
           this.isshow = false;
           this.psw = '';
           this.radio = '';
           layer.close(i);
           layer.msg(res.data.message);
           if(res.data.type == 'ok'){
               this.$router.back(-1);
           }
       })

    }
    }
}
</script>
<style scoped>
    .wrap{
        margin: 60px auto;
    }
    .el-button--medium{
        padding: 10 70px;
    }
    .bind{
        cursor: pointer;
    }
    .shad{
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background: rgba(0, 0, 0, 0.5)
    }
    .mask05{
        padding: 30px;
        background: #fff;
        border-radius: 5px;
    }
    .mask05 input{
        border: 1px solid #ccc;
        padding: 10px 10px;
        border-radius: 5px;
    }
    .btn{
        padding: 5px 8px;
        border-radius: 3px;
        cursor: pointer;
    }
    .copy{
        cursor: pointer;
    }
    .yinying{
        box-shadow: 0 0 8px #eee;
    }
</style>
