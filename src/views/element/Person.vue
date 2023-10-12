<template>
    <div>
        <el-container>
            <el-header>
                    <div>
                        
                        <el-dropdown  @command="handleCommand">
                            <span class="person">
                            <span class="el-dropdown-link">
                                <img class="user" src="../../assets/backgroud.jpg"/>
                                {{user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="person">个人中心</el-dropdown-item>
                                <el-dropdown-item command="to_emp">返回主页</el-dropdown-item>
                            </el-dropdown-menu>
                        </span>
                        </el-dropdown>
                    
                    </div>
            </el-header>
        </el-container>
      <el-container style="height: 600px; border: 1px solid #eee">
        
        <el-aside width="200px" style="background-color: white">
          <el-menu :default-openeds="['1']">
  
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-postcard"></i>信息修改</template>
              <el-menu-item-group>
  
                <router-link class="alink" to="/emp/person/showinfo">
                  <el-menu-item index="1-1">
                    基本信息
                  </el-menu-item>
  
                </router-link>
  
                <router-link class="alink" to="/emp/person/infoeditor">
                  <el-menu-item index="1-2">
                    信息修改
                  </el-menu-item>
                </router-link>
  
                <router-link class="alink" to="/emp/person/imageUp">
                  <el-menu-item index="1-3">
  
                    头像修改
  
                  </el-menu-item>
                </router-link>
  
                <router-link class="alink" to="/emp/person/countcontrol">
                  <el-menu-item index="1-4">
  
                      账号管理
  
                  </el-menu-item>
                </router-link>
  
  
              </el-menu-item-group>
  
            </el-submenu>
  
  
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-postcard"></i>文章管理</template>
              <el-menu-item-group>
                <router-link class="alink" to="/emp/person/privateAarticle">
                  <el-menu-item index="2-1">
                    私密文章
                  </el-menu-item>
                </router-link>
  
                <router-link class="alink" to="/myspace/publicArticle">
                  <el-menu-item index="2-2">
                    PUBLIC
                  </el-menu-item>
                </router-link>
  
                <router-link class="alink" to="/myspace">
                  <el-menu-item index="2-3">
                    全部文章
                  </el-menu-item>
                </router-link>
  
                <router-link class="alink" to="/myspace/columnArticle">
                  <el-menu-item index="2-4">
                    我的专栏
                  </el-menu-item>
                </router-link>
  
                <router-link class="alink" to="/myspace/statusArticle">
                  <el-menu-item index="2-5">
                    审核状态
                  </el-menu-item>
                </router-link>
              </el-menu-item-group>
  
            </el-submenu>
  
  
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-edit"></i>文章书写
              </template>
              <el-menu-item-group>
                <router-link class="alink" to="/writeblog">
                  <el-menu-item index="3-1">
                    文章书写
                  </el-menu-item>
                </router-link>
              </el-menu-item-group>
  
            </el-submenu>
  
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-postcard"></i>社区</template>
  
              <el-menu-item-group>
  
                <router-link class="alink" to="/myspace/myjoincolums">
                  <el-menu-item index="4-1">
                    我的社区
                  </el-menu-item>
                </router-link>
  
                <router-link class="alink" to="/myspace/mycolums">
                  <el-menu-item index="4-2">
                    我创建的社区
                  </el-menu-item>
                </router-link>
  
  
              </el-menu-item-group>
            </el-submenu>
  
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-star-on"></i>收藏</template>
  
              <el-menu-item-group>
  
                <router-link class="alink" to="/myspace/collectionAns">
                  <el-menu-item index="5-1">
                    问答收藏
                  </el-menu-item>
                </router-link>
  
                <router-link class="alink" to="/myspace/collectionArticle">
                  <el-menu-item index="5-2">
                    文章收藏
                  </el-menu-item>
                </router-link>
  
                <router-link class="alink" to="/myspace/collectionColums">
                  <el-menu-item index="5-3">
                    社区收藏
                  </el-menu-item>
                </router-link>
  
              </el-menu-item-group>
  
  
            </el-submenu>
          </el-menu>
        </el-aside>
  
  
        <el-container
          style="background-image: url(/static/logo/noticesbg.jpg);
          background-repeat: no-repeat;
          background-size:100% 100%;
          "
        >
          <el-main>
            <div style="width: 80%;margin: 0 auto">
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
let userId = localStorage.getItem('userId');
let userLevel = localStorage.getItem('userLevel');
  export default {
    name: "myspace",
    data() {
  
      return {
            userId :userId,
            userLevel:userLevel,
            user:[],
            name:'vue.js'
      }
    },
    beforeCreate:function(){
        console.log("beforecreate is running");
        this.$axios.get('/emp').then(res=>{
                console.log(res.data.data);
                this.user =res.data.data;
                console.log('hello emp');
        }) ;
    },
    methods:{
        handleCommand(command) {
            if(command==='to_emp')
                router.push('/emp');
        }
    }
  }
  </script>
  
  <style scoped>
  .el-header {
    background-color: #e5efe2;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .router-link-active {
    text-decoration: none;
  }
  
  .alink{
  
    text-decoration: none;
  }
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
  