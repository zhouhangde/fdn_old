<template>
  <div class="mt45 bgWhite wrap">
    <div class="top w100"></div>
    <div class="flex alcenter mb30 w90 top_msg" style="margin:10px auto;">
      <div class="logo_wrap">
        <img class="logoImg" :src="msg.logo" alt>
      </div>
      <div class="ml25 flex column center mt10">
        <p class="mb10">
          <span class="ft28">{{msg.title}}</span>
          <span class="gray ml5 ft22 mr20">{{msg.name}}</span>
          <span class="mr5 gray_blue mark ft12" v-for="(itm,i) in JSON.parse(msg.keyword)" :key="i">{{itm}}</span>
        </p>
        <p class="ft16 gray6 mb10">{{msg.abstracts}}</p>
        <p class="ft12 gray9">{{$t('tpc.tips')}}</p>
      </div>
    </div>
    <!--基本信息-->
    <div class="w90 msg ptb20 ">
        <p class="cor ft18 pl20 msg_title mb10">{{$t('info')}}</p>
        <p class="ft14 gray6 ptb10"><span class="left_sp w12 tc inblock">{{$t('tpc.time')}}</span><span class="ml25">{{msg.publish_time}}</span></p>
        <p class="ft14 gray6 ptb10"><span class="left_sp w12 tc inblock">{{$t('tpc.total')}}</span><span class="ml25">{{msg.total_number}}</span></p>
        <p class="ft14 gray6 ptb10"><span class="left_sp w12 tc inblock">{{$t('tpc.circulation')}}</span><span class="ml25">{{msg.circulate_number}}</span></p>
        <p class="ft14 gray6 ptb10"><span class="left_sp w12 tc inblock">{{$t('tpc.price')}}</span><span class="ml25">{{msg.price}}</span></p>
        <p class="ft14 gray6 ptb10"><span class="left_sp w12 tc inblock">{{$t('tpc.web')}}</span><a :href="msg.website" target="_blank" class="ml25">{{msg.website}}</a></p>
        <p class="ft14 gray6 ptb10"><span class="left_sp w12 tc inblock">{{$t('tpc.book')}}</span><a :href="msg.whiteBook" target="_blank" class="ml25">{{msg.whiteBook}}</a></p>
        <p class="ft14 gray6 ptb10"><span class="left_sp w12 tc inblock">Github</span><a :href="msg.github" target="_blank" class="ml25">{{msg.github}}</a></p>
        <p class="ft14 gray6 ptb10"><span class="left_sp w12 tc inblock">{{$t('tpc.recommend')}}</span><span class="ml25">{{msg.organization}}</span></p>
        <p class="ft14 gray6 ptb10 flex alcenter"><span class="left_sp w12 tc inblock">{{$t('tpc.tool')}}</span><span class="ml25"><a :href="href01" target="_blank"><img src="../assets/images/facebook.png"></a><a :href="href02"  target="_blank"><img class="ml5" src="../assets/images/Shape.png"></a></span></p>        
    </div>
    <ul class="flex bdb bold pass_title w90 mt10">
        <li class="ft18 ptb10" :class="{'active_item':active == 0}" @click="active = 0">{{$t('tpc.introduce')}}</li>
        <li class="ft18 ptb10" :class="{'active_item':active == 1}" @click="active = 1">{{$t('tpc.notice')}}</li>
        <li class="ft18 ptb10" :class="{'active_item':active == 2}" @click="active = 2">{{$t('tpc.rr')}}</li>
        <li class="ft18 ptb10" :class="{'active_item':active == 3}" @click="active = 3">{{$t('tpc.news')}}</li>
    </ul>
    <!--介绍-->
    <div class="w90 main plr20 ptb10" v-html="msg.content" v-if="active == 0"></div>
    <!--公告-->
    <div class="w90 main" v-if="active == 1">
      <div @click="go_notice(itm01.thisId)" class="bdb plr20 ptb10 curPer" v-for="(itm01,idx01) in msg.affiche" :key="idx01">
      <p class="cor ft18 bold mb10">{{itm01.title}}</p>
      <!-- <p class="mb10 ft14 gray6 ptb10" v-html="itm01.content"></p> -->
      <p class="flex between gray_blue ft12 ptb10"><span><span  class="mr10">{{$t('tpc.author')}}：{{itm01.author}}</span>{{$t('tpc.browse')}}：{{itm01.views}}</span><span>{{itm01.update_time}}</span></p>
      </div>
    </div>
    <!--研报-->
    <div class="w90 main plr20" v-if="active == 2">
      <div @click="go_report(itm01.thisId)" class="bdb plr20 ptb10 curPer" v-for="(itm01,idx01) in msg.report" :key="idx01">
      <p class="cor ft18 bold mb10">{{itm01.title}}</p>
      <!-- <p class="mb10 ft14 gray6 ptb10" v-html="itm01.content"></p> -->
      <p class="flex between gray_blue ft12 ptb10"><span><span  class="mr10">{{$t('tpc.author')}}：{{itm01.author}}</span>{{$t('tpc.browse')}}：{{itm01.views}}</span><span>{{itm01.update_time}}</span></p>
      </div>
    </div>
    <!--咨讯-->
    <div class="w90 main plr20" v-if="active == 3">
      <div @click="go_consult(itm01.thisId)" class="bdb plr20 ptb10 curPer" v-for="(itm01,idx01) in msg.new_consult" :key="idx01">
      <p class="cor ft18 bold mb10">{{itm01.title}}</p>
      <!-- <p class="mb10 ft14 gray6 ptb10" v-html="itm01.content"></p> -->
      <p class="flex between gray_blue ft12 ptb10"><span><span  class="mr10">{{$t('tpc.author')}}：{{itm01.author}}</span>{{$t('tpc.browse')}}：{{itm01.views}}</span><span>{{itm01.update_time}}</span></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        active:0,
        id:'',
        msg:'',
        href01:'',
        href02:''
    };
  },
  created(){
      this.id = this.$route.query.id;
      this.getDetail();
  },
  methods:{
    getDetail(){
      this.$http({
        url:'/api/currency_token/detail',
        params:{id:this.id},
        method:'get'
      }).then(res=>{
          if(res.data.type == 'ok'){
            this.msg = res.data.message;
            this.href01 = JSON.parse(res.data.message.social_contact).Facebook;
            this.href02 = JSON.parse(res.data.message.social_contact).Twitter
          }
      })
    },
    go_notice(id){
      this.$router.push({path:'/passnoticeDetail',query:{id:id}})
    },
    go_report(id){
      this.$router.push({path:'/passreport',query:{id:id}})
    },
    go_consult(id){
      this.$router.push({path:'/passconsult',query:{id:id}})
    }
    
  }
};
</script>
<style scoped>
.top {
  background: url("../assets/images/pass_detail.jpg") top center no-repeat;
  height: 100px;
  background-size: 100% 100%;
}
.top_msg{
  position: relative;
  top: -40px;
}
.msg_title{
    border-left: 5px solid #000;
}
.mark {
  background: rgba(126, 144, 190, 0.2);
  padding: 3px 6px;
}
.logo_wrap{
    padding: 15px;
    border-radius: 50%;
    background: #fff;
}
.logoImg{
    width: 130px;
    height: 130px;
    border-radius: 50%;
}
.msg{
    background: #F8F8F8;
    margin: 0 auto;
}
.pass_title{
    margin: 10px auto;
}
.pass_title li{
    color: #7E90BE;
    margin-right: 50px;
    cursor: pointer;
}
.active_item{
    color: #332C58!important;
    border-bottom: 4px solid #332C58;
}
.main{
    margin: 10px auto;
}
.wrap{
  min-height: 1050px;
}
</style>
