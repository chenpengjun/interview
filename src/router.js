import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component:()=> import('./views/index.vue') ,
      meta:{
        title:'测试',
        keepAlive:true
      }
    }
  ]
})
routes.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default routes