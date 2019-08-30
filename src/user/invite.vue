<template>
    <div class="mt45 bg-main">
        <img src="../assets/images/bgInvite.png" alt="" class="w100 H500">
        <div class="w90 invite_container mauto zdx99 plr40 ">
            <div class="plr40 ptb20 radius10 mb10" style="background:#e0f2ff;">
                    <p class="ft22 cor3">{{$t('invite.link')}}</p>
                    <div class="mt20 flex alcenter cor2">
                        <div class=" radius4 flex alcenter flex1 mr30 radius5 hidden">
                            <div class=" flex1 ptb10 tc bgWhite">https://www.hxex.com/#/components/register?code={{invite_code}}</div>
                            <div class="tc  ft16 w25 ptb10 curPer copy_link white" style="background:#79c6fa;" @click="copy_link">{{$t('invite.share')}}</div>
                        </div>
                        <div class="w30 radius4 flex alcenter radius5 hidden">
                            <div class=" flex1 tc ptb10 bgWhite">{{$t('header.code')}}：{{invite_code}}</div>
                            <div class="tc  ft16 w20 ptb10 curPer white" style="background:#79c6fa;" @click="copy" id="copy">{{$t('account.copy')}}</div>
                        </div>
                    </div>
                </div>
            <div class="invite_header radius8 bg-part shadows hidden">
                <div class=" head ft16 flex alcenter center" style="background:#e0f2ff;">
                    <img src="../assets/images/icon_bd.png" alt="" class="mr10">
                    <span>{{$t('invite.list')}}</span>
                </div>
                <div class="ht80 plr40">
                    <div class="in_body flex column  ft16 between  ">
                        <div class="flex alcenter cor1 mt20">
                            <div class="flex1"><img src="../assets/images/icon_1.png" alt="" class="H34"></div>
                            <div class="flex1 tc">{{rankList.length>0 && rankList[0].account || ''}}</div>
                            <div class="flex1 tr">{{$t('invite.commission')}}{{rankList.length>0 && rankList[0].count || ''}}USDT</div>
                        </div>
                        <div class="flex alcenter cor1 mt20">
                            <div class="flex1"><img src="../assets/images/icon_2.png" alt="" class="H34"></div>
                            <div class="flex1 tc">{{rankList.length>1 && rankList[1].account || ''}}</div>
                            <div class="flex1 tr">{{$t('invite.commission')}}{{rankList.length>1 && rankList[1].count || ''}}USDT</div>
                        </div>
                        <div class="flex alcenter cor1 mt20">
                            <div class="flex1"><img src="../assets/images/icon_3.png" alt="" class="H34"></div>
                            <div class="flex1 tc">{{rankList.length>2 && rankList[2].account || ''}}</div>
                            <div class="flex1 tr">{{$t('invite.commission')}}{{rankList.length>2 && rankList[2].count || ''}}USDT</div>
                        </div>
                    </div>
                </div>
            </div>
            <p class="ptb10 mt10 mb10 bgWhite radius4 tc ft14">手续费返佣总额 {{count_inv}}  <span class="ml20">SGR返佣总额 {{count_release}}</span></p>
            <!--邀请人数、持仓数量--->
                <div class="flex mb10 between mt20 ft14">
                    <div class="plr10 ptb10 bgWhite w30">
                        <p class="mb10">一级邀请总人数：{{msg.first||'--'}}</p>
                        <p>一级总HXB持仓：{{msg.first_balance||'--'}}</p>
                    </div>
                    <div class="plr10 ptb10 bgWhite w30">
                        <p class="mb10">二级邀请总人数：{{msg.second||'--'}}</p>
                        <p>二级总HXB持仓：{{msg.second_balance||'--'}}</p>
                    </div>
                    <div class="plr10 ptb10 bgWhite w30">
                        <p class="mb10">三级邀请总人数：{{msg.third || '--'}}</p>
                        <p>三级总HXB持仓：{{msg.third_balance || '--'}}</p>
                    </div>
                </div>
            <div class="bg-part plr20 pt20 pb50 mt20 radius8">
                <!-- <div class="">
                    <p class="ft22 cor3">{{$t('invite.link')}}</p>
                    <div class="mt20 flex alcenter cor2">
                        <div class="bd_d1 radius4 ptb15 flex alcenter flex1 mr30">
                            <div class="bdr_d1 flex1 tc">https://www.hxex.one/#/components/register?code={{invite_code}}</div>
                            <div class="tc  ft16 w25 curPer copy_link" @click="copy_link">{{$t('invite.share')}}</div>
                        </div>
                        <div class="w30 bd_d1 radius4 ptb15 flex alcenter">
                            <div class="bdr_d1 flex1 tc">{{$t('header.code')}}：{{invite_code}}</div>
                            <div class="tc  ft16 w20 curPer" @click="copy" id="copy">{{$t('account.copy')}}</div>
                        </div>
                    </div>
                </div> -->
                <div class="">
                    <p class="ft22 cor3"><span :class="{'black':tab == 1,'bold':tab == 1}" class="curPer" @click="tab = 1">返佣记录</span><span class="ml20 curPer" :class="{'black':tab == 2,'bold':tab == 2}" @click="tab = 2">持仓统计</span></p>
                    <div class="flex alcenter ft14 mt10">
                        <span>层级：</span>
                        <el-select size="mini" v-model="lever" @change="changeLever">
                            <el-option :value="item.value" :label="item.name" v-for="(item,i) in leverList" :key="i"></el-option>
                        </el-select>
                        <span class="mr10" style="margin-left:50px;">用户账号：</span>
                        <el-input placeholder="用户手机号或邮箱" style="width:350px;" size="mini" @keyup.native="inp" v-model="account" class="input-with-select"><el-button slot="append" icon="el-icon-search"></el-button> </el-input>
                    </div>
                    <div class="mt20 ft14" v-if="tab == 1">
                        <div class="flex alcenter cor2 ft14 bdb_eb pb10">
                            <!-- <span class="flex1">{{$t('invite.account')}}</span>
                            <span class="flex1 tc">{{$t('time')}}</span>
                            <span class="flex1 tr pr30">{{$t('status')}}</span> -->
                             <span class="flex1">UID</span>
                             <span class="flex1 tc">手机号</span>
                             <span class="flex1 tc">层级</span>
                             <!-- <span class="flex1 tc">手续费返佣</span> -->
                             <span class="flex1 tr pr30">SGR返佣</span>
                        </div>
                        <div class="cor3 ft14 mt20 H500 overyscroll">
                            <div class="flex alcenter mb20" v-for="(item,i) in inviteList" :key="i">
                                <span class="flex1">{{item.thisid}}</span>
                                <span class="flex1 tc">{{item.account}}</span>
                                <span class="flex1 tc">{{item.lever}}</span>
                                <!-- <span class="flex1 tc">{{item.inv_balance}}</span> -->
                                <span class="flex1 tr pr30">{{item.sgr_balance}}</span>
                            </div>
                            <!-- <div class="mt20 tc cor2" v-show='hasMore'> 加载更多</div> -->
                            <div class="mt20 tc cor2" v-show='!inviteList.length'>{{$t('invite.nomore')}}</div>
                        </div>
                    </div>
                    <div class="mt20 ft14" v-if="tab == 2">
                        <div class="flex alcenter cor2 ft14 bdb_eb pb10">
                            <!-- <span class="flex1">{{$t('invite.account')}}</span>
                            <span class="flex1 tc">{{$t('time')}}</span>
                            <span class="flex1 tr pr30">{{$t('status')}}</span> -->
                             <span class="flex1">UID</span>
                             <span class="flex1 tc">手机号</span>
                             <span class="flex1 tc">层级</span>
                             <span class="flex1 tc">HXB持仓</span>
                             <span class="flex1 tr pr30">SGR持仓</span>
                        </div>
                        <div class="cor3 ft14 mt20 H500 overyscroll">
                            <div class="flex alcenter mb20" v-for="(item,i) in inviteList02" :key="i">
                                <span class="flex1">{{item.thisid}}</span>
                                <span class="flex1 tc">{{item.account}}</span>
                                <span class="flex1 tc">{{item.lever}}</span>
                                <span class="flex1 tc">{{item.hxb_balance}}</span>
                                <span class="flex1 tr pr30">{{item.sgr_balance}}</span>
                            </div>
                            <!-- <div class="mt20 tc cor2" v-show='hasMore'> 加载更多</div> -->
                            <div class="mt20 tc cor2" v-show='!inviteList.length'>{{$t('invite.nomore')}}</div>
                        </div>
                    </div>
                </div>
                <!-- <div class="mt40 cor3">
                    <p class="ft22 ">{{$t('invite.rules')}}</p>
                    <div class="mt20 ft12">
                        <p class="mb10">1.{{$t('invite.tip1')}}</p>
                        <p class="mb10">2.{{$t('invite.tip2_0')}}{{c_rate}}{{$t('invite.tip2_1')}}；</p>
                        <p class="mb10">3.{{$t('invite.tip3')}}</p>
                        <p class="mb10">4.{{$t('invite.tip4_0')}}{{c_name}}{{$t('invite.tip4_1')}}（{{c_name}}） {{$t('invite.tip4_2')}}。</p>
                        <p class="mb10">5.{{$t('invite.tip5_0')}}{{c_name}}{{$t('invite.tip5_1')}}。</p>
                    </div>
                </div> -->
            </div>

        </div>
    </div>
