<template>
    <div id="pay-opts" class="ptb20">
      <p class="flex between"><span>{{$t('set.msgcer')}}</span>
        <span class="auth_detail red">
          <router-link to="/userCenter/authDetail">{{$t('set.attestation')}}</router-link>
        </span>
      </p>
      <div class="tips">
        <p>{{$t('account.notice')}}：</p>
        <p class="ft14 msg">{{$t('set.turemsg')}}</p>
      </div>
      <!--收款类型-->
      <div class="inp-item">
            <div>{{$t('set.setpay')}}</div>
            <select class="select_bank" v-model="cashier_type_id">
              <option :value="item.cashier_type_id" v-for="(item, index) in cashType_list" :key="index">{{item.cashier_type_name}}</option>
            </select>
        </div>
        <!--支付宝收款信息-->
        <div v-if="cashier_type_id == 1">
          <div class="inp-item">
              <div>{{$t('auth.name')}}</div>
              <input type="text" :placeholder="$t('set.nameplease')" v-model="name">
          </div>
          <div class="inp-item">
              <div>{{$t('set.ailipay')}}</div>
              <input type="text" :placeholder="$t('set.palipay')" v-model="account">
          </div>
          <div class="inp-item">
              <div>{{$t('set.remarks')}}</div>
              <input type="text" :placeholder="$t('set.premarks')" v-model="info">
          </div>
          <div class="">
            <p class="codeText">{{$t('set.addalipaycode')}}</p>
            <div class="mt40">
            <el-upload
              list-type="picture-card"
              action=""
              :limit="lim"
              :http-request="uploadImg"
              :on-preview="handlePictureCardPreview"
              :file-list="fileList"
              :on-exceed="exceedTips"  
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </div>
          </div>
        </div>
        <!--微信收款信息-->
        <div v-if="cashier_type_id == 2">
          <div class="inp-item">
              <div>{{$t('auth.name')}}</div>
              <input type="text" :placeholder="$t('set.nameplease')" v-model="name">
          </div>
          <div class="inp-item">
              <div>{{$t('set.wenum')}}</div>
              <input type="text" :placeholder="$t('set.pwenum')" v-model="account">
          </div>
          <div class="inp-item">
              <div>{{$t('set.remarks')}}</div>
              <input type="text" :placeholder="$t('set.premarks')" v-model="info">
          </div>
          <div class="">
            <p class="codeText">{{$t('set.addwenumcode')}}</p>
            <div class="mt40">
            <el-upload
              list-type="picture-card"
              action=""
              :limit="lim"
              :http-request="uploadImg"
              :on-preview="handlePictureCardPreview"
              :file-list="fileList"
              :on-exceed="exceedTips"  
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </div>
          </div>
        </div>
        <!--银行收款信息-->
        <div v-if="cashier_type_id == 3">
          <div class="inp-item">
            <div>{{$t('set.kname')}}</div>
            <select class="select_bank" v-model="bank_id">
              <option value="" disabled>{{$t('legaltrade.select')}}</option>
              <option :value="item.bank_id" v-for="(item, index) in bankList" :key="index">{{item.bank_name}}</option>
            </select>
        </div>
        <div class="inp-item">
              <div>{{$t('legaltrade.zhihang')}}</div>
              <input type="text" :placeholder="$t('legaltrade.enterzhihang')" v-model="sub_bank">
          </div>
          <div class="inp-item">
              <div>{{$t('auth.name')}}</div>
              <input type="text" :placeholder="$t('set.nameplease')" v-model="name">
          </div>
          <div class="inp-item">
              <div>{{$t('wAddress.bankNum')}}</div>
              <input type="text" :placeholder="$t('wAddress.enterCardNum')" v-model="account">
          </div>
          <div class="inp-item">
              <div>{{$t('set.remarks')}}</div>
              <input type="text" :placeholder="$t('set.premarks')" v-model="info">
          </div>
          <!-- <div class="">
            <p class="codeText">添加银行收款码</p>
            <div class="mt40">
            <el-upload
              list-type="picture-card"
              action=""
              :limit="lim"
              :http-request="uploadImg"
              :on-preview="handlePictureCardPreview"
              :file-list="fileList"
              :on-exceed="exceedTips"  
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </div>
          </div> -->
        </div>
        <!-- <div class="inp-item">
            <div>{{$t('set.tname')}}</div>
            <input type="text" class="请输入真实姓名" v-model="name">
        </div>
        <div class="inp-item">
            <div>{{$t('set.kname')}}</div>
            <select class="select_bank" v-model="bank_id">
              <option value="" disabled>请选择</option>
              <option :value="item.bank_id" v-for="(item, index) in bankList" :key="index">{{item.bank_name}}</option>
            </select>
        </div>
         <div class="inp-item">
            <div>{{$t('set.bank_address')}}</div>
            <input type="text" class="请输入开户行地址" v-model="bank_address">
        </div>
        <div class="inp-item">
            <div>{{$t('set.cnum')}}</div>
            <input type="number" class="请输入银行卡号" v-model="bankNum">
        </div>
        <div class="inp-item">
            <div>{{$t('set.ailipay_nickname')}}</div>
            <input type="text" class="请输入支付宝昵称" v-model="ali_nickname">
        </div>
        <div class="inp-item">
            <div>{{$t('set.ailipay')}}</div>
            <input type="text" class="请输入支付宝账号" v-model="ali">
        </div>
        <div class="inp-item">
            <div>{{$t('set.wename')}}</div>
            <input type="text" class="请输入微信昵称" v-model="weChatName">
        </div>
        <div class="inp-item">
            <div>{{$t('set.wenum')}}</div>
            <input type="text" class="微信账号" v-model="weChatAccount">
        </div> -->
        <div class="btn bgRed blue_bg" @click="add">
            {{$t('confirm')}}
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      name: "",
      bankName: "",
      bank_id:'',
      bankNum: "",
      ali: "",
      weChatAccount: "",
      weChatName: "",
      bankList:[],
      cashType_list:[],
      bank_address:'',
      ali_nickname:'',
      account:'', //账号
      info:'', //备注
      cashier_type_id:1,//收款类型id
      dialogImageUrl: '',
      dialogVisible: false,
      lim:1,
      fileList:[],
      pic:'', //二维码图片
      sub_bank:''
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    if(this.token == ''){
      this.$router.push('/components/login');
    }
    this.getInfo();
    this.getbankList();
    this.getCashType_list();
  },
  methods: {
    uploadImg(res){  //上传图片
       var that = this;
       //console.log(res);
       var formData = new FormData();
       formData.append("file", res.file); 
       $.ajax({
                url: '/api/'+'upload',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function (res) {
                    //console.log(res)
                    that.pic = res.message;
                }
            });
    },
    //获取收款类型列表
    getCashType_list(){
       this.$http({
         url:'/api/cashier/type_list'
       }).then(res=>{
          if(res.data.type == 'ok'){
            this.cashType_list = res.data.message;
          }
       })
    },
    //获取银行列表
    getbankList(){
       this.$http({
         url:'/api/bank/list'
       }).then(res=>{
          if(res.data.type == 'ok'){
            this.bankList = res.data.message;
          }
       })
    },
    getInfo() {
      this.$http({
        url: "/api/user/cashier_info",
        method: "get",
        headers: { 'Authorization': this.token},
        
      }).then(res => {
        if ((res.data.type == "ok")) {
            if(res.data.message != null){
                let data = res.data.message;
                this.name = data.real_name;
                this.bankName = data.bank_name;
                this.bankNum = data.bank_account;
                this.ali = data.alipay_account;
                this.weChatAccount = data.wechat_account;
                this.weChatName = data.wechat_nickname;
                this.ali_nickname = data.alipay_nickname;
                this.bank_address = data.bank_address;
                this.bank_id = data.bank_id;
            }

        }
      });
    },
    add() {
        if(this.name == ''){
            layer.msg(this.$t('set.nameplease'));return;
        }
        if(this.account == ''){
            layer.msg(this.$t('lay.paccount'));return;
        }
        if(this.info == ''){
            layer.msg(this.$t('set.premarks'));return;
        }
        if(this.pic == ''&&this.cashier_type_id != 3){
            layer.msg(this.$t('wAddress.addcode'));return;
        }
        var data = {
          cashier_type_id:this.cashier_type_id,
          name:this.name,
          account:this.account,
          info:this.info
        };
         if(this.cashier_type_id != 3){
           data.pic = this.pic
         }
        if(this.cashier_type_id == 3){
          if(this.sub_bank == ''){
            layer.msg(this.$t('legaltrade.enterzhihang'));return;
        }
            data.bank_id = this.bank_id;
            data.address = this.sub_bank;
        }
      this.$http({
        url: "/api/user/cashier",
        method: "post",
        data: data,
        headers: { 'Authorization': this.token,'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', }
      }).then(res => {
           this.pic = ''
          layer.msg(res.data.message);
          setTimeout(() => {
            location.reload();
          }, 1000);
      })
    },

      handleRemove(file, fileList) {  //删除图片
          //console.log(file, fileList);
        },
      handlePictureCardPreview(file) { //预览图片
        //console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      exceedTips(res){  //超出上传个数
          //console.log(res);
          layer.msg(this.$t('wAddress.moreAdd')+res.length+this.$t('wAddress.pics'))
      }
  }
};
</script>

<style lang='scss'>

#pay-opts {
  .select_bank{
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
  width: 620px;
  margin: 0 auto;
   .inp-item {
    position: relative;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    padding-left: 160px;
    height: 42px;
    > div {
      position: absolute;
      top: 0;
      left: 0;
      border-right: 1px solid #ddd;
      width: 160px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #f8f8f8;
    }
    > input {
      display: block;
      padding: 0 20px;
      width: 100%;
      line-height: 40px;
    }
  }
  .btn {
    margin: 30px auto;
    width: 200px;
    line-height: 40px;
    text-align: center;
    background: #563BD1;
    color: #fff;
    cursor: pointer;
  }
  .tips{
    padding: 18px 15px;
    margin: 20px 0;
    border: 1px solid #eee;
    background: #F9FCFF;
  }
  .msg{
    line-height: 45px;
  }
  .codeText{
    width: 160px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #f8f8f8;
    border: 1px solid #ddd;
  }
  select{
    padding: 0 20px;
  }
}
.auth_detail{
  cursor: pointer;
}
</style>
