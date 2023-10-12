/*绑定Mock*/
const Mock = require('mockjs');
const Random = Mock.Random;

/*设置一个返回数据的通用结果*/
let result = {
  code:'',
  msg: '',
  data: {
  }
}

/*模拟数据库信息*/
let username = 'xiaolong';
let password = '123456';
let verityCode = 'abcde';

/**
 * 模拟验证码
 */
Mock.mock('/getVerifyCode', 'get', () => {
  result.data = {
    codeToken: Random.string(32),
    codeImg: Random.dataImage('75x40', verityCode)
  }
  return result;
})

/**
 * 拦截登陆请求
 */
Mock.mock('/login', 'post', (req) => {
  // 获取请求数据
  let from = JSON.parse(req.body);
  //判断验证码
  if (verityCode === from.code) {
    // 验证账户
    if (username === from.username) {
      // 验证密码
      if (password === from.password) {
        result.code=1
        result.msg = '登陆成功'
        result.data = {
          'level':1
        }
      } else {
        result.code=0
        result.msg = '密码错误'
        result.data = {
          'level':1
        }
      }
    } else {
      result.code=0
      result.msg = '用户不存在'
      result.data = {
        'level':1
      }
    }
  } else {
    result.msg = '验证码错误'
    result.data = {
      'level':1
    }
  }
  return result;
})

Mock.mock('/emp','get',()=>{
        result.code=1
        result.msg = ''
        result.data = {
          'username':'mark',
          'email':'123@qq.com',
          'epost':'收银员',
          'dadd':'山东省威海市山东大学',
          'esalary':2000,
          'esex':'女',
          'epic':'../../assets/img/V.png'
        }
        return result;
})

Mock.mock('/emp/shouyin','post',(req)=>{
     let from = JSON.parse(req.body); 
    result.code=1;
    result.msg='成功';
    console.log("号码是"+from.params.id);
    result.data={
      'id':from.params.id,
      'name':'hello',
      'src':'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',
      'init_price':30,
      'num':1
    };
    return result;
})

Mock.mock('/emp/ProductEntry','post',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='成功';
  console.log(from);

  return result;
})

Mock.mock('/emp/person/infoeditor','post',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  console.log(from);

  return result;
})

Mock.mock('/emp/person/imageUp','post',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  console.log(from);

  return result;
})

Mock.mock('/emp/person/countcontrol','post',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  console.log(from);

  return result;
})

Mock.mock(RegExp('/emp/vipList'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  console.log(from);
  result.data=[
    {'vno':'2190949','vname':'fool','vph':'12513152','num':10,'eno':'14124321','state':1},
    {'vno':'2190949','vname':'fool','vph':'12513152','num':10,'eno':'14124321','state':1},
    {'vno':'2190949','vname':'fool','vph':'12513152','num':10,'eno':'14124321','state':1},
    {'vno':'2190949','vname':'fool','vph':'12513152','num':10,'eno':'14124321','state':1},
    {'vno':'2190949','vname':'fool','vph':'12513152','num':10,'eno':'14124321','state':0},
    {'vno':'2190949','vname':'fool','vph':'12513152','num':10,'eno':'14124321','state':1},
    {'vno':'2190949','vname':'fool','vph':'12513152','num':10,'eno':'14124321','state':1},
    {'vno':'2190949','vname':'fool','vph':'12513152','num':10,'eno':'14124321','state':1},
    {'vno':'2190949','vname':'fool','vph':'12513152','num':10,'eno':'14124321','state':1},
    {'vno':'2190949','vname':'fool','vph':'12513152','num':10,'eno':'14124321','state':0},
    {'vno':'2190949','vname':'fool','vph':'12513152','num':10,'eno':'14124321','state':1},
    {'vno':'2190949','vname':'fool','vph':'12513152','num':10,'eno':'14124321','state':1},
    {'vno':'2190949','vname':'fool','vph':'12513152','num':10,'eno':'14124321','state':1},
    {'vno':'2190949','vname':'fool','vph':'12513152','num':10,'eno':'14124321','state':1},
    {'vno':'2190949','vname':'fool','vph':'12513152','num':10,'eno':'14124321','state':0},
  ]

  return result;
})

Mock.mock(RegExp('/emp/vipList/vno'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  console.log("form:"+from);
  result.data={'vno':'hello'};

  return result;
})

