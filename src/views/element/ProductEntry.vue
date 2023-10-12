<template>
    <div>
        <el-button type="primary" @click="outerVisible=true">添加</el-button>
        <el-button type="primary" @click="Deletes()">批量删除</el-button> 
        
        

        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%" border 
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                type="index"
                :index="indexMethod">
            </el-table-column>
            <el-table-column prop="id" label="编号" width="180"></el-table-column>
            <el-table-column prop="name" label="商品名称" width="180" ></el-table-column>
            <el-table-column  label="商品图片" width="180">
                <template slot-scope="scope">
                    <img :src="scope.row.imageUrl" width="100px" height="70px"/>
                </template>
            </el-table-column>
            <el-table-column prop="purchasePrice" label="商品进价" width="180"></el-table-column>
            <el-table-column prop="Receipt" label="商品标价" width="180"></el-table-column>
            <el-table-column label="商品数量" width="180">
                <template slot-scope="scope"><el-input-number v-model="scope.row.num" @change="handleChange" :min="1" :max="10" /></template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button @click="handleDelete(scope.$index)" type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
            
            
            </el-table>

            <el-dialog
                title="商品录入"
                :visible.sync="outerVisible"
                width="50%" height="60%"
                :before-close="handleClose">
                <el-dialog
                    title="提示"
                    :visible.sync="innerVisible"
                    width="50%" height="60%"
                    :before-close="handleClose">
                    <span style="width: 500px; height: 500px;">
                        <template >
                        <ScanCodePage ref="Scanner"></ScanCodePage>
                        </template>
                    </span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="innerVisible = false">取 消</el-button>
                        <el-button type="primary" @click="CodeScan()">确 定</el-button>
                    </span>
                </el-dialog>

                <span style="width: 500px; height: 500px;">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="商品编号" prop="id">
                            <el-input v-model="ruleForm.id"></el-input>
                        </el-form-item>
                        <el-form-item label="商品名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="上传图片" ref="uploadElement" prop="imageUrl">
                            
                            <!-- <el-input v-model="ruleForm.imageUrl" v-if="false"></el-input> -->
                            <img :src="this.imgSrc" alt="" id="showimg" style="width: 150px;height: 150px;"/>
                            <br/>
                            <div class="upload" v-show="TypePic">上传
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
                            <div class="upload"   @click="dialogVisible = true" style="position: relative; margin-left: 2%;">拍照</div>
                            <!-- <el-upload
                                ref="upload"
                                action=""
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                                :on-change="UploadImage"
                                :limit="1"
                                :file-list="fileList"
                                :auto-upload="false"
                                id="file"
                            >
                            <i class="el-icon-plus"></i> 
                            <template #tip>
                                <div style="font-size: 12px;color: #919191;">
                                单次限制上传一张图片
                                </div>
                            </template>
                            </el-upload> -->
                            <!-- <el-dialog v-model="dialogVisible" style="line-height: 0;">
                            <img style="width: 100%;height: 100%"  :src="ruleForm.imageUrl" alt="" /> 
                            </el-dialog> -->
                        </el-form-item>

                        <el-form-item label="商品类型" prop="region">
                            <el-select v-model="ruleForm.region" placeholder="请选择商品类型">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="进价 ￥" prop="purchasePrice">
                            <el-input-number v-model="ruleForm.purchasePrice"  :min="0" :precision="2" :step="0.1" step-strictly></el-input-number>
                        </el-form-item>
                        <el-form-item label="售价 ￥" prop="Receipt">
                            <el-input-number v-model="ruleForm.Receipt"  :min="0" :precision="2" :step="0.1" step-strictly></el-input-number>
                        </el-form-item>
                        <el-form-item label="数目" prop="num">
                            <el-input-number v-model="ruleForm.num"   :min="1" :max="100"></el-input-number>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                            <el-button @click="innerVisible=true">扫描</el-button>
                        </el-form-item>
                    </el-form>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="outerVisible = false">取 消</el-button>
                    <el-button type="primary" @click="outerVisible=false">确 定</el-button>
                </span>
            </el-dialog>
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
import ScanCodePage from './ScanCodePage.vue'
import TakePhotos from './TakePhotos.vue'
export default {
    components:{
        ScanCodePage,
        TakePhotos,
    },
    data(){
        var checkPurchasePrice= (rule, value, callback) =>{
            if(value===0)
                return callback(new Error('price is error'))
        };
        return{
            
            checkedDetail:[],
            tableData:[{id:'32523',name:'ull',imageUrl:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',purchasePrice:30,Receipt:40,num:1}],
            userId:"",
            outerVisible:false,
            innerVisible:false,
            ruleForm: {
                id:'',
                name: '',
                region: '',
                purchasePrice:0,
                Receipt:0,
                num:1,
                imageUrl:""
            },
            filename: null,
            f64: null,
            loadImage: "",
            TypePic:true,
            dialogVisible: false,
            imgSrc:require('../../assets/img/V.png'),
            rules: {
                /* name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ], */
                /* imageUrl: [
                    {required: true, message: '请上传图片', trigger: 'blur'},
                ], */
                /* purchasePrice:[
                    {validator:checkPurchasePrice, trigger:'blur'}
                ] */

            },
            
            
        }
    },
    methods:{
        indexMethod(index) {
            return index +1;
        },
      // 删除单个行
        handleDelete(index) {
            this.tableData.splice(index, 1);
            this.sums();
        },
        //清空List
        Clear(){
        this.tableData=undefined;
        },
        //单选框选中数据
        handleSelectionChange(selection) {
            //如果缓存中已有数据，则清空
            if (selection.length < 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(selection.pop());
            } else {
                //将选中行存入缓存中
                this.checkedDetail = selection;
            }
        },
        Deletes()
        {
            if (this.checkedDetail.length == 0) {
                this.$alert("请先选择要删除的数据", "提示", {
                confirmButtonText: "确定",
                });
            } else{
                 this.checkedDetail.forEach(element => {
                    if(element!==undefined)
                    for(let i=0;i<this.tableData.length;i++){
                        console.log(i);
                        console.log(this.checkedDetail);
                        if(this.tableData[i].id===element.id){
                            this.tableData.splice(i,1);
                            break;
                        }
                    }
                }); 
                this.checkedDetail=[];
            }

        },
         submitForm(formName) {
            this.ruleForm.imageUrl=this.imgSrc;
            this.$refs[formName].validate((valid) => {
                console.log('submitform');
                if (valid) {
                    alert('submit!');
                     if(this.ruleForm.purchasePrice<=this.ruleForm.Receipt){
                        this.$axios.post('/emp/ProductEntry',this.ruleForm).then(res=>{
                            let result = res.data.code;
                            let message = res.data.msg;
                            if(result){
                                alert('success');
                                this.tableData.push(this.ruleForm);
                                
                                //this.resetForm(formName);
                            }
                            else{
                                alert(message);
                            }
                        });
                        
                    }
                    else{
                        alert('请确认该商品的进价小于售价');
                    } 
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },  
        
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$refs.upload.clearFiles();
        },
        handleAvatarSuccess(res, file) {
            this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
        },
        
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        UploadImage(file,filelist) {
            console.log(this.ruleForm.imageUrl);
            /* var imgFile = this.files[0];
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
            fr.readAsDataURL(imgFile); */
            //console.log(file);
            /* let fd = new FormData()
            fd.append('file', file.raw) //传给后台接收的名字 file
            axios.post('/upload/image', fd, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
                //上传成功后返回的数据,
                console.log("上传图片到:"+response.data);
                // 将图片地址给到表单.
                this.ruleForm.image=response.data
            })
         */
            },
            //移除图片功能
        handleRemove(file, fileList) {
            console.log(file, fileList)
    
        },
            //预览图片功能
        handlePictureCardPreview(file) {
            console.log(file.url);
            this.dialogVisible = true
            this.dialogImageUrl = file.url
        
        },
        CodeScan(){
            this.innerVisible=false;
            this.$nextTick(()=>{
                let tempId=this.$refs.Scanner.tipMsg;
                this.ruleForm.id=tempId;
                console.log("查找到的是"+tempId);
                axios.get('/emp/ProductEntry',{params:{productId:tempId}}).then(res=>{
                    console.log(res.data);
                },err=>{
                    console.log(err.message);
                });
            });
        },
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
            //this.imgSrc=img;
            console.log(this.imgSrc);
            showing.style.borderRadius = "10px"
          };
          fr.readAsDataURL(imgFile);
        }
      },
      phoneTake(){
        this.dialogVisible = false;
        this.$nextTick(()=>{this.imgSrc=this.$refs.takephoto.imgSrc;})
      },

    },
    mounted(){
        this.userId=localStorage.getItem("userId");
        this.$nextTick((this.resetForm('ruleForm')))
    }

}
</script>


<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .upload{
    display: block;
    margin-left: 1%;
    width: 12%;
    text-align: center;
    color: white;
    height: 32px;
    border-radius: 3px;
    background: #1E90FF;
    cursor: pointer;
    outline: none;
    border-width: 0px;
    font-size: 15px;
    display:inline-block;
    padding: 4px 10px;
    line-height:30px;
    position: relative;
    text-decoration: none;
  
  }
</style>