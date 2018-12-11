<template>
    <div id="menu_gauche2">
    </div>
</template>

<script>
import MenuDroite from './MenuDroite'
export default {
  name: 'MenuGauche',
  components: {MenuDroite},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
    #menu_gauche2 {
        width: 250px;
        height: 73%;
        position: absolute;
        border-radius: 5px;
        border: 3px solid #ff4d4d;
        bottom: 10px;
        left: 10px;
        padding: 10px;
        overflow-y: scroll;
    }
</style>
