<template>
    <div>
        <page-tools :show-before="true">
        <span slot="before">共{{ this.tableData.length }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" >导入</el-button>
          <el-button size="small" type="danger" >导出</el-button>
          <el-button size="small" type="danger" v-print="printObj">打印</el-button>
          <el-button size="small" type="primary" @click="dialogVisible=true">新增员工</el-button>
          <el-button type="danger" @click="Deletes()" icon="el-icon-delete">批量删除</el-button>
        </template>
      </page-tools>
        <!-- <el-button type="danger" @click="Deletes()" icon="el-icon-delete">批量删除</el-button>
        <el-button type="primary"  icon="el-icon-plus">添加员工</el-button> -->
        <br/>
            <el-form :inline="true" :model="SearchForm" class="demo-form-inline" ref="SearchForm">
                <el-form-item label="" prop="e_name">
                    <el-input v-model="SearchForm.e_name" placeholder="员工姓名"></el-input>
                </el-form-item>
                <el-form-item prop="e_post">
                    <el-select v-model="SearchForm.e_post" placeholder="职位">
                        <el-option label="收银员" value="1"></el-option>
                        <el-option label="管理员" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="Search()">查询</el-button>
                </el-form-item>
            </el-form>
        <br/>
        <el-table
            ref="multipleTable"
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            tooltip-effect="dark"
            style="width: 100%" border 
            @selection-change="handleSelectionChange" id="myTable">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                type="index"
                :index="indexMethod">
            </el-table-column>
            <el-table-column prop="e_no" label="员工号" width="180"></el-table-column>
            <el-table-column prop="e_name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="e_sex" label="性别" width="180"></el-table-column>
            <el-table-column prop="e_post" label="职位" width="180"></el-table-column>
            <el-table-column prop="e_salary" label="工资" width="180"></el-table-column>
            
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="Detail(scope.$index)"></el-button>
                    <el-button @click="handleDelete(scope.$index)" type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
            </el-table>
            <!-- 分页 -->
            
            <div style="margin-top:.2rem;margin-left: .2rem;">
                <el-pagination 
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5,7,10]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length">
                </el-pagination>
            </div>

            <!-- 新增员工 -->
            <el-dialog
                title="新增员工"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose" >
                <el-form ref="ruleForm" :model="ruleForm" label-width="80px" label-position="left" :rules="rules">
                    <el-form-item label="员工号" prop="e_no">
                        <el-input v-model="ruleForm.e_no"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="e_name">
                        <el-input v-model="ruleForm.e_name"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" ref="uploadElement" prop="e_pic">
                            <img :src="this.imgSrc" alt="" id="showimg" style="width: 150px;height: 150px;"/>
                            <br/>
                            <div class="upload">上传
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
                            <div class="upload"   @click="PicVisible = true" style="position: relative; margin-left: 2%;">拍照</div>
                    </el-form-item>
                    <el-form-item label="性别" prop="e_sex">
                        <el-select v-model="ruleForm.e_sex" placeholder="请输入性别">
                            <el-option label="男" value="1"></el-option>
                            <el-option label="女" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="民族" prop="e_eg">
                        
                        <el-select v-model="ruleForm.e_eg" filterable placeholder="请选择民族" class="add-nation-input" @change="nationChange">
                            <el-option v-for="item in nationList" :key="item.value" :label="item.info" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="政治面貌" prop="e_pl">
                        <el-select v-model="ruleForm.e_pl" placeholder="请输入政治面貌">
                            <el-option label="中共党员" value="中共党员"></el-option>
                            <el-option label="中共预备党员" value="中共预备党员"></el-option>
                            <el-option label="共青团员" value="共青团员"></el-option>
                            <el-option label="群众" value="群众"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="籍贯" prop="d_add">
                        <china_address v-model="ruleForm.d_add" ref="address"></china_address>
                    </el-form-item>
                    <el-form-item label="移动电话" prop="e_ep">
                        <el-input v-model="ruleForm.e_ep"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="e_mail">
                        <el-input v-model="ruleForm.e_mail"></el-input>
                    </el-form-item>
                    <el-form-item label="职位" prop="e_post">
                        <el-select v-model="ruleForm.e_post" placeholder="请输入性别">
                            <el-option label="收银员" value="1"></el-option>
                            <el-option label="管理员" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="薪资" prop="e_salary">
                        <el-input v-model.number="ruleForm.e_salary" ></el-input>
                    </el-form-item>
                    <el-form-item>
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="submit()">确 定</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!-- 拍照 -->
            <el-dialog
                                title="提示"
                                :visible.sync="PicVisible"
                                width="50%" height="100%"
                                :before-close="handleClose">
                                <span><TakePhotos ref="takephoto"/></span>
                                <span slot="footer" class="dialog-footer">
                                <el-button @click="PicVisible = false">取 消</el-button>
                                <el-button type="primary" @click="phoneTake()">确 定</el-button>
                                </span>
            </el-dialog>
            <!-- 查询及修改 -->
            <el-dialog
                title="详细信息"
                :visible.sync="detailVisible"
                width="30%"
                :before-close="handleClose">
                <el-form ref="detailForm" :model="detailForm" label-width="80px" label-position="left">
                    <el-form-item label="员工号" prop="e_no">
                        <el-input v-model="detailForm.e_no" disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="e_name" >
                        <el-input v-model="detailForm.e_name" disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" ref="uploadElement" prop="e_pic">
                            <img :src="this.imgSrc" alt="" id="showimg" style="width: 150px;height: 150px;"/>
                            <br/>
                            <div class="upload">上传
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
                            <div class="upload"   @click="PicVisible = true" style="position: relative; margin-left: 2%;">拍照</div>
                    </el-form-item>
                    <el-form-item label="性别" prop="e_sex">
                        <div >
                            <el-input v-if="detailForm.e_sex=='1'" disabled="true">男</el-input>
                            <el-input v-else disabled="true">女</el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="民族" prop="e_eg">
                        
                        <el-select v-model="detailForm.e_eg" filterable placeholder="请选择民族" class="add-nation-input" @change="nationChange" disabled="true">
                            <el-option v-for="item in nationList" :key="item.value" :label="item.info" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="政治面貌" prop="e_pl">
                        <el-select v-model="detailForm.e_pl" placeholder="请输入政治面貌" disabled="true">
                            <el-option label="中共党员" value="中共党员"></el-option>
                            <el-option label="中共预备党员" value="中共预备党员"></el-option>
                            <el-option label="共青团员" value="共青团员"></el-option>
                            <el-option label="群众" value="群众"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="籍贯" prop="d_add">
                        <china_address v-model="detailForm.d_add" ref="address"></china_address>
                    </el-form-item>
                    <el-form-item label="移动电话" prop="e_ep">
                        <el-input v-model="detailForm.e_ep"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="e_mail">
                        <el-input v-model="ruleForm.e_mail"></el-input>
                    </el-form-item>
                    <el-form-item label="职位" prop="e_post" >
                        <el-select v-model="detailForm.e_post" placeholder="请输入性别">
                            <el-option label="收银员" value="1"></el-option>
                            <el-option label="管理员" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="薪资" prop="e_salary" >
                        <el-input v-model.number="detailForm.e_salary" ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="detailVisible = false">关闭</el-button>
                    <el-button type="primary" @click="Update()">修改</el-button>
                </span>
            </el-dialog>
    </div>
