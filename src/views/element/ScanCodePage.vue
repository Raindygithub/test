<template name="scan">
  <div class="scan-page">
    <!-- 返回导航栏 -->
    <van-nav-bar title="扫描二维码/条形码" left-text="取消" left-arrow 
      fixed class="scan-index-bar" @click-left="clickIndexLeft()"
    ></van-nav-bar>
    <!-- 扫码区域 -->
    <video ref="video" id="video" class="scan-video" style="width: 100%; height: 90%;"></video>
    <!-- 提示语 -->
    <div v-show="tipShow" class="scan-tip" style="width: 500px;">{{ tipMsg }}</div>
  </div>
</template>
 
<script>
import { BrowserMultiFormatReader } from '@zxing/library';
import { Toast, Dialog, Notify } from 'vant';
 
  export default {
    name: 'ScanCodePage',  // 扫码页面
    data() {
      return {
        codeReader: null,
        tipShow: false,  // 是否展示提示
        tipMsg: '',  // 提示文本内容
        scanText: '',  // 扫码结果文本内容
        isScan:false,
      }
    },
    created() {
      this.openScan();
    },
    watch: {
      '$route'(to, from) {
        if(to.path == '/ScanCodePage'){  // 当处于该页面时
          this.openScan();
        }
      }
    },
    destroyed(){
      this.codeReader.reset();
      this.codeReader = null;
    },
    methods: {
      async openScan() {  // 初始化摄像头
        this.codeReader = await new BrowserMultiFormatReader();
        this.codeReader.getVideoInputDevices().then(videoDevices => {
          this.tipMsg = '正在调用摄像头...';
          this.tipShow = true;
          console.log('get-videoDevices', videoDevices);
 
          // 默认获取摄像头列表里的最后一个设备id，通过几部测试机发现一般前置摄像头位于列表里的前面几位，所以一般获取最后一个的是后置摄像头
          let firstDeviceId = videoDevices[videoDevices.length - 1].deviceId; 
          // 一般获取了手机的摄像头列表里不止一个，有的手机摄像头高级多层，会有变焦摄像头等情况，需要做处理
          if (videoDevices.length > 1) {
            // 一般通过判断摄像头列表项里的 label 字段，'camera2 0, facing back' 字符串含有 'back' 和 '0'，大部分机型是这样，如果有些机型没有，那就还是默认获取最后一个
            firstDeviceId = videoDevices.find(el => { return el.label.indexOf('back') > -1 && el.label.indexOf('0') > -1 }) ? 
              videoDevices.find(el => { return el.label.indexOf('back') > -1 && el.label.indexOf('0') > -1 }).deviceId : 
              videoDevices[videoDevices.length - 1].deviceId;
          }
          console.log('get-firstDeviceId', firstDeviceId);
          
          this.decodeFromInputVideoFunc(firstDeviceId);
        }).catch(err => {
          this.tipShow = false;
          console.error(err);
        });
      },
      decodeFromInputVideoFunc(firstDeviceId) {  // 使用摄像头扫描
        //this.codeReader.reset(); // 重置
        this.codeReader.decodeFromInputVideoDeviceContinuously(firstDeviceId, 'video', (result, err) => {
          if(this.isScan===false){
            this.tipMsg = '正在尝试识别...';
            this.isScan=true;
          }
          if (result) {
            console.log('扫码结果', result);
            this.scanText = result.text;
            if (this.scanText) {
              //this.tipShow = false;
              this.tipMsg=this.scanText;
              console.log(this.tipMsg);
              /* Dialog.confirm({  // 获取到扫码结果进行弹窗提示，这部分接下去的代码根据需要，读者自行编写了
                title: '扫码结果',
                message: this.scanText,
              }).then(() => {  // 点击确认
                  
 
              }).catch(() => {  // 点击取消
 
              });  */
            }
          }
        });
      },
      clickIndexLeft(){  // 返回上一页
        this.$destroy();
        this.$router.go(-1);
        // window.location.href = document.referrer;
      },
      getTipMsg(){
        return this.tipMsg;
      }
    }
  }
</script>
 
<style lang="scss">
.scan-index-bar{
  background-image: linear-gradient( -45deg, #42a5ff ,#59cfff);
  .van-nav-bar__title, .van-nav-bar__arrow, .van-nav-bar__text{
    color: #fff !important;
  }
}
.scan-page{
  min-height: 100vh;
  background-color: #363636;
  overflow-y: hidden;
  .scan-video{
    height: 85vh;
  }
  .scan-tip{
    width: 46vw;
    text-align: center;
    color: white;
    font-size: 5vw;
  }
}
</style>