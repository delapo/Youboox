<template>
    <div>
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
        -webkit-transition: .7s ease-in-out;
        transition: .7s ease-in-out;
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
</style>
