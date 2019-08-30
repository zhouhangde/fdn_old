<template>
	<div class="bgf8 bg-part main-wrap scroll">
		<div class="header bgf8 bg-part">
			<!--总资产、记录-->
			<div class="flex ptb20 bdb between clr-part">
				<p class>
					{{$t('account.totalassets')}}：
					<span class="asset_num">{{total}}</span>
					<span class="asset_name">BTC</span>
					<span class="ft12">
            ≈
            <span>{{totalCNY}}</span>CNY
          </span>
					<!-- <label class="min_lab ft14"><input type="checkbox" />隐藏小额资产</label><i></i><label class="inp_lab"><input  type="text"/><i></i></label> -->
				</p>
				<div class="flex alcenter">
					<div class="hide-min">
						<!-- <p>
                          <router-link
                            class="fr txt_blue"
                            style="font-size:14px;"
                            to="/allRec"
                          >{{$t('account.allRec')}}</router-link>
                        </p> -->
					</div>
					<router-link to="/withDraw" class="txt_blue ft14 curPer">{{$t('account2.list')}}</router-link>
					<p class="right_text txt_blue ml20">
						<!-- <span class="record" @click="record">财务记录</span> -->
						<span
							class="address ft14 txt_blue"
							@click="withdraw_address"
						>{{$t('account.upaddress')}}</span>
					</p>
				</div>
			</div>
			<!--隐藏、搜索-->
			<div class="flex between alcenter ptb20 clr-part">
				<p class="flex alcenter">
					<input
						type="checkbox"
						id="min"
						v-model="hideMin"
						:checked="hideMin"
						style="margin:0 5px 0 0px"
					>
					<label for="min" class="ft14">{{$t('account.hideSm')}}</label>
				</p>
				<!--搜索-->
				<p class="flex alcenter search_box">
					<input type="text" v-model="keyword" :placeholder="$t('inpCur')" class="search">
					<span class="search_icon"><img src="../../assets/images/search.png"></span>
				</p>
			</div>
		</div>
		<div class="content ft12">
			<div class="content_top flex alcenter fColor2 clr-part">
				<p class="flex1 tl">
					{{$t('market.currency')}}
					<i></i>
				</p>
				<p class="flex1 tc">{{$t('center.available')}}</p>
				<p class="flex1 tc">{{$t('account.freezes')}}</p>
				<p class="flex1 tc">锁仓</p>
				<p class="flex1 tc">{{$t('account.conversion')}}(BTC)</p>
				<!-- <p class="flex1 tc">BTC估值<i></i></p> -->
				<!-- <p class="flex1 tc">锁仓</p> -->
				<p class="flex1 tr">{{$t('do')}}</p>
			</div>
			<ul class="content_ul">
				<li
					v-for="(item,index) in asset_list"
					:key="index"
					:hidden="((item.balance - 0 - item.min_number)<=0&&hideMin)||search(item.currency_name)"
				>
					<div class="content_li flex alcenter between bdr-part">
						<p class="flex1 tl">{{item.currency_name}}</p>
						<p class="flex1 tc">{{item.balance}}</p>
						<p class="flex1 tc">{{item.lock_balance}}</p>
						<p class="flex1 tc">{{item.system_lock_balance}}</p>
						<p class="flex1 tc">{{item.btc_balance}}(BTC) ≈ {{item.rate_balance | tofixed}}(CNY)</p>
						<!-- <p class="flex1 tc">{{item.lock_position}}</p> -->
						<p class="flex1 tr operation">
              <span
				  v-if="item.is_recharge==0"
				  @click="noopen"
				  class="no_open"
			  >{{$t('account.charging')}}</span>
							<span
								class="txt_blue"
								v-if="item.is_recharge==1"
								@click="excharge(index,item.currency_id,item.address)"
							>{{$t('account.charging')}}</span>
							<span
								v-if="item.is_pick_up==0"
								@click="noopen"
								class="no_open"
							>{{$t('account.withdraw')}}</span>
							<span
								class="txt_blue"
								v-if="item.is_take==1"
								@click="withdraw(index,item.currency_id,item.currency_name,item.min_take_number,item.take_rate,item.rate_type,item.thisid,item.memo_show)"
							>{{$t('account.withdraw')}}</span>
							<span
								v-if="item.is_take==0"
								@click="noopen"
								class="no_open"
							>{{$t('account.withdraw')}}</span>
							<!-- <span class="txt_blue" @click="rec(index,item.currency_id)">{{$t('account.record')}}</span> -->
						</p>
					</div>
					<!--充币区-->
					<div class="hide_div bdr-part" v-if="index == active">
						<p class="fColor2 ft12">{{$t('account.cgaddress')}}</p>
						<p class="mt50 mb50">
							<span class="ft18 excharge_address" :class="{'bg':flags}">{{excharge_address}}</span>
							<span id="copy" @click="copy" class="copy ft14 txt_blue">{{$t('account.copy')}}</span>
							<span class="ewm_wrap">
                <span class="ewm ft14 txt_blue" @click="show_ewm">{{$t('account.code')}}</span>
                <div class="ewm_img" id="code" :class="{'hide':isHide}"></div>
								<!-- <img class="ewm_img" :class="{'hide':isHide}" src="../../assets/images/ewm.jpg" /> -->
              </span>
						</p>
						<p v-if="item.memo_show == '1'" class="ft14">{{$t('account2.address')}}：{{item.memo}}<span
							class="ml20 txt_blue curPer copy_memo"
							@click="copy_memo(item.memo)">{{$t('account.copy')}}</span></p>
						<!-- <p class="ft12 fColor2 mb50">查看<span class="excharge_record">充币记录</span>跟踪状态</p> -->
						<p class="ft12 fColor2 mb15 mt50">{{$t('account.notice')}}</p>
						<ul class="tips_ul ft12 fColor2">
							<!-- <li class="tips_li" style="list-style:disc inside" v-for="item in tip_list">{{item}}</li> -->
							<li>
								• {{$t('account.a1')}}{{item.currency_name}}{{$t('account.a2')}}
								<br>
								• {{item.currency_name}} {{$t('account.a3')}}
								<br>
								• {{$t('account.a4')}}
								<br>
								• {{$t('account.a5')}}：{{minNum}} {{item.currency_name}} ，{{$t('account.a6')}}
								<br>
								• {{$t('account.a7')}}
								<br>
								• {{$t('account.a8')}}
							</li>
						</ul>
					</div>
					<!--提币区-->
					<div class="hide_div bdr-part" v-if="index == active01">
						<p class="fColor2 ft12 mb15">{{$t('account.whaddress')}}</p>
						<!-- <input class="address_inp clr-part  mb30" type="text" v-model="address" /> -->
						<select class="address_inp clr-part mb30" v-model="address" @change="sel_add">
							<option value>{{$t('account.chaddress')}}</option>
							<option
								:value="item.address"
								v-for="(item,index) in addressList"
								:key="index"
							><span>{{item.address}}</span> <span
								class="ml20">{{$t('set.remarks')}}：{{item.notes}}</span></option>
						</select>
						<!--地址标签-->
						<div v-if="item.memo_show == '1'">
							<p class="fColor2 ft12 mb15 flex between alcenter">
								<span>{{$t('account2.address')}}</span>
							</p>
							<label class="num_lab flex between mb30">
								<input class="clr-part" type="text" :placeholder="$t('account2.address')"
									   v-model="memos" disabled>
							</label>
						</div>
						<p class="fColor2 ft12 mb15 flex between alcenter">
							<span>{{$t('number')}}</span>
							<span>
                {{$t('center.available')}}：
                <span
					class="use_num"
				>{{item.balance}} {{item.currency_name}}</span>
                <span></span>
              </span>
						</p>
						<label class="num_lab flex between mb30">
							<input class="clr-part" type="text" :placeholder="min_number" v-model="number">
							<span>{{coinname}}</span>
						</label>
						<div class="flex mb30">
							<div class="left_inp_wrap flex1">
								<p class="fColor2 ft12 mb15">
									<span>{{$t('rate')}}</span>
									<!-- <span>{{$t('account.range')}}：<span>{{ratenum}}</span></span> -->
								</p>
								<label class="range_lab flex alcenter between">
									<input class="clr-part" disabled type="text" v-model="rates">
									<span>{{coinname}}</span>
								</label>
							</div>
							<div class="right_inp_wrap flex1">
								<p class="mb15">
									<span class="fColor2 ft12">{{$t('account.havenum')}}</span>
								</p>
								<label class="get_lab flex alcenter between">
									<input
										class="clr-part"
										v-if="item.rate_type == 1"
										disabled
										v-model="reachnum"
										type="number"
									>
									<input
										class="clr-part"
										v-if="item.rate_type == 2"
										disabled
										v-model="reachnum"
										type="number"
									>
									<span>{{coinname}}</span>
								</label>
							</div>
						</div>
						<!-- <p class="fColor2 ft12 mb15">{{$t('account.uppwd')}}</p>
                        <input class="address_inp clr-part mb30" type="password" v-model="password"> -->
						<p class="fColor2 ft12 mb15">{{$t('account2.code')}}</p>
						<p class="flex alcenter center mb30">
							<input class="address_inp clr-part" type="text" v-model="codes">
							<button class="w20 blue_bg radius5 send_code tc ml20" :disabled="disable" @click="sendCode">
								{{getCode}}
							</button>
						</p>
						<div class="flex mb15">
							<div class="flex2">
								<!-- <p class="ft12 fColor2 mb15">温馨提示</p> -->
								<ul class="tips_ul ft12 fColor2" style="list-style:disc inside">
									<li>{{$t('account.minnum')}}：{{min_number}}{{item.currency_name}}。</li>
									<li>{{$t('account.call')}}</li>
									<li>{{$t('account.a8')}}</li>
								</ul>
							</div>
							<div class="flex1 tr">
								<button class="withdraw_btn" @click="mention">{{$t('account.withdraw')}}</button>
							</div>
						</div>
						<!-- <div class="mb15">
                          <p class="ft14">提币列表</p>
                          <p class="ptb10 flex ft12">
                            <span class="flex1 tl">状态</span>
                            <span class="flex1 tc">添加时间</span>
                            <span class="flex1 tc">确认时间</span>
                            <span class="flex1 tc">数量</span>
                            <span class="flex1 tr">说明</span>
                          </p>
                          <ul>
                            <li>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                            </li>
                          </ul>
                        </div> -->
					</div>
					<!--记录区-->
					<div class="hide_div bdr-part rec-box" v-if="index == active02">
						<ul class="flex alcenter ft14 plr30">
							<li class="curPer lock" :class="{'actives':is_lock == 1}" @click="lock(1)">锁定</li>
							<li class="ml20 curPer lock" :class="{'actives':is_lock == 0}" @click="lock(0)">未锁定</li>
						</ul>
						<div class="rec-con">
							<div class="rec-title">
								<span>变动前</span>
								<span>{{$t('number')}}</span>
								<span>变动后</span>
								<span>{{$t('account.record')}}</span>
								<span>{{$t('time')}}</span>
							</div>
							<ul class="rec-list">
								<li v-for="(reItem,reIndex) in recData" v-if="recData.length !=0" :key="reIndex">
									<span>{{reItem.before}}</span>
									<span>{{reItem.change}}</span>
									<span>{{reItem.after}}</span>
									<span>{{reItem.memo}}</span>
									<span>{{reItem.create_time}}</span>
								</li>
								<li
									class="no_rec mt10 txt_blue"
									v-if="recData.length !=0"
									@click="more(item.currency_id)"
								>{{moreLog}}
								</li>
								<li class="no_rec mt10 txt_blue" v-show="recData.length ==0">{{$t('nodata')}}</li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
			<!-- <div class="tc ft16  mt50" v-show="asset_list.length<=0">暂无数据</div> -->
		</div>
	</div>
