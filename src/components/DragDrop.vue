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
    </div>
</template>

<script>
export default {
  name: 'drag-drop',
  data () {
    return {
      files: [],
      jason: []
    }
  },
  methods: {
    displayJason () {
      console.log(document.getElementById('jasonElem').files)
      var jasonFile = document.getElementById('jasonElem').files[0]
      var reader = new FileReader()
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
          newdiv.style.marginLeft = (obj[z].x) * 1.1 + 'px'
          newdiv.style.marginTop = (obj[z].y) * 0.825 + 'px'
          newdiv.style.width = (obj[z].width) * 1.1 + 'px'
          newdiv.style.height = (obj[z].height) * 0.825 + 'px'
          newdiv.style.border = 'thick solid #ff4d4d'
          fullGrid.appendChild(newdiv)
          var r = document.getElementById('number' + z)
          r.innerHTML = z
        }
      }
      reader.readAsText(jasonFile, 'utf8')
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
        .then(() => { console.log('Done') })
        .catch(() => { console.log('Error') })
    },
    previewFile (i) {
      if (document.getElementById('gallery').getElementsByTagName('img')[i] != null) {
        setTimeout(() => { this.previewFile(i + 1) }, 100)
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
