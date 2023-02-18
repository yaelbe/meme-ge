async function onUploadImg() {
  // Gets the canvas content as an image format
  //   const dataUrl = gElCanvas.toDataURL()
  //   const blob = await (await fetch(dataUrl)).blob()
  //   const filesArray = [new File([blob], 'animation.png', { type: blob.type, lastModified: new Date().getTime() })]
  //   const shareData = {
  //     files: filesArray,
  //   }
  //   navigator.share(shareData).then(() => {
  //     console.log('Shared successfully')
  //   })

  if (navigator.canShare && navigator.canShare(shareData)) {
    const dataUrl = gElCanvas.toDataURL()
    const blob = await (await fetch(dataUrl)).blob()
    const filesArray = [
      new File([blob], 'meme.png', {
        type: blob.type,
        lastModified: new Date().getTime(),
      }),
    ]
    const shareData = {
      files: filesArray,
    }
    navigator.share(shareData)
  } else {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
      // Encode the instance of certain characters in the url
      const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
      console.log(encodedUploadedImgUrl)
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
  }
}

function doUploadImg(imgDataUrl, onSuccess) {
  // Pack the image for delivery
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  // Send a post req with the image to the server
  const XHR = new XMLHttpRequest()
  XHR.onreadystatechange = () => {
    // If the request is not done, we have no business here yet, so return
    if (XHR.readyState !== XMLHttpRequest.DONE) return
    // if the response is not ok, show an error
    if (XHR.status !== 200) return console.error('Error uploading image')
    const { responseText: url } = XHR
    // Same as
    // const url = XHR.responseText

    // If the response is ok, call the onSuccess callback function,
    // that will create the link to facebook using the url we got
    console.log('Got back live url:', url)
    onSuccess(url)
  }
  XHR.onerror = (req, ev) => {
    console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
  }
  XHR.open('POST', '//ca-upload.com/here/upload.php')
  XHR.send(formData)
}
