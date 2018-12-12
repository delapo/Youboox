<template>
    <div id="menu">
        <section id="save">
            <img src="https://img.icons8.com/metro/1600/save-as.png">
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
            <img src="../assets/4d38a18f-f2e7-4df4-95ed-5cf2332654ed.png">
        </section>
    </div>
</template>

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
</style>
