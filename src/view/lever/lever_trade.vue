<template>
	<div class="trade">
		<div class="title_box">
			<!--			限价  市价-->
			<div class="tabtitle fColor1 ft14 curPer">
				<span :class="[{'active':selectedStatus == 1}]" @click="selectTypes(1)">{{$t('lever.std')}}</span>
				<span :class="[{'active':selectedStatus == 0}]" @click="selectTypes(0)">{{$t('lever.xtd')}}</span>
			</div>
		</div>
		<!-- 限价交易 -->
		<div class="content clear">
			<div class="available clear ft12 fColor1 first" v-if="!token">
				<span class="baseColor blueColor curPer" @click="goNext('login')">{{$t('logins')}}</span>
				{{$t('center.or')}}
				<span class="baseColor blueColor curPer" @click="goNext('register')">{{$t('registers')}}</span>
				{{$t('home.toTrade')}}
			</div>
			<div class="clear available padds ft12" v-else>
				<span class="fl fColor1">{{$t('lever.canuse')}}{{user_legal | tofixedFour}} {{legal_name}}</span>
			</div>
			<div class="w50 fl first">
				<div class="ft12">
					<div class="mt10 input-item clear">
						<!-----价格------>
						<div class="mb10" v-show="selectedStatus == 0">
							<label>{{$t('price')}}：</label>
							<input
								type="number"
								v-model="price_buy"
								:placeholder='$t("lever.pprice")'
							>
						</div>
						<label>{{$t('lever.timed')}}：</label>
						<select class="buy_multiple" v-model="multiple_buy" @change="selectMuit('buy')">
							<option
								v-for="(item,index) in multipleList"
								:key="index"
								:value="item"
							>{{item}}{{$t("lever.times")}}
							</option>
						</select>
					</div>
					<div class="mt10 input-item clear">
						<label>{{$t("lever.hands")}}：</label>
						<!-- 最少买入数量 -->
						<div class="flex share-total">
								<input
									type="number"
									class="share-input"
									v-model="shareNumber_buy"

									:placeholder='$t("lever.handbuy")+ minNum+ currency_name'
									@input="changeValue('buy')"
								>
							</div>
					</div>
					<!----------合约市值、保证金、交易服务费---------->
					<div class="lever-total fColor1">
						<p class="clearfix mt10">
							<span class="fl">{{$t("lever.contractVal")}}</span>
							<span class="market-value fr">≈ {{buyTotal.marketPrice || '0.0000'}} {{legal_name}}</span>
						</p>
						<p class="clearfix mt10">
							<span class="fl">{{$t("lever.bail")}}</span>
							<span class="bond fr">≈ {{buyTotal.bonds || '0.0000'}} {{legal_name}}</span>
						</p>
						<p class="clearfix mt10">
						</p>
					</div>
					<!-- 买入（做多按钮） -->
					<div
						class="buy_btn curPer mt5 tc greenBack fColor1 ft14"
						@click="submitCoin(0)"
					>{{$t("lever.domore")}} {{currency_name}}
					</div>
				</div>
			</div>
			<div class="w50 fr second">
				<div class="ft12">
					<div class="mt10 input-item clear">
						<!-----价格------>
						<div class="mb10" v-show="selectedStatus == 0">
							<label>{{$t('price')}}：</label>
							<input
								type="number"
								v-model="price_sell"
								:placeholder='$t("lever.pprice")'
							>
						</div>
						<label>{{$t("lever.timed")}}：</label>
						<select class="buy_multiple" v-model="multiple_sell" @change="selectMuit('sell')">
							<option disabled value>{{$t("lever.ptimes")}}</option>
							<option
								v-for="(item,index) in multipleList"
								:key="index"
								:value="item"
							>{{item}}{{$t("lever.times")}}
							</option>
						</select>
					</div>
					<div class="mt10 input-item clear">
						<label>{{$t("lever.hands")}}：</label>
						<!-- 最多买出数量 -->
						<!-- :placeholder='$t("lever.handsell")+ share_number+ currency_name' -->
						<div class="flex share-total">
							<input
								type="number"
								class="share-input"
								v-model="shareNumber_sell"
								:placeholder='$t("lever.handsell")+ minNum+ currency_name'
								@input="changeValue('sell')"
							>
						</div>
					</div>
					<!----------合约市值、保证金、交易服务费---------->
					<div class="lever-total fColor1">
						<p class="clearfix mt10">
							<span class="fl">{{$t("lever.contractVal")}}</span>
							<span class="market-value fr">≈ {{sellTotal.marketPrice || '0.0000'}} {{legal_name}}</span>
						</p>
						<p class="clearfix mt10">
							<span class="fl">{{$t("lever.bail")}}</span>
							<span class="bond fr">≈ {{sellTotal.bonds || '0.0000'}} {{legal_name}}</span>
						</p>
						<p class="clearfix mt10">
							<!--							<span class="fl">{{$t("lever.charge")}}</span>-->
							<!--							<span class="transaction-fee fr">≈ {{sellTotal.tradeFree || '0.0000'}} {{legal_name}}</span>-->
						</p>
					</div>
					<!-- 卖出（做多）按钮 -->
					<div
						class="sell_btn curPer mt5 tc redBack fColor1 ft14"
						@click="submitCoin(1)"
					>{{$t("lever.doshort")}}{{currency_name}}
					</div>
				</div>
			</div>
		</div>


		<!-- 买入卖出确认弹窗 -->
		<div class="comfirm-modal flex" v-show="comfirmShow">
			<div class="comfirm-modal-content">
				<div class="loss-modal-header">
					<h3>{{$t('lever.sureOd')}}</h3>
					<p class="curPer" @click="closeMosal()">X</p>
				</div>
				<ul>
					<li class="flex">
						<p>{{currency_name}}/{{legal_name}}</p>
					</li>
					<li class="flex">
						<p>{{$t('lever.type')}}：</p>
						<p>{{type == 0 ? $t('lever.dmore') : $t('lever.dshort')}}</p>
					</li>
					<li class="flex">
						<p>{{$t('lever.hands')}}：</p>
						<p>{{type == 0 ? shareNumber_buy : shareNumber_sell}}</p>
					</li>
					<li class="flex">
						<p>{{$t('lever.timed')}}：</p>
						<p>{{type == 0 ? multiple_buy : multiple_sell}}</p>
					</li>
				</ul>
				<div class="modal-btn">
					<button type="button" class="curPer" @click="closeMosal()">{{$t('td.canceil')}}</button>
					<button type="button" class="curPer" @click="confirm()">{{$t('td.confirm')}}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "trade",
		data() {
			return {
				token: '',
				currency_name: "",
				currency_id: "",
				legal_name: "",
				legal_id: "",
				user_legal: 0.00,//用户余额

				last_price: 0,//最新价
				selectedStatus: 1,//限市价类型
				spread: 0.00,//点差
				spread_type: '', //点差类型
				share_number: 0.00,//一手等于多少币
				trade_fee: 0.00,//手续费
				multipleList: [],//倍数
				shareList: [],//手数

				minShare: 0,//最小手数
				maxShare: 0,//最大手数

				s_shareNumber_buy: '',//选择的买入手数
				s_shareNumber_sell: '',//选择的卖出手数

				price_buy: '',//输入买入价格
				price_sell: '',//输入卖出价格
				multiple_buy: '',//最终买入倍数
				multiple_sell: '',//最终卖出倍数
				shareNumber_buy: '',//最终买入手数
				shareNumber_sell: '',//最终卖出手数

				comfirmShow: false,//下单确认弹窗
				type: 0,//确认买卖类型
				minNum:0 //最小买入卖出数量
			};
		},
		created() {
			this.token = localStorage.getItem("token") || "";
			// this.last_price = localStorage.getItem('lastPrice');
			// //console.log(this.last_price)
		},
		filters: {
			tofixed: function (val) {
				val = Number(val);
				return val.toFixed(2);
			},
			tofixedFour: function (val) {
				val = Number(val);
				return val.toFixed(4);
			}
		},
		computed: {
			//市值、保证金、服务费
			buyTotal: function () {//计算买入
				let that = this;
				var bond = that.selectedStatus == 0 ? that.price_buy : that.last_price;//最新价或买入价
				//console.log(that.last_price)
				var spread = that.spread;//点差
				var share = that.shareNumber_buy;//买入手数
				var muit = that.multiple_buy || 1;//买入倍数
				var shareNum = that.share_number;//一手等于到少币
				var transactionFee = that.trade_fee;//手续费
				// var prices = parseFloat(bond * spread / 100).toFixed(4);//最新价乘点差/100
				var prices = '';
				if (that.spread_type == 1) {
					prices = parseFloat(bond * spread).toFixed(4);//点差类型为1时，最新价乘点差
				} else if (that.spread_type == 2) {
					prices = spread;                              //点差类型为2时，不用乘以点差，直接加减
				}
				//console.log(that.spread_type, prices)
				var pricesTotal = parseFloat(parseFloat(bond) + parseFloat(prices)).toFixed(4);//买入 最新价加
				var totalPrice = parseFloat(pricesTotal * share * shareNum).toFixed(4);//最新价加减点差 * 手数 * 1手约等于多少币
				//console.log(pricesTotal, totalPrice)
				var marketPrice = parseFloat(bond * share * shareNum).toFixed(4) || 0.00;//合约市值(最新价*手数*1手等于多少币)
				var bonds = parseFloat((totalPrice - 0) / (muit - 0)).toFixed(4) || 0.00;//保证金 (（最新价加减点差 * 手数 * 1手约等于多少币）/ 倍数)
				//console.log(totalPrice, muit, spread, share, shareNum, bonds)
				var tradeFree = parseFloat(totalPrice * transactionFee).toFixed(4) || 0.00;//服务费（（最新价加减点差 * 手数 * 1手约等于多少币）* 服务费率/100）
				return {
					marketPrice: marketPrice,
					bonds: bonds,
					tradeFree: tradeFree
				}
			},
			sellTotal: function () {//计算卖出
				let that = this;
				var bond = that.selectedStatus == 0 ? that.price_sell : that.last_price;//最新价或卖出价
				var spread = that.spread;//点差
				var share = that.shareNumber_sell;//卖出手数
				var muit = that.multiple_sell || 1;//卖出倍数
				var shareNum = that.share_number;//一手等于到少币
				var transactionFee = that.trade_fee;//手续费

				// var prices = parseFloat(bond * spread / 100).toFixed(4);//最新价乘点差/100
				var prices = '';
				if (that.spread_type == 1) {
					prices = parseFloat(bond * spread).toFixed(4);//点差类型为1时，最新价乘点差
				} else if (that.spread_type == 2) {
					prices = spread;                              //点差类型为2时，不用乘以点差，直接加减
				}
				var pricesTotal = parseFloat(bond - prices).toFixed(4);//卖入 最新价减
				var totalPrice = parseFloat(pricesTotal * share * shareNum).toFixed(4);//最新价加减点差 * 手数 * 1手约等于多少币

				var marketPrice = parseFloat(bond * share * shareNum).toFixed(4) || 0.00;//合约市值(最新价*手数*1手等于多少币)
				var bonds = parseFloat((totalPrice - 0) / (muit - 0)).toFixed(4) || 0.00;//保证金 (（最新价加减点差 * 手数 * 1手约等于多少币）/ 倍数)
				var tradeFree = parseFloat(totalPrice * transactionFee).toFixed(4) || 0.00;//服务费（（最新价加减点差 * 手数 * 1手约等于多少币）* 服务费率/100）
				return {
					marketPrice: marketPrice,
					bonds: bonds,
					tradeFree: tradeFree
				}
			}
		},
		mounted() {
			var that = this;
			var leverTradeDataMy = window.localStorage.getItem("leverTradeData_my");
			if(leverTradeDataMy!=''&& leverTradeDataMy!=undefined && leverTradeDataMy!=null){
                    var localData = JSON.parse(window.localStorage.getItem("leverTradeData_my"));
					this.currency_id = localData.currency_id;
					this.legal_id = localData.legal_id;
					this.currency_name = localData.currency_name;

					that.legal_name = localStorage.getItem("lever_legal_name");
			}else{
				if (window.localStorage.getItem("leverTradeData")) {
							var localData = JSON.parse(window.localStorage.getItem("leverTradeData"));
							this.currency_id = localData.currency_id;
							this.legal_id = localData.legal_id;
							this.currency_name = localData.currency_name;

							that.legal_name = localStorage.getItem("lever_legal_name");
					}
			} 

			// that.legal_id = localStorage.getItem("lever_legal_id");
			// that.currency_id = localStorage.getItem("lever_currency_id");
			// that.legal_name = localStorage.getItem("lever_legal_name");
			// that.currency_name = localStorage.getItem("lever_currency_name");
			that.currencyDeal();
			if (that.token) {
				that.getBalance();
			}

			that.$http({
				url: '/api/quotation/today',
				method: 'post',
				data: {
					legal_id: that.legal_id,
					currency_id: that.currency_id
				}
			}).then(res => {
				if (res.data.type == 'ok') {
					this.last_price = res.data.message.now_price
				}
			})


			that.getFixed();
		},
		methods: {
			//获取当前的币的最小购买数
			getFixed() {
				this.$http({
					url: '/api/currency/match_info',
					params: {
						currency_id: this.currency_id,
						legal_id: this.legal_id
					}
				}).then(res => {
					if (res.data.type == 'ok') {
						this.minNum = res.data.message.min_share
					}
				})
			},
			selectTypes(types) {//切换限价市价
				let that = this;
				that.selectedStatus = types;
			},
			selectShare(type) {//选择手数
				let that = this;
				type == 'buy' ? that.shareNumber_buy = that.s_shareNumber_buy : that.shareNumber_sell = that.s_shareNumber_sell;
			},
			changeValue(type) {//输入手数
				let that = this;
				let textValue = /^[1-9]*[0-9][0-9]*$/;
				if (type == 'buy') {
					if (that.shareNumber_buy != '') {
						that.s_shareNumber_buy = "";
						if (!textValue.test(that.shareNumber_buy)) {
							layer.msg(that.$t('lever.zheng'));
							return;
						}
					}
				} else {
					if (that.shareNumber_sell != '') {
						that.s_shareNumber_sell = "";
						if (!textValue.test(that.shareNumber_sell)) {
							layer.msg(that.$t('lever.zheng'));
							return;
						}
					}
				}
			},
			selectMuit(type) {//选择倍数

			},
			getBalance() {//获取用户法币余额
				this.$http({
					url: "/api/" + "wallet/get_lever_balance",
					method: "get",
					params: {
						legal_id: this.legal_id,
						currency_id: this.currency_id
					},
					headers: {Authorization: localStorage.getItem("token")}
				})
					.then(res => {
						if (res.data.type == "ok") {
							this.user_legal = res.data.message.legal_price;
						}
					})
			},
			currencyDeal() {// 获取币种信息
				let that = this;
				this.$http({
					url: "/api/" + "currency/match_info",
					method: "get",
					params: {
						legal_id: this.legal_id,
						currency_id: this.currency_id
					},
					headers: {Authorization: localStorage.getItem("token")}
				})
					.then(res => {
						if (res.data.type == "ok") {
							var data = res.data.message;
							that.spread = data.spread;//点差
							that.spread_type = data.spread_type; //点差类型
							that.share_number = data.share_number;//一手等于多少币
							that.trade_fee = data.fee;//手续费
							that.multipleList = JSON.parse(data.multiple);//倍数
							that.shareList = JSON.parse(data.share);//手数
							that.multiple_buy = that.multipleList[0];//默认买入倍数
							that.multiple_sell = that.multipleList[0];//默认卖出倍数
							that.minShare = data.min_share;//最小手数
							that.maxShare = data.max_share;//最大手数
						}
					})
			},
			goNext(url) {//去登录或注册
				this.$router.push({name: url});
			},
			submitCoin(type) {
				let that = this;
				that.type = type;
				var selectedStatus = that.selectedStatus;
				if (type == 0) {
					if (that.shareNumber_buy < that.minShare) {
						return layer.msg(that.$t('lever.buyMin') + that.minShare);
					}
					if (that.shareNumber_buy > that.maxShare) {
						return layer.msg(that.$t('lever.buyMax') + that.maxShare);
					}
					if (selectedStatus == 0 && !that.price_buy) {
						return layer.msg(that.$t('lever.enterBuyPrice'));
					}
				} else {
					if (that.shareNumber_sell < that.minShare) {
						return layer.msg(that.$t('lever.sellMin') + that.minShare);
					}
					if (that.shareNumber_sell > that.maxShare) {
						return layer.msg(that.$t('lever.sellMax') + that.maxShare);
					}
					if (selectedStatus == 0 && !that.price_sell) {
						return layer.msg(that.$t('lever.enterSellPrice'));
					}
				}
				that.comfirmShow = true;
			},
			closeMosal() {
				let that = this;
				that.comfirmShow = false;
			},
			confirm() {//下单
				let that = this;
				var type = that.type;
				var deal_type = that.selectedStatus == 0 ? 2 : 1;//限市价类型 市价1限价2
				if (type == 0) {//买入
					// var bond = that.selectedStatus==0 ? that.price_buy : that.last_price;
					var data = {
						legal_id: that.legal_id,
						currency_id: that.currency_id,
						share: that.shareNumber_buy,//手数
						multiple: that.multiple_buy,//倍数
						type: 1,//买卖类型
						deal_type: deal_type,//限市价类型
					}
					if (deal_type == 2) {
						data.target_price = Number(that.price_buy)//价格
					}
				} else {//卖出
					var bond = that.selectedStatus == 0 ? that.price_sell : that.last_price;
					var data = {
						legal_id: that.legal_id,
						currency_id: that.currency_id,
						share: that.shareNumber_sell,//手数
						multiple: that.multiple_sell,//倍数
						type: 2,//买卖类型
						deal_type: deal_type,//限市价类型
					}
					if (deal_type == 2) {
						data.target_price = Number(that.price_sell)//价格
					}
				}
				var i = layer.load();
				that.$http({
					url: "/api/" + 'lever/order',
					method: "post",
					data: data,
					headers: {Authorization: that.token}
				})
					.then(res => {
						layer.close(i);
						layer.msg(res.data.message);
						if (res.data.type == "ok") {
							that.comfirmShow = false;
							if (type == 1) {//清空手数
								that.shareNumber_buy = '';
							} else {
								that.shareNumber_sell = '';
							}
							// if (that.type == 2) {
							//   that.sellInfo.sellPrice = 0;
							//   that.sellInfo.sellNum = 0;
							// } else {
							//   that.buyInfo.buyPrice = 0;
							//   that.buyInfo.buyNum = 0;
							// }
							// eventBus.$emit("buyTrade", "tradebuy");
							// eventBus.$emit("tocel", "updata");
							// eventBus.$emit("to_leverExchange", "leverExchange");
							// layer.msg(res.data.message);
							setTimeout(function () {
								if (that.selectedStatus == 1) {
									// that.$router.push({name: "leverTransactions"});
								} else {
									// that.$router.push({name: "leverList"});
								}
							}, 500);
						} else {
							that.comfirmShow = false;
							layer.msg(res.data.message);
						}
					})
					.catch(error => {
						//console.log(error);
						that.comfirmShow = false;
					});

			},

		},

	};
