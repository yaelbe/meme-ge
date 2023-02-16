'use strict'

function renderGallery() {
  const elGallery = document.querySelector('.gallery')
  const elGalleryHeader = document.querySelector('.gallery-header')
  let html = ''
  //search
  html += `<div class="search"><input type="search" class="img-search" onkeyup="onSearch()" placeholder="Search for names..">`

  //statistics

  html += `<div class="stat">`
  elGalleryHeader.innerHTML = html

  let keywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

  for (let element in keywordSearchCountMap) {
    let fontSize = keywordSearchCountMap[element] + 5 + 'px'
    html += `<div class="stats-item" style="font-size:${fontSize}">${element}</div>`
  }
  html += '<a href="#" class="more" onclick="onShowMore()">more...</a></div></div>'
  elGalleryHeader.innerHTML = html
  html = ''

  html += `<div class="imgs">`
  const images = getImagesForDisplay()
  images.forEach((image) => {
    html += `<img src=${image.src} class="img" onclick="onImageClicked('${image.id}')" >`
  })
  html += '</div>'
  elGallery.innerHTML = html
}

function onImageClicked(id) {
  galleryHide()
  showEditor(getImageById(id))
}

function galleryHide() {
  document.querySelector('.gallery').classList.add('hide')
  document.querySelector('.gallery-header').classList.add('hide')
}

function galleryShow() {
  document.querySelector('.gallery').classList.remove('hide')
  document.querySelector('.gallery-header').classList.remove('hide')
}
