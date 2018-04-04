// opacify

const loopRequest = function (callback, stop) {
  requestAnimationFrame(function () {
    if (!stop()) {
      loopRequest(callback, stop)
    } else {
      callback()
    }
  })
}

const untilHasImageSize = function (image) {
  return new Promise(resolve => {
    loopRequest(resolve, function () {
      return image.naturalWidth > 0 && image.naturalHeight > 0
    })
  })
}

/**
 * 将一个png格式图片的base64串处理为jpeg格式的base64串
 * 因为涉及到BOM渲染的问题(要时间)，线性处理有些问题
 * (那怕通过image.naturalWidth等强迫DOM树立即更新也无济于事，因此该函数只能设计成promise风格)
 * @param {string} base64 源字符串，png格式图片的base64字符串
 * @returns {Promise} promise对象，它返回目标字符串，jpeg格式的图片的base64字符串
 */
export default function opacify (base64) {
  return new Promise(resolve => {
    let image = new Image()
    image.src = base64.toString()
    let canvas = document.createElement('canvas')
    untilHasImageSize(image).then(() => {
      let width = image.naturalWidth
      let height = image.naturalHeight
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      ctx.rect(0, 0, width, height)
      ctx.fillStyle = "#fff"
      ctx.fill()
      ctx.drawImage(image, 0, 0)
      resolve(canvas.toDataURL('image/jpeg'))
    })
  })
}
