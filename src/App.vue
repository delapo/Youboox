<template>
    <div id="app">
        <menu-gauche></menu-gauche>
        <do-undo></do-undo>
        <menu-droite></menu-droite>
        <middle-image></middle-image>
        <drag-drop></drag-drop>
    </div>
</template>

<script>
import MenuGauche from '@/components/MenuGauche'
import MenuDroite from '@/components/MenuDroite'
import DragDrop from '@/components/DragDrop'
import MiddleImage from '@/components/MiddleImage'
import DoUndo from '@/components/DoUndo'

export default {
  name: 'App',
  components: {
    'menu-gauche': MenuGauche,
    'menu-droite': MenuDroite,
    'middle-image': MiddleImage,
    'drag-drop': DragDrop,
    'do-undo': DoUndo
  }
}
</script>
