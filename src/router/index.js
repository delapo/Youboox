import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import MenuGauche from '@/components/MenuGauche'
import MenuDroite from '@/components/MenuDroite'
import DragDrop from '@/components/DragDrop'
import MiddleImage from '@/components/MiddleImage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      //  name: 'MenuGauche',
      component: {
        'menu-gauche': MenuGauche.default,
        'menu-droite': MenuDroite.default,
        'drag-drop': DragDrop.default,
        'middle-image': MiddleImage
      }
    }
  ]
})
