<template>
	<div class="header_overlay">

		<div id="index-head" class="flex" style="background: rgba(0,0,0,0)">
			<div class="header-l flex ft14">
				<div class="logo flex alcenter mr20" @click="goHome">
<!--					<img src="../assets/images/hxex_logo.svg" alt style="width:150px;height: 38px;margin-left: -20px;">-->
					<img src="../assets/images/fdnlogo_white.png" alt style="width:100px;height: 30px;margin-left: -10px;">

				</div>
				<!-- <span class="mr60 titles" @click="goHome">一带一路</span> -->
				<!--				<router-link to="/" exact>{{$t('header.home')}}</router-link>-->
				<router-link to="/" exact>{{$t('header.ind')}}</router-link>
				<router-link to="/dealCenter">{{$t('header.currency')}}</router-link>
				<router-link to="/legalTrade">{{$t('header.c2c')}}</router-link>
				<!-- <div v-else>{{$t('header.c2c')}}</div> -->
				<!-- <router-link v-if="token" to="/c2c">{{$t('header.c2cTransfer')}}</router-link>
                <div v-else @click="goLogin()">{{$t('header.c2cTransfer')}}</div> -->

				<router-link to="/leverdealCenter">{{$t('lever.transaction')}}</router-link>
				<!-- <router-link to="/leverdealCenter" v-if="token">{{$t('lever.transaction')}}</router-link>-->
				<!-- <div @click="noopen">{{$t('lever.transaction')}}</div> -->
				<!--我的商铺-->
				<router-link to="/myLegalShops" v-if="isShow">{{$t('header.shop')}}</router-link>
				<!-- <router-link to="/finance" v-if="token">{{$t('header.assets')}}</router-link>
                <div v-else @click="goLogin()">{{$t('header.assets')}}</div> -->


				<!-- <router-link to="/helpcenter">{{$t('header.help')}}</router-link> -->
				<!-- <router-link v-if="token" to="/advice">{{$t('header.complaint')}}</router-link>
                <div v-else @click="goLogin()">{{$t('header.complaint')}}</div> -->
				<router-link to="/passCard">{{$t('header.pro')}}</router-link>
				<!--<router-link to="/crowFinding">FDN PEAK</router-link>-->
				<!-- <div @click="noopen">存币宝</div>
                <div @click="noopen">投票上币</div> -->
				<!--<router-link to="/depositCoin">{{$t('header.cun')}}</router-link>-->
				<!--<router-link to="/vote">{{$t('header.vote')}}</router-link>-->

			    <!-- 返利 -->
				<!-- <router-link to="/sgr" style="display:flex;align-items: center;padding-top: 4px;">{{$t('header.sgr')}}
				   <img src="../assets/images/huo.svg" style="width:20px;20px"/>
				</router-link> -->


				<!--------糖果------->
				<!-- <div @click="candy">{{$t('header.candy')}}</div>
                 <div @click="candy">{{$t('header.coin')}}</div>
                  <div @click="candy">{{$t('header.show')}}</div>
                   <router-link to="/currencyExchange" v-if="token">{{$t('header.exchange')}}</router-link>
                <div v-else @click="goLogin()">{{$t('header.exchange')}}</div>
                <router-link to="/components/cfc">{{$t('header.cfc')}}</router-link> -->
				<!----------------->
				<!-- <div v-else @click="goLogin()">转至CFC</div> -->
				<!-- <router-link to="/components/noticeList">公告</router-link>
                <div class="coin-box">
                  <router-link to="/currencyApply">上币申请</router-link>
                  <router-link to="/currencyList" >币种列表</router-link>
                </div>-->
				<!-- <div>
                  <div class="download">
                    <div>app下载</div>
                    <img src="../assets/images/ewm.png" alt="">
                  </div>
                </div>-->
			</div>
			<div class="header-r flex ft14">
				<!--				未登录之前-->
				<div v-if="!account_number.length" class="flex">
					<router-link to="/components/login"><span class="login_btn">{{$t('header.in')}}</span></router-link>
					<router-link to="/components/register"><span class="register_btn">{{$t('header.up')}}</span>
					</router-link>
					<div style="margin-left: 10px">
						<el-tooltip placement="bottom" effect="light" title="公告中心">
							<div slot="content">
								<div class="flex ">
									<img style=" width: 30px;height: 30px;margin-right: 10px;margin-top: -5px;"
										 src="../assets/images/gongao.png" alt="">
									<span class="ft16 " style="color: #1c242c;">
										公告中心
									</span>
								</div>
								<div class="notice_box" style="width: 300px">
									<div class="notice_list">
										<span v-for="item in noticeList.slice(0,5)" :key="item.id" class="fl list"
											  @click="$router.push({path:'components/noticeDetail',query:{id:item.thisid}})">
										<a class="notice_a ft12" :data-id='item.id'>{{item.title}}</a>
										</span>
									</div>

								</div>
								<div class="moredetail" style="clear: both;text-align: center">
										<span style="text-align: center;line-height: 20px;margin-top: 4px">
												<a @click=" goDetail('/noticeHelp')">查看更多</a>
										</span>
								</div>

							</div>

                            <el-em><i class="fa fa-bell" aria-hidden="true"></i></el-em>
						</el-tooltip>
					</div>
					<div style="margin-left: 10px">
						<!--<a href="https://51gsc.com/app/JJS0"><i class="fa fa-download" aria-hidden="true"></i></a>-->
						<a href="https://51gsc.com/app/JJS0">{{$t('header.down')}}</a>
					</div>
				</div>
				<!--				登录之后-->
				<div v-if="account_number.length" class="flex">
					<!--					资产-->
					<div class="assets">
						<el-tooltip placement="bottom" effect="light">
							<div slot="content">
								<div class="f1 ft14">
									<ul class="notice_list">
										<li class="notice_a usr">
											<div @click="goUserCenter('/userCenter')">{{$t('usercenter.change')}}</div>
                                        </li>
										<li class="notice_a usr">
											<div @click="goUserCenter('/userCenter/legal')">{{$t('usercenter.legal')}}</div>
										</li>
										<li class="notice_a usr">
											<div @click="goUserCenter('/userCenter/lever')">{{$t('usercenter.lever')}}</div>
										</li>
									</ul>
								</div>
							</div>
							<el-em>{{$t('header.assets')}}</el-em>

						</el-tooltip>
						<!--<div>资产</div>
						<div class="links">
							<router-link to='/finance'>交易</router-link>

						</div>-->
					</div>
					<!--					订单-->
					<div class="order">
						<el-tooltip placement="bottom" effect="light">
							<div slot="content">
								<div class="f1 ft14">
									<ul class="notice_list">
										<li class="notice_a usr">
											<span style="text-align: center;line-height: 20px;margin-top: 4px">
												<a @click="now">{{$t('header.current')}}</a>
											</span>

										</li>
										<li class="notice_a usr">
											<div @click="history">{{$t('header.his')}}</div>
										</li>
									</ul>
								</div>
							</div>
							<el-em>{{$t('header.orders')}}</el-em>

						</el-tooltip>
					</div>
					<!--					用户-->
					<div style="margin-left: 30px">
						<el-tooltip placement="bottom" effect="light">
							<div slot="content">
								<div class="f1 ft14">
									<ul class="notice_list">
										<li class=" usr_li">
											<span>Hi,{{account_number}}</span>
										</li>
										<li class=" usr_li">
											<span>UID:{{user_id}}</span>
										</li>

										<li class="notice_a usr">
											<span style="text-align: center;line-height: 20px;margin-top: 4px">
												<a @click=" goUserCenter('/userCenter')">{{$t('header.center')}}</a>
											</span>

										</li>
										<!--<li class="notice_a usr">-->
												<!--<div @click=" goUserCenter('/invite')">{{$t('uc.invitate')}}</div>-->
										<!--</li>-->
										<li class="notice_a usr">
												<div @click=" goUserCenter('/userCenter/security')">{{$t('uc.safe')}}</div>
										</li>
										<li class="notice_a usr">
												<div @click=" goUserCenter('/userCenter/caiwu')">{{$t('uc.finance')}}</div>
										</li>
										<li class="notice_a usr">
											<div @click="signOut">{{$t('header.out')}}</div>
										</li>
									</ul>
								</div>
							</div>
                            <el-em><i class="fa fa-user-circle-o" aria-hidden="true"></i></el-em>
						</el-tooltip>
					</div>

					<div style="margin-left: 30px">
						<el-tooltip placement="bottom" effect="light" title="公告中心">
							<div slot="content">
								<div class="flex ">
									<img style=" width: 30px;height: 30px;margin-right: 10px;margin-top: -5px;"
										 src="../assets/images/gongao.png" alt="">
									<span class="ft16 " style="color: #1c242c;">
										公告中心
									</span>
								</div>
								<div class="notice_box" style="width: 300px">
									<div class="notice_list">
										<span v-for="item in noticeList.slice(0,5)" :key="item.id" class="fl list"
											  @click="$router.push({path:'components/noticeDetail',query:{id:item.thisid}})">
										<a class="notice_a ft12" :data-id='item.id'>{{item.title}}</a>
										</span>
									</div>

								</div>
								<div class="moredetail" style="clear: both;text-align: center">
										<span style="text-align: center;line-height: 20px;margin-top: 4px">
												<a @click=" goDetail('/noticeHelp')">查看更多</a>
										</span>
								</div>

							</div>


							<el-em><i class="fa fa-bell" aria-hidden="true"></i></el-em>
						</el-tooltip>
					</div>
					<!--					下载-->
					<div style="margin-left: 20px">
						<!--<a href="https://51gsc.com/app/JJS0"><i class="fa fa-download" aria-hidden="true"></i></a>-->
						<a href="https://51gsc.com/app/JJS0">App 下载</a>
					</div>

				</div>
				<!--				语言选择-->
				<div class="ml20 lang_wrap" @mouseover="over_lang" @mouseout="out_lang">
					<p class="flex alcenter">
						<!--<img class="mr10" :src="lang_img">-->
						<span class="mr10">{{lang_text}}</span>
						<img src="../assets/images/arrow0.png">
					</p>
					<div class="plr5 lang_box">
						<p class="flex alcenter" v-for="(item,index) in langArr" :key="index"
						   @click="set_lang(item.src,item.text,item.lang)">
							<img class="mr10" :src="item.src">{{item.text}}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: "indexHeader",
		data() {
			return {
				visible: false,
				account_number: "",
				extension_code: "",
				token: "",
				isShow: false,
				noticeList: [],
				showNot: false,
				user_id: '',
				vip0: '',
				vip1: require('../assets/images/VIP1.png'),
				vip2: require('../assets/images/VIP2.png'),
				vip3: require('../assets/images/VIP3.png'),
				langArr: [
					{
						src: require('../assets/images/zh.png'),
						text: this.$t('lang.zh'),
						lang: 'zh'
					},
					{
						src: require('../assets/images/en.png'),
						text: this.$t('lang.en'),
						lang: 'en'
					},
					{
						src: require('../assets/images/han.png'),
						text: this.$t('lang.han'),
						lang: 'han'
					},
					{
						src: require('../assets/images/jp.png'),
						text: this.$t('lang.jp'),
						lang: 'jp'
					}
				],
				lang_img: require('../assets/images/zh.png'),
				lang_text: this.$t('lang.zh')
			};
		},
		created() {
			this.getNotice()
			this.token = window.localStorage.getItem("token") || "";
			this.account_number = window.localStorage.getItem("accountNum") || "";
			this.extension_code = window.localStorage.getItem("extension_code") || "";
			eventBus.$on("toHeader", msg => {
				if (msg.account) {
					this.account_number = msg.account;
					this.extension_code = msg.extension_code;
				}
			});
			if (this.token) {
				this.init();
			}
			;
			var lang = localStorage.getItem('locale');
			if (lang == 'zh') {
				this.lang_img = require('../assets/images/zh.png');
				this.lang_text = this.$t('lang.zh')
			} else if (lang == 'en') {
				this.lang_img = require('../assets/images/en.png');
				this.lang_text = this.$t('lang.en')
			} else if (lang == 'han') {
				this.lang_img = require('../assets/images/han.png');
				this.lang_text = this.$t('lang.han')
			} else if (lang == 'jp') {
				this.lang_img = require('../assets/images/jp.png');
				this.lang_text = this.$t('lang.jp')
			}
		},
		mounted() {
			eventBus.$on("toHeader", msg => {
				if (msg.account) {
					this.extension_code = msg.extension_code;

					this.account_number = msg.account;
				}
			});
		},
		methods: {
			set_lang(img, text, lang) {
				this.lang_img = img;
				this.lang_text = text;
				$('.lang_box').css('display', 'none');
				var l = window.localStorage.getItem("locale") || "zh";
				if (l == lang) {
					return;
				} else {
					window.localStorage.setItem("locale", lang);
					this.$i18n.locale = lang;
					window.location.reload();
				}
			},
			over_lang() {
				$('.lang_box').css('display', 'block')
			},
			out_lang() {
				$('.lang_box').css('display', 'none')
			},
			candy() {
				layer.msg(this.$t('lay.notopen'))
			},
			noopen() {
				layer.msg(this.$t('lay.notopen'))
			},
			getNotice() {
				this.$http({
					url: '/api/news/list',
					method: 'get',
					data: {language: this.$i18n.locale == 'zh' ? 1 : 2, c_id: 21}
				}).then(res => {
					this.noticeList = res.data.message.list;
				})
			},
			setLang(lang) {
				var l = window.localStorage.getItem("locale") || "zh";
				if (l == lang) {
					return;
				} else {
					window.localStorage.setItem('locale', lang);
					this.$i18n.locale = lang;
					window.location.reload();
				}
			},
			goDetail(path) {
				this.$router.push(path)
			},
			goUserCenter(path) {
				this.$router.push(path)
			},
			goHome() {
				this.$router.push("/");
			},
			now() {
				this.$router.push("/entrust");
			},
			history() {
				this.$router.push("/hisentrust");
			},
			signOut() {
				this.account_number = "";
				var account = localStorage.getItem('accountNum');
				var password = localStorage.getItem('password');
				var tradeData = localStorage.getItem('tradeData');
				// window.localStorage.removeItem("token");
				// window.localStorage.removeItem("accountNum");
				// window.localStorage.removeItem("user_id");
				// window.localStorage.removeItem("extension_code");
				window.localStorage.clear();
				localStorage.setItem('tradeData', tradeData);
				// window.localStorage.setItem('accountNum',account);
				// window.localStorage.setItem('password',password)
				// this.$router.push("/components/login");
			},
			goLogin() {
				this.$router.push("/components/login");
			},
			init() {
				this.$http({
					url: "/api/user/info",
					method: "GET",
					data: {},
					headers: {Authorization: this.token}
				}).then(res => {
					if (res.data.type == "ok") {
						window.localStorage.setItem("status", res.data.message.review_status);
						window.localStorage.setItem("userId", res.data.message.thisid);
						this.user_id = res.data.message.thisid
						if (res.data.message.is_merchant == "1") {
							this.isShow = true;
						}
						;
						if (res.data.message.level == 1) {
							this.vip0 = this.vip1
						}
						;
						if (res.data.message.level == 2) {
							this.vip0 = this.vip2
						}
						;
						if (res.data.message.level == 3) {
							this.vip0 = this.vip3
						}
					}
				});
			}
		}
	};
