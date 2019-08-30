<template>
	<div class="home home-box bg-main main-bg">
		<div class="main flex">
<!--			市场-->
			<div class="main-l fl flex" style="width:300px;">
				<div class="sidebar  part-bg" style="width:300px;margin-left:6px;margin-right: 6px;color: #fff;">
					<!-- <market></market> -->

                    <!-- market市场 -->
                    <ul style="display: flex;padding: 8px 10px;justify-content: space-around;">
						<li style="padding: 6px 23px;">自选</li>
						<li style="background: #2727da;padding: 6px 23px;">usdt</li>
					</ul>
					<div>
						<input type="text" placeholder="搜索" style="width: 100%; background: none;border: 1px solid #5a5454;padding: 4px;"/>
					</div>
					<ul style="display: flex;justify-content: space-around;padding: 16px 8px;font-size: 14px;">
						<li>
							<span>币种</span>
						</li>
						<li>
							<span>最新价</span>
						</li>
						<li>
                            <span>涨幅</span>
						</li>
					</ul>
					<ul>
						<li>

						</li>
						<li></li>
						<li></li>
					</ul>
                    <!-- market市场 -->


				</div>
			</div>
<!--			tv和实时成交的k线图-->
			<div class="main-m flex " style="width:84%;">
				<div class="chart_wrap flex column bgWhite part-bg" style="width:62%;margin-right:6px;">
					<!-- <chart></chart> -->
					<div style="min-width:67%; height: 510px;" class="bg-part part-bg tv_wrap" >
						<!--<kline></kline>-->
						<tv v-if="showPkAndSs"></tv>
					</div>
					<div class="trade-wrap part-l bg-part part-bg" style="padding-bottom:16px;">
						<trade v-if="showPkAndSs"></trade>
					</div>
				</div>
<!--			盘口数据-->				
				<div class="flex column bgWhite part-bg" style="height:100%; width:19%;margin-right:6px;">

					<div class="deadl-wrap part-r" style="width:100%;margin:0">
						<exchangeHandicap v-if="showPkAndSs"></exchangeHandicap>
            <!--<exchange></exchange>-->
					</div>
				</div>
<!--	实时成交		-->		
                <!--<leverTransaction></leverTransaction> --之前的-->				
				<!-- <div class="flex column bgWhite part-bg" style="height:100%; width:19%;">

					<div class="deadl-wrap part-r" style="width:100%;margin:0">
						<exchangeDetail  v-if="showPkAndSs"></exchangeDetail>
					</div>
				</div> -->

<!-- 外部的币种数据和新闻 -->
				<div class="flex column bgWhite part-bg" style="height:100%; width:19%;">
                        <p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;cursor: pointer">盘口情况</p>
					    <p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-if="currentName == 'btc'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.BTC_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
						<p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-else-if="currentName == 'eth'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.ETH_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
						<p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-else-if="currentName == 'eos'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.EOS_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
						<p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-else-if="currentName == 'ltc'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.LTC_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
						<p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-else-if="currentName == 'xrp'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.XRP_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
						<p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-else-if="currentName == 'bch'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.BCH_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
						<p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-else-if="currentName == 'trx'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.TRX_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
						<p style="color: #d2d6ec;font-size: 14px;padding: 8px 10px;display:flex;align-items: center;" v-else-if="currentName == 'neo'">
							<span style="padding: 5px 10px;border: 1px solid rgb(175, 71, 66);">多</span>
							<span style="background-color: rgba(226, 45, 45, 0.2);width: 160px; padding: 5px;">{{pkData.NEO_PERCENT}}%</span>
							<span style="background-color: rgba(1, 144, 118, 0.2);width: 50px;padding: 5px;">{{pkData.USDT_PERCENT}}%</span>
							<span style="padding: 5px 10px;border: 1px solid rgba(1, 144, 118, 0.2);">空</span>
						</p>
                        
						<!-- 新闻 -->
						<div style="height: 690px;overflow: auto;">
							<!-- v-for="(item,index) in newsDataList" :key="index" -->
                              <ul style="padding: 8px 10px;" v-for="(item,index) in newsDataList" :key="index">
								  <li style="padding: 8px 10px;color: #fff;font-size: 13px; border: 1px solid #585656;">
									  <p style="padding: 8px 10px;">{{item.createDate.time | formatDate}}</p>
									  <p style="font-weight: bold;text-align: center;">{{getBeforeCaption(item.introduction)}}</p>
									  <p style="font-size: 12px;padding: 10px 0;">{{getAfterCaption(item.introduction)}}</p>
								      <p style="text-align: right;font-size: 9px;">{{item.relativeDate}}</p>
								  </li>
							  </ul>
						</div>
						<p style="padding:12px 10px;color: rgb(201, 182, 182);font-size: 13px;">数据来源：取自各大交易所多空比例，仅供参考</p>
				</div>
