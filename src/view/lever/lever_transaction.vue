<template>
    <div class="detail">
        <div class="title fColor1 topshadow">
            <div class="inblock">
                <span>{{$t('lever.nowentrust')}}</span>
            </div>
            <div class="inblock fr">
                <!-- <router-link to="/leverAllMsg" class="all">杠杆记录</router-link> -->
                <span class="all" @click="links">{{$t('lever.lvchi')}}</span>
                <!-- <span class="all" @click="all">{{$t('lever.all')}}</span> -->
                <span class="all" @click="recordList">{{$t('lever.tdrecord')}}</span>
            </div>
        </div>
        <div class="content">
            <ul class="list-title fColor2 ft12 clear">
                <li class="fl w12">{{$t('time')}}</li>
                <li class="fl w12">{{$t('price')}}</li>
                <li class="fl w8">{{$t('home.volume')}}</li>
            </ul>
            <div class="containers scroll" v-if="deList.length>0">
                <ul v-for="(itm,index) in deList" :key="index" class="list-item fColor1 ft12">
                    <li class="clear">
                        <span class="fl w12">{{itm.time}}</span>
                        <span class="fl w12">{{itm.price | tofixedFour}}</span>
                        <span class="fl w8">{{itm.number | tofixed}}</span>
                    </li>
                </ul>
            </div>
            <div class="no_data tc" v-if="deList.length<=0">
                <img src="../../assets/images/nodata.png" alt="">
                <p class="fColor2 ft18">{{$t('nodata')}}</p>   
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"detail",
    data (){
        return{
            address:'',
            isChoosed:2,
            new:false,
            wayList:["买入","卖出","全部"],
            deList:[],
            legal_id:'',
            currency_id:''
        }
    },
    filters: {
    tofixed: function(val) {
      val = Number(val);
      return val.toFixed(2);
    },
    tofixedFour: function(val) {
      val = Number(val);
      return val.toFixed(4);
    },
  },
    created(){

        var leverTradeDataMy = window.localStorage.getItem("leverTradeData_my");
        if(leverTradeDataMy!=''&& leverTradeDataMy!=undefined && leverTradeDataMy!=null){
                var localData = JSON.parse(window.localStorage.getItem("leverTradeData_my"));
                this.currency_id = localData.currency_id;
                this.legal_id = localData.legal_id;
        }else{
            if (window.localStorage.getItem("leverTradeData")) {
                var localData = JSON.parse(window.localStorage.getItem("leverTradeData"));
                this.currency_id = localData.currency_id;
                this.legal_id = localData.legal_id;
            }
        }

        this.address = localStorage.getItem('address') || '';
        // this.legal_id=localStorage.getItem('legal_id');
        // this.currency_id=localStorage.getItem('currency_id');


        var that = this;
        that.complete(this.legal_id,this.currency_id);
        eventBus.$on('to_leverExchange',function(data){
            if(data){
                // that.complete(localStorage.getItem('legal_id'),localStorage.getItem('currency_id'));
                that.complete(that.legal_id, that.currency_id);
            }
        })
    },
    methods:{
        wayChoosed(index){
            this.isChoosed=index;
        },
         //我的交易记录
        complete(legals_id,currencys_id){
            this.$http({
                        url: '/api/'+'transaction/deal_info',
                        method:'post',
                        data:{
                            legal_id:legals_id,
                            currency_id:currencys_id
                        },  
                        headers: {'Authorization':  localStorage.getItem('token')},
                    }).then(res=>{
                        // layer.close(i);
                        if(res.data.type == "ok"){
                           this.deList = res.data.message.complete;
                        //    this.connect();
                        }else{
                            // layer.msg(res.data.message)
                        }
                    }).catch(error=>{
                        // //console.log(error)
                    })
        },
        all(){
            this.$router.push({name:'allTransaction'})
        },
        // 杠杆持仓
        links(){
            this.$router.push({name:'leverTransactions'})
        },
        // 跳转交易记录
        recordList(){
           this.$router.push({name:'leverList'}) 
        }

      },
    mounted(){
        var that = this;
        
        eventBus.$on('buyTrade', function (data) {
            // that.connect();
        });
       
    }

    
}
</script>
<style scoped>
.red{
    color: #cc4951;
    cursor: pointer;
}
.title{height: 48px;line-height: 46px;padding: 0 40px 0 30px;background-color: #fff;}
.tab_title{display: inline-block;line-height: 46px;height: 46px;}
.tab_title span{cursor: pointer;}
.tab_title span:not(:last-child) {margin-right: 40px;}
.content{padding: 0 40px 0 30px;height: 330px;}
.list-title{line-height: 40px; border-bottom: 1px solid #ccc;height: 40px;}
.list-title li{
    width: 33.3%;
    text-align: center;
}
.no_data{padding: 50px 0;}
.containers{height: 260px;overflow: auto;}
.list-item li{line-height: 45px; display: flex;}
.list-item li span{display: block; float: left; width: 33.3%;text-align: center;}

.list-item li:hover{background-color: rgba(46,55,83,.4)}
.list-item li span.green{color: #12b886}
.all{
    cursor: pointer;
    color: #7a98f7;
    margin-left: 10px;
}
</style>


