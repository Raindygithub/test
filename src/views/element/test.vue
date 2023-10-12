
<template>
  <div>
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
    <img src="" alt="" id="showimg" style="width: 100px;height: 100px;">
  </div>
</template>
<script>

  export default {
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
      // 上传文件之前
			
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

    }
  }
</script>
