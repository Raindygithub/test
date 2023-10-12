<template>
    <div style="width: 70%;margin-top: 5%">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-dynamic"
    
    
      >
        <el-form-item
            style="width: 49%"
            label="学号"
            prop="sno"
            
      
          >
            <el-input v-model="ruleForm.sno" disabled></el-input>
          </el-form-item>
          <br>
        <el-form-item
          style="width: 49%"
          label="姓名"
          prop="sname"
          
    
        >
          <el-input v-model="ruleForm.sname" disabled></el-input>
        </el-form-item>
        <br>
        <el-form-item label="性别" prop="ssex">
          <el-select v-model="ruleForm.esex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="sbirth">
          <el-date-picker
              v-model="ruleForm.sbirth"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="民族" prop="snt">
                        
          <el-select v-model="ruleForm.snt" filterable placeholder="请选择民族" >
            <el-option v-for="item in nationList" :key="item.value" :label="item.info" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width: 49%"
          label="政治面貌"
          prop="sstatus"
    
        >
          <el-select v-model="ruleForm.sstatus" placeholder="请输入政治面貌">
                            <el-option label="中共党员" value="中共党员"></el-option>
                            <el-option label="中共预备党员" value="中共预备党员"></el-option>
                            <el-option label="共青团员" value="共青团员"></el-option>
                            <el-option label="群众" value="群众"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width: 49%"
          label="户籍"
          prop="sregister"
          
    
        >
          <el-input v-model="ruleForm.sregister"></el-input>
        </el-form-item>
    
    
    
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交修改</el-button>
          <el-button type="warning" @click="resetForm('ruleForm')">清空</el-button>
    
        </el-form-item>
      </el-form>
    </div>
    </template>
    
<script>
import axios from 'axios';
import Element from 'element-ui';
    export default {
      name: "infoeditor",
      data() {
        return {
          ruleForm: {
            sname: '',
            ssex: '男',
            sno:'',
            snt:'',
            sregister:'',
            sbirth:'',
            sstatus:'',
          },
            nationList:[
                {
                id: 1,
                info: "汉族",
                value: 1,
                },
                {
                id: 2,
                info: "壮族",
                value: 2,
                },
                {
                id: 3,
                info: "满族",
                value: 3,
                },
                {
                id: 4,
                info: "回族",
                value: 4,
                },
                {
                id: 5,
                info: "苗族",
                value: 5,
                },
                {
                id: 6,
                info: "维吾尔族",
                value: 6,
                },
                {
                id: 7,
                info: "土家族",
                value: 7,
                },
                {
                id: 8,
                info: "彝族",
                value: 8,
                },
                {
                id: 9,
                info: "蒙古族",
                value: 9,
                },
                {
                id: 10,
                info: "藏族",
                value: 10,
                },
                {
                id: 11,
                info: "布依族",
                value: 11,
                },
                {
                id: 12,
                info: "侗族",
                value: 12,
                },
                {
                id: 13,
                info: "瑶族",
                value: 13,
                },
                {
                id: 14,
                info: "朝鲜族",
                value: 14,
                },
                {
                id: 15,
                info: "白族",
                value: 15,
                },
                {
                id: 16,
                info: "哈尼族",
                value: 16,
                },
                {
                id: 17,
                info: "哈萨克族",
                value: 17,
                },
                {
                id: 18,
                info: "黎族",
                value: 18,
                },
                {
                id: 19,
                info: "傣族",
                value: 19,
                },
                {
                id: 20,
                info: "畲族",
                value: 20,
                },
                {
                id: 21,
                info: "傈僳族",
                value: 21,
                },
                {
                id: 22,
                info: "仡佬族",
                value: 22,
                },
                {
                id: 23,
                info: "东乡族",
                value: 23,
                },
                {
                id: 24,
                info: "高山族",
                value: 24,
                },
                {
                id: 25,
                info: "拉祜族",
                value: 25,
                },
                {
                id: 26,
                info: "水族",
                value: 26,
                },
                {
                id: 27,
                info: "佤族",
                value: 27,
                },
                {
                id: 28,
                info: "纳西族",
                value: 28,
                },
                {
                id: 29,
                info: "羌族",
                value: 29,
                },
                {
                id: 30,
                info: "土族",
                value: 30,
                },
                {
                id: 31,
                info: "仫佬族",
                value: 31,
                },
                {
                id: 32,
                info: "锡伯族",
                value: 32,
                },
                {
                id: 33,
                info: "柯尔克孜族",
                value: 33,
                },
                {
                id: 34,
                info: "达斡尔族",
                value: 34,
                },
                {
                id: 35,
                info: "景颇族",
                value: 35,
                },
                {
                id: 36,
                info: "毛南族",
                value: 36,
                },
                {
                id: 37,
                info: "撒拉族",
                value: 37,
                },
                {
                id: 38,
                info: "布朗族",
                value: 38,
                },
                {
                id: 39,
                info: "塔吉克族",
                value: 39,
                },
                {
                id: 40,
                info: "阿昌族",
                value: 40,
                },
                {
                id: 41,
                info: "普米族",
                value: 41,
                },
                {
                id: 42,
                info: "鄂温克族",
                value: 42,
                },
                {
                id: 43,
                info: "怒族",
                value: 43,
                },
                {
                id: 44,
                info: "京族",
                value: 44,
                },
                {
                id: 45,
                info: "基诺族",
                value: 45,
                },
                {
                id: 46,
                info: "德昂族",
                value: 46,
                },
                {
                id: 47,
                info: "保安族",
                value: 47,
                },
                {
                id: 48,
                info: "俄罗斯族",
                value: 48,
                },
                {
                id: 49,
                info: "裕固族",
                value: 49,
                },
                {
                id: 50,
                info: "乌孜别克族",
                value: 50,
                },
                {
                id: 51,
                info: "门巴族",
                value: 51,
                },
                {
                id: 52,
                info: "鄂伦春族",
                value: 52,
                },
                {
                id: 53,
                info: "独龙族",
                value: 53,
                },
                {
                id: 54,
                info: "塔塔尔族",
                value: 54,
                },
                {
                id: 55,
                info: "赫哲族",
                value: 55,
                },
                {
                id: 56,
                info: "珞巴族",
                value: 56,
                },
            ],
    
          
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let form = this.ruleForm;
              
              for(var i in form){
                if(form[i]===''){
                    delete form[i];
                }else{
                    console.log(form[i]);
                }
              }
               axios.put('/stu/stus',form).then(res=>{
                    let result = res.data.code;
                    if(result){
                        Element.Message.success(res.data.msg);
                        this.resetForm('ruleForm');
                        this.$router.push('/stu/stus/id');
                    }else{
                        Element.Message.error(res.data.msg);
                    }
               })
            } else {
                Element.Message.error('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    
      },
      mounted(){
        
      }
    
    }
    </script>
    
    <style scoped>
    
    </style>
    