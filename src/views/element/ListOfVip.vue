<template>
    <div>
        <!-- 查询表单 -->
        <el-form :inline="true" :model="SearchForm" class="demo-form-inline" ref="SearchForm">
            <el-form-item label="会员号" prop="vno">
                <el-input v-model="SearchForm.vno" placeholder="会员号"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="state">
                <el-select v-model="SearchForm.state" placeholder="状态">
                <el-option label="正常" value=0></el-option>
                <el-option label="已过期" value=1></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="办理员工" prop="eno">
                <el-input v-model="SearchForm.eno" placeholder="办理员工"></el-input>
            </el-form-item>
            <el-form-item label="办理日期" prop="value">
                <div class="block">
                    <el-date-picker
                    v-model="SearchForm.value"
                    type="month"
                    placeholder="选择月">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onsubmit('SearchForm')" icon="el-icon-search">查询</el-button>
            </el-form-item>
            <el-form-item><el-button type="primary" @click="Deletes()" icon="el-icon-delete">批量删除</el-button> </el-form-item>
        </el-form>
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
            <el-table-column prop="vno" label="会员号" width="180"></el-table-column>
            <el-table-column prop="vname" label="会员名" width="180"></el-table-column>
            <el-table-column prop="vph" label="持有人电话" width="180"></el-table-column>
            <el-table-column prop="num" label="积分" width="180"></el-table-column>
            <el-table-column prop="eno" label="办理员工" width="180"></el-table-column>
            <el-table-column prop="state" label="状态" width="180" >
                <template slot-scope="scope">
                    <div v-if="scope.row.state==1" style="margin: auto 0;text-align: center;">
                        <i class="el-icon-error" style="color:red;  font-size: 20px;"></i>
                        <br/>
                        <i style="font-size: 15px;">已过期</i>
                    </div>
                    <div v-else style="margin: auto 0;text-align: center;">
                        <i class="el-icon-success" style="color:greenyellow;  font-size: 20px;"></i>
                        <br/>
                        <i style="font-size: 15px;">正常</i>
                    </div>
                    
                    
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="fixed(scope.$index)"></el-button>
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
            <!-- 修改弹窗 -->
            <el-dialog
                title="修改信息"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose" >
                <el-form ref="ruleForm" :model="ruleForm" label-width="80px" label-position="left">
                    <el-form-item label="会员号" prop="vno">
                        <el-input v-model="ruleForm.vno" disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="持有人" prop="vname">
                        <el-input v-model="ruleForm.vname"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="vph">
                        <el-input v-model="ruleForm.vph"></el-input>
                    </el-form-item>
                    <el-form-item label="积分" prop="num">
                        <el-input v-model="ruleForm.num" disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="办理日期" prop="vtime">
                        <div class="block">
                                <el-date-picker
                                v-model="ruleForm.vtime"
                                type="date"
                                placeholder="选择日期" disabled="true">
                                </el-date-picker>
                            </div>
                    </el-form-item>
                    <el-form-item label="有效期" prop="workTime">
                        <div class="block">
                           
                            <el-date-picker
                            v-model="ruleForm.workTime"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="办理员工" prop="eno">
                        <el-input v-model="ruleForm.eno" disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item>
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="submit()">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

    </div>
</template>

<script>
import axios from 'axios';
import { Result } from '@zxing/library';
import { Search } from 'vant';
import Element from 'element-ui';
export default {
    data(){
        return{
            checkedDetail:[],
            tableData:[{vno:'2190949',vname:'fool',vph:'12513152',num:10,eno:'14124321',state:1}],
            sizes:10,
            currentPage: 1,
            currentIndex: '',
            pagesize: 7,
            SearchForm: {
                vno: '',
                state: '',
                eno:'',
                value:''
            },
            sumpages:0,
            dialogVisible:false,
            ruleForm:{
                vno:'',
                vname:'',
                vph:'',
                vtime:'',
                num:0,
                workTime:'',
                eno:'',
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
      filterHandler(value, row, column) {
        const property = column['property'];
        console.log(row[property]);
        return row[property] === value;
      },
      onsubmit(formName){
        console.log(this.SearchForm);
        this.$axios.get('/emp/vipList',this.SearchForm).then(res=>{
            let result = res.data.code;
            let data = res.data.data;
            let message=res.data.msg;
            if(result){
                console.log();
                this.tableData=data;
                this.resetForm('SearchForm');
            }else{
                alert('error');
            }
        })
      },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        // 修改表单填充
        fixed(index){
            console.log(this.tableData[(this.currentPage-1)*this.pagesize+index].vno);
            this.dialogVisible=true;
            axios.get('/emp/vipList/vno',{params:{vno:this.tableData[(this.currentPage-1)*this.pagesize+index].vno}}).then(res=>{
                let result=res.data.code;
                let message=res.data.msg;
                let data=res.data.data;
                console.log("data:"+typeof(data));
                if(result){
                    this.ruleForm=data;
                    console.log(message);
                }else{
                    Element.Message.error(message);
                }
            })
        },
        submit(){
            this.resetForm('ruleForm');
            this.dialogVisible=false;
            axios.post('/emp/vipList/vno',this.ruleForm).then(res=>{
                let result = res.data.code;
                let data = res.data.data;
                let message=res.data.msg;
                if(result){
                    console.log();
                    Element.Message.success(message);
                    axios.get('/emp/vipList').then(res=>{
                        let result = res.data.code;
                        let data = res.data.data;
                        if(result){
                            console.log();
                            this.tableData=data;
                        }else{
                            alert('error');
                        }
                    })
                }else{
                    alert('error');
                    Element.Message.error(message);
                }
            })
        }
    },
    mounted() {
        axios.get('/emp/vipList').then(res=>{
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