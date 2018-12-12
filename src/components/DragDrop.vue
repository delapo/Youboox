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
      var area = this.$refs.azerty
      area.classList.add('hover')
      area.addEventListener('drop', this.unhover, false)
    },
    unhover (e) {
      e.preventDefault()
      e.stopPropagation()
      var area = this.$refs.azerty
      area.classList.remove('hover')
      //    area.addEventListener('drop', this.handleDrop, false)
    },
    handleDrop (e) {
      var files = e.dataTransfer.files
      console.log(files, 'hzief')
      this.handleDropFiles(files)
    },
    handleDropFiles (files) {
      files = [...files]
      files.forEach(this.uploadFile)
      files.forEach(this.previewFile)
      console.log(files)
    },
    handleFiles (e) {
      var files = document.getElementById('fileElem').files
      console.log('azeaze', files)
      files = [...files]
      files.forEach(this.uploadFile)
      files.forEach(this.previewFile)
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
    previewFile (file) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function () {
        let img = document.createElement('img')
        img.src = reader.result
        img.id = 'page'
        document.getElementById('gallery').appendChild(img)
      }
    }
  }
}
</script>
<style scoped>
    #drop-area {
        border: 2px solid #ccc;
        width: 250px;
        font-family: sans-serif;
        margin: auto;
        border-radius: 10px;
        padding: 10px;
        position: fixed;
        display: flex;
        top: 24px;
        left: 10px;
    }

    #drop-area label {
        margin-left: auto;
        margin-right: auto;
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
        width: 230px;
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

</style>
