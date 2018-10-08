import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Layout from '../views/layout/Layout'
import AdminTask from '../views/tasks/task'
import Login from '../views/Common/Login'
import Forgotten from '../views/Common/Forgotten'
import ClientList from '../views/ClientMaster/List'
import UserList from '../views/User/List'
 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'HelloWorld',
          component: HelloWorld
        },
        {
          path: '/admin/tasks',
          name: 'AdminTask',
          component: AdminTask
        }
      ]
    },
    {
      path: '/client',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'ClientList',
          component: ClientList
        }
      ]
    },
    {
      path: '/user',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'UserList',
          component: UserList
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forgotten',
      name: 'Forgotten',
      component: Forgotten
    }
  ]
})
