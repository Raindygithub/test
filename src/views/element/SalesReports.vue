<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">
                <div >
                    <el-form :inline="true" :model="SearchForm" class="demo-form-inline" ref="SearchForm">
                        <el-form-item>
                            <el-select v-model="SearchForm.g_type" placeholder="活动区域">
                                <el-option label="全部类型" value="全部类型"></el-option>
                                <el-option label="日用型" value="日用型"></el-option>
                                <el-option label="食品类" value="食品类"></el-option>
                                <el-option label="儿童类" value="儿童类"></el-option>
                                <el-option label="服装类" value="服装类"></el-option>
                                <el-option label="工具类" value="工具类"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button-group>
                                <el-button type="plain" @click="getTime(0)">当日</el-button>
                                <el-button type="plain" @click="getTime(7)">最近七天</el-button>
                                <el-button type="plain" @click="getTime(30)">最近三十天</el-button>
                                <el-button type="plain" @click="getTime(365)">最近一年</el-button>
                            </el-button-group>
                        </el-form-item>
                        <el-form-item prop="Date">
                            <el-date-picker
                                v-model="SearchForm.Date"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                            <el-button type="primary" @click="resetForm('SearchForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div id="myReports">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div >
                                <el-card class="box-card">
                                <h3>商品销售金额</h3>
                                <div>
                                    <i class="el-icon-coin" style="color:gold"></i>
                                    <span>{{ this.sums }}</span>
                                </div>
                            </el-card>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <el-card class="box-card">
                                <h3>商品销量</h3>
                                <div>
                                    <i class="el-icon-s-shop" style="color: purple"></i>
                                    <span>{{this.num}}</span>
                                </div>
                            </el-card>
                            </el-col>
                            <el-col :span="6">
                            <div >
                                <el-card class="box-card">
                                <h3>累计顾客人次</h3>
                                <div>
                                    <i class="el-icon-s-custom" style="color: green"></i>
                                    <span>{{this.vipnum}}</span>
                                </div>
                            </el-card>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div >
                                <el-card class="box-card">
                                <h3>会员顾客/普通顾客</h3>
                                <div>
                                    <i class="el-icon-user" style="color: gold"></i>
                                    <span>{{ this.vipnum}}{{"/"}}{{(this.cusnum-this.vipnum) }}</span>
                                </div>
                            </el-card>
                            </div>
                        </el-col>
                        </el-row>
                        
                         <el-row :gutter="20">
                            <el-col :span="16">
                                <el-card class="box-card">
                                    <el-button type="primary" style="margin-left: 90%;" v-if="type" @click="type=!type">商品销售</el-button>
                                    <el-button type="primary" style="margin-left: 90%;" v-if="!type" @click="type=!type">客户消费</el-button>
                                    <div ref="lineChart" style="height: 800px;width: 800px;" v-show="!type"></div>
                                    <div ref="cusChart" style="height: 800px;width: 800px;" v-show="type"></div>
                                </el-card>
                                
                            </el-col>
                            <el-col :span="8">
                                <el-card class="box-card">
                                    <div ref="vipChart" style="height: 400px;width: 400px;"></div>
                                </el-card>
                                <el-card class="box-card">
                                    <div ref="productChart" style="height: 400px;width: 400px;"></div>
                                </el-card>
                            </el-col>
                        </el-row>


                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
  

<script>


