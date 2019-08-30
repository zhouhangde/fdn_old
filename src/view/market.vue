<template>
	<div class="market clr-part">
		<div class="m_filter">
			<!-- 市场的tab的导航 -->
			<div class="tabtitle ft12 curPer flex around">
				<!-- <span class="active">JNB</span> -->

				<!-- <span class="active">USDT</span>
                <span>JNB</span>
                <span>JNB</span> -->
				<span @click="showAdd=true" :class="['mock-a',{'active': showAdd}]">{{$t('home.myMarkets')}}</span>
				<span v-for="(tab,index) in tabList" :key="index"
					  :class="['mock-a',{'active': (index == isShow&&!showAdd)}]"
					  @click="changeType(index,tab.name,tab.id)">{{tab.name}}</span>
			</div>
		</div>
		<!-- 搜索框 -->
		<div class="m_title  flex" >
			<!--			<span style="width:100px">{{$t('market.market')}}</span>-->
			<el-input v-model="keyword" size="mini" class="clr-part" clearable :placeholder="$t('inpCur')"></el-input>
		</div>
		<div class="coin-title clear clr-part">
			<div>
				<div class="flex tc " style="justify-content: center" @click="arrSort('at')">
					<span style="color: #61688a;">{{$t('market.currency')}}</span>
					<div class="down-up">
						<div :class="['el-icon-caret-top curPer',{bold:sortKey == 'at'&&directions == 'up'}]"
							 @click="directions = 'up';arrSort('at','up')"></div>
						<div :class="['el-icon-caret-bottom curPer',{bold:sortKey == 'at'&&directions == 'down'}]"
							 @click="directions = 'down';arrSort('at','down')"></div>
					</div>
				</div>
				<!-- <img src="../assets/images/select0.png" alt=""> -->
			</div>
			<div>
				<div class="flex tc" style="justify-content: flex-end" @click="arrSort('now_price')">
					<span style="color: #61688a;">{{$t('market.lastprice')}}</span>
					<div class="down-up">
						<div :class="['el-icon-caret-top curPer',{bold:sortKey == 'now_price'&&directions == 'up'}]"
							 @click="directions = 'up';arrSort('now_price','up')"></div>
						<div
							:class="['el-icon-caret-bottom curPer',{bold:sortKey == 'now_price'&&directions == 'down'}]"
							@click="directions = 'down';arrSort('now_price','down')"></div>
					</div>
				</div>
				<!-- <img src="../assets/images/select0.png" alt=""> -->
			</div>
			<div>
				<div class="flex tc" style="justify-content: flex-end" @click="arrSort('change')">
					<span style="color: #61688a; ">{{$t('market.change')}}</span>
					<div class="down-up">
						<div :class="['el-icon-caret-top curPer',{bold:sortKey == 'change'&&directions == 'up'}]"
							 @click="directions = 'up';arrSort('change')"></div>
						<div :class="['el-icon-caret-bottom curPer',{bold:sortKey == 'change'&&directions == 'down'}]"
							 @click="directions = 'down';arrSort('change')"></div>
					</div>
				</div>
				<!-- <img src="../assets/images/select0.png" alt=""> -->
			</div>
		</div>
		<!-- <div class="line"></div> -->
		<ul class="coin-wrap scroll theScroll">
			<li v-for="(market,index) in marketList" :key="index">
				<p v-for="(itm,idx) in market" :key="itm.id"
				   v-if="search(itm.currency_name)&&testItem(itm.legal_name,itm.added)"
				   :class="{'bg-hov':true,'bg-even':idx%2 !=0,'bg-sel':(idx===ids)||(currency_index==itm.currency_name&&legal_index==itm.legal_name)}"
				   :data-id='itm.id' :data-index='idx'
				   @click="quota_shift(idx,itm.currency_id,itm.legal_id,itm.currency_name,itm.legal_name,itm,index,market,itm.now_price,itm.change,itm.volume,$event)">
					<span class="w36"><img :src="itm.logo" class="hide" alt=""><i>
						<span class="  el-icon-star-on star" v-if="itm.added"
							  @click="addDelete('user_delete',itm.thisid)"></span>
					<span class="  el-icon-star-off star" v-if="!itm.added"
						  @click="addDelete('user_add',itm.thisid)"></span>
						<em class="deep_blue bold blue_clr" style="margin-left: 10px">{{itm.currency_name}}</em><!--<em
						class="light_blue bold blue_clr">/{{itm.legal_name}}</em>--></i></span>
					<span class="w30 tr deep_blue bold nowPrice blue_clr" :data-name='itm.currency_id+"/"+itm.legal_id'>{{itm.now_price || 0}}</span>
					<span :class="{'green':itm.change>=0,'red':itm.change<0}" class="bold">{{(itm.change>0?'+':'')+(itm.change-0).toFixed(2)}}%</span>
					<!--<span class="  el-icon-star-on star" v-if="itm.added"
						  @click="addDelete('user_delete',itm.thisid)"></span>
					<span class="  el-icon-star-off star" v-if="!itm.added"
						  @click="addDelete('user_add',itm.thisid)"></span>-->
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "market",
		data() {
			return {
				ids: 0,
				isShow: 0,
				tabList: [],
				marketList: [],
				newData: ["HQ", "$0.076128", "-1.11%"],
				legal_index: "",
				currency_index: "",
				leverTradeDatas: "",
				exName: "",
				currency_name: "",
				legal_name: "",
				directions: '',
				sortKey: 'none',
				myAdd: [],
				token: '',
				nowLegal: '',
				showAdd: false,
				keyword: ''
			};
		},
		created: function () {
			// this.init();
			// this.getList()
			this.token = localStorage.getItem("token") || "";
			//法币列表
			if (this.token) {
				this.getMyAdd()
			} else {
				this.getList()
			}

		},
		mounted() {
			var that = this;
		},
		methods: {
			search(name) {
				var l = this.keyword.length;
				if (l) {
					if (l > name.length) {
						return false;
					} else {
						if (name.slice(0, l) == this.keyword.toUpperCase()) {
							return true;
						} else {
							return false;
						}
					}
				} else {
					return true;
				}

			},
			testItem(name, added) {

				if (this.showAdd) {
					return added
				} else {
					return name == this.nowLegal
				}
			},
			getMyAdd() {
				if (this.token) {

					this.$http({
						url: '/api/match/my_match',
						params: {
							type: 'change'
						},
						headers: {Authorization: this.token}
					}).then(res => {
						if (res.data.type == 'ok') {
							var list = res.data.message;
							this.myAdd = list;

							this.getList();
						}
					})
				} else {
					layer.msg('请先登录')
				}
			},
			addDelete(url, id) {
				if (this.token) {

					this.$http({
						url: '/api/match/' + url,
						method: 'post',
						data: {id: id},
						headers: {Authorization: this.token}
					}).then(res => {
						layer.msg(res.data.message);
						this.getMyAdd()
					})
				} else {
					if (this.$i18n.locale == 'zh') {

						layer.msg('请先登录')
					} else {
						layer.msg('Please sign in')
					}
				}
			},
			getList() {
				var load = layer.load();
				this.$http({
					url: "/api/" + "currency/change_match",
					method: "get",
					data: {}
				}).then(res => {
					layer.close(load);
					if (res.data.type == "ok") {
						this.tabList = res.data.message;
						var msg = res.data.message;
						if (this.myAdd.length) {

							msg.forEach((item, index) => {
								this.myAdd.forEach((ite, ind) => {
									if (item.legal_id == ite.legal_id) {
										item.array.find((c) => {
											return c.currency_id == ite.currency_id;
										}).added = true
									}
								})
							})
						}
						var arr_quota = [];
						for (var i = 0; i < msg.length; i++) {
							arr_quota[i] = msg[i].array;
						}
						this.marketList = arr_quota;
						// this.$store.state.priceScale = Math.pow(
						//   10,
						//   this.marketList[0][0].now_price
						//     ? this.marketList[0][0].now_price.length
						//     : 0
						// );
						if (this.exName == "") {
							this.exName = this.tabList[0].name;
						}
						this.currency_name = msg[0].name;
						// this.nowLegal = msg[0].name;
						this.$store.state.priceScale = 100000;

						//默认法币id和name和行情交易对
						if (!window.localStorage.getItem("tradeData")) {
							//console.log(arr_quota)
							this.$store.state.symbol =
								arr_quota[0][0].currency_name + "/" + arr_quota[0][0].legal_name;
							var legal_id = arr_quota[0][0].legal_id;
							var currency_id = arr_quota[0][0].currency_id;
							var legal_name = arr_quota[0][0].legal_name;
							this.legal_name = arr_quota[0][0].legal_name;
							this.nowLegal = arr_quota[0][0].legal_name;
							var currency_name = arr_quota[0][0].currency_name;
							this.currency_name = arr_quota[0][0].currency_name;
							var now_price = arr_quota[0][0].now_price;
							var leverTradeDatas = {
								currency_id: currency_id,
								legal_id: legal_id,
								currency_name: currency_name,
								legal_name: legal_name,
								now_price: now_price
							};
						} else {
							var localData = JSON.parse(window.localStorage.getItem("tradeData"));
							this.$store.state.symbol =
								localData.currency_name + "/" + localData.legal_name;
							this.nowLegal = localData.legal_name;
							this.legal_name = localData.legal_name;
							this.currency_name = localData.currency_name;
							var leverTradeDatas = {
								currency_id: localData.currency_id,
								legal_id: localData.legal_id,
								currency_name: localData.currency_name,
								legal_name: localData.legal_name,
								now_price: arr_quota[0][0].now_price
							};
							this.ids = "a";
							this.isShow = localData.isShow;
							this.isShow = 0;
							this.showAdd = false;
							this.legal_index = localData.legal_name;
							this.currency_index = localData.currency_name;
						}

						//组件间传值
						setTimeout(() => {
							eventBus.$emit("toTrade0", leverTradeDatas);
						}, 1000);
						setTimeout(() => {
							eventBus.$emit("toExchange0", leverTradeDatas);
						}, 1000);
						// socket连接
						this.connect();
					}
				}).catch(res => {
					layer.close(load);
				});
			},
			arrSort(k, d) {
				d = this.directions;

				this.sortKey = k;
				this.marketList[this.isShow].sort(function (a, b) {
					if (k == 'at') {
						if (d == 'up') {

							return a.currency_name.charCodeAt() - b.currency_name.charCodeAt()
						} else {
							return b.currency_name.charCodeAt() - a.currency_name.charCodeAt()

						}

					} else {
						if (d == 'up') {

							return a[k] - b[k];
						} else {
							return b[k] - a[k];
						}

					}
				})

			},
			// socket封装
			connect() {
				var that = this;
				var localData = JSON.parse(window.localStorage.getItem("tradeData"));
				// 打开一个 web socket
				var ws = new WebSocket("wss://ws.bitfdn.com/ws");

				ws.onopen = function () {
					//console.log('market链接成功')
					// Web Socket 已连接上，使用 send() 方法发送数据
					var sendData = {socket_type: 'daymarket', subscribed: 1}
					sendData = JSON.stringify(sendData)
					ws.send(sendData);
				};

				ws.onmessage = function (evt) {
					var msg = JSON.parse(evt.data);
					if (msg.type == "daymarket") {
						// //console.log(msg,that.currency_name,'----------',that.legal_name)
						if (that.currency_name == msg.currency_name && that.legal_name == msg.legal_name) {   //当前交易对行情存储本地
							eventBus.$emit('change', msg.change);  //实时向tv组件传递折合cny
							eventBus.$emit('now_cny_price', msg.now_cny_price);
						}
						// //console.log(that.marketList)
						$.each(that.marketList, function (k, v) {   //行情实时推送赋值
							$.each(v, function (i, j) {
								if (j.currency_id == msg.currency_id && j.legal_id == msg.legal_id) {
									j.now_price = msg.now_price;
									j.change = msg.change;

								}

							})
						})
						var lists = that.marketList;
						that.marketList.forEach(function (item, index) {
							var i = item.findIndex(function (ite, inde) {
								return ite.currency_id == msg.currency_id && ite.legal_id == msg.legal_id;
							})
							if (i != -1) {
								item[i].now_price = msg.now_price;
								item[i].change = (msg.change - 0).toFixed(2);
							}
						})
					}
				};
				ws.onclose = function () {
					//console.log('=============================');
					that.connect();
				};
			},
			changePair(list, index, market) {
				if (list.now_price != null) {
					let arr = list.now_price.split(".")[1];
					this.$store.state.priceScale = Math.pow(10, arr.length); //根据最新价小数点后几位改变价格精度
					this.$store.state.symbol = list.name + "/" + this.exName; //交易对
				}

				//	this.$store.state.symbol=list.name+'/'+this.exName
			},
			changeType(index, legal_name, currency_id) {
				this.nowLegal = legal_name;
				this.showAdd = false;
				this.directions = '';
				this.sortKey = '';
				this.isShow = index;
				// this.legal_index='';
				this.ids = "a";
				this.exName = legal_name;
				this.legal_name = legal_name;
				this.currency_id = currency_id;
			},
			getSymbols(callback) {
				if (this.address.length <= 0) {
					return false;
				}
				this.$http({
					url: "/api/" + "wallet/list?user_id=" + this.address || "",
					type: "GET"
				})
					.then(res => {
						// //console.log(res)
						if (res.data.type == "ok") {
							this.accountInfo = res.data.message;
							this.dataList = res.data.message.list;
							// //console.log(this.dataList)
							callback && callback();
						} else {
							// //console.log(123)
							// alert(res.message)
						}
					})
					.catch(error => {
						return error;
					});
			},
			init() {
				// var index=layer.load();
				this.address = localStorage.getItem("address") || "";
				this.$http({
					url: "/api/" + "quotation",
					method: "post",
					data: {
						address: this.address
					}
				})
					.then(res => {
						// layer.close(index);
						// //console.log(res)
						if (res.data.type == "ok") {
							this.getSymbols(() => {
								this.marketList = res.data.message.coin_list;
								//console.log(this.marketList);
								for (var i in this.dataList) {
									for (var j in this.marketList) {
										// //console.log(this.dataList[i].name,this.marketList[j].symbol,this.dataList[i].name==this.marketList[j].symbol)

										if (this.dataList[i].name == this.marketList[j].symbol) {
											// //console.log(1)
											this.marketList[j].type = this.marketList[j].type || 1;
										} else {
											this.marketList[j].type = this.marketList[j].type || 0;
										}
									}
								}
								// //console.log(this.marketList)
							});
						} else {
							// layer.msg(res.data.message)
						}
					})
					.catch(error => {
					});
			},
			//币种切换

			quota_shift(
				idx,
				currency_id,
				legal_id,
				currency_name,
				legal_name,
				list,
				index,
				market,
				now_price,
				change,
				volume,
				event
			) {
				$('.coin-wrap').children().eq(index).children().eq(idx).children().eq(1).text();
				// idx,currency_id,legal_id,currency_name,legal_name,list,index,market

				this.ids = idx;
				this.legal_index = "";
				this.currency_index = "";
				if (list.now_price == null || list.now_price == "0") {
					list.now_price = "0.0";
				}
				var len = list.now_price.split('.').length;
				if (len <= 1) {
					list.now_price = list.now_price + '.0'
				}
				let arr = (list.now_price + "").split(".")[1];

				this.$store.state.priceScale = Math.pow(10, arr.length); //根据最新价小数点后几位改变价格精度
				this.$store.state.symbol = currency_name + "/" + legal_name; //交易对
				var leverTradeDatas = {
					currency_id: currency_id,
					legal_id: legal_id,
					currency_name: currency_name,
					legal_name: legal_name,
					isShow: this.isShow,
					now_price: now_price,
					change: change,
					volume: volume
				};
				var sco_price = $('.coin-wrap').children().eq(index).children().eq(idx).children().eq(1).text()
				//向exchange组件传最新价
				eventBus.$emit("toexchangeNowprice", sco_price);
				//向兄弟组件传数据
				eventBus.$emit("toTrade", leverTradeDatas);
				eventBus.$emit("toExchange", leverTradeDatas);
				eventBus.$emit('currency_name', currency_name)
				// 存本地
				window.localStorage.setItem("tradeData", JSON.stringify(leverTradeDatas));
			}
		}
	};
