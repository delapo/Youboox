<template>
    <div id="do-undo">
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
        box-shadow:7px 7px white;
        z-index: 1;
    }
    #img-undo{
        -webkit-transition: .7s ease-in-out;
        transition: .7s ease-in-out;
    }
    #img-undo:hover{
        transform: scale(1.3);
        -webkit-transform: scale(1.3);
        z-index: 2;

    }
    #img-redo
            -webkit-transition: .7s ease-in-out;
            transition: .7s ease-in-out;
        transform: scale(1) rotate(180deg);
        z-index: 2;
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
