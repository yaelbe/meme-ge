'use strict'

function renderGallery() {
  function loadGallery() {
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
    for (let i = 0; i < 19; i++) {
      html += `<img src="SITE/img/${i + 1}.jpg" class="img" alt="Image ${i + 1}">`
    }
    html += '</div>'
    elGallery.innerHTML = html
  }
}
