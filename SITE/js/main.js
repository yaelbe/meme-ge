'use strict'

function onLoad() {
  renderGallery()
}

function onShowGallery() {
  hideEditor()
  galleryShow()
  toggleMenu()
}

function toggleMenu() {
  document.body.classList.toggle('menu-open')
}
