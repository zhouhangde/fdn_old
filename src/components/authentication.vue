<template>
  <div class="account-box wrap fColor1 bg-part clr-part">
    <p class="flex alcenter warn_box w80 center mb10">
      <img src="../assets/images/icon_warn.png">
      <span class="ft12 warn_text ml10">{{$t('auth2.tip')}}</span>
    </p>
    <div class="title tc ft28 mb10">{{$t('auth2.id')}}</div>
    <p class="tc">{{$t('auth2.name')}}：{{real_name}}<span class="ml10">{{$t('auth2.nowLever')}}：{{levers}}</span></p>
    <!--实名认证-->
    <div v-if="lever == 0">
      <!-- <div> -->
      <div class="mb10 flex center">
        <img src="../assets/images/step01.png">
      </div>
      <!--身份信息填写-->
      <div class="form column flex center w50">
        <div class="mb20">
          <p class="ft12 mb10">{{$t('auth2.type')}}</p>
          <el-select class="w100" v-model="card_type" :placeholder="$t('shop.pchoose')">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="mb20">
          <p class="ft12 mb10">{{$t('auth2.number')}}</p>
          <el-input v-model="card_id" :placeholder="$t('auth2.content')"></el-input>
        </div>
        <div class="mb20">
          <p class="ft12 mb10">{{$t('auth.name')}}</p>
          <el-input v-model="real_name" :placeholder="$t('auth2.content')"></el-input>
        </div>
        <p class="submit01 tc blue_bg mt10" @click="submit01">{{$t('auth.up')}}</p>
      </div>
    </div>
    <!--实名认证成功--->
    <div class="mt50" v-if="lever == 1">
      <div class="flex center mb10">
        <img src="../assets/images/success_img.png">
      </div>
      <p class="cor1 ft18 tc mb20">{{$t('auth2.complete')}}</p>
      <router-link to="/dealCenter" class="submit01 block w20 gotrade tc blue_bg mt10 mb10">{{$t('home.toTrade')}}</router-link>
      <p class="submit01 tc blue_bg mt10 w20 next" @click="lever = 8">{{$t('auth2.nextstep')}}</p>
    </div>
    <!---二级身份认证--->
    <div v-if="lever == 8">
      <div class="flex center mb20">
        <img src="../assets/images/step02.png">
      </div>
      <div class="ptb10 w50 margin">
        <p class="mb10 ft14 flex alcenter">
          <span class="spot inblock"></span>
          <span class="ml5">{{$t('auth2.positive')}}</span>
        </p>
        <p class="mb10 ft12">{{$t('auth2.mb')}}</p>
        <img width="158" height="96" :src="src1">
        <div class="positionR">
          <p class="txt_blue upload ft12 tc">{{$t('auth2.click')}}</p>
          <input type="file" id="file1" accept="image/*" name="file3" @change="file1">
        </div>
      </div>
      <div class="ptb10 w50 margin">
        <p class="mb10 ft14 flex alcenter">
          <span class="spot inblock"></span>
          <span class="ml5">{{$t('auth2.back')}}</span>
        </p>
        <p class="mb10 ft12">{{$t('auth2.mb')}}</p>
        <div class="flex">
          <div>
            <img width="158" height="96" :src="src2">
          </div>
        </div>
        <div class="positionR">
          <p class="txt_blue upload ft12 tc">{{$t('auth2.click')}}</p>
          <input type="file" id="file2" accept="image/*" name="file3" @change="file2">
        </div>
      </div>
      <div class="ptb10 w50 margin">
        <p class="mb10 ft14 flex alcenter">
          <span class="spot inblock"></span>
          <span class="ml5">{{$t('auth2.hand')}}</span>
        </p>
        <p class="mb10 ft12">{{$t('auth2.mb')}}</p>
        <div class="flex alcenter hand_box mt20">
          <img :src="src3" width="234" height="170">
          <div class="ml10">
            <p
              class="ft12 line-h2 mb10"
            >{{$t('auth2.tip2')}}</p>
            <div class="flex">
              <div>
                <p class="ft12 mb5 flex alcenter s_ico">
                  <img src="../assets/images/success.png">{{$t('auth2.face')}}
                </p>
                <p class="ft12 mb5 flex alcenter s_ico">
                  <img src="../assets/images/success.png">{{$t('auth2.clearly')}}
                </p>
                <p class="ft12 flex alcenter s_ico">
                  <img src="../assets/images/success.png">{{$t('auth2.notes')}}
                </p>
              </div>
              <div class="flex" style="align-items:flex-end;">
                <div class="positionR ml20">
                  <p class="txt_blue upload ft12 tc">{{$t('auth2.hand')}}</p>
                  <input type="file" id="file3" accept="image/*" name="file3" @change="file3">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="submit01 tc blue_bg mt10 w20 next" @click="submit2">{{$t('auth.up')}}</p>
    </div>
    <div class="mt50" v-if="lever == 4">
      <div class="flex center mb10">
        <img src="../assets/images/success_img.png">
      </div>
      <p class="cor1 ft18 tc mb20">{{$t('auth2.complete2')}}</p>
      <p class="ft14 mb10 tc">{{msg}}</p>
      <!-- <router-link to="/dealCenter" class="submit01 block w20 gotrade tc blue_bg mt10 mb10">去交易</router-link> -->
      <p class="submit01 tc blue_bg mt10 w20 next" @click="lever = 9">{{$t('auth2.complete3')}}</p>
    </div>
    <div class="mt50" v-if="lever == 2">
      <div class="flex center mb10">
        <img src="../assets/images/success_img.png">
      </div>
      <p class="cor1 ft18 tc mb20">{{$t('auth2.inaudit')}}</p>
      <!-- <router-link to="/dealCenter" class="submit01 block w20 gotrade tc blue_bg mt10 mb10">去交易</router-link> -->
      <!-- <p class="submit01 tc blue_bg mt10 w20 next" @click="lever = 9">进行下一步资产认证</p> -->
    </div>
    <div class="mt50" v-if="lever == 3">
      <div class="flex center mb10">
        <img src="../assets/images/no_pass.png">
      </div>
      <p class="cor1 ft18 tc mb20">{{$t('auth2.notpass')}}</p>
      <!-- <router-link to="/dealCenter" class="submit01 block w20 gotrade tc blue_bg mt10 mb10">去交易</router-link> -->
      <p class="submit01 tc blue_bg mt10 w20 next" @click="lever = 8">{{$t('auth2.again')}}</p>
    </div>
    <div class="mt50" v-if="lever == 5">
      <div class="flex center mb10">
        <img src="../assets/images/success_img.png">
      </div>
      <p class="cor1 ft18 tc mb20">{{$t('auth2.asset')}}</p>
      <!-- <router-link to="/dealCenter" class="submit01 block w20 gotrade tc blue_bg mt10 mb10">去交易</router-link> -->
      <!-- <p class="submit01 tc blue_bg mt10 w20 next" @click="lever = 2">进行下一步资产认证</p> -->
    </div>
    <div class="mt50" v-if="lever == 6">
      <div class="flex center mb10">
        <img src="../assets/images/no_pass.png">
      </div>
      <p class="cor1 ft18 tc mb20">{{$t('auth2.nasset')}}</p>
      <!-- <router-link to="/dealCenter" class="submit01 block w20 gotrade tc blue_bg mt10 mb10">去交易</router-link> -->
      <p class="submit01 tc blue_bg mt10 w20 next" @click="lever = 9">{{$t('auth2.again2')}}</p>
    </div>
    <div class="mt50" v-if="lever == 7">
      <div class="flex center mb10">
        <img src="../assets/images/success_img.png">
      </div>
      <p class="cor1 ft18 tc mb20">{{$t('auth2.complete4')}}</p>
      <p class="ft14 mb10 tc">{{msg}}</p>
      <!-- <router-link to="/dealCenter" class="submit01 block w20 gotrade tc blue_bg mt10 mb10">去交易</router-link> -->
      <!-- <p class="submit01 tc blue_bg mt10 w20 next" @click="lever = 2">进行下一步资产认证</p> -->
    </div>
    <!---三级资产认证-->
    <div v-if="lever == 9">
      <div class="w50" style="margin:30px auto;">
        <div class="ft14 mb10 mt10">{{$t('auth2.reminder')}}：</div>
        <p class="gray ft12">{{$t('auth2.tip3')}}</p>
      </div>
      <div class="flex center mb20">
        <img src="../assets/images/step03.png">
      </div>
      <div class="ptb10 w50 margin">
        <p class="mb10 ft14 flex alcenter">
          <span class="spot inblock"></span>
          <span class="ml5">{{$t('auth2.screenshot')}}</span>
        </p>
        <p class="mb10 ft12">
           {{$t('auth2.tip4')}}
        </p>
        <el-upload
          list-type="picture-card"
          action
          :limit="lim"
          :http-request="uploadImg"
          :on-preview="handlePictureCardPreview"
          :file-list="fileList"
          :on-exceed="exceedTips"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </div>
      <p class="submit01 tc blue_bg mt10 w20 next" @click="submit3">{{$t('auth.up')}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "authentication",
  data() {
    return {
      token: "",
      options: [
        {
          id: 1,
          name: this.$t('auth2.authCard')
        },
        {
          id: 2,
          name: this.$t('auth2.hu')
        },
        {
          id: 3,
          name: this.$t('auth2.driverCard')
        },
        {
          id: 99,
          name: this.$t('auth2.other')
        }
      ],
      card_type: "",
      card_id: "",
      real_name: "",
      lever: 0,
      src1: require("../assets/images/auth_fan.png"),
      src01: "",
      src2: require("../assets/images/auth_zheng.png"),
      src02: "",
      src3: require("../assets/images/auth_hand.png"),
      src03: "",
      pic: "", //资产图片
      dialogImageUrl: "",
      dialogVisible: false,
      lim: 1,
      fileList: [],
      msg: "",
      real_name:'',
      levers:''
    };
  },
  created() {
    this.token = localStorage.getItem("token");
    this.userInfo();
    this.tips();
  },
  methods: {
    //用户信息
    userInfo() {
      var i = layer.load();
      this.$http({
        url: "/api/user/info",
        method: "GET",
        data: {},
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        //console.log(res);
        if (res.data.type == "ok") {
          var msg = res.data.message;
          if (msg.is_auth == 1 && msg.review_status == 0) {
            //一级实名认证通过，未进行二级身份认证
            this.lever = 1;
            this.levers = this.$t('auth2.one');
          }
          if (msg.is_auth == 1 && msg.review_status == 1) {
            //二级身份认证提交，审核中
            this.lever = 2;
            this.levers = this.$t('auth2.one');
          }
          if (msg.is_auth == 1 && msg.review_status == 3) {
            //二级身份认证未通过
            this.lever = 3;
            this.levers = this.$t('auth2.one');
          }
          // if (msg.is_auth == 2 && msg.review_status == 2) { //二级身份认证通过
          //   this.lever = 4;
          // };
          if (
            msg.is_auth == 2 &&
            msg.review_status == 2 &&
            msg.asset_status == 0
          ) {
            //二级身份认证通过，未进行三级资产认证
            this.lever = 4;
            this.levers = this.$t('auth2.two');
          }
          if (msg.is_auth == 2 && msg.asset_status == 1) {
            //三级资产认证提交，审核中
            this.lever = 5;
            this.levers = this.$t('auth2.two');
          }
          if (msg.is_auth == 2 && msg.asset_status == 3) {
            //三级资产认证提交，审核未通过
            this.lever = 6;
            this.levers = this.$t('auth2.two');
          }
          if (msg.is_auth == 3 && msg.asset_status == 2) {
            //三级资产认证提交，审核通过
            this.lever = 7;
            this.levers = this.$t('auth.three');
          }
          //   if (msg.review_status == 1) {
          //     this.lever = 3;
          //   }
        }
      });
    },
    //检测是否含有汉子
    CheckIsChinese(val) {
      var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (reg.test(val)) {
        return false;
      }else{
        return true
      }
    },
    ismonth(str) {
      for ( let ilen = 0; ilen < str.length; ilen++) {
        if (str.charAt(ilen) < "0" || str.charAt(ilen) > "9") {
          if (str.charAt(ilen) != "-"){
            return false;
          }else{
            return true
          }
        }
      }
      return true;
    },
    //一级认证体提交
    submit01() {
      if (this.card_type == "") {
        layer.msg(this.$t('auth2.selectType'));
        return;
      }
      if (this.card_id == "") {
        layer.msg(this.$t('auth2.enterCardId'));
        return;
      }
      if(!this.CheckIsChinese(this.card_id)){
        layer.msg(this.$t('auth2.noWord'));
        return;
      }
      this.CheckIsChinese(this.card_id); //汉子检测
      if (this.real_name == "") {
        layer.msg(this.$t('auth2.enterRealName'));
        return;
      }
      if(this.ismonth(this.real_name)){
        layer.msg(this.$t('auth2.noNumber')); 
        return;
      }
      var i = layer.load();
      this.$http({
        url: "/api/user/first_real",
        data: {
          card_type: this.card_type,
          card_id: this.card_id,
          real_name: this.real_name
        },
        method: "post",
        headers: {
          Authorization: this.token,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      }).then(res => {
        layer.close(i);
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          this.lever = 1;
        }
      });
    },

    //二级身份认证

    goBefore() {
      this.$router.back(-1);
    },
    file1() {
      var that = this;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      var size = event.target.files[0].size; //图片大小
      //console.log(size);
      if (size > 4000 * 1024) {
        layer.msg(this.$t('auth2.noFour'));
        return;
      }
      reader.onload = function(e) {
        that.src1 = e.target.result;
        // that.src01 = e.target.result;
      };
      var formData = new FormData();
      formData.append("file", event.target.files[0]);
      //console.log(formData);
      var i = layer.load();
      $.ajax({
        url: "/api/" + "upload",

        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function beforeSend(request) {
          request.setRequestHeader("Authorization", that.token);
        },
        success: function(msg) {
          layer.close(i);
          //console.log(msg);
          that.src1 = msg.message;
          that.src01 = msg.message;
        }
      });
    },
    file2() {
      var that = this;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      var size = event.target.files[0].size; //图片大小
      //console.log(size);
      if (size > 4000 * 1024) {
        layer.msg(this.$t('auth2.noFour'));
        return;
      }
      reader.onload = function(e) {
        that.src2 = e.target.result;
        // that.src02 = e.target.result;
      };
      var formData = new FormData();
      formData.append("file", event.target.files[0]);
      var i = layer.load();
      $.ajax({
        url: "/api/" + "upload",
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function beforeSend(request) {
          request.setRequestHeader("Authorization", that.token);
        },
        success: function(msg) {
          layer.close(i);
          that.src2 = msg.message;
          that.src02 = msg.message;
        }
      });
    },
    file3() {
      var that = this;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      var size = event.target.files[0].size; //图片大小
      //console.log(size);
      if (size > 4000 * 1024) {
        layer.msg(this.$t('auth2.noFour'));
        return;
      }
      reader.onload = function(e) {
        that.src3 = e.target.result;
        // that.src03 = e.target.result;
      };
      var formData = new FormData();
      formData.append("file", event.target.files[0]);
      var i = layer.load();
      $.ajax({
        url: "/api/" + "upload",
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function beforeSend(request) {
          request.setRequestHeader("Authorization", that.token);
        },
        success: function(res) {
          layer.close(i);
          that.src03 = res.message;
          that.src3 = res.message;
        }
      });
    },

    //二级提交
    submit2() {
      if (this.src01 == "") {
        layer.msg(this.$t('auth2.frontImg'));
        return;
      }
      if (this.src02 == "") {
        layer.msg(this.$t('auth2.reverseImg'));
        return;
      }
      if (this.src03 == "") {
        layer.msg(this.$t('auth2.handImg'));
        return;
      }
      var i = layer.load();
      this.$http({
        url: "/api/user/real",
        data: {
          front_pic: this.src1,
          reverse_pic: this.src2,
          hand_pic: this.src3
        },
        headers: { Authorization: this.token },
        method: "post"
      }).then(res => {
        layer.close(i);
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          this.lever = 2;
        }
      });
    },
    //资产图片上传
    uploadImg(res) {
      //上传图片
      var that = this;
      //console.log(res);
      var formData = new FormData();
      formData.append("file", res.file);
      $.ajax({
        url: "/api/" + "upload",
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
          //console.log(res);
          that.pic = res.message;
        }
      });
    },
    handleRemove(file, fileList) {
      //删除图片
      //console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      //预览图片
      //console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    exceedTips(res) {
      //超出上传个数
      //console.log(res);
      layer.msg(this.$t('wAddress.moreAdd') + res.length + this.$t('wAddress.pics'));
    },
    //三级资产图提交
    submit3() {
      if (this.pic == "") {
        layer.msg(this.$t('auth2.assetImg'));
        return;
      }
      var i = layer.load();
      this.$http({
        url: "/api/user/asset_real",
        data: {
          change_pic: this.pic
        },
        headers: { Authorization: this.token },
        method: "post"
      }).then(res => {
        layer.close(i);
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          this.lever = 5;
        }
      });
    },

    updata() {
      var that = this;
      let name = this.$utils.trim(that.name);
      let card_id = this.$utils.trim(that.card_id);
      // var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (this.name.length == "") {
        layer.tips(that.$t("lay.nameplease"), "#name");
        return;
      }
      if (this.card_id.length == "") {
        layer.tips(that.$t("lay.idplease"), "#card");
        return;
      }
      // if(!reg.test(card_id)){
      //     layer.tips('请输入合法的身份证号!', '#card');
      //     return;
      // }
      if (that.src1 == "" || that.src2 == "" || that.src3 == "") {
        layer.msg(that.$t("lay.comid"));
        return;
      }
      var i = layer.load();
      this.$http({
        url: "/api/" + "user/real",
        method: "post",
        data: {
          name: name,
          card_id: card_id,
          front_pic: that.src1,
          reverse_pic: that.src2,
          hand_pic: that.src3
        },

        headers: {
          Authorization: that.token,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      })
        .then(res => {
          //console.log(res);
          layer.close(i);
          if (res.data.type == "ok") {
            layer.msg(res.data.message);
            setTimeout(function() {
              that.$router.back(-1);
            }, 2000);
          } else {
            layer.msg(res.data.message);
          }
        })
        .catch(error => {});
    },
    Info() {
      var i = layer.load();
      var that = this;
      this.$http({
        url: "/api/" + "user/info",
        method: "get",
        data: {},
        headers: { Authorization: that.token }
      })
        .then(res => {
          layer.close(i);
          that.review_status = res.data.message.review_status;
          that.real_name = res.data.message.real_name;
        })
        .catch(error => {});
    },
    replyData() {
      this.$http({
        url: "/api/" + "user/real_info",
        method: "get",
        data: {},
        headers: { Authorization: this.token }
      }).then(res => {
        //console.log(res);
        if (res.data.type == "ok") {
          this.reply = res.data.message.reply;
        } else {
        }
      });
    },
    //认证提示语

    tips() {
      this.$http({
        url: "/api/take/take_number",
        method: "get",
        data: {},
        headers: { Authorization: this.token }
      }).then(res => {
        //console.log(res);
        if (res.data.type == "ok") {
          this.msg = res.data.message;
        } else {
        }
      });
    }
  },
  mounted() {
    this.Info();
    this.replyData();
  }
};
</script>
<style scoped lang="scss">
.account-box {
  margin: 0px auto 0;
  width: 1200px;
  min-height: 1080px;
  padding: 30px 0;
  .title {
    width: 100%;
    line-height: 60px;
    border-radius: 4px;
    padding: 0 20px;
  }
  .warn_box {
    background: #fff5e6;
    border-radius: 4px;
    border: 1px solid #ed8000;
    padding: 5px 10px;
    margin: 0 auto;
  }
  .warn_text {
    color: #ed8000;
  }
  .form {
    margin: 10px auto;
    padding: 20px 130px;
  }
  .submit01 {
    padding: 10px 0;
    border-radius: 25px;
    cursor: pointer;
  }
  .gotrade {
    margin: 10px auto;
  }
  .next {
    margin: 20px auto;
  }
  .spot {
    width: 6px;
    height: 6px;
    background: #f00;
    border-radius: 50%;
  }
  .upload {
    padding: 5px 10px;
    border-radius: 20px;
    width: 160px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .s_ico img {
    width: 12px;
    margin-right: 5px;
  }
  .hand_box {
    padding: 8px;
    border: 1px dashed #ccc;
    border-radius: 8px;
  }
  #file1,
  #file2,
  #file3 {
    width: 160px;
    position: absolute;
    opacity: 0;
    top: 0;
  }
}
</style>
