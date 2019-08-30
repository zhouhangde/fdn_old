<template>
	<div class="exchange clr-part flex column">
		<ul class="flex handicap ft14">
			<li>{{tabItem[0]}}</li>
		</ul>

		<div class="content bg-part flex1 pt10 part-bg">
			<div class="exchange_title ft12 clear tc" style="height:3%;">
				<!-- 方向 -->
				<span class="tl">{{$t('center.direction')}}</span>  
				<!-- 价格 -->
				<span>{{$t('price')}}({{legal_name}})</span>
				<!-- 数量 -->
				<span class="tr">{{$t('number')}}({{currency_name}})</span>
			</div>
			<ul class="list-item ft12 tc" style="height:97%;">
				<div >
					<!-- 此为盘口上面的数据 -->
					<li :class="['curPer','redColor','bg-hov',{'bg-evev':index%2 != 0}]" v-for="(out,index) in outlist"
						class="w100" @click="price(out.price)" style="position:relative;" :key="index">
						<span class="tl" style="color: #D74E5A">{{$t('center.sellout')}} {{outlist.length-index}}</span>
						<span style="color: #b0b8db; ">{{out.price}}</span>
						<span class="tr" style="color: #b0b8db;">{{out.number}}</span>
						<span class="sell_shadow" :style="{width:(out.percentage-0)*100+'%'}"></span>
					</li>
				</div>
				<!-- 此为中间数据 -->
				<li class="ft16 flex cp " style="
						margin-top: 2px;
							border-width: 1px 0;
							border-style: solid;
							border-top-color: #111217;
							border-bottom-color: #111217;
						vertical-align:middle;
						line-height: 30px;
					">
                     <em :style="{color:parseFloat(change)>0?'#41B37D':'#D74E5A'}">
					 <!-- {{newData | tofixedFour}}  -->
                     {{close}}
					 </em> 
				 <em class="ft12 ml5">≈{{now_cny_price}}CNY</em>
				</li>
				<!-- 此为盘口下面的数据 -->
				<div style="height:47% ; margin-top: 2px">
					<li class="curPer ceilColor bg-hov" v-for="(buy,inde) in inlist" @click="price(buy.price)"
						style="position:relative;" :key="inde">
						<span class="tl" style="color: #41B37D">{{$t('center.buyin')}} {{inde+1}}</span>
						<span style="color: #b0b8db;">{{buy.price}}</span>
						<span class="tr" style="color: #b0b8db;">{{buy.number}}</span>
						<span class="buy_shadow" :style="{width:(buy.percentage-0)*100+'%'}"
							  style="background: rgba(97, 166, 152, 0.12)!important;"></span>
					</li>
				</div>
			</ul>
		</div>

		<!--全站交易，不为实时成交-->
		<div class="detail clr-part bg-part flex1 pt10 part-bg" v-if="is_active == 1">
			<div class="content" style="overflow:hidden">
				<ul class="list-title fColor2 ft14 clear bdr-part">
					<li class="fl w12 tl">{{$t('time')}}</li>
					<li class="fl w12 tc">{{$t('center.direction')}}</li>
					<li class="fl w12 tc">{{$t('price')}}</li>
					<li class="fl w12 tr">{{$t('home.volume')}}</li>
				</ul>
				<div class="containers scroll" v-if="deList.length>0">
					<ul v-for="(itm,index) in deList" class="list-item color ft12" :key="index">
						<li class="clear flex clr-part bg-hov alcenter">
							<span class="tl">{{itm.create_time.substr(11,8)}}</span>
							<span class="tc" :class="itm.way == 2?'red':'green'">{{itm.way == 2?$t('center.outsell'):$t('center.inbuy')}}</span>
							<span class="tc" :class="itm.way == 2?'red':'green'">{{itm.price}}</span>
							<span class="tr">{{itm.number}}</span>
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
				close:0,
				lockReconnect:false,  //连接关闭
				timer:null
			};
		},
		created: function () {
			var leverTradeDataMy = window.localStorage.getItem("leverTradeData_my");
			if(leverTradeDataMy!=''&& leverTradeDataMy!=undefined && leverTradeDataMy!=null){
                    var localData = JSON.parse(window.localStorage.getItem("leverTradeData_my"));
					this.currency_id = localData.currency_id;
					this.legal_id = localData.legal_id;
					this.currency_name = localData.currency_name;
					this.now_cny_price = localData.now_cny_price;
					this.now_usdt_price = localData.now_usdt_price
			}else{
				if (window.localStorage.getItem("leverTradeData")) {
					var localData = JSON.parse(window.localStorage.getItem("leverTradeData"));
					this.currency_id = localData.currency_id;
					this.legal_id = localData.legal_id;
					this.currency_name = localData.currency_name;
					this.now_cny_price = localData.now_cny_price;
					this.now_usdt_price = localData.now_usdt_price
				}
			}
			var $this =this
			$this.buy_sell($this.legal_id, $this.currency_id);
			$this.connect();  
           
			
			
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
				}).then(res => {
						if (res.data.type == "ok") {
							that.inlist = res.data.message.in;
							that.outlist = res.data.message.out.reverse();
							that.newData = res.data.message.last_price;
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

					var sendDataPrice =  {socket_type: "daymarket", subscribed: 1};;
					sendDataPrice = JSON.stringify(sendDataPrice);
					ws.send(sendDataPrice);
				};
				ws.onmessage = function (evt){
					var msg = JSON.parse(evt.data);
					if (msg.type == "transaction_lever") {
						// console.log('msg',msg)
						that.inlist = JSON.parse(msg.in);
						that.outlist = JSON.parse(msg.out).reverse();
						// that.newData = msg.last_price;
					}
					if (msg.type == "kline") {
						if(msg.kline_type == '1day'){
							that.newData = msg.close
						}
					}
					if (msg.type == "daymarket") {
						 if (
							 //判断是否为当前的币种
							that.$store.state.symbol ==
							msg.currency_name + "/" + msg.legal_name
						) {
							//  //console.log(msg);
							that.change = msg.change;
							that.close = msg.now_price;
							// that.volume = msg.volume;
							// that.high = msg.high_price;
							// that.low = msg.low_price;
							that.now_cny_price = msg.now_cny_price;
							// var dataPrice = {
							// 	now_price: msg.now_price,
							// 	now_cny_price: msg.now_cny_price
							// }
							// eventBus.$emit('e_price', dataPrice)
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
		color: #61688a;
	}

	.list-item li {
		line-height: 18px;
		overflow: hidden;
	}

	.list-item li span,
	.exchange_title span {
		width: 33.3%;
		display: inline-block;
		font-size: 12px;
		float: left;
	}

	.green {
		color: #008069;
	}

	.red {
		color: #cc4951;
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
		line-height: 40px;
		border-bottom: 1px solid #ccc;
		height: 40px;
	}

	.list-title li {
		width: 25%;
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
		background: rgba(250, 82, 82, 0.1) !important;
	}

	.buy_shadow {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 99;
		height: 100%;
		background: rgba(18, 184, 134, 0.1) !important;
	}
</style>
