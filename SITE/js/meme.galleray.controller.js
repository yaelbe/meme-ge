function showMemes() {
  renderMemeGallery()
  document.querySelector('.memes').classList.remove('hide')
}

function hideMemesGallery() {
  document.querySelector('.memes').classList.add('hide')
}

function renderMemeGallery() {
  const elGallery = document.querySelector('.memes.gallery')

  let html = ''

  html += `<div class="imgs">`
  const memes = getSavedMemes()
  memes.map((meme) => {
    // html += `<img src=${meme.image} class="img" onclick="onMemeClicked('${meme.id}')" >`
    html += `<div class="img__inner">
    <img src=${meme.image} class="img" onclick="onMemeClicked('${meme.id}')" />
    <button class="meme-delete btn-cta delete-btn hidden" onclick="onDeleteMeme('${meme.id}')"></button>
  </div>`
  })
  html += '</div>'
  elGallery.innerHTML = html
}

function onMemeClicked(memeId) {
  const meme = getMemeById(memeId)
  gImage = meme.data
  let image = new Image()
  image.onload = function () {
    gImage.image = image
    gElCanvas.width = meme.size.w
    gElCanvas.height = meme.size.h
    renderCanvas()
    hideMemesGallery()
    showEditor()
  }
  image.src = meme.image
}

function onDeleteMeme(id) {
  deleteMeme(id)
  renderMemeGallery()
}

// function renderMemes() {
//     const elMemes = document.querySelector('.memes')
//     const memems = getSavedMemes()
//     let html = ''

//     memems.map((meme) => {
//       html += `<img class="thumbnail" src=${meme.c} onclick="onRenderMeme('${meme.id}')">`
//     })

//     html += `<div class="flex width-100 space-between">
//     <button class="btn-cta large edit-btn" onclick="showEditor()">Edit</button>
//     <a href="#" class="btn-cta large save-btn" onclick="onDownload(this)" download="my-img.jpg">Download</a>
//     <button class="btn-cta large share-btn" onclick="onUploadImg()">Share</button>
//     </div>`

//     elMemes.innerHTML = html

//     const elContainer = document.querySelector('.canvas-container')

//     gElCanvas.width = elContainer.width - 25
//     gElCanvas.height = elContainer.height - 25
//     gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
//     gCtx.fillStyle = '#595959'
//     gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
//   }
