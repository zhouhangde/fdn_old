<template>
	<div class="noticeDetail clr-part bg-part">
		<indexHeader></indexHeader>
		<div style="height: 12px ; background-color: rgba(242,246,250,.5) !important;">

		</div>
		<div class="notice-info">

			<div class="main-content main-l  flex ">
				<div class="menu" style="height: auto;">
					<div class="menu-tit medium f-1-cl">公告中心</div>
					<ul class="f-2-cl">
						<li :class=" ['menu-item',{hand_active :  newsid == item.thisid }]"
							v-for="(item,index) in newList.slice(0,10)" :key="item.id">
							<div @click="goDetail(item.thisid) ">
								{{item.title}}
							</div>
						</li>
					</ul>
<!--	--------------------------------------------------分页-----------------------------------------------------------   -->
					<!--<div class="block">
						<el-pagination
							background
							layout="prev, pager, next"
							:total="30">
						</el-pagination>
					</div>-->

					<!--<div data-v-55c143f2="" class="pagination a-5-bg">
						<div data-v-55c143f2="" class="pagination-bar a-3-bd b-2-cl">
							<span class="num b-2-cl">1 - 10 of 541</span>
							<span data-v-55c143f2="" class="pagination-btn a-4-cl-h disabled">
								<svg data-v-55c143f2="" aria-hidden="true" class="icon icon-14">
									<use data-v-55c143f2="" xlink:href="#icon-a_10_1"></use>
								</svg>
							</span>
							<span data-v-55c143f2="" class="pagination-btn a-4-cl-h">
								<svg data-v-55c143f2="" aria-hidden="true" class="icon icon-14">
								<use data-v-55c143f2="" xlink:href="#icon-a_11"></use>
								</svg>
							</span>
						</div>
					</div>-->
				</div>
				<div class="content-box">
					<div class="content-text c-4-bg"><h1 class="content-title tc f-1-cl">{{title}}</h1>
						<!--						<p class="time f-2-cl">2019/07/12 21:39:35</p>-->
						<div class="main-text f-2-cl">
							<!--							<p>尊敬的用户，</p>-->

							<p v-html="content" ref="con"></p>

							<p>&nbsp;</p>

							<p>&nbsp;</p>

							<p>{{abstract}}</p>

							<p>{{create_time}}</p></div>
						<div class="loading" style="display: none;">
							<section data-v-12f7cdc8="" class="common-loading a-12-bd"
									 style="width: 50px; height: 50px;">
								<div data-v-12f7cdc8="" class="common-loading-content"
									 style="width: 50px; height: 50px;">
									<div data-v-12f7cdc8="" class="mmd-loading-circle-layout">
										<div data-v-12f7cdc8="" class="mmd-loading-layout-left">
											<div data-v-12f7cdc8=""
												 class="mmd-loading-circle-left mmd-loading-circle-left-com b-4-cl"
												 style="width: 40px; height: 40px; border-width: 5px; border-left-style: solid; border-left-color: transparent; border-bottom-style: solid; border-bottom-color: transparent;"></div>
										</div>
										<div data-v-12f7cdc8="" class="mmd-loading-layout-right">
											<div data-v-12f7cdc8=""
												 class="mmd-loading-circle-right mmd-loading-circle-right-com b-4-cl"
												 style="width: 40px; height: 40px; border-width: 5px; border-right-style: solid; border-right-color: transparent; border-top-style: solid; border-top-color: transparent;"></div>
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
				<div class="moredetail ft12 " style="width: 100px; height: 10px; color: #828ea1"><router-link :to="{path:'/noticeHelp'}" tag="span">查看更多...</router-link></div>
				<!--				<div class="account column">-->
				<!--					<div>-->
				<!--						<div class="back-nav  ft20">-->
				<!--							<span class="fr  curPer" @click="goBefore">&lt;&lt;{{$t('back')}}</span>-->
				<!--						</div>-->
				<!--						<div class="nav-after"></div>-->
				<!--					</div>-->
				<!--					<div class="account-content">-->
				<!--						<div class="detailBig">-->
				<!--							<div class="mb30 clear">-->
				<!--								<span class=" w90 fl tc title">{{title}}</span>-->
				<!--							</div>-->
				<!--							<div class="detailContent ">-->
				<!--								<p v-html="content" ref="con"></p>-->
				<!--							</div>-->
				<!--							<div class=" mt40">-->
				<!--								<p class="tr">{{abstract}}</p>-->
				<!--								<p class="tr mt5">{{create_time }}</p>-->
				<!--							</div>-->
				<!--						</div>-->
				<!--					</div>-->
				<!--				</div>-->
			</div>
		</div>
	</div>
