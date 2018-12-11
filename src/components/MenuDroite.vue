<template>
    <div id="menu">
        <section id="save">
            <img src="https://png2.kisspng.com/20180701/url/kisspng-computer-icons-floppy-disk-hard-drives-creative-technology-5b388cfddeae08.9101295715304327659121.png">
        </section>
        <section id="add">
            <img src="https://cdn0.iconfinder.com/data/icons/math-business-icon-set/93/1_1-512.png">
        </section>
        <section id="delete">
            <img src="https://cdn0.iconfinder.com/data/icons/math-business-icon-set/93/1_1-512.png">
        </section>
        <section id="edit">
            <img src="https://image.freepik.com/icones-gratuites/ecriture-sur-un-cahier-ouvert_318-44015.jpg">
        </section>
        <section id="move">
            <img src="4d38a18f-f2e7-4df4-95ed-5cf2332654ed.png">
        </section>
    </div>
</template>

<script>
export default {
  name: 'MenuDroite',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
    #menu {
        position: absolute;
        right: 0;
        top: 0;
        width: 7%;
        height: 100%;
        background: #ff4d4d;
    }

    #save img {
        width: 45px;
        height: 45px;
        border-radius: 23px;
        position: absolute;
        top: 2px;
        right: 2px;
    }

    #save {
        background: white;
        width: 50px;
        height: 50px;
        border-radius: 30px;
        position: absolute;
        top: 5px;
        right: 5px;
        border: 2px solid black;
    }

    #add {
        position: absolute;
        top: 10px;
        right: 5px;
        width: 200px;
        height: 200px;
        display: contents;
    }

    #add img {
        display: flex;
        width: 100px;
        height: 100px;
        background: white;
        border-radius: 100px;
        position: absolute;
        right: 57px;
        top: 50px;
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
        width: 100px;
        height: 100px;
        background: white;
        border-radius: 100px;
        position: absolute;
        right: 57px;
        top: 250px;
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
        width: 95px;
        height: 95px;
        background: white;
        border-radius: 100px;
        position: fixed;
        border: 4px solid white;
        right: 57px;
        top: 450px;
        z-index: 20;
        transform: scale(1.1);
        -webkit-transform: scale(1);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
    }

    #move img {
        display: flex;
        width: 95px;
        height: 95px;
        background: white;
        border-radius: 100px;
        position: fixed;
        right: 57px;
        top: 650px;
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
</style>
