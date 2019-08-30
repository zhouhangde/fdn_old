<template>
  <div class="bgs">
	<div class="sgr_banner">
		<p class="ft12 white"><span style="position: absolute;top: 75%;left: 59%;" class="intro1 ptb5 plr20 curPer"><router-link :to="{path:'/components/noticeDetail', query:{id:389}}"> {{$t('sgr.sgrinfo')}}</router-link></span></p>
	</div>
    <div class="wrap white">
        <!--头部-->
        <!--<div class="w40 top">
          <p class="ft28 mb10 big">FDN现已开启</p>
          <p class="ft24 tr mb10">SGR Demand 模式</p>
          <p class="tr ft12"><span class="intro ptb5 plr20 curPer"><router-link :to="{path:'/components/noticeDetail', query:{id:341}}"> Demand玩法介绍</router-link></span></p>
        </div>-->
		<p class="tc mb10" style="font-size: 10px;color: #000;" v-if="token">{{$t('sgr.lock')}}<span style="font-size: 18px;font-weight: bold;color:rgb(49, 106, 225);">{{info.user_sgr_lock}} SGR ≈ {{info.cny_user_sgr}} CNY</span></p>
      <p style="padding-bottom: 10px" class="ft16 flex center alcenter white mb10">
        <span v-if="!token"  class="ptb10 plr20 w80 tc">
			<span style="font-size: 10px;color: #000;">{{$t('sgr.sgrget')}}</span><span style="font-size: 18px;font-weight: bold;color:rgb(49, 106, 225);">{{msg.now_register_sgr}} SGR</span>
          <router-link v-if="!token" to="/components/register" class="ft14 intro1 ptb5 plr20 curPer">{{$t('sgr.signup')}}</router-link>
        </span>
      </p>
      <!-- <p class="flex ptb10 plr5 ft14 mb10 between msg green1">
        <span>
          <span class="greenCor">今日全站Demand释放量：</span>
          <span>{{msg.now_number}} SGR</span>
        </span>
        <span>
          <span class="greenCor">昨日全站Demand释放量：</span>
          <span>{{msg.yester_number}} SGR</span>
        </span>
      </p> -->
      <!--<p class="flex between ft14 mb5">
        <span>SGR全站流通数量</span>
        <span>SGR全站锁定数量</span>
      </p>-->
		<p :style="'margin-left:'+ (perNum-6) +'%;'" style="color:rgb(16, 132, 230);font-weight: bolder">{{perNum.toFixed(2)}}%</p>
      <el-progress :text-inside="true" :stroke-width="16" :percentage="perNum" :show-text="false"></el-progress>
      <p class="flex between ft14">
        <span style="color:#000000">SGR {{$t('sgr.cir')}}<span style="color:rgb(16, 132, 230)">{{msg.sum_balance}} SGR</span></span>
        <span style="color:#000000">SGR {{$t('sgr.lock')}}<span style="color:rgb(16, 132, 230)">{{msg.sum_lock}} SGR</span></span>
      </p>
      <div class="mt10" style="margin-top: 40px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix " style="">
            <p class="tc" style="text-align: left;font-weight: bold">{{$t('sgr.richman')}}</p>
          </div>
          <div class="flex alcenter">
              <ul style=""  class="plr10 w100">
                  <li class="ft14 ptb5 flex between">
                      <span class="flex1 ">{{$t('sgr.user')}}</span>
					  <span class="flex1 tl">{{$t('sgr.time')}}</span>
                      <span class="flex1 tl">{{$t('sgr.amount')}}</span>
                  </li>
                  <div class="flex">
                    <div class="flex1">
                  <li class="ft14 ptb5 flex1 between" v-for="(item,index) in msg.five_riches" :key="index">
                      <span class="flex1 ">{{item.account}}</span>
                  </li>
                  </div>
                  <!--<li class="ft14 ptb5 flex center alcenter" v-if="rich.length>0">
                      <span class="flex1 tc ft20">赢得{{msg.five_riches[0].number}} SGR</span>
                  </li>-->
                  <div class="flex1 tl">
                  <li class="ft14 ptb5 flex1 between tl" v-for="(item,index) in msg.five_riches" :key="index">
                      <span class="flex1 tl">{{item.time}}</span>
                  </li>
                  </div>
					  <div class="flex1">
						  <li class="ft14 ptb5 flex1 between tl" v-for="(item,index) in msg.five_riches" :key="index">
							  <span class="flex1 tl">{{item.number}}</span>
						  </li>
					  </div>
                  </div>
              </ul>
              <!-- <div class="flex alcenter center white">
                 <span class="ptb10 plr20 radius5 ft16" v-if="msg.five_riches.length">赢得<span class="greenCor ft18">{{msg.five_riches[0].number}}</span>SGR</span>
              </div> -->

          </div>
        </el-card>
      </div>
      <div v-if="token">
      <p class="ft16 flex center alcenter ptb10 white mb10 personal_num mt10 ">
		  {{$t('sgr.todayrelease')}}：<span style="font-size: 18px;font-weight: bold;color:rgb(49, 106, 225);">{{info.now_number}} SGR</span>
         <router-link to="/release" class="ft14 intro1 greenCor ml20 curPer" style="color: #fff;">{{$t('sgr.releaserecords')}}</router-link>
      </p>
      <div class="flex ptb10 plr10 between links">
         <div>
             <p class="mb20" style="color: #000">{{$t('sgr.invite')}}</p>
             <p class="greenCor" style="color: #409eff">{{$t('sgr.link')}}：https://www.hxex.one/#/components/register?code={{invite_code}}</p>
         </div>
         <div class="flex column end">
             <span class="ft14 plr10 ptb5 copy copy_link intro1 curPer bg_green" @click="copy_link">{{$t('sgr.copy')}}</span>
         </div>
      </div>
      <p class="ft16 flex center alcenter ptb10 white mb10 personal_num mt10">
		  {{$t('sgr.totallock')}}：<span class="greenCor" style="font-size: 18px;font-weight: bold;color:rgb(49, 106, 225);">{{info.count_inv_number}} SGR</span>
      </p>
      <!---邀请列表--->
      <ul class="mt10 ptb10 radius4 inviteList greenCor" style="color: #000;">
		  <li class="ft14 tc ptb5">{{$t('sgr.onelevel')}}：{{info.first_user_count}}人，{{$t('sgr.get')}}{{info.first_number}}SGR{{$t('sgr.rebate')}}</li>
		  <li class="ft14 tc ptb5">{{$t('sgr.twolevel')}}：{{info.second_user_count}}人，{{$t('sgr.get')}}{{info.second_number}}SGR{{$t('sgr.rebate')}}</li>
		  <li class="ft14 tc ptb5">{{$t('sgr.therelevel')}}：{{info.third_user_count}}人，{{$t('sgr.get')}}{{info.third_number}}SGR{{$t('sgr.rebate')}}</li>
      </ul>
      </div>
    </div>
  </div>