</template>
<script>
import "@/lib/clipboard.min.js";
export default {
    data(){
        return{
            token:'',
            rankList:[],
            inviteList:[],
            inviteList02:[],
            page:0,
            hasMore:false,
            limit:10,
            invite_code:'',
            c_name:'',
            c_rate:'',
            tab:1,
            msg:'',
            leverList:[
                {name:1,value:1},
                {name:2,value:2},
                {name:3,value:3}
            ],
            lever:'',
            account:'',
            count_inv:'', //总邀请返佣手续费
            count_release:'' //总邀请sgr返佣
        }
    },
    created(){
        this.token=localStorage.getItem('token')||'';
        this.init();
        this.userInfo();
        this.getRate();
        this.getInviteAccount();
        this.inviteLog();
        this.inviteUser();
        this.getCount();
    },
    methods:{
        //总返佣

        getCount(){
            this.$http({
                url:'/api/user/invite_user_count',
                method:'get',
                headers:{Authorization:this.token}
            }).then(res=>{
                if(res.data.type == 'ok'){
                    this.count_inv = res.data.message.count_inv;
                    this.count_release = res.data.message.count_release;
                }
            })
        },
        getInviteAccount(){
            this.$http({
                url:'/api/user/invite_count',
                method:'get',
                headers:{Authorization:this.token}
            }).then(res=>{
                if(res.data.type == 'ok'){
                    this.msg = res.data.message;
                }
            })
        },
        getRate(){
            this.$http({
                url:'/api/wallet/get_info',
                method:'post',
                headers:{Authorization:this.token}
            }).then(res=>{
                if(res.data.type == 'ok'){
                    this.c_name = res.data.message.c_name;
                    this.c_rate = res.data.message.c_rate;
                }
            })
        },
        init(){
            this.$http({
                url:'/api/user/invite',
                method:'get',
                data:{},
                headers:{Authorization:this.token}
            }).then(res=>{
                var data=res.data;
                if(data.type=='ok'){
                    if(data.message.length>0){
                       this.rankList=data.message;
                    }

                }
            })


        },
        //返佣记录
        inviteLog(){
            var i = layer.load();
              this.$http({
                url:'/api/user/invite_log',
                method:'get',
                params:{level:this.lever||'',account:this.account||''},
                headers:{Authorization:this.token}
            }).then(res=>{
                layer.close(i)
                var data=res.data;
                if(data.type=='ok'){
                    this.inviteList=data.message;

                    //console.log(this.inviteList)
                }
            });
        },
        //持仓统计
        inviteUser(){
            var i = layer.load();
             this.$http({
                url:'/api/user/invite_user',
                method:'get',
                params:{level:this.lever||'',account:this.account||''},
                headers:{Authorization:this.token}
            }).then(res=>{
                layer.close(i);
                var data=res.data;
                if(data.type=='ok'){
                    this.inviteList02=data.message;
                }
            })
        },
        //等级筛选
        changeLever(){
            if(this.tab == 1){
                this.inviteList = [];
                this.inviteLog()
            }else{
                this.inviteList02 = [];
                this.inviteUser();
            }
        },
        //手机号筛选
        inp(){
            if(this.tab == 1){
                this.inviteList = [];
                this.inviteLog()
            }else{
                this.inviteList02 = [];
                this.inviteUser();
            }
        },
        //userinfo
        userInfo(){
           this.$http({
            url: "/api/" + "user/info",
            method: "get",
            data: {},
            headers: { Authorization: localStorage.getItem("token") }
        }).then(res => {
            //console.log(res);
            if (res.data.type == "ok") {
               this.invite_code = res.data.message.invite_code
            }
            })
        },
        //复制
        copy() {
            var that = this;
            var clipboard = new Clipboard("#copy", {
                text: function() {
                return (
                    that.invite_code
                );
                }
            });
            clipboard.on("success", function(e) {
                that.flags = true;
                layer.msg(that.$t('lay.copys'));
            });
            clipboard.on("error", function(e) {
                that.flags = false;
                layer.msg(that.$t('lay.recopy'));
            });
            },

        copy_link(){
            var that = this;
            var clipboard = new Clipboard(".copy_link", {
                text: function() {
                return (
                    'https://www.hxex.com/#/components/register?code='+that.invite_code
                );
                }
            });
            clipboard.on("success", function(e) {
                that.flags = true;
                layer.msg(that.$t('lay.copys'));
            });
            clipboard.on("error", function(e) {
                that.flags = false;
                layer.msg(that.$t('lay.recopy'));
            });
            },


    }
}
</script>
<style lang='scss'>
.H500{
    height: 500px;
}
.H34{
    height: 34px;
}
.invite_container{
    max-width: 1200px;
    margin-top: -40px;
    position: relative;
    .invite_header{
        height: 268px;
        .head{
            height: 64px;
            // padding-top: 20px;

        }
    }
}
.shadows{
    box-shadow: 0 0 8px #eee;
}
</style>

