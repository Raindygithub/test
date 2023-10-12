<template>
    <el-container>
        <el-aside width="200px">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                    <el-menu-item index="1-1" @click="changePage(0)">
                    
                        收银
                    </el-menu-item>
                    <el-menu-item index="1-2" @click="changePage(1)">商品录入</el-menu-item>
                    <el-menu-item index="1-3" @click="changePage(2)">会员查询</el-menu-item>
                    <el-menu-item index="1-5" @click="changePage(3)">供货商查询</el-menu-item>
                    <el-menu-item index="1-6" @click="changePage(4)">厂商查询</el-menu-item>
                    <el-menu-item index="1-7" @click="changePage(5)">员工管理</el-menu-item>
                    <el-menu-item index="1-8" @click="changePage(6)">库存管理</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                    <template slot="title">销售管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1" @click="changePage(7)">销售榜单</el-menu-item>
                        <el-menu-item index="2-2" @click="changePage(8)">收银记录</el-menu-item>
                        <el-menu-item index="2-3" @click="changePage(9)">进货记录</el-menu-item>
                        <el-menu-item index="2-4" @click="changePage(10)">报表</el-menu-item>
                    </el-menu-item-group>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
            <keep-alive>
                <component :is="List[this.id]" ></component>
            </keep-alive> 
            
        </el-main>
    </el-container>
</template>

<script>
import shouyin from './element/shouyin.vue' 
import ProductEntry from './element/ProductEntry.vue'
import ListOfVip from './element/ListOfVip.vue'
import Suppliers from './element/Suppliers.vue'
import Manufacturers from './element/Manufacturers.vue'
import EmpControl from './element/EmpControl.vue'
import InventoryManagement from './element/InventoryManagement.vue'
import SalesList from './element/SalesList.vue'
import CashRegisterRecords from './element/CashRegisterRecords.vue'
import PurchaseRecords from './element/PurchaseRecords.vue'
import SalesReports from './element/SalesReports.vue'

export default {
    data(){
        return{
            id:-1,
            List:['shouyin','ProductEntry','ListOfVip','Suppliers','Manufacturers','EmpControl','InventoryManagement','SalesList','CashRegisterRecords','PurchaseRecords','SalesReports']
        }
    },
    components:{
        shouyin,
        ProductEntry,
        ListOfVip,
        Suppliers,
        Manufacturers,
        EmpControl,
        InventoryManagement,
        SalesList,
        CashRegisterRecords,
        PurchaseRecords,
        SalesReports,
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      changePage(id){
        this.id=id;
      }
    },
    mounted(){

    },
    created(){
        
    }
    
}
</script>

<style>
    
</style>