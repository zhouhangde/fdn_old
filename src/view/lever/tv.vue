<template>
	<div class="k-line-area bg-1d1d29">
		<div class="flex ft12 top_bg">
			<span class="ft16 bold flex alcenter c_symbol"
				  style="color: #D2D6EC !important;">{{$store.state.symbol}}</span>
			<span class="flex column alcenter center">
        <span class="bold ft16" :style="{color:parseFloat(change)>0?'#41B37D':'#D74E5A'}">{{close}}</span>
        <span class="gray_color bold">≈{{now_cny_price}} CNY</span>
      </span>
			<span class="flex column alcenter">
        <span class="gray_color">{{$t('market.change')}}</span>
        <span
			class="bold"
			:style="{color:parseFloat(change)>0?'#41B37D':'#D74E5A'}"
		>{{(change-0).toFixed(2)}}%</span>
      </span>
			<span class="flex column alcenter">
        <span class="gray_color">{{$t('home.high')}}</span>
        <span class="bold_gray bold">{{(high-0).toFixed(6)}}</span>
      </span>
			<span class="flex column alcenter">
        <span class="gray_color">{{$t('home.min')}}</span>
        <span class="bold_gray bold">{{(low-0).toFixed(6)}}</span>
      </span>
			<span class="flex column alcenter">
        <span class="gray_color">24h{{$t('home.volume')}}</span>
        <span class="bold_gray bold">{{(volume-0).toFixed(2)}} {{currencyName}}</span>
      </span>
			<div class="theme flex">
				<img src="../../assets/images/dark.png" @click="$changeTheme('dark')" alt="">
				<img src="../../assets/images/light.png" @click="$changeTheme('light')" alt="">
			</div>
		</div>
		<div id="tv_chart_container" style="width:100%;height: 470px"></div>
	</div>
</template>

