<template>
    <!-- <img :src="this.imgSrc" alt="">  -->
    <div class="take-photo">
      <!-- 拍照 -->
      <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoPlay></video>
      <el-button size="small" type="primary" @click="takePhotoHandle">拍照</el-button>
      <!-- 预览 -->
      <canvas id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
      <!-- <el-button size="small" type="primary" :loading="loading" @click="uploadHandle">上传</el-button> -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'takePhoto',
    data () {
      return {
        loading: false, // 上传照片的loading
        imgSrc: "", // 照片地址
        photoVideo: null, // 拍照框
        photoContext: null, // canvas绘图环境
        photoCancas: null, // 预览框
        videoWidth: 222, // 拍照框宽度
        videoHeight: 222, // 拍照框高度
        url:''
      }
    },
    mounted () {
      // 打开摄像头
      this.openCamera()
    },
    beforeDestroy() {
      if (this.photoVideo && this.photoVideo.srcObject) {
        // 停止视频流
        this.photoVideo.srcObject.getTracks()[0].stop();
      }
    },
    methods: {
      // 拍照处理
      takePhotoHandle () {
        // canvas画图
        this.photoContext.drawImage(this.photoVideo, 0, 0, this.videoWidth, this.videoHeight)
        // 获取图片base64链接
        this.imgSrc = this.photoCancas.toDataURL('image/png')
      },
      // 打开摄像头
      async openCamera() {
        this.photoVideo = document.getElementById('videoCamera')
        this.photoCancas = document.getElementById('canvasCamera')
        this.photoContext = this.photoCancas.getContext('2d')
        try {
          const constraints = {
            audio: false,
            video: {
              width: this.videoWidth,
              height: this.videoHeight
            }
          }
          const stream = await navigator.mediaDevices.getUserMedia(constraints)
          this.photoVideo.srcObject = stream
          this.photoVideo.play()
        } catch (error) {
          this.$message({
            title: '警告',
            message: '请确认摄像头能正常工作，必须使用谷歌浏览器或者360浏览器的极速模式，否则拍照不能正常使用',
            type: 'warning',
            duration: 8000
          });
        }
      },
      // 上传照片
      async uploadHandle () {
        this.loading = true
        try {
          const firstIndex = this.imgSrc.indexOf('base64,')
          const url = this.imgSrc.substr(firstIndex + 7)
          const params = {
            photo: url
          }
          // 发送接口
           //await xxx(params)
        console.log(params.photo);
        this.url=params.photo;
        params.photo='data:image/png;base64,'+params.photo;
        console.log(this.imgSrc);
        
          this.loading = false
        } catch (error) {
          this.loading = false
        }
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  </style>