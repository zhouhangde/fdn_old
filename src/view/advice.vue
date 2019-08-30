<template>
  <div class="advice_wrap bg-part">
    <div class="title ft16">{{$t('ad.adrecord')}}</div>
    <ul>
      <li v-for="(item,index) in lists" :key="index">
        <div class="list-item">
          <div class="mb10 flex between">
            <h2 class="creat">{{$t('ad.release')}}：{{item.content}}</h2>  
            <span class="fr ft12">{{item.create_time}}</span>
          </div>
          <p class="mb10 plr40">
              <img v-for="(itm,i) in item.pic" :key="i" :src="itm" @click="show_img(itm)" class="pic curPer ml10">
            </p>
          <div class="flex between">
            <p class="ft14 reply">{{$t('ad.reply')}}：{{item.reply_content||$t('ad.none')}}</p>
            <span class="fr ft12">{{item.reply_time||''}}</span>
          </div>
          <p class="mb10 plr40 mt10">
              <img v-for="(itm,i) in JSON.parse(item.reply_pic)" :key="i" :src="itm" @click="show_img(itm)" class="pic curPer ml10">
            </p>
        </div>
      </li>
      <li class="more tc ft14 mb10 gray" @click="getMore">{{more}}</li>
    </ul>
    <div class="title ft16">{{$t('ad.releaseit')}}</div>
    <div class="flex alcenter">
      <span class="w10">主  题:</span>
      <input class="topic w90" v-model="title" placeholder="请填写主题">
    </div>
    <div class="mb20">
            <p class="codeText">添加图片</p>
            <div class="mt20">
            <el-upload
              list-type="picture-card"
              action=""
              :limit="lim"
              :http-request="uploadImg"
              :on-success="handSuccess"
              :on-preview="handlePictureCardPreview"
              :file-list="fileList"
              :on-exceed="exceedTips"  
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </div>
          </div>
    <textarea class="texta ft14" v-model="texta" :placeholder="$t('ad.con')"></textarea>
    <div class="tc submit_btn blue_bg ft16" @click="submit">{{$t('ad.up')}}</div>
    <div class="shad flex alcenter center" v-if="show" @click="show = false">
      <img :src="img" class="img">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      texta: "",
      token: "",
      lists: [],
      more: this.$t("ad.more"),
      page: 0,
      title: "",

      dialogImageUrl: '',
      dialogVisible: false,
      lim:3,
      fileList:[],
      pic:'',
      img:'',
      show:false,
      arrImg:[]
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    this.getlist(0);
  },
  methods: {
    //上传成功
    handSuccess(response,file,fileList){
        //console.log(response,file,fileList)
    },
    handleRemove(file, fileList) {  //删除图片
          //console.log(file, fileList);
        },
      handlePictureCardPreview(file) { //预览图片
        //console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      exceedTips(res){  //超出上传个数
          //console.log(res);
          layer.msg('最多上传'+this.lim+'张图片')
      },
      uploadImg(res){  //上传图片
       var that = this;
       //console.log(res);
       var formData = new FormData();
       formData.append("file", res.file); 
       var i = layer.load();
       $.ajax({
                url: '/api/'+'upload',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function (res) {
                  layer.close(i)
                    //console.log(res)
                    // that.pic = res.message;
                    that.arrImg.push(res.message);
                }
            });
    },
    //预览图片
    show_img(img){
      this.img = img;
      this.show = true;
    },
    submit() {
      //console.log(this.fileList)
        if(this.title == ''){
            layer.msg('请填写主题');
            return;
        }
      if (this.texta == "") {
        layer.msg(this.$t("lay.pliu"));
        return;
      }
      if (!this.arrImg) {
        layer.msg('请上传图片');
        return;
      }
      var i = layer.load();
      if(this.token){
         this.$http({
        url: "/api/feedback/add",
        method: "post",
        data: { content: this.texta,title:this.title,pic:JSON.stringify(this.arrImg) },
        headers: {
          Authorization: this.token,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      }).then(res => {
        layer.close(i);
        //console.log(res);
        layer.msg(res.data.message);
        this.texta = "";
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
      }else{
        this.$http({
        url: "/api/feedback/add",
        method: "post",
        data: { content: this.texta,title:this.title,pic:this.pic },
        headers: {
          Authorization:'',
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      }).then(res => {
        layer.close(i);
        //console.log(res);
        layer.msg(res.data.message);
        this.texta = "";
          this.lists = [];
          this.getlist(0)
      });
      }
      
    },
    //留言列表

    getlist(page) {
      var i = layer.load();
      this.$http({
        url: "/api/feedback/list",
        method: "get",
        params: { page: page },
        headers: { Authorization: this.token || '' }
      }).then(res => {
        //console.log(res);
        layer.close(i);
        if (res.data.type == "ok") {
          //console.log(res);
          if (res.data.message.data.length > 0) {
            this.more = this.$t("nomore");
            this.$nextTick(()=>{
               this.lists = this.lists.concat(res.data.message.data);
            }) 
            
          } else {
            this.more = this.$t("nomore");
          }
        }
      });
    },
    //加载更多
    getMore() {
      this.page++;
      this.more = this.$t("nomore");
      this.getlist(this.page);
    }
  }
};
</script>
<style scoped>
.topic {
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 3px;
  margin-bottom: 10px;
}
.advice_wrap {
  width: 80%;
  margin: 50px auto;
  padding: 30px;
}
.title {
  margin-bottom: 30px;
}
.texta {
  width: 100%;
  height: 300px;
  border: 1px solid #eee;
  border-radius: 3px;
  padding: 20px;
  line-height: 1.8;
}
.submit_btn {
  width: 150px;
  line-height: 50px;
  border-radius: 5px;
  margin: 20px auto;
  cursor: pointer;
}
.list-item {
  background: #eee;
  padding: 30px 20px;
  margin-bottom: 10px;
}
.creat,
.reply {
  width: 80%;
}
.more {
  cursor: pointer;
}
.pic{
  width: 150px;
}
.shad{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}
.img{
  width: 80%;
}
.pic{
  width: 150px;
}
</style>