Mock.mock('/emp/vipList/vno','post',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  console.log("form:"+from);
  result.data={'vno':'hello'};

  return result;
})

Mock.mock(RegExp('/emp/suppliers'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  console.log("form:"+from);
  result.data=[
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
  ]

  return result;
})

Mock.mock(RegExp('/emp/Manufacturers'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  console.log("form:"+from);
  result.data=[
    {c_no:'112',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
  ]

  return result;
})


Mock.mock('/emp/Suppliers','post',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  result.data=null;

  return result;
})

Mock.mock('/emp/suppliers/search','post',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  result.data=[
    {g_no:'122',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
    {g_no:'111',g_name:'ma',g_add:'dsads',g_link:'1351',g_pho:'3215243251'},
  ];

  return result;
})

Mock.mock('/emp/Manufacturers/search','post',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  result.data=[
    {c_no:'554',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
    {c_no:'331',c_name:'sdjas',c_add:'sdlakgjl',c_pho:'dsaga31'},
  ];

  return result;
})


Mock.mock('/emp/Manufacturers','post',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  result.data=null;

  return result;
})


 Mock.mock(RegExp('/emp/empControl'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  console.log("form:"+from);
  result.data=[
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
    {e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000},
  ]

  return result;
}) 

Mock.mock('/emp/empControl','put',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  result.data=null;

  return result;
})

Mock.mock(RegExp('/emp/empControl/e_no'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  result.data={e_no:'hhh',e_name:'sd',e_sex:'mail',e_post:'shy',e_salary:1000};
  console.log(result.data);
  return result;
})

Mock.mock('/emp/empControl/update','post',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  result.data=null;

  return result;
})

