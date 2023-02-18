'use strict'

function onLoad() {
  renderGallery()
}

function onShowGallery() {
  hideEditor()
  galleryShow()
  closeMenu()
}

function closeMenu() {
  document.body.classList.remove('menu-open')
}

function toggleMenu() {
  document.body.classList.toggle('menu-open')
}

function onShowMemes() {
  hideEditor()
  galleryHide()
  showMemes()
  closeMenu()
}
