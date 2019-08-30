<template>
    <div class="wrap ptb50">
        <ul class="ul">
            <li class="mb10" v-for="item in my_list">
                <p v-if="item.type == 1" class="tr" style="display: flex;justify-content: flex-end;align-items: flex-start;">
                    <span v-if="item.msg" class="my_text">{{item.msg}}</span>
                    <img v-if="item.src" :src="item.src" style="margin-right:8px;width:180px;" @click="showImg(item.src)">
                    <img src="../assets/images/icon_mine.png">
                    </p>
                    <p v-if="item.type == 2"  class="tl" style="display: flex;justify-content: flex-start;align-items: center;">
                     <img src="../assets/images/icon_mine.png">
                     <span v-if="item.msg" class="my_text ml10">{{item.msg}}</span>
                     <img v-if="item.src" :src="item.src" style="margin-left:8px;width:180px;" @click="showImg(item.src)">
                    </p>
            </li>
            <!-- <li class="mb10" v-for="item in my_list">
                <p class="tr" style="display: flex;justify-content: flex-end;align-items: center;">
                    <span class="my_text">{{item}}</span>
                    <img src="../assets/images/new_logo01.png">
                    </p>
            </li> -->
        </ul>
        <div class="flex end mb10 "  style="">
            <!-- <div class="od">
            <span class="sel">选择图片</span>
            <input type="file" id="file1" accept="image/*" name="file1" @change="file1">    
            </div>   -->
            <button class="btn" @click="send">发送</button>
        </div>
        <div class="text_wrap">
            <img v-if="src" :src="src" class="img">
            <textarea class="texta" v-model="content"></textarea>
        </div>
        <div class="shadow" v-if="show_img" @click="show_img = false">
           <img :src="previewImg">
        </div>
    </div>
