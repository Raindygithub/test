<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="转专业申请列表" name="first">
                <div style="width: 100%;height: 1000px;display: flex;flex-wrap: wrap; ">
                    <div style="margin-top: 20px; width: 90%;height: 400px;margin-left: 10%;" >
                        
                        <el-card class="box-card" v-for="(values,index) in cardData" :key="index" >
                            <div slot="header" class="clearfix" >
                                申请编号：{{values.id}}
                                <div style="margin-right: 60%;width: 20px;" v-show="values.state===0"><el-button type="primary" >撤回</el-button></div>
                                
                            </div>
                            <div class="text item">
                                学生转专业申请
                                <el-tag type="danger" style="border-radius: 30px;" size="mini" effect="dark" v-show="values.state===2">办理失败</el-tag>
                                <el-tag type="success" style="border-radius: 30px;" size="mini" effect="dark" v-show="values.state===1">办理成功</el-tag>
                                <el-tag type="info" style="border-radius: 30px;" size="mini" effect="dark" v-show="values.state===1">未评价</el-tag>
                                <el-tag type="warning" style="border-radius: 30px;" size="mini" effect="dark" v-show="values.state===0">未办理</el-tag>
                                <el-tag type="primary" style="border-radius: 30px;" size="mini" effect="dark" v-show="values.state===0">已撤销</el-tag>
                            
                            </div>
                            <div class="text item">
                                <el-descriptions>
                                    <el-descriptions-item label="申请时间：">{{values.stime}}</el-descriptions-item>
                                    <el-descriptions-item label="办结时间：">{{values.jtime}}</el-descriptions-item>
                                </el-descriptions>
                            </div>
                            <div class="text item">
                                <el-descriptions title="摘要：">
                                    <el-descriptions-item label="申请人">{{sname}}</el-descriptions-item>
                                    <el-descriptions-item label="学号">{{sno}}</el-descriptions-item>
                                    <el-descriptions-item label="原专业">{{values.rcollagename}}</el-descriptions-item>
                                    <el-descriptions-item label="欲转专业">{{values.collagename}}</el-descriptions-item> 
                                </el-descriptions>
                            </div>
                            <el-collapse v-model="activeNames" @change="change(values.id)" accordion>
                            <el-collapse-item title="办理详情" :name="index">
                                
                                <el-table
                                    ref="multipleTable"
                                    :data="tableData"
                                    tooltip-effect="dark"
                                    style="width: 100%" border 
                                    @selection-change="handleSelectionChange">
                                    <el-table-column prop="temp" label="任务环节" width="180"></el-table-column>
                                    <el-table-column prop="user" label="办理人" width="180"></el-table-column>
                                    <el-table-column prop="yi" label="办理意见" width="180"></el-table-column>
                                    <el-table-column prop="result" label="办理结果" width="180"></el-table-column>
                                    <el-table-column prop="time" label="办理时间" width="180"></el-table-column>
                                </el-table>  
                            </el-collapse-item>
                        </el-collapse>  
                    </el-card>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="转专业申请" name="second">
                <el-alert
                    title="当前时间不在规定的转专业时间！"
                    type="warning"
                    :closable="false"
                    v-show="!is"
                    >
                </el-alert>

                <el-form ref="ApplyForm" :model="ApplyForm" label-width="100px">
                    <el-form-item label="学号" prop="sno">
                        <el-input v-model="ApplyForm.sno"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="sname">
                        <el-input v-model="ApplyForm.sname"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="ssex">
                        <el-input v-model="ApplyForm.ssex"></el-input>
                    </el-form-item>
                    <el-form-item label="学院" prop="scollege">
                        <el-input v-model="ApplyForm.scollege"></el-input>
                    </el-form-item>
                    <el-form-item label="专业" prop="sdept">
                        <el-input v-model="ApplyForm.sdept"></el-input>
                    </el-form-item>
                    <el-form-item label="班级" prop="sclass">
                        <el-input v-model="ApplyForm.sclass"></el-input>
                    </el-form-item>
                    <el-form-item label="学院" prop="collagename">
                        <el-input v-model="ApplyForm.collagename"></el-input>
                    </el-form-item>
                    <el-form-item label="专业" prop="sdeptname">
                        <el-input v-model="ApplyForm.sdeptname"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <!-- <el-button>保存</el-button> -->
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="resetForm('ApplyForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import ElementUI from 'element-ui';
export default {
    data(){
        return{
            tableData:[],
            id:'12123',
            activeNames:'',
            sno:'2104214802',
            sname:'mark',
            cardData:[],
            is:false,
            ApplyForm:{
                sno:'',
                sname:'',
                ssex:'',
                scollege:'',
                sdept:'',
                sclass:'',
                collagename:'',
                sdeptname:''
            },

            activeName:'first'
        }
    },
    methods:{
        indexMethod(index) {
            return index +1;
        },
        change(id){
            axios.get('/stu/sdeptchanged/table',{params:{sno:this.sno,id:id}}).then(res=>{
            let result = res.data.code;
            let message = res.data.msg;
            let data=res.data.data;
            if(result){
                
                for(let i=0;i<data.length;i++){
                    this.cardData.push(data[i]);
                }
                console.log(this.cardData);
            }else{
                alert(message);
            }
        })
        },
        getSeconds(val) {
            const h = moment(val).get('hours')
            const m = moment(val).get('minutes')
            const s = moment(val).get('seconds')
            return h * 3600 + m * 60 + s
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        onSubmit(){
            axios.post('/stu/sdeptchanging',this.ApplyForm).then(res=>{
                let result = res.data.code;
                let message = res.data.msg;
                let data=res.data.data;
                if(result){
                    
                    ElementUI.Message.success(message);
                    this.resetForm('ApplyForm');
                    this.getList();
                    this.activeName="second";
                    
                }else{
                    ElementUI.Message.error(message);
                }
            }).catch(function (error) {
                if (error.response) {
                // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // 请求已经成功发起，但没有收到响应
                // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
                // 而在node.js中是 http.ClientRequest 的实例
                console.log(error.request);
                } else {
                    
                // 发送请求时出了点问题
                console.log('Error', error.message);
                }
                console.log(error.config);
            });
           
        },
        getList(){
            axios.get('/stu/sdeptchanged',{params:{sno:this.sno,}}).then(res=>{
                let result = res.data.code;
                let message = res.data.msg;
                let data=res.data.data;
                if(result){
                    
                    for(let i=0;i<data.length;i++){
                        this.cardData.push(data[i]);
                    }
                    console.log(this.cardData);
                    
                    this.l1=this.cardData.length;
                    if(result===2){
                        this.is=true;
                    }else{
                        this.is=false;
                    }
                    
                }else{
                    alert(message);
                }
            });
        }
    },
    mounted(){
        axios.get('/stu/sdeptchanged',{params:{sno:this.sno,}}).then(res=>{
            let result = res.data.code;
            let message = res.data.msg;
            let data=res.data.data;
            if(result){
                
                for(let i=0;i<data.length;i++){
                    this.cardData.push(data[i]);
                }
                console.log(this.cardData);
                
                this.l1=this.cardData.length;
                if(result===2){
                    this.is=true;
                }else{
                    this.is=false;
                }
                
            }else{
                alert(message);
            }
        });
        
    }

}
</script>

<style >
    .box-card{
        width: 90%;
        height: 400px;
        margin-top: 10px;
        box-shadow: 0 3px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border-radius: 4px;
        background-color:pink;
        
    }
    .body-style{
        padding: 10px;
    }
</style>