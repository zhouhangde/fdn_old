<template>
	<div class="exchange clr-part flex column">
		<ul class="flex handicap ft14">
			<li>{{tabItem[1]}}</li>
		</ul>
		<!--全站交易-->
		<div class="detail clr-part bg-part flex1 pt0 part-bg">
			<div class="content" style="overflow:hidden">
				<ul class="list-title fColor2 ft12 clear bdr-part">
					<li class="fl w12 tl">{{$t('time')}}</li>
					<li class="fl w12 tc">{{$t('price')}}</li>
					<li class="fl w12 tr">{{$t('home.volume')}}</li>
				</ul>
				<!-- 我的实时成交数据 -->
				<div class="containers scroll" v-if="deList.length>0">
					<ul v-for="(itm,index) in deList" class="list-item color ft12" :key="index">
						<li class="clear flex clr-part bg-hov alcenter">
							<span class="tl" style="color: #B0B8DB">{{itm.create_time.substr(11,8)}}</span>
							<span class="tc" :class="itm.way == 2?'red':'green'">{{itm.price}}</span>
							<span class="tr" style="color: #B0B8DB">{{itm.number}}</span>
						</li>
					</ul>
				</div>
				<div class="no_data tc" v-if="deList.length<=0">
					<img src="../../assets/images/nodata.png" alt="">
					<p class="fColor2 ft18">{{$t('nodata')}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "exchange",
		data() {
			return {
				outlist: [],
				inlist: [],
				deList: [], //全站交易
				load: 1,
				newData: 0,
				currency_name: "",
				legal_name: "",
				currency_id: "",
				legal_id: "",
				tabItem: [this.$t('handicap'), this.$t('rtt')],
				is_active: 0,
				now_price: '--',
				now_cny_price: '--',
				change: '',
			};
		},
		created: function () {
			var leverTradeDataMy = window.localStorage.getItem("leverTradeData_my");
			if(leverTradeDataMy!=''&& leverTradeDataMy!=undefined && leverTradeDataMy!=null){
          var localData = JSON.parse(window.localStorage.getItem("leverTradeData_my"));
					this.currency_id = localData.currency_id;
					this.legal_id = localData.legal_id;
			}else{
        if (window.localStorage.getItem("leverTradeData")) {
					var localData = JSON.parse(window.localStorage.getItem("leverTradeData"));
					this.currency_id = localData.currency_id;
					this.legal_id = localData.legal_id;
		   	}
			}

			let that = this;
			var local_lid = window.localStorage.getItem("lever_l_id"),
				local_cid = window.localStorage.getItem("lever_c_id");
			// that.legal_id = localStorage.getItem("lever_legal_id");
			// that.currency_id = localStorage.getItem("lever_currency_id");
			that.legal_name = localStorage.getItem("lever_legal_name");
			that.currency_name = localStorage.getItem("lever_currency_name");

		
			that.buy_sell(that.legal_id, that.currency_id);
			that.connect();

		},
		mounted() {
			var that = this;
		},
		filters: {
			tofixed: function(val) {
				val = Number(val);
				return val.toFixed(2);
			},
			tofixedFour: function(val) {
				val = Number(val);
				return val.toFixed(4);
			},
		},
		sockets: {},
		methods: {
			price(price) {
				eventBus.$emit("toPrice", price);
			},
			// 第一次默认最新价数据
			buy_sell(legals_id, currencys_id) {
				let that = this;
				this.$http({
					url: "/api/" + "transaction/deal_info",
					method: "post",
					data: {
						legal_id: legals_id,
						currency_id: currencys_id
					},
					headers: { Authorization: localStorage.getItem("token") }
				})
					.then(res => {
						if (res.data.type == "ok") {

							that.inlist = res.data.message.in;
							that.outlist = res.data.message.out.reverse();
							that.newData = res.data.message.last_price;
							that.deList = res.data.message.complete;  //实时成交数据
							window.localStorage.setItem('lastPrice',that.newData);
							var buyList = res.data.message.in;
							var sellList = res.data.message.out.reverse();
							var arr1 = [];
							var arr2 = [];
							var arr3 = [];
							var arr4 = [];
							for(var i in buyList){
								arr1[0] = buyList[i].price;
								arr1[1] = buyList[i].number;
								arr2.push(arr1)
							}
							for(var i in sellList){
								arr3[0] = sellList[i].price;
								arr3[1] = sellList[i].number;
								arr4.push(arr3)
							}
						} else if (res.data.type == "999") {
							this.$router.push("/components/login");
						} else {
							layer.msg(res.data.message);
						}
					})
					.catch(error => {
						// console.log(error)
					});
			},
			connect() {
				var that = this;
				// 打开一个 web socket
				var ws = new WebSocket("wss://ws.bitfdn.com/ws");
				ws.onopen = function() {
					var sendData={socket_type:that.currency_id+'/'+that.legal_id+'_lever',subscribed:1} // Web Socket 已连接上，使用 send() 方法发送数据
					sendData = JSON.stringify(sendData)
					ws.send(sendData);
				};
				ws.onmessage = function (evt){
					// console.log(evt)
					var msg = JSON.parse(evt.data);
					if (msg.type == "transaction_lever") {
						that.inlist = JSON.parse(msg.in);
						that.outlist = JSON.parse(msg.out).reverse();
					}
					if (msg.type == "kline") {
						if(msg.kline_type == '1day'){
							that.newData = msg.close
						}
					}
				}
			},
		},


	};
