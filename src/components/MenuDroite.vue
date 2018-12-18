<template>
    <div id="menu">
        <section id="save" v-for="e in 1" :key="e.id" @mouseover="showSave = e" @mouseout="showSave = null" v-on:click="displayInput">
            <img src="https://img.icons8.com/metro/1600/save-as.png">
            <div id="save_text" v-show="showSave === e"><p>Sauvegarder</p></div>
        </section>
        <div id="download-area"></div>

        <section id="_add" ref="add" v-for="e in 1" :key="e.id" @mouseover="showAdd = e" @mouseout="showAdd = null">
            <img v-bind:class="add_selected" v-on:click="check(1)" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaWv7Z9KZToWdMyUCma8E1jAdzkXd27WIVJ-QuJMurz7s7gLUX_g">
            <div id="add_text" v-show="showAdd === e"><p>Ajouter une case</p></div>
        </section>
        <section id="del" ref="del" v-for="e in 1" :key="e.id" @mouseover="showRm = e" @mouseout="showRm = null">
            <img v-bind:class="delete_selected" v-on:click="check(2)" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaWv7Z9KZToWdMyUCma8E1jAdzkXd27WIVJ-QuJMurz7s7gLUX_g">
            <div id="rm_text" v-show="showRm === e">Supprimer une case</div>
        </section>
        <section id="edit" ref="edit" v-for="e in 1" :key="e.id" @mouseover="showEdit = e" @mouseout="showEdit = null">
            <img v-bind:class="edit_selected" v-on:click="check(3)" src="https://image.freepik.com/icones-gratuites/ecriture-sur-un-cahier-ouvert_318-44015.jpg">
            <div id="edit_text" v-show="showEdit === e">Modifier une case</div>
        </section>
        <section id="move" ref="move" v-for="e in 1" :key="e.id" @mouseover="showMove = e" @mouseout="showMove = null">
            <img v-bind:class="move_selected" v-on:click="check(4)" src="../assets/4d38a18f-f2e7-4df4-95ed-5cf2332654ed.png">
            <div id="move_text" v-show="showMove === e">Déplacer une case</div>
        </section>
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      showAdd: null,
      showRm: null,
      showEdit: null,
      showMove: null,
      showSave: null,
      add_selected: 'not selected',
      delete_selected: 'not selected',
      edit_selected: 'not selected',
      move_selected: 'not selected',
      selected: 0
    }
  },
  methods: {
    check (int) {
      if (int === this.selected) {
        this.selected = 0
        switch (int) {
          case 1:
            this.add_selected = 'not selected'
            break
          case 2:
            this.delete_selected = 'not selected'
            break
          case 3:
            this.edit_selected = 'not selected'
            break
          case 4:
            this.move_selected = 'not selected'
            console.log('coucou')
            break
        }
      } else {
        switch (int) {
          case 1:
            this.selected = 1
            this.add_selected = 'tool_selected'
            console.log('add')
            this.delete_selected = 'not selected'
            this.edit_selected = 'not selected'
            this.move_selected = 'not selected'
            break
          case 2:
            this.selected = 2
            this.add_selected = 'not selected'
            this.delete_selected = 'tool_selected'
            console.log('del')
            this.edit_selected = 'not selected'
            this.move_selected = 'not selected'
            break
          case 3:
            this.selected = 3
            this.add_selected = 'not selected'
            this.delete_selected = 'not selected'
            this.edit_selected = 'tool_selected'
            console.log('edit')
            this.move_selected = 'not selected'
            break
          case 4:
            this.selected = 4
            this.add_selected = 'not selected'
            this.delete_selected = 'not selected'
            this.edit_selected = 'not selected'
            this.move_selected = 'tool_selected'
            console.log('move')
            break
        }
      }
    },
    dlFile () {
      let strWindowName = document.getElementById('jsonName').value
      console.log(strWindowName)
      document.getElementById('download-area').innerHTML = ''
      let fileContent = []
      for (let i = 0; i < document.getElementById('fullGrid').childElementCount; i++) {
        let div = document.getElementById('fullGrid').childNodes[i]
        let x = (parseInt(div.style.left) * 1 >> 0)
        let y = (parseInt(div.style.top) * 1 >> 0)
        let width = (parseInt(div.style.width) * 1 >> 0)
        let height = (parseInt(div.style.height) * 1 >> 0)
        let table = (JSON.parse('{"x":' + x + ',"y":' + y + ',"width":' + width + ',"height":' + height + '}'))
        fileContent = fileContent.concat(table)
      }
      let finalTable = JSON.parse('{"regions_of_interest":' + JSON.stringify(fileContent) + '}')
      let a = document.createElement('a')
      let blob = new Blob([JSON.stringify(finalTable)], {type: 'octet/stream'})
      let url = window.URL.createObjectURL(blob)
      a.href = url
      a.download = strWindowName
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    },
    displayInput () {
      if (document.getElementById('jsonName') === null) {
        let input = document.createElement('input')
        let button = document.createElement('button')
        document.getElementById('download-area').appendChild(input)
        document.getElementById('download-area').appendChild(button)
        input.type = 'text'
        input.placeholder = 'Entrer le nom du Json'
        input.id = 'jsonName'
        button.addEventListener('click', this.dlFile, false)
        button.textContent = 'Télécharger le JSON'
      }
    }
  }
}
</script>