</template>
<script>
// import RongIMClient from '../../static/lib/RongIMLib-2.4.0.min.js'
export default {
    data(){
        return{
           src:'',
           content:'',
           src01:'',
           userId:'',
           my_list:[],
           show:true,
           previewImg:'',
           show_img:false,
           id:''
        }
    },
    created(){
        this.id = this.$route.query.id;
        //console.log(this.id);
        this.token=localStorage.getItem('token');
        this.getInfo();
        this.$nextTick(function(){
            var div = document.getElementsByClassName('ul')[0];
            //console.log(div.scrollHeight)
                div.scrollTop = 999999;
                 //console.log(div.scrollTop)
            })
    },
    mounted(){
        
    },
    methods:{
        //用户信息
        getInfo(){
           this.$http({
               url:"/api/user/info",
               headers: { Authorization: localStorage.getItem('token') }
           }).then(res=>{
               if(res.data.type == 'ok'){
                   this.rong_token = res.data.message.rongyun_token;
                   this.inits();
               }
           })
        },
        file1(){
           var that = this;
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); 
            reader.onload = function(e){
                that.src=e.target.result
            } 
            var formData = new FormData();
            formData.append("file", event.target.files[0]); 
            //console.log(formData);
            var i= layer.load();
            $.ajax({
                url: '/api/'+'upload',              
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function beforeSend(request) {
                    request.setRequestHeader("Authorization", that.token);
                },
                success: function (msg) {
                    layer.close(i);
                    //console.log(msg)
                    that.src01=msg.message

                }
            });  
        },

        //初始化
    inits(){
        var that = this;
        var userId;
        var my_list = [];
        RongIMClient.init("z3v5yqkbziea0");//这是初始化，需要填参数就是你的APPKEY。这个不难理解。
        //console.log(that.rong_token)
        var token = that.rong_token;
        // 设置连接监听状态 （ status 标识当前连接状态）
 // 连接状态监听器
 RongIMClient.setConnectionStatusListener({
    onChanged: function (status) {
        switch (status) {
            //链接成功
            case RongIMLib.ConnectionStatus.CONNECTED:
                //console.log('链接成功');
                break;
            //正在链接
            case RongIMLib.ConnectionStatus.CONNECTING:
                //console.log('正在链接');
                break;
            //重新链接
            case RongIMLib.ConnectionStatus.DISCONNECTED:
                //console.log('断开连接');
                break;
            //其他设备登陆
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                //console.log('其他设备登陆');
                break;
              //网络不可用
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
              //console.log('网络不可用');
              break;
            }
    }});
 
 // 消息监听器
 RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function (message) {
        // var that = this;
        //console.log(that.my_list)
        //console.log(message)
        // 判断消息类型
        switch(message.messageType){
            case RongIMClient.MessageType.TextMessage:
                   //console.log(message.content.content);
                   //console.log(that.userId)
                   //console.log(message.senderUserId)
                   if(that.userId != message.senderUserId){
                       that.show = false;
                       that.my_list.push({type:2,msg:message.content.content,src:message.content.imageUri})
                       var div = document.getElementsByClassName('ul')[0];
                       div.scrollTop = 999999;
                   }else{
                        that.show = true;
                       that.my_list.push({type:1,msg:message.content.content,src:message.content.imageUri})
                       var div = document.getElementsByClassName('ul')[0];
                       div.scrollTop = 999999;
                   }
                   var div = document.getElementsByClassName('ul')[0];
                    div.scrollTop = 999999;
                //发送的消息内容将会被打印
                break;
            case RongIMClient.MessageType.ImageMessage:
                //console.log(message);
                if(that.userId != message.senderUserId){
                       that.my_list.push({type:2,msg:message.content.content,src:message.content.imageUri})
                   }else{
                       that.my_list.push({type:1,msg:message.content.content,src:message.content.imageUri})
                   }
                   var div = document.getElementsByClassName('ul')[0];
                    div.scrollTop = 999999;
                // do something...
                break;
            case RongIMClient.MessageType.DiscussionNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.LocationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.RichContentMessage:
                // do something...
                break;
            case RongIMClient.MessageType.DiscussionNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.InformationNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.ContactNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.ProfileNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.CommandNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.CommandMessage:
                // do something...
                break;
            case RongIMClient.MessageType.UnknownMessage:
                // do something...
                break;
            default:
                // 自定义消息
                // do something...
        }
    }
});
    //链接融云服务器
    RongIMClient.connect(token,
         {
                onSuccess: function(userId) {
 
                //console.log("Login successfully." + userId);
                that.userId = userId;
        },
        onTokenIncorrect: function() {
            //console.log('token无效');
        },
        onError:function(errorCode){
                var info = '';
                switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                    info = '超时';
                    break;
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                    info = '未知错误';
                    break;
                case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                    info = '不可接受的协议版本';
                    break;
                case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                    info = 'appkey不正确';
                    break;
                case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                    info = '服务器不可用';
                    break;
                }
                //console.log(errorCode);
            }
      });
      
      //var targetId = uid; // 目标 Id
      var chatroomId = that.id; // 聊天室 Id
      //console.log(that.id)
      var count = 50;// 拉取最近聊天最多 50 条
      setTimeout(() => {
         RongIMClient.getInstance().joinChatRoom(chatroomId, count, {
          onSuccess: function() {
              // 加入聊天室成功。
              //console.log('加入聊天室成功。');
          },
          onError: function(error) {
              // 加入聊天室失败
              //console.log('加入聊天室失败。');
          }
      });  
      }, 1000);
      
    },
    //发送消息
    send(){
        var that = this;
          var conversationtype = RongIMLib.ConversationType.CHATROOM;
          var chatRoomId = that.id;
           var msg;
           if(this.src == ''&&this.content == ''){
               layer.msg('请输入发送内容');
               return;
           }
           if(this.src != ''&&this.content == ''){
                msg = new RongIMLib.ImageMessage({content:'',imageUri:this.src01});//图片
                // msg = new RongIMLib.ImageMessage({content:'',imageUri:'http://img5.duitang.com/uploads/item/201409/23/20140923094045_BNYji.thumb.700_0.png'});//图片chatRoomId
           }
           if(this.src == ''&&this.content != ''){
               msg = new RongIMLib.TextMessage({content:this.content,extra:"附加信息"});//图片;
           }
           if(this.src != ''&&this.content != ''){
               msg = new RongIMLib.ImageMessage({content:this.content,imageUri:this.src01});//图片
           }
           
        RongIMClient.getInstance().sendMessage(conversationtype, chatRoomId, msg, {
                // 发送消息成功
                onSuccess: function (message) {
                    //console.log(that.my_list);
                    that.my_list.push({type:1,msg:message.content.content,src:message.content.imageUri});
                    var div = document.getElementsByClassName('ul')[0];
                       div.scrollTop = 999999;  //
                     //console.log(that.my_list);
                    //console.log(message)
                    //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                    //console.log("Send successfully");
                },
                onError: function (errorCode,message) {
                    var info = '';
                    switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = '未知错误';
                            break;
                        case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                            info = '在黑名单中，无法向对方发送消息';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                            info = '不在讨论组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_GROUP:
                            info = '不在群组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                            info = '不在聊天室中';
                            break;
                        default :
                            info = x;
                            break;
                    }
                    //console.log('发送失败:' + info);
                }
            }
        );
        this.content = '';
        this.src = ''
    },
    //预览图片
    showImg(img){
       this.previewImg = img;
       this.show_img = true;
    }

    },

    
    
}
</script>
<style scoped>
   .wrap{
    width: 60%;
    margin: 80px auto;
    padding: 20px;
    border-radius: 5px;
    background: #fff;
   }
   .btn{
    background: #74a0dc;
    padding: 5px 15px;
    color: #fff;
    border-radius: 3px;
   }
   .text_wrap{
     width: 100%;
    border: 1px solid #c2c2c2;
    margin-top: 10px;
    padding: 10px;
   }
   .texta{
    border: none;
    width: 100%;
    height: 100px;  
   }
   .ul{
       height: 400px;
       margin-bottom: 20px;
       overflow-y: auto;
   }
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    .ul::-webkit-scrollbar
    {
        width: 5px;
        height: 5px;
        background-color: #F5F5F5;
    }
    
    /*定义滚动条轨道 内阴影+圆角*/
    .ul::-webkit-scrollbar-track
    {
        /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
        border-radius: 10px;
        background-color: #F5F5F5;
    }
    
    /*定义滑块 内阴影+圆角*/
    .ul::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3); */
        background-color: rgb(194, 194, 194);
    }

   .od{
       position: relative;
   }
   .sel{
        position: absolute;
        width: 100px;
        display: inline-block;
        height: 30px;
        text-align: center;
        /* background-color: white; */
        line-height: 30px;
        background: #708cc9;
        color: #fff;
        cursor: pointer;
   }
   #file1{
       position: absolute;
       left: 0;
       top: 0;
       width: 100px;
       height: 30px;
       text-align: center;
       opacity: 0;
       z-index: 99;
       
   }
   .img{
       width: 100px;
   }
   .my_text{
       background: #c9867f;
        padding: 4px 8px;
        color: #fff;
        border-radius: 3px;
        margin-right: 8px;
        word-break: break-all;
        text-align: left;
   }
   .shadow{
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background: rgba(0, 0, 0, 0.5);
       display: flex;
       align-items: center;
       justify-content: center;
   }
   .shadow img{
       width: 80%;
   }
</style>
