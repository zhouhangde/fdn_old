<template>
    <div id="container"></div>
</template>
<script>
import HighCharts from 'highcharts'
export default {
    data(){
        return{
            data:{
                buy:[],
                sell:[]
            },
            currency_id:'',
            legal_id:'',
            localData:''
            
        }
        
    },
    created(){
		//默认币种
	    eventBus.$on("toTrade", function(data) {
			//console.log('aaa')
			this.currency_id = data.currency_id;
			this.legal_id = data.legal_id;
			this.getData();
		})
		//点击币种
		eventBus.$on("toTrade0", function(data) {
			//console.log('aadddddddddddd')
			this.currency_id = data.currency_id;
			this.currency_id = data.currency_id;
			this.getData();
		})

			var tradeData = localStorage.getItem('tradeData');
			var data = JSON.parse(tradeData);
			//console.log(data)
			this.currency_id = data.currency_id;
			this.legal_id = data.legal_id;
			this.localData = JSON.parse(tradeData)
			this.token = localStorage.getItem('token')||'';
			this.getData();
	   
    },
    mounted(){
			
			
			
    },
    methods:{
		getData(){
            this.$http({
				url:'/api/transaction/depth',
				params:{
					currency_id:this.currency_id ,
					legal_id:this.legal_id
				},
				headers: { Authorization: this.token },
				method:'get'
			}).then(res=>{
				//console.log(res.data.message)
				if(res.data.type == 'ok'){
					this.$nextTick(()=>{
						this.data.buy = res.data.message.in.reverse();
						this.data.sell = res.data.message.out;
						//console.log(this.data)
						this.init();
					})
					
				}
			});
		},
        init(){
            let buy = this.data.buy;
	        let sell = this.data.sell;
	        // let dataX = [];
	        // let dataY = [];
	        // buy.forEach(ele => {
	        //     dataX.push(ele[0])
	        //     dataY.push(ele[1])
	        // })
	        // sell.forEach(ele => {
	        //     dataX.push(ele[0])
	        //     dataY.push(ele[1])
	        // })
			let chart = HighCharts.chart('container', {
				// chart: {
				// 	type: 'area'
				// },
				// title:{
				// 	text:'',  //标题
                //     style:{
                //         // color:'#f00'
                //     },
                //     align:"left"
				// },
				// legend:{
				// 	enabled:false,
				// },
				// credits:{
				// 	enabled:false,
				// },
				// xAxis: {
				// 	title: {
                //         text:'', //x轴标题
				// 		// enabled: false,
				// 	},
				// 	tickWidth:0,//去掉刻度
				// 	labels:{
				// 		enabled: false, //去掉数字
				// 		formatter: function() {
				// 			return dataX[this.value]
				// 		},
				// 	},
				// 	tickmarkPlacement:'on', //刻度线对齐方式 on是标注在刻度线中间 between标注在刻度线之间
                //     tickLength:0,  //刻度线竖向长度
                //     tickWidth:2,   //刻度线横向宽度
                //     tickColor:'#f00', //x轴刻度线颜色
                //     tickInterval:1 //刻度间隔
				// },
				// yAxis: {
				// 	title: {
				// 		enabled: false,
				// 	},
				// 	minPadding:0,
				// 	startOnTick:false,
				// 	tickWidth: 1,
				// 	gridLineWidth:0,
				// 	labels: {
				// 		formatter: function() {
				// 			this.value = this.value >= 1000?this.value / 1000 + 'k':this.value
				// 			return this.value;
				// 		}
				// 	}
				// },
				// tooltip: {
				// 	headerFormat:'',
				// 	pointFormatter:function(){
				// 		return '<b>价格：'+dataX[this.x]+'</b><br/><b>数量：'+this.y+'</b>'
				// 	} 
				// },
				// plotOptions: {
				// 	area: {
				// 		marker: {
				// 			enabled: false,
				// 			symbol: 'circle',
				// 			radius: 4,
				// 			states: {
				// 				hover: {
				// 					enabled: true
				// 				}
				// 			}
				// 		}
				// 	}
				// },
				// series: [{
				// 	zoneAxis: 'x',
				// 	color:'#ffd6d6',
				// 	zones: [{
				// 			value: (dataY.length) / 2 - 1,
				// 			color: '#d3ebd8'
				// 	}],
				// 	data: dataY
				// }]
				chart: {
		type: 'area',
		zoomType: 'xy'
	},
	title: {
		text: ''
	},
	xAxis: {
		minPadding: 0,
		maxPadding: 0,
		plotLines: [{
			color: '#888',
			value: 0.1523,
			width: 1,
			label: {
				text: '实际价格',
				rotation: 90
			}
		}],
		title: {
			text: ''
		},
		// tickWidth:0,//去掉刻度
		// labels:{
		// 	enabled: false, //去掉数字
		// 	},
	},
	yAxis: [{
		lineWidth: 1,
		gridLineWidth: 1,
		title: null,
		tickWidth: 1,
		tickLength: 5,
		tickPosition: 'inside',
		labels: {
			align: 'left',
			x: 8
		}
	}, {
		opposite: true,
		linkedTo: 0,
		lineWidth: 1,
		gridLineWidth: 0,
		title: null,
		tickWidth: 1,
		tickLength: 5,
		tickPosition: 'inside',
		labels: {
			align: 'right',
			x: -8
		}
	}],
	legend: {
		enabled: false
	},
	plotOptions: {
		area: {
			fillOpacity: 0.2,
			lineWidth: 1,
			step: 'center'
		}
	},
	tooltip: {
		headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
		valueDecimals: 2
	},
	series: [{
		name: 'Bids',
		data: buy,
		color: '#03a7a8'
	}, {
		name: 'Asks',
		data: sell,
		color: '#fc5857'
	}]
			});
        },
        //websocket
       WebSocket(){
		   var tradeData = window.localStorage.getItem('tradeData');
            tradeData = JSON.parse(tradeData);
       // 打开一个 web socket
        var ws = new WebSocket("wss://ws.bitfdn.com/ws");
        
        ws.onopen = function()
        {
		  // Web Socket 已连接上，使用 send() 方法发送数据
		  var sendData={socket_type:tradeData.currency_id +'/'+ tradeData.legal_id,subscribed:1}
		  var Data = JSON.stringify(sendData)
		  //console.log(Data)
          ws.send(Data);
        };
        
        ws.onmessage = function (evt) 
        { 
          
          var data = JSON.parse(evt.data);
        //   //console.log(data)
          if(data.type == 'depth'){
              //console.log(data);
              var symbol = this.localData.currency_name + '/' + this.localData.legal_name;
              if(symbol == data.sybmol){
				  this.$nextTick(()=>{
                  this.data.buy = data.in;
				  this.data.sell = data.out
				  })
              }
          }
        };
        
        ws.onclose = function()
        { 
          // 关闭 websocket
        };
    },
    }
}
</script>
<style scoped>
   
</style>

