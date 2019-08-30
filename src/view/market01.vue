<template>
    <div class="market clr-part">
		<div class="m_title  flex" style="padding:20px 0 ">
            <span style="width:60px">{{$t('market.market')}}</span>
            <!-- <el-input v-model="keyword" size="mini" clearable :placeholder="$t('inpCur')" @keyup.native="searchs" @clear="clear"></el-input> -->
            <!--搜索-->
            <el-select v-model="value" size="small" filterable @change="change" placeholder="请输入搜索币种">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
        </div>
        <div class="m_filter">
            <div class="tabtitle ft14 curPer flex around">
                <span v-for="(tab,index) in tabList" :key="index" :class="['bdr-part',{'active':((index == isShow)&&!showAdd)}]" @click="changeType(index,tab.name,tab.area_id)">{{tab.name}}</span>
                <span @click="showAdd=true" :class="['bdr-part',{'active': showAdd}]">{{$t('home.myMarkets')}}</span>
            </div>
        </div>
        <div v-if="!issearch">
        <div v-if="!showAdd">
        <ul class="flex between">
          <li class="flex between legal w100" v-for="(item,i) in marketList" :key="i" v-if="i == areaIndex"><span  v-for="(it,m) in item" :key="m" :class="{'legal_active':m == legalIndex}"  @click="shiftLegal(m)">{{it.name}}</span></li>
          </ul>
        <div class="coin-title clear clr-part">
            <div>
                <div class="flex tc" @click="arrSort('at')">
                  <span>{{$t('market.currency')}}</span>
                  <div class="down-up">
                    <div :class="['el-icon-caret-top curPer',{bold:sortKey == 'at'&&directions == 'up'}]" @click="directions = 'up';arrSort('at','up')"></div>
                    <div :class="['el-icon-caret-bottom curPer',{bold:sortKey == 'at'&&directions == 'down'}]" @click="directions = 'down';arrSort('at','down')"></div>
                  </div>
                </div>
            </div>
            <div>
                <div class="flex tc" @click="arrSort('now_price')">
                  <span>{{$t('market.lastprice')}}</span>
                  <div class="down-up">
                    <div :class="['el-icon-caret-top curPer',{bold:sortKey == 'now_price'&&directions == 'up'}]" @click="directions = 'up';arrSort('now_price','up')"></div>
                    <div :class="['el-icon-caret-bottom curPer',{bold:sortKey == 'now_price'&&directions == 'down'}]" @click="directions = 'down';arrSort('now_price','down')"></div>
                  </div>
                </div>
            </div>
            <div>
                 <div class="flex tc" @click="arrSort('change')">
                   <span>{{$t('market.change')}}</span>
                   <div class="down-up">
                     <div :class="['el-icon-caret-top curPer',{bold:sortKey == 'change'&&directions == 'up'}]" @click="directions = 'up';arrSort('change')"></div>
                     <div :class="['el-icon-caret-bottom curPer',{bold:sortKey == 'change'&&directions == 'down'}]" @click="directions = 'down';arrSort('change')"></div>
                   </div>
                 </div>
            </div>
        </div>
        <ul class="coin-wrap scroll">
          <li v-for="(market,index) in tabList " :key="index" v-if="index==areaIndex">
            <div v-for="(itms,idx) in market.data"  v-if="idx == legalIndex">
                <p v-for="(itm,j) in itms.array" :key="j"   :class="{'bg-hov':true,'bg-even':j%2 !=0,'bg-sel':(j===ids)||(currency_index==itm.currency_name&&legal_index==itm.legal_name)}" :data-id='itm.id' :data-index='idx' @click="quota_shift(idx,itm.currency_id,itm.legal_id,itm.currency_name,itm.legal_name,itm,index,market,itm.now_price,itm.change,itm.volume,$event,j,itm.now_cny_price)">
              <span class="w36"><img :src="itm.logo" alt="" v-if="false"><i><em class="deep_blue bold">{{itm.currency_name}}</em><em class="light_blue bold">/{{itm.legal_name}}</em></i></span>
              <span class="w30 tr deep_blue bold nowPrice" :data-name='itm.currency_id+"/"+itm.legal_id'>{{itm.now_price || 0}}</span>
              <span :class="{'green':itm.change>=0,'red':itm.change<0}" class="bold">{{(itm.change>0?'+':'')+(itm.change-0).toFixed(2)}}%</span>
              <span class="  el-icon-star-on star" v-if="itm.added" @click="addDelete('user_delete',itm.thisid)" ></span>
                <span class="  el-icon-star-off star" v-if="!itm.added"  @click="addDelete('user_add',itm.thisid)"></span>
                </p>
            </div>
          </li>
        </ul>
        </div>
        <!--自选-->
          <ul  v-if="showAdd">
            <li>
              <div>
                 <p v-for="(itm,j) in myAdd " :key="j" class="ft12" style="line-height:30px;" :class="{'bg-even':j%2 !=0}">
                   <span class="w30 inblock"><i><em class="deep_blue bold">{{itm.currency_name}}</em><em class="light_blue bold">/{{itm.legal_name}}</em></i></span>
                   <span class="w30 inblock tc deep_blue bold nowPrice">{{itm.now_price || 0}}</span>
                   <span :class="{'green':(itm.change-0)>=0,'red':(itm.change-0)<0}" class="bold w30 inblock tl">{{((itm.change-0)>0?'+':'')+(itm.change-0).toFixed(2)}}%</span>
                   <span class="curPer  el-icon-star-on star" style="color:#ff6e42;" @click.stop="addDelete('user_delete',itm.thisid)" ></span>
                 </p>
              </div>
            </li>
          </ul>
          </div>
	</div>
