<template>
    <div class="mt45 ptb20" style="padding-top:0;">
        <div class="banner flex column center relative">
            <p class="ft14 tr rec curPer" @click="rec">{{$t('dep.dep_rec')}}<i class="el-icon-document"></i></p>
            <!-- <div class="ft28 tc title">{{$t('dep.dep')}}</div> -->
            <!-- <p class="ft18 tc  tp mt10">{{$t('dep.tip')}}</p> -->
        </div>
        <ul class="flex w90 ul">
			<el-tabs type="border-card">
<!--				定期-->
				<el-tab-pane>
					<span slot="label">定期</span>
<!--					:style= {float:index==0?'left':'right'}-->
					<li class="li"  :class="index==0?'firstli':'secondli'"  @click="goDetail(item.thisid,item.isEnd)" v-for="(item,index) in list" :key="index" v-if="item.way == 1">
							<div class="ptb20 plr20 bgWhite bdb" >
								<p class="ft16 mb20"><span class="ft16 bold">{{item.legal_name}}</span> {{item.date_limit}}{{$t('dep.plan')}}</p>
								<p   class="flex plr20 between">
									<span class="ft14 gray">{{$t('dep.timer')}}</span>
									<span class="ft14">{{item.start_time}}~{{item.end_time}}</span>
								</p>
							</div>
							<div class="plr20 bg_gray">
								<div class="flex column alcenter center ptb20 bdb">
									<p class="redColor ft28 tc mb20">{{item.rate*100}}%</p>
									<p class=" ft14 gray tc">{{$t('dep.rate')}}</p>
								</div>
								<div class="ptb10 flex column between">
									<p class="ft12 flex between mb20">
										<span>{{$t('dep.lock')}} {{item.lock_number}}</span>
										<span>{{item.people}} {{$t('dep.join')}}</span>
									</p>
									<el-button disabled v-if="item.isEnd">{{$t('dep.end')}}</el-button>
									<el-button type="primary" v-if="!item.isEnd">{{$t('dep.buy')}}</el-button>
								</div>
							</div>
					</li>
				</el-tab-pane>
<!--				活期-->
				<el-tab-pane>
					<span slot="label">活期</span>
					<li class="li " :class="index==0?'firstli':'secondli'" @click="goDetail(item.thisid,item.isEnd)" v-for="(item,index) in list" :key="index" v-if="item.way == 0">

						<div class="ptb20 plr20 bgWhite bdb">
							<p class="ft16 mb20"><span class="ft16 bold">{{item.legal_name}}</span> {{item.date_limit}}{{$t('dep.plan')}}</p>
							<p   class="flex plr20 between">
								<span class="ft14 gray">{{$t('dep.timer')}}</span>
								<span class="ft14">{{item.start_time}} ~ {{item.end_time}}</span>
							</p>
						</div>

						<div class="plr20 bg_gray">
							<div class="flex column alcenter center ptb20 bdb">
								<p class="redColor ft28 tc mb20">{{item.pre_rate*100}}%</p>
								<p class=" ft14 gray tc">{{$t('dep.rate')}}</p>
							</div>
							<div class="ptb10 flex column between">
								<p class="ft12 flex between mb20">
									<span>{{$t('dep.lock')}} {{item.lock_number}}</span>
									<span>{{item.people}} {{$t('dep.join')}}</span>
								</p>
								<el-button disabled v-if="item.isEnd">{{$t('dep.end')}}</el-button>
								<el-button type="primary" v-if="!item.isEnd">{{$t('dep.buy')}}</el-button>
							</div>
						</div>
					</li>
				</el-tab-pane>
			</el-tabs>

        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.getList();

	},
    methods:{
        rec(){
          this.$router.push({path:'/depositCoinRec'})
        },
        goDetail(id,isEnd){

        	var param;
            if(isEnd){
              param = 1;
            }else{
              param = 0;
            }
            this.$router.push({path:'/depositCoinDetail',query:{id:id,isEnd:param}})
        },
        getList(){
            this.$http({
                url:'/api/bibox/list',
                headers: { Authorization: localStorage.getItem('token') }
            }).then(res=>{
                if(res.data.type == 'ok'){
                   this.list = res.data.message.data;
					//console.log(this.list[0]);
                }
            })
        }
    }
}
</script>
<style scoped>
   .banner{
       background: url('../assets/images/fdncunbi_bg.png') no-repeat 50%,linear-gradient(90deg,#161357,#2d5588);
       height: 290px;
       position: relative;
   }
   .w31{
       width: 31%;
   }
   .ul{
       margin: 20px auto;
       flex-wrap: wrap;
       position: relative;
       top: -100px;
   }
   .firstli{
	   float: left;
   }
   .li{
       margin: 0px 10px;
       box-shadow: 0 0 6px #ccc;
       border-radius: 5px;
       overflow: hidden;
       cursor: pointer;
   }
   .bg_gray{
       background: #f7f7f7;
   }
   .title{
       color: #ff8533;
       font-size: 48px;
       margin-top: -20px;
   }
   .tp{
       color: #c2e0ff;
       font-size: 20px;
   }
   .rec{
       position: absolute;
       top: 25px;
       right: 100px;
       color: #eee;
   }
   .rec i{
       color: #579aff;
       margin-left: 5px;
   }
</style>