</script>

<style lang='scss' scoped>

	.header_overlay {
		background: rgba(0, 0, 0, 0);
		border-bottom-color: transparent;
		margin-bottom: 48px;
	}

	.login_btn {
		padding: 3px 15px;
		/*border: 1px solid #4A90E2;*/
		border-radius: 4px;
	}

	.register_btn {
		padding: 3px 15px;
		border: 1px solid #4A90E2;
		border-radius: 4px;
	}

	.notice_a:hover {
		color: #357ce1;
		cursor: pointer;
	}

	.usr_li {

		color: #1c242c;
		font-size: 12px;
		height: 40px;
		line-height: 40px;
		background-color: #f9fcfe;
		border-radius: 2px;
		padding-left: 12px;
		padding-right: 12px;
	}

	.usr {
		min-height: 40px;
		line-height: 18px;
		padding: 10px 24px;
		color: #2b3d4a;
		display: block;
		overflow: hidden;
		white-space: nowrap;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		margin: 0 1px;
	}

	.usr:hover {
		color: #357ce1;
		cursor: pointer;
	}

	.notice_a {
		color: #1c242c;
		font-size: 12px;
		height: 40px;
		line-height: 40px;
		background-color: #f9fcfe;
		border-radius: 2px;
		padding-left: 12px;
		padding-right: 12px;
	}

	.moredetail a {
		cursor: pointer;
		color: #357ce1;
	}

	/*moredetail a:hover {
		color: #357ce1;
	}*/

	.notice {
		position: relative;
		margin: 0 10px 0 20px;
		padding: 12.5px 10px;
		height: 45px;
		cursor: pointer;

		img {
			width: 20px;
			height: 20px;
		}

		> .showNot {
			padding-top: 10px;
			height: 200px;
			transition: all .3s;
			overflow: scroll;
		}

		> p {
			position: absolute;

			width: 220px;
			border-radius: 4px;
			box-shadow: 0 2px 3px #ccc;
			top: 45px;
			left: -100px;
			background: #fff;
			z-index: 999;
			height: 200px;
			overflow: auto;
			transition: all .3s;
			height: 0;
			overflow: hidden;

			span {
				margin: 0 10px;
				display: block;
				font-size: 12px;
				line-height: 32px;
				color: #333;
				border-bottom: 1px dashed #eee;

				&:hover {
					color: #d45858;
				}
			}
		}
	}

	.lang-box {
		margin-left: 10px;

		span {
			margin-left: 20px;
			cursor: pointer;
		}
	}

	.titles {
		cursor: pointer;
	}

	.order {
		margin-right: 0px;
		position: relative;
		cursor: pointer;
		padding-right: 10px;
		//background: url("../assets/images/arrow0.png") no-repeat right center;
	}

	.order :hover {
		color:#fff;
	}

	.order_list {
		min-width: 80px;
		left: -10px;
		position: absolute;
		background: #2e1b85;
		color: #fff;
		padding: 0 10px;
		z-index: 999999;
	}

	.order_list {
		display: none;
	}

	.order:hover ul {
		display: block;
	}

	.order_list li {
		line-height: 30px;
	}

	.order_list li:hover {
		color: #d45858;
	}

	/*#index-head:hover {
		//  background:rgba(0, 0, 0, 0.11);
		cursor: pointer;
	}*/

	#index-head {
		justify-content: space-between;
		padding-left: 16px;
		padding-right: 16px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		// min-width: 1200px;
		min-width: 1280px;
		width: 100%;
		height: 48px;
		line-height: 48px;
		font-size: 12px;
		background: #131625 !important;
		color: #A8ADCC;
		/*background-color: rgba(255, 0, 0, 0);*/
		/*background: rgba(0,0,0,0.5)  ! important ;*/
		position: fixed;
		top: 0;
		/*opacity: 0.1;*/
		z-index: 10;

		/*background-color: #1b2945;
		height: 48px;
		padding-left: 16px;
		padding-right: 16px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 100%;
		min-width: 1280px;
		z-index: 999;
		border-bottom: 1px solid #171c2c;
		position: fixed;*/

		a:hover,
		.router-link-active {
			color: #fff;

		}


		.register_btn:hover {
			background-color: #357ce1;;
		}


		.header-l .router-link-active {
			border-bottom: 2px solid #0FD5FF;
		}

		.header-r .router-link-active span {
			background: #4A90E2;
		}

		.currency-list,
		.lalala {
			display: none;
		}

		> .header-l {
			align-items: center;

			> .logo {
				// border-radius: 50%;
				width: 100px;
				// height: 30px;
				// background: #fff;
				> img {
					// width: 100%;
				}
			}

			> a,
			> div {
				margin-right: 25px;
				height: 45px;
				cursor: pointer;

				> a {
					display: block;
				}
			}

			> div:hover {
				color: #fff;
			}

			> .coin-box {
				position: relative;

				a:last-child {
					display: none;
					position: absolute;
					width: 130%;
					text-align: center;
					left: -15%;
				}

				&:hover {
					a:last-child {
						display: block;
						background: #181b2a;
						// text-align: center;
					}
				}
			}

			.download {
				position: relative;

				img {
					position: absolute;
					display: none;
					width: 100px;
					height: 100px;
					z-index: 999;
					left: -20px;
				}

				&:hover {
					img {
						display: block;
					}
				}
			}
		}

		.header-r {
			a {
				margin: 0 8px;
			}

			.assets {
				position: relative;
				margin-right: 25px;
				padding-left: 25px;
				//background: url("../assets/images/assets.png") no-repeat left center;
				background-size: 20px 20px;
				cursor: pointer;

				> div:first-child {
					padding-right: 14px;
					//background: url("../assets/images/arrow0.png") no-repeat right center;
				}

				> .links {
					position: absolute;
					right: 0;
					width: 80px;
					z-index: 999;
					text-align: center;
					background: #181b2a;
					display: none;

					a {
						margin: 0;
						display: block;
					}
				}

				&:hover {
					color:#fff;
					.links {
						display: block;
					}
				}
			}

			.links-box {
				position: relative;
				cursor: pointer;
				padding-right: 20px;
				background: url("../assets/images/arrow0.png") no-repeat right center;

				&:hover {
					.links {
						display: block;
					}
				}

				.account_number {
					padding-left: 20px;
					// background: url("../assets/images/icon_mine.png") no-repeat left center;
					background-size: 15px;
				}

				.links {
					position: absolute;
					right: 0;
					z-index: 999;
					background: #181b2a;
					display: none;

					a {
						border-bottom: 1px solid #383d54;
					}

					a,
					div {
						display: block;
						padding: 0 14px;
						margin: 0;
						text-align: center;

						&:hover {
							color: #d45858;
						}
					}
				}
			}

			.theme > img {
				cursor: pointer;
				margin-left: 15px;
				margin-top: 12.5px;
				width: 20px;
				height: 20px;
			}
		}
	}

	.lang_box {
		display: none;
		background: #0d1a6c;
		border-radius: 3px;
	}

	.lang_wrap {
		width: 120px;

		> p {
			padding: 0 5px;
		}

		&:hover {
			.lang_box {
				display: block;
			}
		}
	}

	.lang_box p {
		padding: 0 6px;
		width: 120px;
	}

	.lang_box p:hover {
		background: #2c3883;
	}
</style>
