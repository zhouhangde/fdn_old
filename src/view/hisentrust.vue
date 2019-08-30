<template>
    <div class="entrust pt30">
        <!-- <div class="title topshadow">
            <div class="tab_title color">
                <span>历史委托</span>
            </div>
            <div class="tab_title fr ft12">
                <span v-for="(way,index) in wayList" :class="{'active': index == isChoosed}" @click="wayChoose(index,way.type)">{{way.title}}</span>
            </div>
        </div> -->
        <div class="search_box flex alcenter">
            <span class="ft14 mr10">{{$t('timescreen')}}：</span>
            <el-date-picker
                v-model="timeArr"
                type="datetimerange"
                size="mini"
                @change="changeTime"
                :range-separator="$t('to')"
                :start-placeholder="$t('startdate')"
                :end-placeholder="$t('overdate')">
            </el-date-picker>
            <span class="ft14 mr10 ml10">{{$t('dealscreen')}}：</span>
            <el-select v-model="cur" size="mini" @change="change_cur" :placeholder="$t('shop.pchoose')">
                 <el-option :label="$t('center.all')" value=""></el-option>
                <el-option
                v-for="(item,i) in cur_legal"
                :key="i"
                :label="item.name"
                :value="item.currency_id+'/'+item.legal_id">
                </el-option>
            </el-select>
            <span class="ft14 mr10 ml10">{{$t('dirscreen')}}：</span>
            <el-select v-model="way" size="mini" @change="changeWay" :placeholder="$t('shop.pchoose')">
                 <el-option :label="$t('center.all')" value=""></el-option>
                <el-option
                v-for="item in direction"
                :key="item.way"
                :label="item.name"
                :value="item.way">
                </el-option>
            </el-select>
        </div>
        <div class="content">
            <ul class="list-title color ft12 clear">
                <li class="fl w18">{{$t('time')}}</li>
                <li class="fl w10">{{$t('center.pairs')}}</li>
                <li class="fl w8">{{$t('center.direction')}}</li>
                <li class="fl w8">{{$t('number')}}</li>
                <li class="fl w10">{{$t('price')}}</li>
                <li class="fl w8">{{$t('center.dealtotal')}}</li>
                <li class="fl w10">{{$t('center.tprice')}}</li>
                <li class="fl w10">{{$t('status')}}</li>
                <li class="fl w15 tr">{{$t('rate')}}</li>
                
            </ul>
            <div class="containers scroll" v-if="comList.length>0">
                <ul class="list-item color ft12">
                    <li v-for="item in comList" class="clear">
                        <span class="fl w18">{{item.create_time}}</span>
                        <span class="fl w10">{{item.currency_name}}/{{item.legal_name}}</span>
                        <span class="fl w8" :class="{'green':item.way == $t('center.inbuy'),'redColor':item.way == $t('center.outsell')}">{{item.way}}</span>
                        <span class="fl w8">{{item.number}}</span>
                        <span class="fl w10">{{item.price}}</span>
                        <span class="fl w8">{{(item.price * item.number) | numFilter}}</span>
                        <span class="fl w10">{{item.price}}</span>
                        <span class="fl w10">{{$t('dealed')}}</span>
                        <span class="fl w15 tr">{{item.fee}}</span>
                        <!-- <span class="fl w15" v-if="item.type == 'in'">{{item.buyFee||$t('center.nothing')}}</span>
                        <span class="fl w15" v-if="item.type == 'out'">{{item.sellFee||$t('center.nothing')}}</span>
                        <span class="fl w15" v-if="item.type == 'in/out'">{{item.fee||$t('center.nothing')}}</span> -->
                        <!-- <span class="fl w8 tr" :class="item.type=='out'?'redColor':''">{{item.type=='in'?'买入':'卖出'}}</span> -->
                        <!-- <span class="fl w8 tr green" v-if="item.type == 'in'">{{$t('center.inbuy')}}</span>
                        <span class="fl w8 tr redColor" v-if="item.type == 'out'">{{$t('center.outsell')}}</span>
                        <span class="fl w8 tr" v-if="item.type == 'in/out'">买入、卖出</span> -->
                    </li>
                </ul>
                <div class="getmore tc gray9 ft14 mt10 curPer pdb20" @click="getMore" v-if="!loading && comList.length>8">{{more}}</div>
                <div class="tc pdb20" v-if="loading">
                    <img src="@/assets/images/loading.gif" alt=""  class="lodw20">
                    <p class="ft12 gray9">{{$t('loading')}}...</p>
                </div>
            </div>
            <div class="no_data tc" v-if="comList.length<=0 && !loading">
                <img src="@/assets/images/nodata.png" alt="">
                <p class="gray9 ft18">{{$t('nodata')}}</p> 
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:"hisentrust",
    data (){
        return{
            address:'',
            isChoosed:0,
            isUrl:0,
            page:0,
            url:"transaction_in",
            type:1,
            more:this.$t('more'),
            loading:false,
            wayList:[{title:this.$t('center.inbuy'),type:1},{title:this.$t('center.outsell'),type:2},{title:this.$t('center.all'),type:0}],
            comList:[],
            timeArr:[], //筛选时间段
            cur_legal:[], //筛选交易对
            direction:[{way:'in',name:this.$t('center.inbuy')},{way:'out',name:this.$t('center.outsell')}],
            way:'',
            cur:'',//筛选的交易对
            type:0,
            startTime:'',
            endTime:'',
            ways:'',
            c_id:'',
            l_id:''
        }
    },
    created(){
        this.token = localStorage.getItem('token') || '';
        this.getCurrencyList();
    },
    wacth(){
        eventBus.$on('buyTrade', function (data) {
            ////console.log(data);
            if(data){
                that.getData();
            }
        });
    },
    methods:{
        //获取交易对列表
        getCurrencyList(){
           this.$http({
               url:'/api/currency/currency_legal_list',
                headers: {'Authorization':  this.token}
           }).then(res=>{
               if(res.data.type == 'ok'){
                   this.cur_legal = res.data.message;
               }
           })
        },
        // 类型切换
        wayChoose(index,url){
            var that=this;
            //console.log(url)
            that.comList='';
            that.page=1;
            that.url = url;
            //console.log(that.url)
            if(url==1){
                that.type=1;
            }else if(url==2){
                that.type=2;
            }else if(url==0){
                that.type=0;
            }
            that.more=this.$t('more');
            that.isChoosed=index;
            that.getData();
        },
        // 加载更多
        getMore(){
            this.page++;
            if(this.type == 0){
               this.getData({page:this.page});
            };
            if(this.type == 1){
               var data = {page:this.page,start_time:this.startTime,end_time:this.endTime,way:this.ways,currency_id:this.c_id,legal_id:this.l_id}
               this.getData(data);
            }
            if(this.type == 2){
                var data = {page:this.page,way:this.ways,start_time:this.startTime,end_time:this.endTime,currency_id:this.c_id,legal_id:this.l_id};
                this.getData(data)
            };
            if(this.type == 3){
                var data = {page:this.page,currency_id:this.c_id,legal_id:this.l_id,way:this.ways,start_time:this.startTime,end_time:this.endTime};
                this.getData(data)
            }
        },
        getData(data){
            var that = this;
            var page = that.page;
            that.loading = true;
            this.$http({
                url: '/api/' + 'transaction/my_history_list',
                method:'post',
                data:data,
                headers: {'Authorization':  that.token}
            }).then(res=>{
                // //console.log(res)
                that.loading=false;
                if(res.data.type == 'ok'){
                        // //console.log(res.data.message.list)
                        var list=res.data.message.data;
                        if(that.page==0){
                            that.comList=list;
                             that.more=that.$t('more');
                        }else{
                            if(list.length<=0){
                                    that.more=that.$t('td.nomore');
                                    return;
                                }else{
                                     that.more=that.$t('more');
                                    that.comList=that.comList.concat(list)
                                }
                            }
                    }else{
                        layer.msg(res.message);
                }
            }).catch(error=>{
                //console.log(error)
        })
      },
      //筛选时间
      changeTime(val){
         //console.log(val);
        if(val){
             this.type = 1; //时间筛选状态下
            var startTime = val[0].getTime();
            var endTime = val[1].getTime();

            function add0(m){return m<10?'0'+m:m } //时间戳转时间
            function format(shijianchuo)
            {
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
            }
            
            this.startTime = format(startTime);
            this.endTime = format(endTime);
            //console.log(this.startTime,this.endTime)
            this.page = 0;
            var data = {page:this.page,start_time:this.startTime,end_time:this.endTime};
            if(this.ways){
                data.way = this.ways
            };
            if(this.c_id&&this.l_id){
                data.currency_id = this.c_id;
                data.legal_id = this.l_id;
            }
            this.getData(data);
         }else{
             this.startTime = '';
             this.endTime = '';
             this.page = 0;
             var data = {page:this.page}
             if(this.ways){
                data.way = this.ways
            };
            if(this.c_id&&this.l_id){
                data.currency_id = this.c_id;
                data.legal_id = this.l_id;
            }
             this.getData(data);
         }
      },
      //根据方向筛选
      changeWay(val){
         //console.log(val);
         if(val){
           this.type = 2; //方向筛选状态下
           this.ways = val;
           this.page = 0;
            var data = {page:this.page,way:val}
            if(this.startTime&&this.endTime){
                data.start_time = this.startTime;
                data.end_time = this.endTime;
            };
            if(this.c_id&&this.l_id){
                data.currency_id = this.c_id;
                data.legal_id = this.l_id;
            }
            this.getData(data);
         }else{
             this.ways = '';
             this.page = 0;
             var data = {page:this.page}
             if(this.startTime&&this.endTime){
                data.start_time = this.startTime;
                data.end_time = this.endTime;
            };
            if(this.c_id&&this.l_id){
                data.currency_id = this.c_id;
                data.legal_id = this.l_id;
            }
             this.getData(data);
         }
      },
      //根据交易对筛选
      change_cur(val){
         //console.log(val);
         if(val){
           this.type = 3; //交易对筛选状态下
           var arr = [];
            arr = val.split('/');
            var currency_id = parseInt(arr[0]); //币种id
            var legal_id = parseInt(arr[1]);   //法币id
            this.c_id = currency_id;
            this.l_id = legal_id;
            this.page = 0;
            var data = {page:this.page,currency_id,legal_id};
            if(this.ways){
                data.way = this.ways
            }
            if(this.startTime&&this.endTime){
                data.start_time = this.startTime;
                data.end_time = this.endTime;
            }
            this.getData(data);
         }else{
             this.c_id = '';
             this.l_id = '';
             this.page = 0;
             var data = {page:this.page};
             if(this.ways){
                data.way = this.ways
            }
            if(this.startTime&&this.endTime){
                data.start_time = this.startTime;
                data.end_time = this.endTime;
            }
             this.getData(data);
         }
      }
    },
    mounted(){
        var that = this;
        eventBus.$on('buyTrade', function (data) {
            //console.log(data);
            if(data){
                that.getData();
            }
        });
        var data = {page:this.page}
        that.getData(data);
    }
}
</script>
<style scoped>
.entrust{
    width: 100%;
    background: #fff;
    /* margin: 50px auto; */
}
.green{color: #55a067}
.title{height: 48px;line-height: 46px;padding: 0 40px 0 30px;}
.tab_title{display: inline-block;line-height: 46px;height: 46px;}
.tab_title span{cursor: pointer;}
.tab_title span:not(:last-child) {margin-right: 40px;}
/* .content{padding: 0 40px 0 30px;height: 300px;} */
.content{
    padding: 0 30px;
    min-height: 600px;
}
.list-title{line-height: 40px; border-bottom: 1px solid #ccc;height: 40px;}
.no_data{padding: 50px 0;}
/* .containers{height: 260px;overflow: auto;} */
.list-item li{line-height: 30px;}
.list-item li span{display: inline-block;float: left;height: 30px;}
/* .list-item li span:nth-child(3){color:#cc4951;} */
.list-item li:hover{background-color: #eee; color: #de5959;}
.list-item li span.green{color: #55a067}
.pdb20{padding-bottom: 20px;}
/* .containers{
    border-bottom: 1px solid #ccc;
} */
.containers span{
    margin-left: 0;
}
.search_box{
    margin: 0 30px 10px 20px;
}
</style>


