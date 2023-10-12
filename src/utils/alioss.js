
import OSS from "ali-oss";
export function client(){
  var client = new OSS({
      endpoint: 'oss-cn-beijing-internal.aliyuncs.com',//填写Bucket所在地域
      accessKeyId: 'LTAI5tNFwZwRQ5HWsS9vv4tS',
      accessKeySecret: 'vZA1r3h6miEnd3YurSE2MtlVRVIB2H',
      bucket: 'itlibing',// 填写Bucket名称。
  })  //后端提供数据 
  return client
}
/**
 * 生成随机uuid
 */
export const getFileNameUUID = () => {
  function rx() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return `${+new Date()}_${rx()}${rx()}`
}


