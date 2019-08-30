<template>
	<div id="legaltrade-box" class="clr-part mt45">
		<div class="f_bg flex alcenter center">
           <ul class="flex alcenter cneter ul_box ft16">
			   <li class="" :class="{'active_left_btn':tabItem == 0,'buy_li':tabItem !=0}" @click="getBuy">{{$t('legal.buy')}}</li>
			   <span class="splite"></span>
			   <li class="" :class="{'active_right_btn':tabItem == 1,'sell_li':tabItem !=1}" @click="getSell">{{$t('legal.sell')}}</li>
		   </ul>
		</div>
		<div class="buy-sell flex bg-part">
			<div class="buy-box bdr-part" v-if="tabItem == 0">
				<!-- <div class="title">{{$t('legal.buy')}}</div> -->
				<ul :class="['flex',{'now':type == 'buy'}]">
					<li v-for="(coin,index) in legals" :key="index" :class="{'current0':coin.thisid == id}" @click="changeClassify(coin.thisid,1,coin.name)">{{coin.name}}</li>
				</ul>
			</div>
			<div class="sell-box" v-if="tabItem == 1">
				<!-- <div class="title">{{$t('legal.sell')}}</div> -->
				<ul :class="['flex',{'now':type=='sell'}]">
					<li v-for="(coin,index) in legals" :key="index" :class="{'current1':coin.thisid == id}" @click="changeClassify(coin.thisid,2,coin.name)">{{coin.name}}</li>
				</ul>
			</div>
			<!--支付方式-->
			<div class="flex alcenter end pr120 sel_box">
			<p class="flex alcenter mr10 ft14">
				<span>{{$t('legaltrade.paymoney')}}：</span>
			<select v-model="coin_type" @change="changeCoin">
				<option value="">{{$t('legaltrade.select')}}</option>
				<option :value="item.thisId" v-for="(item,i) in coinTypeList" :key="i">{{item.money + '  ' + item.name}}</option>
			</select>
			</p>
			<p class="flex alcenter ft14">
				<span>{{$t('legaltrade.paytype')}}：</span>
			<select v-model="cash_type" @change="changeCash">
				<option value="">{{$t('legaltrade.select')}}</option>
				<option :value="item.thisId" v-for="(item,i) in cashTypeList" :key="i">{{item.name}}</option>
			</select>
			</p>
			</div>
			<span class="record light_blue" @click="recordList()">{{$t('legal.record')}}<i style="color: #579aff;" class="el-icon-document"></i></span>
		</div>
		<div class="list-box bg-part">
			<div class="list-title flex ft14">
				<div>{{$t('legal.shoper')}}</div>
				<div>{{$t('legal.number')}}</div>
				<div>{{$t('legal.limit')}}</div>
				<div>{{$t('legal.price')}}</div>
				<div>{{$t('legal.pay')}}</div>
				<div style="text-align: left">{{$t('legal.do')}}</div>
			</div>
			<ul class="list ft12">
				<li v-for="(item,index) in list" :key="index" class="flex">
					<div class="flex alcenter">
						<!-- <img :src="url+'upload/'+item.currency_logo" alt=""> -->
						<div class="head">{{item.merchant_name | formatTime}}</div>
						<div class="flex column center ft14" style="font-weight: 600">
							<span class="light_blue sellerName">{{item.seller_name}}</span>
						<span class="currencyName">{{item.merchant_name}}</span>
						</div>
					</div>
					<div class="flex alcenter">{{item.number}}</div>
					<div class="flex alcenter">{{item.limitation.min}}-{{item.limitation.max}} {{item.money_short}}</div>
					<div class="flex alcenter gre_txt">{{item.price}} {{item.money_short}}</div>
					<div class="flex alcenter" style="cursor: pointer;">
						<i class="mr5" v-for="(itm,idx) in item.user_cashier" :key="idx">
						<!--<img v-if="itm.cashier_type == '支付宝'" src="../assets/images/zfb_icon.png" />
						<img v-if="itm.cashier_type == '微信'" src="../assets/images/weixinzhifu-.png" />
						<img v-if="itm.cashier_type == '银行卡'" src="../assets/images/yinlian-2.png" />-->
						<img v-if="itm.cashier_type == '支付宝'" title="支付宝" src="https://file.rci8.top/common/images/pay-icon/alipay-cn.svg" />
						<img v-if="itm.cashier_type == '微信'" title="微信" src="https://file.rci8.top/common/images/pay-icon/wechat-cn.svg" />
						<img v-if="itm.cashier_type == '银行卡'"title="银行卡"  src="https://file.rci8.top/common/images/pay-icon/bank-cn.svg" />
						</i>
					</div>
					<div class="flex alcenter"  @click="buySell(item.price,item.limitation.min,item.limitation.max,item.thisid,item.type,item.number,item.money_short,item.min_number,item.number)">
						<button class="btn blue_cor">{{classify}} {{item.currency_name}}</button>
					</div>
				</li>
			</ul>
			<!-- 分页 -->
			<paginate v-model="currentpage" v-show="pages" :page-count="pages" :click-handler="pagesList" :prev-text="'上一页'" :next-text="'下一页'"
			 :container-class="'pages'">
			</paginate>
		</div>
		<div class="modal" v-show="shows">
			<div class="mask" @click="closeBtn()"></div>
			<div class="content">
				<div class="content-list layerBg">
					<p class="close light_blue" @click="close">X</p>
					<p class="title">{{classify}}{{name}}</p>
					<p class="price">{{$t('legal.price')}}{{prices}} {{money_short}}</p>
					<div class="trade">
						<p class="cur" :class="['trade-name',{'active':types == 'trade'}]" @click="tabClassify(1)">{{name}}{{$t('legal.transaction')}}</p>
						<p class="cur" :class="['trade-num',{'active':types == 'num'}]" @click="tabClassify(2)">{{classify}}{{$t('legal.number')}}</p>
					</div>
					<div class="totals-num bdr-part">
						<input v-if=" types == 'trade' " class="number" type="number" :placeholder='$t("legal.inwant")+money_type+$t("legal.total")' v-model="nums">
						<input v-else class="number" type="number" :placeholder='$t("legal.inwant")+money_type+$t("legal.number")' v-model="nums">
						<button class="all clr-part" type="button" v-if=" type== 'sell' " @click="allMoney();">{{$t('legal.sellall')}}</button>
						<button class="all clr-part" type="button" v-else @click="allMoney();">{{$t('legal.buyall')}}</button>
						<span class="name">{{name01}}</span>
					</div>
					<div class="maxnum" v-if=" types == 'trade' ">{{$t('legal.limit')}}{{minNum}}-{{maxNum}}</div>
					<div class="maxnum" v-if=" types == 'num' ">{{$t('legal.limit')}}{{min_nums}}-{{max_nums}}</div>
					<div class="trade-totals">
						<p class="total-price">{{$t('legal.totalmoney')}}</p>
						<p class="prices" v-if=" types == 'trade' ">￥{{nums | toFixeds}}</p>
						<p class="prices" v-else>￥{{nums * prices | toFixeds}}</p>
					</div>
					<p class="tip">{{$t('legal.conactceil')}}</p>
					<div class="btns">
						<p class="cannel">{{time}}s{{$t('legal.autoceil')}}</p>
						<button class="comfirm gre_cor" type="button" @click="buyOrder()">{{$t('legal.placeorder')}}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Paginate from 'vuejs-paginate';
	import Vue from 'vue'
	Vue.filter('formatTime', function (value) {
		return value.substring(0,1)
	})
	export default {
		components: {
			Paginate
		},
		data() {
			return {
				legals: [],
				list: [],
				type: 'buy',
				id: 0,
				page: 0,
				classify: this.$t('legal.buy'),
				name: 'CNY',
				pages: 0,
				prices: 0,
				minNum: 0,
				maxNum: 0,
				names: 'CNY',
				time: '60',
				shows: false,
				types: 'trade',
				nums: '',
				totalNums: '0.00',
				ID:'',
				money_type:'',
				currentpage:0,
				name01:'',
				numbers:'',
				allnum:'',
				idx:1,
				timer:'',
				tabItem:0,
				thisid:'', //可购买法币id
				coinTypeList:[],
				cashTypeList:[],
				coin_type:'',  //货币
				cash_type:'',   //支付方式
				money_short:'',
				min_nums:'',
				max_nums:''
			};
		},

		created() {
			//console.log(window.location);
			let token = window.localStorage.getItem("token") || "";
			this.getCoins();
			if (token) {
				this.token = token;
				this.getCoins();
			};
			this.getType();
		},
		filters: {
			toFixeds: function(value) {
				value = Number(value);
				return value.toFixed(2);
			}
		},
		methods: {
			//获取国籍、支付方式			
			getType(){
               this.$http({
				   url:'/api/news/search_list',
			   }).then(res=>{
				   if(res.data.type == 'ok'){
					  this.coinTypeList = res.data.message[0].nation;
					  this.cashTypeList = res.data.message[1].cashier;
				   }
			   })
			},
			//货币筛选
			changeCoin(){
				this.page = 0;
               this.$http({
				   url: "/api/legal/list",
					params: {
						way: this.type,
						page: this.page,
						currency_id: this.id,
						nation_id:this.coin_type,
						cashier_id:this.cash_type,
						limit:10
					},
					headers: {
						Authorization: this.token
					}
			   }).then(res=>{
                   if(res.data.type == 'ok'){
					   this.list = res.data.message.data;
					   let total = parseInt(res.data.message.count);
						if (total > 10) {
							this.pages = Math.ceil(total / 10);
						}
				   }
			   })
			},
			//支付方式筛选
			changeCash(){
               this.page = 0;
               this.$http({
				   url: "/api/legal/list",
					params: {
						way: this.type,
						page: this.page,
						currency_id: this.id,
						nation_id:this.coin_type,
						cashier_id:this.cash_type,
						limit:10
					},
					headers: {
						Authorization: this.token
					}
			   }).then(res=>{
                   if(res.data.type == 'ok'){
					   this.list = res.data.message.data;
					   let total = parseInt(res.data.message.count);
						if (total > 10) {
							this.pages = Math.ceil(total / 10);
						}else{
							this.pages = 0;
						}
				   }
			   })
			},
			//切换购买项
			getBuy(){
				this.tabItem = 0;
				this.getList("buy", this.thisid, 0);
				this.classify = this.$t('legal.buy');
				this.type = 'buy';
			},
			getSell(){
				this.tabItem = 1;
				this.getList("sell", this.thisid, 0);
				this.classify = this.$t('legal.sell');
				this.type = 'sell';
				
			},
			//关闭弹框
			close(){
				this.types = 'trade';
				this.name01 = this.money_short;
			   this.shows = false;
			    clearInterval(this.timer); //弹框关闭清除定时器
			},
			getCoins() {
				var i = layer.load();
				this.$http({
					url: "/api/currency/legal_list"
				}).then(res => {
					layer.close(i);
					if (res.data.type == "ok") {
						var list = res.data.message;
						if (list.length) {
							this.legals = list;
							var id = list[0].thisid;
							this.thisid = list[0].thisid;
							this.name = list[0].name;
							this.getList("buy", id, 0);
						}
					}
				});
			},
			getList(type, id, page) {
				this.type = type;
				this.id = id;
				this.page = page;
				var i = layer.load(); 
				this.$http({
					url: "/api/legal/list",
					params: {
						way: type,
						page: page,
						currency_id: id,
						limit:10
					},
					headers: {
						Authorization: this.token
					}
				}).then(res => {
					//console.log(res)
					layer.close(i);
					if (res.data.type == 'ok') {
						
						this.list = res.data.message.data;
						let total = parseInt(res.data.message.count);
						if (total > 10) {
							this.pages = Math.ceil(total / 10);
						}
					}else{
						this.list = []
						layer.msg(res.data.message)
					}
					if(this.list.length == res.data.message.count){
								this.pages = 0;
							}
				}).catch(res=>{
					layer.close(i)
				});
			},
			// 点击改变选中分类
			changeClassify(ids, type, names) {
				let _this = this;
				//console.log(type);
				_this.id = ids;
				if (type == 1) {
					_this.type = 'buy';
					_this.classify = _this.$t('legal.buy')
				} else {
					_this.type = 'sell';
					_this.classify = _this.$t('legal.sell')
				}
				_this.name = names;
				_this.getList(_this.type, ids, 0)

			},
			// 分页改变
			pagesList(pageNum) {
               
				//console.log(pageNum)
				let _this = this;
				_this.currentpage = pageNum;
				_this.getList(_this.type, _this.id, pageNum-1);
			},
			// 出售或者购买按钮
			buySell(prices, min, max,id,type,allnum,money_short,min_number,number) {
				//console.log(max)
				this.money_short = money_short;
				this.name01 = money_short;
				this.min_nums = min_number;
				this.max_nums = number;
				// this.nums = '';
				// this.numbers = '';
				//console.log(type)
				if(type == 'sell'){
					// this.money_type = '购买'
					this.money_type=this.$t('legal.buy');
				}else if(type == 'buy'){
					// this.money_type = '出售'
					this.money_type=this.$t('legal.sell');
				}
				let _this = this;
				_this.shows = true;
				_this.ID = id;
				_this.time = 60;
				document.getElementsByTagName("body")[0].className = "body";
				_this.prices = prices;
				_this.minNum = min;
				_this.maxNum = max;
				_this.allnum = allnum;
			      _this.timer = setInterval(function() {
					_this.time--;
					if (_this.time <= 0) {
						_this.shows = false;
						document.body.removeAttribute("class", "body");
						//清除定时器
						clearInterval(_this.timer);
					}
				}, 1000)
			},
			// 交易或数量切换
			tabClassify(num) {
				this.nums = '';
				this.idx = num;
				if (num == 1) {
					this.types = 'trade';
					this.name01 = this.money_short;
				} else {
					// this.numbers = this.nums/this.prices;
					this.types = 'num';
					this.name01 = this.name
				}
			},
			// 全部卖出或买入
			allMoney() {
				if(this.types == 'trade'){
					this.nums = this.maxNum;
				} else {
					//console.log(this.allnum)
					this.nums = this.allnum;
				}
			},
			// 下单
			buyOrder() {
				
				let _this = this;
				let means = 'money';
				let ids = window.localStorage.getItem("user_id");
				let token = window.localStorage.getItem("token") || "";
				// if (_this.nums) {
					if (_this.types == 'trade') {
						means = 'money';
					} else {
						means = 'number';
					};
					if(_this.nums<=0){
						if(this.type == 'sell' ){
							if (_this.types == 'trade') {
								return	layer.msg(_this.$t('lay.buymoney'));
							}else{
								return layer.msg(_this.$t('lay.buynum'));
							}
						}else {
							if (_this.types == 'trade') {
							
								return layer.msg(_this.$t('lay.sellmoney'));
							}else{
							    return layer.msg(_this.$t('lay.sellnum'));
							}
						}
					}
					
					
					let datas = {
						id: _this.ID,
						means: means,
						value: _this.nums
					};
					//获取实名认证状态
					var is_auth; //是否一级认证
					var review_status; //是否实名认证
					var is_Billing; //是否设置收款方式 1 已设置 0 未设置
					var load = layer.load();
					this.$http({
								url:'/api/user/info',
								method:'GET',
								data:{},
								headers:{Authorization:this.token}
							}).then(res => {
								layer.close(load);
								//console.log(res)
								if(res.data.type == 'ok'){
									is_auth = res.data.message.is_auth;
									//console.log(is_auth)
									review_status = res.data.message.review_status;
									is_Billing =  res.data.message.is_Billing;
									if(is_auth == 0){
										//console.log('kkkkk')
									layer.msg(_this.$t('lay.tname'));
									setTimeout(() => {
										 this.$router.push('/userCenter/auth');
									}, 1000);
									return false;
								}else if(is_Billing == 0){
									layer.msg(_this.$t('lay.payset'));
									setTimeout(() => {
										 this.$router.push('/userSetting');
									}, 1000);
								  
								   return;
								}
								else{
									_this.buyHttp('/api/legal/order', datas, function(res) {
										//console.log(res)
									if(res.data.type == 'ok'){
										// layer.msg(res.data.message)
										if (res.data.message.data.way == 'sell') {
											layer.msg(res.data.message.msg)
											setTimeout(function() {
												_this.$router.push({path:'/legalPay',query:{id:res.data.message.data.thisid,type:'buy'}});
											}, 500)
										} else {
											layer.msg(res.data.message.msg)
											setTimeout(function() {
												_this.$router.push({path:'/components/payCannel',query:{id:res.data.message.data.thisid,type:'sell'}});
											}, 500)
										}
									}else{
										//console.log(res.data.message)
									    layer.msg(res.data.message);
									}
								});
								}
								}
								
							})
					
					
				// } else {
					
					
				// }
			},
			// 请求
			buyHttp(urls, params, callback) {
				var i = layer.load();
				let _this = this;
				_this.$http({
					url: urls,
					method: "post",
					data: params,
					headers: {
						Authorization: localStorage.getItem("token")
					}
				}).then(res => {
					layer.close(i);
					//console.log(res);
					if (res.data.type == 'ok') {
						layer.msg(res.data.message.msg)
						callback && callback(res)
					} else {
						if (res.data.type == '998') {
							layer.msg(res.data.message)
							setTimeout(() => {
								_this.$router.push('/legalTradeSet');
							}, 500);
						}
						if(res.data.type == 'error'){
							layer.msg(res.data.message)
						}
						if(res.data.type == 'fail'){
							layer.msg(res.data.message)
						}

					}
				});
			},
			// 跳转订单记录
			recordList(){
				let _this = this;
				_this.$router.push({path:'/LegalRecord',query:{id:_this.id}});
			}

		}
	};
