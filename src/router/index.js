import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import MenuGauche from '@/components/MenuGauche'
import MenuDroite from '@/components/MenuDroite'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      //  name: 'MenuGauche',
      component: {
        'menu-gauche': MenuGauche,
        'menu-droite': MenuDroite
      }
    }
  ]
})
