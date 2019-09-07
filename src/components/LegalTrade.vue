<template>
	<div id="LegalTrade">
		<div class="zh_content">

			 <!-- 整个内容 -->   
			<div style="width: 1000px;margin: 0 auto;"> 
               <!-- 头部 -->
               <div class="zh_header" style="display: flex;justify-content: space-between; padding: 15px;background-color: #131625;color:#fff">
                   <span>USDT交易</span>
				   <div style="display: flex;">
					   <div style="display: flex;align-items: center;margin-left:30px">
						    <button style="color: #3275d4;background: none;margin-left: 4px;" @click="goOrder">兑换记录</button>
					   </div>
					  
				   </div>
			   </div>
               <!-- 头部结束 -->
               
			   <!-- 买入，卖出USDT -->
			   <div style="display: flex;justify-content: space-between;padding: 10px 0;">
				   <!-- 买入USDT -->
                   <div style="flex-grow: 1;">
                     <p>买入USDT</p>
					 <div style="margin: 12px 0px;border: 1px solid #cbc2c2;padding: 5px 0;display: flex;justify-content: space-between;">
						 <span style="margin-left:6px">买入价(¥)</span>
                         <input v-if="theBuyData!='none'" :value="theBuyData.price" disabled style="background: none;text-indent: 5px;color: red;"  dir="rtl" />
						 <input v-else value="" disabled style="background: none;text-indent: 5px;color: red;"  dir="rtl" />
					 </div>
					 <div style="margin: 12px 0px;border: 1px solid #cbc2c2;padding: 5px 0;display: flex;justify-content: space-between;">
						 <span style="margin-left:6px">买入量(USDT)</span>
                         <input v-model="buyNumber" :placeholder="buyMin" style="background: none;text-indent: 5px;color: red;"  dir="rtl"/>
					 </div>
					 <!-- <p style="padding: 6px 0;">需要<small style="font-size: 17px;color: red;">0</small>USDT</p> -->
					 <p style="padding: 6px 0;">随机买家:
						 <small v-if="theBuyData!='none'">{{theBuyData.merchant_name}}</small>  
						 <small v-else>暂无买家信息</small> 
					</p>
					 <button style="width: 100%;background-color: red;padding: 6px;color: #fff;" @click="goBuy">立即买入</button>
				   </div>

				   <!-- 卖出USDT -->
				   <div style="flex-grow: 1;margin-left: 39px;">
                     <p>卖出USDT</p>
					 <div style="margin: 12px 0px;border: 1px solid #cbc2c2;padding: 5px 0;display: flex;justify-content: space-between;">
						 <span style="margin-left:6px">卖出价(¥)</span>
                         <input v-if="theSellerData!='none'" :value="theSellerData.price" disabled style="background: none;text-indent: 5px;color: red;"  dir="rtl" />
						 <input v-else value="" disabled style="background: none;text-indent: 5px;color: red;"  dir="rtl" />
					 </div>
					 <div style="margin: 12px 0px;border: 1px solid #cbc2c2;padding: 5px 0;display: flex;justify-content: space-between;">
						 <span style="margin-left:6px">卖出量(USDT)</span>
                         <input v-model="sellerNumber" :placeholder="sellerMin" style="background: none;text-indent: 5px;color: red;"  dir="rtl"/>
					 </div>
					 <p style="padding: 6px 0;">随机卖家:
						 <small v-if="theSellerData!='none'">{{theSellerData.merchant_name}}</small> 
						 <small v-else>暂无卖家信息</small> 
					</p>
					 <!-- <p style="padding: 6px 0;">可得<small style="font-size: 17px;color: red;">0</small>USDT</p> -->
					 <button style="width: 100%;background-color: #268326;;padding: 6px;color: #fff;" @click="goSeller">立即卖出</button>
				   </div>

			   </div>
               <!-- 买入，卖出USDT结束 --> 

			   <!-- 买与卖的提示 -->
			   <div class="zh_tishi" style="border: 1px solid #ded3d3;padding: 10px;display: flex;">
				   <img src="../assets/images/zh_warning.png" style="width: 15px;height: 15px;margin-top: 9px;"/>
				   <div style="margin-left:20px;">
						<p>1.买卖商户均为实名认证商户，并提供保证金，可放心兑换；</p>
						<p>2.请务必使用本人绑定的银行卡通过手机号或网银进行汇款；</p>
						<p>3.商家处理时间为9:00-21:00，非处理时间的订单则会在第二个人9:00开始处理，一般接单后1小时内完成交易，具体以银行到账时间为准；</p>
						<p>4.请下单后30分钟内用绑定的银行卡完成付款，否则会造成USDT无法到账；</p>
						<p>5.每日最多只能发起10笔卖出订单；</p>
						<p>6.如果您的交易24小时内未处理，请联系在线客服,我们会有专人与您联系，请保持实际畅通；</p>
				   </div>
			   </div>

			   <!-- <form name="personalPay" method="post" action="https://zf.pexotc.com/payment/" style="display: flex;flex-direction: column;padding: 30px;"> 
					<div>
                        <lable>商户id:</lable>
					    <input name="merchantid" value="CGMKBQ"/>
					</div>
					<div>
                        <lable>业务订单号:</lable>
					    <input name="orderno" value="4409"/>
					</div>
					<div>
                        <lable>支付金额:</lable>
					    <input name="orderamount" value="2000"/>
					</div>
					<div>
                        <lable>支付方式:</lable>
					    <input name="paytype" value="bank"/>
					</div>
					<div>
                        <lable>支付人姓名:</lable>
					    <input name="customername"  value="123441234"/>
					</div>
					<div>
                        <lable>支付币种:</lable>
					    <input name="ordercurrency" value="USDT"/>
					</div>
					<div>
                        <lable>回调地址:</lable>
					    <input name="serverbackurl"  value="http://3tpju3dmcn.52http.tech/serverback" style="width: 500px;"/>
					</div>
					<div>
                        <lable>跳转地址:</lable>
					    <input name="callbackurl" value="https://www.bitfdn.com/#/components/payCannel?id=4407&type=buy" style="width: 500px;"/>
					</div>
					<div>
                        <lable>签名加密:</lable>
					    <input name="signType"  value="md5" />
					</div>
					<div>
                        <lable>加密签名:</lable>
					    <input name="sign"  value="67194b29572e8e13f93699b6a253121a" style="width: 500px;"/>
					</div>
					<input type="submit" value="提交"/>
				</form> -->







		   </div>
           <!-- 整个内容结束 -->
		   
		 </div>  
	</div>
