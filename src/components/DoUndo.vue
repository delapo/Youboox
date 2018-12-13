<template>
    <div id="do-undo">
        <section id="undo">
            <img id="img-undo" src="https://img.icons8.com/metro/1600/reply-arrow.png">
            <div id="undo_json" v-show="undo === e"><p>undo</p></div>
        </section>
        <section id="do">
            <img id="img-redo" src="https://img.icons8.com/metro/1600/reply-arrow.png">
            <div id="redo_json" v-show="redo === e"><p>undo</p></div>
        </section>
    </div>
</template>
<script>
export default {
  el: '#app',
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
        border-radius: 90px;
        width: 200px;
        height: 200px;
        background: #ff4d4d;
        border: 2px solid black;
        z-index: 100;
    }

    #undo img {
        width: 60px;
        height: 60px;
        position: fixed;
        top: 15px;
        z-index: 100;
        left: 0;
    }
    #do img{
        width: 60px;
        height: 60px;
        position: fixed;
        top: 10px;
        left: 30px;
        z-index: 100;
        transform: scale(1.1) rotate(180deg);
    }
</style>
