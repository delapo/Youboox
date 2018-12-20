<template>
    <div>
        <div id="dropJason">
            <input type="file" name="Jason" id="jasonElem" accept="application/json" ref="myJason" @change="displayJason" class="custom-file-input">
        </div>
        <div id="drop-area" ref="azerty" v-on:dragenter="hover" v-on:dragover="hover" v-on:dragleave="unhover" v-on:click="dropFileZone"
             v-on:drop="handleDrop">
            <img class="plus" src="https://elitegraphicsllc.com/wp-content/plugins/udraw/designer/includes/img/photo-icon.png">
            <form class="my-form">
                <input type="file" id="fileElem" multiple accept="image/*" ref="myFiles" @change="handleFiles">
                <label class="button" for="fileElem" >Select or drop some files</label>
            </form>
        </div>
        <div>
            <div id="manualSet">
                <div id="deleteCase">
                    <label for="casebd"> </label>
                    <input type="number" id="casebd" name="casebd" ref="casebd" placeholder="number of the box">
                    <button v-on:click="deletebd()">delete a box !</button>
                </div>
                <div id="modifyCase"><label for="modifyingbd"> </label><input type="number" id="modifyingbd"
                                                                              name="modifyingbd" ref="modifyingbd"
                                                                              placeholder="Set a box">
                    <input type="number" id="modifying1bd" name="modifying1bd" ref="modifying1bd"
                           placeholder="Set a width">
                    <input type="number" id="modifyinghbd" name="modifyinghbd" ref="modifyinghbd"
                           placeholder="Set a height">
                    <button v-on:click="modifybd()">Modify the box !</button>
                </div>
                <img src="http://l-3ab.com/images/Slider/double-fleche.png">
                <div id="addCase">
                    <input type="number" id="addingbd" name="addingbd" ref="addingbd" placeholder="Select a box">
                    <input type="number" id="casew" name="casew" ref="casew" placeholder="Set a width">
                    <input type="number" id="caseh" name="caseh" ref="caseh" placeholder="Set a height">
                    <input type="number" id="casex" name="casex" ref="casex" placeholder="Set a X position">
                    <input type="number" id="casey" name="casey" ref="casey" placeholder="Set a Y position">
                    <button v-on:click="addbd()">add a box !</button>
                </div>
                <div id="moveCase"><label for="movingbd"> </label>
                    <input type="number" id="movingbd" name="movingbd" ref="movingbd" placeholder="Select a box">
                    <input type="number" id="movingxbd" name="movingxbd" ref="movingxbd" placeholder="Set a X position">
                    <input type="number" id="movingybd" name="movingybd" ref="movingybd" placeholder="Set a Y position">
                    <button v-on:click="movebd()">move a box !</button>
                </div>
                <div id="changeOrder">
                    <input type="number" id="number1" name="number1" ref="number1" placeholder="Séléctionner la première case">
                    <input type="number" id="number2" name="number2" ref="number2" placeholder="Séléctionner la deuxième case">
                    <button v-on:click="swapOrder">Swap!</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable no-eval */

