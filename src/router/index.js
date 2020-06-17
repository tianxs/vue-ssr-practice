import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PageOne from '@/components/PageOne'
import PageTwo from '@/components/PageTwo'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
      },
      {
        path: '/PageOne',
        name: 'PageOne',
        component: PageOne
      },
      {
        path: '/PageTwo',
        name: 'PageTwo',
        component: PageTwo
      }
    ]
  })
}

