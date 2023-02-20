'use strict'
function getSavedMemes() {
  return loadFromStorage('memes') || []
}

function getMemeById(id) {
  let meme = getSavedMemes().find((meme) => {
    return meme.id === id
  })
  if (meme) {
    gLines = meme.lines
  }
  return meme
}

function deleteMeme(id) {
  const memes = getSavedMemes()
  const index = memes.findIndex((meme) => meme.id === id)
  console.log('delete id', id, index)

  if (index > -1) {
    memes.splice(index, 1)
  }
  saveToStorage('memes', memes)
}
