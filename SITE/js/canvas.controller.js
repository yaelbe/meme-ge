'use strict'

function showEditor() {
  addResizeListeners()
  let image = new Image()
  image.onload = function () {
    gImage.image = image
    renderCanvas()
  }
  image.src = gImage.src
  document.querySelector('.edit').classList.remove('hide')
}

function addResizeListeners() {
  window.addEventListener('resize', renderCanvas)
}

function renderCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  const img = gImage.image

  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

  gElCanvas.width = 0
  gElCanvas.height = 0

  const imageRatio = img.width / img.height
  gElCanvas.width = elContainer.offsetWidth - 25

  gElCanvas.height = imageRatio < 1 ? gElCanvas.width * imageRatio : gElCanvas.width / imageRatio

  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function removeResizeListener() {
  window.removeEventListener('resize', renderCanvas)
}

function hideEditor() {
  removeResizeListener()
  document.querySelector('.edit').classList.add('hide')
}
