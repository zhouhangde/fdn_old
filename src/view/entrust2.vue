<template>
	<div class="entrust clr-part">
<!--		<div class="flex" style="height: 650px">-->
		<div class="flex" >
			<div class="left w80 bgWhite">
				<div class="title titles">
					<div class="tab_title clr-part bold ">
						<span v-for="(url,index) in urlList" :class="{'': index == isUrl}" class="cor1 titles"
							  @click="changeType(index,url.url)">{{url.title}}</span>
					</div>
					<!-- <div class="tab_title fr ft12" v-if="isUrl == 0">
                        <span v-for="(way,index) in wayList" :class="{'active': index == isChoosed}" @click="wayChoose(index,way.type)">{{way.title}}</span>
                    </div>
                    <div class="tab_title fr ft12 hide" v-if="isUrl == 1">
                        <span v-for="(way,inde) in wayList" :class="{'active': inde == isChoosed02}" @click="wayChoose02(inde,way.type)">{{way.title}}</span>
                    </div> -->
				</div>
				<div class="content blue_content">
					<ul class="list-title fColor2 ft12 clear bdr-part">
						<li class="fl w20">{{$t('time')}}</li>
						<li class="fl w12">{{$t('center.pairs')}}</li>
						<li class="fl w8">{{$t('center.direction')}}</li>
						<li class="fl w10">{{$t('price')}}</li>
						<li class="fl w10">{{$t('number')}}</li>
						<li class="fl w10">{{$t('dealed')}}</li>
						<li class="fl w10">{{$t('notdeal')}}</li>
						<li class="fl w12">{{$t('center.dealtotal')}}</li>
						<li class="fl w8 tr">{{$t('do')}}</li>
					</ul>
					<!---当前委托-->
					<div class="container scroll">
						<ul class="list-item ft12" v-if="enList01.length>0">
							<li v-for="item in enList01" class="clear buy_list">
								<span class="fl w20">{{item.create_time}}</span>
								<span class="fl w12">{{item.currency_name}}/{{item.legal_name}}</span>
								<span class="fl w8" :class="{'green':item.way_int == 1,'redColor':item.way_int == 2}">{{item.way}}</span>
								<span class="fl w10">{{item.price}}</span>
								<span class="fl w10">{{item.total_number}}</span>
								<span class="fl w10">{{item.deal_number}}</span>
								<span class="fl w10">{{item.number}}</span>
								<span class="fl w12">{{item.total_price}}</span>
								<span class="fl w8 tr curPer ceilColor" @click="revoke(item.thisid,item.way_int)">{{$t('revoke')}}</span>
							</li>
						</ul>
						<div class="getmore tc fColor1 ft14 mt10 curPer" @click="getMore"
							 v-if="!loading && enList01.length>9||enList02.length>9">{{more}}
						</div>
						<div class="tc" v-if="loading">
							<img src="@/assets/images/loading.gif" alt="" class="lodw20">
							<p class="ft12 baseColor">{{$t('loading')}}...</p>
						</div>
						<div class="no_data tc" v-if="flags01==true && enList01.length<=0">
							<img src="@/assets/images/nodata.png" alt="">
							<p class="fColor2 ft18">{{$t('nodata')}}</p>
						</div>
						<div class="no_data tc" v-if="flags02==true && enList02.length<=0">
							<img src="@/assets/images/nodata.png" alt="">
							<p class="fColor2 ft18">{{$t('nodata')}}</p>
						</div>
						<div class="no_data tc"
							 v-if="enList01.length<=0 && enList02.length<=0 && flags01==false&&flags02 == false">
							<img src="@/assets/images/nodata.png" alt="">
							<p class="fColor2 ft18">{{$t('nodata')}}</p>
						</div>
					</div>

				</div>
				<!--历史委托&&币种信息-->
				<div class="content " style="height: 6px; background-color:#252a44 !important ">

				</div>
				<!---历史委托--->
				<div>
					<div class="his cor1 bold titles">{{$t('header.his')}}</div>
					<div class="content blue_content">
						<ul class="list-title fColor2 ft12 clear bdr-part">
							<li class="fl w18">{{$t('time')}}</li>
							<li class="fl w10">{{$t('center.pairs')}}</li>
							<li class="fl w8">{{$t('center.direction')}}</li>
							<li class="fl w10">{{$t('price')}}</li>
							<li class="fl w8">{{$t('number')}}</li>
							<li class="fl w8">{{$t('center.dealtotal')}}</li>
							<li class="fl w10">{{$t('center.tprice')}}</li>
							<li class="fl w10">{{$t('status')}}</li>
							<li class="fl w15 tr">{{$t('rate')}}</li>

						</ul>
						<div class="container scroll" v-if="hisList.length>0">
							<ul class="list-item ft12">
								<li v-for="item in hisList" class="clear his_list">
									<span class="fl w18">{{item.create_time}}</span>
									<span class="fl w10">{{item.currency_name}}/{{item.legal_name}}</span>
									<span class="fl w8 "
										  :class="{'green':item.way == '买入','redColor':item.way == '卖出'}">{{item.way=="买入"?$t('center.inbuy'):$t('center.outsell')}}</span>
									<span class="fl w10">{{item.price}}</span>
									<span class="fl w8">{{item.number}}</span>
									<span class="fl w8">{{(item.price * item.number) | numFilter}}</span>
									<span class="fl w10">{{item.price}}</span>
									<span class="fl w10">{{$t('center.contran')}}</span>
									<!-- <span class="fl w10">{{item.type=='in'? item.buyFee||$t('center.nothing'):item.sellFee||$t('center.nothing')}}</span> -->
									<span class="fl w15 tr">{{item.fee}}</span>
									<!-- <span class="fl w8 tr" :class="item.type=='out'?'redColor':''">{{item.type=='in'?$t('center.inbuy'):$t('center.outsell')}}</span> -->

								</li>
							</ul>
							<div class="getmore tc fColor1 ft14 mt10 curPer" @click="getMore01"
								 v-if="!loading && hisList.length>9">{{more01}}
							</div>
							<div class="tc" v-if="loading01">
								<img src="@/assets/images/loading.gif" alt="" class="lodw20">
								<p class="ft12 baseColor">{{$t('loading')}}...</p>
							</div>
						</div>
						<div class="no_data tc" v-if="hisList.length<=0">
							<img src="@/assets/images/nodata.png" alt="">
							<p class="fColor2 ft18">{{$t('nodata')}}</p>
						</div>
					</div>
				</div>
			</div>
			<!--币种信息-->
			<div class="right w20 bgWhite ptb20 plr10 blue_content">
				<p class="cor1 bold ft14 titles">{{$t('info')}}</p>
				<p class="flex alcenter ptb10 between ft12"><span class="gray_cor">{{$t('bname')}}</span><span
					class="gray_blue bold">{{c_info.zh_name}}</span></p>
				<p class="flex alcenter ptb10 between ft12"><span class="gray_cor">{{$t('tpc.time')}}</span><span
					class="gray_blue bold">{{c_info.publish_time}}</span></p>
				<p class="flex alcenter ptb10 between ft12"><span class="gray_cor">{{$t('tpc.total')}}</span><span
					class="gray_blue bold">{{c_info.publish_total}}</span></p>
				<p class="flex alcenter ptb10 between ft12"><span class="gray_cor">{{$t('totalc')}}</span><span
					class="gray_blue bold">{{c_info.online_total}}</span></p>
				<p class="flex alcenter ptb10 between ft12"><span class="gray_cor">{{$t('cfprice')}}</span><span
					class="gray_blue bold">{{c_info.cf_price}}</span></p>
				<p class="flex alcenter ptb10 between ft12"><span class="gray_cor">{{$t('link')}}</span><a
					:href="c_info.ow_url" target="_blank" class="gray_blue bold">{{$t('tpc.web')}}</a><a
					:href="c_info.wp_url" target="_blank" class="gray_blue bold">{{$t('tpc.book')}}</a><a
					:href="c_info.search_url" target="_blank" class="gray_blue bold">{{$t('query')}}</a></p>
				<p class="ptb10 gray_cor ft12">{{$t('legaltrade.desc')}}</p>
				<p class="text_cor ft12 introduce">{{c_info.content}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "entrust",
		data() {
			return {
				address: "",
				isChoosed: 0,
				isChoosed02: 0,
				isUrl: 0,
				page: 0,
				page01: 0,
				url: "entrust",
				type: "in",
				more: this.$t('more'),
				more01: this.$t('more'),
				loading: false,
				loading01: false,
				urlList: [
					{title: this.$t('center.cdel'), url: "transaction/my_now_list"},
					// { title: this.$t('center.hdeal'), url: "transaction/my_list" }
				],
				wayList: [{title: this.$t('center.inbuy'), type: "in"}, {
					title: this.$t('center.outsell'),
					type: "out"
				}],
				enList: [],
				enList01: [],
				enList02: [],
				hisList: [],
				urls: "transaction/my_now_list",
				types: "in",
				flags01: true,
				flags02: false,
				his_type: 'complete',
				legalId: '',
				currencyId: '',
				c_info: '', //币种信息
				token: ""
			};
		},
		created() {
			this.address = localStorage.getItem("address") || "";
			this.token = localStorage.getItem("token") || "";
			//  this.getdata('transaction_in');

		},
		methods: {
			changeType(index, url) {
				this.isUrl = index;
				this.url = url;
				this.page = 0;
				this.more = this.$t('more');
				if (index == 0) {
					this.getdata(this.urls, this.types);
				} else if (index == 1) {
					this.getHistory();
				}
			},
			wayChoose(index, type) {
				var that = this;
				this.page = 0;
				// this.type = type;
				this.more = this.$t('more');
				this.isChoosed = index;
				if (index == 1) {
					this.flags02 = true;
					this.flags01 = false;
					this.urls = "transaction/my_now_list";
					this.types = "out";
					this.getdata(this.urls, this.types);
				} else if (index == 0) {
					this.flags02 = false;
					this.flags01 = true;
					this.urls = "transaction/my_now_list";
					this.types = "in";
					this.getdata(this.urls, this.types);
				} else if (index == 2) {
					if (this.enList02.length > 0) {
						this.flags02 = true;
					} else {
						this.flags02 = false;
					}
					if (this.enList01.length > 0) {
						this.flags01 = true;
					} else {
						this.flags01 = false;
					}
					this.getdata("transaction/my_now_list", "in");
					this.getdata("transaction/my_now_list", "out");
				}
			},
			wayChoose02(index, type) {
				this.isChoosed02 = index;
				if (index == 0) {
					this.his_type = 'complete'
				} else if (index == 1) {
					this.his_type = 'complete'
				} else if (index == 2) {
					this.his_type = 'complete';
				}
				this.page01 = 0;
				this.getHistory();
			},
			getMore() {
				this.page++;
				this.loading = true;
				this.getdata("transaction/my_now_list", "in");
				//  this.getdata("transaction/my_now_list", "out");
			},
			getMore01() {
				this.page01 = ++this.page01;
				this.loading01 = true;
				this.getHistory();
			},
			revoke(id, way) {

				if (!this.token) {
					return;
				}
				var that = this;
				layer.confirm(that.$t('lay.revoke'), {btn: [that.$t('lay.sure'), that.$t('lay.ceil')]}, () => {
					// var id = id;
					that
						.$http({
							url: "/api/" + "transaction/revoke",
							method: "post",
							data: {
								// address:that.address,
								type: way == 1 ? 'in' : 'out',
								id: id
							},
							headers: {Authorization: this.token}
						})
						.then(res => {
							res = res.data;
							if (res.type === "ok") {
								layer.msg(res.message);
								that.getdata(that.urls, that.types);
							} else {
								layer.msg(res.message);
							}
						})
						.catch(error => {
						});
				});
			},

			getdata(url, type) {
				var that = this;
				var page = this.page;
				if (!this.token) {
					return;
				}
				this.$http({
					url: "/api/" + url,
					method: "post",
					data: {
						page: page,
						currency_id: this.currencyId,
						legal_id: this.legalId
					},
					headers: {Authorization: localStorage.getItem('token')}
				})
					.then(res => {
						res = res.data;
						this.loading = false;
						let mlist = [];
						if (res.type == "ok") {
							mlist = res.message.data;

						}

						//  page = 1;
						//  this.enList = []
						if (page == 0) {
							that.enList01 = mlist;

						} else {
							var newEist = mlist;
							if (newEist.length <= 0) {
								this.more = that.$t('nomore');
								return;
							} else {
								this.enList01 = this.enList01.concat(newEist);
							}
							// conaole.log(this.enList)
						}
						for (var i in this.enList01) {
							this.enList01[i].typeInfo = type;
						}

					})
					.catch(error => {
					});
			},
			//历史委托
			getHistory() {
				if (!this.token) {
					return;
				}
				var legal_id = window.localStorage.getItem('legal_id');
				var currency_id = window.localStorage.getItem('currency_id')
				var page01 = this.page01;
				this.$http({
					url: "/api/" + "transaction/my_history_list",
					method: "post",
					data: {
						page: page01,
						currency_id: this.currencyId,
						legal_id: this.legalId
					},
					headers: {Authorization: localStorage.getItem('token')}
				})
					.then(res => {
						this.loading01 = false;
						let mlist = [];
						if (res.data.type == 'ok') {
							mlist = res.data.message.data;
						}
						if (page01 == 0) {
							this.hisList = mlist;
						} else {
							var newhist = mlist;
							if (newhist.length <= 0) {
								this.more = that.$t('nomore');
								return;
							} else {
								this.hisList = this.hisList.concat(newhist);
							}
							// conaole.log(this.enList)
						}
					})
					.catch(error => {
					});
			},
			//币种信息
			getCurrencyInfo() {
				this.$http({
					url: '/api/currency/info',
					params: {id: this.currencyId}
				}).then(res => {
					this.c_info = res.data.message;
					this.c_info.publish_time = res.data.message.publish_time.substr(0, 10);
				})
			},
		},
		mounted() {
			var that = this;
			// //console.log('entrust2')

			// that.getdata(this.urls, this.types);
			// eventBus.$on("toTrade", function() {
			//   that.isUrl = 0;
			//   that.isChoosed = 0;
			//   that.getdata(that.urls, that.types);
			// });


			eventBus.$on('tradeOk', function (data) {   //买卖完成后推送更新当前委托和历史委托
				if (data.status == 'ok') {
					if (that.token) {
						that.page = 0;
						that.page01 = 0;
						setTimeout(() => {
							that.getHistory();
							that.getdata(that.urls, this.types);
						}, 2000)
					}

				}
			});
			//切换币种时接收传值
			eventBus.$on('toTrade', msg => {
				if (msg) {
					that.legalId = msg.legal_id;
					that.currencyId = msg.currency_id;
					if (this.token != "") {
						this.getHistory();
						that.getdata(this.urls, this.types);
					}
					that.getCurrencyInfo();
				}
			});
			//默认币种传值
			eventBus.$on('toTrade0', msg => {
				if (msg) {
					that.legalId = msg.legal_id;
					that.currencyId = msg.currency_id;
					if (this.token != "") {
						this.getHistory();
						that.getdata(this.urls, this.types);
					}
					that.getCurrencyInfo();
				}
			})
		}
	};
