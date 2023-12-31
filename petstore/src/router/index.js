import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Form from '@/components/Form'
import Main from '@/components/Main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'iMain',
      component: Main,
      props : true
    },
    {
      path : '/form',
      name : 'Form',
      component : Form,
      props : true
    },
    {
      path : '*',
      redirect : '/'
    }
  ]
})
