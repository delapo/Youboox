<template>
    <div id="do-undo">
        <section id="undo" v-for="e in 1" :key="e.id" @mouseover="showSave = e" @mouseout="showSave = null">
            <img id="img-undo" src="https://img.icons8.com/metro/1600/reply-arrow.png">
            <div id="undo_json" v-show="undo === e"><p>undo</p></div>
        </section>
        <section id="do" v-for="e in 1" :key="e.id" @mouseover="showSave = e" @mouseout="showSave = null">
            <img id="img-redo" src="https://img.icons8.com/metro/1600/reply-arrow.png">
            <div id="redo_json" v-show="redo === e"><p>undo</p></div>
        </section>
    </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      undo: null,
      redo: null
    }
  }
}
</script>
<style>
    #undo {
        position: fixed;
        top: -100px;
        left: -100px;
        border-radius: 175px;
        width: 250px;
        height: 250px;
        background: #ff4d4d;
        border: 2px solid black;
        z-index: 100;
    }
    #img-undo{
        -webkit-transition: .7s ease-in-out;
        transition: .7s ease-in-out;
    }
    #img-undo:hover{
        transform: scale(1.3);
        -webkit-transform: scale(1.3);
    }
    #img-redo{
            -webkit-transition: .7s ease-in-out;
            transition: .7s ease-in-out;
        transform: scale(1) rotate(180deg);

    }
    #img-redo:hover{
        transform: scale(1.3) rotate(180deg);
        -webkit-transform: scale(1.3) rotate(180deg);
    }
    #undo img, #do img {
        width: 90px;
        height: 90px;
        position: fixed;
        top: 40px;
        z-index: 100;
        left: 0;
        border-radius: 100px;
    }
    #do img{
        top: 5px;
        left: 50px;
    }
</style>