</template>

<script>
export default {
  name: "market",
  data() {
    return {
      ids: 0,
      isShow:0,
      tabList: [],
      marketList: [],
      newData: ["HQ", "$0.076128", "-1.11%"],
      legal_index: "",
      currency_index: "",
      tradeDatas: "",
      exName: "",
      currency_name: "",
      legal_name: "",
      directions:'',
      sortKey:'none',
      myAdd:[],
      token:'',
      nowLegal:'',
      showAdd:false,
      keyword:'',
      area:[], //行情主板区
      areaIndex:0, //默认第一个主流区
      legalIndex:0,
      currencyIndex:0,
      m_list:[],
      issearch:false,
      options:[],
      value:''
    };
  },
  created: function() {
    this.getcoinlist();
    // this.init();
    // this.getList()
    this.token = localStorage.getItem("token") || "";
    //法币列表
    if(this.token){
      this.getMyAdd()
    } else {
      this.getList()
    }
    
  },
  mounted() {
    var that = this;
    setTimeout(()=>{
      that.connect();
    },800)
  },
  methods: {
    //法币切换
    shiftLegal(m){
       this.legalIndex = m;
    },
    search(name){     
      var l = this.keyword.length;
      if(l){
        if(l>name.length){
          return false;
        } else {
          if(name.slice(0,l) == this.keyword.toUpperCase()){
            return true;
          } else {
            return false;
          }
        }
      } else {
        return true;
      }
      
    },
    //获取搜索币种列表
    getcoinlist(){
       this.$http({
         url:'/api/currency/for_search'
       }).then(res=>{
         if(res.data.type == 'ok'){
            this.options = res.data.message.array;
         }
       })
    },
    //
    change(val){
        //console.log(val,this.value);
        var coins = val.split('/');
        var currency_name = coins[0]; //币种名
        var legal_name = coins[1];  //法币名
        this.legal_index = legal_name;
        this.currency_index = currency_name;
    },
    //搜索币种
    searchs(){
      var l = this.keyword.length;
      if(l>0){
         this.issearch = true;
      }else{
        this.issearch = false;
      }
      
    },
    //清空搜索
    clear(){
       this.issearch = false;
    },
    testItem(name,added){
      
      if(this.showAdd){
        return added
      } else {
        return name == this.nowLegal
      }
    },
    getMyAdd(){
      if(this.token){

          this.$http({
          url:'/api/match/my_match',
          params:{
            type:'change'
          }, 
          headers: { Authorization: this.token}
        }).then(res => {
          if(res.data.type == 'ok'){
            var list = res.data.message;
              this.myAdd = list;
              
              this.getList();
          }
        })
      } else {
        layer.msg('请先登录')
      }
    },
    addDelete(url,id){
      if(this.token){

          this.$http({
          url:'/api/match/'+url,
          method:'post',
          data:{id:id},
          headers: { Authorization: this.token}
        }).then(res => {
          layer.msg(res.data.message);
          this.getMyAdd()
        })
      } else {
        if(this.$i18n.locale == 'zh'){

          layer.msg('请先登录')
        } else {
          layer.msg('Please sign in')
        }
      }
    },
    //交易对行情
    getList(){
      var load = layer.load();
      this.$http({
      url: "/api/" + "currency/change_match",
      method: "get",
      data: {}
    }).then(res => {
      layer.close(load);
      // //console.log(res);
      if (res.data.type == "ok") {
        this.tabList = res.data.message;
        var msg = res.data.message;
        // var msgArr = [];
        // $.each(msg,function(k,v){
        //   if(k==0){
        //      $.each(v.data,function(m,n){
        //       msgArr.push({area_id:v.area_id,legal_id:n.legal_id,array:n.array})
        //   })
        //   }
          
        // });
        // //console.log(msgArr)
        // //console.log(msg[0].data[0].array)
        // if(this.myAdd.length){
        //     msg.forEach((item,index) => {
        //       this.myAdd.forEach((ite,ind) => {
        //         if(item.legal_id == ite.legal_id){
        //           item.array.find((c) => {
        //             return c.currency_id == ite.currency_id;
        //           }).added = true
        //         }
        //       })
        //     })
        //   }
        var arr_quota = [];
        for (var i = 0; i < msg.length; i++) {
          arr_quota[i] = msg[i].data; //法币列表
        }
        $.each(arr_quota,function(k,v){
          
        })
        this.marketList = arr_quota;
        //console.log(arr_quota)
        //console.log(this.marketList);
        // this.$store.state.priceScale = Math.pow(
        //   10,
        //   this.marketList[0][0].now_price
        //     ? this.marketList[0][0].now_price.length
        //     : 0
        // );
        if (this.exName == "") {
          this.exName = this.tabList[0].name;
        }
        this.currency_name = msg[0].name;
        // this.nowLegal = msg[0].name;
        this.$store.state.priceScale = 100000;
//console.log(window.localStorage.getItem("tradeData"),'yyyyyyyyyyyyyyyyyyyyyyyyyy')
        //默认法币id和name和行情交易对
        if (!window.localStorage.getItem("tradeData")) {
          this.$store.state.symbol =
            arr_quota[0][0].currency_name + "/" + arr_quota[0][0].legal_name;
          var legal_id = arr_quota[0][0].array[0].legal_id;
          var currency_id = arr_quota[0][0].array[0].currency_id;
          var legal_name = arr_quota[0][0].array[0].legal_name;
          this.nowLegal = arr_quota[0][0].array[0].legal_name;
          var currency_name = arr_quota[0][0].array[0].currency_name;
           var now_price = arr_quota[0][0].array[0].now_price;
           var now_cny_price = arr_quota[0][0].array[0].now_cny_price;
           
           
        this.currency_name = currency_name;
        this.legal_name = legal_name;
          var tradeDatas = {
            currency_id: currency_id,
            legal_id: legal_id,
            currency_name: currency_name,
            legal_name: legal_name,
            now_price:now_price,
            now_cny_price:now_cny_price
          };
        } else {
          var localData = JSON.parse(window.localStorage.getItem("tradeData"));
          this.currency_name = localData.currency_name;
        this.legal_name = localData.legal_name;
          this.$store.state.symbol =
            localData.currency_name + "/" + localData.legal_name;
            this.nowLegal = localData.legal_name;
          var tradeDatas = {
            currency_id: localData.currency_id,
            legal_id: localData.legal_id,
            currency_name: localData.currency_name,
            legal_name: localData.legal_name,
             now_price:arr_quota[0][0].array[0].now_price,
             now_cny_price:arr_quota[0][0].array[0].now_cny_price
          };
          this.ids = "a";
          // this.isShow = localData.isShow;
          this.legal_index = localData.legal_name;
          this.currency_index = localData.currency_name;
        }

        //组件间传值
        setTimeout(() => {
          eventBus.$emit("toTrade0", tradeDatas);
        }, 1000);
        setTimeout(() => {
          eventBus.$emit("toExchange0", tradeDatas);
        }, 1000);
        // socket连接
        this.connect();
      }
    }).catch(res=>{
       layer.close(load);
         //console.log(res)
    });
    },
    arrSort(k,d){
      //console.log(d);
      d = this.directions;
      
      this.sortKey = k;
      this.tabList[this.isShow].data[this.legalIndex].array.sort(function(a,b){
        if(k == 'at'){
          if(d == 'up'){

            return a.currency_name.charCodeAt() - b.currency_name.charCodeAt()
          } else {
            return b.currency_name.charCodeAt() - a.currency_name.charCodeAt()

          }
          
        } else {
          if(d == 'up'){

            return a[k] - b[k];
          } else {
            return b[k] - a[k];
          }
          
        }
      })
      
    },
    // socket封装
    connect() {
      var that = this;
      var localData = JSON.parse(window.localStorage.getItem("tradeData"));
      //console.log("socket");
        // 打开一个 web socket
        var ws = new WebSocket("wss://ws.bitfdn.com/ws");
        
        ws.onopen = function()
        {
          // Web Socket 已连接上，使用 send() 方法发送数据
          var sendData={socket_type:'daymarket',subscribed:1}
	    	  sendData = JSON.stringify(sendData)
          ws.send(sendData);
        };
        
        ws.onmessage = function (evt) 
        { 
          var msg = JSON.parse(evt.data);
          if (msg.type == "daymarket") {
          // //console.log(msg,localData.currency_name,localData.legal_name);
           if(that.currency_name == msg.currency_name && that.legal_name == msg.legal_name){   //当前交易对行情存储本地
               eventBus.$emit('change',msg.change);  //实时向tv组件传递折合cny
               eventBus.$emit('now_cny_price',msg.now_cny_price)   
              }
           $.each(that.tabList,function(k,v){   //行情实时推送赋值
             $.each(v.data,function(m,n){
               $.each(n.array,function(i,j){
                 if(j.currency_id == msg.currency_id && j.legal_id == msg.legal_id){
                     j.now_price = msg.now_price;
                     j.change = msg.change;
                     
                 }
                   
           })
           })
           })


          var lists = that.marketList;
          // //console.log(lists.length);
          that.marketList.forEach(function(item,index){
            var i = item.findIndex(function(ite,inde){
              return ite.currency_id == msg.currency_id&&ite.legal_id == msg.legal_id;
            })
            if(i != -1){
              item[i].now_price = msg.now_price;
              item[i].change = (msg.change-0).toFixed(2);
            }
          })
          

          // var cname = msg.currency_id + "/" + msg.legal_id;
          // var newprice = msg.now_price;
          // var newup = (msg.change-0).toFixed(2);
          // // //console.log(cname)
          // if (newup < 0) {
          //   newup = newup + "%";
          //   $("span[data-name='" + cname + "']")
          //     .next()
          //     .css("color", "#ff6e42");
          // } else {
          //   newup = '+'+newup + "%";
          //   $("span[data-name='" + cname + "']")
          //     .next()
          //     .css("color", "#459e80");
          // }
          // $("span[data-name='" + cname + "']")
          //   .html(newprice)
          //   .next()
          //   .html(newup);
        }
        }
        
      // });
    },
    changePair(list, index, market) {
      //console.log(list);
      //console.log(typeof list.now_price);
      if (list.now_price != null) {
        let arr = list.now_price.split(".")[1];
        this.$store.state.priceScale = Math.pow(10, arr.length); //根据最新价小数点后几位改变价格精度
        this.$store.state.symbol = list.name + "/" + this.exName; //交易对
      }

      //	this.$store.state.symbol=list.name+'/'+this.exName
    },
    changeType(index, legal_name, currency_id) {
      this.areaIndex = index;
      this.nowLegal = legal_name;
      this.showAdd = false;
      this.directions = '';
      this.sortKey = '';
      this.isShow = index;
      // this.legal_index='';
      this.ids = "a";
      this.exName = legal_name;
      this.legal_name = legal_name;
      this.currency_id = currency_id;
      //    //console.log(this.currency_name);
      //console.log(this.currency_id);
    },
    getSymbols(callback) {
      if (this.address.length <= 0) {
        return false;
      }
      this.$http({
        url: "/api/" + "wallet/list?user_id=" + this.address || "",
        type: "GET"
      })
        .then(res => {
          // //console.log(res)
          if (res.data.type == "ok") {
            this.accountInfo = res.data.message;
            this.dataList = res.data.message.list;
            // //console.log(this.dataList)
            callback && callback();
          } else {
            // //console.log(123)
            // alert(res.message)
          }
        })
        .catch(error => {
          return error;
        });
    },
    init() {
      // var index=layer.load();
      this.address = localStorage.getItem("address") || "";
      this.$http({
        url: "/api/" + "quotation",
        method: "post",
        data: {
          address: this.address
        }
      })
        .then(res => {
          // layer.close(index);
          // //console.log(res)
          if (res.data.type == "ok") {
            this.getSymbols(() => {
              this.marketList = res.data.message.coin_list;
              //console.log(this.marketList);
              for (var i in this.dataList) {
                for (var j in this.marketList) {
                  // //console.log(this.dataList[i].name,this.marketList[j].symbol,this.dataList[i].name==this.marketList[j].symbol)

                  if (this.dataList[i].name == this.marketList[j].symbol) {
                    // //console.log(1)
                    this.marketList[j].type = this.marketList[j].type || 1;
                  } else {
                    this.marketList[j].type = this.marketList[j].type || 0;
                  }
                }
              }
              // //console.log(this.marketList)
            });
          } else {
            // layer.msg(res.data.message)
          }
        })
        .catch(error => {
          //console.log(error);
        });
    },
    //币种切换

    quota_shift(
      idx,
      currency_id,
      legal_id,
      currency_name,
      legal_name,
      list,
      index,
      market,
      now_price,
       change,
       volume,
      event,
      j,
      now_cny_price
     
    ) {
      //console.log(now_cny_price)
      this.legal_name = legal_name;
      this.currency_name = currency_name;
      var datas = {
        c_id:currency_id,
        l_id:legal_id
      }
      eventBus.$emit('change01',datas);
      eventBus.$emit('currency_name',currency_name);
      eventBus.$emit('now_cny_price01',now_cny_price)  //切换币种时向tv组件传递折合cny
      //console.log(legal_id)
      //console.log($('.coin-wrap').children().eq(index).children().eq(idx).children().eq(1).find('.nowPrice').text());
      $('.coin-wrap').children().eq(index).children().eq(idx).children().eq(1).text();
      // idx,currency_id,legal_id,currency_name,legal_name,list,index,market
      //console.log(market);
      // this.ids = idx;
      this.ids = j;
      this.legal_index = "";
      this.currency_index = "";
      if (list.now_price == null || list.now_price == "0") {
        list.now_price = "0.0";
      }
      //console.log(list);
      var len = list.now_price.split('.').length;
      if(len<=1){
        list.now_price = list.now_price + '.0'
      }
      let arr = (list.now_price + "").split(".")[1];
      //console.log(arr);
      
      this.$store.state.priceScale = Math.pow(10, arr.length); //根据最新价小数点后几位改变价格精度
      this.$store.state.symbol = currency_name + "/" + legal_name; //交易对
      //console.log( this.$store.state.symbol);
      var tradeDatas = {
        currency_id: currency_id,
        legal_id: legal_id,
        currency_name: currency_name,
        legal_name: legal_name,
        isShow: this.isShow,
        now_price:now_price,
        change:change,
        volume:volume,
        now_cny_price:now_cny_price
      };
      //console.log(tradeDatas)
      //console.log($('.coin-wrap').children().eq(index).children().eq(idx).children().eq(1).find('.nowPrice').text());
      var sco_price = $('.coin-wrap').children().eq(index).children().eq(idx).children().eq(1).find('.nowPrice').text()
      //console.log('ddddddddddd',now_price)
      //向exchange组件传最新价
      // eventBus.$emit("toexchangeNowprice",sco_price);
      eventBus.$emit("toexchangeNowprice",now_price);
      //向兄弟组件传数据
      eventBus.$emit("toTrade", tradeDatas);
      eventBus.$emit("toExchange", tradeDatas);
      // 存本地
      //console.log(tradeDatas)
      window.localStorage.setItem("tradeData", JSON.stringify(tradeDatas));
      // location.reload();
    }
  }
};
</script>

