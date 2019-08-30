<template>
    <div class="mt45 ptb20">
       <div class="w50 box plr10 bgWhite radius5">
           <p class="ptb10 ft16">{{$t('dep.his')}}</p>
           <ul>
               <li class="flex ptb10 bdb ft14">
                   <span class="flex1 tl">{{$t('dep.date')}}</span>
                    <span class="flex1 tc">{{$t('dep.money')}}</span>
                    <span class="flex1 tc">{{$t('dep.cur_name')}}</span>
                    <span class="flex1 tr">{{$t('dep.do')}}</span>
               </li>
               <li class="flex ptb10 ft14 alcenter" v-for="(item,index) in list" :key="index">
                   <span class="flex1 tl">{{item.save_time}}</span>
                   <span class="flex1 tc">{{item.amount}}</span>
                   <span class="flex1 tc">{{item.currency_name}}</span>
                   <span class="flex1 tr"><el-button type="primary" :disabled="item.amount==0" size="mini" @click="out(item.thisid)">{{$t('dep.ti')}}</el-button></span>
               </li>
               <li  class="mt10 ft14 tc gray curPer" @click="getmore">{{more}}</li>
           </ul>
       </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[],
            page:0,
            more:this.$t('more'),
            id:'',
            timer:'',
            interest:'',
            currency_name:'',
            fee:'',
            take_number:''
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.getList(this.id);
    },
    methods:{
        getList(id){
            var i = layer.load();
            this.$http({
                url:'/api/bibox/userList',
                method:'get',
                params:{
                    userId:localStorage.getItem('userId'),
                    page:this.page
                },
                 headers: { Authorization: localStorage.getItem('token') }
            }).then(res=>{
                layer.close(i);
               if(res.data.type == 'ok'){
                   if(res.data.message.data.length>0){
                       if(this.page == 0){
                           this.list = [];
                       }
                       this.list = this.list.concat(res.data.message.data);
                   }else{
                       this.more = this.$t('nomore')
                   }
               }
            })
        },
        getmore(){
            this.page++;
            this.getList();
        },
        //提取
        out(id){
         var that = this;
         var index = layer.load(1, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                    });
            this.$http({
                url:'/api/bibox/extractInfo',
                method:'get',
                params:{
                    id:id,
                    userId:localStorage.getItem('userId')
                },
                headers: { Authorization: localStorage.getItem('token') }
            }).then(res=>{
                layer.close(index);
                if(res.data.type == 'ok'){
                    var msg = res.data.message;
                    that.timer = msg.lock_duration;
                    that.interest = msg.interest;
                    that.currency_name = msg.currency_name;
                    that.fee = msg.fee;
                    that.take_number = msg.take_number-msg.fee;
                    layer.confirm(that.$t('dep.suoTime')+'（'+that.timer+that.$t('dep.day')+'）、'+that.$t('dep.leiji')+that.interest+'、'+that.$t('dep.rateNum')+that.fee+'、'+that.$t('dep.ti_num')+that.take_number+', '+that.$t('dep.tiYet')+that.take_number+'个 '+that.currency_name+that.$t('dep.to'), {
            btn: [that.$t('dep.yes'),that.$t('dep.no')] //按钮
            }, function(){
                var i = layer.load(1, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                    });
                that.$http({
                    url:'/api/bibox/extract',
                    method:'post',
                    data:{
                        userId:localStorage.getItem('userId'),
                        id:id,
                        number:that.take_number
                    },
                    headers: { Authorization: localStorage.getItem('token') }
                }).then(res=>{
                    layer.close(i);
                    layer.msg(res.data.message)     
                    if(res.data.type == 'ok'){
                        that.page = 0;
                        that.getList();
                    }
                })
            }, function(){
            });
                }else{
                    layer.msg(res.data.message)
                }
            })
            
        }
    }
}
</script>
<style scoped>
    .box{
        width: 60%;
        margin: 0 auto;
        min-height: 700px;
    }
    

</style>
