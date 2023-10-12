<template>
    <div>
      <div class="show">
        <button class="button"  @click="TypeSwap()" style="height: 40px;position: relative; margin-left:5%; margin-top: 1%;">切换</button>
        <div class="show1" >
          <img ref="showing" src="" id="showimg" style="margin-left: 1px;margin-top: 3px" v-show="TypePic">
          <img :src="this.imgSrc" alt="" style="margin-left: 1px;margin-top: 3px;borderRadius:200px;" v-show="!TypePic"/>
        </div>
        <br>
        <div class="upload" v-show="TypePic">图片选择
        <input multiple="multiple" id="file" ref="file"
               accept=".jpg,.png"
               @click="changepic(this)" type="file" name="userpic"
               style="
                position: absolute;
                overflow: hidden;
                right: 0;
                top: 0;
                opacity: 0;
               width: 100%;
               height: 32px;
               "
        >
        </div> 
        <div class="upload" v-show="!TypePic" @click="dialogVisible = true">拍照</div>
        <button class="button" @click="subchangepic()" style="height: 40px;position: relative; margin-left:35%;">确定</button>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%" height="100%"
        :before-close="handleClose">
        <span><TakePhotos ref="takephoto"/></span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="phoneTake()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
import axios from 'axios';
  import { client } from '../../utils/alioss.js';
  import TakePhotos from '../element/TakePhotos.vue';
  import Element from 'element-ui';

  export default {
    name: "imageUp",
    data(){
      return {
        filename: null,
        f64: null,
        loadImage: "",
        TypePic:true,
        dialogVisible: false,
        imgSrc:''
      }
    },
    methods: {
  
  
      changepic() {
        document.getElementById('file').onchange = function () {
          var imgFile = this.files[0];
          var fr = new FileReader();
          fr.onload = function () {
            let showing = document.getElementById('showimg')
            let img = fr.result;
            this.f64 = img;
            this.filename = imgFile.name
            showing.src = img;
            showing.style.height = "220px";
            showing.style.width = "220px";
            showing.style.borderRadius = "200px"
          };
          fr.readAsDataURL(imgFile);
          
        }
      },
      TypeSwap(){
        this.TypePic=!this.TypePic;
        this.imgSrc='';
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      phoneTake(){
        this.dialogVisible = false;
        this.$nextTick(()=>{this.imgSrc=this.$refs.takephoto.imgSrc;})
      },
      subchangepic(){
        if(this.TypePic){
          alert('src');
          this.imgSrc=document.getElementById('showimg').src;
        }
        axios.post('/emp/person/imageUp',{params:{epic:this.imgSrc}}).then(res=>{
          let result = res.data.code;
          if(result){
            Element.Message.success(res.data.msg);
            let form = JSON.parse(localStorage.getItem('user'));
            form.epic=this.imgSrc;
            
            localStorage.setItem('user',JSON.stringify(form));
          }
          else{
            Element.Message.error(res.data.msg);
          }
        })
      }
      
    },
    components:{
      TakePhotos,
    }
  }
  </script>
  
  <style scoped>
  .active{
    display: block;
  }
  
  .upload{
    display: block;
    margin-left: 20%;
    width: 12%;
    text-align: center;
    color: white;
    height: 32px;
    border-radius: 3px;
    background: #1E90FF;
    cursor: pointer;
    outline: none;
    border-width: 0px;
    font-size: 17px;
    display:inline-block;
    padding: 4px 10px;
    line-height:30px;
    position: relative;
    text-decoration: none;
  
  }
  
  .button {
    margin-left: 70%;
    width: 15%;
    height: 35px;
    border-width: 0px;
    border-radius: 3px;
    background: #1E90FF;
    cursor: pointer;
    outline: none;
    color: white;
    font-size: 17px;
  }
  .show{
    margin: 100px auto;
    width: 80%;
    height: 450px;
    border: 5px solid #18a0ec;
    transition: all 0.9s;
    border-radius: 10px;
  
  }
  .show1{
    margin: 50px auto;
    width: 222px;
    height: 226px;
    border: 5px solid #18a0ec;
    transition: all 0.9s;
    border-radius: 150px;
  
  }
  
  .show1:hover{
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.4);
    margin-top: 45px;
  }
  
  .show:hover{
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.4);
    margin-top: 45px;
  
  }
  
  .texti{
    border: 1px solid #ccc;
    padding: 13px 14px;
    width: 30%;
  
    font-size: 14px;
    font-weight: 300;
  
    border-radius: 5px; /* 边框半径 */
    background: white; /* 背景颜色 */
    cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
    outline: none; /* 不显示轮廓线 */
  
  
  }
  .texti:focus{
    border-color: #1e88e1;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
  }
  textarea {
    resize: none;
  
  }
  </style>
  