</template>
<script>
	import indexHeader from "@/view/indexHeader";
	import left from "@/view/left";
	import "@/lib/clipboard.min.js";
	import "@/lib/jquery.qrcode.min.js";
	import tradeVue from '../trade.vue';

	export default {
		name: "finance",
		data() {
			return {
				minBalance: "",
				hideMin: false,
				recData: [],
				token: "",
				flags: false,
				flag: false,
				isHide: true,
				active: "a",
				active01: "a",
				active02: "a",
				addr: "",
				url: "",
				excharge_address: "",
				address: "",
				number: "",
				rate: 0,
				coinname: "",
				balance: "",
				ratenum: "",
				// reachnum:'',
				min_number: "",
				currency: "",
				asset_list: [],
				keyword: "",
				tip_list: [
					"请勿向上述地址充值任何非USDT资产，否则资产将不可找回。",
					"USDT充币仅支持simple send的方法，使用其他方法（send all）的充币暂时无法上账，请您谅解。",
					"请勿向上述地址充值任何非USDT资产，否则资产将不可找回。",
					"USDT充币仅支持simple send的方法，使用其他方法（send all）的充币暂时无法上账，请您谅解。"
				],
				tip_list01: [
					"请勿向上述地址充值任何非USDT资产，否则资产将不可找回。",
					"USDT充币仅支持simple send的方法，使用其他方法（send all）的充币暂时无法上账，请您谅解。",
					"请勿向上述地址充值任何非USDT资产，否则资产将不可找回。",
					"USDT充币仅支持simple send的方法，使用其他方法（send all）的充币暂时无法上账，请您谅解。"
				],
				page: 0,
				moreLog: this.$t("more"),
				rete: "",
				total: "",
				totalCNY: "",
				addressList: [],
				password: "",
				minNum: "",
				rates: "",
				rate_type: "",
				accountNum: '',//账号
				codes: '',
				getCode: this.$t('forget.getcode'),
				disable: false,
				chaint_id: '',
				show_memo: false,  //是否显示地址标签
				memos: '',  //地址标签
				is_lock: 1
			};
		},

		filters: {
			tofixed: function (val) {
				val = Number(val);
				return val.toFixed(2);
			},
			tofixedFour: function (val) {
				val = Number(val);
				return val.toFixed(4);
			},
		},
		components: {
			indexHeader,
			left
		},
		computed: {
			reachnum() {
				//console.log(this.rate_type);
				if (this.rate_type == 1) {
					return this.number - this.number * this.rates;
				} else if (this.rate_type == 2) {
					return this.number - this.rates;
				}
			}
			//  rates(){
			//      return this.number*this.rate;
			//  }
		},
		methods: {
			lock(id) {
				this.page = 0;
				this.recData = [];
				this.is_lock = id;
				this.getLog(this.currency, this.is_lock);
			},
			//选择提币地址
			sel_add() {
				//console.log(this.address);
				for (var i = 0; i < this.addressList.length; i++) {
					if (this.address == this.addressList[i].address) {
						this.memos = this.addressList[i].memo;
						window.localStorage.setItem('chaint_id', this.addressList[i].chaint_id);
						//console.log(i)
					}
				}
			},
			//同步链上余额
			getMoney() {
				this.$http({
					url: '/api/wallet/online',
					headers: {Authorization: this.token}
				}).then(res => {

				})
			},
			search(name) {
				var l = this.keyword.length;
				if (l) {
					if (l > name.length) {
						return true;
					} else {
						if (name.slice(0, l) == this.keyword.toUpperCase()) {
							return false;
						} else {
							return true;
						}
					}
				} else {
					return false;
				}
			},
			//刷新页面
			refresh() {
				this.$http({
					url: "/api/wallet/refresh",
					method: "get",
					data: {},
					headers: {Authorization: this.token}
				}).then(res => {
					if (res.data.type == "ok") {
					}
				});
			},

			goRecord() {
				this.$router.push({name: "coinRecord"});
			},
			init() {
				var that = this;
				var clipboard = new Clipboard(".copy");
				clipboard.on("success", function (e) {
					layer.alert(that.$t("lay.copys"));
				});
				clipboard.on("error", function (e) {
					alert(that.$t("lay.fcopy"));
				});
			},
			getRate(currency) {
				this.$http({
					url: "/api/wallet/get_info",
					method: "post",
					data: {currency: currency},
					headers: {Authorization: this.token}
				}).then(res => {
					if (res.data.type == "ok") {
						this.minNum = res.data.message.min_number;
						this.rate = res.data.message.rate;
					}
				});
			},
			//获得币种地址

			getAddress(currency) {
				var i = layer.load();
				this.addressList = [];
				//    this.$http({
				//         url: '/api/wallet/get_address',
				//         method:'post',
				//         data:{currency:currency},
				//         headers:{'Authorization':this.token}
				//     }).then( res => {
				//         layer.close(i);
				//         if(res.data.type == 'ok'){
				//              this.addressList = res.data.message;
				//         }
				//     })
				this.$http({
					url: "/api/take/address",
					method: "get",
					params: {id: currency},
					headers: {Authorization: this.token}
				}).then(res => {
					layer.close(i);
					//console.log(res);
					if (res.data.type == "ok" && res.data.message.length != 0) {
						this.addressList = res.data.message;
					}
				});
			},
			//充币
			excharge(index, currency, address) {
				//console.log(currency);
				this.currency = currency;
				if (this.flag) {
					this.flag = false;
					this.active = "a";
					this.active01 = "a";
					this.active02 = "a";
				} else {
					// var i = layer.load();
					this.flag = true;
					this.active = index;
					this.active01 = "a";
					this.active02 = "a";
					this.excharge_address = address;
					//console.log(address);
					// 生成二维码
					setTimeout(() => {
						$("#code").qrcode({
							width: 100, //宽度
							height: 100, //高度
							text: address
						});
					}, 1000);
				}
				// this.sendData(currency,i);
				// this.getRate(currency);
			},
			sendData(currency, i) {
				var that = this;
				that.excharge_address = "";
				// $.ajax({
				//     type: "POST",
				//     url: '/api/' + 'wallet/get_in_address',
				//     data: {
				//         currency:currency
				//     },
				//     dataType: "json",
				//     async: true,
				//     beforeSend: function beforeSend(request) {
				//         request.setRequestHeader("Authorization", that.token);
				//     },
				//     success: function(res){
				//         if (res.type=="ok"){
				//             //console.log(res)
				//             that.excharge_address=res.message;
				//             // 生成二维码
				//             $('#code').qrcode({
				//                 width: 100, //宽度
				//                 height:100, //高度
				//                 text:res.message
				//             });
				//         }else{
				//             //console.log(res.message)
				//         }
				//     }
				// })
				this.$http({
					url: "/api/" + "wallet/get_in_address",
					method: "post",
					data: {currency: currency},
					headers: {Authorization: that.token}
				})
					.then(res => {
						layer.close(i);
						//console.log(res);
						if (res.data.type == "ok") {
							that.excharge_address = res.data.message;
							// 生成二维码
							$("#code").qrcode({
								width: 100, //宽度
								height: 100, //高度
								text: res.data.message
							});
						} else {
							//console.log(res.data.message);
						}
					})
					.catch(error => {
						//console.log(error);
					});
			},
			//提币
			withdraw(
				index,
				currency,
				currency_name,
				min_number,
				rate,
				rate_type,
				thisid,
				memo_show
			) {
				//console.log(memo_show)
				if (memo_show == "1") {
					//console.log('jjjjjjjjjjjjj')
					this.show_memo = true
				} else {
					this.show_memo = false
				}
				this.currency = currency;
				this.min_number = min_number;
				this.rate_type = rate_type;
				this.rates = rate;
				this.thisid = thisid;
				if (this.flag) {
					this.flag = false;
					this.active = "a";
					this.active01 = "a";
					this.active02 = "a";
				} else {
					this.flag = true;
					this.active01 = index;
					this.active = "a";
					this.active02 = "a";
					this.getAddress(thisid);
				}
				// this.getNum(currency);
				//  this.getRate(currency);
			},
			//记录
			rec(index, currency) {
				this.currency = currency
				if (this.flag) {
					this.flag = false;
					this.active = "a";
					this.active01 = "a";
					this.active02 = "a";
					//console.log(index);
				} else {
					//console.log(index);
					this.flag = true;
					this.active02 = index;
					this.active = "a";
					this.active01 = "a";
					//充币、提币记录
					this.page = 0;
					this.recData = [];
					this.getLog(currency, this.is_lock);
				}
			},

			getLog(currency, is_lock) {
				this.$http({
					url: "/api/log/user_info",
					method: "post",
					data: {
						type: "change",
						currency_id: currency,
						is_lock: is_lock,
						page: this.page
					},
					headers: {Authorization: this.token}
				}).then(res => {
					//console.log(res);
					//console.log(res.data.message.list);
					if (res.data.type == "ok") {
						//console.log(res);
						this.recData = this.recData.concat(res.data.message.list);
						if (res.data.message.list.length != 0) {
							this.moreLog = this.$t("more");
						} else {
							this.moreLog = this.$t("nomore");
						}
					}
				});
			},
			//加载更多记录
			more(currency) {
				this.moreLog = this.$t("loading");
				this.page++;
				this.getLog(currency, this.is_lock);
			},

			getNum(currency) {
				var that = this;
				$.ajax({
					type: "POST",
					url: "/api/" + "wallet/get_info",
					data: {
						currency: currency
					},
					dataType: "json",
					async: true,
					beforeSend: function beforeSend(request) {
						request.setRequestHeader("Authorization", that.token);
					},
					success: function (res) {
						if (res.type == "ok") {
							//console.log(res);
							that.coinname = res.message.name;
							that.balance = res.message.change_balance;
							that.min_number = res.message.min_number;
							that.minnumber = res.message.min_number;
							that.ratenum = res.message.rate + "-" + res.message.rate;
							// that.reachnum=this.number - this.number*res.message.rate;
							that.rate = res.message.rate;
						} else {
							//console.log(res.message);
						}
					}
				});
			},
			noopen() {
				layer.msg(this.$t("lay.notopen"));
			},
			//发送验证码
			sendCode() {
				var i = layer.load();
				var timer = ''
				if (!this.disable) {
					timer = 30
				}
				this.$http({
					url: '/api/send/code',
					methods: 'post',
					headers: {Authorization: this.token}
				}).then(res => {
					layer.close(i)
					layer.msg(res.data.message)
					if (res.data.type == 'ok') {
						this.disable = true;
						var times = setInterval(() => {
							timer--;
							this.getCode = timer + 's'
							if (timer < 0) {
								clearInterval(times);
								this.disable = false;
								this.getCode = this.$t('forget.getcode')
							}
						}, 1000)
					}
				})

			},
			// 提币按钮
			mention() {
				var that = this;
				var chaint_id = localStorage.getItem('chaint_id')
				// //console.log(that.chaint_id)
				var currency = this.currency;
				var address = this.address;
				var number = this.number;
				var rate = this.rate;
				var min_number = this.minnumber;
				var thisid = this.thisid;
				//console.log(rate);
				if(!address){
				    layer.alert(that.$t('lay.caddress'));
				    return;
				}
				if (!number) {
					layer.alert(that.$t("lay.cnumber"));
					return;
				}
				// if (!this.password) {
				//   layer.alert(that.$t("lay.cpwd"));
				//   return;
				// }
				if (number - 0 < min_number) {
					//console.log(number, min_number);
					return layer.alert(that.$t("lay.minnum"));
				}
				// if(rate=='' || rate>=1){
				//     layer.alert('请输入0-1之间的提币手续费');
				//     return;
				// }
				var i = layer.load();
				var data = {
					currency_id: currency,
					number: number,
					// rate: rate,
					address: address,
					// password: this.password,
					chaint_id: chaint_id,
					code: this.codes
				}
				if (that.show_memo) {
					data.memo = this.memos;
				}
				$.ajax({
					type: "POST",
					url: "/api/" + "take/apply",
					data: data,
					dataType: "json",
					async: true,
					beforeSend: function beforeSend(request) {
						request.setRequestHeader("Authorization", that.token);
					},
					success: function (res) {
						window.localStorage.setItem('chaint_id', '')
						layer.close(i);
						//console.log(res);
						if (res.type == "ok") {
							layer.msg(res.message);
							setTimeout(() => {
								window.location.reload();
							}, 1500);
						} else if (res.type == "998") {
							layer.msg(res.message);
							setTimeout(() => {
								that.$router.push("/components/resetLegalPwd");
							}, 1000);
						} else {
							layer.msg(res.message);
						}
					}
				});
			},
			exchange() {
			},
			//复制
			copy() {
				var that = this;
				var clipboard = new Clipboard(".copy", {
					text: function () {
						return that.excharge_address;
					}
				});
				clipboard.on("success", function (e) {
					that.flags = true;
					layer.msg(that.$t("lay.copys"));
				});
				clipboard.on("error", function (e) {
					that.flags = false;
					layer.msg(that.$t("lay.fcopy"));
				});
			},
			//复制标签
			copy_memo(memo) {
				var that = this;
				var clipboard = new Clipboard(".copy_memo", {
					text: function () {
						return memo;
					}
				});
				clipboard.on("success", function (e) {
					// that.flags = true;
					layer.msg(that.$t("lay.copys"));
				});
				clipboard.on("error", function (e) {
					// that.flags = false;
					layer.msg(that.$t("lay.fcopy"));
				});
			},
			record() {
				this.$router.push({name: "finanrec"});
			},
			withdraw_address() {
				this.$router.push({name: "withdraw_address"});
			},
			show_ewm() {
				if (this.isHide) {
					this.isHide = false;
				} else {
					this.isHide = true;
				}
			},
			getdata() {
				var load = layer.load();
				var that = this;
				//console.log(that.token);
				// $.ajax({
				//     url: '/api/' + "wallet/list",
				//     type: "POST",
				//     dataType: "json",
				//     async: true,
				//     beforeSend: function beforeSend(request) {
				//        request.setRequestHeader("Authorization", that.token);
				//     },
				//     success: function (data) {
				//     //console.log(data)
				//     if (data.type == 'ok') {
				//         that.asset_list=data.message.change_wallet.balance;
				//     } else if (data.type == '999') {

				//     }
				//     }
				// });
				this.$http({
					url: "/api/" + "wallet/info",
					method: "get",
					data: {},
					headers: {Authorization: that.token}
				})
					.then(res => {
						layer.close(load);
						//console.log(res.data);
						that.minBalance = res.data.message.min_balance;
						that.asset_list = res.data.message.change.balance;
						that.total = res.data.message.change.total_btc;
						that.totalCNY = res.data.message.change.total_rate;
						// that.refresh();
						// this.asset_list.forEach((item,index) => {
						//     this.$http({
						//         url: '/api/wallet/legal_log',
						//         method:'post',
						//         data:{type:'2',currency:item.currency},
						//         headers:{'Authorization':this.token}
						//     }).then( res => {
						//         //console.log(res);
						//         //console.log(res.data.message.list)
						//         if(res.data.type == 'ok'){
						//             this.recData[index] = res.data.message.list;
						//             console.log(this.recData[index])
						//         }
						//     })
						// })
					})
					.catch(error => {
						console.log(error);
					});
			}
		},
		created() {
			this.token = localStorage.getItem("token") || "";
			this.getMoney();
			// this.address=localStorage.getItem('address') || '';
			// console.log(this.address)
			// if(this.address){
			//     this.$http({
			//         url:'/api/'+'money/rechange?user_id='+this.address,
			//         type:'GET'
			//     }).then(res=>{
			//         console.log(res)
			//         this.addr=res.data.message.company_eth_address;
			//         this.url='http://qr.liantu.com/api.php?&w=300&text='+res.data.message.company_eth_address;
			//         var content = this.addr;
			//         // var clipboard = new Clipboard('#copy')
			//     }).catch(error=>{
			//         return error
			//     })
			// }
		},

		mounted() {
			var that = this;
			that.getdata();
			this.init();
		}
	};
