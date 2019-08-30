<template>
	<div class="mt45">
        <div class="banner flex column center">
            <div class="banner_box w100 flex column center">
            <p class="ft28 tc mb10 v_title bold" style="color:#9cd3ff">{{$t('vote.di')}}{{headData.periods}}{{$t('vote.period')}} {{headData.vote_status}}</p>
            <p class="ft12 tc mb10 mt10"><span class="timer">{{headData.start_time}} ~ {{headData.end_time}}<span class="ml20 curPer" @click="rule">{{$t('vote.explain')}}</span></span></p>
            <p class="ft14 tr flex column" style="padding-right:15%"><span>{{$t('vote.free')}}：{{headData.free_poll}} </span><span>{{$t('vote.have')}}{{headData.currency_name}}{{$t('vote.num')}}：{{headData.hold_poll}}</span></p>
            </div>
        </div>
		<div class="vote">
           <div class="title">
               <span class="tit">{{$t('vote.people')}}</span>
               <span class="tit">{{$t('vote.tickets')}}</span>
           </div>
           <ul class="votelist bgWhite">
               <li v-for="(item,index) in list" :key='index'>
                   <div class="vote_l">
                        <span class="inx">{{index+1}}</span>
                        <img :src="item.pj_logo" alt="">
                        <div class="names">
                            <span class="abbreviation">{{item.short_pj_name}}</span>
                            <p class="full_name">
                                <em>{{item.pj_name}}</em>
                                <router-link :to="{path:'/voteDetail',query:{id:item.thisid,index:index+1}}" tag="a">{{$t('vote.detail')}}</router-link>
                            </p>
                            <p class="ft12" v-if="item.is_air_drop == 1">{{$t('vote.jiangli')}}：{{$t('vote.fen')}} {{item.airNumber}} {{item.short_pj_name}}</p>
                        </div>
                   </div>
                   <div class="vote_c">
                        <p class="man"><strong>{{item.support_people}}</strong> {{$t('vote.sup_people')}}</p>
                        <p class="ticket"><strong>{{item.poll}}</strong> {{$t('vote.piao')}}</p>
                   </div>
                   <div class="vote_r">
                        <div class="share" @click="vote(item.thisid)">{{$t('vote.vote')}}</div>
                   </div>
               </li>
           </ul>
        </div>
	</div>
</template>
<script>
	export default {
		name: "vote",
		data() {
			return {
              list:[],
              headData:''
			}
		},
		created(){
			this.getList();
		},
		mounted(){

		},
		methods: {
           getList(){
            this.$http({
                url:'/api/vote/list',
                headers: { Authorization: localStorage.getItem('token') }
            }).then(res=>{
                if(res.data.type == 'ok'){
                   this.list = res.data.message.data;
                   this.headData = res.data.message;
                }
            })
        },
        //投票
        vote(id){
            var that = this;
            layer.prompt({title: that.$t('vote.enter'), formType: 3}, function(number, index){
            layer.close(index);
            var i = layer.load();
            that.$http({
                url:'/api/vote/order',
                method:'post',
                data:{
                   id:id,
                   userId:localStorage.getItem('userId'),
                   number:number
                },
                headers: { Authorization: localStorage.getItem('token') }
            }).then(res=>{
                layer.close(i);
                layer.msg(res.data.message);
                if(res.data.type == 'ok'){
                    that.getList();
                }
            })
            });
        },
        rule(){
            this.$router.push({path:'/components/noticeDetail',query:{id:13}})
        }
		}
	};
</script>
<style lang="scss" scoped>
    .banner{
        background: url('../assets/images/fdnvote_bg.png') no-repeat;
        width: 100%;
        height: 400px;
        background-size: 100% 100%;
        color: #f55353;
    }
    .banner_box{
        height: 100%;
        background: rgba(14, 30, 51, 0.6);
    }
    .v_title{
        font-size: 36px;
        margin-top: -110px;
    }
    .zhuli{
        color: #eee;
    }
    .timer{
        padding: 5px 10px;
        border-radius: 15px;
        color:#eee;
        background: rgba(79, 138, 200, 0.8);

    }
	.vote{
        position: relative;
        top: -100px;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
        .title{
            height: 50px;
            width: 100%;
            background: rgb(26, 4, 126);
            color: #fff;
            font-size: 12px;
            border-radius: 5px 5px 0  0;
            padding-left: 50%;
            display: flex;
            .tit{
                 width: 30%;
                 height: 100%;
                 display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .votelist{
            border-radius:0 0 5px 5px;
            width: 100%;
            min-height: 300px;
            li{
                height: 120px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #ccc;
                .vote_l{
                    width: 45%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    .inx{
                        height: 25px;
                        width: 30px;
                        line-height: 25px;
                        text-align: center;
                        background: #ccc;
                        color: #000;
                        border-radius: 4px;
                        margin: 0 25px;
                    }
                    img{
                        height: 40px;
                        width: 40px;
                        display: block;
                    }
                    .names{
                        height: 60px;
                        width: 70%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        margin-left: 20px;
                        .abbreviation{
                            height: 20px;
                            line-height: 20px;
                            color: #000;
                            font-size: 16px;
                            font-weight: bold;
                        }
                        .full_name{
                            display: flex;
                            align-items: center;
                            font-size: 13px;
                            em{
                                color: #666;
                            }
                            a{
                                padding-left: 20px;
                                color: rgb(73, 153, 245);
                                cursor: pointer;
                            }
                        }
                    }
                }
                .vote_c{
                    width: 30%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    .man,.ticket{
                        width: 50%;
                        font-size: 13px;
                        color: #666;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        strong{
                            font-size: 16px;
                            color: #000;
                            padding-right: 5px;
                        }
                    }
                }
                .vote_r{
                    width: 15%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .share{
                        height: 40px;
                        width: 100px;
                        line-height: 40px;
                        text-align: center;
                        font-size: 16px;
                         color: rgb(73, 153, 245);
                         border-radius: 4px;
                         border:1px solid #ccc;
                         cursor: pointer;
                    }
                }
            }
            li:last-child{
                border-radius:0 0 5px 5px;
                border:none;
            }
        }
    }
</style>