</template>

<script>
	import layer from 'layui-layer';
	
	export default {
		name:'LegalTrade',
		data() {
			return {
				id:1,  //暂不清楚
				theBuyData:'none',  //我的所有的买入的商家列表,none表示没有买入商家信息
				theSellerData:'none',  //我的所有的售出的商家列表,none表示没有售出商家信息
				buyNumber:'',   //输入买入的数据
				sellerNumber:'',   //输入卖出的数据
				sellerMin:0,  //最小卖出
				buyMin:0  //最小买入
			};
		},

		created() { 
			this.selectBuyAll() //查询买入的商家列表
			this.selectSellerAll() //查询售出的商家列表
		},
		filters: {
			
		},
		methods: {
		    // 跳转订单记录
			goOrder(){
				this.$router.push({path:'/LegalRecord',query:{id:this.id}});
			},
			//查询买入的商家列表，随机选取
			selectBuyAll(){
				var $this = this
                this.$http({
					url: '/api/legal/list?way=buy&page=0&currency_id=1&limit=10',
					method: "get",
					headers: {
						Authorization: localStorage.getItem("token")
					}
			    }).then(res => {
					if(res.data.message.data.length>0){
						let theLength = res.data.message.data.length
						let theIndex = Math.floor(Math.random()*theLength);    //可均衡获取0到9的随机整数。
						console.log('随机的买家theIndex',theIndex)
						$this.theBuyData = res.data.message.data[theIndex]
						console.log('随机的买家',$this.theBuyData)
						$this.buyMin = '最小买入'+  $this.theBuyData.min_number  //最小买入
					}else{
                        $this.theBuyData = 'none'
					}
				})
			},
			//查询卖出的商家列表，随机选取
			selectSellerAll(){
				var $this = this
                this.$http({
					url: '/api/legal/list?way=sell&page=0&currency_id=1&limit=10',
					method: "get",
					headers: {
						Authorization: localStorage.getItem("token")
					}
			    }).then(res => {
					if(res.data.message.data.length>0){
						let theLength = res.data.message.data.length
						let theIndex = Math.floor(Math.random()*theLength);    //可均衡获取0到9的随机整数。
						console.log('随机的卖出theIndex',theIndex)
						$this.theSellerData = res.data.message.data[theIndex]
						console.log('随机的卖家',$this.theSellerData)
						$this.sellerMin = '最小卖出'+ $this.theSellerData.min_number  //最小卖出
					}else{
                        $this.theSellerData = 'none'
					}
				})
               
			},
			//买入
			goBuy(){
			   var $this =this
			   if($this.theBuyData=='none'){
				   alert('暂无买入商家')
				   return
			   }
			   if($this.buyNumber.length<1){
				   alert('请先输入卖出数量')
				   return
			   }

				let params = {
					id: $this.theBuyData.thisid,
					// id: $this.theBuyData.user_cashier[0].thisid,  //默认的支付宝的额id，为0
					means: 'number',
					value: $this.buyNumber
				};
                this.$http({
					url: '/api/legal/order',
					method: "post",
					data: params,
					headers: {
						Authorization: localStorage.getItem("token")
					}
			    }).then(res => {
					console.log('res',res)
					if(res.data.type == 'fail'){
						alert(res.data.message)
					}else if (res.data.message.data.way == 'sell') {
						$this.$router.push({path:'/legalPay',query:{id:res.data.message.data.thisid,type:'buy'}});
					} else {
						$this.$router.push({path:'/components/payCannel',query:{id:res.data.message.data.thisid,type:'sell'}});
					}
				})



                // var myform = new FormData();
				// // myform.append("orderId", $this.theBuyData.thisid);
				// myform.append("orderId", 4706);
				// // myform.append("payType", 'bank');
				// myform.append("payType", 'bank');
				// // myform.append("orderNum",  $this.buyNumber);
				// myform.append("orderNum",  15.1);
				// myform.append("orderCurrency", 'USDT');
                // // 调用别人的订单买入接口
				// $.ajax({
				// 	type : "POST",
				// 	contentType: false,
				// 	processData: false,
				// 	cache: false,
				// 	async: false, 
				// 	data:myform,
				// 	beforeSend:function(request){
				// 		request.setRequestHeader("Accept", "*/*");
				// 	},
				// 	url : "/gototranfer",
				// 	dataType: "JSON",
				// 	success : function(res) {
				// 		//  $this.gopay(res)
				// 		$this.formPost("https://zf.flyotcpay.com/payment",res);
				// 	},
				// 	error : function(e){
				// 	}
				// });



		   },
		   //form表单提交
		   formPost(URL, PARAMTERS){
					console.log('PARAMTERS',PARAMTERS);
					//创建form表单
					var temp_form = document.createElement("form");
					temp_form.action = URL;
					//如需打开新窗口，form的target属性要设置为'_blank'
					// temp_form.target = "_self";
					temp_form.method = "post";
					temp_form.style.display = "none";
					//添加参数
					for (var item in PARAMTERS) {
						var opt = document.createElement("input");
						opt.name = item;
						opt.value = PARAMTERS[item];
						console.log('opt.value',opt.value);
						temp_form.appendChild(opt);
					}
					document.body.appendChild(temp_form);
					//提交数据
					temp_form.submit();
		   },
		   // 跳转请求订单
		   gopay(res){
			   console.log('res')  
			   var myform = new FormData();
				myform.append("callbackurl", res.callbackurl);
				myform.append("merchantid",  res.merchantid);
				myform.append("orderamount", res.orderamount);
				myform.append("ordercurrency",res.ordercurrency);
				myform.append("orderno",res.orderno);
				myform.append("paytype",res.paytype);
				myform.append("serverbackurl",res.serverbackurl);
				myform.append("sign",res.sign);
				myform.append("signtype",res.signtype);
                // 调用别人的订单买入接口
				$.ajax({
					type : "POST",
					contentType: false,
					processData: false,
					cache: false,
					async: false, 
					data:myform,
					beforeSend:function(request){
						request.setRequestHeader("Accept", "*/*");
					},
					url : "/payment",
					dataType: "JSON",
					success : function(res) {
                         
					},
					error : function(e){
					}
				}); 
		   },
		   //卖出
			goSeller(){
			   var $this =this
			   if($this.theSellerData=='none'){
				   alert('暂无卖出商家')
				   return
			   }
			   if($this.sellerNumber.length<1){
				   alert('请先输入卖出数量')
				   return
			   }
				let params = {
					id: $this.theSellerData.thisid,
					// id: $this.theSellerData.user_cashier[0].thisid,  //默认的支付宝的额id，为0
					means: 'money',
					value: $this.sellerNumber
				};
                this.$http({
					url: '/api/legal/order',
					method: "post",
					data: params,
					headers: {
						Authorization: localStorage.getItem("token")
					}
			    }).then(res => {
					console.log('res',res)
					if(res.data.type == 'fail'){
						alert(res.data.message)
					}else if (res.data.message.data.way == 'sell') {
						$this.$router.push({path:'/legalPay',query:{id:res.data.message.data.thisid,type:'buy'}});
					} else {
						$this.$router.push({path:'/components/payCannel',query:{id:res.data.message.data.thisid,type:'sell'}});
					}
				})
           }
		},
		components: {
			 
		}
	};
</script>

<style scoped>
  .zh_content{
      width:1180px;
	  margin: 95px auto 0;
  }
  .zh_tishi p{
	  padding: 7px 0;
  }
  .zh_table th{
	  text-align: center;
	  padding: 5px 0;
  }
  .zh_table td{
	  text-align: center;
	  padding: 5px 0;
  }
  .myskin{
		background-color: transparent;/*背景透明*/
		box-shadow: 0 0 0 rgba(0,0,0,0.1);/*前景无阴影*/
  }
  .PayDetail_table{
      border: 1px solid #000;
	  margin-top: 30px
  }
  .PayDetail_table th{
	  text-align: center;
	  padding: 5px 0;
	  border: 1px solid #eedfdf;
  }
  .PayDetail_table td{
	  text-align: center;
	  padding: 5px 0;
	  border: 1px solid #eedfdf;
   }
</style>>
