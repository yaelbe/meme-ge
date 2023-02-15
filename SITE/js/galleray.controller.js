'use strict'

function renderGallery() {
  const elGallery = document.querySelector('.gallery')
  let html = ''
  //search
  html += `<input type="text" class="img-search" onkeyup="onSearch()" placeholder="Search for names..">`

  //statistics

  html += `<div class="stat">`
  let keywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
  for (let element in keywordSearchCountMap) {
    let fontSize = keywordSearchCountMap[element] + 5 + 'px'
    html += `<div class="stats-item" style="font-size:${fontSize}">${element}</div>`
  }
  html += '</div>'
  html += `<div class="imgs">`
  const images = getImagesForDisplay()
  images.forEach((image) => {
    html += `<img src=${image.src} class="img" onclick="onImageClicked('${image.id}')" >`
  })
  html += '</div>'
  elGallery.innerHTML = html
}

function onImageClicked(id) {
  gImage = getImageById(id)
  const elGallery = document.querySelector('.gallery')
  elGallery.classList.add('hide')
  showEditor()
}