import moment from 'moment';
import axios from 'axios';
export default {
    data(){
        return{
            activeName: 'first',
            type:false,
            SearchForm:{
                g_type:'全部类型',
                Date:[],
                moment,
            },
            salesName:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            salesData:[820, 932, 901, 934, 1290, 1330, 1320],
            cusDate:['0', '1', '2', '3', '4', '5', '6'],
            cusData:[20, 10, 60, 100, 300, 600, 800],
            vip:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            vipData:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            CusData:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            sumData:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
            vipPro:[
                        { value: 40, name: 'rose 1' },
                        { value: 38, name: 'rose 2' },
                        { value: 32, name: 'rose 3' },
                        { value: 30, name: 'rose 4' },
                        { value: 28, name: 'rose 5' },
                        { value: 26, name: 'rose 6' },
                        { value: 22, name: 'rose 7' },
                        { value: 18, name: 'rose 8' }
                    ],
            sumPro:[
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ],
            sums:0,
            num:0,
            vipnum:0,
            cusnum:0,
            printObj:{
                id:"myReports",
                popTitle:"销售报表"
            }

        }
    },
  
    methods:{
        getTime(value){
            this.SearchForm.Date=[]
            let endtime=moment(new Date(new Date())).format('YYYY-MM-DD')
            let starttime=moment(new Date().getTime() - value * 1000 * 24 * 60 * 60).format('YYYY-MM-DD')
            console.log(endtime);
            this.SearchForm.Date.push(starttime)
            this.SearchForm.Date.push(endtime)
            console.log(this.SearchForm.Date);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        onSubmit(){
            axios.post('/emp/sales/salesReports',this.SearchForm).then(res=>{
                let result = res.data.code;
                let data = res.data.data;
                let message=res.data.msg;
                if(result){
                    console.log("res:",data.cusData);
                    console.log("res:",this.cusData);
                    console.log("res:",typeof(this.cusData));
                    this.resetForm('SearchForm');
                    this.salesName=Object.values(data.salesName);
                    this.salesData=Object.values(data.salesData);
                    this.cusData=Object.values(data.cusData);
                    this.cusDate=Object.values(data.cusDate);
                    this.vip=Object.values(data.vip);
                    this.vipData=Object.values(data.vipData);
                    this.CusData=Object.values(data.CusData);
                    this.sumData=Object.values(data.sumData);
                    this.vipPro=Object.values(data.vipPro);
                    this.sumPro=Object.values(data.sumPro); 
                    this.sums=data.sums;
                    this.num=data.num;
                    this.vipnum=data.vipnum;
                    this.cusnum=data.cusnum;
                    console.log("res:",this.vipPro);
                    console.log("res:",typeof(this.vipPro));
                            // 解决数据初始渲染不出来的问题
                        
                        this.getLineChart();
                        this.getCusChart();
                        this.getProductChart();
                        this.getVipChart();
                    
                }else{
                    alert('error');
                }
            });

        },
        getLineChart(){
            
            console.log('linechart');
            let EChart = this.$echarts.init(this.$refs.lineChart)
            EChart.clear();
            // 配置参数
            let config = {
                title: {
                    text: '每日售额及顾客人次',
                    left: 'center'
                },
                legend: {
                    data: ['售额','顾客人次'],
                    left: 'left'
                },
                toolbox: {
                    feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                    }
                },
                xAxis: [{
                    type: 'category',
                    data: this.salesName
                },{
                    type: 'category',
                    data: this.cusDate//['0', '1', '2', '3', '4', '5', '6']
                }],
                yAxis:[{
                    name:"售额",
                    type: 'value'
                }, {
                    name:"顾客人次",
                    type: 'value'
                }],
                series: [{
                    name:'售额',
                    data: this.salesData,
                    type: 'line',
                    smooth: true
                },
                {
                    name:'顾客人次',
                    data: this.cusData,//[20, 10, 60, 100, 300, 600, 800],
                    type: 'bar',
                }]
            };
            // 设置参数
            EChart.setOption(config,true);
            

        },
        getCusChart(){
            let EChart=this.$echarts.init(this.$refs.cusChart);
            EChart.clear();
            let config={
                title: {
                    text: '顾客消费对比',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                    }
                },
                toolbox: {
                    feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ['vip客户', '普通客户', '总额'],
                    left: 'left'
                },
                xAxis: [
                    {
                    type: 'category',
                    data: this.vip,//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisPointer: {
                        type: 'shadow'
                    }
                    }
                ],
                yAxis: [
                    {
                    type: 'value',
                    name: '总额',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value} ￥'
                    }
                    },
                     {
                    type: 'value',
                    name: '普通客户',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} ￥'
                    }
                    } 
                ],
                series: [
                    {
                    name: 'vip客户',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value) {
                        return value + ' ￥';
                        }
                    },
                    data: this.vipData
                    },
                    {
                    name: '普通客户',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value) {
                        return value + ' ￥';
                        }
                    },
                    data: this.CusData
                    },
                    {
                    name: '总额',
                    type: 'line',
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: function (value) {
                        return value + ' ￥';
                        }
                    },
                    data: this.sumData
                    }
                ]
            };
            console.log(config.series[0].data);
            console.log('hello');
            EChart.setOption(config,true);
            
        },
        getVipChart(){
            let EChart=this.$echarts.init(this.$refs.vipChart);
            EChart.clear();
            let config = {
                title: {
                    text: 'vip客户消费倾向',
                    left: 'center'
                },
                legend: {
                    bottom:'bottom'
                },
                toolbox: {
                    show: true,
                    feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                    name: 'Nightingale Chart',
                    type: 'pie',
                    radius: [20, 100],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: this.vipPro
                    }
                ]
                };

            EChart.setOption(config,true);
            
        },

        getProductChart(){
            let EChart=this.$echarts.init(this.$refs.productChart);
            EChart.clear();
            let config = {
                title: {
                    text: '商品售额比对',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: this.sumPro,
                    emphasis: {
                        itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                    }
                ]
                };
            EChart.setOption(config,true);
            
        }

    },
    mounted() {
        this.getLineChart();
        this.getCusChart();
        this.getProductChart();
        this.getVipChart();
    },

    
  
}
</script>

<style>
    .el-statistic{
        box-shadow: 2px 4px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(20, 19, 19, 0.04);
        padding: 10px;
        margin-bottom: 20px;
        text-align: center;

    }

    .el-card{
        margin-bottom: 20px;
        text-align: center;
    }

</style>
