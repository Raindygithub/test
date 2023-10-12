<template>
    <div>
        <el-select v-model="i" placeholder="请选择排序方式" @change="change(i)">
            <el-option label="价格" value="j"></el-option>
            <el-option label="购买量" value="g"></el-option>
            <el-option label="评价" value="p"></el-option>
        </el-select>
        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column label="商品名" prop="sno"></el-table-column>
      <el-table-column label="价格" prop="j"></el-table-column>
      <el-table-column label="购买量" prop="g"></el-table-column>
      <el-table-column label="评价" prop="p"></el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[{"sno":"商品1","j":100,"g":20,"p":3.2},
            {"sno":"商品2","j":200,"g":210,"p":3.1},
            {"sno":"商品3","j":300,"g":30,"p":3},
            {"sno":"商品4","j":10,"g":10,"p":4.2},
            {"sno":"商品5","j":40,"g":50,"p":2.2},
            {"sno":"商品6","j":80,"g":80,"p":4.1},
            {"sno":"商品7","j":900,"g":320,"p":5.1},
            {"sno":"商品8","j":1200,"g":40,"p":1.4},
            {"sno":"商品9","j":120,"g":90,"p":0.2}
        ],
        i:'j'
        }
    },
    methods:{
        compare(property) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value2 - value1;
            }
         },
         change(item){
            this.tableData.sort(this.compare(item));
         }
    },
    mounted(){
        this.tableData.sort(this.compare(this.i));
    }
}
</script>