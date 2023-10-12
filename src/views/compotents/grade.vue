<template>
    <div >
        <h3 style="text-align: center;">{{this.title}}</h3>
        <el-table
            :data="tableData"
            style="width: 100%"
            class="customer-table">
            <el-table-column prop="cname" label="课程名" width="100"></el-table-column>
            <el-table-column prop="ctype" label="属性" width="100"></el-table-column>
            <el-table-column prop="ccredits" label="学分" width="100"></el-table-column>
            <el-table-column prop="ctime" label="学时" width="100"></el-table-column>
            <el-table-column prop="Grade" label="成绩" width="100"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
           tableData:[],
           title:''
        }
    },
    methods:{

    },
    mounted(){

    }
}
</script>

<style>

.customer-table th{
    border:none;
  }
.customer-table td,.customer-table th.is-leaf {
  border:none;
}

.el-table--border, .el-table--group{
  border: none;
}


.el-table--border::after, .el-table--group::after{
  width: 0;
}
.customer-table::before{
  width: 0;
}
.customer-table .el-table__fixed-right::before,.el-table__fixed::before{
  width: 0;
}

.el-table--border th.gutter:last-of-type {
    border: 1px solid #EBEEF5;  
    border-left: none;
}

</style>