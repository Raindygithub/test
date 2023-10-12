<template>
    <div>
        <el-form :inline="true" :model="SearchForm" class="demo-form-inline" ref="SearchForm">
            <el-form-item label="供货商编号">
                <el-input v-model="SearchForm.g_no" placeholder="供货商编号"></el-input>
            </el-form-item>
            <el-form-item label="供货商名称">
                <el-input v-model="SearchForm.g_name" placeholder="供货商名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onsubmit()">查询</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="dialogVisible=true;resetForm('ruleForm');" icon="el-icon-circle-plus">新增</el-button>
        <el-button type="primary" @click="Deletes()" icon="el-icon-delete">批量删除</el-button>
        <br/>
        <br/>
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
            <el-table-column prop="g_no" label="供货商编号" width="180"></el-table-column>
            <el-table-column prop="g_name" label="供货商名称" width="180"></el-table-column>
            <el-table-column prop="g_add" label="地址" width="180"></el-table-column>
            <el-table-column prop="g_link" label="联系人" width="180"></el-table-column>
            <el-table-column prop="g_pho" label="联系电话" width="180"></el-table-column>
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

            <!-- 新增供货商 -->
            <el-dialog
                title="添加信息"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"  >
                <el-form ref="ruleForm" :model="ruleForm" label-width="80px" label-position="left" :rules="rules">
                    <el-form-item label="供货商编码" prop="g_no">
                        <el-input v-model="ruleForm.g_no" ></el-input>
                    </el-form-item>
                    <el-form-item label="供货商名称" prop="g_name">
                        <el-input v-model="ruleForm.g_name" ></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="g_add">
                        <el-input v-model="ruleForm.g_add" ></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="g_link">
                        <el-input v-model="ruleForm.g_link" ></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="g_pho">
                        <el-input v-model="ruleForm.g_pho" ></el-input>
                    </el-form-item>
                    <el-form-item>
                            <el-button @click="dialogVisible = false;resetForm('ruleForm');">取 消</el-button>
                            <el-button type="primary" @click="New()">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <el-dialog
                title="详细信息"
                :visible.sync="detailVisible"
                width="30%"
                :before-close="handleClose"  >
                 <el-descriptions title="" direction="vertical" :column="1" border>
                    <el-descriptions-item label="供货商编码" v-model="detail.g_no" ><p class="message">{{detail.g_no}}</p></el-descriptions-item>
                    <el-descriptions-item label="供货商名称" v-model="detail.g_name" ><p class="message">{{detail.g_name}}</p></el-descriptions-item>
                    <el-descriptions-item label="地址" v-model="detail.g_add" ><p class="message">{{detail.g_add}}</p></el-descriptions-item>
                    <el-descriptions-item label="联系人" v-model="detail.g_link" ><p class="message">{{detail.g_link}}</p></el-descriptions-item>
                    <el-descriptions-item label="联系电话" v-model="detail.g_pho" ><p class="message">{{detail.g_pho}}</p></el-descriptions-item>
                    <el-descriptions-item label="联系电话" v-model="detail.g_pho" ><p class="message">{{detail.g_pho}}</p></el-descriptions-item>
                    <el-descriptions-item label="联系电话" v-model="detail.g_pho" ><p class="message">{{detail.g_pho}}</p></el-descriptions-item>
                    <el-descriptions-item label="联系电话" v-model="detail.g_pho" ><p class="message">{{detail.g_pho}}</p></el-descriptions-item>
                </el-descriptions> 
                <span slot="footer" class="dialog-footer">
                    <el-button @click="detailVisible = false">取 消</el-button>
                    <el-button type="primary" @click="detailVisible = false">确 定</el-button>
                </span>
            </el-dialog> 
    </div>
</template>

<script>
import axios from 'axios';
import Element from 'element-ui';
export default {
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
        }
        return{
            checkedDetail:[],
            tableData:[{g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'}],
            sizes:10,
            currentPage: 1,
            currentIndex: '',
            pagesize: 7,
            dialogVisible:false,
            ruleForm:{
                g_no:'',
                g_name:'',
                g_add:'',
                g_link:'',
                g_pho:'',

            },
            rules:{
                g_pho:[
                    {validator: checkPho, trigger: 'blur'},
                ],
            },
             detailVisible:false,
             index:-1,
            detail:{
                g_no:'',
                g_name:'',
                g_add:'',
                g_link:'',
                g_pho:'',

            }, 
            SearchForm:{
                g_no:'',
                g_name:'',
            }
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
      New(){
        this.dialogVisible=false;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            axios.post('/emp/Suppliers',this.ruleForm).then(res=>{
                let result=res.data.code;
                let message=res.data.msg;
                let data=res.data.data;
                if(result){
                    Element.Message.success(message);
                    this.tableData.push(this.ruleForm);
                }else{
                    Element.Message.error(message);
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
        Detail(index){
            this.detailVisible=true;
            this.index=index;
            this.detail=this.tableData[(this.currentPage-1)*this.pagesize+index];
        },
        onsubmit(){
            axios.post('/emp/suppliers/search',this.SearchForm).then(res=>{
                let result = res.data.code;
                let data = res.data.data;
                let message=res.data.msg;
                if(result){
                    console.log(data);
                    this.tableData=data;
                }else{
                    alert('error');
                }                    
            });
        }
    },
    mounted(){
        axios.get('/emp/suppliers').then(res=>{
            let result = res.data.code;
            let data = res.data.data;
            let message=res.data.msg;
            if(result){
                console.log();
                this.tableData=data;
            }else{
                alert('error');
            }
        })
    },
}
</script>