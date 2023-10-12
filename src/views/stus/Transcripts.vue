<template>
    <div>
        <div style="width: 100%;height: 200px;display: flex;">
            <div style=" width: 25%;height: 100%;">
                <p>姓名 <strong>{{ this.student.sname }}</strong></p>
                <p>性别 <strong>{{ this.student.ssex }}</strong></p>
                <p>学号 <strong>{{ this.student.sno }}</strong></p>
                <p>年级 <strong>{{ this.student.stime.slice(0,4) }}</strong></p>
                <p>状态 <strong> 在读 </strong></p>
            </div>
            <div style=" width: 25%;height: 100%;">
                <p>学院 <strong>{{ this.student.scollege }}</strong></p>
                <p>专业 <strong>{{ this.student.sdept }}</strong></p>
                <p>学制 <strong>4年制</strong></p>
                <p>入学日期 <strong>{{ this.student.stime.slice(0,4)+"/"+this.student.stime.slice(5,7) }}</strong></p>
                <p>毕业日期 <strong>{{ (Number(this.student.stime.slice(0,4))+4).toString()+"/06" }}</strong></p>
            </div>
            <div style=" width: 25%;height: 100%;">
                <p>已获必修学分 <strong>{{ "76" }}</strong></p>
                <p>已获限选学分 <strong>{{ "14" }}</strong></p>
                <p>已获任选学分 <strong>{{"8" }}</strong></p>
                <p>已获得总学分 <strong>{{"98" }}</strong></p>
                <p>平均学分绩点 <strong>{{ "87.6" }}</strong></p>
            </div>
            <div style=" width: 25%;height: 100%;display: flex;" >
                <div style=" flex: 1;"></div>
                <img :src="this.student.simage" style="width: 45%;height: 80%; margin-bottom: 0px;border: 1px rgb(34, 74, 182) ridge;"/>
                <div style=" flex: 1;"></div>
            </div>
        </div>
        <div style="width: 100%;width: 100%;height: 1000px;display: flex;" v-for="i in this.l1" :key="i">
             <div style="flex:1;" v-for="j in 2" :key="j"> 
                <ul>
                    <li v-for="index in 3" :key="index" >
                        <grade :ref="'grade'+(index-1).toString()+(j-1).toString()+(i-1).toString()" ></grade>
                    </li>
                </ul>
            </div> 
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import grade from '../compotents/grade.vue'
export default {
    components:{
        grade,
    },
    data(){
        return{
            sno:'',
            student:{
                sno:'202100800560',
                sname:'李兵',
                ssex:'男',
                scollege:'机电与信息工程学院',
                sdept:'计算机类',
                sclass:'软工01',
                stime:'2021-09-01',
                simage:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',

            },
            gradeData:[],
            l1:0,
            l2:0,
            
        }
    },
    methods:{

    },
    mounted(){
        axios.get('/stu/grades',{params:{sno:this.sno}}).then(res=>{
            let result = res.data.code;
            let message = res.data.msg;
            if(result){
               this.gradeData=res.data.data;
               this.l1=Math.floor(this.gradeData.length/6+1);
               this.l2=this.gradeData.length;
               console.log(this.gradeData);
               
               this.$nextTick(()=>{
                    /* for(let i=0;i<this.gradeData.length;i++){
                        this.$refs["grade"+i.toString()][0].title=this.gradeData[i].title;
                        this.$refs["grade"+i.toString()][0].tableData=this.gradeData[i].tableData;
                    } */
                    for(let i=0;i<this.l1;i++){
                        for(let j=0;j<2;j++){
                            for(let k=0;k<3&&k<this.gradeData.length-(i+1)*j*3;k++){
                                
                                
                                this.$refs["grade"+k.toString()+j.toString()+i.toString()][0].title=this.gradeData[i].title;
                                this.$refs["grade"+k.toString()+j.toString()+i.toString()][0].tableData=this.gradeData[i].tableData;
                                
                            }
                        }
                    }
               })

            }else{
                Element.Message.error(message);
            }
        })
    }
}
</script>