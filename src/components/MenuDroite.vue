<template>
    <div id="menu">
        <section id="save" v-for="e in 15" :key="e.id" @mouseover="showSave = e" @mouseout="showSave = null">
            <img src="https://img.icons8.com/metro/1600/save-as.png">
            <div id="save_text" v-show="showSave === e">Sauvegarder</div>
        </section>
        <section id="add" v-for="e in 15" :key="e.id" @mouseover="showAdd = e" @mouseout="showAdd = null">
            <img src="https://cdn0.iconfinder.com/data/icons/math-business-icon-set/93/1_1-512.png">
            <div id="add_text" v-show="showAdd === e">Ajouter une case</div>
        </section>
        <section id="delete" v-for="e in 15" :key="e.id" @mouseover="showRm = e" @mouseout="showRm = null">
            <img src="https://cdn0.iconfinder.com/data/icons/math-business-icon-set/93/1_1-512.png">
            <div id="rm_text" v-show="showRm === e">Supprimer une case</div>
        </section>
        <section id="edit" v-for="e in 15" :key="e.id" @mouseover="showEdit = e" @mouseout="showEdit = null">
            <img src="https://image.freepik.com/icones-gratuites/ecriture-sur-un-cahier-ouvert_318-44015.jpg">
            <div id="edit_text" v-show="showEdit === e">Modifier une case</div>
        </section>
        <section id="move" v-for="e in 15" :key="e.id" @mouseover="showMove = e" @mouseout="showMove = null">
            <img src="../assets/4d38a18f-f2e7-4df4-95ed-5cf2332654ed.png">
            <div id="move_text" v-show="showMove === e">Déplacer une case</div>
        </section>
    </div>
</template>

<script>
export default {
  el: '#app',
  name: 'app',
  data () {
    return {
      showAdd: null,
      showRm: null,
      showEdit: null,
      showMove: null,
      showSave: null
    }
  }
}
</script>

<style scoped>
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
        width: 72px;
        height: 72px;
        border-radius: 35px;
        position: fixed;
        top: 6px;
        right: 6px;
    }

    #save {
        background: white;
        width: 70px;
        height: 70px;
        border-radius: 35px;
        position: fixed;
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

    #add img {
        display: flex;
        width: 70px;
        height: 70px;
        background: white;
        border-radius: 100px;
        border: 0.5px solid white;
        position: fixed;
        right: 215px;
        top: 10px;
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
    }

    #add img:hover {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    #delete img {
        display: flex;
        width: 70px;
        height: 70px;
        background: white;
        border-radius: 100px;
        border: 0.5px solid white;
        position: fixed;
        right: 185px;
        top: 100px;
        transform: scale(1.1) rotate(45deg);
        -webkit-transform: scale(1) rotate(45deg);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
    }

    #delete img:hover {
        -webkit-transform: scale(1.1);
        transform: scale(1.1) rotate(45deg);
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
        padding: 10px;
        border-radius: 20px;
        border: 2px solid black;
    }
    #rm_text {
        position: fixed;
        top: 114px;
        right: 50px;
        background: aliceblue;
        padding: 10px;
        border-radius: 20px;
        border: 2px solid black;
    }
    #edit_text {
        position: fixed;
        top: 150px;
        right: 10px;
        background: aliceblue;
        padding: 10px;
        border-radius: 20px;
        border: 2px solid black;
        z-index: 100;
    }
    #move_text {
        position: fixed;
        top: 275px;
        right: 10px;
        background: aliceblue;
        padding: 10px;
        border-radius: 20px;
        border: 2px solid black;
        z-index: 100;
    }
    #save_text {
        position: fixed;
        top: 50px;
        right: 50px;
        background: aliceblue;
        padding: 10px;
        border-radius: 20px;
        border: 2px solid black;
        z-index: 100;
    }
</style>