export default {
  name: 'drag-drop',
  data () {
    return {
      files: [],
      UndoRedoTable: [20],
      o: 0,
      i: 20
    }
  },
  methods: {
    displayJason () {
      window.addEventListener('keydown', function (e) {
        if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault()
        }
      }, false)
      console.log(document.getElementById('jasonElem').files)
      var jasonFile = document.getElementById('jasonElem').files[0]
      var reader = new FileReader()
      reader.readAsText(jasonFile, 'utf8')
      reader.onload = function (json) {
        var result = reader.result
        var array = JSON.parse(result)
        var fullGrid = document.createElement('div')
        fullGrid.id = 'fullGrid'
        var select = document.getElementById('BD_show')
        document.onkeydown = board_move
        fullGrid.draggable = false
        fullGrid.style.left = 50 + 'px'
        fullGrid.style.right = 10 + 'px'
        fullGrid.style.top = 100 + 'px'
        fullGrid.style.bottom = 5 + 'px'
        select.appendChild(fullGrid)
        var obj = array.regions_of_interest
        console.log(obj)
        for (var z = 0; z <= obj.length - 1; z++) {
          var newdiv = document.createElement('div')
          newdiv.setAttribute('id', 'number' + z)
          newdiv.setAttribute('class', 'bd')
          newdiv.setAttribute('number', z)
          newdiv.style.position = 'absolute'
          newdiv.style.left = (obj[z].x) * 1 + 'px'
          newdiv.style.top = (obj[z].y) * 1 + 'px'
          newdiv.style.width = (obj[z].width) * 1 + 'px'
          newdiv.style.height = (obj[z].height) * 1 + 'px'
          newdiv.style.border = '1px solid blue'
          newdiv.draggable = false
          newdiv.addEventListener('click', Tool, false)
          fullGrid.appendChild(newdiv)
          var r = document.getElementById('number' + z)
          r.innerHTML = '<p>' + z + '</p>'
        }
      }
    },
    swapOrder () {
      let number1 = this.$refs.number1.value
      let number2 = this.$refs.number2.value
      let case1 = document.getElementById('number' + number1)
      let case2 = document.getElementById('number' + number2)
      case1.innerHTML = '<p>' + number2 + '</p>'
      case1.id = ('number' + number2)
      case2.innerHTML = '<p>' + number1 + '</p>'
      case2.id = ('number' + number1)
    },
    deletebd () {
      var z = this.$refs.casebd.value
      document.getElementById('number' + z).remove()
    },
    modifybd () {
      var z = this.$refs.modifyingbd.value
      var t = this.$refs.modifying1bd.value
      var h = this.$refs.modifyinghbd.value
      document.getElementById('number' + z).style.width = t + 'px'
      document.getElementById('number' + z).style.height = h + 'px'
    },
    movebd () {
      var z = this.$refs.movingbd.value
      var r = this.$refs.movingxbd.value
      var u = this.$refs.movingybd.value
      document.getElementById('number' + z).style.marginLeft = r + 'px'
      document.getElementById('number' + z).style.marginTop = u + 'px'
    },

    addbd () {
      var y = document.getElementById('fullGrid').childElementCount
      var z = this.$refs.addingbd.value
      var w = this.$refs.casew.value
      var e = this.$refs.caseh.value
      var xx = this.$refs.casex.value
      var yy = this.$refs.casey.value
      var newcase = document.createElement('div')
      var select = document.getElementById('number' + z)
      newcase.setAttribute('class', 'new')
      newcase.setAttribute('number', '2')
      newcase.setAttribute('id', 'number' + y)
      newcase.style.border = 'thick solid red'
      newcase.style.width = w + 'px'
      newcase.style.height = e + 'px'
      newcase.style.marginLeft = xx + 'px'
      newcase.style.marginTop = yy + 'px'
      select.appendChild(newcase)
      var r = document.getElementById('number' + y)
      console.log(r)
      r.innerHTML = '<p>' + y + '</p>'
      y = y + 1
    },
    dropFileZone () {
      let select = document.getElementById('drop-area')
      select.classList.toggle('drop-area-hover')
    },
    hover (e) {
      e.preventDefault()
      e.stopPropagation()
      let area = this.$refs.azerty
      area.classList.add('hover')
      area.addEventListener('drop', this.unhover, false)
    },
    unhover (e) {
      e.preventDefault()
      e.stopPropagation()
      let area = this.$refs.azerty
      area.classList.remove('hover')
      //    area.addEventListener('drop', this.handleDrop, false)
    },
    handleDrop (e) {
      let files = e.dataTransfer.files
      console.log(files, 'hzief')
      this.handleDropFiles(files)
    },
    handleDropFiles (files) {
      files = [...files]
      // files.forEach(this.uploadFile)
      this.$data.files = this.$data.files.concat(files)
      this.previewFile(0)
      this.middleImg(0)
    },
    handleFiles () {
      let files = document.getElementById('fileElem').files
      files = [...files]
      // files.forEach(this.uploadFile)
      this.$data.files = this.$data.files.concat(files)
      this.previewFile(0)
      this.middleImg(0)
    },
    uploadFile (file) {
      let url = 'http://localhost:8080/'
      let formData = new FormData()
      formData.append('file', file)
      fetch(url, {
        method: 'POST',
        body: formData
      })
        .then(() => {
          console.log('Done')
        })
        .catch(() => {
          console.log('Error')
        })
    },
    previewFile (i) {
      if (document.getElementById('gallery').getElementsByTagName('img')[i] != null) {
        this.previewFile(i + 1)
      } else {
        let file = this.$data.files[i]
        let files = this.$data.files
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          let img = document.createElement('img')
          img.src = reader.result
          img.class = 'page'
          img.addEventListener('click', function () {
            reader.readAsDataURL(files[i])
            reader.onloadend = function () {
              let select = document.getElementById('imageCenter')
              select.src = reader.result
            }
          })
          img.addEventListener('click', function () {
            console.log('asas')
          }, false)
          document.getElementById('gallery').appendChild(img)
          if (this.$data.files[i + 1]) {
            this.previewFile(i + 1)
          }
        }
      }
    },
    middleImg (i) {
      let files = this.$data.files
      let prev = document.getElementById('prev')
      let next = document.getElementById('next')
      let reader = new FileReader()
      prev.addEventListener('click', function () {
        reader.readAsDataURL(files[i + 1])
        reader.onloadend = function () {
          let select = document.getElementById('imageCenter')
          select.src = reader.result
        }
        i++
      }, true)
      next.addEventListener('click', function () {
        reader.readAsDataURL(files[i - 1])
        reader.onloadend = function () {
          let select = document.getElementById('imageCenter')
          select.src = reader.result
        }
        i--
      }, true)
      reader.readAsDataURL(files[i])
      reader.onloadend = function () {
        let select = document.getElementById('imageCenter')
        select.src = reader.result
      }
    }
  }
}

