<template>
          
            <div>
            <el-form  :inline="true" :model="SearchForm" ref="SearchForm" class="SearchForm" :rule="rules">
                <el-form-item label="商品编号" prop="id">
                    <el-input v-model="SearchForm.id" placeholder="商品编号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onsubmit()">添加</el-button>
                    <el-button type="primary" @click="Deletes()">批量删除</el-button> 
                    <el-button type="primary" @click="dialogVisible = true">新增</el-button> 
                    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
                        结算
                    </el-button>
                </el-form-item>
                
            </el-form> 
            <br/>
            <el-descriptions title="账单" direction="vertical" :column="4" border>
            <el-descriptions-item label="总金额">{{this.sum}}{{" 元"}}</el-descriptions-item>
            </el-descriptions>
            <br/>
            <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            :summary-method="getSummaries"
            style="width: 100%" border show-summary="true"
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
                    <img :src="scope.row.src" width="100px" height="70px"/>
                </template>
            </el-table-column>
            <el-table-column prop="init_price" label="商品标价" width="180"></el-table-column>
            <el-table-column label="商品数量" width="180">
                <template slot-scope="scope"><el-input-number v-model="scope.row.num" @change="handleChange" :min="1" :max="10" /></template>
            </el-table-column>
            <el-table-column prop="sum_price" label="商品总价" width="180">
                <template slot-scope="scope">
                    {{ scope.row.init_price*scope.row.num }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button @click="handleDelete(scope.$index)" type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
            
            
            </el-table>
            <el-drawer
                title="结算"
                :visible.sync="drawer"
                :direction="direction"
                size="50%">
                <div>
                    <el-descriptions title="账单" direction="vertical" :column="4" border>
                        <el-descriptions-item label="收银员">{{ this.userId }}</el-descriptions-item>
                        <el-descriptions-item label="总金额">{{this.sum}}</el-descriptions-item>
                        
                    </el-descriptions>
                    
                </div>
            </el-drawer>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="50%" height="60%"
                :before-close="handleClose">
                <span style="width: 500px; height: 500px;">
                    <template >
                    <ScanCodePage ref="Scanner"></ScanCodePage>
                    </template>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="codeAdd()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
          
</template>


<script>
import Element from 'element-ui';
import router from "@/router";
import axios from 'axios';
import ScanCodePage from './ScanCodePage.vue';




export default {
  components: { ScanCodePage },
    data(){
        return{
            
            sum:0,
            checkedDetail:[],
            tableData:[{id:'10021',src:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',init_price:20,num:2,sum_price:this.num*this.init_price}],
            SearchForm:{
                id:"",
                
            },
            direction:"btt",
            drawer:false,
            userId:'',
            rules:{
                sum:[]
            },
            dialogVisible: false,
            productId:'',

        }
    },
    methods:{
        handleChange() {
            this.sums();
        },
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
                        if(this.tableData[i].id===element.id){
                            this.tableData.splice(i,1);
                            break;
                        }
                    }
                }); 
                this.checkedDetail=[];
            }
            this.sums();

        },
        onsubmit(){
            if(this.SearchForm.id===''){
                alert("请输入商品标识！");
                return;
            }
            console.log(this.SearchForm);
            axios.post('/emp/shouyin',{
                params:{
                    id:this.SearchForm.id
                }
            }).then(res=>{
                let result = res.data.code;
                let message = res.data.msg;
                let data=res.data.data;
                if(result){
                    console.log(message);
                    console.log(data);
                    this.tableData.push(data);
                    this.sums();
                }
                else{
                    alert(message);
                }
            });
            
            
        },

        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '总价';
                return;
            }
            const values = data.map(item => Number(item[column.property]));
            console.log(values);
            if (!values.every(value => isNaN(value))) {
                if(index===6){
                sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                return prev +curr;
                }, 0);
                sums[index] += ' 元';}
                else{
                    sums[index]='';
                }
            } else {
                sums[index] = '';
            }
            });

            return sums;
        },
        sums(){
            let sum=0;
            for(let i=0;i<this.tableData.length;i++){
                sum+=this.tableData[i].init_price*this.tableData[i].num;
                console.log(this.tableData[i]);
            }
            this.sum=sum;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        scanCode() {
            console.log('浏览器信息', navigator.userAgent);
            this.$router.push({
                path: '/ScanCodePage'
            });
        },
        codeAdd(){
            this.dialogVisible = false;
            this.$nextTick(()=>{
                
                this.productId=this.$refs.Scanner.tipMsg
                console.log("内容是："+this.productId);
                axios.post('/emp/shouyin',{
                    params:{
                        id:this.productId,
                    }
                }).then(res=>{
                    let result = res.data.code;
                    let message = res.data.msg;
                    let data=res.data.data;
                    if(result){
                        console.log(message);
                        console.log(data);
                        this.tableData.push(data);
                        this.sums();
                    }
                    else{
                        alert(message);
                    }
                });
            });
            
            /* let meg=this.$refs["Scanner"].tipMsg;
            console.log(meg);
            axios.post('/emp/shouyin',{
                params:{
                    id:meg,
                }
            }).then(res=>{
                let result = res.data.code;
                let message = res.data.msg;
                let data=res.data.data;
                if(result){
                    console.log(message);
                    console.log(data);
                    this.tableData.push(data);
                    this.sums();
                }
                else{
                    alert(message);
                }
            });   */
        }
    },
    mounted(){
        this.sums();
        this.userId=localStorage.getItem("userId");
    },
    
    
}
</script>