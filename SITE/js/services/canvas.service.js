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
  if (gLines.length === 0) {
    gCurrentLine = createLine()
  }
  gCurrentLine = gLines.at(-1)
  return gCurrentLine
}
function createLine() {
  const lastLine = gLines.at(-1)
  if (isCurrentEmptyLine()) {
    gCurrentLine = lastLine
  } else {
    let line = {
      id: makeId(),
      text: '',
      position: {},
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
