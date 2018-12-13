<template>
    <div id="drop-area" ref="azerty" v-on:dragenter="hover" v-on:dragover="hover" v-on:dragleave="unhover" v-on:drop="handleDrop">
        <form class="my-form">
            <p>Veuillez séléctionner des images à rajouter !</p>
            <input type="file" id="fileElem" multiple accept="image/*" ref="myFiles" @change="handleFiles">
            <label class="button" for="fileElem">Select some files</label>
        </form>
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
      // files.forEach(this.uploadFile)
      files.forEach(this.previewFile)
      function rec (files, i) {
        let file = files[i]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
          let img = document.createElement('img')
          img.src = reader.result
          img.class = 'page'
          img.addEventListener('click', function () {
            console.log('asas')
          }, false)
          document.getElementById('gallery').appendChild(img)
          if (files[i + 1]) {
            rec(files, i + 1)
          }
        }
      } rec(files, 0)
      this.middleImg(files)
      console.log(files)
    },
    handleFiles () {
      let files = document.getElementById('fileElem').files
      files = [...files]
      // files.forEach(this.uploadFile)
      // files.forEach(this.previewFile)
      function rec (files, i) {
        let file = files[i]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
          let img = document.createElement('img')
          img.src = reader.result
          img.class = 'page'
          img.addEventListener('click', function () {
            console.log('asas')
          }, false)
          document.getElementById('gallery').appendChild(img)
          if (files[i + 1]) {
            rec(files, i + 1)
          }
        }
      } rec(files, 0)
      this.middleImg(files)
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
    middleImg (files) {
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
</style>

