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
 * 但这涉及到不知道对应DOM什么时候渲染出来的问题
 * 1级方案：最理想的方案是通过获取属性强迫DOM更新
 * 2级方案：等待image元素的onload事件
 * 但是坏消息是在Safari浏览器中1级方案，2级方案均不可行
 * 所以，现在采用的是方案3：通过不断的requestAnimationFrame等待image元素有尺寸
 * @param {string} base64 源字符串，png格式图片的base64字符串
 * @returns {Promise<string>} promise对象，它返回目标字符串，jpeg格式的图片的base64字符串
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
      ctx.fillStyle = '#fff'
      ctx.fill()
      ctx.drawImage(image, 0, 0)
      resolve(canvas.toDataURL('image/jpeg'))
    })
  })
}
