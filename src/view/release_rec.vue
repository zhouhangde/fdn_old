<template>
  <div class="wrap">
      <div class="flex alcenter ft14">
          <!-- <span>{{$t('account.choosecoin')}}：</span>
          <el-select class="w20" size="mini" v-model="currency" :placeholder="$t('shop.pchoose')">
            <el-option v-for="item in list" :key="item.thisid" :label="item.name" :value="item.thisid"></el-option>
          </el-select> -->
          <span class="ml20">请选择日志类型：</span>
          <el-select class="w20" size="mini" v-model="status" :placeholder="$t('shop.pchoose')">
            <el-option v-for="item in isLock" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-button  type="primary" size="mini" class="ml20" @click="confirm">{{$t('lay.sure')}}</el-button>
      </div>
      <ul class="mt20">
          <li class="flex bdb">
              <span class="flex1 ft12 ptb10 tl">{{$t('time')}}</span>
              <span class="flex1 ft12 ptb10 tc">{{$t('finance.front')}}</span>
              <span class="flex1 ft12 ptb10 tc">{{$t('finance.after')}}</span>
              <span class="flex1 ft12 ptb10 tc">{{$t('number')}}</span>
              <span class="flex1 ft12 ptb10 tr">{{$t('finance.info')}}</span>
          </li>
          <li v-for="(item,index) in recList" :key="index" class="ptb10 flex color">
              <span class="flex1 ft12 ptb10 tl">{{item.time}}</span>
              <span class="flex1 ft12 ptb10 tc">{{item.before}}</span>
              <span class="flex1 ft12 ptb10 tc">{{item.after}}</span>
              <span class="flex1 ft12 ptb10 tc">{{item.change}}</span>
              <span class="flex1 ft12 ptb10 tr">{{item.memo}}</span>
          </li>
          <li class="tc ft12 mt20 curPer" @click="getmore">{{more}}</li>
      </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
        currency:'',
        list:[],
        status:'',
        isLock:[
            {
               id:1,name:'锁仓日志'
            },
            {
               id:2,name:'释放日志' 
            }
        ],
        recList:[],
        more:this.$t('td.nomore'),
        page:0
    };
  },
  created() {
  },
  methods: {
    confirm() { 
        if(this.status == ''){
            layer.msg('请选择日志类型');
            return;
        }
        this.page = 0;
        this.recList = [];
        this.getmsg();
    },
    getmsg(){
        var i = layer.load();
      this.$http({
        url: "/api/sgr/user_sgr_log",
        method: "get",
        params: {
          type:this.status,
          page:this.page
        },
        headers: { Authorization: localStorage.getItem('token') }
      }).then(res => {
          layer.close(i);
          if(res.data.type == 'ok'){
              if(res.data.message.data.length>0){
                 this.recList = this.recList.concat(res.data.message.data);
                 this.more=this.$t('more')
              }else{
                  this.more=this.$t('td.nomore')
              }              

          }
      });
    },
    getmore(){
        this.page++;
        this.getmsg()
    },
  }
};
</script>
<style scoped>
    .wrap{
        padding: 20px;
        width: 80%;
        margin: 60px auto;
        min-height: 600px;
        background: #fff;
    }
</style>
