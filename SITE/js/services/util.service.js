'use strict'

function makeId(length = 6) {
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%*'
  var txt = ''
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function makeLorem(wordCount = 100) {
  const words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (wordCount > 0) {
    wordCount--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}

function getRandomFloatInclusive(min, max, decimals = 2) {
  const str = (Math.random() * (max - min + 1) + min).toFixed(decimals)
  return parseFloat(str)
}

function formatDate(time) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

// Kilometers to Miles
function kmToMiles(km) {
  return km / 1.609
}

// Kilograms to Pounds:
function kgToLbs(kg) {
  return kg * 2.20462262185
}

function getPastRelativeFrom(ts) {
  const diff = Date.now() - new Date(ts)
  const seconds = diff / 1000
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24

  const formatter = new Intl.RelativeTimeFormat('en-US', {
    numeric: 'auto',
  })
  if (seconds <= 60) return formatter.format(-seconds, 'seconds')
  if (minutes <= 60) return formatter.format(-minutes, 'minutes')
  if (hours <= 24) return formatter.format(-hours, 'hours')
  return formatter.format(-days, 'days')
}

function setQueryParams(newParams) {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)

  for (var paramName in newParams) {
    const paramValue = newParams[paramName]
    params.set(paramName, paramValue) // used to update an existing query string parameter or add a new one if it doesn't exist.
  }

  url.search = params.toString()
  window.history.pushState({ path: url.href }, '', url.href) //modify the URL of the current page without reloading the page
}

function deleteQueryParam(key) {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)

  params.delete(key)
  url.search = params.toString()

  window.history.pushState({ path: url.href }, '', url.href)
}

function getValFromParam(key) {
  const queryStringParams = new URLSearchParams(window.location.search)
  return queryStringParams.get(key)
}

function saveToStorage(key, value) {
  var json = JSON.stringify(value)
  localStorage.setItem(key, json)
}

function loadFromStorage(key) {
  var json = localStorage.getItem(key)
  var value = JSON.parse(json)
  return value
}

function removeFromStorage(key) {
  localStorage.removeItem(key)
}
