<template>
    <div>
        <p class="w60 tr back clr-part" @click="back">返回</p>
        <div class="w60 bgWhite wrap radius5 plr20 ptb10">
            <div class="flex alcenter  ft14 ptb10 plr20">
                <span>划转方向：</span>  
            <el-select v-model="value" placeholder="请选择"  size="small">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </div>
            <div class="flex alcenter ft14  ptb10 plr20">
                <span>划转数量：</span>
                <div>
                <el-input v-model="num" type="number" placeholder="请输入划转数量" size="small"></el-input>
                </div>
            </div>
            <div class=" ft14  ptb10 plr20">
                <p class="mb10">币币账户：{{change}}</p>
                <p>商家账户：{{shop_balance}}</p>
            </div>
            <div class="ptb10 plr20 hua">
            <el-button @click="transfer" type="primary" size="mini">划转</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           options:[
               {
                   value:1,
                   label:'从商家账户到币币账户'
               },
               {
                   value:2,
                   label:'从币币账户到商家账户'
               }
           ],
           value:'',
           num:'',
           id:'',
           shop_balance:'',
           legal_balance:'',
           change:''  //币币账户
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.getInfo();
    },
    methods:{
        back(){
            this.$router.back(-1)
        },
        getInfo(){
            this.$http({
                url:'/api/wallet/info_for_transfer',
                method:'get',
                params:{
                    merchant_id:this.id
                },
                headers: { Authorization: localStorage.getItem('token')}
            }).then(res=>{
                if(res.data.type == 'ok'){
                     this.shop_balance = res.data.message.merchant_balance;
                     this.legal_balance = res.data.message.legal_balance;
                     this.change = res.data.message.change;
                }
            })
        },
        //划转
        transfer(){
            if(this.value == ''){
                layer.msg('请选择划转方向');
                return;
            }
            if(this.num == ''){
                layer.msg('请输入划转数量');
                return;
            };
            var from = '';
            var to = '';
            if(this.value == 1){
                from = 'merchant';
                to = 'legal'
            }else if(this.value == 2){
                from = 'legal';
                to = 'merchant'
            }
            var i = layer.load();
            this.$http({
                url:'/api/wallet/merchant_transfer',
                method:'post',
                data:{
                    merchant_id:this.id,
                    number:this.num,
                    from:from,
                    to:to
                },
                headers: { Authorization: localStorage.getItem('token')}
            }).then(res=>{
                layer.close(i);
                layer.msg(res.data.message)
                if(res.data.type == 'ok'){
                    this.getInfo();
                }
            })
        }
    }
}
</script>
<style scoped>
    .back{
        margin: 60px auto;
        margin-bottom: 10px;
        text-align: right;
        font-size: 14px;
        cursor: pointer;
    }
    .wrap{
        margin: 10px auto;
        min-height: 500px;
        padding: 20px 100px;
    }
    .hua{
        padding-left: 160px;
    }
</style>
