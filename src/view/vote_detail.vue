<template>
	<div class="mt45">
		<div class="detail">
             <div class="box">
                 <div class="back">
                     <img src="../assets/images/back.png" alt="">
                     <router-link to="/vote" tag="p">{{$t('vote.vote_cur')}}</router-link>
                 </div>
                 <div class="names">
                     <div class="logo"><img :src="msg.pj_logo" alt=""></div>
                     <h4>{{msg.short_pj_name}}({{msg.pj_name}})</h4>
                 </div>
             </div>
             <div class="desc">
                 <div class="box1">
                    <span>{{$t('vote.paiming')}}</span>
                    <span class="inx">{{index}}</span>
                    <p class="man"><strong>{{msg.support_people}}</strong> {{$t('vote.sup_people')}}</p>
                    <p class="ticket"><strong>{{msg.poll}}</strong> {{$t('vote.piao')}}</p>
                    <div class="vote_r">
                        <div class="share" @click="vote">{{$t('vote.vote')}}</div>
                   </div>
                 </div>
                 <div class="box2">
                    <h2>{{$t('vote.intro')}}</h2>
                    <p>{{msg.pj_info}}</p>
                    <h2>{{$t('vote.intro')}}</h2>
                    <p>{{$t('vote.total')}}: {{msg.total_token}} </p>
                    <p>{{$t('vote.cur_total')}}: {{msg.total_circulate}} </p>
                    <p>{{$t('vote.price')}}: {{msg.token_price}} </p>
                    <h2>{{$t('vote.link')}}: </h2>
                    <p>{{$t('vote.web')}}: {{msg.url}} </p>
                    <p>{{$t('vote.zh')}}: {{msg.cn_white_book}} </p>
                    <p>{{$t('vote.en')}}: {{msg.en_white_book}} </p>
                 </div>
             </div>
        </div>
	</div>
</template>
<script>
	export default {
		name: "vote",
		data() {
			return {
			  msg:'',
              index:''
			}
		},
		created(){
			this.id = this.$route.query.id;
            this.index = this.$route.query.index;
            this.getDetail(); 
		},
		mounted(){
			
		},
		methods: {
           getDetail(){
            this.$http({
                url:'/api/vote/detail',
                params:{id:this.id},
                headers: { Authorization: localStorage.getItem('token') }
            }).then(res=>{
                if(res.data.type == 'ok'){
                  this.msg = res.data.message;
                }
            })
        },
        vote(){
            var that = this;
            layer.prompt({title: that.$t('vote.enter'), formType: 3}, function(number, index){
            layer.close(index);
            var i = layer.load();
            that.$http({
                url:'/api/vote/order',
                method:'post',
                data:{
                   id:that.id,
                   userId:localStorage.getItem('userId'),
                   number:number
                },
                headers: { Authorization: localStorage.getItem('token') }
            }).then(res=>{
                layer.close(i);
                layer.msg(res.data.message)
            })
            });
        }
		}
	};
</script>
<style lang="scss" scoped>
	.detail{
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
        
        .box{
            width: 100%;
            height: 150px;
            background: linear-gradient(90deg,#443873,#b689ad);
            position: relative;
            .back{
                display: flex;
                justify-content: center;
                align-items: center;
                color: #2a81e8;
                font-size: 15px;
                position: absolute;
                top: 25px;
                left: 60px;
                cursor: pointer;
                img{
                    height: 14px;
                    width: 20px;
                    display: block;
                }
            }
            .names{
                width: 50%;
                margin: 0 auto;
                display: flex;
                justify-content: center;
                align-items: center;
                padding-top: 25px;
                .logo{
                    margin-right: 6px;
                    height: 35px;
                    width: 35px;
                    border-radius: 50%;
                    // background: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        height: 35px;
                        width: 35px;
                        display: block;
                        border-radius: 50%;
                    }
                }
                 h4{
                    padding: 0 5px;
                    font-size: 22px;
                    color: #fff;
                    font-weight: bold;
                }
            }
        }
        .desc{
            width: 85%;
            position: absolute;
            top: 100px;
            left: 10%;
            background: #fff;
            box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
            padding: 20px;
            .box1{
                height: 70px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #ccc;
                font-size: 14px;
                color:#666;
                .inx{
                    height: 25px;
                    width: 30px;
                    line-height: 25px;
                    text-align: center;
                    background: #ccc;
                    color: #000;
                    border-radius: 4px;
                    margin-left:10px;
                }
                .man,.ticket{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0 20px;
                    strong{
                        color: #000;
                        font-weight: bold;
                        padding-right: 5px;
                    }
                }
                .man{
                    strong{
                        font-size: 16px;
                    }
                }
                .vote_r{
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center; 
                    padding-left: 45%;
                    .share{
                        height: 40px;
                        width: 100px;
                        line-height: 40px;
                        text-align: center;
                        font-size: 18px;
                         color: rgb(73, 153, 245);
                         border-radius: 4px;
                         border:1px solid #ccc;
                         cursor: pointer;
                    } 
                }
            }
            .box2{
                width: 100%;
                display: flex;
                flex-direction: column;
                font-size: 14px;
                color:#333;
                h2{
                    font-size: 15px;
                    color: #000;
                    margin: 25px 0;
                    font-weight: bold;
                }
            }
        }
    }
</style>