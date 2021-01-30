import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import User from './components/User.vue'
import Information from './components/Information.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/', redirect:'/login'
  },
  {
    path: '/login', 
    component: Login
  },
  {
    path: '/home', 
    component: Home, 
    redirect: '/welcome',
    children:[{ path: '/welcome', 
      component: Welcome },
    {path:'/user', component:User},{
      path:'/information', component:Information
    }]
  },
 
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  //to要访问的路径
  //from代表从哪个路径跳转而来
  //next是一个函数，表示放行
  //next()放行 next('/login')强制跳转
  if(to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()

})

export default router