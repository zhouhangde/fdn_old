<template>
	<div class="exchange">
		<!-- <div class="title fColor1">交易所</div> -->

		<div class="content fColor1">
			<div class="new_price">
				<span class="ft14">{{$t('center.newprice')}} {{newData | tofixedFour}}</span>
			</div>
			<div class="exchange_title ft12 clear tc">
				<span>{{$t('center.direction')}}</span>
				<span>{{$t('price')}}</span>
				<span>{{$t('number')}}</span>
			</div>
			<ul class="list-item ft12 tc">
				<li class="curPer" v-for="(out,index) in outlist" :key="out.id" @click="price(out[0])">
					<span class="red">{{$t('center.sellout')}} {{outlist.length-index}}</span>
					<span>{{out.price | tofixedFour}}</span>
					<span>{{out.number | tofixed}}</span>
				</li>
				<div class="line"></div>
				<li class="curPer" v-for="(buy,index) in inlist" :key="index" @click="price(buy[0])">
					<span class="green">{{$t('center.buyin')}} {{index+1}}</span>
					<span>{{buy.price | tofixedFour}}</span>
					<span>{{buy.number | tofixed}}</span>
				</li>
			</ul>
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
				load: 1,
				newData: 0,
				currency_name: "",
				legal_name: "",
				currency_id: "",
				legal_id: "",
			};
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
		mounted: function() {
			var that = this;
		},
		created: function() {
			let that = this;
			var local_lid = window.localStorage.getItem("lever_l_id"),
				local_cid = window.localStorage.getItem("lever_c_id");
			that.legal_id = localStorage.getItem("lever_legal_id");
			that.currency_id = localStorage.getItem("lever_currency_id");
			that.legal_name = localStorage.getItem("lever_legal_name");
			that.currency_name = localStorage.getItem("lever_currency_name");
			that.buy_sell(that.legal_id, that.currency_id);
			that.connect();
			// that.upPrice(that.legal_id, that.currency_id)

		},
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
							//console.log(11111111111111111111111111111111111111111111)

							that.inlist = res.data.message.in;
							that.outlist = res.data.message.out.reverse();
							that.newData = res.data.message.last_price;
							window.localStorage.setItem('lastPrice',that.newData);
							// that.buyInfo.buyPrice = 0;
							// that.buyInfo.buyNum = 0;
							var buyList = res.data.message.in;
							var sellList = res.data.message.out.reverse();
							//console.log(sellList)
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
							// that.inlist = arr2;
							// that.outlist = arr4;
							// that.connect(
							//   legals_id,
							//   currencys_id
							// );
						} else if (res.data.type == "999") {
							this.$router.push("/components/login");
						} else {
							layer.msg(res.data.message);
						}
					})
					.catch(error => {
						// //console.log(error)
					});
			},
			connect() {
				var that = this;
				// that.$socket.emit("login", localStorage.getItem("user_id"));
				// that.$socket.on("market_depth", msg => {
				//   if (msg.type == "market_depth") {
				//     //组件间传值
				//     var newPrice = {
				//       newprice: msg.last_price,
				//       newup: msg.proportion,
				//       istoken: msg.token,
				//       yesprice: msg.yesterday,
				//       toprice: msg.today
				//     };
				//     setTimeout(() => {
				//       eventBus.$emit("toNew01", newPrice);
				//     }, 1000);
				//     var inData = JSON.parse(msg.bids);
				//     var outData = JSON.parse(msg.asks).reverse();
				//     if (msg.currency_id == currency_id && msg.legal_id == legal_id) {
				//       that.inlist = inData;
				//       that.outlist = outData;
				//       // for(let i=0;i<inData.length;i++){
				//       //   that.inlist[i] = inData[i];
				//       // }
				//       // for(let i=0;i<outData.length;i++){
				//       //   that.outlist = outData[i];
				//       // }
				//     }
				//   }
				// });
				// 打开一个 web socket
				var ws = new WebSocket("wss://ws.bitfdn.com/ws");
				ws.onopen = function() {
					var sendData={socket_type:that.currency_id+'/'+that.legal_id+'_lever',subscribed:1} // Web Socket 已连接上，使用 send() 方法发送数据
					sendData = JSON.stringify(sendData)
					//console.log(sendData)
					ws.send(sendData);
				};
				ws.onmessage = function (evt){
					// //console.log(evt)
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
			// 更新最新价
			// upPrice(legal_id, currency_id) {
			//   var that = this;
			//   that.$socket.emit("login", localStorage.getItem("user_id"));
			//   that.$socket.on("kline", msg => {
			//     if (msg.type == "kline") {
			//       if (msg.currency_id == currency_id && msg.legal_id == legal_id) {
			//         that.newData = msg.close;
			//         window.localStorage.setItem('lastPrice',that.newData);
			//       }
			//     }
			//   });
			// },

		},
	};
</script>

<style scoped>
	.title {
		height: 48px;
		line-height: 48px;
		padding: 0 10px 0 30px;
		background-color: #1a243b;
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
		color: #637085;
	}
	.list-item li {
		line-height: 42px;
		overflow: hidden;
	}
	.list-item li span,
	.exchange_title span {
		width: 33.3%;
		display: block;
		float: left;
	}
	.green {
		color: #12b886;
	}
	.red {
		color: #cc4951;
	}
	.list-item li:hover {
		/* background: #171c2b; */
	}
	.line {
		height: 5px;
		border-bottom: 1px solid #ccc;
	}
</style>
