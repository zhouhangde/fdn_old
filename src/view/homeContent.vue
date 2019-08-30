<template>
	<div class="indexBlackes mt45">
		<div :style="{height:bannerHeight + 'px'}">

			<el-carousel :interval="3000" arrow="never" :height="bannerHeight + 'px'">
				<el-carousel-item v-for="(item,index) in pics" :key="index" class=" hidden">
					<span class="block"
						  :style="{backgroundImage: 'url(' + item.pic + ')', backgroundSize:'100% 100%',height:bannerHeight + 'px',width:'100%'}"></span>
				</el-carousel-item>
			</el-carousel>
			<!-- <div :style="bgImg" ></div> -->
		</div>
		<!--		一键购买-->
		<section exchange_rate="6.89" data-v-bab33c70="" style="display: block">
			<div class="pur-back" data-v-bab33c70="">
				<div class="pur-center" data-v-bab33c70="">
					<div class="pur-content" data-v-bab33c70="">
						<div class="pur-text" data-v-bab33c70=""><p class="pur-title" data-v-bab33c70=""><img
							src="../assets/images/quickbuy.svg"
							data-v-bab33c70="">我要买</p>
							<div class="pur-reference" data-v-bab33c70=""><span class="reference"
																				data-v-bab33c70="">参考价</span>
								<div class="reference-icon" data-v-bab33c70="">
									<div class="arrow_box" data-v-bab33c70="">非最终交易单价，仅供参考</div>
								</div>
								<span class="referenceText" data-v-bab33c70="">6.98 CNY/USDT</span></div>
						</div>
						<form onsubmit="return!1" action="" class="pur-input" data-v-bab33c70="">
							<el-select v-model="value"  size="medium" placeholder="USDT">
								<el-option
									v-for="item in coins"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									<span style="float: left">{{ item.label}}</span>
									<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value}}</span>
								</el-option>
							</el-select>
							<a class="shortcut" data-v-bab33c70="" @click="goLegalTrade('/legalTrade')">
								购买 <img src="../assets/images/quickbuy01.svg" alt=""></a></form>
					</div>
				</div>
			</div>
		</section>


		<!--涨幅榜-->
		<ul class="flex alcenter market_list">
			<li class="flex flex1 market_li around curPer"
				@click="goTrade(item.legal_id,item.currency_id,item.legal_name,item.currency_name,item.now_price,item.change,item.volume,item.cny_price)"
				v-for="(item,index) in sortList" :key="index" v-if="index<6">
				<div class="flex column">
					<span class="symbol blue ft12">{{item.currency_name}}/{{item.legal_name}}</span>
					<!--					<span class="nowPrice greens ft20" :style="{color:parseFloat(item.change)<0?'#FF4F00':''}">{{item.now_price}}</span>-->
					<span class="nowPrice  ft20">{{item.now_price}}</span>
					<span class="blue ft12">≈{{item.cny_price}}CNY</span>
					<span class="volume ft16">
						24H Vol {{item.volume}}
					</span>
				</div>
				<p class="rateup greens ft16" :style="{color:parseFloat(item.change)<0?'#FF4F00':''}">
					{{parseFloat(item.change)>=0?'+'+(item.change-0).toFixed(2):(item.change-0).toFixed(2)}}%</p>
			</li>
		</ul>
		<div style="background:#fff!important;color:#333!important">


			<div class="notice_box">
				<div class="notice_list">
					<span v-for="item in noticeList" :key="item.id" class="fl list"
						  @click="$router.push({path:'components/noticeDetail',query:{id:item.thisid}})"><a
						class="notice_a ft12" :data-id='item.id'>{{item.title}}</a></span>
				</div>

			</div>

			<div class="coin-tab ft14 flex between alcenter">
				<ul class="coins">
					<li v-for="(coin,index) in quotation" :key="index" @click="nowCoin = coin.name"
						:class="{activeCoin:nowCoin == coin.name}">{{coin.name}}<span class=''
																					  v-if="nowCoin == coin.name"></span>
					</li>
					<li :class="{activeCoin:nowCoin == '自选'}" @click="nowCoin ='自选'">{{$t('home.myMarkets')}}</li>
				</ul>
				<!-- <div>
                 <el-input v-model="keyword" prefix-icon="el-icon-search" size="mini" clearable :placeholder="$t('inpCur')"></el-input>
                 </div> -->
			</div>
			<div class="coins-list ft12">
				<div class="list-title">
					<span>{{$t('home.pair')}}</span>
					<span>{{$t('home.price')}}({{nowCoin}})</span>
					<span>{{$t('home.change')}}</span>
					<span>{{$t('home.high')}}</span>
					<span>{{$t('home.min')}}</span>
					<span>{{$t('home.volume')}}</span>

					<!--					<span>{{$t('home.trade')}}</span>-->
					<span></span>
				</div>

				<ul class="list-con scroll" v-for="(item,index) in quotation" :key="index">
					<li v-for="(li,inde) in item.array" :key="inde" :data-name='li.currency_id+"/"+li.legal_id'
						v-if="(li.added&&nowCoin == $t('home.myMarkets')) ||li.legal_name == nowCoin"
						@click="setCurrent(index,inde)">
						<!-- <div v-if="search(li.currency_name)&&testItem(li.legal_name,li.added)"> -->
						<div class="two-coin">
							<!-- <img :src="li.logo" alt="" style="width:30px;"> -->
							<span style="font-weight:"><span class="">{{li.currency_name}}</span><span class="gray">/{{li.legal_name}}</span></span>
						</div>
						<div class="yester">
							<!-- <span :class="setColor(li.change)">{{li.now_price==null?'0':li.now_price}}</span>/ -->
							<span class=" ">{{li.now_price==null?'0':li.now_price}}</span>
						</div>
						<div class="yes-toa">
							<!-- <span :class="setColor(li.last_price,li.yesterday_last_price)">{{li.change == null?'+0.000':li.change}}%</span> -->
							<span :class="setColor(li.change)" class=" change">{{(li.change>0?'+':'')+(li.change-0).toFixed(2)}}%</span>
						</div>
						<div>
							<span class="  high_price">{{li.high_price}}</span>
						</div>
						<div>
							<span class="  low_price">{{li.low_price}}</span>
						</div>
						<div class="count   volume">{{li.volume == null?'0':li.volume}}</div>
						<div class="" style="color:#194B64;">
							<span class=" fr el-icon-star-on" v-if="li.added"
								  @click="addDelete('user_delete',li.thisid)"
								  style="line-height:30px;margin-left:20px"></span>
							<span class=" fr el-icon-star-off" v-if="!li.added"
								  style="line-height:30px;margin-left:20px"
								  @click="addDelete('user_add',li.thisid)"></span>
							<!--							<span class="fr" @click="setCurrent(index,inde)">{{$t('home.toTrade')}}</span>-->
							<!-- <span :hah='testMy(li.currency_id,li.legal_id)'>{{li.currency_id +''+li.legal_id}}</span> -->
						</div>
						<!-- <div>
                          <span @click="setData({currency_id:item.id,legal_id:li.currency_id,currency_name:item.name,leg_name:li.name,isShow:index})">交易 </span>
                        </div> -->
						<!-- </div> -->
					</li>
				</ul>
			</div>
			<!---图文内容---->
			<div class="feature_wrap">
				<h2>{{$t('home.c01')}}</h2>
				<p>{{$t('home.c02')}}</p>
				<ul class="feature_list slide_ani a-fadeinB clearfix">
					<li class="feature_safe">
						<h3>{{$t('home.c03')}}</h3>
						<p>{{$t('home.c04')}}</p>
						<p>{{$t('home.c05')}}</p>
					</li>
					<li class="feature_eco">
						<h3>{{$t('home.c06')}}</h3>
						<p>{{$t('home.c07')}}</p>
						<p>{{$t('home.c08')}}</p>
					</li>
					<li class="feature_user">
						<h3>{{$t('home.c09')}}</h3>
						<p>{{$t('home.c10')}}</p>
						<p>{{$t('home.c11')}}</p>
					</li>
					;
				</ul>
			</div>
			<div class="client_wrap">
				<div class="wrap_in tc">
					<h2 class="ft28">{{$t('home.c12')}}</h2>
					<p class="nextp">{{$t('home.c13')}}</p>
					<ul class="flex">
						<li class="flex alcenter">
							<p class="p0"></p>
							<span>IPhone</span>
							<div class="codebox tc ft12">
								<img src="../assets/images/appImg.png" alt="">
								<span>Iphone</span>
							</div>
						</li>
						<li class="flex alcenter">
							<p class="p1"></p>
							<span>{{$t('home.android')}}</span>
							<div class="codebox tc ft12">
								<img src="../assets/images/appImg.png" alt="">
								<span>{{$t('home.android')}}</span>
							</div>
						</li>
						<li class="flex alcenter">
							<p class="p2"></p>
							<span>Windows</span>
						</li>
					</ul>
					<div class="mon_mind tc">
						<div>
							<img src="../../static/imgs/pcimg.png" class="pcimg" alt="">
						</div>
						<img src="../../static/imgs/mobimg.png" class="mobimg" alt="">
					</div>
				</div>
			</div>
			<div class="register_wrap tc flex column center">
				<h2>{{$t('home.atrade')}}</h2>
				<div class="flex alcenter mauto rebox">
					<input type="text" class="input-register" :placeholder="$t('home.pinput')" v-model="haccount">
					<button class="ft16" @click="go_register">{{$t('header.up')}}</button>
				</div>
			</div>

			<div class="coinTable" style='display:none'>
				<div class="tabhang">
					<div class="tabul">
						<ul class="clearfix">
							<li :class="{active:index==curCoinTab}" v-for="(tab,index) in quotation" :key="index"
								@click="getCurrent(index)">{{tab.name}}
							</li>
						</ul>
					</div>
					<div class="tabtable">
						<ul class="table-nav">
							<div class="nav_left">
								<li style="width:220px;text-align:left;">交易市场</li>
								<!-- <li>最新成交价</li>
                                <li>涨跌</li> -->
								<li style="width:220px;text-align:center;">最高价 ( 24h )</li>
								<li style="width:220px;text-align:center;">最低价 ( 24h )</li>
								<li style="width:220px;text-align:center;">最新价</li>
								<!-- <li>成交量</li> -->
							</div>
							<li class="last tc fr">操作</li>
						</ul>
						<div class="scroll list-list">
							<ul class="content" v-for="(coin,index) in coin_list">
								<div class="con_left">
									<li class="hovertd" style="width:220px;text-align:left;">
										<i class="iconfont icon-BTCUSDT-copy" style="float:initial;"></i>
										<!-- <span class="hover">{{coin.symbol}}</span><br> -->
										<span>{{coin.name}}</span>
									</li>
									<!-- <li> -->
									<!-- <span >¥ {{coin.quotes.USD.price}}</span> -->
									<!-- <span>{{coin.name}}</span> -->
									<!-- / ¥ {{coin.quotes.USD.price}} -->
									<!-- <i class="iconfont icon-arrow-down"></i> -->
									<!-- </li> -->
									<li style="width:220px;text-align:center;">{{coin.min_price}}</li>
									<li style="width:220px;text-align:center;">{{coin.max_price}}</li>
									<li style="width:220px;text-align:center;">{{coin.new_price}}≈0.00CNY</li>
									<!-- <li class="red" :class="{green:coin.quotes.USD.percent_change_24h.toString().substr(0, 1)=='-'}">
                                        <i v-if="coin.quotes.USD.percent_change_24h.toString().substr(0, 1)=='-'" class="iconfont icon-arrow-down"></i>
                                        <i v-else class="iconfont icon-arrow-up"></i>
                                        {{coin.quotes.USD.percent_change_24h}}%
                                        </li> -->
									<!-- <li>{{coin.highest}}</li>
                                    <li>{{coin.lowest}}</li> -->
									<!-- <li>{{coin.total_supply}}</li> -->
								</div>
								<li class="last fr">
									<a class="baseColor">充币</a>
									<a class="baseColor withdraw">提币</a>
									<a class="baseColor">兑换</a>
									<!-- <button>交易</button> -->
								</li>
							</ul>
						</div>

					</div>
				</div>
			</div>
			<!--图文内容-->
			<div v-if="false">
				<div id="content01" class="content01 flex alcenter   center" style="background:#f3f3f3;padding:50px 0;">
					<div class="text01 mr100 left01 animated">
						<h1 class="ft26 bold mb30">{{$t('home.c1')}}</h1>
						<p class="ft16 bold mb10">{{$t('home.c2')}}</p>
						<p class="ft16 bold mb10">{{$t('home.c3')}}</p>
						<p class="ft16 bold mb10">{{$t('home.c4')}}</p>
					</div>
					<img class="imgs01" src="../assets/images/imgs01.png"/>
				</div>
				<div class="content01 flex alcenter center ">
					<img class="imgs02" src="../assets/images/imgs02.png"/>
					<div class="text01 ml100">
						<h1 class="ft26 bold mb30">{{$t('home.c5')}}</h1>
						<p class="ft16 bold mb10">{{$t('home.c6')}}</p>
						<p class="ft16 bold mb10">{{$t('home.c7')}}</p>
						<p class="ft16 bold mb10">{{$t('home.c8')}}</p>
					</div>

				</div>
				<div class="content01 flex alcenter grayBg center" style="background:#f3f3f3;">
					<div class="text01 mr100">
						<h1 class="ft26 bold mb30">{{$t('home.c9')}}</h1>
						<p class="ft16 bold mb10">{{$t('home.c10')}}</p>
						<p class="ft16 bold mb10">{{$t('home.c11')}}</p>
						<p class="ft16 bold mb10">{{$t('home.c12')}}</p>
						<p class="ft16 bold mb10">{{$t('home.c13')}}</p>
					</div>
					<img class="imgs03" src="../assets/images/imgs03.png"/>
				</div>
				<div class="content01 flex alcenter center bg01   ">
					<img class="imgs04" src="../assets/images/imgs04.png"/>
					<div class="text01 ml100">
						<h1 class="ft26 bold gray9 mb30">{{$t('home.c14')}}</h1>
						<p class="ft16 bold mb10 tr">{{$t('home.c15')}}</p>
					</div>

				</div>
				<div class="content01 flex alcenter grayBg center bg02">
					<div class="text01 mr100">
						<h1 class="ft26 bold mb30">{{$t('home.access')}}</h1>
						<p class="ft16 bold mb10">{{$t('home.cover')}}</p>
					</div>
					<img class="imgs05" src="../assets/images/imgs06.png"/>
				</div>
				<!--马上交易-->
				<div class="go_transfer">
					<h1 class="bold ft24 mb30 tc">{{$t('home.c16')}}</h1>
					<p class="ft14 mb30 tc">{{$t('home.c17')}}</p>
					<div class="login_register flex alcenter center" v-if="!account_number.length">
						<div class="login_btn mr60 bdr-part" @click="go_login">{{$t('logins')}}</div>
						<div class="register_btn white blue_bg" @click="go_register">{{$t('registers')}}</div>
					</div>
				</div>
			</div>
			<!--底部-->
			<!-- <div class="foot flex column alcenter grayBg">
               <h1 class="ft18 mb15">一带一路交易中心</h1>
               <p class="ft12 mb30">我/们/在/去/中/心/化/路/上</p>
               <img src="../assets/images/flags.png" />
            </div> -->
			<!-- <div class="bottom">
                <p>温馨提示</p>
                <p>数字资产是创新的投资产品，价格波动较大，具有较高的投资风险，请您投资前 对数字资产充分认知，理性判断自己的投资能力，审慎做出投资决策。</p>
            </div> -->
		</div>
	</div>
