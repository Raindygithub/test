<template>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%"
            stripe
            class="customer-table">
            <el-table-column
                type="index"
                :index="indexMethod">
            </el-table-column>
            <el-table-column prop="condetial" label="课程编号" width="180"></el-table-column>
            <el-table-column prop="cname" label="课程名" width="180"></el-table-column>
            <el-table-column prop="csemester" label="开课学期" width="180"></el-table-column>
            <el-table-column prop="collage" label="开设学院" width="180"></el-table-column>
            <el-table-column prop="cnature" label="课程性质" width="180"></el-table-column>
            <el-table-column prop="ctype" label="课程类型" width="180"></el-table-column>
            <el-table-column prop="ccredits" label="学分" width="180"></el-table-column>
            <el-table-column prop="ctime" label="学时" width="180"></el-table-column>
            <el-table-column prop="ctest" label="考核方式" width="180"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            tableData:[{condetial:'215124',cname:'mess',csemester:'2022-2023-1',collage:'开设学院',cnature:'必修',ctype:'人文教育类',ccredits:4,ctime:70,ctest:'线下考试'}],
            sno:'202100900670'
        }
    },
    methods:{
        indexMethod(index) {
            return index +1;
        },
    },
    mounted(){
        axios.get('/stu/lessonPlans/sno',{params:{
            sno:this.sno,
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
    }
}
</script>