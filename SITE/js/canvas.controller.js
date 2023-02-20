'use strict'
let gCtx
let gElCanvas
let gImage

init()
function init() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
}

function showEditor(imageData) {
  if (imageData) {
    reset()
    gImage = imageData
  }
  if (!gImage) return
  addListeners()
  showCanvas()
  document.querySelector('.edit').classList.remove('hide')
  document.querySelector('.tools-container').classList.remove('hide')
  document.querySelector('.memes').classList.add('hide')
}

function showCanvas() {
  addResizeListeners()
  let image = new Image()
  image.onload = function () {
    gImage.image = image
    renderCanvas()
  }
  if (typeof gImage.src.src === 'undefined') {
    image.src = gImage.src
  } else {
    //upload
    image.src = gImage.src.src
    gImage.src = image.src
  }
}

function addResizeListeners() {
  window.addEventListener('resize', renderCanvas)
}

function renderCanvas() {
  if (!gImage) return
  const elContainer = document.querySelector('.canvas-container')

  let img = gImage.image
  if (!gImage.hasOwnProperty('image')) {
    showCanvas(gImage)
    return
  }

  let scale = 1 //(elContainer.offsetWidth - 25) / gElCanvas.width
  if (gElCanvas.width < 1) scale = 1
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
      let { font, fontSize: size, color } = line
      size = size * scale
      gCtx.font = `${size}em ${font}`

      const lineHeight = gCtx.measureText('M').width + 20
      let width = gCtx.measureText(line.text).width
      let { x, y } = line.position
      x = x * scale > gElCanvas.width ? x : x * scale
      y = y * scale > gElCanvas.height ? y : y * scale

      x = _getXPosition(line.align, width, x)

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

      line.position = { x, y, w: width, h: lineHeight }

      if (isCurrentLine(line.id)) {
        gCtx.setLineDash([6])
        gCtx.strokeStyle = 'white'
        gCtx.strokeRect(x - (width * 1.5) / 2, y - lineHeight, width * 1.5, lineHeight * 1.5)
      }
    }
  })
}

function _getXPosition(align, width, x) {
  switch (align) {
    case 'left':
      return 0 + (width / 2) * 1.5
    case 'right':
      return gElCanvas.width - (width / 2) * 1.5
    case 'center':
      return gElCanvas.width / 2
    default:
      return x
  }
}

function onTextInput(text) {
  let line = getCurrentLine()
  if (!line) {
    line = _createLine()
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
  _createLine()
}

function onLineSelected() {
  const elInput = document.querySelector(".tools-container input[type='text']")
  const elColor = document.querySelector('.color-btn')
  const elFont = document.querySelector('.font-family')

  elInput.focus()
  const line = getCurrentLine()
  if (line) {
    elInput.value = line.text
    elColor.value = line.color
    elFont.value = line.font
  } else {
    elInput.value = ''
    elColor.value = '#ffffff'
    elFont.value = 'imp'
  }
  elInput.select()
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

function onDownload(elLink) {
  handelSave()
  renderCanvas()
  var image = gElCanvas.toDataURL('image/jpeg')
  elLink.setAttribute('href', image)
}

function onTypeEnd(ev, el) {
  if (ev.keyCode === 13) {
    el.value = ''
    _createLine()
    renderCanvas()
    document.querySelector('.color-btn').value = '#ffffff'
  }
}

function removeResizeListener() {
  window.removeEventListener('resize', renderCanvas)
}

function hideEditor() {
  removeResizeListener()
  removeListeners()
  document.querySelector('.edit').classList.add('hide')
}
function onSave() {
  handelSave()
  renderCanvas()
  resetTools()
  let meme = {
    image: gElCanvas.toDataURL(),
    data: gImage,
    lines: getLines(),
    size: { w: gElCanvas.width, h: gElCanvas.height },
  }
  doSave(meme)
  hideEditor()
  showMemes()
}

function resetTools() {
  document.querySelector('.color-btn').value = '#ffffff'
  document.querySelector(".tools-container input[type='text']").value = ''
}

function _createLine() {
  const centerX = gElCanvas.width / 2
  const centerY = gElCanvas.height / 2
  return createLine(centerX, centerY)
}