<style>
    #menu {
        position: fixed;
        right: -250px;
        top: -250px;
        width: 500px;
        height: 500px;
        border-radius: 3000px;
        background: #ff4d4d;
        border: 3px solid black;
    }

    #save img {
        width: 62px;
        height: 62px;
        position: absolute;
        bottom: 6px;
        left:6px;
    }

    #save_text {
        position: fixed;
        top: 8%;
        right: 2%;
        padding: 5px;
        border-radius: 20px;
        font-size: 17px;
        background: #e4e4e4;
        border: 2px solid black;
    }

    #save_text p {
        margin-top: auto;
        margin-bottom: auto;
    }

    #save {
        background: white;
        width: 70px;
        height: 70px;
        position: fixed;
        border-radius: 10Px;
        top: 5px;
        right: 5px;
        border: 2px solid black;
    }

    #add {
        position: fixed;
        top: 10px;
        right: 5px;
        width: 200px;
        height: 200px;
        display: contents;
    }

    #_add img {
        display: flex;
        width: 70px;
        height: 70px;
        background: white;
        border-radius: 100px;
        border: 3px solid white;
        position: fixed;
        right: 215px;
        top: 10px;
        -webkit-transform: scale(1) rotate(45deg);
        transform: scale(1) rotate(45deg);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
    }

    #_add img:hover {
        -webkit-transform: scale(1.1) rotate(45deg);
        transform: scale(1.1) rotate(45deg);
    }

    #del img {
        display: flex;
        width: 70px;
        height: 70px;
        background: white;
        border-radius: 100px;
        border: 3px solid white;
        position: fixed;
        right: 185px;
        top: 100px;
        transform: scale(1.1);
        -webkit-transform: scale(1);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
    }

    #del img:hover {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    #edit img:hover {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    #edit img {
        display: flex;
        width: 70px;
        height: 70px;
        background: white;
        border-radius: 100px;
        position: fixed;
        border: 3.5px solid white;
        right: 105px;
        top: 175px;
        z-index: 20;
        transform: scale(1.1);
        -webkit-transform: scale(1);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
    }

    #move img {
        display: flex;
        width: 70px;
        height: 70px;
        background: white;
        border-radius: 100px;
        border: 0.5px solid white;
        position: fixed;
        right: 10px;
        top: 210px;
        z-index: 20;
        transform: scale(1.1);
        -webkit-transform: scale(1);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
    }

    #move img:hover {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    #add_text {
        position: fixed;
        top: 25px;
        right: 90px;
        background: aliceblue;
        padding: 5px;
        border-radius: 20px;
        border: 2px solid black;
    }

    #add_text {
        margin: auto;
        height: 20px;
    }

    #rm_text {
        position: fixed;
        top: 114px;
        right: 50px;
        background: aliceblue;
        padding: 5px;
        border-radius: 20px;
        border: 2px solid black;
    }

    #rm_text p {
        margin: auto;
    }

    #edit_text {
        position: fixed;
        top: 150px;
        right: 10px;
        background: aliceblue;
        padding: 5px;
        border-radius: 20px;
        border: 2px solid black;
        z-index: 100;
    }

    #edit_text p {
        margin: auto;
    }

    #move_text {
        position: fixed;
        top: 275px;
        right: 10px;
        background: aliceblue;
        padding: 5px;
        border-radius: 20px;
        border: 2px solid black;
        z-index: 100;
    }

    #move_text p {
        margin: auto;
    }

    #save_text {
        position: fixed;
    }
    .tool_selected {
        background-color: #ff4d4d !important;
        border: 3.5px solid #ff4d4d !important;
    }
    #download-area {
        position: absolute;
        top: 250px;
        right: 500px;
        z-index: 999;
    }
</style>