function del (tool, e, cursor, startDiv) {
  tool.div.parentNode.removeChild(tool.div)
}
function undo () {
}
function redo () {
}
/* ------------------------------------------------ function add --------------------------------------------------- */

function _add (tool, e, cursor, startDiv) {
  tool.div.style.border = '1px solid blue'
  let y = document.getElementById('fullGrid').childElementCount
  let board = document.getElementById('fullGrid')
  let newDiv = document.createElement('div')

  newDiv.style.position = 'absolute'
  newDiv.className = 'bd'

  newDiv.style.left = cursor[0].left - 125 + 'px'
  newDiv.style.top = cursor[0].top - 125 + 'px'

  newDiv.style.width = '250px'
  newDiv.style.height = '250px'

  newDiv.setAttribute('id', 'number' + y)
  newDiv.setAttribute('number', '' + y)
  newDiv.style.border = '1px solid blue'

  newDiv.draggable = false
  newDiv.onclick = Tool
  board.appendChild(newDiv)
  let r = document.getElementById('number' + y)
  console.log(r)
  r.innerHTML = '<p>' + y + '</p>'
  y = y + 1
}

/* ------------------------------------------------ function move --------------------------------------------------- */

function move (tool, e, cursor, startDiv) {
  tool.div.draggable = true
  tool.div.parentNode.ondragstart = ondragstartMove
  tool.div.parentNode.ondragover = function (e) { ondragoverMove(e, tool, cursor, startDiv) }
  tool.div.parentNode.ondragend = ondragendMove
}

function ondragstartMove () {
  console.log('dragstart')
}

function ondragoverMove (e, tool, cursor, startDiv) {
  e = window.event
  let div = tool.div
  /* calc position of mouse refer to parent node */

  let currLeft = (e.pageX - div.parentNode.offsetLeft)
  let currTop = (e.pageY - div.parentNode.offsetTop)

  /* calc new div position */

  let x = currLeft - startDiv[0].dif_left
  let y = currTop - startDiv[0].dif_top

  /* applie new position */

  div.style.left = x + 'px'
  div.style.top = y + 'px'
}

