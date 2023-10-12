import Vue from 'vue';
import VueRouter from 'vue-router';
//import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue';
import Students from '../views/stus/Students.vue'
import Schedule from '../views/stus/Schedule.vue'
import CourseSelect from '../views/stus/CourseSelection.vue'
import Transcripts from '../views/stus/Transcripts.vue'
import grade from '../views/compotents/grade.vue'
import LessonPlans from '../views/stus/LessonPlans.vue'
import ChangeMajor from '../views/stus/ChangeMajor.vue'
import showinfo from '../views/mysapce/showinfo.vue'
import infoeditor from '../views/mysapce/infoeditor.vue'
import a from '../1.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
     component: a//() => import(/* webpackChunkName: "about" */ '../views/element/SalesReports.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  
  {
    path:'/',
    redirect: '/login'
  },
  
  {
    path:'/stu',
    name:'Students',
    component:Students,
    children:[
      {
        path:'class',
        name:'Schedule',
        component:Schedule
      },
      {
        path:'alterclass',
        name:'CourseSelect',
        component:CourseSelect
      },
      {
        path:'grades',
        name:'Transcripts',
        component:Transcripts
      },
      {
        path:'lessonPlans',
        name:'LessonPlans',
        component:LessonPlans
      },
      {
        path:'sdeptchanged',
        name:'ChangeMajor',
        component:ChangeMajor
      },
      {
        path:'stus/id',
        name:'showinfo',
        component:showinfo
      },
      {
        path:'stus',
        name:'infoeditor',
        component:infoeditor
      }
    ]
  }

]


const router = new VueRouter({
  routes
})
export default router
