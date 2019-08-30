<template>
	<div id="app" class="bg-main">
		{{$i18n.value}}
		<router-view></router-view>
		<index-footer></index-footer>
		<div style="display: flex;" class="theParent" v-show="showModel">
			<div style="display: flex;">
                <img src="./assets/images/hxex.png" style="width:124px;height:124px"/>
				<div style="padding: 0 15px;color: #fff;margin-left: 26px;">
					<p style="font-size: 18px;font-size: 51px;">FDN</p>
					<p style="font-size: 14px;font-size: 39px;">比特币|数字货币交易平台</p>
				</div> 
			</div>
			<div>
                <button style="background: none;padding: 35px 95px;border: 1px solid #fff;color: #fff;font-size: 41px;margin-left: 44px;" @click="upload">下载</button>
			    <button style="background: none;padding: 35px 30px;color: #fff;font-size: 41px;margin-left: 13px;" @click="deleteModel">X</button>
			</div>
			
			
		</div>
	</div>
</template>

<script>
	import IndexFooter from './view/indexFooter';
	export default {
		name: 'App',
		data (){
			return{
                showModel:false
			}
		},
		components:{IndexFooter},
		created(){
			//检测设备
			this.checkPt();

			window.localStorage.setItem('theme','dark');
			var token = window.localStorage.getItem('token') || '';
			var theme = window.localStorage.getItem('theme');
			if(theme == 'dark'||theme == ''){
				this.$changeTheme('dark');
			};
			this.$http({
				url: "/api/" + "currency/change_match",
				method: "get",
				data: {},
			}).then(res => {
					if (res.data.type == "ok") {
						this.tabList = res.data.message;
						var msg = res.data.message;
						if(msg.length == 0){
							return;
						}
						if (!localStorage.getItem("legal_id") &&!localStorage.getItem("currency_id") &&!localStorage.getItem("legal_name") &&!localStorage.getItem("currency_name")) {
							
							var priceScale = 100000;
							window.localStorage.setItem("priceScale", priceScale);
							// window.localStorage.setItem("symbol", symbol);
							window.localStorage.setItem("legal_id",msg[0].array[0].legal_id);
							window.localStorage.setItem("currency_id",msg[0].array[0].currency_id);
							window.localStorage.setItem("legal_name",msg[0].array[0].legal_name);
							window.localStorage.setItem("currency_name",msg[0].array[0].currency_name);
							var symbol = msg[0].array[0].currency_name +"/" +msg[0].array[0].legal_name;
							window.localStorage.setItem("symbol", symbol);
							var msg_data = msg[0].array[0];
							var tradeData = {
								currency_id:msg_data.currency_id,
								legal_id:msg_data.legal_id,
								legal_name:msg_data.legal_name,
								currency_name:msg_data.currency_name,
								change:msg_data.change,
								volume:msg_data.volume,
								now_price:msg_data.now_price
							};
							window.localStorage.setItem("tradeData", JSON.stringify(tradeData));
							window.localStorage.setItem("isShow", 0);
						}

					}
				})
				.catch(error => {
				});
			this.getLeverMarket();
		},
		methods:{
			getLeverMarket(){
				this.$http({
					url: "/api/" + "currency/lever_match",
					method: "get",
					data: {}
				}).then(res=>{
					if(res.data.type == 'ok'){
						var msg = res.data.message;
						var arr = msg[0].array[0];
						var msg_data = msg[0].array[0];

						window.localStorage.setItem("lever_legal_id", arr.legal_id);
						window.localStorage.setItem("lever_currency_id", arr.currency_id);
						window.localStorage.setItem("lever_legal_name", arr.legal_name);
						window.localStorage.setItem("lever_currency_name", arr.currency_name);
						var symbol = arr.currency_name + "/" + arr.legal_name;
						window.localStorage.setItem("symbol", symbol);

						var leverTradeData = {
							currency_id:msg_data.currency_id,
							legal_id:msg_data.legal_id,
							legal_name:msg_data.legal_name,
							currency_name:msg_data.currency_name,
							change:msg_data.change,
							volume:msg_data.volume,
							now_usdt_price:msg_data.now_usdt_price,
							now_cny_price:msg_data.now_cny_price
						};
						window.localStorage.setItem("leverTradeData", JSON.stringify(leverTradeData));
					}
				})
			},
			//删除弹框
			deleteModel(){
               this.showModel = false
			},
			//下载
			upload(){
               window.location.href = 'https://51gsc.com/app/JJS0'
			},
			checkPt(){
				let sUserAgent = navigator.userAgent.toLowerCase();
				if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
					//跳转移动端页面
					this.showModel = true 
				} else {
					// console.log("电脑登陆")
					this.showModel = false 
				}
			}
		}
	}
</script>

<style>
	#app {
		width: 100%;
		height: 100%;
		min-height: 1080px;
		position: relative;
	}
	.theParent{
		position: fixed;
		bottom: 0;
		width: 100%;
        background-image:url('./assets/images/hxex_back.png'); 
		padding: 40px 37px;
        justify-content: space-between;
	}
</style>
