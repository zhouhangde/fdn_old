<template>
	<div id="user-center" class="bg-main mt45 ">
		<!--<div class="bg_banner">
          <div class="flex alcenter user_msg">
            <img src="../assets/images/per_head.png">
            <p class="ft12 white ml5"><span>Hi,{{account}} <img src=""></span><span class="ml20">UID:{{id}} | {{$t('uc.code')}}：{{invite_code}}</span></p>
          </div>
        </div>-->
<!--		 <div class="title">个人中心</div>-->
		<div class="content User_main">
			<div class="content-l clr-part">
				<!-- <router-link to="/userCenter" exact class="block">
                  <img src="../assets/images/logo.png" alt="">
                  <span>{{$t('security.accountset')}}</span>
                </router-link> -->
				<div class="router_link">

					<router-link to="/userCenter" exact class="block">
						<img src="../assets/images/zijin.png" alt="">
						<span>{{$t('uc.mymoney')}}</span>
					</router-link>
				</div>
				<div class="router_link">

					<router-link to="/userCenter/entrust" exact class="block">
						<img src="../assets/images/weituo.png" alt="">
						<span>{{$t('uc.entrust')}}</span>
					</router-link>
				</div>
				<div class="router_link">

					<router-link to="/userCenter/hisentrust" exact class="block">
						<img src="../assets/images/chengjiao.png" alt="">
						<span>{{$t('uc.deal')}}</span>
					</router-link>
				</div>
				<div class="router_link">

					<router-link to="/userCenter/anquan" exact class="block">
						<img src="../assets/images/chengjiao.png" alt="">
						<span>{{$t('uc.pay')}}</span>
					</router-link>
				</div>
				<div class="router_link">

					<router-link to="/userCenter/auth" exact class="block">
						<img src="../assets/images/shenfen.png" alt="">
						<span>{{$t('uc.id')}}</span>
					</router-link>
				</div>
				<!-- <router-link to="/userCenter/anquan" exact class="block"> -->
				<div class="router_link">

					<router-link to="/userCenter/security" exact class="block">
						<img src="../assets/images/anquan.png" alt="">
						<span>{{$t('uc.safe')}}</span>
					</router-link>
				</div>
				<!--<div class="router_link">-->

					<!--<router-link to="/invite" exact class="block">-->
						<!--&lt;!&ndash; <div @click="noopen"> &ndash;&gt;-->
						<!--<img src="../assets/images/yaoqing.png" alt="">-->
						<!--<span>{{$t('uc.invitate')}}</span>-->
						<!--&lt;!&ndash; </div> &ndash;&gt;-->
					<!--</router-link>-->
				<!--</div>-->
				<div class="router_link">

					<router-link to="/userCenter/caiwu" exact class="block">
						<img src="../assets/images/caiwu.png" alt="">
						<span>{{$t('uc.finance')}}</span>
					</router-link>
				</div>
				<!-- <router-link to="/userCenter/myCapital" exact class="block">
                <div @click="noopen">
                  <img src="../assets/images/denglu.png" alt="">
                  <span>登录日志</span>
                  </div>
                </router-link> -->
				<!-- <li>
                  <img src="../assets/images/logo.png" alt="">
                  <router-link to="/">账户设置</router-link>
                </li>
                <li>
                  <img src="../assets/images/logo.png" alt="">
                  <router-link to="/dealCenter">账户设置</router-link>
                </li> -->
			</div>
			<div class="content-r bg-part clr-part">
				<router-view></router-view>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				token: '',
				activeItem: 0,
				invite_code: '',
				id: '',
				account: ""
			}
		},
		created() {
			this.token = window.localStorage.getItem("token") || "";
			this.init();
		},
		methods: {
			noopen() {
				layer.msg('暂未开放')
			},
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
			}
		}
	}
</script>

<style lang='scss'>
	.bg_banner {
		background: url('../../static/imgs/personal_bg.png') top center no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 150px;
	}

	.User_main {
		width: 1180px;
		min-height: 800px;
		margin: 0 auto;
		margin-top: 78px;
		padding-left: 200px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		position: relative;
	}

	.user_msg {
		padding-left: 44px;
		position: relative;
		top: 70px;
	}

	.content-r {
		min-height: 1050px;
	}

	#user-center {
		margin: 45px auto;
		width: 100%;

		.router-link-active {
			color: #606585;
		}

		> .content {
			position: relative;
			// margin-top: 50px;
			/*padding-left: 250px;*/

			> ul, > div {
				padding: 0 0px;
				// background: #f8f8f8;
			}

			> .content-l {
				/*position: absolute;
                left: 0;
                top: 0;
                width: 250px;
                line-height: 60px;
                text-align: center;
                min-height: 1050px;
                padding-right: 0;
                padding-top: 60px;*/
				width: 190px;
				position: absolute;
				line-height: 60px;
				text-align: center;
				padding-top: 60px;
				height: 100%;
				left: 0;
				font-size: 14px;
				background-color: rgba(255, 255, 255, 1) !important;

				.router_link:hover {
					background-color: aliceblue;
					font-weight: bold;
				}

				router-link {
					font-size: 20px;
					cursor: pointer;
					color: rgba(49, 54, 62, 1) !important;
				}

				/*.router-link :hover{
                    background-color: red;
                }*/
				.router-link-active {
					background: aliceblue;
					font-weight: bold;
					/*border-top-left-radius: 35px;*/
					/*border-bottom-left-radius:35px;*/
				}

				img {
					width: 20px;
					height: 20px;
					vertical-align: sub;
				}
			}
		}
	}
</style>
