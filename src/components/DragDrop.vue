
<template>
    <div>
        <div id="dropJason">
            <input type="file" id="jasonElem" accept="application/json" ref="myJason" @change="displayJason">
        </div>
        <div id="drop-area" ref="azerty" v-on:dragenter="hover" v-on:dragover="hover" v-on:dragleave="unhover" v-on:drop="handleDrop">
            <form class="my-form">
                <p>Veuillez séléctionner des images à rajouter !</p>
                <input type="file" id="fileElem" multiple accept="image/*" ref="myFiles" @change="handleFiles">
                <label class="button" for="fileElem">Select some files</label>
            </form>
        </div>
        <div>
        <label for="casebd"> </label>
        <input type="number" id="casebd" name="casebd" ref="casebd">

        <br> <button v-on:click="deletebd()">delete a box !</button>

        <br><br><label for="modifyingbd"> </label>
        <br><input type="number" id="modifyingbd" name="modifyingbd" ref="modifyingbd">
        <a>Choosse the box</a>
        <br> <input type="number" id="modifying1bd" name="modifying1bd" ref="modifying1bd">
        <a>Choosse the width</a>
        <br><input type="number" id="modifyinghbd" name="modifyinghbd" ref="modifyinghbd">
        <a>Choosse the height</a>
        <br><button v-on:click="modifybd()">Modify the box !</button>

        <br><input type="number" id="addingbd" name="movingbd" ref="movingbd">
        <a>Choosse the box</a>
        <br><input type="number" id="casew" name="casew" ref="casew">
        <a>Choosse the width</a>
        <br><input type="number" id="caseh" name="caseh" ref="caseh">
        <a>Choosse the height</a>
        <br> <input type="number" id="casex" name="casex" ref="casex">
        <a>Choosse the x</a> <br>
        <input type="number" id="casey" name="casey" ref="casey">
        <a>Choosse the y</a> <br>
        <br><button v-on:click="addbd()">add a box !</button>

        <br><br> <label for="movingbd"> </label>
        <input type="number" id="movingbd" name="movingbd" ref="movingbd">
        <a>Choosse the box</a> <br>
        <input type="number" id="movingxbd" name="movingxbd" ref="movingxbd">
        <a>Choosse the x</a> <br>
        <input type="number" id="movingybd" name="movingybd" ref="movingybd">
        <a>Choosse the y</a> <br>
        <button v-on:click="movebd()">move a box !</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'drag-drop',
  data () {
    return {
      files: []
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
          r.innerHTML = z
        }
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
      let i = 20
      var z = this.$refs.addingbd.value
      var w = this.$refs.casew.value
      var e = this.$refs.caseh.value
      var xx = this.$refs.casex.value
      var yy = this.$refs.casey.value
      var newcase = document.createElement('div')
      var select = document.getElementById('number' + z)
      newcase.setAttribute('class', 'new')
      newcase.setAttribute('number', '2')
      newcase.setAttribute('id', 'number' + i)
      newcase.style.border = 'thick solid red'
      newcase.style.width = w + 'px'
      newcase.style.height = e + 'px'
      newcase.style.marginLeft = xx + 'px'
      newcase.style.marginTop = yy + 'px'
      select.appendChild(newcase)
      i = i + 1
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
  console.log('function _add')
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
  function ondragend (e, div) {
    div.draggable = false
    div.parentNode.removeEventListener('dragstart', _funcs)
    div.parentNode.removeEventListener('dragover', _funco)
    div.parentNode.removeEventListener('dragend', _funce)
    console.log('dragend')
  }
}

</script>
<style>
    #drop-area {
        border: 2px solid #ccc;
        width: 250px;
        height: 150px;
        font-family: sans-serif;
        margin: auto;
        border-radius: 10px;
        padding: 10px;
        position: fixed;
        display: flex;
        bottom: 15px;
        text-align: center;
        z-index: 10000;
        right: 280px;
    }
    #drop-area label {
        margin-left:auto;
        margin-right: auto;
        margin-top: 10%;
        width: 200px;
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
    }
    #gallery img {
        width: 180px;
        margin-bottom: 10px;
        margin-right: 10px;
        vertical-align: middle;
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
        border: 2px solid #ccc;
        width: auto;
        height: auto;
        font-family: sans-serif;
        margin: auto;
        border-radius: 10px;
        padding: 10px;
        position: fixed;
        display: flex;
        bottom: 200px;
        text-align: center;
        z-index: 10000;
        right: 280px;
    }
    #dropJason:hover {
        border-color: #ff4d4d;
        border-radius: 10px;
    }
</style>
