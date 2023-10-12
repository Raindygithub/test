<template>
    <div>
        <el-container>
            <el-header>
                
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航一</span>
                            </template>
                            <el-menu-item-group>
                                <router-link class="alink" to="/stu/class">
                                    <el-menu-item index="1-1">课表查询</el-menu-item>
                                </router-link>
                                <router-link class="alink" to="/stu/alterclass">
                                    <el-menu-item index="1-2">选课系统</el-menu-item>
                                </router-link>
                                <router-link class="alink" to="/stu/grades">
                                    <el-menu-item index="1-3">成绩单查询</el-menu-item>
                                </router-link>
                                <router-link class="alink" to="/stu/lessonPlans">
                                    <el-menu-item index="1-4">教学计划查询</el-menu-item>
                                </router-link>
                                <router-link class="alink" to="/stu/sdeptchanged">
                                    <el-menu-item index="1-5">转专业申请</el-menu-item>
                                </router-link>
                            </el-menu-item-group>
                            <el-submenu index="1-6">
                            <template slot="title">个人中心</template>
                                <el-menu-item-group>
                                    <router-link class="alink" to="/stu/stus/id">
                                        <el-menu-item index="2-1">个人页面</el-menu-item>
                                    </router-link>
                                    <router-link class="alink" to="/stu/stus">
                                        <el-menu-item index="2-1">个人信息修改</el-menu-item>
                                    </router-link>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <div style="width: 90%;margin: 0 auto;height: 100%;" >
                        <router-view></router-view>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';
export default {
    data(){
        return{

        }
    },
    methods:{
        handleCommand(command) {
            router.push('/emp/'+command);
        }
    },
    mounted(){

    }
}
</script>


<style  scoped>
    
    .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    
  }
  .person{
    margin-left: 90%;
    width: 10px;
    height: 60px;
  }
  .el-dropdown{
        width: 100%;
    }
    .el-dropdown.link{
        width: 20%;
    }

    .user{
        border-radius:50%;
        width: 50px;
        height: 50px;
    }
</style>
