<template>
	<div id="LegalTrade">
		<div class="zh_content">

			 <!-- 整个内容 -->   
			<div style="width: 1000px;margin: 0 auto;"> 
               <!-- 头部 -->
               <div class="zh_header" style="display: flex;justify-content: space-between; padding: 15px;background-color: #131625;color:#fff">
                   <span>CNY交易</span>
				   <div style="display: flex;">
					   <div style="display: flex;align-items: center;">
						   <img src="../assets/images/zh_bank.png" style="width: 15px;height: 15px;"/>
						   <button style="color: #3275d4;background: none;margin-left: 4px;" @click="manageBank">银行卡管理</button>
					   </div>
					   <div style="display: flex;align-items: center;margin-left:30px">
						   <img src="../assets/images/add_bank.png" style="width: 15px;height: 15px;"/>
						    <button style="color: #3275d4;background: none;margin-left: 4px;" @click="addBank">新增银行卡</button>
					   </div>
					  
				   </div>
			   </div>
               <!-- 头部结束 -->
               
			   <!-- 买入，卖出CNY -->
			   <div style="display: flex;justify-content: space-between;padding: 10px 0;">
				   <!-- 买入CNY -->
                   <div style="flex-grow: 1;">
                     <p>买入CNY</p>
					 <div style="margin: 12px 0px;border: 1px solid #cbc2c2;padding: 5px 0;display: flex;justify-content: space-between;">
						 <span style="margin-left:6px">买入价(¥)</span>
                         <input placeholder="" value="1.00" style="background: none;text-indent: 5px;color: red;"  dir="rtl" />
					 </div>
					 <div style="margin: 12px 0px;border: 1px solid #cbc2c2;padding: 5px 0;display: flex;justify-content: space-between;">
						 <span style="margin-left:6px">买入量(CNY)</span>
                         <input placeholder="" value="1.00" style="background: none;text-indent: 5px;color: red;"  dir="rtl"/>
					 </div>
					 <p style="padding: 6px 0;">需要<small style="font-size: 17px;color: red;">0</small>CNY</p>
					 <button style="width: 100%;background-color: red;padding: 6px;color: #fff;">立即买入</button>
				   </div>

				   <!-- 卖出CNY -->
				   <div style="flex-grow: 1;margin-left: 39px;">
                     <p>卖出CNY</p>
					 <div style="margin: 12px 0px;border: 1px solid #cbc2c2;padding: 5px 0;display: flex;justify-content: space-between;">
						 <span style="margin-left:6px">卖出价(¥)</span>
                         <input placeholder="" value="1.00" style="background: none;text-indent: 5px;color: red;"  dir="rtl" />
					 </div>
					 <div style="margin: 12px 0px;border: 1px solid #cbc2c2;padding: 5px 0;display: flex;justify-content: space-between;">
						 <span style="margin-left:6px">卖出量(CNY)</span>
                         <input placeholder="" value="1.00" style="background: none;text-indent: 5px;color: red;"  dir="rtl"/>
					 </div>
					 <p style="padding: 6px 0;">可得<small style="font-size: 17px;color: red;">0</small>CNY</p>
					 <button style="width: 100%;background-color: #268326;;padding: 6px;color: #fff;" @click="seller">立即卖出</button>
				   </div>

			   </div>
               <!-- 买入，卖出CNY结束 --> 

			   <!-- 买与卖的提示 -->
			   <div class="zh_tishi" style="border: 1px solid #ded3d3;padding: 10px;display: flex;">
				   <img src="../assets/images/zh_warning.png" style="width: 15px;height: 15px;margin-top: 9px;"/>
				   <div style="margin-left:20px;">
						<p>1.买卖商户均为实名认证商户，并提供保证金，可放心兑换；</p>
						<p>2.请务必使用本人绑定的银行卡通过手机号或网银进行汇款；</p>
						<p>3.商家处理时间为9:00-21:00，非处理时间的订单则会在第二个人9:00开始处理，一般接单后1小时内完成交易，具体以银行到账时间为准；</p>
						<p>4.请下单后30分钟内用绑定的银行卡完成付款，否则会造成CNY无法到账；</p>
						<p>5.每日最多只能发起10笔卖出订单；</p>
						<p>6.如果您的交易24小时内未处理，请联系在线客服,我们会有专人与您联系，请保持实际畅通；</p>
				   </div>
			   </div>


			   <!-- 最近兑换记录 -->
			   <div>
                  <p style="padding: 10px;background-color: rgb(19, 22, 37);color: rgb(255, 255, 255);margin-top: 30px;">最近兑换记录</p>
                  <table border="0" cellpadding="0" width="100%" cellspacing="0" class="zh_table">
                     <thead>
						 <th>时间</th>
						 <th>类别</th>
						 <th>数量</th>
						 <th>单价（¥）</th>
						 <th>总价（¥）</th>
						 <th>状态</th>
						 <th>操作</th>
					 </thead>
					 <tbody>
						 <td>2019-08-05 00:00:00</td>
						 <td>买入</td>
						 <td>1</td>
						 <td>262</td>
						 <td>262</td>
						 <td style="color: blue;display: flex;align-items: center;justify-content: center;">
							 <img src="../assets/images/zh_running.png" style="width: 15px;height: 15px;"/>
							 <span style="margin-left: 5px;">处理中</span>
						</td>
						 <td>
							 <button style="color: #25bf80;border: 1px solid #d8b8b8;padding: 5px;" @click="selectPayDetail">付款信息</button>
						 </td>
					 </tbody>
				  </table>

			   </div>
			   <!-- 最近兑换记录结束 -->
                
			   <!-- 添加银行卡 -->
			   <div class="LegalTrade_addBank" style="display: none;" ref="addBank">
					<div style="width: 400px;margin: 0px auto;background: #131625;color: #fff;padding: 19px 50px;font-size:14px">
							<div style="display: flex;justify-content: space-between;margin-left: 14px;padding: 10px 0;"> 
								<span>开户名:</span>
								<div style="margin-left: 11px;flex-grow: 1;">
									<input value="" style="background: none;border: 1px solid #bbb2b2;padding: 3px;width: 100%;color:#fff"/>
									<p style="color: red;font-size: 14px;padding: 3px 0;">提示:只添加本人名下的银行卡</p>
								</div>
							</div>
							<div style="display: flex;justify-content: space-between;margin-left: 14px;padding: 10px 0;"> 
								<span>开户银行:</span>
								<div style="margin-left: 11px;flex-grow: 1;">
									<select style="padding: 5px 0;margin: 0px;width: 100%;font-size: 9px;">                                        
										<option style="text-align:center;">请选择银行</option>                                    
									</select>
									<p style="color: red;font-size: 14px;padding: 3px 0;">人民币提现仅支持列表中的银行</p>
								</div>
							</div>
							<div style="display: flex;justify-content: space-between;margin-left: 14px;padding: 12px 0;"> 
								<span>开户银行所在地:</span>
								<select style="padding: 5px 0;margin: 0px;font-size: 9px;flex-grow: 1;margin-left: 16px;">                                        
									<option style="text-align:center;">选择省</option>                                    
								</select>
								<select style="padding: 5px 0;margin: 0px;font-size: 9px;flex-grow: 1;margin-left: 16px;">                                        
									<option style="text-align:center;">选择市</option>                                    
								</select>
							</div>
							<div style="display: flex;justify-content: space-between;margin-left: 14px;padding: 12px 0;"> 
								<span>开户支行名称:</span>
								<div style="margin-left: 11px;flex-grow: 1;">
									<input value="" placeholder="" style="background: none;color: #fff;border: 1px solid #bbb2b2;padding: 3px;width: 100%;"/>
								</div>
							</div>
							<div style="display: flex;justify-content: space-between;margin-left: 14px;padding: 12px 0;"> 
								<span>银行卡号:</span>
								<div style="margin-left: 11px;flex-grow: 1;">
									<input value="" placeholder="请填写正确的银行卡号，不用空格隔开" style="background: none;color: #fff;border: 1px solid #bbb2b2;padding: 3px;width: 100%;"/>
								</div>
							</div>
							<div style="display: flex;justify-content: space-between;margin-left: 14px;padding: 12px 0;"> 
								<span>重复卡号:</span>
								<div style="margin-left: 11px;flex-grow: 1;">
									<input value="" style="background: none;border: 1px solid #bbb2b2;color: #fff;padding: 3px;width: 100%;"/>
									<button style="width: 111px;border-radius: 6px;padding: 4px;background-color: #55cdb6;margin-top: 10px;color: #fff;">添加</button>
								</div>
							</div>
						</div>
				</div>
				<!-- 添加银行卡 -->


				<!-- 银行卡管理 -->
                <div class="manageBank" style="display: none;" ref="manageBank">
				  <div style="display: flex;justify-content: space-between;padding: 20px;">
					<!-- 每一个银行卡 -->
                     <div style="display: flex;flex-direction: column;padding: 10px; background-color: #bbafaf;color: #fff;">
						 <div style="display: flex;justify-content: space-between;">
                            <span>中国农业银行</span>
							<img src="../assets/images/zh_delete.png" style="width: 15px;height: 15px;"/>
						 </div>
						 <div>
							 <P>王旭</P>
							 <P>6228480058491995278</P>
						 </div>
						 <div>支行：中国农业银行</div>
					 </div>
					 <!-- 每一个银行卡结束 -->
					 <!-- 每一个银行卡 -->
                     <div style="display: flex;flex-direction: column;padding: 10px; background-color: #bbafaf;color: #fff;margin-left:20px">
						 <div style="display: flex;justify-content: space-between;">
                            <span>中国农业银行</span>
							<img src="../assets/images/zh_delete.png" style="width: 15px;height: 15px;"/>
						 </div>
						 <div>
							 <P>王旭</P>
							 <P>6228480058491995278</P>
						 </div>
						 <div>支行：中国农业银行</div>
					 </div>
					 <!-- 每一个银行卡结束 -->
					</div>
				</div>
                <!-- 银行卡管理 -->   

                 <!-- 选择我的收款方式 -->
                <div class="myBankMethord" style="display: none;" ref="myBankMethord">
				  <div style="padding: 10px;">
					<div style="display: flex;justify-content: space-between;padding: 20px;">  
						<!-- 每一个银行卡 -->
						<div style="display: flex;flex-direction: column;padding: 10px; background-color: #bbafaf;color: #fff;border:1px solid red">
							<div style="display: flex;justify-content: space-between;">
								<span>中国农业银行</span>
								<span>删除</span>
							</div>
							<div>
								<P>王旭</P>
								<P>6228480058491995278</P>
							</div>
							<div>支行：中国农业银行</div>
						</div>
						<!-- 每一个银行卡结束 -->
						<!-- 每一个银行卡 -->
						<div style="display: flex;flex-direction: column;padding: 10px; background-color: #bbafaf;color: #fff;margin-left:20px">
							<div style="display: flex;justify-content: space-between;">
								<span>中国农业银行</span>
								<span>删除</span>
							</div>
							<div>
								<P>王旭</P>
								<P>6228480058491995278</P>
							</div>
							<div>支行：中国农业银行</div>
						</div>
						<!-- 每一个银行卡结束 -->
					</div>
					<div style="text-align:center">
						<button style="padding: 7px;background-color: green;color: #fff;">选择收款方式</button>
					</div>
				  </div>
				</div>
                <!-- 选择我的收款方式 -->   

                <!-- 汇款订单 -->
				<div class="selectPayDetail" style="display: none;" ref="selectPayDetail">
					<div>
						<!-- 所有的内容 -->
						<div style="padding: 15px;background-color: #08090f;color: #fff;">
							<p>1:请按提示信息向该卖家付款</p>
							<table border="0" cellpadding="0" width="100%" cellspacing="0" class="PayDetail_table">
									<tbody>
										<tr>
											<td>收款方户名</td>
											<td>王雨肖</td>
										</tr>
										<tr>
											<td>收款方开户行</td>
											<td>中国银行武汉支行</td>
										</tr>
										<tr>
											<td>收款方账号</td>
											<td>628547854669</td>
										</tr>
										<tr>
											<td>转账金额</td>
											<td>545.00</td>
										</tr>
										<tr>
											<td>汇款时备注内容</td>
											<td>046541312（请务必填写）</td>
										</tr>
										<tr>
											<td>状态</td>
											<td style="display: flex;justify-content: space-around;align-items: center;">
												<span>待支付</span>
												<button style="padding: 7px;background-color: green;color: #fff;">我已付款</button>
											</td>
										</tr>
									</tbody>
								</table>
								<p style="padding:10px 0">
									2.汇款时请一定要填写备注信息，付款完成后，请点击我已付款按钮;
								</p>
								<p style="padding:10px 0">
									3.卖家确认收到款后，自动充值CNY。如超过24小时未收到币，请向客服反馈解决
								</p>
								<p style="color:red;padding:10px 0">
									4.请务必使用本人绑定的银行卡通过手机银行或网银进行汇款；
								</p>
								<p style="color:red;padding:10px 0">
									5.禁止使用微信、支付宝、他人代付、ATM及柜台转账等第三方转账
								</p>
								<p style="padding:10px 0">
									温馨提示：如有任何疑问请联系在线客服查看帮助中心
								</p>
						</div>
						<!-- 所有的内容结束 -->
                   </div>
				</div>
                <!-- 汇款订单结束 -->

		   </div>
           <!-- 整个内容结束 -->
		   
		 </div>  
	</div>
