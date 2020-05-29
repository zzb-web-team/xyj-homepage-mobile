import Vue from 'vue'
import VueRouter from 'vue-router'
// import index from '@/pages/login/index'
// import parameter from '@/pages/login/parameter'
// import income from '@/pages/login/income'
// import problem from '@/pages/login/problem'
// import loginactive from '@/pages/login/loginactive'
// import buying from '@/pages/login/buying'
// import userinfoIndex from '@/pages/login/userinfoIndex'
// import userinfolist from '@/pages/login/userinfolist'
// import userdevice from '@/pages/login/userdevice'
// import userinfocenter from '@/pages/login/userinfocenter'
// import privacy from '@/pages/login/privacy'
// import protocol from '@/pages/login/protocol'
// import bill from '@/pages/login/bill'
// import managementnew from '@/pages/login/managementnew'
// import promotion from '@/pages/login/promotion'




// import login from '@/pages/login/login'
// import loginCode from '@/pages/login/loginCode'
// import protocol from '@/pages/login/protocol'
// import find from '@/pages/login/find'
// import binding from '@/pages/login/binding'
// import username from '@/pages/login/username'

// import minemachine from '@/pages/income/minemachine'
// import ranking from '@/pages/income/ranking'
// import allranking from '@/pages/income/allranking'
// import bill from '@/pages/income/bill'
// import recording from '@/pages/income/recording'
// import tomoney from '@/pages/income/tomoney'


// import management from '@/pages/management/management'
// import managementinfo from '@/pages/management/managementinfo'
// import mining from '@/pages/management/mining'


// import usercenter from '@/pages/userinfo/usercenter'
// import user from '@/pages/userinfo/user'
// import changephone from '@/pages/userinfo/changephone'
// import password from '@/pages/userinfo/password'
// import transactionword from '@/pages/userinfo/transactionword'
// import about from '@/pages/userinfo/about'
// import privacy from '@/pages/userinfo/privacy'
// import message from '@/pages/userinfo/message'














Vue.use(VueRouter)
  const routes= [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['../pages/login/index'],resolve)
    },

 
    {
      path:'/parameter',
      name:'parameter',
      component: resolve => require(['../pages/login/parameter'],resolve)
  },
    {
      path:'/income',
      name:'income',
  
      component: resolve => require(['../pages/login/income'],resolve)

      
  }, 
  {
    path:"/buying",
    name:'buying',
    component: resolve => require(['../pages/login/buying'],resolve)
  },
    {
      path:'/problem',
      name:'problem',
      component: resolve => require(['../pages/login/problem'],resolve)
    },
    {
      path:"/loginactive",
      name:"loginactive",
      component: resolve => require(['../pages/login/loginactive'],resolve)
    },
    {
      path:'/userinfoIndex',
      name:'userinfoIndex',
      component: resolve => require(['../pages/login/userinfoIndex'],resolve)
    },
    {
      path:"/userinfolist",
      name:'userinfolist',
      component: resolve => require(['../pages/login/userinfolist'],resolve)
    },
    {
      path:"/userdevice",
      name:"userdevice",
      component: resolve => require(['../pages/login/userdevice'],resolve)
    },
    {
      path:"/userinfocenter",
      name:"userinfocenter",
      component: resolve => require(['../pages/login/userinfocenter'],resolve)

    },
    {
      path:"/privacy",
      name:'privacy',
      component: resolve => require(['../pages/login/privacy'],resolve)
    },
    {
      path:"/protocol",
      name:"protocol",
      component: resolve => require(['../pages/login/protocol'],resolve)
    },
    {
      path:"/bill",
      name:"bill",
      component: resolve => require(['../pages/login/bill'],resolve)
    },
    {
      path:"/managementnew",
      name:"managementnew",
      component: resolve => require(['../pages/login/managementnew'],resolve)
    },
    {
      path:"/promotion",
      name:"promotion",
      component: resolve => require(['../pages/login/promotion'],resolve)
    }
    
  

    
  ]
  
const router = new VueRouter({
  routes: routes
})




 
export default router;
