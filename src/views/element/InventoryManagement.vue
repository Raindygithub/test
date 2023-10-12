<template>
    <div>
        <page-tools :show-before="true">
            <span slot="before">共{{ this.tableData.length }}条记录</span>
            <template slot="after">
            <el-button size="small" type="warning">导入</el-button>
            <el-button size="small" type="danger">导出</el-button>
            <!-- <el-button size="small" type="primary" @click="dialogVisible=true">新增员工</el-button> -->
            <el-button type="danger" @click="Deletes()" icon="el-icon-delete">批量删除</el-button>
            <el-tooltip class="item" effect="dark" :content="detail?'隐藏信息':'详细信息'" placement="top">
                <el-button type="info" :icon="detail?'el-icon-d-arrow-left':'el-icon-d-arrow-right'" @click="detail=!detail"></el-button>
            </el-tooltip>
            </template>
        </page-tools>

        <br/>
        <!-- Search表单 -->
            <el-form :inline="true" :model="SearchForm" class="demo-form-inline" ref="SearchForm">
                <el-form-item prop="p_no">
                    <el-input v-model="SearchForm.p_no" placeholder="请输入商品编码"></el-input>
                </el-form-item>
                <el-form-item prop="g_name">
                    <el-input v-model="SearchForm.g_name" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item prop="g_type">
                    <el-select v-model="SearchForm.g_type" placeholder="商品类型">
                        <el-option label="日用型" value=0></el-option>
                        <el-option label="食品类" value=1></el-option>
                        <el-option label="儿童类" value=2></el-option>
                        <el-option label="服装类" value=3></el-option>
                        <el-option label="工具类" value=4></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="p_state">
                    <el-select v-model="SearchForm.p_state" placeholder="商品类型">
                        <el-option label="正常销售" value=0></el-option>
                        <el-option label="促销" value=1></el-option>
                        <el-option label="限售" value=2></el-option>
                        <el-option label="停售" value=3></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="overDate">
                    <el-radio-group v-model="SearchForm.overDate">
                    <el-radio label="过期"></el-radio>
                    <el-radio label="未过期"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="Search()" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
        <br/>
        <!-- 表格 -->
        <el-table
            ref="multipleTable"
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
            <el-table-column prop="p_no" label="商品编码" width="180"></el-table-column>
            <el-table-column prop="g_name" label="商品名称" width="180"></el-table-column>
            <el-table-column label="图片" width="180">
                <template slot-scope="scope">
                    <img :src="scope.row.g_image" width="100px" height="70px"/>
                </template>
            </el-table-column>
            <el-table-column prop="g_type" label="类型" width="180">
                <template slot-scope="scope">
                    <p v-if="scope.row.g_type===0">日用型</p>
                    <p v-else-if="scope.row.g_type===1">食品类</p>
                    <p v-else-if="scope.row.g_type===2">儿童类</p>
                    <p v-else-if="scope.row.g_type===3">服装类</p>
                    <p v-else-if="scope.row.g_type===4">工具类</p>
                </template>
            </el-table-column>
            <el-table-column prop="g_price" label="售价" width="180">
                <template slot-scope="scope">
                  {{ "￥" }}  {{ scope.row.g_price }}
                </template>
            </el-table-column>
            <el-table-column prop="g_num" label="库存" width="180"></el-table-column>
            <el-table-column prop="p_state" label="销售状态" width="180">
                <template slot-scope="scope">
                    <p v-if="scope.row.p_state===0">正常销售</p>
                    <p v-else-if="scope.row.p_state===1">促销</p>
                    <p v-else-if="scope.row.p_state===2">限售</p>
                    <p v-else-if="scope.row.p_state===3">停售</p>
                </template>
            </el-table-column>
            <el-table-column prop="g_t" label="生产日期" width="180" v-if="detail"></el-table-column>
            <el-table-column prop="g_b" label="保质期" width="180" v-if="detail"></el-table-column>
            <el-table-column prop="g_no" label="供货商" width="180" v-if="detail"></el-table-column>
            <el-table-column prop="c_no" label="生产商" width="180" v-if="detail"></el-table-column>
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

            <!-- 修改 -->
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <el-form ref="UpdateForm" :model="UpdateForm" label-width="80px">
                    <el-form-item label="商品编码">
                        <el-input v-model="UpdateForm.p_no"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称">
                        <el-input v-model="UpdateForm.g_name"></el-input>
                    </el-form-item>
                    <el-form-item label="图片" ref="uploadElement" prop="g_image">
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
                    <el-form-item prop="g_type" label="商品类型">
                        <el-select v-model="UpdateForm.g_type" placeholder="商品类型">
                            <el-option label="日用型" :value=0></el-option>
                            <el-option label="食品类" :value=1></el-option>
                            <el-option label="儿童类" :value=2></el-option>
                            <el-option label="服装类" :value=3></el-option>
                            <el-option label="工具类" :value=4></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="售价 ￥" prop="g_price">
                        <el-input-number v-model="UpdateForm.g_price" :min="0" :precision="2" :step="0.1"></el-input-number>
                    </el-form-item>
                    <el-form-item label="库存" prop="g_num">
                        <el-input-number v-model="UpdateForm.g_num" :min="0" ></el-input-number>
                    </el-form-item>
                    <el-form-item prop="p_state" label="销售状态">
                        <el-select v-model="UpdateForm.p_state" placeholder="商品类型">
                            <el-option label="正常销售" :value=0></el-option>
                            <el-option label="促销" :value=1></el-option>
                            <el-option label="限售" :value=2></el-option>
                            <el-option label="停售" :value=3></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false;this.resetForm('UpdateForm')">取 消</el-button>
                    <el-button type="primary" @click="open()">确 定</el-button>
                </span>
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

    </div>