function ondragendMove () {
  console.log('dragend')
}

/* ---------------------------------------- function Call when click on tool ---------------------------------------- */

function Tool (e) {
  const div_resize_tl = document.getElementById('tl_resize')
  const div_resize_br = document.getElementById('br_resize')
  if (div_resize_br) {
    div_resize_br.parentNode.removeChild(div_resize_br)
    div_resize_tl.parentNode.removeChild(div_resize_tl)
  }
  let tools = ['_add', 'del', 'move', 'edit'].map(name => ({
    name,
    img_but: document.getElementById(name).firstChild,
    div: e.path[0]
  }))
  let cursor = ['cursor'].map(name => ({
    name,
    left: e.pageX - tools[0].div.parentNode.offsetLeft,
    top: e.pageY - tools[0].div.parentNode.offsetTop
  }))
  let startDiv = ['startDiv'].map(name => ({
    name,
    left: parseInt(tools[0].div.style.left),
    top: parseInt(tools[0].div.style.top),
    dif_left: cursor[0].left - parseInt(tools[0].div.style.left),
    dif_top: cursor[0].top - parseInt(tools[0].div.style.top),
    width: parseInt(tools[0].div.style.width),
    height: parseInt(tools[0].div.style.height)
  }))
  const tool = tools.find(x => x.img_but.classList.contains('tool_selected'))
  let squares = document.getElementsByClassName('bd')
  let selected
  for (let x in squares) {
    if (typeof (squares[x]) === 'object') {
      if (squares[x].style.border === '2px solid red') {
        selected = squares[x]
      }
    }
  }
  if (selected !== undefined) {
    selected.draggable = false
    selected.style.border = '1px solid blue'
    selected.ondragover = function () {}
  }
  if (tool !== undefined) {
    tool.div.style.border = '2px solid red'
    var fun = eval(tool.name)
    fun(tool, e, cursor, startDiv)
  } else {
    console.log('no tool')
  }
}