</template>


<script>
	// import defaultImg from "@/../static/imgs/lunbo.png"
	import "@/assets/style/iconfont2.css";
	import "@/assets/style/iconfont.css";
	import "@/assets/style/index.css";
	import Swiper from "swiper";
	import "swiper/dist/css/swiper.min.css";
	import indexHeader from "@/view/indexHeader";
	import homeLogin from "@/view/homeLogin";
	import store from "../store"
	// var echarts = require("echarts");
	export default {
		name: "homeContent",
		components: {indexHeader, homeLogin},
		data() {
			return {
				coins: [{
					value: 'usdt',
					label: 'USDT'
				}],
				pics: [],
				quotation: [],
				nowCoin: "",
				//   banner_imgs:[
				//       {href:'',img:'../assets/images/bg2.png'},
				//       {href:'',img:'../assets/images/bg2.png'},
				//       {href:'',img:'../assets/images/bg2.png'}
				//   ],
				noticeList: [],
				curSwiper: 0,
				curCoinTab: 0,
				coinTabList: [{title: "USDT行情"}, {title: "BTC行情"}],
				coinKlineList: [],
				coinKline: {},
				swiperList: [],
				coinList: [],
				coin_list: [],
				account_number: "",
				token: '',
				myAdd: [],
				sortList: [],
				haccount: '',
				keyword: '',
				bannerHeight: 492,
				bannerWidth: '',
				screenWidth: window.innerWidth,
				value:''
			};
		},
		created() {
			// this.WebSocket();
			let socketState = store.state.socketConnect;
			if (!socketState) {
				//console.log("websocket连接");
				this.WebSocket();
			}
			//console.log("socketState", socketState);
			// this.getMyAdd();
			// this.init(this.initKline);
			this.token = window.localStorage.getItem('token') || '';
			if (this.token) {
				// this.getQuotation()
				this.getMyAdd()
			} else {
				this.getQuotation()
			}
			this.account_number = window.localStorage.getItem("accountNum") || "";

			eventBus.$on("loginSuccess", function () {
				location.reload();
			});
		},
		watch: {
			screenWidth(val) {
				this.bannerWidth = val
				if (val > 1560) {

					this.bannerHeight = 492
				}
				if (val < 1560) {
					this.bannerHeight = 400
				}
				/*else {

				this.bannerHeight = 400
				}*/
			}
		},
		mounted() {
			window.onresize = () => {
				return (() => {
					window.screenWidth = window.innerWidth
					this.screenWidth = window.screenWidth;
				})()
			}
			this.getSwiper();
			this.getSort();
			var mySwiper = new Swiper(".swiper-container01", {
				// 如果需要分页器
				pagination: ".swiper-pagination01",
				paginationClickable: true,
				// 如果需要前进后退按钮
				slidesPerView: 5,
				nextButton: ".swiper-button-next",
				prevButton: ".swiper-button-prev",
				observer: true, //修改swiper自己或子元素时，自动初始化swiper
				observeParents: true //修改swiper的父元素时，自动初始化swiper
			});

			// this.setChart();
			this.$http({
				url: '/api/' + "news/lunbo",
				method: "get",
				data: {
					language: this.$i18n.locale == 'zh' ? 1 : 2,
					// c_id:21
				}
			})
				.then(res => {
					//console.log(res);
					if (res.data.type == 'ok') {
						var list = res.data.message;
						this.noticeList = list;
						// if(list.length>4){

						//   this.noticeList = list.slice(0,4)
						// } else {
						//   this.noticeList = list;
						// }
					}
				})

			//  eventBus.$on('toNew', function (data) {
			//   //console.log(data);
			//   if(data){
			//         var newprice=data.newprice;
			//         var cname=data.istoken
			//         //console.log(that.currency_name)
			//         //console.log(newprice)
			//         $("span[data-name='"+cname+"']").html('$'+newprice);
			//     }
			// });
			// this.connect();
		},
		methods: {
			//去币币交易页
			goTrade(l_id, c_id, l_name, c_name, now_price, change, volume, cny_price) {
				var tradeDatas = {
					currency_id: c_id,
					legal_id: l_id,
					currency_name: c_name,
					legal_name: l_name,
					now_price: now_price,
					change: change,
					volume: volume,
					now_cny_price: cny_price
				};
				window.localStorage.setItem('tradeData', JSON.stringify(tradeDatas))
				this.$router.push('/dealCenter')
			},
			goLegalTrade(path){
				this.$router.push(path)
			},
			//搜索
			// search(name){
			//   var l = this.keyword.length;
			//   if(l){
			//     if(l>name.length){
			//       return false;
			//     } else {
			//       if(name.slice(0,l) == this.keyword.toUpperCase()){
			//         return true;
			//       } else {
			//         return false;
			//       }
			//     }
			//   } else {
			//     return true;
			//   }

			// },
			// testItem(name,added){

			//   if(this.showAdd){
			//     return added
			//   } else {
			//     return name == this.nowLegal
			//   }
			// },
			//涨幅榜
			getSort() {
				this.$http({
					url: "/api/quotation/sort",
					params: {is_show: 1},
					headers: {Authorization: this.token}
				}).then(res => {
					if (res.data.type == 'ok') {
						this.sortList = res.data.message;
					}
				})
			},
			WebSocket() {
				var that = this;
				// 打开一个 web socket
				// var ws = new WebSocket("ws://127.0.0.1:8012/ws");

				var ws = new WebSocket("wss://ws.bitfdn.com/ws");

				ws.onopen = function () {
					// Web Socket 已连接上，使用 send() 方法发送数据
					var sendData = {socket_type: 'daymarket', subscribed: 1}
					sendData = JSON.stringify(sendData);
					//console.log("发送数据方", sendData)
					ws.send(sendData);
				};

				ws.onmessage = function (evt) {
					var msg = JSON.parse(evt.data);
					// //console.log("发送数据方", msg);
					if (msg.type == 'daymarket') {
						//涨幅榜数据推送
						$.each(that.sortList, function (k, v) {
							if (v.currency_id == msg.currency_id && v.legal_id == msg.legal_id) {
								v.change = msg.change;
								v.volume = msg.volume;
								v.now_price = msg.now_price;
								v.cny_price = msg.now_cny_price;
							}
						});
						//行情数据推送
						$.each(that.quotation, function (m, n) {
							$.each(n.array, function (x, y) {
								if (y.currency_id == msg.currency_id && y.legal_id == msg.legal_id) {
									y.change = msg.change;
									y.volume = msg.volume;
									y.now_price = msg.now_price;
									y.cny_price = msg.now_cny_price;
									y.high_price = msg.high_price;
									y.low_price = msg.low_price;
								}
							})
						})
					}
				};

				ws.onclose = function () {
					// 关闭 websocket
					// //console.log(etv.data);
					//console.log("socketState关闭", store.state.socketConnect);

				};
			},
			getMyAdd() {
				if (this.token) {

					this.$http({
						url: '/api/match/my_match',
						params: {type: 'change'},
						headers: {Authorization: this.token}
					}).then(res => {
						if (res.data.type == 'ok') {
							var list = res.data.message;
							this.myAdd = list;

							this.getQuotation();
						}
					})
				} else {
					if (this.$i18n.locale == 'zh') {

						layer.msg('请先登录')
					} else {
						layer.msg('Please sign in')
					}
				}
			},
			testMy(c, l) {
				if (this.myAdd.length) {
					var cid = c;
					var lid = l;
					var s = this.myAdd.filter(function (item) {
						return (item.currencyId == cid && item.legalId == lid);
					})
					if (s.length) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
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
					layer.msg('请先登录')
				}
			},
			getSwiper() {
				var type;
				if (this.$i18n.locale == "zh") {
					type = 1
				}
				if (this.$i18n.locale == "en") {
					type = 3
				}
				if (this.$i18n.locale == "han") {
					type = 5
				}
				if (this.$i18n.locale == "jp") {
					type = 7
				}
				this.$http({
					url: '/api/slide_show/list',
					params: {type}
				}).then(res => {
					//console.log(res);
					this.pics = res.data.message;
				});
			},
			setData(obj) {
				window.localStorage.setItem("tradeData", JSON.stringify(obj));
				this.$router.push("/dealCenter");
			},
			//登录
			go_login() {
				this.$router.push("/components/login");
			},
			//注册
			go_register() {
				this.$router.push("/components/register");
			},
			connect() {
				var that = this;
				//console.log("socket");
				that.$socket.emit("login", this.$makeSocketId());
				that.$socket.on("daymarket", msg => {
					//console.log(msg);
					var cname = msg.currency_id + '/' + msg.legal_id;
					var now_price = msg.now_price;
					var change = (msg.change - 0).toFixed(2);
					if (change < 0) {
						$("li[data-name='" + cname + "']")
							.find(".yes-toa span")
							.css("color", "#ff6e42")
							.html(change + '%');
					} else {
						$("li[data-name='" + cname + "']")
							.find(".yes-toa span")
							.css("color", "#459e80")
							.html('+' + change + '%');
					}
					//console.log(cname);
					// var zf = 0;
					// if (toprice - yesprice == 0) {
					//   zf = "0%";
					// } else if (toprice == 0) {
					//   zf = "-100";
					// } else if (yesprice) {
					//   zf = "+100%";
					// } else {
					//   zf = ((toprice - yesprice) / yesprice / 100).toFixed(2);
					//   if (zf > 0) {
					//     zf = "+" + zf + "%";
					//   } else {
					//     zf = zf + "%";
					//   }
					// }
					// var zf = toprice - yesprice;
					$("li[data-name='" + cname + "']")
						.find(".yester span")
						.html((now_price - 0).toFixed(8));
					// $("li[data-name='" + cname + "']")
					//   .find(".today span")
					//   .html(toprice);

					$("li[data-name='" + cname + "']")
						.find(".high_price")
						.html((msg.high_price - 0).toFixed(8));
					$("li[data-name='" + cname + "']")
						.find(".low_price")
						.html((msg.low_price - 0).toFixed(8));
					$("li[data-name='" + cname + "']")
						.find(".volume")
						.html((msg.volume - 0).toFixed(5));
				});
			},
			setColor(c) {
				if (c >= 0) {
					return "ceilColor";
				} else if (c < 0) {
					return "redColor";
				} else {
					return "";
				}
			},
			setCurrent(index, inde) {

				let msg = this.quotation[index];
				let quo = msg.array[inde];
				var tradeData = {
					currency_id: quo.currency_id,
					legal_id: quo.legal_id,
					currency_name: quo.currency_name,
					legal_name: quo.legal_name,
					isShow: index,
					change: quo.change,
					volume: quo.volume
				};
				window.localStorage.setItem("tradeData", JSON.stringify(tradeData));
				this.$router.push('/dealCenter');
			},
			getQuotation() {
				var i = layer.load();
				this.$http({
					url: "/api/currency/change_match",
					method: "get"
				}).then(res => {
					layer.close(i);
					//console.log(res.data);
					if (res.data.type == "ok" && res.data.message.length != 0) {
						var msg = res.data.message;
						if (this.myAdd.length) {
							//console.log(this.myAdd)
							msg.forEach((item, index) => {
								this.myAdd.forEach((ite, ind) => {
									if (item.legal_id == ite.legal_id) {
										item.array.find((c) => {
											return c.currency_id == ite.currency_id;
										}).added = true;
									}
								})
							})
							//console.log(msg)
						}

						this.quotation = res.data.message;
						//console.log(this.quotation)
						this.nowCoin = this.quotation[0].name;
						let msg = res.data.message[0];
						let quo = msg.array[0];
						var tradeData = {
							currency_id: quo.currency_id,
							legal_id: quo.legal_id,
							currency_name: quo.currency_name,
							legal_name: quo.legal_name,
							isShow: 0,
							change: quo.change,
							volume: quo.volume
						};
						if (!window.localStorage.getItem("tradeData")) {
							window.localStorage.setItem("tradeData", JSON.stringify(tradeData));
						}
					}
				});
			},
			getCurrent(index) {
				this.curCoinTab = index;
			},
			mouseEnter(index) {
				this.curSwiper = index;
			},
			init(callback) {
				this.$http.post("/api/" + "quotation").then(res => {
					if (res.data.type == "ok") {
						this.coinList = res.data.message.coin_list;
						this.swiperList = res.data.message.coin_list;
						callback && callback();
					} else {
						// layer.msg(res.message);
					}
				});
			},
			initKline() {
				this.$http.post("/api/" + "historical_data").then(res => {
					if (res.data.type == "ok") {
						if (res.data.message.day.length > 0) {
							this.coinKline = res.data.message.day[0].data;
							this.coinKlineList = res.data.message.day;
						}
					}
				});
			},
			timestampToTime(timestamp) {
				var date = new Date(timestamp);
				let Y = date.getFullYear() + "/";
				let M =
					(date.getMonth() + 1 < 10
						? "0" + (date.getMonth() + 1)
						: date.getMonth() + 1) + "/";
				let D = date.getDate() + " ";
				return Y + M + D;
			},

			setChart() {
				var myChart = echarts.init(document.getElementById("chart"));
				var that = this;
				// 指定图表的配置项和数据
				var base = 2;
				var date = [];
				var data = [1, 2, 4, 5, 6, 7, 8];
				var now = new Date();
				for (var i in that.coinKlineList) {
					let temp = that.timestampToTime(that.coinKlineList[i].timestamp);
					date.push(temp);
				}
				var option = {
					textStyle: {
						color: "#d45858"
					},
					backgroundColor: "#fff",
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "cross",
							label: {
								backgroundColor: "#fff"
							}
						}
					},
					title: {
						left: "center",
						text: "24小时数据图"
					},
					grid: {
						left: "3%",
						right: "3%",
						bottom: "5%",
						containLabel: true
					},
					toolbox: {
						feature: {
							// dataZoom: {
							//     yAxisIndex: 'none'
							// },
							// restore: {},
							saveAsImage: {}
						}
					},
					xAxis: {
						type: "category",
						boundaryGap: false,
						data: date,
						color: ["#ff9232"]
					},

					yAxis: {
						type: "value",
						yaxisLabel: {
							backgroundColor: "#fff"
						}
					},
					series: [
						{
							name: "当前价格",
							type: "line",
							smooth: true,
							symbol: "none",
							sampling: "average",
							itemStyle: {
								normal: {
									// 6e446e
									color: "#6e446e"
								}
							},
							areaStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
										{
											offset: 0,
											color: "#6e446e"
										},
										{
											offset: 1,
											color: "#1e1e2a"
										}
									])
								}
							},

							data: data
						}
					]
				};

				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			}
			// go_detail(index,inde){
			//   this.$router.push({
			//     path:'/dealCenter',
			//     name:'dealCenter',
			//     params:{
			//       legal_index:index,
			//       currency_index:inde
			//     }
			//   })
			// }
		}
	};
