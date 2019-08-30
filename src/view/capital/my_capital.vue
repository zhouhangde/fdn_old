<template>
	<div>
		<div class="flex alcenter user_msg" style="width: 300px">
			<img src="../../assets/images/per_head.png">
			<ul class="ml20">
				<li>
					<span class="ft22">
<!--						UID:{{id}} | {{$t('uc.code')}}：{{invite_code}}-->
						UID:{{id}}
					</span>
				</li>
				<li>
					<span class="ft22">{{account}}</span>
				</li>
			</ul>
		</div>
		<ul class="flex tab_ul center ptb20 bdb my_capital">
			<li class="mr20 ft14 " :class="{'cor1_active':li_active == 0}" @click="li_active = 0">
				<router-link class=" ptb10 inblock" to="/userCenter/">{{$t('usercenter.change')}}</router-link>
			</li>
			<li class="mr20 ft14" :class="{'cor1_active':li_active == 1}" @click="li_active = 1">
				<router-link class=" ptb10 inblock" to="/userCenter/legal">{{$t('usercenter.legal')}}</router-link>
			</li>
			<li class="mr20 ft14" :class="{'cor1_active':li_active == 2}" @click="li_active = 2">
				<router-link class=" ptb10 inblock" to="/userCenter/lever">{{$t('usercenter.lever')}}</router-link>
			</li>
		</ul>
		<router-view></router-view>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				invite_code: '',
				id: '',
				account: "",
				li_active: 0
			}
		},
		created() {
			this.token = window.localStorage.getItem("token") || "";
			this.init()
			if(window.location.href.indexOf("userCenter/legal") != -1){
                this.li_active = 1
			}else if(window.location.href.indexOf("userCenter/lever") != -1){
                 this.li_active = 2
			}
		},
		watch:{

		 "$route":"getPath"  // 监听事件

		},
		methods: {
			init() {
				this.$http({
					url: "/api/user/info",
					method: "GET",
					data: {},
					headers: {Authorization: this.token}
				}).then(res => {
					//console.log(res);
					if (res.data.type == "ok") {
						var msg = res.data.message;
						this.account = msg.account_number;
						this.id = msg.thisid;
						this.invite_code = msg.invite_code
					}
				});
			},
			getPath(){

			  let path = this.$route.path;    //或得当前路径
			  console.log('path',path)
			  if(path == '/userCenter/legal'){
				  this.li_active = 1
			  }else if(path == '/userCenter/lever'){
                  this.li_active = 2
			  }else{
                  this.li_active = 0 
			  }
			}
		}
	}
</script>
<style scoped>
	.my_capital .router-link-active {

	}
</style>