</script>
<style scoped>
	.entrust {
		color: #333;
	}

	.his {
		line-height: 36px;
		/*padding: 30px;*/
		background: #f6f6f6;
	}

	.title {
		/* height: 48px;
        line-height: 46px; */
		/* padding: 0 40px 0 30px; */
		line-height: 36px;
		background: #f6f6f6;
	}

	.tab_title {
		display: inline-block;
		/* line-height: 46px;
        height: 46px; */
	}

	.tab_title span {
		cursor: pointer;
	}

	.tab_title span:not(:last-child) {
		margin-right: 40px;
	}

	.content {
		padding: 0 40px 0 30px;
		height: 320px;
	}

	.list-title {
		line-height: 40px;
		/* border-bottom: 1px solid #ccc; */
		height: 40px;
		overflow: hidden;
	}

	.no_data {
		padding: 50px 0;
	}

	.container {
		height: 90%;
		overflow: auto;
	}

	.list-item li {
		line-height: 40px;
	}

	.list-item li span {
		display: inline-block;
		float: left;
	}

	.list-item li span:nth-child(3) {
		/* color: #cc4951; */
	}

	.list-item li:hover {
	}

	.list-item li span.green {
		color: #55a067;
	}

	.buy_list:nth-child(odd) {
		background: #fafafc;
	}

	.out_list:nth-child(odd) {
		background: #fafafc;
	}

	.his_list:nth-child(odd) {
		background: #fafafc;
	}

	.left {
		margin-right: 6px;
	}

	.introduce {
		line-height: 2;
	}
</style>