</template>

<script>
import { retry } from 'ali-oss/lib/common/utils/retry';
import axios from 'axios';
import TakePhotos from './TakePhotos.vue';
import china_address from './china_address.vue';
import Element from 'element-ui';
export default {
    components:{
        TakePhotos,
        china_address,
    },
    data(){
        var checkPho = (rule, value, callback)=>{
            if (value === '') {
                callback(new Error('请输入联系电话'));
            } else {
                let isPho=true;
                for(let i in value){
                    console.log(Number(value[i]));
                    if(value.length!==11){
                        isPho=false;
                        break;
                    }
                    if(Number(value[i])>=0&&(Number(value[i])<9)){
                        isPho=true;
                    }
                    else{
                        isPho=false;
                        break;
                    }
                }
                if (isPho!==false) {
                    callback();
                }
                else{
                    callback(new Error("你输入的不是电话号码"));
                }
            
            }
        };
        var checkSalary = (rule, value, callback)=>{
            if(value===0){
                callback(new Error('员工工资不能为0'));
            }else{
                callback();
            }
        }
        return{
            checkedDetail:[],
            tableData:[{e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000}],
            sizes:10,
            currentPage: 1,
            currentIndex: '',
            pagesize: 7,
            dialogVisible:false,
            PicVisible:false,
            ruleForm:{
                e_no:'',
                e_name:'',
                e_sex:'',
                e_post:'',
                e_salary:0,
                e_pic:'',
                e_eg:'',
                e_pl:'',
                d_add:'',
                e_ep:'',
                e_mail:'',

            },
            rules:{
                e_ep:[
                    {validator: checkPho, trigger: 'blur'},
                    { required: true, message: '', trigger: 'blur' },
                ],
                e_mail:[
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                e_salary:[
                    {validator: checkSalary, trigger: 'blur'}
                ],
                e_no:[
                { required: true, message: '请输入员工编码', trigger: 'blur' },
                ],
                e_name:[
                { required: true, message: '请输入员工姓名', trigger: 'blur' },
                ],
                e_sex:[
                { required: true, message: '请输入性别', trigger: 'blur' },
                ],
                e_post:[
                { required: true, message: '请输入员工职位', trigger: 'blur' },
                ],
            },
            filename: null,
            f64: null,
            loadImage: "",
            imgSrc:require('../../assets/img/V.png'),
            SearchForm:{
                e_name:'',
                e_post:'',
            },
            detailVisible:false,
            detailForm:{
                e_no:'',
                e_name:'',
                e_sex:'',
                e_post:'',
                e_salary:0,
                e_pic:'',
                e_eg:'',
                e_pl:'',
                d_add:'',
                e_ep:'',
                e_mail:'',

            },
            printObj:{
                id:"myTable",
                popTitle:"员工列表"
            },
            nationList:[
                {
                id: 1,
                info: "汉族",
                value: 1,
                },
                {
                id: 2,
                info: "壮族",
                value: 2,
                },
                {
                id: 3,
                info: "满族",
                value: 3,
                },
                {
                id: 4,
                info: "回族",
                value: 4,
                },
                {
                id: 5,
                info: "苗族",
                value: 5,
                },
                {
                id: 6,
                info: "维吾尔族",
                value: 6,
                },
                {
                id: 7,
                info: "土家族",
                value: 7,
                },
                {
                id: 8,
                info: "彝族",
                value: 8,
                },
                {
                id: 9,
                info: "蒙古族",
                value: 9,
                },
                {
                id: 10,
                info: "藏族",
                value: 10,
                },
                {
                id: 11,
                info: "布依族",
                value: 11,
                },
                {
                id: 12,
                info: "侗族",
                value: 12,
                },
                {
                id: 13,
                info: "瑶族",
                value: 13,
                },
                {
                id: 14,
                info: "朝鲜族",
                value: 14,
                },
                {
                id: 15,
                info: "白族",
                value: 15,
                },
                {
                id: 16,
                info: "哈尼族",
                value: 16,
                },
                {
                id: 17,
                info: "哈萨克族",
                value: 17,
                },
                {
                id: 18,
                info: "黎族",
                value: 18,
                },
                {
                id: 19,
                info: "傣族",
                value: 19,
                },
                {
                id: 20,
                info: "畲族",
                value: 20,
                },
                {
                id: 21,
                info: "傈僳族",
                value: 21,
                },
                {
                id: 22,
                info: "仡佬族",
                value: 22,
                },
                {
                id: 23,
                info: "东乡族",
                value: 23,
                },
                {
                id: 24,
                info: "高山族",
                value: 24,
                },
                {
                id: 25,
                info: "拉祜族",
                value: 25,
                },
                {
                id: 26,
                info: "水族",
                value: 26,
                },
                {
                id: 27,
                info: "佤族",
                value: 27,
                },
                {
                id: 28,
                info: "纳西族",
                value: 28,
                },
                {
                id: 29,
                info: "羌族",
                value: 29,
                },
                {
                id: 30,
                info: "土族",
                value: 30,
                },
                {
                id: 31,
                info: "仫佬族",
                value: 31,
                },
                {
                id: 32,
                info: "锡伯族",
                value: 32,
                },
                {
                id: 33,
                info: "柯尔克孜族",
                value: 33,
                },
                {
                id: 34,
                info: "达斡尔族",
                value: 34,
                },
                {
                id: 35,
                info: "景颇族",
                value: 35,
                },
                {
                id: 36,
                info: "毛南族",
                value: 36,
                },
                {
                id: 37,
                info: "撒拉族",
                value: 37,
                },
                {
                id: 38,
                info: "布朗族",
                value: 38,
                },
                {
                id: 39,
                info: "塔吉克族",
                value: 39,
                },
                {
                id: 40,
                info: "阿昌族",
                value: 40,
                },
                {
                id: 41,
                info: "普米族",
                value: 41,
                },
                {
                id: 42,
                info: "鄂温克族",
                value: 42,
                },
                {
                id: 43,
                info: "怒族",
                value: 43,
                },
                {
                id: 44,
                info: "京族",
                value: 44,
                },
                {
                id: 45,
                info: "基诺族",
                value: 45,
                },
                {
                id: 46,
                info: "德昂族",
                value: 46,
                },
                {
                id: 47,
                info: "保安族",
                value: 47,
                },
                {
                id: 48,
                info: "俄罗斯族",
                value: 48,
                },
                {
                id: 49,
                info: "裕固族",
                value: 49,
                },
                {
                id: 50,
                info: "乌孜别克族",
                value: 50,
                },
                {
                id: 51,
                info: "门巴族",
                value: 51,
                },
                {
                id: 52,
                info: "鄂伦春族",
                value: 52,
                },
                {
                id: 53,
                info: "独龙族",
                value: 53,
                },
                {
                id: 54,
                info: "塔塔尔族",
                value: 54,
                },
                {
                id: 55,
                info: "赫哲族",
                value: 55,
                },
                {
                id: 56,
                info: "珞巴族",
                value: 56,
                },
            ],
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
                    if(element!=undefined)
                    for(let i=0;i<this.tableData.length;i++){
                        console.log(element);
                        if(this.tableData[i].vno===element.vno){
                            this.tableData.splice(i,1);
                            break;
                        }
                    }
                }); 
                this.checkedDetail=[];
            }

        },
        handleSizeChange(val) {
        this.pagesize = val;
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage= val
      },
      handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
            this.PicVisible = false;
            this.$nextTick(()=>{this.imgSrc=this.$refs.takephoto.imgSrc;})
        },
        submit(){
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    this.ruleForm.e_eg=this.nationList[this.ruleForm.e_eg].info;
                    this.$nextTick(()=>{
                        this.ruleForm.d_add=this.$refs.address.selectProvince+this.$refs.address.selectCity+this.$refs.address.selectArea;
                    });
                    axios.put("/emp/empControl",this.ruleForm).then(res=>{
                        let result = res.data.code;
                        let data = res.data.data;
                        let message=res.data.msg;
                        if(result){
                            console.log();
                            Element.Message.success(message);
                        }else{
                            alert('error');
                            Element.Message.error(message);
                        }
                    });
                    this.dialogVisible=false;
                    axios.get('/emp/empControl').then(res=>{
                        let result = res.data.code;
                        let data = res.data.data;
                        let message=res.data.msg;
                        if(result){
                            console.log();
                            this.tableData=data;
                        }else{
                            alert('error');
                        }
                    });
                    console.log(this.ruleForm);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        Search(){
            axios.get('/emp/empControl',this.SearchForm).then(res=>{
                let result = res.data.code;
                let data = res.data.data;
                let message=res.data.msg;
                if(result){
                    console.log();
                    this.tableData=data;
                    Element.Message.success(message);
                    this.resetForm('SearchForm');
                }else{
                    alert('error');
                }
            });
        },
        Detail(index){
            this.detailVisible=true;
            let e_no=this.tableData[(this.currentPage-1)*this.pagesize+index].e_no;
            axios.get('/emp/empControl/e_no',{params:{e_no:e_no}}).then(res=>{
                let result = res.data.code;
                let data = res.data.data;
                let message=res.data.msg;
                if(result){
                    console.log(data);
                    this.detailForm=data;
                }else{
                    Element.Message.error(message);
                }
            })

        },
        Update(){
            this.detailVisible=false;
            axios.post('/emp/empControl/update',this.detailForm).then(res=>{
                let result = res.data.code;
                let data = res.data.data;
                let message=res.data.msg;
                if(result){
                    Element.Message.success(message);
                }else{
                    Element.Message.error(message);
                }
            });
            axios.get('/emp/empControl').then(res=>{
                let result = res.data.code;
                let data = res.data.data;
                let message=res.data.msg;
                if(result){
                    console.log();
                    this.tableData=data;
                }else{
                    alert('error');
                }
            });
        }
    },
    mounted(){
        axios.get('/emp/empControl').then(res=>{
            let result = res.data.code;
            let data = res.data.data;
            let message=res.data.msg;
            if(result){
                console.log();
                this.tableData=data;
                console.log("res:",typeof(data));
            }else{
                alert('error');
            }
        });
    }
}
</script>