<script>
	// import Datafeeds from "../assets/js/datafeed.js";

	export default {
		name: "tv",

		data() {
			return {
				widget: null,
				symbolInfo: null,
				feed: null,
				wsEx: null,
				ws: null,
				lists: [],
				newData: "",
				bg: "#ffffff",
				grid: "#f7f8fa",
				theme: "",
				csspath: "bundles/new.css",
				high: 0,
				low: 0,
				open: 0,
				close: 0,
				volume: 0,
				currencyId: "",
				legalId: "",
				change: 0,
				nowPrice: 0,
				currencyName: "",
				now_cny_price: "--" //最新价折合人民币
			};
		},
		created() {
			var leverTradeDataMy = window.localStorage.getItem("leverTradeData_my");
			if(leverTradeDataMy!=''&& leverTradeDataMy!=undefined && leverTradeDataMy!=null){
                    var localData = JSON.parse(window.localStorage.getItem("leverTradeData_my"));
					this.currencyId = localData.currency_id;
					this.legalId = localData.legal_id;
					this.change = localData.change;
					this.volume = localData.volume;
					this.currencyName = localData.currency_name;
					this.now_cny_price = localData.now_cny_price;

					this.$store.state.symbol =
					localData.currency_name + "/" + localData.legal_name;  
			}else{
                 if (window.localStorage.getItem("leverTradeData")) {
					var localData = JSON.parse(window.localStorage.getItem("leverTradeData"));
					this.currencyId = localData.currency_id;
					this.legalId = localData.legal_id;
					this.change = localData.change;
					this.volume = localData.volume;
					this.currencyName = localData.currency_name;
					this.now_cny_price = localData.now_cny_price;

					this.$store.state.symbol =
					localData.currency_name + "/" + localData.legal_name;
				}
			}
			
			setTimeout(() => {
				this.getChange();
			}, 800);
			this.getToday(this.currencyId, this.legalId);
		},
		sockets: {},
		computed: {
			listenState() {
				//监听交易对
				return this.$store.state.symbol;
			}
		},
		watch: {
			listenState: function (a, b) {
				//监听交易对
				if (a != b && b != "BTC/2") {
					this.widget.setSymbol(
						a,
						localStorage.getItem("tim"),
						function onReadyCallback() {
						}
					); //切换币种
					// this.$store.state.symbol=b
				}
			}
		},
		mounted() {
			var that = this;
			eventBus.$on("change01", msg => {
				if (msg) {
					// that.change = msg;
					that.currencuId = msg.c_id;
					that.legalId = msg.l_id;
					that.getToday(msg.c_id, msg.l_id);
				}
			});
			eventBus.$on("change", msg => {
				if (msg) {
					that.change = msg;
				}
			});
			eventBus.$on("now_cny_price01", msg => {
				if (msg) {
					// that.now_cny_price = msg;
				}
			});
			eventBus.$on("now_cny_price", msg => {
				if (msg) {
					// that.now_cny_price = msg;
				}
			});

			eventBus.$on("currency_name", msg => {
				if (msg) {
					that.currencyName = msg;
				}
			});

			eventBus.$on("toTrade", msg => {
				if (msg) {
					that.legalId = msg.legal_id;
					that.currencyId = msg.currency_id;
					// that.change = msg.change;
					that.volume = msg.volume;
					that.getToday(msg.currency_id, msg.legal_id);
				}
			});
			$(".chart-page").css("background", "#131a21");
			var theme = window.localStorage.getItem("theme") || "";

			if (theme == "dark") {
				that.bg = "#171b2b"; //背景色
				that.grid = "#222636"; //网格颜色
				that.csspath = "bundles/newdark.css";
				that.createWidget();
			} else {
				that.bg = "#ffffff";
				that.grid = "#f7f8fa";
				that.csspath = "bundles/new.css";
				that.createWidget();
			}
			eventBus.$on("theme", function (data) {
				if (that.theme == data) {
					return;
				}
				if (data == "dark") {
					that.bg = "#171b2b";
					that.grid = "#222636";
					that.csspath = "bundles/newdark.css";
					that.createWidget();
				} else {
					that.bg = "#ffffff";
					that.grid = "#f7f8fa";
					that.csspath = "bundles/new.css";
					that.createWidget();
				}
			});
		},
		destroyed() {
			this.removeWidget();
		},
		beforeDestroy() {
		},

		methods: {
			//请求日数据
			getToday(c_id, l_id) {
				//console.log('sssss', c_id, l_id)
				this.$http({
					url: "/api/quotation/today",
					method: "post",
					data: {
						currency_id: c_id,
						legal_id: l_id
					}
				}).then(res => {
					//console.log(res)
					if (res.data.type == "ok") {
						var msg = res.data.message;
						this.change = msg.change;
						this.close = msg.now_price;
						this.volume = msg.volume;
						this.high = msg.high;
						this.low = msg.low;
						this.now_cny_price = msg.now_cny_price;
					}
				});
			},
			getChange() {
				var that = this;
				var ws = new WebSocket("wss://ws.bitfdn.com/ws");

				ws.onopen = function () {
					// Web Socket 已连接上，使用 send() 方法发送数据
					var sendData = {socket_type: "daymarket", subscribed: 1};
					sendData = JSON.stringify(sendData);
					ws.send(sendData);
				};
				ws.onmessage = function (evt) {
					var msg = JSON.parse(evt.data);
					if (msg.type == "daymarket") {
						//  //console.log(that.$store.state.symbol,msg.currency_name,msg.legal_name,msg)
						if (
							that.$store.state.symbol ==
							msg.currency_name + "/" + msg.legal_name
						) {
							//  //console.log(msg);
							that.change = msg.change;
							that.close = msg.now_price;
							that.volume = msg.volume;
							that.high = msg.high_price;
							that.low = msg.low_price;
							that.now_cny_price = msg.now_cny_price;
							var dataPrice = {
								now_price: msg.now_price,
								now_cny_price: msg.now_cny_price
							}
							eventBus.$emit('e_price', dataPrice)
						}
					}
				};
				ws.onclose = function () {
					// 关闭 websocket
					that.getChange();
				};
			},
			connect(real) {
				//封装推送数据
				var that = this;
				//websocket
				// 打开一个 web socket
				var ws = new WebSocket("wss://ws.bitfdn.com/ws");

				ws.onopen = function () {
					// Web Socket 已连接上，使用 send() 方法发送数据
					var sendData = {
						socket_type: that.currencyId + "/" + that.legalId,
						subscribed: 1
					};
					sendData = JSON.stringify(sendData);
					ws.send(sendData);
					//console.log(sendData, '连接成功')
				};

				ws.onmessage = function (evt) {
					// //console.log(evt)
					var msg = JSON.parse(evt.data);
					// //console.log(msg)
					let obj = {};
					if (msg.type == "kline") {
						// //console.log(msg)
						if (that.$store.state.symbol == msg.sybmol) {
							// //console.log(that.$store.state.symbol)
							// //console.log(msg)
							var tim = localStorage.getItem("tim");
							// obj.open = Number(msg.open);
							// obj.low = Number(msg.low);
							// obj.high = Number(msg.high);
							// obj.close = Number(msg.close);
							// obj.volume = Number(msg.volume);
							// obj.time = Number(msg.time);
							// real(obj);
							if (tim + 'min' == msg.kline_type) {
								obj.open = Number(msg.open);
								obj.low = Number(msg.low);
								obj.high = Number(msg.high);
								obj.close = Number(msg.close);
								obj.volume = Number(msg.volume);
								obj.time = Number(msg.time);
								real(obj);
							}
							if (tim == '1D') {
								if (msg.kline_type == '1day') {
									obj.open = Number(msg.open);
									obj.low = Number(msg.low);
									obj.high = Number(msg.high);
									obj.close = Number(msg.close);
									obj.volume = Number(msg.volume);
									obj.time = Number(msg.time);
									real(obj);
								}
							}
						}
					}
				};

				ws.onclose = function () {
					// 关闭 websocket
					//console.log('guanbi')
					that.connect(real);
				};

				// });
			},

			createWidget() {
				let _this = this;

				this.$nextTick(function () {
					let widget = (_this.widget = new TradingView.widget({
						symbol: _this.$store.state.symbol,
						interval: 5,
						debug: true,
						fullscreen: false,
						autosize: true,
						container_id: "tv_chart_container",
						// datafeed: new Datafeeds.UDFCompatibleDatafeed("http://demo_feed.tradingview.com"),
						datafeed: _this.createFeed(),
						library_path: "/static/tradeview/charting_library/",
						custom_css_url: _this.csspath,
						locale: "zh",
						// width: "100%",
						// height: 516,
						drawings_access: {
							type: "black",
							tools: [{name: "Regression Trend"}]
						},
						disabled_features: [
							//  禁用的功能
							"header_saveload",
							"compare_symbol",
							"display_market_status",
							"go_to_date",
							"header_chart_type",
							"header_compare",
							"header_interval_dialog_button",
							"header_resolutions",
							"header_screenshot",
							"header_symbol_search",
							"header_undo_redo",
							"legend_context_menu",
							"show_hide_button_in_legend",
							"show_interval_dialog_on_key_press",
							"snapshot_trading_drawings",
							"symbol_info",
							"timeframes_toolbar",
							"use_localstorage_for_settings",
							"volume_force_overlay",
							"widget_logo"
						],
						enabled_features: [
							//  启用的功能（备注：disable_resolution_rebuild 功能用于控制当时间范围为1个月时，日期刻度是否都是每个月1号
							"dont_show_boolean_study_arguments",
							"hide_last_na_study_output",
							"move_logo_to_main_pane",
							"same_data_requery",
							"side_toolbar_in_fullscreen_mode",
							"disable_resolution_rebuild"
						],
						charts_storage_url: "http://saveload.tradingview.com",
						charts_storage_api_version: "1.1",
						toolbar_bg: "transparent",
						timezone: "Asia/Shanghai",
						studies_overrides: {
							"volume.precision": "1000"
							// "MA Cross.short:plot.color": "#ff0000",   //指标线颜色
							// "MA Cross.long:plot.color": "#333333",
							// "bollinger bands.median.color": "#33FF88",
							//  "volume.volume.color.0": "#00FFFF",
							// "volume.volume.color.1": "#0000FF",
							//  "volume.volume.transparency": 70,
							// "volume.volume ma.color": "#FF0000",
							// "volume.volume ma.transparency": 30,
							// "volume.volume ma.linewidth": 5,
							// "volume.show ma": true,
							// "bollinger bands.median.color": "#33FF88",
							// "bollinger bands.upper.linewidth": 7
						},
						overrides: _this.overrides()
					}));

					widget.MAStudies = [];
					widget.selectedIntervalButton = null;
					// widget.setLanguage('en')
					widget.onChartReady(function () {
						//图表方法
						// document.getElementById('trade-view').childNodes[0].setAttribute('style', 'display:block;width:100%;height:100%;');
						//let that =this

						widget
							.chart()
							.createStudy(
								"Moving Average",
								false,
								true,
								[15, "close", 0],
								null,
								{"Plot.color": "#e843da"}
							);
						widget.chart().createStudy("MA Cross", false, false, [10, 20]);
						let buttonArr = [
							{
								value: "1min",
								period: "1",
								text: _this.$t("center.realtime"),
								chartType: 3
							},
							{
								value: "1",
								period: "1m",
								text: "1min",
								chartType: 1
							},
							{
								value: "5",
								period: "5m",
								text: "5min",
								chartType: 1
							},
							{
								value: "15",
								period: "15m",
								text: "15min",
								chartType: 1
							},
							{
								value: "30",
								period: "30m",
								text: "30min",
								chartType: 1
							},
							{
								value: "60",
								period: "60分钟",
								text: "1hour",
								chartType: 1
							},
							{
								value: "1D",
								period: "1D",
								text: "1day",
								chartType: 1
							}

							// {
							// 	value: "1W",
							// 	period: "1W",
							// 	text: "1周",
							// 	chartType:1
							// }, {
							// 	value: "1M",
							// 	period: "1M",
							// 	text: "1月",
							// 	chartType: 1
							// }
						];
						let btn = {};
						let nowTime = "";
						buttonArr.forEach((v, i) => {
							// //console.log(v)
							let button = widget.createButton();
							button
								.attr("title", v.text)
								.addClass("my2")
								.text(v.text);

							if (v.text == "5min") {
								button.css({"background-color": "#9194a4", color: "#fff"});
								localStorage.setItem("tim", "5"); //默认为1分钟
							}

							// //console.log($(this),'999999')
							btn = button.on("click", function (e) {
								$(this)
									.parents(".left")
									.children()
									.find(".my2")
									.removeAttr("style"); //去掉1分钟的
								$(this).css({"background-color": "#9194a4", color: "#fff"})
								handleClick(e, v.value);

								widget.chart().setChartType(v.chartType); //改变K线类型
							});
						});
						let handleClick = (e, value) => {
							_this.setSymbol = function (symbol, value) {
								gh.chart().setSymbol(symbol, value);
							};
							localStorage.setItem("tim", value);
							widget.chart().setResolution(value, function onReadyCallback() {
							}); //改变分辨率

							$(e.target)
								.addClass("mydate")
								.closest("div.space-single")
								.siblings("div.space-single")
								.find("div.button")
								.removeClass("mydate");
						};
					});

					_this.widget = widget;
				});
			},
			createFeed() {
				let this_vue = this;
				let Datafeed = {};

				Datafeed.DataPulseUpdater = function (datafeed, updateFrequency) {
					this._datafeed = datafeed;
					this._subscribers = {};

					this._requestsPending = 0;
					var that = this;

					var update = function () {
						if (that._requestsPending > 0) {
							return;
						}

						for (var listenerGUID in that._subscribers) {
							var subscriptionRecord = that._subscribers[listenerGUID];
							var resolution = subscriptionRecord.resolution;

							var datesRangeRight = parseInt(new Date().valueOf() / 1000);

							//	BEWARE: please note we really need 2 bars, not the only last one
							//	see the explanation below. `10` is the `large enough` value to work around holidays
							var datesRangeLeft =
								datesRangeRight - that.periodLengthSeconds(resolution, 10);

							that._requestsPending++;

							(function (_subscriptionRecord) {
								// eslint-disable-line
								that._datafeed.getBars(
									_subscriptionRecord.symbolInfo,
									resolution,
									datesRangeLeft,
									datesRangeRight,
									function (bars) {
										that._requestsPending--;

										//	means the subscription was cancelled while waiting for data
										if (!that._subscribers.hasOwnProperty(listenerGUID)) {
											return;
										}

										if (bars.length === 0) {
											return;
										}

										var lastBar = bars[bars.length - 1];
										if (
											!isNaN(_subscriptionRecord.lastBarTime) &&
											lastBar.time < _subscriptionRecord.lastBarTime
										) {
											return;
										}

										var subscribers = _subscriptionRecord.listeners;

										//	BEWARE: this one isn't working when first update comes and this update makes a new bar. In this case
										//	_subscriptionRecord.lastBarTime = NaN
										var isNewBar =
											!isNaN(_subscriptionRecord.lastBarTime) &&
											lastBar.time > _subscriptionRecord.lastBarTime;

										//	Pulse updating may miss some trades data (ie, if pulse period = 10 secods and new bar is started 5 seconds later after the last update, the
										//	old bar's last 5 seconds trades will be lost). Thus, at fist we should broadcast old bar updates when it's ready.
										if (isNewBar) {
											if (bars.length < 2) {
												throw new Error(
													"Not enough bars in history for proper pulse update. Need at least 2."
												);
											}

											var previousBar = bars[bars.length - 2];
											for (var i = 0; i < subscribers.length; ++i) {
												subscribers[i](previousBar);
											}
										}

										_subscriptionRecord.lastBarTime = lastBar.time;

										for (var i = 0; i < subscribers.length; ++i) {
											subscribers[i](lastBar);
										}
									},

									//	on error
									function () {
										that._requestsPending--;
									}
								);
							})(subscriptionRecord);
						}
					};

					if (typeof updateFrequency != "undefined" && updateFrequency > 0) {
						setInterval(update, updateFrequency);
					}
				};

				Datafeed.DataPulseUpdater.prototype.periodLengthSeconds = function (
					resolution,
					requiredPeriodsCount
				) {
					var daysCount = 0;

					if (resolution === "D") {
						daysCount = requiredPeriodsCount;
					} else if (resolution === "M") {
						daysCount = 31 * requiredPeriodsCount;
					} else if (resolution === "W") {
						daysCount = 7 * requiredPeriodsCount;
					} else {
						daysCount = (requiredPeriodsCount * resolution) / (24 * 60);
					}

					return daysCount * 24 * 60 * 60;
				};

				Datafeed.DataPulseUpdater.prototype.subscribeDataListener = function (
					symbolInfo,
					resolution,
					newDataCallback,
					listenerGUID
				) {
					this._datafeed._logMessage("Subscribing " + listenerGUID);

					if (!this._subscribers.hasOwnProperty(listenerGUID)) {
						this._subscribers[listenerGUID] = {
							symbolInfo: symbolInfo,
							resolution: resolution,
							lastBarTime: NaN,
							listeners: []
						};
					}

					this._subscribers[listenerGUID].listeners.push(newDataCallback);
				};

				Datafeed.DataPulseUpdater.prototype.unsubscribeDataListener = function (
					listenerGUID
				) {
					this._datafeed._logMessage("Unsubscribing " + listenerGUID);
					delete this._subscribers[listenerGUID];
				};

				Datafeed.Container = function (updateFrequency) {
					this._configuration = {
						supports_search: false,
						supports_group_request: false,
						supported_resolutions: [
							"1",
							"3",
							"5",
							"15",
							"30",
							"60",
							"120",
							"240",
							"360",
							"720",
							"1D",
							"3D"
						],
						supports_marks: true,
						supports_timescale_marks: true,
						exchanges: ["gh"]
					};

					this._barsPulseUpdater = new Datafeed.DataPulseUpdater(
						this,
						updateFrequency || 10 * 1000
					);
					// this._quotesPulseUpdater = new Datafeed.QuotesPulseUpdater(this);

					this._enableLogging = true;
					this._callbacks = {};

					this._initializationFinished = true;
					this._fireEvent("initialized");
					this._fireEvent("configuration_ready");
				};

				Datafeed.Container.prototype._fireEvent = function (event, argument) {
					if (this._callbacks.hasOwnProperty(event)) {
						var callbacksChain = this._callbacks[event];
						for (var i = 0; i < callbacksChain.length; ++i) {
							callbacksChain[i](argument);
						}

						this._callbacks[event] = [];
					}
				};

				Datafeed.Container.prototype._logMessage = function (message) {
					if (this._enableLogging) {
						var now = new Date();
						// //console.log(
						//   "CHART LOGS: " +
						//     now.toLocaleTimeString() +
						//     "." +
						//     now.getMilliseconds() +
						//     "> " +
						//     message
						// );
					}
				};

				Datafeed.Container.prototype.on = function (event, callback) {
					if (!this._callbacks.hasOwnProperty(event)) {
						this._callbacks[event] = [];
					}

					this._callbacks[event].push(callback);
					return this;
				};

				Datafeed.Container.prototype.onReady = function (callback) {
					let that = this;
					if (this._configuration) {
						setTimeout(function () {
							callback(that._configuration);
						}, 0);
					} else {
						this.on("configuration_ready", function () {
							callback(that._configuration);
						});
					}
				};

				Datafeed.Container.prototype.resolveSymbol = function (
					symbolName,
					onSymbolResolvedCallback,
					onResolveErrorCallback
				) {
					this._logMessage("GOWNO :: resolve symbol " + symbolName);
					Promise.resolve().then(() => {
						// //console.log(
						//   this_vue.$store.state.priceScale,
						//   "12345s313123122adaslast"
						// );

						// this._logMessage("GOWNO :: onResultReady inject "+'AAPL');
						// //console.log(this_vue.$store.state.priceScale, "123stf");
						onSymbolResolvedCallback({
							name: this_vue.$store.state.symbol,
							timezone: "Asia/Shanghai",
							pricescale: this_vue.$store.state.priceScale,
							minmov: 1, //minmov(最小波动), pricescale(价格精度), minmove2, fractional(分数)
							minmov2: 0, //这是一个神奇的数字来格式化复杂情况下的价格。
							ticker: this_vue.$store.state.symbol,
							description: "",
							type: "bitcoin",
							volume_precision: 8,
							// "exchange-traded": "sdt",
							// "exchange-listed": "sdt",
							//现在，这两个字段都为某个交易所的略称。将被显示在图表的图例中，以表示此商品。目前此字段不用于其他目的。
							has_intraday: true,
							has_weekly_and_monthly: true,
							has_no_volume: false, //布尔表示商品是否拥有成交量数据。
							session: "24x7",
							supported_resolutions: [
								"1",
								"3",
								"5",
								"15",
								"30",
								"60",
								"120",
								"240",
								"360",
								"720",
								"1D",
								"3D",
								"1W",
								"1M"
							]
						});
					});
				};
				var thethis = this;
				//初始化数据
				Datafeed.Container.prototype.getBars = function (
					symbolInfo,
					resolution,
					rangeStartDate,
					rangeEndDate,
					onHistoryCallback,
					onErrorCallback
				) {
					// if (rangeStartDate > 0 && (rangeStartDate + '').length > 10) {
					//   throw new Error(['Got a JS time instead of Unix one.', rangeStartDate, rangeEndDate]);
					// }

					if (
						resolution.indexOf("D") == -1 &&
						resolution.indexOf("W") == -1 &&
						resolution.indexOf("M") == -1
					) {
						if (resolution == 60) {
							resolution = "1hour";
						} else {
							resolution = resolution + "min";
						}
					} else if (
						resolution.indexOf("W") != -1 ||
						resolution.indexOf("M") != -1
					) {
						resolution = resolution;
					}
					if (resolution == "1D") {
						resolution = "1day";
					}

					$.ajax({
						// url:'http://ice.adminchao.com/api/deal/info?' +
						url:
							"/api/quotation/kline?" +
							"from=" +
							rangeStartDate +
							"&to=" +
							rangeEndDate +
							// "&symbol=" +
							// symbolInfo.name +
							"&currency_id=" +
							thethis.currencyId +
							"&legal_id=" +
							thethis.legalId +
							"&period=" +
							resolution +
							"&page=0" +
							"&limit=500",
						type: "get",
						success: res => {
							if (res.type == "ok" && res.message && res.message.length > 0) {
								var msg = res.message;
								msg.forEach((item, i) => {
									item.open = Number(item.open);

									item.close = Number(item.close);
									item.high = Number(item.high);
									item.low = Number(item.low);
									item.volume = Number(item.volume);
									thethis.open = item.open;
									// thethis.low = item.low;
									// thethis.close = item.close;
									// thethis.high = item.high;
									// thethis.volume = item.volume;
								});
								onHistoryCallback(msg, {noData: false});
								onHistoryCallback([], {noData: true});
							}
							if (!msg || res.code == "fail") {
								onHistoryCallback([], {noData: true});
							}
							if (msg && msg.length == 0) {
								onHistoryCallback([], {noData: true});
							}
						}
					});
				};
				//实时数据
				Datafeed.Container.prototype.subscribeBars = function (
					symbolInfo,
					resolution,
					onRealtimeCallback,
					listenerGUID,
					onResetCacheNeededCallback
				) {
					this_vue.connect(onRealtimeCallback);
					//this._barsPulseUpdater.subscribeDataListener(symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback);
				};

				Datafeed.Container.prototype.unsubscribeBars = function (listenerGUID) {
					this._barsPulseUpdater.unsubscribeDataListener(listenerGUID);
				};

				return new Datafeed.Container();
			},
			updateData(data) {
				if (data) {
					this.$emit("real-time", data);
				}
			},

			updateWidget(item) {
				this.symbolInfo = {
					name: item,
					ticker: item,
					description: "",
					session: "24x7",
					supported_resolutions: ["1", "5", "15", "30", "60", "240", "1D", "3D"],
					has_intraday: true,
					has_daily: true,
					has_weekly_and_monthly: true,
					timezone: "UTC"
				};

				this.removeWidget();
				this.createWidget();
			},
			removeWidget() {
				if (this.widget) {
					this.widget.remove();
					this.widget = null;
				}
			},
			overrides() {
				let style = {
					up: "#41B37D",
					down: "#D74E5A",
					bg: this.bg,
					grid: this.grid, //网格线颜色
					cross: "#ccc", //光标颜色
					border: "#9194a4",
					text: "#9194a4",
					areatop: "rgba(122, 152, 247, .1)",
					areadown: "rgba(122, 152, 247, .02)"
				};
				return {
					volumePaneSize: "medium", //large, medium, small, tiny
					"paneProperties.topMargin": "20",
					"scalesProperties.lineColor": style.text,
					"scalesProperties.textColor": style.text,
					"paneProperties.background": style.bg, //改变背景色的重要代码
					"paneProperties.vertGridProperties.color": style.grid,
					"paneProperties.horzGridProperties.color": style.grid,
					"paneProperties.crossHairProperties.color": style.cross,
					"paneProperties.legendProperties.showLegend": true,
					"paneProperties.legendProperties.showStudyArguments": true,
					"paneProperties.legendProperties.showStudyTitles": true,
					"paneProperties.legendProperties.showStudyValues": true,
					"paneProperties.legendProperties.showSeriesTitle": true,
					"paneProperties.legendProperties.showSeriesOHLC": true,
					"mainSeriesProperties.candleStyle.upColor": style.up,
					"mainSeriesProperties.candleStyle.downColor": style.down,
					"mainSeriesProperties.candleStyle.drawWick": true,
					"mainSeriesProperties.candleStyle.drawBorder": true,
					"mainSeriesProperties.candleStyle.borderColor": style.border,
					"mainSeriesProperties.candleStyle.borderUpColor": style.up,
					"mainSeriesProperties.candleStyle.borderDownColor": style.down,
					"mainSeriesProperties.candleStyle.wickUpColor": style.up,
					"mainSeriesProperties.candleStyle.wickDownColor": style.down,
					"mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,
					"mainSeriesProperties.hollowCandleStyle.upColor": style.up,
					"mainSeriesProperties.hollowCandleStyle.downColor": style.down,

					"mainSeriesProperties.hollowCandleStyle.drawWick": true,
					"mainSeriesProperties.hollowCandleStyle.drawBorder": true,
					"mainSeriesProperties.hollowCandleStyle.borderColor": style.border,
					"mainSeriesProperties.hollowCandleStyle.borderUpColor": style.up,
					"mainSeriesProperties.hollowCandleStyle.borderDownColor": style.down,
					"mainSeriesProperties.hollowCandleStyle.wickColor": style.line,
					"mainSeriesProperties.haStyle.upColor": style.up,
					"mainSeriesProperties.haStyle.downColor": style.down,
					"mainSeriesProperties.haStyle.drawWick": true,
					"mainSeriesProperties.haStyle.drawBorder": true,
					"mainSeriesProperties.haStyle.borderColor": style.border,
					"mainSeriesProperties.haStyle.borderUpColor": style.up,
					"mainSeriesProperties.haStyle.borderDownColor": style.down,
					"mainSeriesProperties.haStyle.wickColor": style.border,
					"mainSeriesProperties.haStyle.barColorsOnPrevClose": false,
					"mainSeriesProperties.barStyle.upColor": style.up,
					"mainSeriesProperties.barStyle.downColor": style.down,
					"mainSeriesProperties.barStyle.barColorsOnPrevClose": false,
					"mainSeriesProperties.barStyle.dontDrawOpen": false,
					"mainSeriesProperties.lineStyle.color": style.border,
					"mainSeriesProperties.lineStyle.linewidth": 1,
					"mainSeriesProperties.lineStyle.priceSource": "close",
					"mainSeriesProperties.areaStyle.color1": style.areatop,
					"mainSeriesProperties.areaStyle.color2": style.areadown,
					"mainSeriesProperties.areaStyle.linecolor": style.border,
					"mainSeriesProperties.areaStyle.linewidth": 1,
					"mainSeriesProperties.areaStyle.priceSource": "close"
				};
				// this.sty2()
			},

			chose() {
				// //console.log(this.widget,'000')
				this.widget.setLanguage("en"); //设置语言

				// this.$store.commit('symbol','sdt')
				// this.$store.state.symbol='sdt6456' //切换交易对
			}
		}
	};
</script>
<style lang='scss'>
	.top_bg {
		background: #f2f6fa;
	}

	.gray_color {
		color: #61688a;
	}

	.bold_gray {
		color: #b0b8db;
	}

	.k-line-area {
		> .flex {
			span {
				margin: 0 8px;
				// line-height: 30px;
			}
		}
	}

	.theme > img {
		cursor: pointer;
		margin-left: 15px;
		margin-top: 12.5px;
		width: 20px;
		height: 20px;
	}
</style>