</template>

<script>
    import LegalTradeAddBank from './LegalTrade_addBank'
	import layer from 'layui-layer';
	
	export default {
		name:'LegalTrade',
		data() {
			return {
				
			};
		},

		created() {
			
		},
		filters: {
			
		},
		methods: {
			//添加银行卡
			addBank(){
				layer.open({
					type:1,
					title:['新增银行卡','background-color: rgb(163, 166, 179);color: #fff;'],
					shadeClose:true,
					icon: 1, // 皮肤样式
					shade:0.6,  //可为true，false
					maxmin:false,
					skin: 'myskin',/*注意这里用到了我们前面给 layer 写的自定义 skin*/
					area:['auto','auto'],
					content:this.$refs.addBank.innerHTML

				})
			},
			//银行卡管理
			manageBank(){
				layer.open({
					type:1,
					title:['银行卡管理','background-color: rgb(163, 166, 179);color: #fff;'],
					shadeClose:true,
					icon: 1, // 皮肤样式
					shade:0.6,  //可为true，false
					maxmin:false,
					skin: 'myskin',/*注意这里用到了我们前面给 layer 写的自定义 skin*/
					area:['auto','auto'],
					content:this.$refs.manageBank.innerHTML

				})
			},
			//立即卖出
			seller(){
               layer.open({
					type:1,
					title:['我的收款方式','background-color: rgb(163, 166, 179);color: #fff;'],
					shadeClose:true,
					icon: 1, // 皮肤样式
					shade:0.6,  //可为true，false
					maxmin:false,
					skin: 'myskin',/*注意这里用到了我们前面给 layer 写的自定义 skin*/
					area:['auto','auto'],
					content:this.$refs.myBankMethord.innerHTML

				})

			},
			// 查看付款信息详情
			selectPayDetail(){
                layer.open({
					type:1,
					title:['汇款订单','background-color: rgb(163, 166, 179);color: #fff;'],
					shadeClose:true,
					icon: 1, // 皮肤样式
					shade:0.6,  //可为true，false
					maxmin:false,
					skin: 'myskin',/*注意这里用到了我们前面给 layer 写的自定义 skin*/
					area:['auto','auto'],
					content:this.$refs.selectPayDetail.innerHTML
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
