<template>
    <div>
        <div  style="width:14%;height: 130px;border-radius: 100px;display:inline-block;">
          <img
            style="width:100%;height: 100%;border-radius: 100px"
            :src="this.imgSrc"
            class="image"
            alt=""
          >
        </div>
    
      <br>
      <br>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="学号" v-model="user.userId" ><p class="message">{{user.sno}}</p></el-descriptions-item>
        <el-descriptions-item label="姓名" v-model="user.username" ><p class="message">{{user.sname}}</p></el-descriptions-item>
        <el-descriptions-item label="性别" v-model="user.username" ><p class="message">{{user.ssex}}</p></el-descriptions-item>
        <el-descriptions-item label="出生日期" v-model="user.username" ><p class="message">{{user.sbirth}}</p></el-descriptions-item>
        <el-descriptions-item label="民族" v-model="user.username" ><p class="message">{{user.snt}}</p></el-descriptions-item>
        <el-descriptions-item label="院系" v-model="user.username" ><p class="message">{{user.scolleage}}</p></el-descriptions-item>
        <el-descriptions-item label="专业" v-model="user.username" ><p class="message">{{user.sdept}}</p></el-descriptions-item>
        <el-descriptions-item label="班级" v-model="user.username" ><p class="message">{{user.sclass}}</p></el-descriptions-item>
        <el-descriptions-item label="户籍" v-model="user.username" ><p class="message">{{user.sregister}}</p></el-descriptions-item>
        <el-descriptions-item label="政治面貌" v-model="user.username" ><p class="message">{{user.sstatus}}</p></el-descriptions-item>
        <el-descriptions-item label="奖惩情况" v-model="user.username" ><p class="message">{{user.sadmission}}</p></el-descriptions-item>
       
    
      </el-descriptions>
    </div>
    </template>
    
    <script>
import axios from 'axios'
    export default {
      name: "showinfo",
      data(){
        return{
            user:{
              sno:"202100400030",
              sname:"赵构",
              ssex:"1",
              sbirth:"1432-08-23",
              snt:"汉",
              scolleage:"商学院",
              sdept:"材料物理",
              sclass:"01",
              sregister:"河南省开封市",
              sstatus:"党员",
              sadmission:"无", 
              simage:''
            },
            imgSrc:require('../../assets/img/V.png'),
            sno:''
            
    
    
        }
      },
      mounted(){
        axios.get('/stu/stus/sno',{params:{sno:this.sno}}).then(res=>{
            let result = res.data.code;
            let message = res.data.msg;
            let data=res.data.data;
            if(result){
                console.log(message);
                this.user=data;
            }else{
                alert(message);
            }
        })
        /* this.userId=this.user.userId;
        this.username=this.user.username;
        this.email=this.user.email;
        this.esalary=this.user.esalary;
        this.dadd=this.user.dadd;
        this.epost=this.user.epost; */
      }
    }
    </script>
    
    <style scoped>
    .message{
      width: 20em;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    </style>
    