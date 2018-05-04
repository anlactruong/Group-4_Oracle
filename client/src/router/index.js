import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import JobDetail from '@/components/JobDetail'

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
    }
  ]
})
