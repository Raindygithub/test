<template>
    <div class="wrap">
        
        <split-pane @resize="resize" :min-percent='20' :default-percent='50' split="horizontal">
      <template slot="paneL">
        
        <div class="paneL">
            <p style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin: 0 auto; width: 100px;height: 5px;">选课列表</p>
            <br/>
            <br/>
            <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%" border 
            @selection-change="handleSelectionChange" id="myTable">
            <el-table-column
                type="index"
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                :index="indexMethod">
            </el-table-column>
           
                <el-table-column prop="condetial" label="课程编号" width="180"></el-table-column>
                <el-table-column prop="cno" label="课程号" width="180"></el-table-column>
                <el-table-column prop="tname" label="授课教师" width="180"></el-table-column>
                <el-table-column prop="classRoom" label="上课地点" width="180"></el-table-column>
                <el-table-column prop="cdate" label="上课时间" width="180"></el-table-column>
                <el-table-column prop="classNumber" label="最大课容量" width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    
                    <el-button @click="classAlter(scope.$index)" type="success">选课</el-button>
                </template>
            </el-table-column>
        
            </el-table>
            
            
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
      <template slot="paneR">
        <!-- 编辑自己的代码 -->
        <div class="paneR">
            <p style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin: 0 auto; width: 100px;height: 5px;">已选课程</p>
            <br/>
            <br/>
            <el-table
            ref="multipleTable"
            :data="haveData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            tooltip-effect="dark"
            style="width: 100%" border 
            @selection-change="handleSelectionChange" id="myTable">
            <el-table-column
                type="index"
                :index="indexMethod">
            </el-table-column>
           
                <el-table-column prop="condetial" label="课程编号" width="180"></el-table-column>
                <el-table-column prop="cno" label="课程号" width="180"></el-table-column>
                <el-table-column prop="tname" label="授课教师" width="180"></el-table-column>
                <el-table-column prop="classRoom" label="上课地点" width="180"></el-table-column>
                <el-table-column prop="cdate" label="上课时间" width="180"></el-table-column>
                <el-table-column prop="classNumber" label="最大课容量" width="180"></el-table-column>
                <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button @click="classDelete(scope.$index)" type="success">退选</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
      </template>
    </split-pane>
            
        <!--  <el-table
            ref="multipleTable"
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            tooltip-effect="dark"
            style="width: 100%" border 
            @selection-change="handleSelectionChange" id="myTable">
            <el-table-column
                type="index"
                :index="indexMethod">
            </el-table-column>
           
                <el-table-column prop="condetial" label="课程编号" width="180"></el-table-column>
                <el-table-column prop="cno" label="课程号" width="180"></el-table-column>
                <el-table-column prop="tname" label="授课教师" width="180"></el-table-column>
                <el-table-column prop="classRoom" label="上课地点" width="180"></el-table-column>
                <el-table-column prop="cdate" label="上课时间" width="180"></el-table-column>
                <el-table-column prop="classNumber" label="最大课容量" width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="Detail(scope.$index)"></el-button>
                    <el-button @click="classAlter(scope.$index)" type="success">选课</el-button>
                </template>
            </el-table-column>
        
            </el-table>
            
            
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
            </div> --> 

            <el-drawer
                title="我是标题"
                :visible.sync="drawer"
                :direction="'btt'"
                :before-close="handleClose">
                <span>我来啦!</span>
            </el-drawer>
    </div>
</template>

<script>
import axios from 'axios';
import Element from 'element-ui';

export default {
    
    data(){
        return{
            s_no:'',
            checkedDetail:[],
            tableData:[{condetial:'12125123',cno:'1351',tname:'赵斌',classRoom:'商学院250',cdate:'1-16周第二大节',classNumber:40}],
            sizes:10,
            currentPage: 1,
            currentIndex: '',
            pagesize: 7,
            drawer:false,
            paneSize:20,
            haveData:[],
        }
    },
    methods:{
        indexMethod(index) {
            return index +1;
        },
        handleSizeChange(val) {
        this.pagesize = val;
        console.log(`每页 ${val} 条`);
        axios.get('/stu/alterclass',{params:{
            s_no:this.s_no,
            /* currentPage:this.currentPage,
            pagesize:this.pagesize, */
        }}).then(res=>{
            let result = res.data.code;
            let message = res.data.msg;
            let data=res.data.data;
            if(result){
                console.log(message);
                this.tableData=data;
            }else{
                alert(message);
            }
        });
      },
      handleCurrentChange(val) {
        this.currentPage= val;
        axios.get('/stu/alterclass',{params:{
            s_no:this.s_no,
            /* currentPage:this.currentPage,
            pagesize:this.pagesize, */
        }}).then(res=>{
            let result = res.data.code;
            let message = res.data.msg;
            let data=res.data.data;
            if(result){
                console.log(message);
                this.tableData=data;
            }else{
                alert(message);
            }
        })
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
        classAlter(index){
            let condetial=this.tableData[index].condetial;
            
            for(let i=0;i<this.haveData.length;i++){
                if(this.haveData[i].condetial===condetial){
                    alert('你已选择该课程');
                    return;
                }
            }
            
            axios.get(`/stu/alterclass/${condetial}`).then(res=>{
                let result = res.data.code;
                let message = res.data.msg;
                if(result){
                    Element.Message.success(message);
                    this.haveData.push(this.tableData[index]);
                }else{
                    alert(message);
                }
            })
        },
        resize(){},
        classDelete(index){
            axios.post('/stu/alterclass/condetial',{params:{condetial:this.haveData[index].condetial}}).then(res=>{
                let result = res.data.code;
                let message = res.data.msg;
                if(result){
                    Element.Message.success(message);
                    this.haveData.splice(index, 1);
                }else{
                    Element.Message.error(message);
                }
            })
        }
        
    },
    mounted(){
        axios.get('/stu/alterclass',{params:{
            s_no:this.s_no,
            /* currentPage:this.currentPage,
            pagesize:this.pagesize, */
        }}).then(res=>{
            let result = res.data.code;
            let message = res.data.msg;
            let data=res.data.data;
            if(result){
                console.log(message);
                this.tableData=data;
            }else{
                alert(message);
            }
        })
    },
    created(){
        
    },
    beforeMount(){
       
    }
}
</script>

<style lang="stylus" scoped>
.wrap{
  height:1000px;
  .paneL{
    
    height:100%;
    width:100%;
    border-bottom:3px solid #000;
    border-left:1px solid #909399;
    border-right:1px solid #909399;
    border-top:1px solid #909399;
  }
  .paneR{
    
    height:100%;
    width:100%;
    border-top:3px solid #000;
    border-left:1px solid #909399;
    border-right:1px solid #909399;
    border-bottom :1px solid #909399;
  }
}
</style>