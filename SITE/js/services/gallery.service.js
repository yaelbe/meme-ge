'use strict'
createData()

function createData() {}
function createImageData(url, keyWords = []) {
  return {
    id: makeId(),
    url,
    keyWords,
  }
}
function getImagesForDisplay() {}
function getImagesForGallery() {}
