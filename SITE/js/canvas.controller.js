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
  image.src = gImage.src
}

function showMemes() {
  addResizeListeners()
  renderMemes()
  document.querySelector('.edit').classList.remove('hide')
  document.querySelector('.memes').classList.remove('hide')
  document.querySelector('.edit .tools-container').classList.add('hide')
}

function renderMemes() {
  const elMemes = document.querySelector('.memes')
  const memems = getSavedMemes()
  let html = ''

  memems.forEach((meme) => {
    html += `<img class="thumbnail" src=${meme.img} onclick="onRenderMeme('${meme.id}')">`
  })
  html += `<div class="flex width-100 space-between">
  <button class="btn-cta large share-btn" onclick="showEditor()">Edit</button>
  <a href="#" class="btn-cta large save-btn" onclick="onDownload(this)" download="my-img.jpg">Download</a>
  </div>`

  elMemes.innerHTML = html

  const elContainer = document.querySelector('.canvas-container')

  gElCanvas.width = elContainer.width - 25
  gElCanvas.height = elContainer.height - 25
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  gCtx.fillStyle = '#595959'
  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onRenderMeme(memeId) {
  const meme = getMemeById(memeId)
  gImage = meme.data
  gElCanvas.width = meme.size.w
  gElCanvas.height = meme.size.h
  renderCanvas()
}

function addResizeListeners() {
  window.addEventListener('resize', renderCanvas)
}

function renderCanvas() {
  if (!gImage) return
  const elContainer = document.querySelector('.canvas-container')

  let img = gImage.image
  if (!img.src) {
    showCanvas(gImage)
    return
  }

  const scale = (elContainer.offsetWidth - 25) / gElCanvas.width
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
      x = x * scale
      y = y * scale

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
    img: gElCanvas.toDataURL(),
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
