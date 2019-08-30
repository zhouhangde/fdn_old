<template>
  <div class="bgWhite mt45 content">
    <!--轮播图-->
    <div>
      <!-- <el-carousel trigger="click">
      <el-carousel-item>-->
      <img class="w100" src="../assets/images/fdnsearch.png">
      <!-- </el-carousel-item>
      </el-carousel>-->
    </div>

    <div class="plr40">
      <!--热门通证-->
      <div class="pt10">
        <p class="bdb ptb10 ft16 bold cor flex alcenter">
          <img src="../assets/images/hot_pass.png">
          <span class="ml5">{{$t('tpc.hot')}}</span>
        </p>
        <ul class="flex alcenter ptb10 hot_ul">
          <li
            class="flex ptb20 bgWhite plr20 radius8 shadow02 w30 curPer"
            v-for="(item,index) in hotList"
            :key="index"
            v-if="index<3"
            @click="goDetail(item.thisid)"
          >
            <div class="mr10">
              <img class="hot_img" :src="item.logo">
            </div>
            <div>
              <p class="mb10">
                <span class="bold ft18 cor">{{item.title}}</span>
                <span class="ft12 gray ml5">{{item.name}}</span>
              </p>
              <p class="ft14 mb10 ellipsis2">{{item.abstracts}}</p>
              <p>
                <img class="zan" @click.stop="zan(item.thisid)" src="../assets/images/zan.png">
                <span class="ft12 ml5 gray_blue">{{item.like}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <!--全部通证--->
      <div class="ptb10">
        <p class="bdb ptb10 ft16 bold cor flex alcenter">
          <img src="../assets/images/all_pass.png">
          <span class="ml5">{{$t('tpc.all')}}</span>
          <span class="search_box ml10">
              <input class="ft12" type="text" @keyup="search" v-model="searchText" :placeholder="$t('tpc.search')">
              <span class="search_icon" @click="search"><img src="../assets/images/search.png"></span>
          </span>
        </p>
        <ul class="ptb10">
          <li class="flex ptb20 bgWhite plr20 bdb curPer" v-for="(item,index) in allList" :key="index"  @click="goDetail(item.thisid)">
            <div class="mr10">
              <img class="hot_img" :src="item.logo">
            </div>
            <div>
              <p class="mb10">
                <span class="bold ft18 cor">{{item.title}}</span>
                <span class="ft12 gray ml5">{{item.name}}</span>
              </p>
              <p class="ft14 mb10 ellipsis2">{{item.abstracts}}</p>
              <p>
                <span
                  class="ft12 gray_blue mark"
                  :class="{'ml5':i!=0}"
                  v-for="(itm,i) in item.key_word"
                  :key="i"
                >{{itm}}</span>
                <img class="ml25 zan" @click.stop="zan(item.thisid)" src="../assets/images/zan.png">
                <span class="ft12 ml5 gray_blue">{{item.like}}</span>
              </p>
            </div>
          </li>
        </ul>
        <div class="flex center ptb20" v-if="total>0">
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="current" :prev-click="prev" :next-click="next"></el-pagination>
        </div>
        <p class="tc gray_blue ft12 ptb20" v-if="total==0">{{$t('nodata')}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hotList: [],
      allList: [],
      total:'',
      page:0,
      searchText:'',
      token:''
    };
  },
  created() {
    this.token = localStorage.getItem("token") || "";
    this.getHotList();
    this.getList(this.page);
  },
  methods: {
    getList(page) {
        var i = layer.load();
      this.$http({
        url: "/api/currency_token/list",
        method: "get",
        params: { language: this.$i18n.locale,page:page }
      }).then(res => {
          layer.close(i);
        if (res.data.type == "ok") {
          this.allList = res.data.message.data;
          this.total = res.data.message.count;
        }
      });
    },
    //点赞
    zan(id){
       this.$http({
         url:'/api/currency_token/add_like',
         data:{id:id},
         method:'post',
         headers: { Authorization: this.token }
       }).then(res=>{
         layer.msg(res.data.message);
         if(res.data.type == 'ok'){
           $.each(this.allList,function(k,v){
             if(id == v.thisid){
               v.like++;
             }
           })
         }
       })
    },
    //热门通证

    getHotList() {
      this.$http({
        url: "/api/currency_token/heat_list",
        method: "get",
        params: { language: this.$i18n.locale }
      }).then(res => {
        if (res.data.type == "ok") {
          this.hotList = res.data.message.data;
        }
      });
    },
    current(val){
      this.getList(val-1)
    },
    prev(val){
      this.getList(val-1)
    },
    next(val){
      this.getList(val-1)
    },
    //搜索
    search(){
        this.$http({
        url: "/api/currency_token/list",
        method: "get",
        params: { language: this.$i18n.locale,content:this.searchText }
      }).then(res => {
        if (res.data.type == "ok") {
          this.allList = res.data.message.data;
          this.total = res.data.message.count;
        }
      });
    },
    //进入详情
    goDetail(id){
      this.$router.push({path:'/passCardDetail',query:{id:id}})
    }
  }
};
</script>
<style scoped>
.mark {
  background: rgba(126, 144, 190, 0.2);
  padding: 3px 6px;
}
.hot_ul{

}
.hot_ul li {
  margin-right: 40px;
}
.hot_ul li:last-child {
  margin-right: 0;
}
.hot_img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.search_box{
    padding: 4px 12px;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    border-radius: 15px;
}
.search_icon{
    padding-left: 8px;
    border-left: 1px solid #eee;
}
.content{
        min-height: 1050px;
}
.zan{
  cursor: pointer;
}
.shadow02{
  box-shadow: 0 0 8px #eee;
}
</style>

