<template>
    <div>
        <page-tools :show-before="true">
            <span slot="before">共{{ this.tableData.length }}条记录</span>
            <template slot="after">
            <el-button type="danger" @click="Deletes()" icon="el-icon-delete">批量删除</el-button>
            </template>
        </page-tools>
        <!-- 表格 -->
        <el-form :inline="true" :model="SearchForm" class="demo-form-inline">
            <el-form-item prop="j_no">
                <el-input v-model="SearchForm.j_no" placeholder="进货编号"></el-input>
            </el-form-item>
            <el-form-item prop="purchaseDate">
                <el-date-picker
                    v-model="SearchForm.purchaseDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
                <el-table
                    ref="multipleTable"
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    tooltip-effect="dark"
                    style="width: 100%" border 
                    stripe
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        type="index"
                        :index="indexMethod">
                    </el-table-column>
                    <el-table-column prop="j_no" label="进货编号" width="180"></el-table-column>
                    <el-table-column prop="p_no" label="商品编码" width="180"></el-table-column>
                    <el-table-column prop="j_name" label="商品名称" width="180"></el-table-column>
                    <el-table-column label="图片" width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.g_image" width="100px" height="70px"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="j_price" label="进价" width="180">
                        <template slot-scope="scope">
                            {{ "￥ " }}{{scope.row.j_price}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="j_num" label="数量" width="180"></el-table-column>
                    <el-table-column prop="p_pno" label="批次" width="180"></el-table-column>
                    <el-table-column prop="j_time" label="时间" width="180"></el-table-column>
                    <el-table-column prop="s_sum" label="商品总价" width="180">
                        <template slot-scope="scope">
                            {{ "￥ " }}{{scope.row.s_sum}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="s_pay" label="支付金额" width="180">
                        <template slot-scope="scope">
                            {{ "￥ " }}{{scope.row.s_pay}}
                        </template>
                    </el-table-column>
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
        
        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            dialogVisible:false,
            PicVisible:false,
            checkedDetail:[],
            tableData:[{j_no:'hs',p_no:'sss',j_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',j_price:30,j_num:3,s_sum:9,s_pay:89},],
            sizes:10,
            currentPage: 1,
            currentIndex: '',
            pagesize: 7,
            filename: null,
            f64: null,
            loadImage: "",
            imgSrc:require('../../assets/img/V.png'),
            SearchForm:{
                j_no:'',
                purchaseDate:[],
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
        onSubmit(){
            
                axios.get('emp/sales/purchaseRecords',{params:this.SearchForm}).then(res=>{
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
        handleClick(){
            this.tableData=[];
        }
    },
    mounted:{

    }
}
</script>