<!-- 外部的币种数据和新闻 -->

                 

			</div>

		</div>

	<!--	下面的合约持仓整块内容		-->		
		<div class="entrust_box" style="margin:6px 0px 0px 6px">
      <!--<leverTransaction></leverTransaction>-->
			<leverEntrust v-if="showPkAndSs"></leverEntrust>
		</div>
		<div style="height: 6px">
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import moment from 'moment'  //时间转化工具
	import indexHeader from "@/view/indexHeader";
	import notice from "@/view/lever/lever_noticeList";
	import deal from "@/view/deal";
	import exchange from "@/view/lever/lever_exchange";
	import exchangeHandicap from "@/view/lever/lever_exchangeHandicap_zh";
	import exchangeDetail from "@/view/lever/lever_exchangeDetail_zh";
	import market from "@/view/lever/lever_market";
	import trade from "@/view/lever/lever_trade";
	import chart from "@/view/chart";
	import entrust from "@/view/lever/lever_entrust";
	import hisentrust from "@/view/lever/lever_hisentrust";
	import detail from "@/view/detail";
	import currency from "@/view/currency";
	import complete from "@/view/complete";
	import leverTransaction from "@/view/lever/lever_transaction";
	import leverEntrust from "@/view/lever/lever_entrust";
	// import kline from "@/view/lever/lever_kline";
	import tv from '../view/lever/tv'
	export default {
		name: "dealCenter",
		components: {
			indexHeader,
			load:1,
			notice,
			deal,
			tv,
			exchange,
			market,
			trade,
			chart,
			entrust,
			hisentrust,
			detail,
			currency,
			complete,
			leverTransaction,
			exchangeHandicap,
			exchangeDetail,
			leverEntrust
			// kline
		},
		data() {
			return {
				isRouterAlive:true,
				showPk:true,  //盘口数据显示开关
				showPkAndSs:true,  //盘口历史成交显示开关
				pkData:{    //外部接口查询的数据
				   BTC_PERCENT:'',
				   BTC_PERCENT_WIDTH:''
				},
				currentName:'btc',
				newsDataList:[]  //新闻快讯
			};
		},
		created() {
			this.address = localStorage.getItem("address") || "";

            //判断是否有缓存
			let bzdata = window.localStorage.getItem("leverTradeData_my");
			if(bzdata!=''&& bzdata!=null &&bzdata!=undefined){
			  let currentdata = JSON.parse(window.localStorage.getItem("leverTradeData_my"))
			  this.currentName = currentdata.currency_name.toLowerCase()
			}
 
            //查询gateio.news的多喝空
			this.getLoanMarketStatus(this.currentName)

            //调用新闻
			this.getFlashnew()


		},
		filters: {
			//日期转化
			formatDate: function (value) {
				value = parseInt(value)
				return moment(value).format('YYYY-MM-DD HH:mm:ss')
			}
		},
		methods:{
			//查询盘口情况数据
			getLoanMarketStatus(currentName){
				var $this = this
				this.$http({
					url: "/json_svr/get_loan_market_status",
					method: "POST",
					data: {
						market: currentName+'_usdt'
					}
				}).then(res => {
					this.pkData = res.data.data
				})


				// var myform = new FormData();
				// myform.append("market", 'btc_usdt');
				// $.ajax({
				// 	type : "POST",
				// 	contentType: false,
				// 	processData: false,
				// 	cache: false,
				// 	async: false, 
				// 	beforeSend:function(request){
				// 	  request.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36");
				// 	  request.setRequestHeader("Cookie", "_ga=GA1.2.836631000.1565771885; _gid=GA1.2.1858403843.1565771885; _gat_gtag_UA_122948497_1=1; Hm_lvt_1b3d00072faa6b9490791cdd184333c3=1565771885; JSESSIONID=A150A6F03DD3BED2A7A7DD8BA39B5ED7; Hm_lpvt_1b3d00072faa6b9490791cdd184333c3=1565771889");
				// 	  request.setRequestHeader("Accept", "*/*");
				// 	  request.setRequestHeader("Host", "www.chainfor.co");
				// 	  request.setRequestHeader("Referer", "https://www.chainfor.com/lives/index.html");
				// 	  request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				// 	},
				// 	url : "https://gateio.news/json_svr/get_loan_market_status",
				// 	dataType: "JSON",
				// 	data : myform,
				// 	success : function(result) {
				// 		console.log('result',result)
				// 	},
				// 	error : function(e){
				// 	}
				// });

			},
			//截取指定字符前的内容
			getAfterCaption(obj){
				var index=obj.lastIndexOf("\】");
				obj=obj.substring(index+1,obj.length);
				return obj;
			},
			//截取指定字符后的内容
			getBeforeCaption(obj){
				var index=obj.lastIndexOf("\】");
				obj=obj.substring(1,index);
				return obj;
			},
			//查询新闻快讯
			getFlashnew(){
				var $this =this
				// this.$http({
				// 	url: "/news/list/flashnew/data.do?type=0&lastItemTimeStamp=",
				// 	method: "get"
				// }).then(res => {
                //      $this.newsDataList = res.data.obj.list
				// })

				$.ajax({
					type : "get",
					contentType: false,
					processData: false,
					cache: false,
					async: false, 
					beforeSend:function(request){
					  request.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36");
					  request.setRequestHeader("Accept", "*/*");
					  request.setRequestHeader("Accept-Encoding", "gzip, deflate");
					  request.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.9");
					},
					url : "/news/list/flashnew/data.do?type=0&lastItemTimeStamp=",
					dataType: "JSON",
					success : function(res) {
						$this.newsDataList = res.obj.list
					},
					error : function(e){
					}
				});


			},



		},
		mounted(){
			 var $this = this
             eventBus.$on("upDatePk", function() {
					$this.showPkAndSs = false
					setTimeout(function(){
					$this.showPkAndSs = true
							},1000)
				});
			 //切换市场触发	
             eventBus.$on("currency_name", msg => {
				if (msg) {
					$this.currentName = msg.toLowerCase()
					this.getLoanMarketStatus(msg)
				}
			 }); 


		}
	};
</script>

<style scoped lang="scss">
	.home{
		.main{
			margin-top: 45px;
			>div{
				justify-content: space-between;
				>div{
					/*background: #fff !important;*/
				}
				margin-top: 6px;
				.tv-box{
					width: calc(100% - 406px);
					height: 500px;
				}
				.exchange-box{
					width: 400px;
					height: 500px;
				}
				.tran-box{
					width: calc(100% - 606px);
					height: 650px;
				}
				.trade-box{
					width: 600px;
					height: 650px;
				}
			}

		}
	}

	.el-icon-caret-bottom:before{
		    content: "\E790";
	}

</style>