</script>

<style lang='scss'>
	.gre_txt{
			color: #27B054!important;
			font-size: 14px;
			font-weight: 600;
		}
    .gre_cor{
		background: #27B054!important;
	}
	.blue_cor{
		background: #638bd4!important;
		border-radius: 3px!important;
		font-size: 14px;
		font-weight: 600;
	}
	.f_bg{
		/*background: url('../../static/imgs/fabi_bg.png') top center no-repeat;*/
		background-color: #1b2945;
		background-size: 100% 100%;
		width: 100%;
		height: 82px;
	}
	.ul_box{
		position: absolute;
		top: 100px;
		left: 195px;
		font-weight: 600;
	}
	.buy_li{
		/*background: url('../../static/imgs/left_btn_white.png')top center no-repeat;*/
		border-bottom: 2px solid #fff;
		color: #fff;
	}
	.sell_li{
		/*background: url('../../static/imgs/right_btn_white.png')top center no-repeat;*/
		border-bottom: 2px solid #fff;
		color: #fff;
	}
	.active_left_btn{
		/*background: url('../../static/imgs/left_btn_green.png')top center no-repeat;*/
		color: #489972;
		border-color: #489972;
		border-bottom: 2px solid #489972;
	}
	.active_right_btn{
		color: #d6453c;
		border-color: #d6453c;
		border-bottom: 2px solid #d6453c;
	}
	.ul_box li{
		/*padding: 5px 40px;*/
		// border-radius: 15px;
		// background: #fff;
		cursor: pointer;
		background-size:contain;
	}
	.sel_box select{
		border: 1px solid #ccc;
		border-radius: 3px;
		padding: 2px 15px;
	}
	$purple:#194B64;
    .cur{
		cursor: pointer;
	}
	.body {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.btn{
		cursor: pointer;
		padding: 0 15px;
		border-radius: 15px;
	}
	.number{
		background: #e7eaff;
	}
	.sellerName,.currencyName{
		line-height: normal;
	}
	.sellerName{
		margin-bottom: 5px;
	}
  
	#legaltrade-box {
		width: 100%;
		margin: 30px auto;

		>.buy-sell {
			position: relative;
			padding: 0px 20px 20px 175px;
			border-radius: 3px;
			>.buy-box {
				padding: 20px;
				padding-top: 0;
				// border-right: 1px solid #ccc;
			}

			>.sell-box {
				padding: 20px;
				padding-top: 0;
			}

			>div {
				width: 45%;
				font-weight: bold;

				ul {
					margin-top: 20px;

					li {
						margin-right: 30px;
						cursor: pointer;
					}
				}

				>.now {
					>.current0 {
						color: #489972;
						border-color: #489972;
						border-bottom: 2px solid #489972;
					}
				}
				>.now {
					>.current1 {
						color: #d6453c;
						border-color: #d6453c;
						border-bottom: 2px solid #d6453c;
					}
				}
			}
			>.record{
				cursor: pointer;
				font-size: 16px;
				position: absolute;
				right: 120px;
				text-align: right;
				top: 20px;
			}
		}

		>.list-box {
			padding: 20px 190px;
			border-radius: 3px;
            min-height: 600px;
			>.list-title {
				    padding-bottom: 8px;
                    border-bottom: 1px solid #eee;
				>div {
					flex: 1;
				}

				>div:last-child {
					text-align: right;
				}
			}

			>.list {
				min-height: 500px;
				>li {
					padding: 20px 0;
					border-bottom: 1px solid #e5e5e5;

					>div {
						flex: 1;
						line-height: 36px;
						.head{
							width: 36px;
							height: 36px;
							border-radius: 50%;
							margin-right: 10px;
							background: #5D8CC2;
							color: #fff;
							text-align: center;
							font-size: 14px;
						}
						>img {
							width: 22px;
							height: 18px;
							margin: 0 6px;
						}

						>span {
							display: inline-block;
							position: relative;
							top: -10px;
							color: $purple;
						}
					}

					>div:last-child {
						text-align: right;

						>button {
							background-color: $purple;
							padding: 6px 35px;
							color: #fff;
							border-radius: 22px;
						}
					}
				}
			}

			>.pages {
				display: flex;
				justify-content: center;
				margin-top: 30px;

				>li {
					padding: 10px;
					border: 1px solid #e5e5e5;
					margin-right: 10px;
					border-radius: 6px;
				}

				>.active {
					border: 1px solid $purple;
					color: $purple;
				}
			}
		}

		>.modal {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			overflow: hidden;

			>.mask {
				width: 100%;
				height: 100%;
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: #000;
				opacity: 0.3;
				overflow: hidden;
			}

			>.content {
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0);
				position: fixed;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				z-index: 100;
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: hidden;
                
				>.content-list {
					width: 400px;
					border-radius: 10px;
					margin: auto;
					background-color: #26292b;
					padding: 15px;
					position: relative;
					.close{
						position: absolute;
						top:5px;
						right: 10px;
						cursor: pointer;
					}

					>.title {
						font-size: 16px;
						line-height: 2.0;
						text-align: center;
					}

					>.trade {
						font-size: 0;

						>p {
							display: inline-block;
							font-size: 15px;
							margin: 15px;
							margin: 10px 10px 10px 0;
							line-height: 1.5;
							padding-bottom: 5px;
						}

						.active {
							border-bottom: 1px solid $purple;
							color: $purple;
						}
					}

					>.totals-num {
						width: 100%;
						height: 40px;
						border: 1px solid #eee;
						font-size: 0;

						>input {
							line-height: 38px;
							padding-left: 10px;
							font-size: 15px;
						}

						>button {
							background-color: rgba(0, 0, 0, 0);
							float: right;
							font-size: 15px;
							line-height: 20px;
							margin-right: 15px;
							margin-top: 9px;
							padding-left: 20px;
							border-left: 1px solid #e5e5e5;
						}

						>span {
							font-size: 15px;
							float: right;
							line-height: 38px;
							margin-right: 20px;
						}
					}

					>.maxnum {
						margin-top: 15px;
					}

					>.trade-totals {
						width: 100%;
						font-size: 0;
						height: 40px;
						line-height: 40px;

						>.total-price {
							float: left;
							font-size: 15px;
						}

						>.prices {
							font-size: 15px;
							float: right;


						}
					}

					>.tip {
						color: $purple;
						font-size: 14px;
					}

					>.btns {
						margin-top: 10px;
						font-size: 0;
						height: 40px;

						>.cannel {
							width: 48%;
							height: 40px;
							line-height: 40px;
							background-color: #e7eaff;
							color: #333;
							text-align: center;
							border-radius: 6px;
							float: left;
							font-size: 15px;
						}

						>.comfirm {
							float: right;
							width: 48%;
							height: 40px;
							line-height: 40px;
							background-color: $purple;
							border-radius: 6px;
							font-size: 15px;
							color: #fff;
						}
					}

				}
			}
		}
	}

	.splite {
		height: 22px;
		width: 2px;
		background-color: hsla(0,4%,82%,.5);
		display: inline-block;
		margin: 0 20px;
	}
</style>
