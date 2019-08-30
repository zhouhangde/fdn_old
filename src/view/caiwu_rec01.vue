<template>
  <div class=" wrap">
      <div class="flex alcenter ft14">
          <span>选择币种：</span>
          <el-select class="w20" size="mini" v-model="currency" placeholder="请选择">
            <el-option v-for="item in list" :key="item.thisid" :label="item.name" :value="item.thisid"></el-option>
          </el-select>
          <span class="ml20">选择锁定状态：</span>
          <el-select class="w20" size="mini" v-model="status" placeholder="请选择">
            <el-option v-for="item in isLock" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-button  type="primary" size="mini" class="ml20" @click="confirm">确定</el-button>
      </div>
      <ul class="mt20">
          <li class="flex bdb">
              <span class="flex1 ft12 ptb10 tl">时间</span>
              <span class="flex1 ft12 ptb10 tc">变动前</span>
              <span class="flex1 ft12 ptb10 tc">变动后</span>
              <span class="flex1 ft12 ptb10 tr">信息</span>
          </li>
          <li v-for="(item,index) in recList" :key="index" class="ptb10 flex color">
              <span class="flex1 ft12 ptb10 tl">{{item.create_time}}</span>
              <span class="flex1 ft12 ptb10 tc">{{item.before}}</span>
              <span class="flex1 ft12 ptb10 tc">{{item.after}}</span>
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
               id:1,name:'锁定' 
            },
            {
               id:2,name:'未锁定' 
            }
        ],
        recList:[],
        more:'没有更多了',
        page:0
    };
  },
  created() {
      this.getCurrency();
  },
  methods: {
    confirm() { 
        this.recList = [];
        this.page = 0;
        this.getmsg();
    },
    getmsg(){
       if(this.currency == ''){
            layer.msg('请选择币种');
            return;
        }
        if(this.status == ''){
            layer.msg('请选择锁定状态');
            return;
        }
        var i = layer.load();
      this.$http({
        url: "/api/" + "log/user_info",
        method: "post",
        data: {
          currency_id: this.currency,
          type:'caiwu',
          is_lock:this.status,
          page:this.page
        },
        headers: { Authorization: localStorage.getItem('token') }
      }).then(res => {
          layer.close(i);
          if(res.data.type == 'ok'){
              if(res.data.message.list.length>0){
                 this.recList = this.recList.concat(res.data.message.list);
                 this.more='加载更多'
              }else{
                  this.more='没有更多了'
              }              

          }
      });
    },
    getmore(){
        this.page++;
        this.getmsg()
    },
    getCurrency(){
        var i = layer.load();
        this.$http({
            url:'/api/currency/currency_list',
        }).then(res=>{
            layer.close(i);
            if(res.data.type == 'ok'){
                this.list = res.data.message;
            }
        })
    }
  }
};
</script>
<style scoped>
    .wrap{
        padding: 20px;
    }
</style>
