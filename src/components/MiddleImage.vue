<template>
    <div id="middleImage">
        <section id="prev" v-for="e in 1" :key="e.id" @mouseover="showMove= e" @mouseout="showMove = null">
        <img ref="prev" src="https://www.dsbrowser.com/documentation/images/8/8d/Fleche-droite.png">
            <div id="move_text1" v-show="showMove === e">Next</div>
        </section>
        <section id="BD_show">
            <img id="imageCenter"/>
        </section>
        <section id="next" v-for="e in 1" :key="e.id" @mouseover="shownext = e" @mouseout="shownext = null">
            <img ref="next" src="https://www.dsbrowser.com/documentation/images/8/8d/Fleche-droite.png">
            <div id="move_text1" v-show="shownext === e">Prev</div>
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
    #next {
        width: 50px;
        height: 50px;
        position: fixed;
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
        width: 30px;
        height: 30px;
        position: absolute;
        z-index: 1;
        top: 10px;
        left: 10px;
        border-radius: 35px;
        transform: scale(-1, 1);
    }

    #prev {
        width: 50px;
        height: 50px;
        position: fixed;
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
        width: 30px;
        height: 30px;
        position: fixed;
        z-index: 1;
        top: 10px;
        left: 10px;
        background: black;
        border-radius: 35px;
        -webkit-user-drag: none;
    }

    #BD_show img {
        top: 60px;
        position: absolute;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -webkit-user-drag: none;
        z-index: -50;
    }
    .bd {
        font-size: 45px;
        background: rgba(255, 255, 255, 0.5);
        -webkit-user-select: unset;
        -moz-user-select: unset;
    }
    .bd p {
        margin: 10px;
        padding-left: 25px;
    border: black 2px solid;
        border-radius: 50px;
        width: 50px;
        background: rgba(255, 66, 39, 0.7);
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

</style>
