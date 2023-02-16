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
  let topY = lineHeight

  getLines().forEach((line, index) => {
    if (line.text.length !== 0) {
      let width = gCtx.measureText(line.text).width
      let y = topY + lineHeight * index
      let x = _getXPosition(line.align, width)

      gCtx.fillText(line.text, x, y)
      if (isCurrentLine(line.id)) {
        gCtx.setLineDash([6])
        gCtx.strokeStyle = 'white'
        gCtx.strokeRect(x - width / 2, y - lineHeight / 1.5, width, lineHeight)
      }
    }
  })
}

function _getXPosition(align, width) {
  switch (align) {
    case 'left':
      return 0 + width
    case 'right':
      return gElCanvas.width - width
    default:
      return gElCanvas.width / 2
  }
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

function onDeleteLine() {
  deleteLine()
  renderCanvas()
}

function onNextLine() {
  movetoNextLine()
  renderCanvas()
}

function onAddLine() {
  const elInput = document.querySelector(".tools-container input[type='text']")
  elInput.value = ''
  elInput.focus()
  createLine()
}

function onAlign(direction) {
  align(direction)
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
