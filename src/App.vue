<template>
  <div id="app">
    <menu-gauche></menu-gauche>
    <menu-droite></menu-droite>
    <drag-drop></drag-drop>
    <router-view/>
  </div>
</template>

<script>
import MenuGauche from '@/components/MenuGauche'
import MenuDroite from '@/components/MenuDroite'
import DragDrop from '@/components/DragDrop'
export default {
  name: 'App',
  components: {
    'menu-gauche': MenuGauche,
    'menu-droite': MenuDroite,
    'drag-drop': DragDrop
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
