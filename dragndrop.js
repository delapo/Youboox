let dropArea = document.getElementById('drop-area');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
  dropArea.addEventListener(event, preventDefaults, false);
})

function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

dropArea.addEventListener('dragenter', hover, false);
dropArea.addEventListener('dragover', hover, false);
dropArea.addEventListener('dragleave', unhover, false);
dropArea.addEventListener('drop', unhover, false);

function hover(e) {
  dropArea.classList.add('hover');
}

function unhover(e) {
  dropArea.classList.remove('hover');
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
  files = [...files];
  files.forEach(uploadFile);
  files.forEach(previewFile);
}

function uploadFile(file) {
  let url = 'http://localhost:63342/Youboox_project/index.html?_ijt=43elipd3is3nri8qg0o0lusugi';
  let formData = new FormData();

  formData.append('file', file);

  fetch(url, {
    method: 'POST',
    body: formData
  })
    .then(() => { "Done" })
    .catch(() => { "Error" })
}

function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let img = document.createElement('img');
    img.src = reader.result;
    document.getElementById('gallery').appendChild(img);
  }
}