</script>

<style scoped>
	.shareNum {
		color: #637085;
		position: relative;
		top: 15px;
	}

	.mb10 input {
		margin-bottom: 15px;
	}

	.padds {
		margin: 0 15px 0 25px;
		padding: 0 10px;
	}

	.share-total {
		flex-wrap: wrap;
	}

	.control-price {
		margin: 20px 0 0;
		color: #fff;
	}

	.control-price span {
		margin-right: 15px;
		padding-bottom: 10px;
		cursor: pointer;
	}

	.control-price .active {
		border-bottom: 1px solid #7a98f7;
	}

	.control-price div {
		margin-top: 30px;
	}

	.control-price input {
		width: 60%;
		line-height: 30px;
		padding: 5px 10px;
		border: 1px solid #2e3753;
		background-color: rgba(0, 0, 0, 0);
		color: #fff;
	}

	.title_box {
		height: 32px;
		line-height: 30px;
		padding: 0 30px;
		/* background-color: #1a243b; */
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	}

	.tabtitle span {
		cursor: pointer;
		/*height: 48px;*/
		display: inline-block;
	}

	.tabtitle span:not(:last-child) {
		margin-right: 40px;
	}

	.content .first {
		padding: 0 15px 0 25px;
	}

	.content .second {
		padding: 0 25px 0 15px;
	}

	.tabtitle .active {
		font-weight: bold;
		color: #d2d6ec !important;
	}

	.fColor1 {
		color: #61688a;
	}

	.available {
		height: 48px;
		border-bottom: 1px solid #606585;
		line-height: 48px;
	}

	.input-item {
		position: relative;
		line-height: 40px;
	}

	.input-item label {
		width: 28%;
		float: left;
		font-size: 12px;
		color: #61688a;
	}

	.input-item input {
		width: 72%;
		float: left;
		border: 1px solid #606585;
		height: 35px;
		text-indent: 15px;
		font-size: 12px;
		line-height: 35px;
		border-radius: 2px;
		background-color: #171b2b;
		color: #b0b8db;
	}

	.input-item input:focus {
		outline: none;

		border: #357ce1 1px solid;

		box-shadow: 0 0 8px rgba(103, 166, 217, 1);
	}

	.input-item span {
		position: absolute;
		right: 15px;
		color: #637085;
		font-size: 12px;
	}

	.input-item select {

		width: 72%;
		float: left;
		border: 1px solid #606585;
		height: 35px;
		text-indent: 15px;
		font-size: 12px;
		line-height: 35px;
		border-radius: 2px;
		color: #b0b8db;
		background-color: #171b2b;
		/*width: 72%;
		background: #f2f3f8;
		color: #333;
		border: 1px solid #ccc;
		border-radius: 3px;
		height: 40px;
		text-indent: 10px;
		font-size: 16px;*/
	}

	.attion {
		height: 20px;
		line-height: 30px;
		font-size: 12px;
	}

	.blueColor {
		color: #357ce1;
	}


	.sell_btn {
		width: 100%;
		height: 35px;
		border-radius: 3px;
		color: #cdd6e4;
		line-height: 40px;
	}

	.buy_btn {
		width: 100%;
		height: 35px;
		border-radius: 3px;
		color: #cdd6e4;
		line-height: 40px;
	}

	.sell_btn:hover {
		background-color: #fa5252;
	}

	.buy_btn:hover {
		background-color: #41b37d;
	}

	.greenBack {
		background-color: #12b886;
	}

	.redBack {
		background-color: #d74e5a;
	}

	input:disabled {
		color: #627085;
		cursor: not-allowed;
	}

	.share {
		display: inline-block;
		font-weight: normal;
		border: 1px solid #2e3753;
		border-radius: 2px;
		font-size: 14px;
		color: #fff;
		line-height: 1.2;
		width: 23.5%;
		text-align: center;
		padding: 5px 0;
		margin-right: 3.14px;
	}

	b.active {
		background-color: #02c289;
		border: 1px solid #02c289;
	}

	b.actives {
		background-color: #de5959;
		border: 1px solid #de5959;
	}

	.comfirm-modal {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.7);
		justify-content: center;
		align-items: center;
		color: #c7cce6;
	}

	.comfirm-modal-content {
		width: 500px;
		background-color: #1a243b;
		margin: 0 auto;
		border-radius: 5px;
	}

	.loss-modal-header {
		line-height: 40px;
		text-align: center;
		position: relative;
	}

	.loss-modal-header p {
		position: absolute;
		right: 10px;
		top: 0;
	}

	.comfirm-modal-content li {
		line-height: 40px;
		margin: 0 20px;
	}

	.modal-btn {
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		font-size: 0;
		padding-top: 30px;
	}

	.modal-btn button {
		width: 50%;
		line-height: 50px;
		border: none;
		float: left;
		font-size: 14px;
		color: #fff;
		background: #9db5c7;
	}

	.modal-btn button:last-child {
		border-left: 1px solid #2e333c;
		background: #689cf1;
	}

	.input-item .share-input {

		width: 100%;
		float: left;
		border: 1px solid #606585;
		height: 35px;
		text-indent: 15px;
		font-size: 12px;
		line-height: 35px;
		border-radius: 2px;
		background-color: #171b2b;
		/*border: 1px solid #ccc;
		border-radius: 2px;
		font-size: 14px;
		color: #61688a;
		line-height: 26px;
		width: 100%;
		padding: 5px 10px;
		background-color: #f2f3f8;
		height: auto;
		float: none;
		text-indent: 0;
		margin-bottom: 10px;*/
	}
</style>

