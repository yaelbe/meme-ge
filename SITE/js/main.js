'use strict'

let gCtx
let gElCanvas
let gImage

function onLoad() {
  console.log('hi')

  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  //   gImage = new Image()
  //   gImage.onload = function () {
  //     gElCanvas.width = gImage.width
  //     gElCanvas.height = gImage.height
  //     gCtx.drawImage(gImage, 0, 0, gImage.width, gImage.height)
  //   }
  //   gImage.src = 'SITE/img/2.jpg'
  loadGallery()
  addListeners()
  //   loadImage()
}

function addListeners() {
  window.addEventListener('resize', () => {
    resizeCanvas()
  })
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')

  //   let ratio = gImage.width / gImage.height

  //   gElCanvas.width = elContainer.offsetWidth
  //   gElCanvas.height = elContainer.offsetHeight

  //   //Clear the canvas,  fill it with grey background
  //   gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
  //   gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

  //   gCtx.drawImage(gImage, 0, 0, gElCanvas.width, gElCanvas.height)

  console.log(`${elContainer.offsetWidth} ${elContainer.offsetHeight}`)
  console.log(`canvas ${gElCanvas.width} ${gElCanvas.height}`)

  //   renderCanvas(scaleX, scaleY)
}

function renderCanvas(scaleX, scaleY) {
  //   loadImage()
  gCtx.scale(scaleX, scaleY)
  //Set the background color to grey
  //Clear the canvas,  fill it with grey background
  //   gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
  //   gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function loadImage() {
  let img = new Image()
  img.onload = function () {
    var canvas = gCtx.canvas
    var hRatio = canvas.width / img.width
    var vRatio = canvas.height / img.height
    var ratio = Math.min(hRatio, vRatio)
    var centerShift_x = (canvas.width - img.width * ratio) / 2
    var centerShift_y = (canvas.height - img.height * ratio) / 2
    gCtx.clearRect(0, 0, canvas.width, canvas.height)

    gCtx.drawImage(img, 0, 0, img.width, img.height)

    gCtx.font = '40pt Calibri'
    gCtx.fillText('Hello world', centerShift_x + 50, centerShift_y + 100)
  }
  img.src = 'SITE/img/2.jpg'
}
