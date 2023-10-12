<template>
    <div style="width: 70%;margin-top: 5%">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="修改密码" prop="yno">
          <el-input type="password" v-model="ruleForm.yno" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认修改" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="校验码：" prop="verify">
    
          <el-input placeholder="请输入校验码:216" v-model.number="ruleForm.verify"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    </template>
    
    <script>
import axios from 'axios';
import Element from 'element-ui';
    export default {
      name: "countcontrol",
      data() {
        var checkAge = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('校验码不能为空'));
          }
          setTimeout(() => {
            if ((value)!="216") {
              callback(new Error('校验码错误'));
            } else {
    
                callback();
    
            }
          }, 1000);
        };
        var validatePass = (rule, value, callback) => {
          if (value === "") {
            callback(new Error('请输入密码'));
          } else {
            if(value.length<=6){
              callback(new Error("密码长度不能低于6"))
            }
            if (this.ruleForm.checkPass !== '' ) {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.yno) {
            console.log(value);
            console.log(this.ruleForm.yno);
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          ruleForm: {
            yno: '',
            checkPass: '',
            verify: ''
          },
          rules: {
            yno: [
              { validator: validatePass, trigger: 'change' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            verify: [
              { validator: checkAge, trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              axios.post('/emp/person/countcontrol',{params:{yno:this.ruleForm.yno}}).then(res=>{
                let result = res.data.code;
                if(result){
                  Element.Message.success(res.data.msg);
                }
                else{
                  Element.Message.error(res.data.msg);
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
    </script>
    
    <style scoped>
    
    </style>
    