</template>
<script>
	import indexHeader from '@/view/indexHeader'

	export default {
		name: 'noticeDetail',
		components: {indexHeader},
		data() {
			return {
				title: '',
				content: '',
				abstract: '',
				create_time: '',
				newList: [],
				newsid: '',
				// news: {},

			}
		},
		created() {
			this.id = this.$route.query.id;
			var locale = window.localStorage.getItem('locale');
			var id = this.id;
			this.getData();
		},
		mounted() {

			var that = this;
			that.getNotice();
			// var tags=this.$refs.con.getElementsByTagName('p');
			// //console.log(tags)
			// for(var i=0;i<tags.length;i++){
			//     //console.log(tags)
			//     //console.log(tags[i])
			//     tags[i].style.background='transparent'
			// }
		},
		watch: {
			$route() {
				if (this.$route.query.id != this.id) {
					this.id = this.$route.query.id;
					this.$nextTick(() => {
						this.getData();
					})
				}
			}
		},
		methods: {
			/*handleSizeChange(val) {
				//console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
			},*/
			getNotice() {
				this.$http({
					url: '/api/news/list',
					method: 'get',
					data: {language: this.$i18n.locale == 'zh' ? 1 : 2}
				}).then(res => {
					var that = this;
					// //console.log(res);
					this.newList = res.data.message.list
					// this.is_active = this.newList[0].thisid
					$.each(this.newList, function (k, v) {
						v.time = that.timestampToTime(v.time);
					})
				})
			},

			goDetail(id) {
				var id = id;
				this.$router.push({
					name: "noticeDetail",
					query: {id: id}
				});
				this.newsid = id
			},

			goBefore() {
				this.$router.back(-1);
			},
			getData() {
				this.$http({
					url: '/api/news/detail?' + 'id=' + this.id,
					method: 'get',
					headers: {'Authorization': window.localStorage.getItem('token')}
				}).then(res => {
					res = res.data;
					if (res.type === 'ok') {
						//console.log('uuuuu')
						//console.log(res.message)
						this.title = res.message.title;
						this.content = res.message.content;
						this.abstract = res.message.abstract;
						this.create_time = res.message.create_time;
						this.newsid = res.message.thisid;
						// //console.log(res.message.update_time, time)
						// this.create_time= this.timestampToTime(time);

						// this.setProperty(this.timestampToTime(res.message.update_time));
						//console.log('ppp')
					} else {
						layer.msg(res.message);
					}
				}).catch(error => {
					//console.log(error)
				})
			},
			//    setProperty(){
			//         var tags=document.getElementsByTagName('p');
			//         HTMLCollection.prototype.forEach=function(callback){
			//                 [].slice.call(this).forEach(callback);
			//         };
			//         tags.forEach(function(e, i){
			//                 e.style.backgroundColor='#666 !important'
			//         });


			//    },

			timestampToTime(timestamp) {
				var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = this.change(date.getDate()) + ' ';
				var h = this.change(date.getHours()) + ':';
				var m = this.change(date.getMinutes()) + ':';
				var s = this.change(date.getSeconds());
				return Y + M + D;
			},
			change(t) {
				if (t < 10) {
					return "0" + t;
				} else {
					return t;
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.hand_active {
		background: white !important;
		color: rgba(130, 142, 161, 1) !important;
	}

	.title {
		font-size: 20px;
		font-weight: bold;
	}

	.f-2-cl {
		color: rgba(130, 142, 161, 1) !important;
	}

	.c-4-bg {
		background-color: rgba(255, 255, 255, 1) !important;
	}

	.noticeDetail {
		background-color: rgba(242, 246, 250, .5) !important;

		.notice-info {
			// background: url(../assets/images/account_center_bg.jpg) no-repeat;
			// background-size: cover;3


			.main-content {
				width: 1180px;
				margin: 120px auto 0;
			}

			.content-text {
				min-height: 680px;
				padding: 40px 60px 60px;
				position: relative;
				border-radius: 2px;
			}

			.menu {
				width: 190px;
				float: left;

				.menu-tit {
					font-size: 16px;
					line-height: 32px;
					margin-bottom: 17px;
					font-weight: 400;
					color: rgba(49, 54, 62, 1) !important;
				}

				.menu-item {
					padding: 15px 25px 15px 20px;
					font-size: 14px;
					line-height: 20px;
					cursor: pointer;
					/*-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;*/
					user-select: none;
					border-radius: 2px;
				}

				.pagination {
					background: none !important;
					border: none !important;
					border-radius: 0 0 2px 2px;

				}

				.pagination-bar {
					border: none !important;
					line-height: 50px;
				}
			}

			.content-box {
				width: 1100px;
				margin-top: 60px;
				padding-left: 50px;
			}
			.moredetail {

					cursor: pointer;

				 span:hover {
					color: #357ce1;
				}
			}

			.account {
				width: 1200px;
				margin: 0 auto;
				padding-top: 30px;
				overflow: hidden;
				min-height: 880px;

				.nav-after {
					display: block;
					height: 10px;
					// background-color: #262a42;
				}

				.account-content {
					width: 100%;
					min-height: 750px;
					// background-color: #181b2a;
					.detailBig {
						padding: 0px 46px 20px;

						.mb30 {
							margin-bottom: 30px;
						}

						.detailContent {
							line-height: 26px;

							p {
								& > * {
									// background-color: #181b2a!important;
								}
							}

						}

						.mt5 {
							margin-top: 5px;
						}
					}

				}

			}
		}
	}
</style>