</script>

<style scoped>
	.coin-wrap li span.star {
		width: 10%;
		line-height: 30px;
		font-size: 14px;
	}

	.m_title {
		/*line-height: 30px;
		padding: 0 20px;
		position: relative;
		width: 100%;*/
		/*float: left;*/
		margin-top: 8px;
		margin-bottom: 8px;
		-webkit-box-pack: start;
		/*-ms-flex-pack: start;*/
		justify-content: flex-start;
	}

	.m_search input {
		border-radius: 3px;
		background: transparent;
		border: 1px solid #52688c;
		line-height: 25px;
	}

	/* .m_search{position: absolute;width: 146px;right: 20px;top: -4px;height: 26px;border-radius: 3px;padding: 4px 8px 4px 0;} */
	/* .m_search input{position: absolute;left: 0;top: 10px;z-index: 2;width: 100%;padding: 5px 40px 5px 8px;height: 26px;border-radius: 3px;background: transparent;border: 1px solid #52688c;} */
	.m_search img {
		width: 16px;
		height: 15px;
		position: absolute;
		right: 35px;
		top: 20px;
		z-index: 123;
	}

	.mock-a {
		float: left;
		height: 22px;
		font-size: 12px;
		line-height: 22px;
		padding: 0 4px;
		margin: 0 6px 6px 0;
		border-radius: 2px;
		border-bottom: 0;
	}

	.m_filter {
		padding: 0px 0 0px;
	}

	.tabtitle {
		padding: 8px 8px 0px 16px;;
	}

	.tabtitle span {
		flex: 1;
		text-align: center;
		padding: 3px 10px;
		border-bottom: 0px solid #ccc;
	}

	.tabtitle .mock-a {
		float: left;
		/*height: 22px;*/
		font-size: 12px;
		line-height: 22px;
		padding: 0 4px;
		margin: 0 6px 6px 0;
		border-radius: 2px;
		border-bottom: 0;
		color: #7085ac;
	}
	.tabtitle .active {
		background-color: #357ce1;
		color: #fff !important;
		/*border: 1px solid #ccc;
		border-bottom: none;*/
	}

	.coin-title .el-icon-caret-top{
		height: 5px;
		position: relative;
		top: 5px;
	}

	.coin-title .el-icon-caret-bottom{
		height: 5px;
		position: relative;
		top: 6px;
	}

	.coin-title .flex {
		/*justify-content: center;*/
	}

	.coin-title > div {
		width: 30%;
		height: 36px;
		line-height: 36px;
		/*text-align: center;*/
		justify-content: left;
		float: left;
		font-size: 12px;
	}

	.down-up {
		padding-top: 4px;
		font-size: 14px;
	}

	.down-up div {
		color: #363c4e;;
		display: block;
	}

	.down-up .bold {
		font-weight: bold;
		color: #61688a;;
	}

	.line {
		width: 90%;
		margin: 0px auto;
		border-bottom: 1px solid rgb(48, 59, 75);
	}

	.coin-wrap {
		height: 690px;
		overflow-y: auto;
		/* background-color: #FFF */
	}

	.coin-wrap li p:nth-child(even) {
		/* background: #f8f8f8; */
	}

	.coin-wrap li p:hover {
		/* background: #eee; */
	}

	.coin-wrap li {
		/* height: 30px; */
		line-height: 30px;
		cursor: pointer;
		font-size: 12px;
	}

	.coin-wrap li span {
		display: inline-block;
		width: 30%;
		float: left;
		text-align: right;
		height: 30px;
	}

	.coin-wrap li span.w36 {
		width: 30%;
	}

	.coin-wrap li span.w36 i {
		padding-left: 5px;
	}

	.coin-wrap li span.w30 {
		width: 30%;
		text-align: right;
	}

	.coin-wrap li span:first-child {
		/* padding-left: 18px; */
		font-size: 12px;
		text-align: left;
		/* display: flex; */
	}

	.coin-wrap li span:first-child img {
		margin-right: 2px;
		width: 16px;
		vertical-align: sub;
	}

	.coin-wrap li span:first-child i {
		font-style: normal;
		display: inline-block;
		min-width: 40px;
	}

	.coin-wrap li span:last-child {
		color: #D74E5A;
	}

	/* .coin-wrap li:nth-child(odd){background-color: #181b2a;} */
	.coin-wrap li span.green {
		color: #41B37D;
	}

	.coin-wrap li p {
		overflow: hidden;
		padding: 0px 0;
		/* background-color: #171b2b; */
	}

	.active_p {

	}
    
	/*滚动条样式*/
	.theScroll::-webkit-scrollbar{
		width: 6px;
	}

	.theScroll::-webkit-scrollbar-thumb{
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
		background: rgba(235, 233, 233,0.2);
	}

	.theScroll::-webkit-scrollbar-track{
		-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
		border-radius: 10px;
		background: rgba(0,0,0,0.1);
	}
</style>