</template>

<script>
import axios from 'axios';
import Element from 'element-ui';
import TakePhotos from './TakePhotos.vue';
export default {
    components:{
        TakePhotos,
    },
    data(){
        return{
            dialogVisible:false,
            PicVisible:false,
            checkedDetail:[],
            tableData:[{p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'}],
            sizes:10,
            currentPage: 1,
            currentIndex: '',
            pagesize: 7,
            SearchForm:{
                p_no:'',
                g_name:'',
                g_type:null,
                overDate:null,
                p_state:null,
            },
            detail:false,
            UpdateForm:{
                p_no:'',
                g_name:'',
                g_type:null,
                g_price:0,
                g_num:0,
                p_state:null,
                g_image:''
            },
            filename: null,
            f64: null,
            loadImage: "",
            imgSrc:require('../../assets/img/V.png'),
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
        Search(){
            axios.get('/emp/InventoryManagement',this.SearchForm).then(res=>{
                let result = res.data.code;
                let data = res.data.data;
                let message=res.data.msg;
                if(result){
                    this.tableData=data;
                    Element.Message.success(message);
                    this.resetForm('SearchForm');
                }else{
                    alert('error');
                }
            });
        },
        Detail(index){
            this.dialogVisible=true;
            this.UpdateForm=this.tableData[(this.currentPage-1)*this.pagesize+index];
            this.imgSrc=this.UpdateForm.g_image;
        },
        Update(){
            
                axios.post('/emp/InventoryManagement',this.UpdateForm).then(res=>{
                    
                    let result = res.data.code;
                    let data = res.data.data;
                    let message=res.data.msg;
                    if(result){
                        this.dialogVisible = false;
                        console.log("he:",this.dialogVisible);
                        Element.Message.success(message);
                        axios.get('/emp/InventoryManagement').then(res=>{
                            let result = res.data.code;
                            let data = res.data.data;
                            let message=res.data.msg;
                            if(result){
                                this.tableData=data;
                            }
                        });
                    }else{
                        alert('error');
                    }
                });

        },
        open() {
            
            this.$confirm('此操作将永久修改该商品的信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.Update();
            
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });   
                
            });
            console.log(typeof(n));
           
        }
        
    },
    mounted(){
        axios.get('/emp/InventoryManagement').then(res=>{
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
    },
}
</script>

<style>
    .item {
      margin: 4px;
    }

</style>