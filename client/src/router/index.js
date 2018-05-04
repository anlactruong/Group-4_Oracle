import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import JobDetail from '@/components/JobDetail'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/:jobUrl',
      name: 'job detail',
      component: JobDetail,
      props: true
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
