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

  gCtx.textAlign = 'center'
  getLines().forEach((line, index) => {
    if (!isEmptyLine(line)) {
      const { font, fontSize: size, color } = line
      gCtx.font = `${size}em ${font}`

      const lineHeight = gCtx.measureText('M').width + 20
      let topY = lineHeight
      let width = gCtx.measureText(line.text).width
      let y = topY + Math.max(lineHeight * (index - 1) * 1.5, 0)
      let x = _getXPosition(line.align, width)

      if (index === 1) {
        //second line bottom
        y = gElCanvas.height - lineHeight / 2
      }

      if (line.stroke) {
        gCtx.strokeStyle = color
        gCtx.lineWidth = size * 0.5
        gCtx.strokeText(line.text, x, y)
      } else {
        gCtx.fillStyle = color
        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'white'
        gCtx.fillText(line.text, x, y)
      }

      if (isCurrentLine(line.id)) {
        gCtx.setLineDash([6])
        gCtx.strokeStyle = 'white'
        gCtx.strokeRect(x - (width * 1.5) / 2, y - lineHeight, width * 1.5, lineHeight * 1.5)
      }
    }
  })
}

function _getXPosition(align, width) {
  switch (align) {
    case 'left':
      return 0 + (width / 2) * 1.5
    case 'right':
      return gElCanvas.width - (width / 2) * 1.5
    default:
      return gElCanvas.width / 2
  }
}

function onTextInput(text) {
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
  const line = movetoNextLine()
  if (!line) return
  document.querySelector('.color-btn').value = line ? line.color : 'white'
  renderCanvas()
}

function onAddLine() {
  const elInput = document.querySelector(".tools-container input[type='text']")
  elInput.value = ''
  elInput.focus()
  createLine()
}

function onAlign(direction) {
  handleAlign(direction)
  renderCanvas()
}

function onFontSizeChange(direction) {
  handleFontSizeChange(direction)
  renderCanvas()
}

function onFontColorChange(color) {
  handleFontColor(color)
  renderCanvas()
}

function onToggleStroke() {
  handleToggleStroke()
  renderCanvas()
}
function onFontChange(fontFamily) {
  handleFontChange(fontFamily)
  renderCanvas()
}

function onSave(elLink) {
  handelSave()
  renderCanvas()
  var image = gElCanvas.toDataURL('image/jpeg')
  elLink.setAttribute('href', image)
}

function onTypeEnd(ev, el) {
  if (ev.keyCode === 13) {
    el.value = ''
    createLine()
    document.querySelector('.color-btn').value = '#ffffff'
  }
}

function removeResizeListener() {
  window.removeEventListener('resize', renderCanvas)
}

function hideEditor() {
  removeResizeListener()
  document.querySelector('.edit').classList.add('hide')
}
