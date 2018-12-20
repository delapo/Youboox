<template>
    <div id="middleImage">
        <section id="prev" v-for="e in 1" :key="e.id" @mouseover="showMove= e" @mouseout="showMove = null">
        <img ref="prev" src="https://www.dsbrowser.com/documentation/images/8/8d/Fleche-droite.png">
            <div id="move_text1" v-show="showMove === e">Suivant</div>
        </section>
        <section id="BD_show">
            <img id="imageCenter"/>
        </section>
        <section id="next" v-for="e in 1" :key="e.id" @mouseover="shownext = e" @mouseout="shownext = null">
            <img ref="next" src="https://www.dsbrowser.com/documentation/images/8/8d/Fleche-droite.png">
            <div id="move_text1" v-show="shownext === e">Précédent</div>
        </section>
    </div>
</template>

<script>
export default {
  name: 'middle-image',
  data () {
    return {
      showMove: null,
      shownext: null

    }
  },
  methods: {
  }
}
</script>

<style>
    body{
        background-image: url('https://youboox.fr/assets/notsupported/colibri_blanc.png');
        background-repeat: no-repeat;
        background-size: 1000px;
        background-position: 100px 100px;
        background-color: rgba(109, 109, 109, 0.07);
    }

    #next {
        width: 80px;
        height: 80px;
        position: absolute;
        z-index: 1;
        top:0;
        margin-right: 0;
        left:32% ;
        background: black;
        border-radius: 50px;
        transform: scale(1.1);
        -webkit-transform: scale(1);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
    }

    #next:hover {
        transform: scale(1);
        -webkit-transform: scale(1.1);
    }

    #next img {
        width: 60px;
        height: 60px;
        position: absolute;
        z-index: 1;
        top: 10px;
        left: 10px;
        border-radius: 35px;
        transform: scale(-1, 1);
    }

    #prev {
        width: 80px;
        height: 80px;
        position: absolute;
        z-index: 1;
        top:0;
        right: 37%;
        background: black;
        border-radius: 50px;
        transform: scale(1.1);
        -webkit-transform: scale(1);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -webkit-user-drag: none;
    }
    #prev:hover {
        transform: scale(1);
        -webkit-transform: scale(1.1);

    }

    #prev img {
        width: 60px;
        height: 60px;
        position: absolute;
        z-index: 1;
        top: 10px;
        left: 10px;
        background: black;
        border-radius: 35px;
        -webkit-user-drag: none;
    }

    #BD_show img {
        top: 100px;
        left: 2.5%;
        position: absolute;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -webkit-user-drag: none;
        z-index: -50;
    }
    .bd {
        font-size: 30px;
        background: rgba(255, 255, 255, 0.5);
        -webkit-user-select: unset;
        -moz-user-select: unset;
        resize: both;
        overflow: auto;
    }
    .bd p {
        margin: 5px;
        padding-left: 10px;
         border: black 2px solid;
        width: 30px;
        height: 30px;
        background: rgba(109, 109, 109, 0.7);
        -webkit-user-select: none;
        -moz-user-select: none;
    }
    .zz {
        color:#bf2512;
    }
    #middleImage {
        z-index: 0;
        border: none;
    }

    #move_text1 {
        position: fixed;
        top: 72px;
        right: 10px;
        background: aliceblue;
        padding: 5px;
        border-radius: 20px;
        border: 2px solid black;
        z-index: 100;
    }

    #move_text1 p {
        margin: auto;
    }
    #logo{
        background: rgba(17, 17, 17, 0.15);
        border-radius: 50%;
        margin-left: auto;
        margin-right: 30%;
        margin-top: 2%;
        width: 900px;
        height: 900px;
        display: block;
        z-index: -100;
    }
    #logo img{
        width: 700px;
        height: 500px;
        margin-right: 30%;
        display: block;
        margin-left: 20px;
        float: left;
        margin-top: 23%;
        opacity: 0.3;
        z-index: -90;
    }
</style>
