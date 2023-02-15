'use strict'

let gCtx
let gElCanvas
let gImage

function onLoad() {
  console.log('hi')
  createData()

  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  renderGallery()
}

function onShowGallery() {
  hideEditor()
  document.querySelector('.gallery').classList.remove('hide')
}
