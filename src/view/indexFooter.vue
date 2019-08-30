<template>

  <div id="index-footer" class="foot flex center around" style="padding:50px 80px;">
  
    <ul class="ft12 foot_ul gray_a">
      <div>
        <li class="mb15 ft16 white">{{$t('footer.about')}}</li>
        <li class="mb15">
          <!-- <router-link v-if="token" :to="{path:'/legalTrade'}" class="mr15" tag="span">{{$t('header.c2c')}}</router-link> -->
          <!-- <router-link v-else :to="{path:'/components/login'}" class="mr15" tag="span">{{$t('header.c2c')}}</router-link> -->
          <router-link :to="{path:'/aboutUs',query:{id:2}}" tag="span">{{$t('footer.hxex')}}</router-link>
        </li>
        <li class="mb15">
          <router-link
            :to="{path:'/aggrement',query:{id:1}}"
            class=""
            tag="span"
          >{{$t('footer.xieyi')}}</router-link>
        </li>
        <li class="mb15">
          <router-link
            :to="{path:'/privacy',query:{id:9}}"
            tag="span"
          >{{$t('footer.yinsi')}}</router-link>
        </li>
        <li class="mb15">
          <router-link
            :to="{path:'/falv',query:{id:8}}"
            tag="span"
          >{{$t('footer.legal')}}</router-link>
        </li>
      </div>
    </ul>
    <img src="../assets/images/liner-border.png">
    <ul class="ft12 foot_ul gray_a">
      <div>
        <li class="mb15 ft16 white">{{$t('header.help')}}</li>
        <li class="mb15 curPer"><a href="https://51gsc.com/app/JJS0" target="_blank">{{$t('footer.download')}}</a></li>
        <li class="mb15">
          <!-- <router-link :to="{path:'/components/noticeDetail',query:{id:47}}" class="mr15" tag="span">{{$t('footer.connect')}}</router-link> -->
          <router-link :to="{path:'/noticeHelp'}" tag="span">{{$t('footer.notice')}}</router-link>
        </li>
        <li class="mb15">
          <!-- 新手帮助 -->
          <router-link :to="{path:'/newHelp'}" tag="span">{{$t('footer.nhelp')}}</router-link>
        </li>
        <!-- <li class="mb15"> 
          <router-link
            :to="{path:'/help',query:{id:3}}"
            tag="span"
          >{{$t('footer.feilv')}}</router-link>
        </li> -->
        <!-- <li class="mb15">
          <router-link :to="{path:'/advice'}" tag="span">{{$t('header.complaint')}}</router-link>
        </li> -->
      </div>
    </ul>
    <img src="../assets/images/liner-border.png">
    <ul class="ft12 foot_ul gray_a">
      <div>
        <li class="mb15 ft16 white">{{$t('footer.support')}}</li>
        <!-- <li class="mb15">
          <router-link
            :to="{path:'/components/noticeDetail',query:{id:34}}"
            class=""
            tag="span"
          >API文档</router-link>
        </li> -->
        <li class="mb15">
          <router-link
            :to="{path:'/advice'}"
            tag="span"
          >{{$t('footer.workorder')}}</router-link>
        </li>
        <li class="mb15" >
          <!--<router-link
            :to="{path:'/currencyApply'}"
            tag="span">
            {{$t('footer.apply')}}
            </router-link>-->
			<a target="_blank" href="http://va.mikecrm.com/yPOgcOl">{{$t('footer.apply')}} </a>
        </li>
        <li class="mb15" >
            {{$t('footer.email')}}:business@hxex.com
        </li>
		  <li class="mb15" >
			  {{$t('footer.support')}}:support@hxex.com
		  </li>
      </div>
    </ul>
    <img src="../assets/images/liner-border.png">
    <ul class="ft12 foot_ul gray_a positionR">
      <div>
        <li class="mb15 ft16 white">{{$t('footer.community')}}</li>
        <li class="mb15" v-for="(item,i) in img_link">
          <span
            class="flex alcenter"
            @mouseover="wxImg_over(i)"
            @mouseout="wxImg_out(i)"
          ><img :src="item.ico" class="ico" style="width:25px;"><span class="ml5">{{item.name}}</span></span>
          <div class="absolute " v-show="item.wxImg" style="top:20%;left:70%;">
            <img style="width:100px;height:100ox;" :src="item.url">
          </div>
        </li>
        <li class="mb15" v-for="(itm,index) in link">
          <a
            :href="itm.url"
            target="_blank"
            class="flex alcenter"
          ><img  class="ico" :src="itm.ico" style="width:25px;"><span class="ml5">{{itm.name}}</span></a>
        </li>
        <!-- <li class="mb15">
          <a
            
            target="_blank"
            class="flex alcenter"
            
          ><img src="../assets/images/sina_icon.png"><span class="ml5">微博</span></a>
        </li>
        <li class="mb15">
          <span
            class="flex alcenter"
            @mouseover="wxImg = true"
            @mouseout="wxImg = false"
          ><img src="../assets/images/wx_.png"><span class="ml5">微信</span></span>
        </li>
        <li class="mb15">
          <span
             class="flex alcenter"
          ><img src="../assets/images/telegram.png"><span class="ml5">telegram</span></span>
        </li>
        <li class="mb15">
          <a
            
            target="_blank"
             class="flex alcenter"
          ><img src="../assets/images/twitter.png"><span class="ml5">Twitter</span></a>
        </li> -->
      </div>
      <!-- <div class="absolute " v-if="wxImg" style="top:20%;left:70%;">
        <img style="width:100px;height:100ox;" src="../assets/images/wx_ewm.jpg">
      </div> -->
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      img_link:[],
      link:[],
      wxImg:false
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    this.getData();
  },
  methods:{
    noopen(){

    },
    getData(){
      var that = this;
      this.$http({
        url:'/api/news/association'
      }).then(res=>{
          if(res.data.type=='ok'){
            if(res.data.message){
                this.img_link = res.data.message.img_link;
                that.img_link.map(function(item){
                  that.$set(item,'wxImg',false)
                })
                this.link = res.data.message.link;
            }            
          }
      })
    },
    wxImg_over(i){    
           this.img_link[i].wxImg = true;         
       
    },
    wxImg_out(i){
          this.img_link[i].wxImg = false;     
    }
  }
};
</script>

<style lang='scss'>
.foot {
  align-items: flex-start;
  // background: url("../assets/images/bg-footer.png") top center no-repeat;
  background: #111114;
  background-size: 100% 100%;
}
.logos_wrap {
  width: 100%;
  justify-content: center;
}
.logos:last-child {
  margin-right: 0;
}
.logos {
  margin-right: 80px;
}
.foot_ul {
  flex: 1;
  height: 100%;
  padding-left: 10%;
}
.foot_ul li {
  cursor: pointer;
}
.foot_ul li span:hover {
  color: #d45858;
}
.foot_ul li:first-child {
  cursor: inherit;
}
.foot_ul li:first-child:hover {
  color: inherit;
}
// #footer{

//     background: #09162e;
//     color:#aabdbc;
//     font-size: 14px;
//     text-align: center;
//     >div{
//         padding: 20px;
//         span{
//             margin-right: 30px;cursor: pointer;
//             &:hover{color:#d45858}
//         }
//     }
//     p{
//         padding: 10px;
//     }
// }
</style>
