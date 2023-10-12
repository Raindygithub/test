import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.use(ElementUI);

/*导入axios*/
import axios from "axios";
/*全局绑定axios*/
Vue.prototype.$axios = axios;

/*导入qs*/
import qs from 'qs';
/*全局绑定*/
Vue.prototype.$qs = qs;

/*引入mock数据*/
require('./mock/LoginService.js')
// 引入组件：
import Vant from 'vant'

// 引入组件css：
import 'vant/lib/index.css'

// 注册组件：
Vue.use(Vant)

import Component from '@/views/compotents'
Vue.use(Component) // 注册自己的插件

//引入民族数据
import global from './utils/global'//引用模块进来
 Vue.prototype.GLOBAL = global //挂载到Vue实例上面


//引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 在main.js文件中引入
import Print from 'vue-print-nb'
Vue.use(Print)

import splitPane from 'vue-splitpane'
// 注册为全局组件
Vue.component('split-pane', splitPane);




new Vue({
  el: '#app',
  render: h => h(App),
  router
});