</template>
<script>
import "@/lib/clipboard.min.js";
export default {
  data() {
    return {
      token: "",
      msg:'',
      info:'',
      invite_code:'',
      todayList:[
          {
              name:'用户123'
          },
          {
              name:'用户123'
          },
          {
              name:'用户123'
          }
      ],
      perNum:0,
      rich:[]
    };
  },
  created() {
    this.token = localStorage.getItem("token");
    this.getInfo();
    this.userInfo();
    this.mySgr();
  },
  methods: {
      //userinfo
        userInfo(){
           this.$http({
            url: "/api/" + "user/info",
            method: "get",
            data: {},
            headers: { Authorization: localStorage.getItem("token") }
        }).then(res => {
            if (res.data.type == "ok") {
               this.invite_code = res.data.message.invite_code
            }
            })
        },
      //复制链接
      copy_link(){
            var that = this;
            var clipboard = new Clipboard(".copy_link", {
                text: function() {
                return (
                    'https://www.hxex.one/#/components/register?code='+that.invite_code
                );
                }
            });
            clipboard.on("success", function(e) {
                that.flags = true;
                layer.msg(that.$t('lay.copys'));
            });
            clipboard.on("error", function(e) {
                that.flags = false;
                layer.msg(that.$t('lay.recopy'));
            });
            },
      getInfo(){
          this.$http({
              url:'/api/sgr/info',
              method:'get'
          }).then(res=>{
              if(res.data.type == 'ok'){
                  this.msg = res.data.message;
                  this.rich = res.data.message.five_riches;
                  this.perNum = this.msg.sum_balance/(this.msg.sum_balance+this.msg.sum_lock)*100
              }
          })
      },
      //
      mySgr(){
          this.$http({
              url:'/api/sgr/my_sgr',
              method:'get',
               headers: { Authorization: localStorage.getItem("token") }
          }).then(res=>{
              if(res.data.type == 'ok'){
                  this.info = res.data.message;
              }
          })
      }
  }
};
</script>

<style scoped>
.bgs{
    /* background: url('../assets/images/register_bg.png') top center no-repeat; */
    /*background: #ccc;*/
    background-size: cover;
    width: 100%;
        min-height: 1100px;
}
.wrap {
  width: 55%;
  margin: -5px auto;
  padding:30px 0;
}
.top{
    margin:50px auto;
}
.big{
    font-style: italic;
}
.title {
  border-radius: 20px;
  background: linear-gradient(left,#3959ba,#030657);

}
.greenCor{
  color:#6ef3e7;
}
.green1{
  background: linear-gradient(left,#1571b7,#114c9f);
}
.bg_green{
  background: #06a6c8;
}
.plr5 {
  padding-left: 5px;
  padding-right: 5px;
}
.mb5 {
  margin-bottom: 5px;
}
.msg {
  /* background: #eee; */
}
.ptb5{
    padding-top: 5px;
    padding-bottom: 5px;
}
.personal_num{
    border-radius:20px;
	color: #000;
	font-size: 10px
    /* background: linear-gradient(left,#1571b7,#114c9f); */
    /*background: linear-gradient(left,#3959ba,#030657);*/
}
.copy{
    border-radius: 15px;
    padding: 5px 20px;
    /* background: #ccc; */
}
.links{
    background: #fff;
    border-radius: 3px;
}
.inviteList{
    border-radius: 3px;
    background: #fff;
}
.el-card{
  border: none!important;
  background:#fff;
}
.el-card>.el-card__header{
  background:#395abb!important;
}
.intro{
  background: #06a6c8;
  padding: 3px 10px;
  border-radius: 12px;
}

.intro1{
	background: #409eff;
	padding: 2px 8px;
	border-radius: 12px;
}

.sgr_banner {
	background: url('../assets/images/sgr_bg.jpg') no-repeat 50%;
	/*background-size:100% 100%;*/
	width: 100%;
	height: 200px;
	position: relative;
}
</style>
<style>
	.el-progress-bar__outer {
		background-color: #c8cdda;
	}
</style>

