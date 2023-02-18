'use strict'
var gLines = []
var gCurrentLine

function initCanvas() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
}

function getLines() {
  return gLines
}

function getCurrentLine() {
  return gCurrentLine
}

function createLine(centerX, centerY) {
  const lastLine = gLines.at(-1)
  if (isCurrentEmptyLine()) {
    gCurrentLine = lastLine
  } else {
    let line = {
      id: makeId(),
      text: '',
      position: { x: centerX, y: centerY, w: 0, h: 0 },
      align: 'center',
      fontSize: 2,
      font: 'imp',
      color: '#ffffff',
      stroke: false,
    }
    gLines.push(line)
    gCurrentLine = line
  }
  return gCurrentLine
}

function findLine(evX, evY) {
  return gLines.find((line) => {
    const { x, y, w, h } = line.position
    const diffX = Math.abs(evX - x)
    const diffY = Math.abs(evY - y)
    if (diffX <= w / 2 && diffY <= h / 2) {
      gCurrentLine = line
      console.log('found 1')
      return true
    }
    return false
  })
}

function handelNewPosition(evX, evY, difX, difY) {
  const { x, y, w, h } = gCurrentLine.position
  gCurrentLine.position = { x: evX, y: evY, w, h }
}

function deleteLine() {
  const idx = gLines.findIndex((line) => line.id == gCurrentLine.id)
  gLines.splice(idx, 1)
  createLine()
}

function movetoNextLine() {
  const idx = gLines.findIndex((line) => line.id === gCurrentLine.id)
  gCurrentLine = idx === gLines.length - 1 ? gLines[0] : gLines[idx + 1]
  if (isCurrentEmptyLine()) {
    return movetoNextLine()
  }
  return gCurrentLine
}

function handleAlign(direction) {
  _setLine('align', direction)
}

function handleFontSizeChange(direction) {
  const fontSize = direction === 'increase' ? gCurrentLine.fontSize * 1.1 : gCurrentLine.fontSize / 1.1
  _setLine('fontSize', fontSize)
}

function handleFontChange(fontFamily) {
  _setLine('font', fontFamily)
}

function handleFontColor(color) {
  _setLine('color', color)
}

function handleToggleStroke() {
  _setLine('stroke', !gCurrentLine.stroke)
}
function handelSave() {
  gCurrentLine = null
}
function isCurrentLine(id) {
  if (!gCurrentLine) return
  return gCurrentLine.id === id
}

function _setLine(property, value) {
  if (!gCurrentLine) return
  gCurrentLine[property] = value
}

function isCurrentEmptyLine() {
  return isEmptyLine(gCurrentLine)
}

function isEmptyLine(line) {
  return line && line.text.trim().length === 0
}

function doSave(newObject) {
  newObject.id = makeId()
  let memes = loadFromStorage('memes') || []
  memes.push(newObject)
  saveToStorage('memes', memes)
}

function getSavedMemes() {
  return loadFromStorage('memes') || []
}

function getMemeById(id) {
  let meme = getSavedMemes().find((meme) => {
    return meme.id === id
  })
  if (meme) {
    gLines = meme.lines
  }
  return meme
}

function reset() {
  gLines = []
  gCurrentLine = null
}
