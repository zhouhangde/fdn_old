<template>
    <div class="mt45 ptb20 w90 wrap">
       <router-link to="depositCoin" class="flex alcenter ft14 mb20"><span>←</span><span class="ml10">返回存币宝</span></router-link> 
       <div class="radius5 plr20 ptb20 flex alcenter between top">
           <div class="flex alcenter">
               <img src="">
               <div>
                   <p>{{msg.legal_name}}</p>
                   <p>{{msg.date_limit}}{{$t('dep.plan')}}</p>
               </div>
           </div>
           <div>
               {{msg.rate*100}}% {{$t('dep.rate')}}
           </div>
           <div class="">
               <p class="ft16">{{msg.date_limit}}{{$t('dep.day')}}</p>
               <p>{{$t('dep.date')}}</p>
           </div>
       </div>
       <div class="flex between bgWhite radius5 mt20">
       <!--存币抢购-->
       <div class="  plr20 ptb20 w30" >
           <div class="left">
               <div class="ptb20 bdb">
               <el-progress :show-text="false" :percentage="percent"></el-progress>
               <p class="flex between ft12 mt10">
                   <span>{{$t('dep.lock')}}{{msg.lock_number}}</span>
                   <span>{{msg.people}}{{$t('dep.join')}}</span>
               </p>
               </div>
           </div>
           <!--抢购额-->
           <div class="ptb20 bdb">
              <p class="flex between ptb5 ft14">
                  <span>{{$t('dep.total_money')}}</span>
                   <span>{{msg.total_number}} {{msg.legal_name}}</span>
              </p>
              <p class="flex between ptb5 ft14">
                  <span>{{$t('dep.sup_num')}}</span>
                   <span>{{msg.surplus_Number}}  {{msg.legal_name}}</span>
              </p>
              <p class="flex between ptb5 ft14">
                  <span>{{$t('dep.top')}}</span>
                   <span>{{msg.person_Max_Number}} {{msg.legal_name}}</span>
              </p>
              <p class="flex between ptb5 ft14">
                  <span>{{$t('dep.one_num')}}</span>
                   <span>{{msg.person_Min_Number}} {{msg.legal_name}}</span>
              </p>
           </div>
           <div class="ptb20">
               <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp"
              >{{activity.content}}</el-timeline-item>
            </el-timeline>
           </div>
       </div>
       <div class="w70 ptb20 plr20">
           <div class="w50 fr">
          <p class="tr ft14">
              <span class="mr10">{{$t('crowd.yue')}}： {{msg.balance}}  {{msg.legal_name}}</span>
              <!-- <span class="ml10 mr10">充值</span>|
              <span class="ml10">去购买</span> -->
              </p>
           <p class="mt10 mb10 ft14">{{$t('dep.num')}}</p>
           <el-input :placeholder="$t('dep.min')+msg.person_Min_Number +msg.legal_name +$t('dep.max')+msg.person_Max_Number+msg.legal_name" v-model="num"></el-input>
           <p class="ft14 mt10 mb20">{{$t('dep.yuji')}}： {{msg.rate*num}} {{msg.legal_name}}</p>
           <div class="flex between">
           <el-button @click="buy" v-if="isEnd == 0">{{$t('dep.qiang')}}</el-button>
           <el-button disabled v-if="isEnd == 1">{{$t('dep.end')}}</el-button>
           <el-button @click="rec">{{$t('crowd.his')}}</el-button>
           </div>
           </div>
       </div>
       </div>
       <!-- <div class="mt20 ptb10">
           <p class="ptb10 bdb gray">常见问题</p>
          <ul class="ft14">
              <li class="ptb10 bdb">什么是存币宝？</li>
              <li class="ptb10 bdb">如何参与？</li>
              <li class="ptb10 bdb">收益热河计算？</li>
          </ul>
       </div> -->
    </div>
</template>
<script>
export default {
    data(){
        return{
            msg:'',
            percent:0,
            num:'',
            activities: [
        {
          content: this.$t('dep.depEndTime'),
          timestamp: "2018-04-12 20:46",
          size: "normal",
          type: "primary",
          color: "#ffa200"
        },
        {
          content: this.$t('dep.jixiTime'),
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
          size: "normal",
        },
        {
          content: this.$t('dep.lockTime'),
          timestamp: "2018-04-03 20:46",
          size: "normal",
          color: "#1ab394"
        }
      ],
      isEnd:''
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.isEnd = this.$route.query.isEnd;
        this.getDetail(); 
    },
    methods:{
        getDetail(){
            this.$http({
                url:'/api/bibox/detail',
                params:{id:this.id},
                headers: { Authorization: localStorage.getItem('token') }
            }).then(res=>{
                if(res.data.type == 'ok'){
                   this.msg = res.data.message;
                   this.percent = this.msg.lock_number/this.msg.total_number*100;
                   this.activities[0].timestamp = res.data.message.end_time;
                   this.activities[1].timestamp = res.data.message.interest_time;
                   this.activities[2].timestamp = res.data.message.unlock_time;
                }
            })
        },
        //抢购
        buy(){
            if(this.num == ''){
                layer.msg(this.$t('dep.enterNum'));
                return;
            }
            var i = layer.load();
            this.$http({
                url:'/api/bibox/order',
                method:'post',
                data:{
                    id:this.id,
                    number:this.num
                },
                headers: { Authorization: localStorage.getItem('token') }
            }).then(res=>{
                layer.close(i);
                layer.msg(res.data.message)
            })
        },
        rec(){
            this.$router.push({path:'/depositCoinRec',query:{id:this.id}})
        }
    }
}
</script>
<style scoped>
    .wrap{
        margin: 60px auto;
    }
    .top{
        background: linen;
    }
</style>
