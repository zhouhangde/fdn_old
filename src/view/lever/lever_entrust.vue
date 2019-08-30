<template>
	<div class="detail">
<!--		合约持仓-->
		<div class="title fColor1 topshadow ">

			<div class="inblock ">
				<span  >{{$t('lever.lvchi')}}</span>
			</div>

		</div>
		<div class="content">
			<leverTransactions></leverTransactions>
		</div>
<!--交易记录-->
		<div class="title fColor1 topshadow">
			<div class="inblock ">
				<span >{{$t('lever.tdrecord')}}</span>
				<!--				<leverList></leverList>-->

			</div>
		</div>
		<div class="content">
			<leverList></leverList>
		</div>
	</div>
</template>
<script>

	import leverTransactions from "@/view/lever_transactions";
	import leverList from "@/view/lever/leverList";
	export default {
		name: "detail",
		components: {
			leverTransactions,
			leverList
		},
		data() {
			return {
				address: '',
				isChoosed: 2,
				new: false,
				wayList: ["买入", "卖出", "全部"],
				deList: [],
				legal_id: '',
				currency_id: ''
			}
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
		created() {
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
			this.address = localStorage.getItem('address') || '';
			// this.legal_id = localStorage.getItem('legal_id');
			// this.currency_id = localStorage.getItem('currency_id');

			var that = this;
			that.complete(this.legal_id, this.currency_id);
			eventBus.$on('to_leverExchange', function (data) {
				if (data) {
					// that.complete(localStorage.getItem('legal_id'), localStorage.getItem('currency_id'));
					that.complete(that.legal_id, that.currency_id);
				}
			})
		},

		methods: {
			wayChoosed(index) {
				this.isChoosed = index;
			},
			//我的交易记录
			complete(legals_id, currencys_id) {
				this.$http({
					url: '/api/' + 'transaction/deal_info',
					method: 'post',
					data: {
						legal_id: legals_id,
						currency_id: currencys_id
					},
					headers: {'Authorization': localStorage.getItem('token')},
				}).then(res => {
					// layer.close(i);
					if (res.data.type == "ok") {
						this.deList = res.data.message.complete;
						//    this.connect();
					} else {
						// layer.msg(res.data.message)
					}
				}).catch(error => {
					// console.log(error)
				})
			},
			// connect(){
			//     var that = this;
			//      that.$socket.emit("login", localStorage.getItem('user_id'));
			//     that.$socket.on('deal_list',function(msg){
			//         if(msg.type == 'deal_list'){
			//             var complete = JSON.parse(msg.complete);
			//             console.log(complete);
			//             that.deList = complete;
			//         }
			//         console.log(msg);
			//     })
			// },
			all() {
				this.$router.push({name: 'allTransaction'})
			},
			// 杠杆持仓
			links() {
				this.$router.push({name: 'leverTransactions'})
			},
			// 跳转交易记录
			recordList() {
				this.$router.push({name: 'leverList'})
			}

		},
		mounted() {
			var that = this;


			// this.currency_id=localStorage.getItem('currency_id');
			//   eventBus.$on('toTrade0', function (data0) {
			//         that.currency_id=data0.currency_id
			//         that.legal_id=data0.legal_id
			//         that.complete(data0.legal_id,data0.currency_id)
			//   });
			//    eventBus.$on('toTrade', function (data0) {
			//         that.currency_id=data0.currency_id
			//         that.legal_id=data0.legal_id
			//         that.complete(data0.legal_id,data0.currency_id)
			//   })
			eventBus.$on('buyTrade', function (data) {
				// that.connect();
			});

		}


	}
</script>
<style scoped>
	.red {
		color: #cc4951;
		cursor: pointer;
	}

	.title {
		height: 48px;
		line-height: 46px;
		padding: 0 40px 0 30px;
		background: #131625!important;
		color: #A8ADCC!important;
	}

	.tab_title {
		display: inline-block;
		line-height: 46px;
		height: 46px;
	}

	.tab_title span {
		cursor: pointer;
	}

	.tab_title span:not(:last-child) {
		margin-right: 40px;
	}

	.content {
		/*padding: 0 40px 0 30px;*/
		/*height: 330px;*/
	}

	.list-title {
		line-height: 40px;
		border-bottom: 1px solid #ccc;
		height: 40px;
	}

	.list-title li {
		width: 33.3%;
		text-align: center;
	}

	.no_data {
		padding: 50px 0;
	}

	.containers {
		height: 260px;
		overflow: auto;
	}

	.list-item li {
		line-height: 45px;
		display: flex;
	}

	.list-item li span {
		display: block;
		float: left;
		width: 33.3%;
		text-align: center;
	}

	.list-item li:hover {
		background-color: rgba(46, 55, 83, .4)
	}

	.list-item li span.green {
		color: #12b886
	}

	.all {
		cursor: pointer;
		color: #7a98f7;
		margin-left: 10px;
	}
</style>


