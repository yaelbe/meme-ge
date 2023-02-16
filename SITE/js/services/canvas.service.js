'use strict'
var gLines = []
var gCurrentLine
function getLines() {
  return gLines
}
function getCurrentLine() {
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

function align(direction) {
  gCurrentLine.align = direction
}

function isCurrentLine(id) {
  return gCurrentLine.id === id
}

function isCurrentEmptyLine() {
  return gCurrentLine && gCurrentLine.text.length === 0
}