</script>
<style lang='scss' scoped>
	.banner_wrap {
		// background: url('../assets/images/bg-banner.png') top center no-repeat;
		background: #11102c;
		background-size: 100% 100%;
		width: 100%;
		height: 400px;
		/*padding: 3% 10%;*/
	}

	.swiper-container {
		// height: 310px;
	}

	.swiper-slide > img {
		width: 100%;
		height: 400px;
	}

	.swiper-container a {
		display: block;
		// height: 310px;
	}

	.swiper-container img {
		display: block;
		// margin-top: -50px;
		// height: 310px;
	}

	.pur-back[data-v-bab33c70] {
		width: 100%;
		height: 64px;
		text-align: center;
		background-color: #000923;
	}

	.pur-back .pur-center[data-v-bab33c70] {
		text-align: center;
		height: 64px;
		padding: 14px 0;
		position: relative;
	}

	.pur-back .pur-center .pur-content[data-v-bab33c70] {
		text-align: center;
	}

	.pur-back .pur-center .pur-text[data-v-bab33c70] {
		height: 39px;
		text-align: right;
		padding-right: 27px;
		display: inline-block;
		vertical-align: top;
		min-width: 210px;
	}

	.pur-back .pur-center .pur-text .pur-title[data-v-bab33c70] {
		color: #fff;
		font-size: 18px;
		line-height: 1;
	}

	.pur-back .pur-center .pur-text .pur-reference[data-v-bab33c70] {
		color: #869ec9;
		font-size: 12px;
		line-height: 14px;
	}

	.pur-back .pur-center .pur-text .pur-reference .reference[data-v-bab33c70] {
		vertical-align: top;
	}


	.pur-back .pur-center .pur-text .pur-reference .reference-icon[data-v-bab33c70] {
		vertical-align: top;
		position: relative;
		margin: 1px 0 0 2px;
		cursor: pointer;
		width: 12px;
		height: 12px;
		display: inline-block;
		background-size: 12px 12px;
		/*background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHhtbG5zPSJod…AxIDAgMS43MTV6IiBmaWxsPSIjODY5RUM5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=) no-repeat 50%;*/
	}

	.pur-back .pur-center .pur-text .pur-reference .reference-icon .arrow_box[data-v-bab33c70] {
		z-index: 5;
		width: 172px;
		height: 36px;
		padding: 10px 12px;
		display: none;
		background: #fff;
		text-align: center;
		font-size: 12px;
		line-height: 16px;
		color: #596a7a;
		border-radius: 2px;
		-webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12);
		box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12);
		position: absolute;
		top: -44px;
		left: -28px;
	}

	.pur-back .pur-center .pur-text .pur-reference[data-v-bab33c70] {
		color: #869ec9;
		font-size: 12px;
		line-height: 14px;
	}

	.pur-back .pur-center .pur-input[data-v-bab33c70] {
		height: 36px;
		position: relative;
		display: inline-block;
	}

	.pur-back .pur-center .pur-input > a{
		cursor: pointer;
	}

	.pur-back .pur-center .pur-input .select-box[data-v-bab33c70] {
		position: relative;
		z-index: 5;
		width: 160px;
		background: #fff;
		border-radius: 2px;
		-webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12);
		box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12);
		display: inline-block;
		float: left;
		margin-right: 2px;
	}
	.pur-back .pur-center .pur-input .select-box span.BTC[data-v-bab33c70] {
		background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHhtbG5zPSJod…guNDU0eiIgZmlsbD0iI0ZBQUQxNCIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9nPjwvc3ZnPg==) no-repeat 10px;
	}

	.pur-back .pur-center .pur-input .select-box .select-btn .btn-icon[data-v-bab33c70] {
		width: 20px;
		height: 20px;
		margin: 11px 10px 0 0;
		float: right;
		background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgeG1sbnM9Imh0d…QiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik02IDhsNCA0IDQtNCIvPjwvZz48L3N2Zz4=) no-repeat 5px 4px;
	}
	.pur-back .pur-center .pur-input .select-box .select-btn[data-v-bab33c70] {
		display: inline-block;
		width: 100%;
		height: 36px;
		border: none;
		cursor: pointer;
		text-align: left;
	}
	.pur-back .pur-center .pur-input .shortcut[data-v-bab33c70] {
		/*float: left;*/
		display: inline-block;
		text-align: center;
		margin-left: 2px;
		width: 122px;
		height: 36px;
		border-radius: 2px;
		color: #fff;
		font-size: 14px;
		line-height: 36px;
		-webkit-box-shadow: 0 2px 6px 0 rgba(0,0,0,.12);
		box-shadow: 0 2px 6px 0 rgba(0,0,0,.12);
		background: #05c19e;
	}
	.pur-back .pur-center .pur-input .shortcut:hover{
		background-color: #0da88b;
	}

	.coin-tab {
		max-width: 70%;
		margin: 0 auto;
		padding: 10px 0;
		margin-bottom: 10px;
		// background: #110a5d;
		// color: #c7cce6;
		display: flex;

		> ul {
			max-width: 90%;
			display: flex;

			li {
				padding: 0 15px;
				color: #9a9eba;
				border-bottom: 1px solid #fff;
				border-right: 1px solid #ccc;
				// box-shadow: 0 0 1px hsla(231, 9%, 54%, 0.2);
			}

			.activeCoin {
				color: #130928;
				font-weight: 900;
				z-index: 1;
			}
		}
	}

	/* 币种列表 */
	.coins-list {
		margin: 10px auto;
		max-width: 70%;
		line-height: 51px;
		text-align: center;
		margin-top: 0;

		.list-title {
			display: flex;
			padding: 0 30px;
			background: #e8ebf6;

			> span {
				flex: 1;
				font-family: Roboto Condensed, sans-serif;
				font-size: 14px;
				font-weight: 700;
				/*line-height: 1.57;*/

				text-align: center;
				// color: #c7cce6;
				/*font-size: 14px;*/
				color: #9a9e9a;
				/*font-weight: 700;*/
			}

			> span:first-child {
				text-align: left;
			}

			> span:last-child {
				text-align: right;
			}
		}

		.list-con {
			// max-height: 400px;
			overflow-y: scroll;
			// border: 1px solid #563bd1;
			border-top: none;

			li {

				font-family: Roboto Condensed, sans-serif;
				font-size: 12px;
				font-weight: 400;
				font-style: normal;
				font-stretch: condensed;
				color: #130928;
				text-align: right;
				border-bottom: 1px solid #eee;
				cursor: pointer;
				display: flex;
				// border-top: 1px solid #ddd;
				padding: 0px 30px;
				line-height: 40px;
				// color: #c7cce6;
				&:hover {
					background: #f1f6ff;
				}

				.high_blue {
					color: #563BD1;
				}

				.low_blue {
					color: #8D75F7;
				}

				img {
					vertical-align: bottom;
				}

				> div {
					flex: 1;
					text-align: center;
				}

				> div:first-child {
					text-align: left;
				}

				> div:last-child {
					text-align: right;
				}
			}

			li:last-child {
				// border-bottom: 1px solid #ddd;
			}
		}
	}

	.carousel .swiper-slide:hover {
		background-color: #327add;
	}

	.nav_left,
	.con_left {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.withdraw {
		margin: 0 4px;
	}

	.carousel .last a:hover {
		cursor: pointer;
	}

	.sliders {
		width: 100%;
	}

	.sliders img {
		width: 100%;
		// height: 500px;
	}

	.notice_box {
		/*cursor:pointer;*/
		z-index: 4;
		width: 100%;
		height: 52px;
		box-sizing: border-box;
		border-top: 1px solid rgba(29, 50, 66, .7);
		margin-top: -1px;
		background-color: #f6f9fc;
		position: relative;
	}

	.notice_box .notice_list {
		width: 100%;
		margin: 0 30px;
		font-size: 12px;
		line-height: 52px;
		height: 36px;
		overflow: hidden;
		word-break: keep-all;
		text-align: center;
	}

	.notice_box .notice_list .list {
		display: inline-block;
		box-sizing: border-box;
		position: relative;
		padding: 0 2em 0 1.5em;
		text-align: center;
	}

	.notice_box .notice_list .list :hover{
		color:#357ce1;
	}

	.notice_box .notice_list .list::before {
		content: "/";
		position: absolute;
		left: -.5em;
		color: #1c242c;
	}

	.notice_ul {
		/*position:relative;
		overflow: hidden;
		!*line-height: 52px;
		height: 36px;*!
		word-break: keep-all;
		text-align: center;
		padding: 25px 0;
		// background: #161923;
		margin-bottom: 5px;*/
		margin-bottom: 5px;
		background-color: rgb(246, 249, 252);
		font-size: 12px;
		line-height: 52px;
		/*height: 36px;*/
		/*overflow: hidden;
		word-break: keep-all;*/
		text-align: center;
	}

	.notice_li {
		float: left;
		position: relative;
		/*（不换行） white-space: nowrap;*/
		display: block;
		float: left;
		overflow: hidden;
		word-break: keep-all;
		/*margin-bottom: 5px;
		!*font-size: 12px;*!
		line-height: 52px;
		height: 36px;
		overflow: hidden;
		word-break: keep-all;
		text-align: center;*/
		// flex: 1;
		text-align: center;
	}

	.notice_li a {
		height: 36px;
		font-size: 12px;
		padding: 0 25px;
		letter-spacing: 1px;
	}

	.notice_li::after {
		content: "/";
		float: right;
	}

	.notice_li:last-child:after {
		content: "";
		color: #6b80ae;
	}

	.notice_a:hover {
		color: #194B64;
		cursor: pointer;
	}

	.coins li {
		position: relative;
	}

	.arrow {
		border-width: 16px;
		border-right: 8px solid transparent;
		border-left: 8px solid transparent;
		border-top: none;
		border-bottom: 8px dashed;
		position: absolute;
		bottom: 0;
		left: 50%;
		margin-left: -4px;
	}

	.coins li:hover {
		cursor: pointer;
		// background: #303e4c;
	}

	.content01 {
		padding: 40px 0;
		background: #fff;

		.imgs01 {
			width: 300px;
		}

		.imgs02 {
			width: 400px;
		}

		.imgs03 {
			width: 450px;
		}

		.imgs04 {
			width: 450px;
		}

		.imgs05 {
			width: 450px;
		}
	}

	.bg01 {
		background: url("../assets/images/content_bg01.png") center no-repeat;
		width: 100%;
		// height: 300px;
		background-size: cover;
		padding: 50px 0;
	}

	.bg02 {
		background: url("../assets/images/content_bg02.png") center no-repeat;
		width: 100%;
		background-size: cover;
		// padding: 0!important;
		padding: 50px 0;
	}

	.login_btn {
		padding: 15px 80px;
		border: 1px solid rgba(0, 0, 0, 1);
		border-radius: 5px;
		cursor: pointer;
	}

	.register_btn {
		padding: 15px 80px;
		background: #563bd1;
		border-radius: 5px;
		cursor: pointer;
	}

	.go_transfer {
		padding: 50px 0;
	}

	.foot {
		padding: 50px 0;
	}

	.market_list {
		width: 100%;
		box-sizing: border-box;
		border-top: 1px solid hsla(0, 0%, 100%, .15);
		background-color: #000923;
		color: #9eb5ca;
		height: 120px;
		/*width: 100%;
		padding: 0px 0;
		background: #000923;
		border-top: 1px solid #2d2a83;*/
	}

	.market_list li {
		padding: 0 10px;
		margin: 15px 0;
		border-right: 1px solid #2d2a83;
	}

	.blue {
		color: #a8adcc;
	}

	.nowPrice {
		font-size: 20px;
		line-height: 20px;
		color: #d2d6ec;
		margin-top: 8px;

	}

	.symbol {
		margin: 0;
		padding: 0;
		color: #b0b8db;
		font-size: 14px;
		line-height: 14px;
		height: 14px;
	}

	.rateup {
		font-size: 16px;
		top: 0;
		right: 0;
		font-weight: 500;
		margin: 0;
	}

	.volume {
		font-size: 12px;
		line-height: 12px;
		color: #61698a;
		margin-top: 16px;

	}

	.greens {
		color: #27b054;
	}

	.feature_wrap {
		background-color: #fff;
		padding: 90px 0;
		text-align: center;
		color: #54748f;
		line-height: 2em;
	}

	.feature_wrap h2 {
		font-size: 28px;
		margin-bottom: 10px;
		color: #192544;
	}

	.feature_wrap .feature_list {
		padding-top: 80px;
		width: 70%;
		margin: 0 auto;
	}

	.feature_wrap .feature_list li {
		float: left;
		width: 33%;
		background: transparent none no-repeat top;
		padding-top: 218px;
	}

	.feature_wrap .feature_list li.feature_safe {
		background-image: url(../../static/imgs/feature_safe.8e76904.svg);
	}

	.feature_wrap .feature_list li.feature_eco {
		background-image: url(../../static/imgs/feature_eco.svg);
	}

	.feature_wrap .feature_list li.feature_user {
		background-image: url(../../static/imgs/feature_user.7002f27.svg);
	}

	.feature_wrap h3 {
		font-size: 18px;
		font-weight: 700;
		margin-bottom: 10px;
		color: #192544;
	}

	.client_wrap {
		width: 100%;
		height: 710px;
		color: #9eb5ca;
		text-align: center;
		line-height: 2em;
		background-color: #fff;

		.wrap_in {
			height: 548px;
			padding-top: 100px;
			background-color: #1d276f;

			h2 {
				margin-bottom: 24px;
				color: #fff;
				font-weight: 400;
				font-size: 28px;
			}

			.nextp {
				color: #9eb5ca
			}

			ul {
				width: 810px;
				margin: 0 auto;
				text-align: left;
				justify-content: space-around;

				li {
					margin: 0 15px;
					color: #9eb5ca;
					padding: 40px 0;
					line-height: 48px;
					position: relative;
					cursor: pointer;

					p {
						height: 48px;
						width: 48px;
						margin: 0 10px 0 0;
						vertical-align: top;
						border-radius: 50%;
						background: rgba(53, 124, 225, .1) none no-repeat 50%;
						background-image: url(../assets/images/p0.svg)
					}

					.p1 {
						background-image: url(../assets/images/p1.svg)
					}

					.p2 {
						background-image: url(../assets/images/p2.svg)
					}

					.codebox {
						position: absolute;
						left: 51%;
						top: 90px;
						-webkit-transform: translate(-50%);
						-ms-transform: translate(-50%);
						transform: translate(-50%);
						-webkit-box-sizing: border-box;
						box-sizing: border-box;
						width: 120px;
						// height: 130px;
						border: 1px solid #357ce1;
						border-radius: 2px;
						background: #fff none no-repeat 12px 12px/96px 96px;
						text-align: center;
						color: #357ce1;
						font-size: 12px;
						line-height: 18px;
						z-index: 6;
						display: none;

						img {
							width: 100px;
							// height: 100px;
							margin: 0 auto;
							display: block;
							margin-top: 10px;
						}
					}
				}

				li:hover .codebox {
					display: block;
				}
			}

			.mon_mind {
				width: 518px;
				position: relative;
				margin: 0 auto;

				> div {
					width: 100%;

					.pcimg {
						width: 518px;
						margin: 0 auto;
					}
				}

				.mobimg {
					width: 122px;
					position: absolute;
					right: -60px;
					bottom: -20px;
					width: 122px;
					height: 253px;
					background: #0a151e none no-repeat 50%/cover;
					-webkit-box-shadow: -9px 12px 62px 0 rgba(36, 52, 69, .3);
					box-shadow: -9px 12px 62px 0 rgba(36, 52, 69, .3);
					border-radius: 16.47px;
				}
			}
		}
	}

	.register_wrap {
		height: 240px;
		width: 100%;
		border-top: 1px solid #cad7e0;
		background: #fff;

		h2 {
			color: #232a4a;
			font-size: 22px;
			line-height: 24px;
		}

		.rebox {
			margin: 32px auto 0 auto;
		}

		.input-register {
			width: 400px;
			height: 40px;
			font-size: 12px;
			color: #000;
			border: 1px solid #bdced9;
			border-radius: 2px;
			padding-left: 16px;
		}

		button {
			margin-left: 8px;
			display: inline-block;
			height: 40px;
			padding: 0 44px;
			font-size: 16px;
			min-width: 120px;
			-webkit-appearance: none;
			background-color: #357ce1;
			color: #fff;
			border: none;
			outline: none;
			border-radius: 2px;
			cursor: pointer;
		}

		button:hover {
			opacity: .8;
		}
	}
</style>


