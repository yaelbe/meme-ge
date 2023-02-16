'use strict'
var gLines = []
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

  gCtx.fillStyle = 'white'
  gCtx.font = 'bold 18px Arial'
  gCtx.textAlign = 'center'
  const lineHeight = gCtx.measureText('M').width + 20
  let centerX = gElCanvas.width / 2
  let topY = lineHeight

  getLines().forEach((line, index) => {
    if (line.text.length !== 0) {
      let y = topY + lineHeight * index
      let width = gCtx.measureText(line.text).width
      gCtx.fillText(line.text, centerX, y)
      gCtx.setLineDash([6])
      gCtx.strokeStyle = 'white'
      gCtx.strokeRect(centerX - width / 2, y - lineHeight / 1.5, width, lineHeight)
    }
  })
}

function onTextInput(text) {
  console.log(text)
  let line = getCurrentLine()
  if (!line) {
    line = createLine()
  }
  line.text = text
  renderCanvas()
}

function onTypeEnd(ev, el) {
  if (ev.keyCode === 13) {
    el.value = ''
    createLine()
  }
}

function removeResizeListener() {
  window.removeEventListener('resize', renderCanvas)
}

function hideEditor() {
  removeResizeListener()
  document.querySelector('.edit').classList.add('hide')
}