<style scoped sass>
.green{
  color: #459e80;
}
.coin-wrap li span.star{
  width:10%;line-height:30px;font-size: 14px;
}
.m_title {
  line-height: 30px;
  padding: 0 20px;
  position: relative;
}
.m_search input {
  border-radius: 3px;
  background: transparent;
  border: 1px solid #52688c;
  line-height: 25px;
}
/* .m_search{position: absolute;width: 146px;right: 20px;top: -4px;height: 26px;border-radius: 3px;padding: 4px 8px 4px 0;} */
/* .m_search input{position: absolute;left: 0;top: 10px;z-index: 2;width: 100%;padding: 5px 40px 5px 8px;height: 26px;border-radius: 3px;background: transparent;border: 1px solid #52688c;} */
.m_search img {
  width: 16px;
  height: 15px;
  position: absolute;
  right: 35px;
  top: 20px;
  z-index: 123;
}
.m_filter {
  padding: 10px 0 15px;
}
.tabtitle {
  padding: 0 14px;
}
.tabtitle span {
  flex: 1;
  text-align: center;
  padding: 3px 10px;
  border-bottom: 1px solid #ccc;
}
.tabtitle .active {
  border: 1px solid #ccc;
  border-bottom: none;
}
.coin-title .flex{
  justify-content: center;
}
.coin-title>div {
  width: 30%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  float: left;
  font-size: 12px;
}
.down-up{
  padding-top: 4px;
  font-size: 14px;
}
.down-up div{
  color: #ccc;
  display: block;
}
.down-up .bold{
  font-weight: bold;
  color: #000;
}
.line {
  width: 90%;
  margin: 0px auto;
  border-bottom: 1px solid rgb(48, 59, 75);
}
.coin-wrap {
  height: 715px;
  overflow-y: auto;
}
.coin-wrap li p:nth-child(even) {
  /* background: #f8f8f8; */
}
.coin-wrap li p:hover {
  /* background: #eee; */
}
.coin-wrap li {
  /* height: 30px; */
  line-height: 30px;
  cursor: pointer;
  font-size: 12px;
}
.coin-wrap li span {
  display: inline-block;
  width: 30%;
  float: left;
  text-align: center;
  height: 30px;
}
.coin-wrap li span.w36 {
  /* width: 30%; */
}
.coin-wrap li span.w36 i {
  padding-left: 5px;
}
.coin-wrap li span.w30 {
  width: 30%;
  text-align: center;
}
.coin-wrap li span:first-child {
  /* padding-left: 18px; */
  text-align: left;
  /* display: flex; */
}
.coin-wrap li span:first-child img {
  margin-right: 2px;
  width: 16px;
  vertical-align: sub;
}
.coin-wrap li span:first-child i {
  font-style: normal;
  display: inline-block;
  min-width: 40px;
}
.coin-wrap li span:last-child {
  color: #ff6e42;
}
/* .coin-wrap li:nth-child(odd){background-color: #181b2a;} */
.coin-wrap li span.green {
  color: #459e80;
}
.coin-wrap li p {
  overflow: hidden;
}
.legal{
  padding: 0 14px;
}
.active_p {
  /* background-color: #2b3648; */
}
.legal span{
  cursor: pointer;
  color: #5d5d5d;
}
.legal_active{
  color: #332C58!important;
  font-weight: bold;
  border-bottom: 2px solid #332C58;
}

/* .coin-wrap li p:hover{background-color: #2b3648;} */
</style>