function board_move () {
  let board = document.getElementById('fullGrid')
  let e = window.event
  console.log(e.code)

  if (e.code === 'ArrowRight') {
    console.log(board)
    console.log(parseInt(board.style.left) + 10 + 'px')
    /*  if(parseInt(board.style.left === NaN))
          board.style.left = 10px */
    board.style.left = parseInt(board.style.left) + 10 + 'px'
  }
  if (e.code === 'ArrowLeft') {
    board.style.left = parseInt(board.style.left) - 10 + 'px'
  }
  if (e.code === 'ArrowUp') {
    board.style.top = parseInt(board.style.top) - 10 + 'px'
  }
  if (e.code === 'ArrowDown') {
    board.style.top = parseInt(board.style.top) + 10 + 'px'
  }
}
</script>
<style>
    #menu img{
        -webkit-user-select: none;
        -moz-user-select: none;
        -webkit-user-drag: none;
    }

    #drop-area {
        width: 40%;
        height: 20%;
        border: 3px #ff4d4d solid;
        font-family: sans-serif;
        margin: auto;
        border-radius: 10px;
        padding: 10px;
        position: fixed;
        bottom: 20%;
        text-align: center;
        z-index: 100;
        right: -39%;
        background: rgba(255, 77, 77, 0.9);
        -webkit-transition: .7s ease-in-out;
        transition: .7s ease-in-out;
    }
    #drop-area img{
        width: 45px;
        height:45px;
        position: absolute;
        top:0;
        left: 0;
    }
    #test123{
        width: 30px;
        height: 30px;
        position: absolute;
        top:0;
        left: 30px;
    }
    #drop-area label {
        display: block;
        margin-top: 20%;
        width: 180px;
        margin-left: 32%;
        text-align: center;
    }
    #drop-area:hover {
        border-color: #ff4d4d;
        border-radius: 10px;
    }

    #drop-area.hover {
        border-color: #ff4d4d;
        border-radius: 10px;
    }

    p {
        margin-top: 0;
    }

    .my-form {
        margin-bottom: 10px;
    }

    #gallery {
        margin-top: 10px;
        background: white;
    }

    #gallery img {
        width: 180px;
        margin-bottom: 10px;
        margin-right: 10px;
        vertical-align: middle;
        background: white;
    }

    .button {
        display: inline-block;
        padding: 10px;
        background: #ccc;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .button:hover {
        background: #ddd;
    }

    #fileElem {
        display: none;
    }

    #gallery {
        margin-top: 10px;
    }

    .page {
        width: 230px;
        margin-bottom: 10px;
        margin-right: 10px;
        vertical-align: middle;
    }

    #dropJason {
        border: 2px solid #111;
        width: 100%;
        height: 20px;
        font-family: sans-serif;
        margin: auto;
        border-radius: 10px;
        background: #ff4d4d;
        padding: 10px;
        position: absolute;
        display: flex;
        top: -7px;
        text-align: center;
        right: 0;
        z-index: -1;
        -webkit-transition: .4s ease-in-out;
        transition: .4s ease-in-out;
    }
    #dropJason input{
        margin-left: auto;
        margin-right: auto;
    }
    #manualSet {
        top: 20%;
        z-index: 100000;
        background: #ff4d4d;
        border-radius: 20px;
        padding-right: 30px;
        width: 20%;
        left: -20%;
        position: fixed;
        display: inline-block;
        margin-right: auto;
        font-size: 15px;
        -webkit-transition: .7s ease-in-out;
        transition: .7s ease-in-out;
    }

    #manualSet:hover {
        left: -1%;
    }

    #manualSet p {
        margin-bottom: -5px;
    }

    #addCase, #moveCase, #deleteCase, #modifyCase, #changeOrder {
        border: 1px darkred solid;
        border-radius: 20px;
        margin: 5px;
        display: grid;
        padding: 10px;
    }

    #manualSet input {
        text-align: center;
    }

    #manualSet img {
        position: absolute;
        left: 92%;
        top: 40%;
        width: 25px;
        height: 80px;
    }

    #tl_resize{
        position: absolute;
        background-color: black;
        top: 0;
        left: 0;
        width: 10px;
        height: 10px;
    }
    .drop-area-hover{
        height: 45% !important;
        width: 50% !important;
        right: -5% !important;
        bottom: 10% !important;
    }
    #fullGrid {
        top: 80px;
        position: absolute;
        height: 200%;
        left: 3%;
        width: 72%;
        z-index: -10;
        border-radius: 30px;
        background: rgba(255, 66, 39, 0.11);
        padding-right: 10%;
    }
    .bd{
    }
    .square_add p {
        margin: 5px;
        padding-left: 10px;
        border: black 2px solid;
        width: 30px;
        height: 30px;
        background: rgba(109, 109, 109, 0.7);
        -webkit-user-select: none;
        -moz-user-select: none;
        font-size: 30px;
    }
    .square_add{
        resize: both;
        overflow: auto;
        font-size: 30px;
        background: rgba(255, 255, 255, 0.5);
        -webkit-user-select: unset;
        -moz-user-select: unset;
    }
    [draggable=true] {
        cursor: move;
    }

    #tl_resize{
        position: absolute;
        background-color: black;

        width: 30px;
        height: 30px;

        opacity: .4;
    }

    #br_resize{
        position: absolute;
        background-color: black;

        width: 30px;
        height: 30px;

        opacity: .4;
    }
    .custom-file-input::-webkit-file-upload-button {
        visibility: hidden;
    }
    .custom-file-input::before {
        content: 'Choisir un Jason';
        display: inline-block;
        background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
        border: 1px solid #999;
        border-radius: 3px;
        padding: 5px 8px;
        white-space: nowrap;
        -webkit-user-select: none;
        cursor: pointer;
        text-shadow: 1px 1px #fff;
        font-weight: 700;
        font-size: 10pt;
    }
    .custom-file-input:hover::before {
        border-color: black;
    }
    .custom-file-input:active::before {
        background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
    }
</style>
