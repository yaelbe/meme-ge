'use strict'

var gImages = []
createData()

function createData() {
  let tags = ['art', ' happy', 'dark', 'funny', 'love', 'cute', 'music', 'kids', 'animals']
  for (let i = 0; i < 19; i++) {
    let keyWords = []
    let amount = getRandomInt(0, 3)
    for (let j = 0; j < amount; j++) {
      let index = getRandomInt(0, tags.length)
      const tag = tags[index]
      if (!keyWords.includes(tag)) keyWords.push(tag)
    }

    const imgData = createImageData(`SITE/img/${i + 1}.jpg`, keyWords)
    gImages.push(imgData)
  }
}

function createImageData(url = '', keyWords = []) {
  return {
    id: makeId(),
    src: url,
    keyWords,
  }
}

function getImagesForDisplay() {
  return gImages
}

function getImageById(id) {
  return gImages.find((image) => image.id === id)
}
