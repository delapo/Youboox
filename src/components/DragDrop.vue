<template>
    <div>
        <div id="board">
        </div>
        <div id="dropJason">
            <input type="file" id="jasonElem" accept="application/json" ref="myJason" @change="displayJason">
            <p> JSON </p>
        </div>
        <div id="drop-area" ref="azerty" v-on:dragenter="hover" v-on:dragover="hover" v-on:dragleave="unhover"
             v-on:drop="handleDrop">
            <img src="https://vignette.wikia.nocookie.net/i-shall-seal-the-heavens/images/2/2f/Plus.png/revision/latest?cb=20180221183139">
            <form class="my-form">
                <input type="file" id="fileElem" multiple accept="image/*" ref="myFiles" @change="handleFiles">
                <label class="button" for="fileElem">Select or drop some files</label>
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
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'drag-drop',
  data () {
    return {
      files: [],
      i: 20
    }
  },
  methods: {
    displayJason () {
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
        select.appendChild(fullGrid)
        var obj = array.regions_of_interest
        console.log(obj)
        for (var z = 0; z <= obj.length - 1; z++) {
          var newdiv = document.createElement('div')
          newdiv.setAttribute('id', 'number' + z)
          newdiv.setAttribute('class', 'bd')
          newdiv.setAttribute('number', z)
          newdiv.style.position = 'absolute'
          newdiv.style.left = (obj[z].x) * 1.1 + 'px'
          newdiv.style.top = (obj[z].y) * 0.825 + 'px'
          newdiv.style.width = (obj[z].width) * 1.1 + 'px'
          newdiv.style.height = (obj[z].height) * 0.825 + 'px'
          newdiv.style.border = 'thick solid #ff4d4d'
          newdiv.draggable = false
          newdiv.addEventListener('click', Tool, false)
          fullGrid.appendChild(newdiv)
          var r = document.getElementById('number' + z)
          r.innerHTML = '<p>' + z + '</p>'
        }
        console.log(typeof this.tool)
        /* var x = document.getElementById('fullGrid').childNodes
            x[x.length - 1].addEventListener('click', () => { console.log('coucou') }, false) */
      }
    },
    tool: function Tool (e) {
      let tools = ['_add', 'del', 'move', 'edit'].map(name => ({
        name,
        img_but: document.getElementById(name).firstChild,
        div: e.path[0]
      }))
      console.log(tools)
      const tool = tools.find(x => x.img_but.classList.contains('tools_selected'))
      if (tool) {
        window[tool.name](tool, e)
      } else {
        console.log('no tool')
      }
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
      console.log(document.getElementById('number' + z))
      document.getElementById('number' + z).style.marginLeft = r + 'px'
      document.getElementById('number' + z).style.marginTop = u + 'px'
    },

    addbd () {
      console.log(this.$data.i)

      var z = this.$refs.addingbd.value
      var w = this.$refs.casew.value
      var e = this.$refs.caseh.value
      var xx = this.$refs.casex.value
      var yy = this.$refs.casey.value
      var newcase = document.createElement('div')
      var select = document.getElementById('number' + z)
      newcase.setAttribute('class', 'new')
      newcase.setAttribute('number', '2')
      newcase.setAttribute('id', 'number' + this.$data.i)
      newcase.style.border = 'thick solid red'
      newcase.style.width = w + 'px'
      newcase.style.height = e + 'px'
      newcase.style.marginLeft = xx + 'px'
      newcase.style.marginTop = yy + 'px'
      select.appendChild(newcase)
      this.$data.i = this.$data.i + 1
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
      this.middleImg(files)
      console.log(files)
    },
    handleFiles () {
      let files = document.getElementById('fileElem').files
      files = [...files]
      // files.forEach(this.uploadFile)
      this.$data.files = this.$data.files.concat(files)
      this.previewFile(0)
      this.middleImg()
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
        setTimeout(() => {
          this.previewFile(i + 1)
        }, 100)
      } else {
        let file = this.$data.files[i]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          let img = document.createElement('img')
          img.src = reader.result
          img.class = 'page'
          console.log(file)
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
    middleImg () {
      let files = this.$data.files
      let i = 0
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

function del (tool, e) {
  let div = tool.div
  div.parentNode.removeChild(div)
}

function _add (tool, e) {
  let div = tool.div
  div.draggable = true
  let cursor_left = e.pageX - div.parentNode.offsetLeft
  let cursor_top = e.pageY - div.parentNode.offsetTop

  let board = document.getElementById('board')

  let new_div = document.createElement('div')
  new_div.style.position = 'absolute'
  new_div.className = 'square_add'

  new_div.style.left = cursor_left + 175 + 'px'
  new_div.style.top = cursor_top + 'px'

  new_div.style.width = '100px'
  new_div.style.height = '100px'

  new_div.style.border = '3px solid red'

  new_div.draggable = false
  new_div.onclick = Tool

  board.appendChild(new_div)
}

function move (tool, e) {
  let div = tool.div
  div.draggable = true
  let divTop = parseInt(div.style.top)
  let divLeft = parseInt(div.style.left)
  let cursorLeft = e.pageX - div.parentNode.offsetLeft
  let cursorTop = e.pageY - div.parentNode.offsetTop
  div.parentNode.addEventListener('dragstart', _funcs)
  function _funcs () { onDragstart(e, div) }
  div.parentNode.addEventListener('dragover', _funco)
  function _funco () { ondragover(e, div, divTop, divLeft, cursorLeft, cursorTop) }
  div.parentNode.addEventListener('dragend', _funce)
  function _funce () { ondragend(e, div) }
  console.log('end')

  function onDragstart (e, div) {
    console.log('dragstart')
  }
  function ondragover (e, div, divTop, divLeft, cursorLeft, cursorTop) {
    console.log('div', divLeft, divTop, 'cursor', cursorLeft, cursorTop)
    e = window.event
    /* calc position of mouse refer to parent node */
    let currLeft = (e.pageX - div.parentNode.offsetLeft)
    let currTop = (e.pageY - div.parentNode.offsetTop)
    /* calc diff btw div origin position and cursor current position */
    let difLeft = cursorLeft - divLeft
    let difTop = cursorTop - divTop
    /* calc new div position */
    let x = currLeft - difLeft
    let y = currTop - difTop
    /* applie new position */
    div.style.left = x + 'px'
    div.style.top = y + 'px'
  }

  function edit (tool, e) {
    let div = tool.div

    let div_resize = document.getElementById('tl_resize')
    if (!div_resize) {
      console.log('no resize div')

      let div_resize_tl = document.createElement('div')
      div_resize_tl.id = 'tl_resize'
      div_resize_tl.draggable = true
      div.appendChild(div_resize_tl)
    } else if (div_resize) {
      div.appendChild(document.getElementById('tl_resize'))
    }

    /* commun part */

    let cursor_left = e.pageX - div.parentNode.offsetLeft
    let cursor_top = e.pageY - div.parentNode.offsetTop

    let curr_width = parseInt(div.style.width)
    let curr_height = parseInt(div.style.height)

    let div_top = parseInt(div.style.top)
    let div_left = parseInt(div.style.left)

    /* part tl */

    div.parentNode.addEventListener('dragstart', _funcs_edit)
    function _funcs_edit () { onDragstart_edit(e, div) }
    div.parentNode.addEventListener('dragover', _funco_edit)
    function _funco_edit () { ondragover_edit(e, div, cursor_left, cursor_top, curr_width, curr_height, div_left, div_top) }
    div.parentNode.addEventListener('dragend', _funce_edit)
    function _funce_edit () { ondragend_edit(e, div) }

    function onDragstart_edit (e, div) {
      console.log('dragstart')
    }

    function ondragover_edit (e, div, cursor_left, cursor_top, curr_width, curr_height, div_left, div_top) {
      ;
      console.log('cursor', cursor_left, cursor_top)
      e = window.event

      /* calc position of mouse refer to parent node */

      let curr_left = (e.pageX - div.parentNode.offsetLeft)
      let curr_top = (e.pageY - div.parentNode.offsetTop)

      let left_dif = cursor_left - div_left
      let top_dif = cursor_top - div_top

      /* calc diff height and width */

      let diff_left = cursor_left - curr_left
      let diff_top = cursor_top - curr_top

      /* calc new dif height and width */

      console.log('width', curr_width, 'height', curr_height)

      let new_width = curr_width + diff_left
      let new_height = curr_height + diff_top

      /* applie new position */

      div.style.width = new_width + 'px'
      div.style.height = new_height + 'px'

      div.style.left = curr_left - left_dif + 'px'
      div.style.top = curr_top - top_dif + 'px'
    }
    function ondragend_edit (e, div) {
      div.draggable = false
      div.parentNode.removeEventListener('dragstart', _funcs_edit)
      div.parentNode.removeEventListener('dragover', _funco_edit)
      div.parentNode.removeEventListener('dragend', _funce_edit)
      div.removeChild(document.getElementById('tl_resize'))
      console.log('dragend')
    }
  }

  function ondragend (e, div) {
    div.draggable = false
    div.parentNode.removeEventListener('dragstart', _funcs)
    div.parentNode.removeEventListener('dragover', _funco)
    div.parentNode.removeEventListener('dragend', _funce)
    console.log('dragend')
  }
}

function Tool (e) {
  let tools = ['_add', 'del', 'move', 'edit'].map(name => ({
    name,
    img_but: document.getElementById(name).firstChild,
    div: e.path[0]
  }))
  const tool = tools.find(x => x.img_but.classList.contains('tool_selected'))

  if (tool !== undefined) {
    var fun = eval(tool.name)
    console.log(fun)
    fun(tool, e)
  } else {
    console.log('no tool')
  }
}

function edit (tool, e) {
  let div = tool.div

  const div_resize = document.getElementById('tl_resize')
  if (!div_resize) {
    console.log('no resize div')

    let div_resize_tl = document.createElement('div')
    div_resize_tl.id = 'tl_resize'
    div_resize_tl.draggable = true
    div.appendChild(div_resize_tl)
  } else if (div_resize) {
    div.appendChild(document.getElementById('tl_resize'))
  }

  /* commun part */

  let curr_width = parseInt(div.style.width)
  let curr_height = parseInt(div.style.height)

  let div_top = parseInt(div.style.top)
  let div_left = parseInt(div.style.left)

  div.parentNode.addEventListener('dragstart', _funcs_edit)
  function _funcs_edit () { onDragstart_edit(e, div) }
  div.parentNode.addEventListener('dragover', _funco_edit)
  function _funco_edit () { ondragover_edit(e, div, curr_width, curr_height, div_left, div_top) }
  div.parentNode.addEventListener('dragend', _funce_edit)
  function _funce_edit () { ondragend_edit(e, div) }

  function onDragstart_edit (e, div) {
    console.log('dragstart')
  }

  function ondragover_edit (e, div, curr_width, curr_height, div_left, div_top) {
    console.log('cursor', div_left, div_top)
    e = window.event

    /* calc position of mouse refer to parent node */

    let curr_left = (e.pageX - div.parentNode.offsetLeft)
    let curr_top = (e.pageY - div.parentNode.offsetTop)

    /* calc diff height and width */

    let diff_left = div_left - curr_left
    let diff_top = div_top - curr_top

    /* calc new diff height and width */

    console.log('width', curr_width, 'height', curr_height)

    let new_width = curr_width + diff_left
    let new_height = curr_height + diff_top

    /* applie new position */

    div.style.width = new_width + 'px'
    div.style.height = new_height + 'px'

    div.style.left = curr_left + 'px'
    div.style.top = curr_top + 'px'
  }
  function ondragend_edit (e, div) {
    div.draggable = false
    div.parentNode.removeEventListener('dragstart', _funcs_edit)
    div.parentNode.removeEventListener('dragover', _funco_edit)
    div.parentNode.removeEventListener('dragend', _funce_edit)
    div.removeChild(document.getElementById('tl_resize'))
    console.log('dragend')
  }
}

</script>
<style>
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
        right: -39.5%;
        background: #ff4d4d;
        -webkit-transition: .7s ease-in-out;
        transition: .7s ease-in-out;
    }
    #drop-area:hover{
        height: 40%;
        right: 0;
        bottom: 10%;
    }
    #drop-area img{
        width: 30px;
        height: 30px;
        position: absolute;
        top:0;
        left: 0;
    }
    #drop-area label {
        display: block;
        margin-top: 5%;
        width: 160px;
        margin-left: 35%;
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
        width: 300px;
        height: 40px;
        font-family: sans-serif;
        margin: auto;
        border-radius: 10px;
        background: #ff4d4d;
        padding: 10px;
        position: fixed;
        display: flex;
        top: -45px;
        text-align: center;
        z-index: 10000;
        right: 45%;
        -webkit-transition: .4s ease-in-out;
        transition: .4s ease-in-out;
    }
    #dropJason p{
        text-align: center;
        position: absolute;
        bottom: -15px;
        margin-left: 40%;
    }
    #dropJason:hover {
        border-color: #ccc;
        border-radius: 10px;
        top:0;
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
        left: 0;
    }

    #manualSet p {
        margin-bottom: -5px;
    }

    #addCase, #moveCase, #deleteCase, #modifyCase {
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

    #fullGrid {
        height : 800px;
        width : 800px;
    }
</style>
