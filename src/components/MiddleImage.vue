<template>
    <div id="middleImage">
        <section id="prev">
            <img ref="prev" src="https://www.dsbrowser.com/documentation/images/8/8d/Fleche-droite.png">
        </section>
        <section id="BD_show">
            <img id="imageCenter"/>
        </section>
        <section id="next">
            <img ref="next" src="https://www.dsbrowser.com/documentation/images/8/8d/Fleche-droite.png">
        </section>
    </div>
</template>

<script>
export default {
  name: 'middle-image',
  methods: {
  }
}
</script>

<style>
    #next {
        width: 70px;
        height: 70px;
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 5.5%;
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
        width: 50px;
        height: 50px;
        position: absolute;
        z-index: 1;
        top: 10px;
        left: 10px;
        border-radius: 35px;
        transform: scale(-1, 1);
    }

    #prev {
        width: 70px;
        height: 70px;
        position: absolute;
        z-index: 1;
        top: 50%;
        right: 18%;
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
        width: 50px;
        height: 50px;
        position: absolute;
        z-index: 1;
        top: 10px;
        left: 10px;
        background: black;
        border-radius: 35px;
        -webkit-user-drag: none;
    }

    #BD_show img {
        top: 30px;
        left: 1%;
        width: 85%;
        position: relative;
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
        background: rgba(255, 77, 77, 0.5);
        -webkit-user-select: none;
        -moz-user-select: none;
    }
    .zz {
        color:red;
    }
    #fullGrid {
        position: absolute;
        left: 11%;
        top: 30px;
        width: 70%;
    }
</style>
