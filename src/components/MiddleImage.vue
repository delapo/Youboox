<template>
    <div id="middleImage">
        <section id="prev">
            <img src="https://www.dsbrowser.com/documentation/images/8/8d/Fleche-droite.png">
        </section>
        <section id="BD_show">
            <img id="imageCenter"/>
        </section>
        <section id="next">
            <img src="https://www.dsbrowser.com/documentation/images/8/8d/Fleche-droite.png">
        </section>
    </div>
</template>

<script>
export default {
  name: 'middle-image',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
    #next {
        width: 70px;
        height: 70px;
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 5%;
        background: black;
        border-radius: 50px;
        transform: scale(1.1);
        -webkit-transform: scale(1);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
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
        left: 70%;
        background: black;
        border-radius: 50px;
        transform: scale(1.1);
        -webkit-transform: scale(1);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
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
    }

    #BD_show img {
        top: 0;
        left: 5%;
        width: 70%;
        position: absolute;
    }
</style>
