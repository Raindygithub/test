<script>
import emp from './emp.vue';
import axios from 'axios';
import router from '@/router';
let userId = localStorage.getItem('userId');
let userLevel = localStorage.getItem('userLevel');

export default {
    name:'Home',
    data(){
        return {
            userId :userId,
            userLevel:userLevel,
            user:[],
            name:'vue.js'
            
        }
        
    },
    components:{
                emp,
    },
    
    methods: {
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      person(){
        console.log('person');
      },
      /* getUser(){
        var re = (JSON.stringify(this.$route.query)!={})
        if(re){
            let userId = this.$route.query.userId;
            console.log(userId);
        }
      } */
      toScanPersonInfo(){
        console.log('person is here');
      },
      handleCommand(command) {
        router.push('/emp/'+command);
      }
    },
    created(){
        
    },
    beforeCreate:function(){
        console.log("beforecreate is running");
        this.$axios.get('/emp').then(res=>{
                console.log(res.data.data);
                this.user =res.data.data;
                res.data.data.userId=localStorage.getItem('userId');
                localStorage.setItem('user',JSON.stringify(res.data.data));
                console.log('hello emp');
        }) ;
    },
    mounted(){
        
    }
    
}


</script>
 


<template>
    <div>
        <el-container>
            <el-header>
                <div>
                    
                    <el-dropdown  @command="handleCommand">
                        <span class="person">
                        <span class="el-dropdown-link">
                            <img class="user" src="../assets/backgroud.jpg"/>
                            {{user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="person">个人中心</el-dropdown-item>
                        </el-dropdown-menu>
                    </span>
                    </el-dropdown>
                
                </div>
            </el-header>
            <el-main>
                <emp/>
            </el-main>
        </el-container>
    </div>

</template>



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
