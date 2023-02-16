'use strict'
var gLines = []
function getLines() {
  return gLines
}
function getCurrentLine() {
  return gLines.at(-1)
}
function createLine() {
  let line = {
    text: '',
    position: {},
  }
  gLines.push(line)
  return line
}
