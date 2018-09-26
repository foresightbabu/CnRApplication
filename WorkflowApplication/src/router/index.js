import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import AdminTask from '../views/tasks/task'
import ClientDashboard from '../components/ClientDashboard'
import CreateTask from '../views/tasks/CreateTask'
import Login from '../views/Common/Login'
import Forgotten from '../views/Common/Forgotten'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/Client/CreateTask',
          name: 'CreateTask',
          component: CreateTask
        }
      ]
    },
    {
      path: '/Client/Dashboard',
      name: 'ClientDashboard',
      component: ClientDashboard
    },
    
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Forgotten',
      name: 'Forgotten',
      component: Forgotten
    }
  ]
})