</script>
<style scoped lang="scss">
	.lock {
		padding-bottom: 5px;
	}

	.actives {
		border-bottom: 2px solid #d45858;
		color: #d45858;
	}

	.search_box {
		border: 1px solid #ddd;
		border-radius: 15px;
		padding: 0 15px;
	}

	.search_icon {
		border-left: 1px solid #ddd;
		padding-left: 5px;
	}

	.search {
		font-size: 14px;
		line-height: 30px;
	}

	.no_open {
		color: #aaa;
		cursor: not-allowed !important;
	}

	.header {
		padding: 15px 30px;
		overflow: hidden;
	}

	.min_lab {
		margin: 0 10px;
	}

	.min_lab input {
		margin-right: 3px;
	}

	.inp_lab {
		border: 1px solid #6b80ae;
		border-radius: 2px;
		padding: 3px 5px;
	}

	.inp_lab input {
		background: none;
		border: none;
		width: 120px;
	}

	.right_text {
		color: #563bd1;
	}

	.right_text span {
		cursor: pointer;
	}

	.record {
		margin-right: 10px;
	}

	.content_ul {
		padding: 0 20px;
	}

	.content_top {
		padding: 10px 20px;
		// background: #161617c7;
	}

	.content_li {
		padding: 15px 0;
		border-bottom: 1px solid #ccc;
		color: #4A4A4A;
		// font-weight: bold;
	}

	.operation,
	.copy,
	.ewm {
		// color: #d45858;
		color: #563bd1;
	}

	.copy {
		margin: 0 30px;
	}

	.copy:hover {
		cursor: pointer;
	}

	.ewm:hover {
		cursor: pointer;
	}

	.operation span {
		cursor: pointer;
	}

	.hide_div {
		border: 1px solid #ccc;
		padding: 20px;
	}

	.excharge_record {
		color: #d45858;
	}

	input {
		background: none;
		border: none;
	}

	.address_inp {
		width: 100%;
		border: 1px solid #6b80ae;
		border-radius: 3px;
		padding: 15px 15px;
	}

	.num_lab {
		display: flex;
		width: 100%;
		border: 1px solid #6b80ae;
		border-radius: 3px;
		padding: 15px;
	}

	.num_lab input {
		width: 100%;
	}

	.range_lab,
	.get_lab {
		border: 1px solid #6b80ae;
		border-radius: 3px;
		padding: 15px;
	}

	.right_inp_wrap {
		margin-left: 20px;
	}

	.use_num,
	.advance {
		color: #d45858;
	}

	.use_num {
		margin-right: 5px;
	}

	.advance {
		margin-left: 5px;
	}

	.withdraw_btn {
		background-color: #d45858;
		color: #fff;
		padding: 15px 70px;
		border: none;
		border-radius: 5px;
	}

	.withdraw_btn:hover {
		cursor: pointer;
	}

	.bg {
		// background: #2b3c71;
	}

	.ewm_wrap {
		position: relative;
	}

	.ewm_img {
		width: 120px;
		height: 120px;
		position: absolute;
		top: 25px;
		left: -30px;
		// border: 10px solid #262a42;
	}

	.hide {
		display: none;
	}

	.rec-box {
		max-height: 400px;
		overflow: auto;

		&::-webkit-scrollbar {
			/*滚动条整体样式*/
			width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
			height: 8px;
		}

		&::-webkit-scrollbar-thumb {
			/*滚动条里面小方块*/
			border-radius: 10px;
			-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			background: #9e9898;
		}

		&::-webkit-scrollbar-track {
			/*滚动条里面轨道*/
			-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 10px;
			background: #ededed;
		}

		.rec-con {
			margin: 10px;
			padding: 0 20px;
			// background: #262a42;
			span {
				flex: 1;
				text-align: center;
				line-height: 3;
			}

			.rec-title {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				// color:#fff;
				line-height: 1.5;
			}

			li {
				display: flex;

				justify-content: space-between;
				font-size: 12px;
				// color: #728daf;
				// border-top: 1px solid #181b2a;
			}
		}
	}

	.no_rec {
		justify-content: center !important;

		&:hover {
			cursor: pointer;
		}
	}

	.main-wrap {
		// height: 820px;
		overflow: auto;
	}

	.txt_blue {
		color: #4A90E2;
	}

	.send_code {
		padding: 15px 0;
		cursor: pointer;
	}
</style>