</script>

<style scoped>
	.handicap {
		background: #F6F6F6;
	}

	.handicap li {
		color: #d2d6ec;
		font-size: 14px;
		padding: 8px 10px;
		cursor: pointer;
	}

	.hand_active {
		background: #fff;
		color: #333;
	}

	.exchange {
		height: 100%;
	}

	.title {
		height: 48px;
		line-height: 48px;
		padding: 0 10px 0 30px;
		/* background-color: #181b2a; */
	}

	.content {
		padding: 0 10px;
	}

	.new_price {
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #ccc;
		padding: 0 0 0 20px;
	}

	.exchange_title {
		line-height: 25px;
		position: relative;
		/* color: #637085; */
	}

	.list-item li {
		line-height: 18px;
		overflow: hidden;
	}

	.list-item li span,
	.exchange_title span {
		width: 33.3%;
		display: inline-block;
		float: left;
	}

	.green {
		color: #41B37D;
	}

	.red {
		color: #D74E5A;
	}

	.line {
		height: 5px;
		border-bottom: 1px solid #ccc;
	}

	/********全站交易*******/
	.title {
		height: 48px;
		line-height: 40px;
		padding: 0 10px;
	}

	.tab_title {
		display: inline-block;
		line-height: 30px;
		height: 30px;
	}

	.tab_title span {
		cursor: pointer;
	}

	.tab_title span:not(:last-child) {
		margin-right: 40px;
	}

	.content {
		padding: 0px 10px;
		height: 100%;
	}

	.list-title {
		line-height: 25px;
		position: relative;
		color: #61688a;
		/*line-height: 40px;
		border-bottom: 1px solid #ccc;
		height: 40px;*/
	}

	.list-title li {
		width: 33.3%;
		/* text-align: center; */
	}

	.no_data {
		padding: 50px 0;
	}

	.containers {
		height: 100%;
		overflow: auto;
	}

	.list-item li {
		line-height: 18px;
		display: flex;
	}

	.list-item li span {
		display: inline-block;
		float: left;
		width: 33.3%;
	}

	/* .list-item li:hover{background-color: #eee; color: #de5959;} */
	.list-item li span.green {
		color: #36a792
	}

	.containers ul li {
		display: flex;
		justify-content: space-around;
	}

	.sell_shadow {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 99;
		height: 100%;
		background: rgba(205, 160, 160, 0.2) !important;
	}
</style>