Mock.mock(RegExp('/emp/InventoryManagement'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  result.data=[
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
    {p_no:'hhh',g_no:'hs',c_no:'hso',g_name:'jlos',g_type:2,g_price:20,g_num:1,g_t:'124',g_b:'232',p_state:2,g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675'},
  ];
  console.log(result.data);
  return result;
})


Mock.mock(RegExp('emp/sales/salesList/product'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  result.data=[
    {top:1,p_no:'hhh',g_name:'jlos',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',x_price:20,x_num:9,sum_price:180},
    {top:1,p_no:'hhh',g_name:'jlos',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',x_price:20,x_num:9,sum_price:180},
    {top:1,p_no:'hhh',g_name:'jlos',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',x_price:20,x_num:9,sum_price:180},
  ];
  console.log(req);
  return result;
})

Mock.mock('/emp/InventoryManagement','post',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  result.data=null;
  console.log(result.data);
  return result;
})


Mock.mock(RegExp('emp/sales/salesList/emp'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  result.data=[
    {top:1,e_no:'hhh',e_name:'jlos',e_pic:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',sum_price:180},
    {top:1,e_no:'hhh',e_name:'jlos',e_pic:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',sum_price:180},
    {top:1,e_no:'hhh',e_name:'jlos',e_pic:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',sum_price:180},
    {top:1,e_no:'hhh',e_name:'jlos',e_pic:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',sum_price:180},
    {top:1,e_no:'hhh',e_name:'jlos',e_pic:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',sum_price:180}
  ];
  console.log(req);
  return result;
})

Mock.mock(RegExp('emp/sales/cashRegisterRecords'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  result.data=[
    {s_no:'hh',x_no:'hs',p_no:'sss',g_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',x_price:30,x_num:3,s_sum:9,s_discount:0.5,s_pay:89},
    {s_no:'hh',x_no:'hs',p_no:'sss',g_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',x_price:30,x_num:3,s_sum:9,s_discount:0.5,s_pay:89},
    {s_no:'hh',x_no:'hs',p_no:'sss',g_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',x_price:30,x_num:3,s_sum:9,s_discount:0.5,s_pay:89},
    {s_no:'hh',x_no:'hs',p_no:'sss',g_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',x_price:30,x_num:3,s_sum:9,s_discount:0.5,s_pay:89},
    {s_no:'hh',x_no:'hs',p_no:'sss',g_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',x_price:30,x_num:3,s_sum:9,s_discount:0.5,s_pay:89},
    {s_no:'hh',x_no:'hs',p_no:'sss',g_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',x_price:30,x_num:3,s_sum:9,s_discount:0.5,s_pay:89},
    {s_no:'hh',x_no:'hs',p_no:'sss',g_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',x_price:30,x_num:3,s_sum:9,s_discount:0.5,s_pay:89},
    {s_no:'hh',x_no:'hs',p_no:'sss',g_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',x_price:30,x_num:3,s_sum:9,s_discount:0.5,s_pay:89},
    {s_no:'hh',x_no:'hs',p_no:'sss',g_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',x_price:30,x_num:3,s_sum:9,s_discount:0.5,s_pay:89},

  ];
  console.log(req);
  return result;
})



Mock.mock(RegExp('emp/sales/purchaseRecords'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  result.data=[
    {j_no:'hs',p_no:'sss',j_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',j_price:30,j_num:3,s_sum:9,s_pay:89},
    {j_no:'hs',p_no:'sss',j_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',j_price:30,j_num:3,s_sum:9,s_pay:89},
    {j_no:'hs',p_no:'sss',j_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',j_price:30,j_num:3,s_sum:9,s_pay:89},
    {j_no:'hs',p_no:'sss',j_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',j_price:30,j_num:3,s_sum:9,s_pay:89},
    {j_no:'hs',p_no:'sss',j_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',j_price:30,j_num:3,s_sum:9,s_pay:89},
    {j_no:'hs',p_no:'sss',j_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',j_price:30,j_num:3,s_sum:9,s_pay:89},
    {j_no:'hs',p_no:'sss',j_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',j_price:30,j_num:3,s_sum:9,s_pay:89},
    {j_no:'hs',p_no:'sss',j_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',j_price:30,j_num:3,s_sum:9,s_pay:89},
    {j_no:'hs',p_no:'sss',j_name:'sssll',g_image:'https://img1.baidu.com/it/u=4030662401,269078702&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=675',j_price:30,j_num:3,s_sum:9,s_pay:89},
    
  ];
  console.log(req);
  return result;
})


Mock.mock('/emp/sales/salesReports','post',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  result.data={
    "salesName":['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            "salesData":[20, 932, 901, 934, 1290, 1330, 1320],
            "cusDate":['0', '1', '2', '3', '4', '5', '6'],
            "cusData":[20, 10, 60, 100, 300, 600, 400],
            "vip":['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            "vipData":[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135, 162.2, 32.6, 20.0, 6.4, 3.3],
            "CusData":[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175, 182.2, 48.7, 18.8, 6.0, 2.3],
            "sumData":[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
            "vipPro":[
                        { value: 40, name: 'rose 1' },
                        { value: 38, name: 'rose 2' },
                        { value: 32, name: 'rose 3' },
                        { value: 30, name: 'rose 4' },
                        { value: 28, name: 'rose 5' },
                        { value: 26, name: 'rose 6' },
                        { value: 22, name: 'rose 7' },
                        { value: 18, name: 'rose 8' }
                    ],
            "sumPro":[
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ],
            "sums":8000,
            "num":200,
            "vipnum":100,
            "cusnum":300,


  }
  console.log(from);
  return result;
})


import { weekCourse} from "../js/Timetable";
Mock.mock(RegExp('stu/class'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='查询成功';
  result.data=weekCourse;
  console.log(req);
  return result;
})

Mock.mock(RegExp('stu/alterclass'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='查询成功';
  result.data=[
    {condetial:'12125133',cno:'1351',tname:'赵斌',classRoom:'商学院250',cdate:'1-16周第二大节',classNumber:40},
    {condetial:'12125123',cno:'1351',tname:'赵斌',classRoom:'商学院250',cdate:'1-16周第二大节',classNumber:40},
    {condetial:'12151523',cno:'1351',tname:'赵斌',classRoom:'商学院250',cdate:'1-16周第二大节',classNumber:40},
    {condetial:'12125023',cno:'1351',tname:'赵斌',classRoom:'商学院250',cdate:'1-16周第二大节',classNumber:40},
    {condetial:'12825123',cno:'1351',tname:'赵斌',classRoom:'商学院250',cdate:'1-16周第二大节',classNumber:40},
    {condetial:'12124123',cno:'1351',tname:'赵斌',classRoom:'商学院250',cdate:'1-16周第二大节',classNumber:40}
  ]
  console.log(req);
  return result;
})


Mock.mock('/stu/alterclass/condetial','post',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='选课成功';
  result.data=null;
  console.log(req);
  return result;
})

Mock.mock('/stu/alterclass/condetial','post',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='退选成功';
  result.data=null;
  console.log(req);
  return result;
})

Mock.mock(RegExp('/stu/grades'+".*"),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='退选成功';
  result.data=[
    {
      title:"2021-2022-1学期",
      tableData:[
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
      ]
    },
    {
      "title":"2021-2022-1学期",
      "tableData":[
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
      ]
    },
    {
      "title":"2021-2022-1学期",
      "tableData":[
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
      ]
    },
    {
      "title":"2021-2022-1学期",
      "tableData":[
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
      ]
    },
    {
      "title":"2021-2022-1学期",
      "tableData":[
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
        {cname:'1',ctype:'s;a',ccredits:'3',ctime:'67',Grade:90},
      ]
    }
  ];
  console.log(req);
  return result;
})


Mock.mock(RegExp('stu/lessonPlans/sno'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='查询成功';
  result.data=[
    {condetial:'215124',cname:'mess',csemester:'2022-2023-1',collage:'开设学院',cnature:'必修',ctype:'人文教育类',ccredits:4,ctime:70,ctest:'线下考试'},
    {condetial:'215124',cname:'mess',csemester:'2022-2023-1',collage:'开设学院',cnature:'必修',ctype:'人文教育类',ccredits:4,ctime:70,ctest:'线下考试'},
    {condetial:'215124',cname:'mess',csemester:'2022-2023-1',collage:'开设学院',cnature:'必修',ctype:'人文教育类',ccredits:4,ctime:70,ctest:'线下考试'},
    {condetial:'215124',cname:'mess',csemester:'2022-2023-1',collage:'开设学院',cnature:'必修',ctype:'人文教育类',ccredits:4,ctime:70,ctest:'线下考试'},
    {condetial:'215124',cname:'mess',csemester:'2022-2023-1',collage:'开设学院',cnature:'必修',ctype:'人文教育类',ccredits:4,ctime:70,ctest:'线下考试'},
    {condetial:'215124',cname:'mess',csemester:'2022-2023-1',collage:'开设学院',cnature:'必修',ctype:'人文教育类',ccredits:4,ctime:70,ctest:'线下考试'},
    {condetial:'215124',cname:'mess',csemester:'2022-2023-1',collage:'开设学院',cnature:'必修',ctype:'人文教育类',ccredits:4,ctime:70,ctest:'线下考试'},
    {condetial:'215124',cname:'mess',csemester:'2022-2023-1',collage:'开设学院',cnature:'必修',ctype:'人文教育类',ccredits:4,ctime:70,ctest:'线下考试'},
  ];
  console.log(req);
  return result;
})

Mock.mock(RegExp('stu/sdeptchanged'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=2;
  result.msg='查询成功';
  result.data=[
    {rcollagename:'计算机',collagename:'金融',state:1,id:'hello',stime:'2021-01-2 20',jtime:'2021-01-2 21'},
    {rcollagename:'计算机',collagename:'金融',state:1,id:'sss',stime:'2021-01-2 20',jtime:'2021-01-2 21'},
    {rcollagename:'计算机',collagename:'金融',state:1,id:'sdf',stime:'2021-01-2 20',jtime:'2021-01-2 21'},
  ];
  console.log(req);
  return result;
})

Mock.mock(RegExp('stu/sdeptchanged/table'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='查询成功';
  result.data=[
    {temp:'sd',user:'hs',yi:'',time:'2021',result:'ty'},
    {temp:'sd',user:'hs',yi:'ty',time:'2021',result:'ty'},
  ];
  console.log(req);
  return result;
})

Mock.mock('/stu/sdeptchanging','post',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='提交成功';
  result.data=null;
  console.log(req);
  return result;
})

Mock.mock(RegExp('/stu/stus/sno'+'.*'),'get',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='提交成功';
  result.data={
    sno:"202100400030",
    sname:"赵构够",
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
  };
  console.log(req);
  return result;
})

Mock.mock('/stu/stus','put',(req)=>{
  let from = JSON.parse(req.body); 
  result.code=1;
  result.msg='修改成功';
  result.data=null;
  console.log(req);
  return result;
})