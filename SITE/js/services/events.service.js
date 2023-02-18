'usr strict'
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

var gDragStart = false

function addListeners() {
  console.log('Add Listeners')

  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onMouseDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onMouseUp)
  gElCanvas.addEventListener('mouseout', onMouseUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onMouseDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onMouseUp)
}

function removeListeners() {
  console.log('REmove Listeners')
  removeMouseListeners()
  removeTouchListeners()
}

function removeMouseListeners() {
  gElCanvas.removeEventListener('mousedown', onMouseDown)
  gElCanvas.removeEventListener('mousemove', onMove)
  gElCanvas.removeEventListener('mouseup', onMouseUp)
  gElCanvas.removeEventListener('mouseout', onMouseUp)
}

function removeTouchListeners() {
  gElCanvas.removeEventListener('touchstart', onMouseDown)
  gElCanvas.removeEventListener('touchmove', onMove)
  gElCanvas.removeEventListener('touchend', onMouseUp)
}

function onMouseDown(ev) {
  const pos = _getEvPos(ev)
  const { x, y } = pos
  const found = findLine(x, y)
  console.log('found', found)

  if (!found) {
    gCurrentLine = null
    return
  }

  gDragStart = true
  document.body.style.cursor = 'grabbing'
}

function onMouseUp(ev) {
  if (!gDragStart) return
  gDragStart = false
  document.body.style.cursor = 'default'
  renderCanvas()
}

function onMove(ev) {
  if (!gDragStart) return
  const pos = _getEvPos(ev)
  const { movementX: diffX, movementY: diffY } = ev
  const { x, y } = pos
  handelNewPosition(x, y, diffX, diffY)
  renderCanvas()
}

function _getEvPos(ev) {
  // Gets the offset pos , the default pos
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // Check if its a touch ev
  if (TOUCH_EVS.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault()
    //Gets the first touch point
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}
